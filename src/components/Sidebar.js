import React, { useState } from 'react'
import {useNavigate} from 'react-router'
import axios from 'axios'
import {HiOutlineHome, HiOutlineBuildingStorefront, HiOutlineCalendarDays, 
HiOutlineCurrencyDollar, HiOutlineCog6Tooth, HiOutlineUserGroup} from 'react-icons/hi2'

import {GiExitDoor} from  'react-icons/gi'
import { NavLink } from 'react-router-dom'

const Sidebar = ({children}) =>  {
    
    //const [isOpen, setIsOpen] = useState(false);

    //const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "home",
            icon: <HiOutlineHome/>
        },
        {
            path: "/agenda",
            name: "agenda",
            icon: <HiOutlineCalendarDays/>
        },
        {
            path: "/caixa",
            name: "caixa",
            icon: <HiOutlineBuildingStorefront/> 
        },
        {
            path: "/receita",
            name: "Receita",
            icon: <HiOutlineCurrencyDollar/>
        },
        {
            path: "configurar",
            name: "Ajustes",
            icon: <HiOutlineCog6Tooth/>
        },
        {
            path: "newuser",
            name: "Usuários",
            icon: <HiOutlineUserGroup/>
        }

    ]

    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get(' http://localhost:8081/logout')
        .then(res => {
            window.location.reload(true);
        }).catch(err => console.log(err));
    }

    const [active, setActive] = useState(0);

  return (
    <div>
            

            <div className={`hidden md:block border-r-2 z-10 fixed top-0 bottom-0 lg:left-0 p-2 w-24 text-left bg-gray-800 shadow-md`}>

            <div className="text-gray-200 text-xl">
                <div onClick={handleLogout} 
                className="p-2.5 mt-1 flex items-center border border-gray-100 rounded cursor-pointer">
                <GiExitDoor className='text-4xl' />
                <h1 className='font-light text-gray-200 text-[15px] mr-0 items-start'>Sair</h1>
                </div>
            </div>

            <div className='p-3.5 flex-row rounded-md duration-300 cursor-pointer gap-2 '>
             {
                menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="flex-col items-center mt-3">
                        <a onClick={() => setActive(index)}>
                        <div className={`text-black text-4xl
                        ${
                        active === index 
                        ? 'bg-slate-100 text-black w-[50px] p-1.5 text-left rounded-full list-disc duration-200' : 
                        "translate-y-1 text-slate-200 hover:rounded-full hover:duration-150 hover:bg-gray-300 hover:text-black"}`}>{item.icon}</div>
                        <span className="text-[12px] text-gray-200 ml-1 tracking-wider tex-center text-left font-medium capitalize">{item.name}</span>
                        </a>
                        </NavLink>
                    ))
                }
            </div>
            </div>

            <div className='fixed bottom-0 bg-white border drop-shadow-md border-gray-200 w-full h-20 rounded md:hidden'>

            <ul className='flex relative'>
             {
                menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="items-center mt-5">
                        <li className="flex text-2xl text-gray-900 flex-col" >
                            <a className='flex flex-col pt-0' 
                            onClick={() => setActive(index)}>
                            <span className={`text-black text-4xl h-full
                            ${
                            active === index 
                            ? ' bg-slate-900 border-b-4 text-white p-2 rounded-full bottom-1 list-disc duration-200' : 
                            "translate-y-1"}`}>{item.icon}</span>
                            </a>
                            </li>
                            
                        </NavLink>
                    ))
                }
            </ul>
            </div>
            <main>{children}</main>
            </div>
            
  )
}

export default  Sidebar;

