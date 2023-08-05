import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router';

import styles from './Login.module.css'
import {BiLockAlt, BiUser} from 'react-icons/bi'
import {FcBusinesswoman} from 'react-icons/fc'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [pass, setPass] = useState([]);
  const [error, setError] = useState([]);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    let login = localStorage.getItem("login");
    if(login) {
        navigate("/");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if(loginStatus){
        setError(loginStatus);
        setTimeout(function(){
            localStorage.clear();
            window.location.reload();
        }, 1000)
        
    }
    setTimeout(function(){
        setMsg("");
    }, 3000);
}, [msg]);

const handleInputChange = (e, type) => {
    switch(type){
        case "user":
            setError("");
            setUser(e.target.value);
            if(e.target.value === "") {
                setError("Usuário em Branco!");
            }
            break;
            case "pass":
            setError("");
            setPass(e.target.value);
            if(e.target.value === "") {
                setError("Senha em Branco!");
            }
            break;
        default:
    }
}

function loginSubmit(){
    if(user !== "" && pass != ""){
        var url = "http://localhost:81/api2/login.php";
        var headers = {
            "Accept": "application/json",
            "Content-type": "application/json"
        };
        var Data = {
            user: user,
            pass: pass
        };
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(Data)
        }).then((response) => response.json())
        .then((response) => {
            if(response[0].result === "Invalid username!" || response[0].result === "Invalid password!"){
                setError(response[0].result);
            }
            else{
                setMsg(response[0].result);
                setTimeout(function(){
                    localStorage.setItem("login", true);
                    navigate("/");
                }, 3000);
            }
        }).catch((err) => {
            setError(err);
            console.log(err);
        })
    }
    else{
        toast.error('Preencha os campos', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setError("Preencha os campos do Login!")
    }
}

  return (
<div className={styles.container}>
    <div className={styles.form}>
        <p>
            {
            error !== "" ?
            <span className={styles.error}>{error}</span> :
            <span className={styles.success}>{msg}</span>
            }
        </p>

        <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        />
      
    
        <div className={styles.user_details}>
          <h1><FcBusinesswoman/> Painel do Cliente</h1>
          <label htmlFor=''> Informe o Usuário</label>
          <div className={styles.box}>
            <BiUser/>
          <input 
          type="text"
          value={user}
          onChange={(e) => handleInputChange(e, "user")}
              />
          </div>

          <label htmlFor=''> Senha</label>
          
          <div className={styles.box}>
          <BiLockAlt/>
          <input 
          type="password" 
          value={pass}
          onChange={(e) => handleInputChange(e, "pass")}
          />
          </div>

          <div className={styles.box_button}>
          <button
          className={styles.button}
          type='submit'
          onClick={loginSubmit}
          >Entrar</button>
          </div>
          
        </div>
    </div>
    </div>
  )
}

export default Login