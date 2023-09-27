import React, {useState} from 'react'
import styles from './Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormServico() {

    const [values, setValues] = useState({
        tituloServico:''
    });

    const handleSubmit = (e) => {

        e.preventDefault();
        axios.post('http://localhost:8081/register_servico', values)
        .then(res => {
            if(res.status===200) {
            console.log(res);
            toast.success('Servico Cadastrado!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                
                setTimeout(()=>{
                    window.location.reload();
                }, 2500);
            }
        })
        .catch(err => console.log(err))
    }

    

  return (
    <div className={styles.form_content}>
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
        <div className={styles.header_title}>
        <h1 className={styles.title}>Novo Servico</h1>

        </div>

        <form onSubmit={handleSubmit} >
            
            <div className={styles.user_details}>

                <label htmlFor=''>Servico</label>

                <div className={styles.box}>
                    <input type="text" placeholder='Digite o Servico'
                    className={styles.input_field}
                    onChange={e => setValues({...values, tituloServico: e.target.value})}
                    />
                </div>
                
            </div>
            <div className={styles.button}>
            <button className={styles.button_action}>Registrar</button>
            </div>
        </form>

    </div>
  )
}

export default FormServico