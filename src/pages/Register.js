import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'

import {HiOutlineUserPlus} from 'react-icons/hi2'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


function Register() {

    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState([]);
    const [name, setName] = useState([]);
    axios.defaults.withCredentials = true;

    useEffect(() =>{
        axios.get('http://apis-backend.jelastic.saveincloud.net/verify')
        .then(res => {
            if(res.data.Status === "Success") {
              setAuth(true)
              setName(res.data.name)
            } else {
              setAuth(false)
              setMessage(res.data.Error);
              navigate('/login');
            }
        })
    }, [])

    const [values, setValues] = useState({
        name: '',
        user: '',
        password: ''
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://apis-backend.jelastic.saveincloud.net/newuser', values)
        .then(res => {
            if(res.data.Status === "Success") {
                toast.info('Usuário Criado!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    } );
                    setTimeout(()=>{
                      window.location.reload();
                  }, 2000);
            } else {
                alert('Erro');
            }
        })
        .then(err => console.log(err));
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">

            <div className="relative flex flex-row m-6 space-y-8 bg-white
            max-w-4xl drop-shadow-2xl rounded-lg md:flex-row md:space-y-0 max-w-sx">
            
            <ToastContainer position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
            />
        
            <div className="flex flex-col justify-center p-8 md:p-14">
            
                <span className="mb-3 text-2xl font-mediun"> <HiOutlineUserPlus className='inline text-gray-500'/> Novo Usuário
                </span>
                <form onSubmit={handleSubmit}>
                <div className='py-4'>
                <div className='py-4'>
                        <label className='mb-2 text-md ml-0'>Informe o Nome</label>

                        <input type="text" placeholder='Nome do Usuário' name='name' 
                        autoComplete="off"
                        onChange={e => setValues({...values, name: e.target.value})}
                        className='w-full p-3 border border-gray-300 rounded-md outline-none focus:shadow
                        placeholder:font-light placeholder:text-gray-400 duration-200 focus:border-black'
                        />
                    </div>
                <div className='py-4'>
                        <label className='mb-2 text-md ml-0'>Informe o Usuário</label>

                        <input type="text" placeholder='E-mail ou Usuário' name='user' 
                        autoComplete="off"
                        onChange={e => setValues({...values, user: e.target.value})}
                        className='w-full p-3 border border-gray-300 rounded-md outline-none focus:shadow
                        placeholder:font-light placeholder:text-gray-400  duration-200 focus:border-black'
                        />
                    </div>
                        <label className='mb-2 text-md ml-0'>Senha</label>

                        <input type="password" placeholder='Senha' name='password'
                        autoComplete="off"
                        onChange={e => setValues({...values, password: e.target.value})}
                        className='w-full p-3 border border-gray-300 rounded-md outline-none focus:shadow
                        placeholder:font-light placeholder:text-gray-400  duration-200 focus:border-gray-500'
                        />
                    </div>
                    <hr className="text-gray-300 my-2 w-full"/>
                    <button type='submit'
                    className='w-full bg-black text-white p-3 rounded-md  outline-none
                    text-xl font-light mt-1 mb-1 hover:font-medium'>Cadastrar</button>
                </form>
            </div>
        </div>
        
        </div>
  )
}

export default Register