import React, { useState } from 'react'
import {useNavigate} from 'react-router'
import '../App.css';
import {BiHome, BiCalendar, BiDollarCircle} from 'react-icons/bi'
import {GoGear} from 'react-icons/go'
import {RiUserSharedLine} from 'react-icons/ri'
import {RxHamburgerMenu, RxScissors} from  'react-icons/rx'
import {LiaCashRegisterSolid} from 'react-icons/lia'
import { NavLink } from 'react-router-dom'

const Sidebar = ({children}) =>  {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "home",
            icon: <BiHome/>
        },
        {
            path: "/agenda",
            name: "agenda",
            icon: <BiCalendar/>
        },
        {
            path: "/caixa",
            name: "caixa",
            icon: <LiaCashRegisterSolid/> 
        },
        {
            path: "/faturamento",
            name: "faturamento",
            icon: <BiDollarCircle/>
        },
        {
        path: "configurar",
        name: "Configurar",
        icon: <GoGear/>
        }
    ]

    const navigate = useNavigate();
    
    function logoutSubmit(){
        localStorage.setItem("login", false);
        localStorage.setItem("loginStatus", "Deslogado!");
        navigate("/login");
    }

  return (
    <div className="container">
        <div style={{width: isOpen ? "auto" : "65px"}}  className="sidebar">
            <div className="top_section">
                <h1 style={{display: isOpen ? "block" : "none"}}  className="logo">
                <RxScissors/>
                <br/>
                <button onClick={logoutSubmit} 
                style={{
                    background: "none",
                    border: " 1px solid rgb(156, 57, 236)",
                    height: "35px",
                    width: "60px",
                    padding: "5px 2px",
                    fontSize: "16px",
                    color: "rgb(156, 57, 236)",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "0px"
                    }}
                ><RiUserSharedLine/> Sair</button>
                </h1>
                <div style={{marginLeft: isOpen ? "30px" : "0px"}}  className="bars">
                    <RxHamburgerMenu onClick={toggle}/>
                </div>
            </div>
            <div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}}  className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
                <div>

                </div>
                <main>{children}</main>
                </div>

        </div>

    </div>
  )
}

export default  Sidebar;