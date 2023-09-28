import React, {useEffect, useState, Fragment} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Combobox  } from '@headlessui/react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Form.module.css'


function ViewEdit() {

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const {id} = useParams();


    const [genter, setGenter] = useState([]);
    const [gestante, setGestante] = useState([]);

    const [values, setValues] = useState({
        cliente: '',
        telefone: '',
        profissional: '',
        servico: '',
        dataNascimento: '',
        dataServico: '',
        hora: '',
        tempo: '',
        pagamento: '',
        valor: '',
        gestante: '',
        alergica: '',
        alergia: ''
    });


    useEffect(() =>{

        axios.get('http://node147829-login-adce.jelastic.saveincloud.net/view/'+id)
        .then(res => {
            /*const dataNascimento = res.data[0].dataNascimento.split('T')[0];
            const dataServico = res.data[0].dataServico.split('T')[0];
            */
            setValues({...values, 
            cliente: res.data[0].cliente,
            telefone: res.data[0].telefone,
            profissional: res.data[0].profissional,
            servico: res.data[0].servico,
            datanasc:  res.data[0].dataNascimento,
            dataatend: res.data[0].dataServico,
            hora: res.data[0].hora,
            tempo: res.data[0].tempo,
            pagamento: res.data[0].pagamento,
            valor: res.data[0].valor,
            gestante: res.data[0].gestante,
            alergica: res.data[0].alergica,
            alergia: res.data[0].alergia
            })
        })
        .catch(err => alert('falha!'));
    }, [id])


    const [servico, setServico] = useState([]);

    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState([]);
    const [name, setName] = useState([]);
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://node147829-login-adce.jelastic.saveincloud.net/servicos')
        .then(res => setServico(res.data))
        .catch(err => console.log(err));

        axios.get('http://node147829-login-adce.jelastic.saveincloud.net/verify')
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

    const handleUpdate = (event) =>{
        event.preventDefault();
        axios.put('http://node147829-login-adce.jelastic.saveincloud.net/update/'+id, values)
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
    <div className="p-5 min-h-screen bg-gray-100 items-center">
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
        <form onSubmit={handleUpdate} className='w-[30rem] h-[32rem] bg-white rounded-md shadow-md'>
        <Link to={'/agenda'}>
        <button className="ml-2 text-red-500 mt-1">Voltar</button>
        </Link>
            <h1 className="text-center h-5 font-bold text-xl">Visualize ou Edite</h1>
            
            
            <div className="w-[80%] items-center overflow-scroll h-[25rem]">

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
                        {servico.map((servico) => (
                        <option key={servico.id} value={servico.nome}>
                        {servico.tituloServico}
                         </option>
                        ))}
                    </select>
                </div>

                <label htmlFor=''>Data Nascimento</label>
                <div className={styles.box}>
                <input type="date" className={styles.input_field}
                value={values.dataNascimento}
                onChange={e => setValues({...values, dataNascimento: e.target.value})}
                />
                </div>

                <label htmlFor=''>Data Atendimento</label>
                <div className={styles.box}>
                <input type="date" className={styles.input_field}
                value={values.dataServico}
                min={getCurrentDate()}
                onChange={e => setValues({...values, dataServico: e.target.value})}
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
                <label htmlFor=''>Forma de pagamento:</label>
                <div className={styles.box}>
                <select placeholder='Escolha o Serviço'
                value={values.pagamento}
                onChange={e => setValues({...values, pagamento: e.target.value})}
                >
                        <option>---</option>
                        <option>Pix</option>
                        <option>Dinheiro</option>
                        <option>Crédito</option>
                        <option>Débito</option>
                    </select>
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
            
            <div className="w-4/5 items-center justify-center shadow-md">
            <button className="w-full bottom-2 rounded tracking-wider shadow-md
            bg-gray-900 p-2 text-white">Atualizar</button>
            </div>
        </form>
    </div>
  )
}

export default ViewEdit