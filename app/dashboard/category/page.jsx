'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Skeleton } from "@nextui-org/react";
import { Modal, ModalContent, Button, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { useEffect } from "react";
import React, { useCallback, useState } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const Category = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        axios.get('/api/category/add-category')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const columns = [
        { uid: "ID", name: "#" },
        { uid: "TITLE", name: "Title" },
        { uid: "ACTION", name: "Action" },
    ];

    const renderCell = useCallback((category, columnKey) => {
        const cellValue = category[columnKey];

        switch (columnKey) {
            case "ID":
                return (
                    <p className="text-bold text-sm capitalize text-default-400">{category.id}</p>
                );
            case "TITLE":
                return (
                    <p className="text-bold text-[12px] truncate max-w-[180px] text-black">{category.title}</p>
                );
            case "ACTION":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip color="danger" content="Delete">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteRoundedIcon
                                    onClick={() => {
                                        setCategoryToDelete(category.id);
                                        onOpen();
                                    }}
                                />
                            </span>
                        </Tooltip>
                        {/* <Tooltip color="default" content="Edit">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <BorderColorRoundedIcon />
                            </span>
                        </Tooltip> */}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const deleteCategory = async () => {
        try {
            if (categoryToDelete) {
                const response = await axios.post(`/api/category/delete-category`, { categoryToDelete });
                if (response.status == 200) {
                    toast.success("Category is deleted")
                    setData(prevData => prevData.filter(category => category.id !== categoryToDelete));
                    setCategoryToDelete(null);

                }
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            onOpenChange();
        }
    };

    const addCategory = () => {
        router.push('category/create');

    }

    return (
        <>
            <div className="-z-10 flex flex-col gap-2">
                <div className="flex flex-row justify-between bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-bold text-md font-bold capitalize justify-center my-auto">Category List</p>

                    <Button className="px-8 text-white bg-[#5D60EF]" size="sm" onClick={addCategory}>
                        Add Category +
                    </Button>
                </div>

                {loading ? (
                    <Skeleton className="rounded-xl">
                        {/* Skeleton structure for table rows */}
                        <div className="flex flex-col gap-4">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="h-12 w-full bg-gray-200 rounded-lg" />
                            ))}
                        </div>
                    </Skeleton >
                ) : (
                    <Table
                        layout="fixed" aria-label="Category List Table">
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid}
                                >
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

                <Modal placement="center" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {onClose => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 m-auto">Confirm Deletion</ModalHeader>
                                <ModalBody>
                                    <p className="text-[16px]">
                                        Are you sure you want to delete this category?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={deleteCategory}>
                                        Yes, delete
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

            </div>
            <ToastContainer pauseOnHover={false} autoClose={1000} theme="dark" />

        </>
    );
};

export default Category;
