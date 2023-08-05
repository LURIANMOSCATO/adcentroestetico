import { useEffect } from "react";
import { useNavigate } from "react-router";

const Protected = (props) => {
    const navigate = useNavigate();
    const { Component } = props;
    useEffect(() =>{
    let login = localStorage.getItem("login");
    if(!login) {
        localStorage.setItem("loginStatus", "Logue para Acessar!");
        navigate("/login", {replace: true});
    }
    }, [])

    return (
        <Component/>
        );
}

export default Protected;