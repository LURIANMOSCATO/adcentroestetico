import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Form.module.css'
import {FaSave} from 'react-icons/fa'


function ViewEdit() {

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const {id} = useParams();
    const navigate = useNavigate();


    const [genter, setGenter] = useState([]);
    const [gestante, setGestante] = useState([]);

    const [values, setValues] = useState({
        cliente: '',
        telefone: '',
        profissional: '',
        servico: '',
        datanasc: '',
        dataatend: '',
        hora: '',
        tempo: '',
        valor: '',
        gestante: '',
        alergica: '',
        alergia: ''
    });

    useEffect(() =>{
        axios.get('http://localhost:8081/view/'+id)
        .then(res => {
            const dataNascimento = res.data[0].dataNascimento.split('T')[0];
            const dataServico = res.data[0].dataServico.split('T')[0];

            setValues({...values, 
            cliente: res.data[0].cliente,
            telefone: res.data[0].telefone,
            profissional: res.data[0].profissional,
            servico: res.data[0].servico,
            datanasc:  dataNascimento,
            dataatend: dataServico,
            hora: res.data[0].hora,
            tempo: res.data[0].tempo,
            valor: res.data[0].valor,
            gestante: res.data[0].gestante,
            alergica: res.data[0].alergica,
            alergia: res.data[0].alergia
            })
        })
        .catch(err => alert('falha!'));
    }, [id])

    const handleUpdate = (event) =>{
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id, values)
        .then(res => {
            console.log(res)
            toast.success('Alteração Realizada!', {
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
                    navigate('/agenda');
                }, 3000);
        }).catch(err => console.log(err));
    }

  return (
    <div className={styles.container}>
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        />
        <form onSubmit={handleUpdate} className={styles.editview}>
            <h1 className={styles.titleview}>Visualize ou Edite</h1>
            
            <div className={styles.user_details}>

                <label htmlFor=''>Cliente</label>

                <div className={styles.box}>
                    <input type="text" placeholder='Digite o nome do Cliente'
                    className={styles.input_field}
                    value={values.cliente}
                    onChange={e => setValues({...values, cliente: e.target.value})}
                    />
                </div>

                <label htmlFor=''>Telefone</label>
                <div className={styles.box}>
                    <input type="text" placeholder='Digite o telefone do Cliente' 
                    className={styles.input_field}
                    value={values.telefone}
                    onChange={e => setValues({...values, telefone: e.target.value})}
                    />
                </div>

                <label htmlFor=''>Profissional</label>
                <div className={styles.box}>
                    
                    <select placeholder='Escolha a Profissional'
                    value={values.profissional}
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
                value={values.servico}
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
                value={values.datanasc}
                onChange={e => setValues({...values, datanasc: e.target.value})}
                />
                </div>

                <label htmlFor=''>Data Atendimento</label>
                <div className={styles.box}>
                <input type="date" className={styles.input_field}
                value={values.dataatend}
                min={getCurrentDate()}
                onChange={e => setValues({...values, dataatend: e.target.value})}
                />
                

                </div>

                <label htmlFor=''>Horário</label>
                <div className={styles.box}>
                <input className={styles.input_field} type="time"
                value={values.hora}
                onChange={e => setValues({...values, hora: e.target.value})}
                /> 

                </div>

                <label htmlFor=''>Tempo</label>
                <div className={styles.box}>

                <input type="number" className={styles.input_field} placeholder='Tempo de Atendimento'
                value={values.tempo}
                onChange={e => setValues({...values, tempo: e.target.value})}
                />

                </div>
                <label htmlFor=''>Valor</label>
                <div className={styles.box}>
                <input type="text" placeholder='Valor do Serviço' step="0.01" className={styles.input_field}
                value={values.valor}
                onChange={e => setValues({...values, valor: e.target.value})}
                />

                </div>

                <label htmlFor=''>Gestante?
                <p className={styles.result_field} 
                 style={{ background: values.gestante === 'SIM' ? 'red' : 'green', color: "#fff"}}>{values.gestante}</p>
                 </label>
                <div className={styles.box}>
                    
                    <input type="radio"
                     name="gestante" 
                     value="SIM" 
                    className={styles.input_field}
                    //onChange={e=>setGestante(e.target.value)}
                    onChange={(e) => {
                    setValues({ ...values, gestante: e.target.value });
                    setGestante(e.target.value);
                    }}
                    checked={values.gestante === "SIM"}
                    
                    />
                    <input type="radio" 
                    name="gestante" 
                    value="NÃO"
                    className={styles.input_field}
                    //onChange={e=>setGestante(e.target.value)}
                    onChange={(e) => {
                    setValues({ ...values, gestante: e.target.value });
                    setGestante(e.target.value);
                    }}
                    checked={values.gestante === "NÃO"}
                    />
                    
                </div>
                <label htmlFor=''>Alérgica?
                <p className={styles.result_field} 
                 style={{ background: values.alergica === 'SIM' ? 'red' : 'green' }}>{values.alergica}</p>
                 </label>
                <div className={styles.box}>

                    <input type="radio" name="genter" value="SIM" className={styles.input_field}
                    onChange={(e) => {
                    setValues({ ...values, alergica: e.target.value });
                    setGenter(e.target.value);
                    }}
                    checked={values.alergica === "SIM"}
                    />

                    <input type="radio" name="genter" value="NÃO" className={styles.input_field}
                    onChange={(e) => {
                    setValues({ ...values, alergica: e.target.value });
                    setGenter(e.target.value);
                    }}
                    checked={values.alergica === "NÃO"}
                    />

                </div>
                <label htmlFor=''>Descreva a Alergia:</label>
                <div className={styles.box}>

                <input type="text" placeholder='Digite aqui...' className={styles.input_field} 
                onChange={e => setValues({...values, alergia: e.target.value})}
                value={values.alergia}
                />

                </div>
                
            </div>
            <div className={styles.buttonview}>
                <Link to={'/agenda'}>
                <button className={styles.button_action}>Voltar</button>
                </Link>
                    
                <button className={styles.button_action}>Atualizar <FaSave/></button>
                </div>
        </form>
    </div>
  )
}

export default ViewEdit