'use client';
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Skeleton, Dropdown,
    DropdownMenu, DropdownTrigger, DropdownItem,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Image, Chip, Button
} from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import useSWR, { mutate } from 'swr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
    const columns = [
        { uid: "ID", name: "#id" },
        { uid: "IMAGE", name: "Image" },
        { uid: "TITLE", name: "Title" },
        { uid: "PRICE", name: "Price" },
        { uid: "COUNT", name: "Count" },
        { uid: "CATEGORY", name: "Category" },
        { uid: "ACTION", name: "Action" }
    ];

    const { isOpen: isEditModalOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();

    const [data, setData] = useState([]);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [productIdToEdit, setProductIdToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [amazed, setAmazed] = useState(false);
    const router = useRouter();

    // Fetch products data
    const fetcher = (url) => axios.get(url).then((res) => res.data);
    const { data: products, error } = useSWR('http://localhost:8001/products', fetcher);

    useEffect(() => {
        if (products) {
            setData(products);
            const uniqueCategories = ["All", ...new Set(products.map(product => product.category))];
            setCategories(uniqueCategories);
            setLoading(false);
        }
        if (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }, [products, error]);

    // Filter products by selected category
    const filteredData = selectedCategory === "All"
        ? products
        : products.filter(product => product.category === selectedCategory);

    const renderCell = (product, columnKey) => {
        const cellValue = product[columnKey];
        switch (columnKey) {
            case "ID":
                return <p className="text-bold text-sm capitalize text-default-400">{product.id}</p>;
            case "IMAGE":
                return (
                    <Image

                        lazy
                        isBlurred
                        width={100}
                        height={100}
                        src={product.image}
                        alt={product.title}
                    />
                );
            case "TITLE":
                return <p className="text-bold text-[12px] truncate max-w-[180px] text-black">{product.title}</p>;
            case "PRICE":
                return <p className="text-bold text-[12px] text-black">{product.price}{"$"}</p>;
            case "COUNT":
                return <p className="text-bold text-[12px] text-black">{product.count}</p>;
            case "CATEGORY":
                return <Chip className="text-white" size="sm" color="warning" variant="shadow">{product.category}</Chip>;
            case "ACTION":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip color="danger" content="Delete">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteRoundedIcon
                                    onClick={() => {
                                        setProductIdToDelete(product.id);
                                        onDeleteOpen();
                                    }}
                                />
                            </span>
                        </Tooltip>
                        <Tooltip color="default" content="Edit Product">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon
                                    onClick={() => {
                                        setProductIdToEdit(product.id);
                                        setTitle(product.title);
                                        setPrice(product.price);
                                        setDiscount(product.discount);
                                        setAmazed(product.amazing);
                                        onEditOpen();
                                    }}
                                />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    const addProducts = () => {
        router.push('products/addproducts');
    };

    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:8001/products/${productIdToDelete}`);
            mutate('http://localhost:8001/products', (prevData) =>
                prevData.filter((product) => product.id !== productIdToDelete)
            );
            toast.success("Product deleted successfully!");
            onDeleteOpenChange();
        } catch (error) {
            toast.error("Error deleting product!");
        }
    };

    const editProduct = async () => {
        try {
            if (!productIdToEdit || !title || !price || !discount || amazed === null) {
                alert("Please fill the values");
                return;
            }
            const response = await axios.patch(`http://localhost:8001/products/${productIdToEdit}`, {
                title,
                price,
                discount,
                amazed,
            });

            if (response.status === 200) {
                mutate('http://localhost:8001/products', (prevData) =>
                    prevData.map(product =>
                        product.id === productIdToEdit
                            ? { ...product, title, price, discount, amazed }
                            : product
                    )
                );
                toast.success("Product updated successfully!");
                onEditOpenChange();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="-z-10 flex flex-col gap-2">
            <div className="flex flex-row justify-between bg-white p-4 rounded-xl shadow-sm">
                <p className="text-bold text-md font-bold capitalize justify-center my-auto">Products List</p>

                <div className="flex flex-row-reverse justify-start gap-4">
                    <Button className="px-8 text-white bg-[#5D60EF]" size="sm" onClick={addProducts}>
                        Add Products+
                    </Button>

                    {/* Filter by category */}
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="px-4 text-white bg-[#5D60EF]" size="sm">
                                Filter
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Select Category"
                            closeOnSelect={true}
                            selectedKeys={new Set([selectedCategory])}
                            selectionMode="single"
                            onSelectionChange={(keys) => {
                                setSelectedCategory(Array.from(keys)[0]);
                            }}
                        >
                            {categories.map((category) => (
                                <DropdownItem key={category} value={category}>
                                    {category}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

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
                    layout="fixed"
                    aria-label="Products table">

                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align="start"
                                className={column.uid === "CATEGORY"
                                    || column.uid === "ID"
                                    || column.uid === "COUNT" ? "hidden sm:table-cell" : ""
                                }

                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={filteredData}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell
                                    className={columnKey === "CATEGORY" ||
                                        columnKey === "ID"
                                        || columnKey === "COUNT" ? "hidden sm:table-cell" : ""

                                    }
                                >

                                    {renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )
            }

            {/* Modal for Delete */}
            <Modal backdrop="blur" isOpen={isDeleteModalOpen} onOpenChange={onDeleteOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 m-auto">Confirm Deletion</ModalHeader>
                    <ModalBody>
                        <p className="text-[16px]">Are you sure you want to delete this product?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onDeleteOpenChange()}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={deleteProduct}>
                            Yes, delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal for Edit */}
            <Modal backdrop="blur" isOpen={isEditModalOpen} onOpenChange={onEditOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 m-auto">Edit Product</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-3">
                            <span className="text-sm font-semibold">Title:</span>
                            <input
                                type="text"
                                className="border-1 outline-none p-1 rounded-sm text-md"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <span className="text-sm font-semibold">Price:</span>
                            <input
                                type="number"
                                min="0.00"
                                max="10000.00"
                                step="0.01"
                                className="border-1 outline-none p-1 rounded-sm text-md"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <span className="text-sm font-semibold">Discount (%):</span>
                            <input
                                type="number"
                                className="border-1 outline-none p-1 rounded-sm text-md"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                            <span className="text-sm font-semibold">Amazing:</span>
                            <select
                                className="border-1 outline-none p-1 rounded-sm text-md"
                                value={amazed}
                                onChange={(e) => setAmazed(e.target.value === 'true')}
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onEditOpenChange()}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={editProduct}>
                            Save Changes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer pauseOnHover={false} autoClose={1000} theme="dark" />
        </div >
    );
};

export default Products;
