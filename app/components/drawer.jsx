'use client'
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { ChartPieIcon, XMarkIcon, ShoppingBagIcon, ArrowRightOnRectangleIcon, UsersIcon, ShoppingCartIcon, Square3Stack3DIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { usePathname, } from "next/navigation";
const Drawer = ({ isOpens, onClose, position = "right", children }) => {
  const signOut = () => {
    // LogOut();
    // router.replace('/');
  };
  const pathname = usePathname();
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: ChartPieIcon },
    { name: "User", href: "/dashboard/users", icon: UsersIcon },
    { name: "Products", href: "/dashboard/products", icon: ShoppingBagIcon },
    { name: "Categories", href: "/dashboard/category", icon: Square3Stack3DIcon },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCartIcon },
  ];
  return (
    <div className={clsx("drawer-overlay", { open: isOpens })} onClick={onClose}>
      <div
        className={clsx("drawer", position, { open: isOpens })}
        onClick={(e) => e.stopPropagation()} >
        <div className="drawer-close w-6 h-6" onClick={onClose}>
          <XMarkIcon />
        </div>
        <div className="drawer-content">
          <div>
            <div className="h-14 border-b-[0.05px] flex border-[#eeeeee]">
              <div className="flex flex-row justify-around m-auto gap-3">
                <RocketLaunchIcon className="w-8 h-8 my-auto bg-[#5D60EF] text-white rounded-md p-2 " />
                <span className={clsx(
                  'm-auto  font-semibold  text-[#17191b]'
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
                className='flex items-center rounded-lg py-2 px-4 text-sm
                 bg-white text-neutral-600 hover:text-[#5D60EF] hover:bg-[#f0f0f0] cursor-pointer'
                onClick={signOut}>
                <ArrowRightOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                Sign Out
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-1 mb-1 ">
            <span className="text-sm text-neutral-500 text-center my-auto">
              © designed by
            </span>
            <svg className="my-auto w-3 h-3  text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5); // پس زمینه نیمه شفاف برای صفحه
          opacity: 0;
          visibility: hidden;
          transition: visibility 0.3s, opacity 0.3s;
          z-index: 999;
        }
        .drawer-overlay.open {
          opacity: 1;
          visibility: visible;
        }
        .drawer {
          position: fixed;
          top: 0;
          bottom: 0;
          width: 300px;
          background-color: white;
          transition: transform 0.3s ease;
          z-index: 1000;
        }
        .drawer.right {
          right: 0;
          transform: translateX(100%);
        }
        .drawer.left {
          left: 0;
          transform: translateX(-100%);
        }
        .drawer.open.right {
          transform: translateX(0);
        }
        .drawer.open.left {
          transform: translateX(0);
        }
        .drawer-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .drawer-content {
          padding: 20px;
          overflow-y: auto;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Drawer



