import React, {useState} from 'react'
import styles from './Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormProdutos() {

    const [values, setValues] = useState({
        tituloProduto:'',
        quantidadeProduto:'',
        valorProduto:'',
    });

    const handleSubmit = (e) => {

        e.preventDefault();
        axios.post('http://node147829-login-adce.jelastic.saveincloud.net/register_product', values)
        .then(res => {
            if(res.status===200) {
            console.log(res);
            toast.success('Produto Registrado.', {
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
        <h1 className={styles.title}>Novo Produto</h1>

        </div>

        <form onSubmit={handleSubmit} >
            
            <div className={styles.user_details}>

                <label htmlFor=''>Título</label>

                <div className={styles.box}>
                    <input type="text" placeholder='Digite o Produto'
                    className={styles.input_field}
                    onChange={e => setValues({...values, tituloProduto: e.target.value})}
                    />
                </div>
                
                

                <label htmlFor=''>Quantidade</label>
                <div className={styles.box}>

                <input type="number" className={styles.input_field}
                placeholder='Quantidade do Produto'
                onChange={e => setValues({...values, quantidadeProduto: e.target.value})}
                min={0}
                />

                </div>
                <label htmlFor=''>Valor</label>
                <div className={styles.box}>

                <input type="text" placeholder='Valor do Produto'
                step="0.01"
                className={styles.input_field}
                onChange={e => setValues({...values, valorProduto: e.target.value})}
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

export default FormProdutos