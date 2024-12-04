'use client'
import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import { Switch, select, User, Avatar, Skeleton } from "@nextui-org/react";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";
import clsx from 'clsx';
import { ThemeContext } from '../context/themeContext/context'
import axios from 'axios';
import { AuthContext } from '../context/auth-context/contaxt';
import useSWR from 'swr';
import Drawer from '../components/drawer'
import { Bars3Icon } from '@heroicons/react/24/outline';

const Header = () => {
  const [selected, setSelected] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [color, setColor] = useState("")
  const { ChangeTheme } = useContext(ThemeContext);
  const [adminData, setAdminData] = useState([])
  const { CheckUser, GetUser } = useContext(AuthContext);
  const [id, setId] = useState(null);


  useEffect(() => {
    if (CheckUser()) {
      setId(GetUser());
    }
  }, [CheckUser, GetUser]);

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data: admin } = useSWR(`http://localhost:8001/admins?id=${id}`, fetcher)



  const changetoggle = () => {


    if (selected) {
      setColor("text-[#757575]")
      ChangeTheme(true)
      document.body.className = 'bg-[#ffffff] ';
    }
    else {
      ChangeTheme(false)
      setColor("text-[#ffffff] hover:bg-[#c3c1c14f]")
      document.body.className = 'bg-[#2d3136] ';
    }
    setSelected(!selected)
  }
  const [isFullscreen, setIsFullscreen] = useState(false);
  const clickFullScreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  }
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }
  return (


    <header className={clsx('h-14 border-b-[1px] py-3  border-[#dfdfdf] flex flex-row justify-between px-7'
      , {
        'bg-[#2d3136] shadow-xl': selected,
        'bg-white': !selected
      }
    )}>
      <div className='flex flex-row justify-around my-auto gap-6'>
        <span className={`text-[#6c6c6c] text-xl mx-auto font-bold hover:text-[#1a1a1a] ${color} max-md:hidden`}>Dashboard</span>
        <Link className={`text-[#6c6c6c] text-sm my-auto hover:text-[#1a1a1a] ${color} max-md:hidden`} href="">Visit Site</Link>
        <Switch
        className='max-md:hidden'
          defaultSelected
          size="sm"
          color="primary"
          isSelected={selected}
          onChange={changetoggle}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <MoonIcon className={className} />
            ) : (
              <SunIcon className={className} />
            )
          }
        >
        </Switch>
        <div className='h-6 w-6 my-auto lg:hidden' onClick={toggleDrawer}>
        <Drawer isOpens={isDrawerOpen} onClose={toggleDrawer} position="left"/>

        <Bars3Icon />
        </div>

 
      </div>
      <div className='flex flex-row justify-around my-auto gap-1'>
        <div className='flex flex-row-reverse justify-start gap-2 my-auto'>
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="md" />
          <div className='flex flex-col text-right'>
            <span className={`text-[#6c6c6c] text-sm my-auto hover:text-[#1a1a1a] ${color}`}>
              {admin && admin.length > 0 ? admin[0].username : 'Loading...'}
            </span>
            <span className={`text-[#6c6c6c] text-[7px] my-auto hover:text-[#1a1a1a] ${color} max-md:hidden`}>Admin</span>
          </div>

        </div>
   
        <Drawer />

        {/* 
        <Tooltip title="Setting">
         <IconButton>
          <h1>change theme</h1>
          </IconButton>
        </Tooltip> */}




      </div>
    </header >

  )
}
export default Header