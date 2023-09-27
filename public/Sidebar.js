import React, { useState } from 'react'
import {useNavigate} from 'react-router'
import axios from 'axios'
import '../App.css';
import {BiHome, BiCalendar, BiDollarCircle} from 'react-icons/bi'
import {GoGear} from 'react-icons/go'
import {GiExitDoor} from 'react-icons/gi'
import {RxHamburgerMenu} from  'react-icons/rx'
import {LiaCashRegisterSolid} from 'react-icons/lia'
import { NavLink } from 'react-router-dom'

const Sidebar = ({children}) =>  {
    
    const navigate = useNavigate();

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

    
    const handleLogout = (e) => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            if(res.data.status === "Success") {
            //window.location.reload(true);
            navigate('/login');
            } else {
                alert("Erro");
            }
        }).catch(err => console.log(err));
    }

  return (
    <div className="container">
        <div style={{width: isOpen ? "auto" : "65px"}}  className="sidebar">
            <div className="top_section">
                <h1 style={{display: isOpen ? "block" : "none"}}  className="logo">
                
                <button onClick={handleLogout} 
                style={{
                    background: "none",
                    border: "none",
                    borderBottom: " 1px solid rgb(156, 57, 236)",
                    height: "30px",
                    width: "65px",
                    padding: "5px 1px",
                    fontSize: "18px",
                    color: "rgb(156, 57, 236)",
                    borderRadius: "1px",
                    cursor: "pointer",
                    marginRight: "0px"
                    }}
                ><GiExitDoor/> Sair</button>
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