'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Progress, Skeleton, Divider } from "@nextui-org/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from '../context/themeContext/context'
import clsx from "clsx";



const TopProducts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { dark } = useContext(ThemeContext);

    useEffect(() => {
        axios.get('http://localhost:8001/top-products')
            .then(response => {
                setData(response.data);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const columns = [
        { uid: "Id", name: "#" },
        { uid: "Name", name: "name" },
        { uid: "Popularity", name: "popularity" },
        { uid: "Sales", name: "sales" },

    ];
    const renderCell = (product, columnKey) => {
        const cellValue = product[columnKey];
        switch (columnKey) {
            case "Id":
                return <p className="text-bold text-sm capitalize text-default-400">{product.id}</p>;

            case "Name":
                return <p className="text-bold text-[12px] truncate max-w-[180px] text-black">{product.name}</p>;
            case "Popularity":
                return <Progress
                    size="sm"
                    aria-label="Loading..."
                    value={product.popularity}
                    classNames={{
                        base: "max-w-md",
                        indicator: `bg-[#5D60EF]`
                    }}
                />
            case "Sales":
                return <div className="">
                    <span className="text-[#5D60EF]
                     border border-[#5D60EF] rounded-md text-[10px] font-bold px-3 py-[2px] bg-[#5d5fef2a]">
                        {product.popularity}%</span>
                </div>
            default:
                return cellValue;
        }
    };
    return (
        <div className={clsx(
            'flex flex-col rounded-2xl p-3 shadow-2xl',
            dark ? 'bg-white' : 'bg-[#17191b]'

        )}>
            <span className={clsx(
                'font-bold text-xl ml-4 my-2',
                dark ? 'text-[#17191b]' : 'text-white'

            )}>Top Products</span>
            {loading ? (
                <Skeleton className="rounded-xl ">
                    <div className="flex flex-col gap-4">

                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="h-12 w-full bg-gray-200 rounded-lg radiu" />
                        ))}
                    </div>
                </Skeleton>
            ) : (
                <Table
                    layout="fixed"
                    radius="lg"
                    shadow="none"
                    aria-label="Product Table">
                    <TableHeader
                        columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        items={data}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
export default TopProducts