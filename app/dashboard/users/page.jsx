'use client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Skeleton, user } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip } from "@nextui-org/react";
import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Useres = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [userIdToEdit, setUserIdToEdit] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const router = useRouter();

    const { isOpen: isDeleteModalOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
    const { isOpen: isEditModalOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8001/users');
                const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setData(sortedData);
            } catch (error) {
                setError('خطا در دریافت داده‌ها');
                console.error('خطا در دریافت داده‌ها:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const deleteUser = async () => {
        try {
            if (userIdToDelete) {
                await axios.delete(`http://localhost:8001/users/${userIdToDelete}`);
                setData(prevData => prevData.filter(user => user.id !== userIdToDelete));
                toast.success("User Deleted")
                setUserIdToDelete(null);
            }
        } catch (error) {
            console.error('خطا در حذف کاربر:', error);
        } finally {
            onDeleteOpenChange();
        }
    }
    const editUser = async () => {
        try {
            if (!firstName || !lastName) {
                toast.warning("Please Fill The Values")
                return;
            }
            const response = await axios.patch(`http://localhost:8001/users/${userIdToEdit}`, {
                name: {
                    firstname: firstName,
                    lastname: lastName
                }
            });
            if (response.status === 200) {
                setData(prevData =>
                    prevData.map(user =>
                        user.id === userIdToEdit
                            ? {
                                ...user,
                                name: {
                                    firstname: firstName,
                                    lastname: lastName
                                }
                            }
                            : user
                    )
                );
                setUserIdToEdit(null);
                toast.success("User Eddited");
                onEditOpenChange();
            }
        } catch (error) {
            console.log(error.messgae)
        }
    }
    const renderCell = useCallback((user, columnKey) => {
        switch (columnKey) {
            case "ID":
                return <p className="text-bold text-sm capitalize text-default-400">{"#"}{user.id}</p>;
            case "NAME":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{user.name.firstname}{"-"}{user.name.lastname}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.email}</p>
                    </div>
                );
            case "USERNAME":
                return <p className="text-bold text-sm capitalize text-default-400">{user.username}</p>;
            case "PHONE":
                return <p className="text-bold text-sm capitalize text-default-400">{user.phone}</p>;
            case "CITY":
                return <p className="text-bold text-sm capitalize text-default-400">{user.city}</p>;
            case "ACTION":
                return (
                    <div className="m-auto">
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteRoundedIcon
                                    onClick={() => {
                                        setUserIdToDelete(user.id);
                                        onDeleteOpen(); // باز کردن Modal حذف
                                    }}
                                />
                            </span>
                        </Tooltip>

                        <Tooltip color="default" content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon
                                    onClick={() => {
                                        setFirstName(user.name.firstname)
                                        setLastName(user.name.lastname)
                                        setUserIdToEdit(user.id);
                                        onEditOpen(); // باز کردن Modal ویرایش
                                    }}
                                />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return user[columnKey];
        }
    }, []);

    const addUser = () => {
        router.push('/dashboard/users/adduser');
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between bg-white p-3 rounded-xl shadow-md">
                <p className="text-bold text-xl font-bold capitalize justify-center my-auto">Users</p>
                <Button className="px-8 text-white bg-[#5D60EF]" size="sm" onClick={addUser}>
                    Add User+
                </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <Skeleton className="rounded-xl">
                    <div className="flex flex-col gap-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="h-12 w-full bg-gray-200 rounded-lg" />
                        ))}
                    </div>
                </Skeleton>
            ) : (
          
                <Table
                    aria-label="Example table with custom cells"
                     layout="fixed">
                    <TableHeader columns={[
                        { uid: "ID", name: "id" },
                        { uid: "NAME", name: "name" },
                        { uid: "USERNAME", name: "username" },
                        { uid: "PHONE", name: "phone" },
                        { uid: "CITY", name: "city" },
                        { uid: "ACTION", name: "action" }
                    ]}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "ACTION" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={data}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
             
            )}
    

            {/* modal for delete user */}
            <Modal placement="center" backdrop="blur" isOpen={isDeleteModalOpen} onOpenChange={onDeleteOpenChange}>
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 m-auto">Confirm Deletion</ModalHeader>
                            <ModalBody>
                                <p className="text-[16px]">
                                    Are you sure you want to delete this user?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onClick={deleteUser}>
                                    Yes, delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* modal for edit user */}
            <Modal placement="center" backdrop="blur" isOpen={isEditModalOpen} onOpenChange={onEditOpenChange}>
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 m-auto">Edit User</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-4">
                                    <span className=" font-semibold">First Name :</span>
                                    <input
                                        type="text"
                                        className="border-1 outline-none p-2 rounded-sm text-md"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />

                                    <span className=" font-semibold">Last Name :</span>
                                    <input
                                        type="text"
                                        className="border-1 outline-none p-2 rounded-sm text-md"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onClick={editUser}>
                                    Save Changes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <ToastContainer pauseOnHover={false} autoClose={1000} theme="dark" />
        </div>
    );
}
export default Useres;
