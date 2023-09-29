import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import {BiLock} from 'react-icons/bi'
import {FcStatistics} from 'react-icons/fc'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const [values, setValues] = useState({
        user: '',
        password: ''
    })

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://apis-backend.jelastic.saveincloud.net/login', values)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
            } else {
                toast.error(res.data.Error, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="flex items-center justify-center min-h-screen
        bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200
        ">

            <div className="relative flex flex-row m-6 space-y-8 bg-white 
            max-w-4xl shadow-lg rounded-lg md:flex-row md:space-y-0 max-w-sx">
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

            <div className="flex flex-col justify-center p-8 md:p-14">
            
            <span className='text-gray-600'>Painel do Cliente <FcStatistics className='inline text-4xl'/></span>
                <hr className="text-gray-600 my-2 w-full"/>
                <span className="mb-3 text-4xl font-normal">Login</span>
                <form onSubmit={handleSubmit}> 
                <span className="text-gray-600 font-light mb-8">
                Informe o usuário ou email e senha para acessar
                </span>
                <div className='py-4'>
                        <label className='mb-2 text-md ml-0'>Informe o Usuário</label>

                        <input type="text" placeholder='E-mail ou Usuário' name='user' 
                        autoComplete="off"
                        onChange={e => setValues({...values, user: e.target.value})} 
                        className='w-full p-3 border border-gray-300 rounded-md outline-none focus:shadow
                        placeholder:font-light placeholder:text-gray-400  duration-200 focus:border-black '
                        />
                    </div>
                    <div className='py-4'>
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
                    className='w-full bg-black text-white p-3 rounded-md outline-none
                    text-2xl font-medium mt-1 mb-1'>Entrar <BiLock className='inline w-6 h-6 mr-2 mt-0 mb-1'/></button>
                </form>
            </div>
        </div>
        </div>
        )
}