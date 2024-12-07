'use client'
import { Button } from "@nextui-org/react";
import { UserPlusIcon, TagIcon, ChartBarSquareIcon, DocumentTextIcon } from '@heroicons/react/24/solid'
import { ThemeContext } from '../context/themeContext/context'
import { useContext } from 'react'

import clsx from "clsx";
const SectionCard = (props) => {

    const { products, orders, users, category } = props
    const p = products.length;
    const o = orders.length;
    const u = users.length;
    const c = category.length;
    const { dark } = useContext(ThemeContext);



    const cardItems = [
        {
            icon: ChartBarSquareIcon,
            color: "#00949E",
            title: p,
            des1: "Total Products",
            des2: "+4% from yesterday",
            bgicon: "#025a60"
        },
        {
            icon: DocumentTextIcon,
            color: "#FFC557",
            title: o,
            des1: "Total Orders",
            des2: "+05%from yesterday",
            bgicon: "#87611a"
        }, {
            icon: TagIcon,
            color: "#ed7b5b",
            title: c,
            des1: "Category",
            des2: "+3%from yesterday",
            bgicon: "#974129"
        }, {
            icon: UserPlusIcon,
            color: "#5D60EF",
            title: u,
            des1: "New Cutomers",
            des2: "+1%from yesterday",
            bgicon: "#3c3e9d"
        }
    ]
    return (
        <div className="flex flex-col gap-4n">
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className={clsx(
                        'font-bold text-lg',
                        dark ? 'text-[#17191b]' : ' text-white'

                    )}>Todays Sales</h1>
                    <h1 className={clsx(
                        'text-sm my-2',
                        dark ? 'text-neutral-500' : 'text-white'
                    )}>Sales Summery</h1>
                </div>
                <Button className="px-8 border border-[#5D60EF] bg-white text-black" size="sm" >
                    Export
                </Button>
            </div>
            <div className="grid grid-rows-1 grid-cols-4 gap-5 max-md:grid-cols-2">
                {cardItems.map((i, index) => (
                    <div key={index} className={`flex flex-col gap-2 rounded-lg p-3`
                    } style={{ backgroundColor: i.color }}>

                        <div className="rounded-full flex flex-col  h-8 w-8" style={{ backgroundColor: i.bgicon }}>
                            <i.icon className=" h-5 w-5  m-auto justify-center text-white" aria-hidden="true" />
                        </div>
                        <span className="text-xl font-bold text-[#000000]">{i.title}</span>
                        <span className="font-semibold text-[#000000]">{i.des1}</span>
                        <span className="text-[8px] text-white">{i.des2}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SectionCard