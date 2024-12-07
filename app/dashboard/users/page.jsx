'use client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Skeleton } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip } from "@nextui-org/react";
import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR, { mutate } from 'swr';

// تعریف fetcher برای دریافت داده‌ها
const fetcher = (url) => axios.get(url).then((res) => res.data);

const Users = () => {
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [userIdToEdit, setUserIdToEdit] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const { isOpen: isDeleteModalOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
    const { isOpen: isEditModalOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
    
    const { data, error, isLoading } = useSWR('/api/user/add-user', fetcher);

    const router = useRouter();

    const deleteUser = async () => {
        try {
            if (userIdToDelete) {
                const response = await axios.post('/api/user/delete-user', { userIdToDelete });
                if (response.status === 200) {
                    // به‌روزرسانی کش با استفاده از mutate
                    mutate('/api/user/add-user', (data) => data.filter(user => user.userId !== userIdToDelete), false);
                    toast.success("User Deleted");
                    setUserIdToDelete(null);
                }
            }
        } catch (error) {
            toast.error("Error deleting user.");
            console.error(error);
        } finally {
            onDeleteOpenChange();
        }
    };

    const editUser = async () => {
        try {
            if (!firstName || !lastName) {
                toast.warning("Please Fill The Values");
                return;
            }

            const response = await axios.patch('/api/user/edit-user', {
                userIdToEdit, 
                firstName,
                lastName 
            });

            if (response.status === 200) {
                // به‌روزرسانی کش با استفاده از mutate
                mutate('/api/user/add-user', (data) => 
                    data.map(user =>
                        user.userId === userIdToEdit
                            ? { ...user, firstname: firstName, lastname: lastName }
                            : user
                    ), false);

                setUserIdToEdit(null);
                toast.success("User Edited");
                onEditOpenChange(); // بستن فرم ویرایش
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        }
    };

    const renderCell = useCallback((user, columnKey) => {
        switch (columnKey) {
            case "ID":
                return <p className="text-bold text-sm capitalize text-default-400">{"#"}{user.userId}</p>;
            case "NAME":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{user.firstname}{"-"}{user.lastname}</p>
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
                                        setUserIdToDelete(user.userId);
                                        onDeleteOpen();
                                    }}
                                />
                            </span>
                        </Tooltip>

                        <Tooltip color="default" content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon
                                    onClick={() => {
                                        setFirstName(user.firstname);
                                        setLastName(user.lastname);
                                        setUserIdToEdit(user.userId);
                                        onEditOpen();
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
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between bg-white p-3 rounded-xl shadow-md">
                <p className="text-bold text-xl font-bold capitalize justify-center my-auto">Users</p>
                <Button className="px-8 text-white bg-[#5D60EF]" size="sm" onClick={addUser}>
                    Add User+
                </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {isLoading ? (
                <Skeleton className="rounded-xl">
                    <div className="flex flex-col gap-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="h-12 w-full bg-gray-200 rounded-lg" />
                        ))}
                    </div>
                </Skeleton>
            ) : (
                <Table aria-label="Example table with custom cells" layout="fixed">
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
                            <TableRow key={item.userId}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}

            {/* Modal for delete user */}
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

            {/* Modal for edit user */}
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
};

export default Users;
