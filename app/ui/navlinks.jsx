'use client'
import { Accordion, AccordionItem } from "@nextui-org/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = () => {

    const pathname = usePathname();
    const itemClasses = {
        base: " py-0 w-full",
        title: "font-normal text-[14px] text-[#ffffff]",
        trigger: "px-2 py-0 data-[hover=true]:bg-[#ffffff1a] rounded-md h-10 flex gap-4 items-center",
        indicator: "text-large ",
        content: "text-small w-full px-2  flex flex-col gap-1",
    };

    return (
        <div className="flex flex-col p-4 justify-between">
            <Link className="px-4 text-[14px]  text-[#ffffff] hover:bg-[#ffffff1a]  rounded-md h-10 items-center flex" href="/">Dashboard</Link>

            <Accordion showDivider={false} itemClasses={itemClasses}>
                {/* User */}
                <AccordionItem key="1" aria-label="Accordion 1" title="Useres">
                    <Link className={clsx(
                        'px-4 text-[14px]  rounded-md h-10 items-center flex ',
                        pathname === "/users" ? ' text-red-950 font-bold select-none cursor-auto hover:bg-none' :
                            'hover:bg-[#ffffff1a] text-[#c2c3c5]'
                    )}
                        href="users">users</Link>

                    <Link className={clsx(
                        'px-4 text-[14px]  rounded-md h-10 items-center flex ',
                        pathname === "/add/users" ? ' text-red-950 font-bold select-none cursor-auto hover:bg-none' :
                            'hover:bg-[#ffffff1a] text-[#c2c3c5]'
                    )}
                        href="users">add user</Link>
                    <Link className={clsx(
                        'px-4 text-[14px]  rounded-md h-10 items-center flex ',
                        pathname === "/delete/user" ? ' text-red-950 font-bold select-none cursor-auto hover:bg-none' :
                            'hover:bg-[#ffffff1a] text-[#c2c3c5]'
                    )}
                        href="users">delete user</Link>
                </AccordionItem>
                {/* Products */}
                <AccordionItem key="2" aria-label="Products" title="Products">
                    <Link className={clsx(
                        'px-4 text-[14px]  rounded-md h-10 items-center flex ',
                        pathname === "/products" ? ' text-red-950 font-bold select-none cursor-auto hover:bg-none' :
                            'hover:bg-[#ffffff1a] text-[#c2c3c5]'
                    )}
                        href="users">products</Link>
                </AccordionItem>
                {/* Category */}
                <AccordionItem key="3" aria-label="Category" title="Category">
                    <Link className={clsx(
                        'px-4 text-[14px]  rounded-md h-10 items-center flex ',
                        pathname === "/category" ? ' text-red-950 font-bold select-none cursor-auto hover:bg-none' :
                            'hover:bg-[#ffffff1a] text-[#c2c3c5]'
                    )}
                        href="users">category</Link>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
export default Navlinks