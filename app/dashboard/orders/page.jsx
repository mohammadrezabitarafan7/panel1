'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton } from "@nextui-org/react";
import React, { useCallback } from 'react';
import axios from "axios";
import Image from "next/image";
import useSWR from 'swr';

const Orders = () => {
    const fetcher = (url) => axios.get(url).then((res) => res.data);

    const { data: orders, error } = useSWR('/api/order', fetcher, { refreshInterval: 10000 });

    const renderCell = useCallback((order, columnKey) => {
        switch (columnKey) {
            case "Product Id":
                return <p className="text-bold text-sm capitalize text-default-400">{"#"}{order.productId}</p>;
            case "Product":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{order.title}</p>
                    </div>
                );
            case "Price":
                return <p className="text-bold text-sm capitalize text-default-400">{order.price} $</p>;
            case "Image":
                return (
                    <Image
                        width={100}
                        height={100}
                        src={order.image}
                        alt="Order item image"
                        
                    />
                );
            default:
                return null;
        }
    }, []);

    if (error) return <div>Error loading orders: {error.message}</div>;
    if (!orders) return <Skeleton>Loading...</Skeleton>;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between bg-white p-3 rounded-xl shadow-md">
                <p className="text-bold text-xl font-bold capitalize justify-center my-auto">Orders</p>
            </div>

            <Table layout="fixed" aria-label="Orders table" scroll={{ x: '100vw' }}>
                <TableHeader columns={[
                    { uid: "Product Id", name: "Product Id" },
                    { uid: "Product", name: "Product" },
                    { uid: "Price", name: "Price" },
                    { uid: "Image", name: "Image" }
                ]}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "ACTION" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={orders}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default Orders;
