'use client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeContext } from '../context/themeContext/context';
import { useEffect, useContext, useState } from "react";
import Cookie from 'js-cookie';
import axios from 'axios';
import clsx from "clsx";
import { ChartPieIcon, ShoppingBagIcon, ArrowRightOnRectangleIcon, UsersIcon, ShoppingCartIcon, Square3Stack3DIcon,RocketLaunchIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../context/auth-context/contaxt';
import useSWR from 'swr';


const SideBar = () => {
    const links = [
        { name: "Dashboard", href: "/dashboard", icon: ChartPieIcon },
        { name: "User", href: "/dashboard/users", icon: UsersIcon },
        { name: "Products", href: "/dashboard/products", icon: ShoppingBagIcon },
        { name: "Categories", href: "/dashboard/category", icon: Square3Stack3DIcon },
        { name: "Orders", href: "/dashboard/orders", icon: ShoppingCartIcon },
    ];

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const pathname = usePathname();
    const { dark } = useContext(ThemeContext);
    const { LogOut } = useContext(AuthContext);



    // useEffect(() => {
    //     const fetchAdmin = async () => {
    //         const userId = Cookie.get('user');
    //         if (userId) {
    //             try {
    //                 const response = await axios.get(`/api/admins/get-admin?id=${id}`);
    //                 setAdmin(response.data);
    //             } catch (error) {
    //                 console.error('خطا در دریافت اطلاعات ادمین:', error);
    //             }
    //         }
    //     };
    //     fetchAdmin();
    // }, []);

    const signOut = () => {
        LogOut();
        router.replace('/');
    };
    return (
        <div className={clsx(
            'flex flex-col h-screen justify-between shadow-xl w-[250px] max-md:hidden',
            dark ? 'bg-white' : 'bg-[#17191b]'
        )}>
            <div>
                <div className="h-14 border-b-[0.05px] flex border-[#eeeeee]">
                    <div className="flex flex-row justify-around m-auto gap-3">
                    <RocketLaunchIcon className="w-8 h-8 my-auto bg-[#5D60EF] text-white rounded-md p-2 "/>
                    <span className={clsx(
                        'm-auto  font-semibold',
                        dark ? 'text-[#17191b]' : 'text-white'

                    )}>MY PANEL</span>
                    </div>
                
                </div>
                <div className="flex flex-col gap-5 p-4">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={clsx(
                                'flex items-center rounded-lg py-2 px-4 text-center space-x-2 text-sm',
                                pathname === link.href
                                    ? 'bg-[#5D60EF] text-white select-none'
                                    : 'bg-white text-neutral-600 hover:text-[#5D60EF] hover:bg-[#f0f0f0]',
                          

                            )}
                        >
                            <link.icon className="h-5 w-5" aria-hidden="true" />
                            <span>{link.name}</span>
                        </Link>
                    ))}
                    <span
                        className='flex items-center rounded-lg py-2 px-4 text-sm bg-white text-neutral-600 hover:text-[#5D60EF] hover:bg-[#f0f0f0] cursor-pointer'
                        onClick={onOpen}>
                        <ArrowRightOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                        Sign Out
                    </span>
                </div>
            </div>
            {/* Modal for Sign Out */}
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 m-auto">Sign Out</ModalHeader>
                            <ModalBody>
                                <p className="text-[16px]">Are you sure you want to exit?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onClick={signOut}>
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* Span at the bottom */}
            <div className="flex flex-row justify-center gap-1 mb-1 ">
                <span className="text-sm text-neutral-500 text-center my-auto">
                    © designed by
                </span>
                <svg className="my-auto w-3 h-3  text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
            </div>
        </div>
    );
};
export default SideBar;
