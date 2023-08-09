import React, {useState} from 'react'
import styles from './Form.module.css'
import {BsFillClipboardCheckFill} from 'react-icons/bs'
import axios from 'axios';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
/*import { Calendar } from "react-modern-calendar-datepicker";
import DatePicker from "react-modern-calendar-datepicker";*/

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
    //const [selectedDay, setSelectedDay] = useState(null);

    const [genter, setGenter] = useState([]);
    const [gestante, setGestante] = useState([]);
    const [values, setValues] = useState({
        cliente:'',
        telefone:'',
        profissional:'',
        dataNascimento:'',
        dataServico:'',
        hora:'',
        tempo:'',
        valor:'',
        gestante:'',
        alergica:'',
        alergia:''
    });

    const handleSubmit = (e) => {

        e.preventDefault();
        axios.post('http://localhost:8081/record_client', values)
        .then(res => {
            if(res.status===200) {
            console.log(res);
            toast.success('Cliente Agendado!', {
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
                }, 2000);
            }
        })
        .catch(err => console.log(err))
    }

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
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
        <h1 className={styles.title}>Registro</h1>

        </div>

        <form onSubmit={handleSubmit}>
            
            <div className={styles.user_details}>

                <label htmlFor=''>Cliente</label>

                <div className={styles.box}>
                    <input type="text" placeholder='Digite o nome do Cliente'
                    className={styles.input_field}
                    onChange={e => setValues({...values, cliente: e.target.value})}
                    />
                </div>

                <label htmlFor=''>Telefone</label>
                <div className={styles.box}>
                    <input type="text" placeholder='Digite o telefone do Cliente' 
                    className={styles.input_field}
                    onChange={e => setValues({...values, telefone: e.target.value})}/>
                </div>

                <label htmlFor=''>Profissional</label>
                <div className={styles.box}>
                    
                    <select placeholder='Escolha a Profissional'
                    onChange={e => setValues({...values, profissional: e.target.value})}
                    >
                        <option>---</option>
                        <option>Andreza</option>
                        <option>Daiane</option>
                    </select>
                </div>

                <label htmlFor=''>Serviço:</label>
                <div className={styles.box}>
                <select placeholder='Escolha o Serviço' 
                onChange={e => setValues({...values, servico: e.target.value})}
                >
                        <option>---</option>
                        <option>Manutenção</option>
                        <option>Corte de Cabelo</option>
                        <option>Pintura</option>
                    </select>
                </div>

                <label htmlFor=''>Data Nascimento</label>

                <div className={styles.box}>

                <input type="date" className={styles.input_field} 
                onChange={e => setValues({...values, dataNascimento: e.target.value})}/>

                </div>

                <label htmlFor=''>Data Atendimento</label>

                <div className={styles.box}>

                <input type="date" className={styles.input_field} 
                onChange={e => setValues({...values, dataServico: e.target.value})}
                min={getCurrentDate()}
                />
                

                </div>

                <label htmlFor=''>Horário</label>

                <div className={styles.box}>
            
                <input className={styles.input_field} type="time"
                onChange={e => setValues({...values, hora: e.target.value})}/> 

                </div>

                <label htmlFor=''>Tempo</label>
                <div className={styles.box}>

                <input type="number" className={styles.input_field} placeholder='Tempo de Atendimento'
                onChange={e => setValues({...values, tempo: e.target.value})}
                min={0}
                />

                </div>
                <label htmlFor=''>Valor</label>
                <div className={styles.box}>

                <input type="text" placeholder='Valor do Serviço'  step="0.01" className={styles.input_field}
                onChange={e => setValues({...values, valor: e.target.value})}/>

                </div>

                <label htmlFor=''>Gestante? <p className={styles.result_field} 
                 style={{ background: gestante === 'SIM' ? 'red' : 'green', color: "#fff"}}>{gestante}</p></label>
                <div className={styles.box}>
                    
                    <input type="radio" name="gestante" value="SIM" placeholder='Nome do Cliente' className={styles.input_field}
                    //onChange={e=>setGestante(e.target.value)}
                    onChange={(e) => {
                    setValues({ ...values, gestante: e.target.value });
                    setGestante(e.target.value);
                    }}
                    
                    />
                    <input type="radio" name="gestante" value="NÃO" placeholder='Nome do Cliente' className={styles.input_field}
                    //onChange={e=>setGestante(e.target.value)}
                    onChange={(e) => {
                    setValues({ ...values, gestante: e.target.value });
                    setGestante(e.target.value);
                    }}
                    />
                    
                </div>
                <label htmlFor=''>Alérgica?
                <p className={styles.result_field} 
                 style={{ background: genter === 'SIM' ? 'red' : 'green' }}>{genter}</p>
                 </label>
                <div className={styles.box}>

                    <input type="radio" name="genter" value="SIM" placeholder='Nome do Cliente' className={styles.input_field}
                    onChange={(e) => {
                    setValues({ ...values, alergica: e.target.value });
                    setGenter(e.target.value);
                    }} />

                    <input type="radio" name="genter" value="NÃO" placeholder='Nome do Cliente' className={styles.input_field}
                    onChange={(e) => {
                    setValues({ ...values, alergica: e.target.value });
                    setGenter(e.target.value);
                    }} />

                </div>
                <label htmlFor=''>Descreva a Alergia:</label>
                <div className={styles.box}>

                <input type="text" placeholder='Digite aqui...' className={styles.input_field} 
                onChange={e => setValues({...values, alergia: e.target.value})}/>

                </div>
                
            </div>
            <div className={styles.button}>
                    <button className={styles.button_action}>Registrar <BsFillClipboardCheckFill/></button>
                </div>
        </form>

    </div>
  )
}

export default Form