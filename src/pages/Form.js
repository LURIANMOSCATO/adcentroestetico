import React, {useEffect, useState} from 'react'
import axios from 'axios';

/*import DatePicker from "react-modern-calendar-datepicker";*/

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
    //const [selectedDay, setSelectedDay] = useState(null);

    const [genter, setGenter] = useState([]);
    const [gestante, setGestante] = useState([]);
    const [servico, setServico] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8081/servicos')
        .then(res => setServico(res.data))
        .catch(err => console.log(err));
    }, [])

    const [values, setValues] = useState({
        cliente:'',
        telefone:'',
        profissional:'',
        dataNascimento:'',
        dataServico:'',
        hora:'',
        tempo:'',
        pagamento: '',
        valor:'',
        gestante:'',
        alergica:'',
        alergia:''
    });

    const handleSubmit = (e) => {

        e.preventDefault();
        if (!values.cliente || !values.telefone || !values.profissional || !values.dataNascimento || !values.dataServico || !values.hora ||!values.pagamento ||!values.valor) {
            toast.error('Preencha todos os campos para continuar.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

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
    <div className="bg-white w-full">

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

        <div className=" rounded-lg shadow-md top-px">
        <h1 className="text-xl p-2">Agendamento</h1>
        </div>

        <form onSubmit={handleSubmit}>
            
            <div className="w-[80%] items-center overflow-scroll h-[29rem]">

                <label htmlFor='' className='mt-1 ml-1 font-medium'>Cliente</label>
                    <input type="text" placeholder='Digite o nome do Cliente'
                    className="w-full mr-1 outline-none border shadow focus:rounded-none focus:bg-gray-100 h-10 rounded-md"
                    onChange={e => setValues({...values, cliente: e.target.value})}
                    />

                <label htmlFor='' className='mt-1 ml-1 font-medium'>Telefone</label>
                
                    <input type="text" placeholder='Digite o telefone do Cliente' 
                    className="w-full mr-1 outline-none border shadow focus:rounded-none placeholder:text-gray-400 focus:bg-gray-100 h-10 rounded-md"
                    maxLength={11}
                    onChange={e => setValues({...values, telefone: e.target.value})}/>
                

                <label htmlFor='' className='mt-1 ml-1 font-medium'>Profissional</label>
                    
                    <select placeholder='Escolha a Profissional'
                    className="w-full mr-1 outline-none border shadow focus:rounded-none focus:bg-gray-100 h-10 rounded-md"
                    onChange={e => setValues({...values, profissional: e.target.value})}
                    >
                        <option>---</option>
                        <option>Andreza</option>
                        <option>Daiane</option>
                    </select>

                <label htmlFor='' className='mt-1 ml-1 font-medium'>Serviço:</label>
                
                <select placeholder='Escolha o Serviço'
                className="w-full mr-1 outline-none border shadow focus:rounded-none focus:bg-gray-100 h-10 rounded-md"
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
                

                <label htmlFor='' className='mt-1 ml-1 font-medium'>Data Nascimento</label>

                <input type="date" 
                className="w-full ml-2 outline-none border shadow focus:rounded-none focus:bg-gray-100 focus:rounded h-10 rounded-md"
                onChange={e => setValues({...values, dataNascimento: e.target.value})} />

                <label htmlFor='' className='mt-1 ml-1 font-medium'>Data Atendimento</label>

                <input type="date" 
                className="w-full ml-2 outline-none border shadow focus:rounded-none focus:bg-gray-100 h-10 rounded-md"
                onChange={e => setValues({...values, dataServico: e.target.value})}
                min={getCurrentDate()}
                />

                <label htmlFor='' className='mt-1 ml-1 font-medium'>Horário</label>
            
                <input type="time"
                className="w-full mr-1 outline-none border shadow focus:rounded-none focus:bg-gray-100 h-10 rounded-md"
                onChange={e => setValues({...values, hora: e.target.value})}/> 

        

                <label htmlFor='' className='mt-1 ml-1 font-medium'>Tempo</label>

                <input type="number"
                className="w-full mr-1 outline-none border shadow focus:rounded-none placeholder:text-gray-400 focus:bg-gray-100 h-10 rounded-md"
                placeholder='Tempo de Atendimento'
                onChange={e => setValues({...values, tempo: e.target.value})}
                min={0}
                />
                
                <label htmlFor='' className='mt-1 ml-1 font-medium'>Forma de pagamento:</label>
                
                <select placeholder='Escolha o Serviço'
                className="w-full mr-1 outline-none border shadow focus:rounded-none 
                focus:bg-gray-100 h-10 rounded-md"
                onChange={e => setValues({...values, pagamento: e.target.value})}
                >
                    <option>---</option>
                    <option>Pix</option>
                    <option>Dinheiro</option>
                    <option>Crédito</option>
                    <option>Débito</option>
                    </select>
                

                <label htmlFor='' className='grid mt-1 ml-1 font-medium'>Valor</label>

                <input type="text" placeholder='Valor do Serviço' step="0.01"
                className="w-full mr-1 outline-none border shadow focus:rounded-none placeholder:text-gray-400 focus:bg-gray-100 h-10 rounded-md"
                onChange={e => setValues({...values, valor: e.target.value})}
                />

                <label htmlFor='' className='flex mt-2 ml-1 text-center font-medium'>Gestante?
                <p className='p-1 rounded-lg w-16 ml-5'  
                style={{ 
                background: gestante === 'SIM' ? 'red' : 'green', 
                color: "#fff"
                }}>{gestante}</p></label>
                
                <input type="radio" name="gestante" value="SIM" placeholder='Nome do Cliente' 
                className="w-6 h-6 mr-5"
                //onChange={e=>setGestante(e.target.value)}
                onChange={(e) => {
                setValues({ ...values, gestante: e.target.value });
                setGestante(e.target.value);
                }}
                    
                    />
                    <input type="radio" name="gestante" value="NÃO" 
                    className="w-6 h-6 mr-5"
                    //onChange={e=>setGestante(e.target.value)}
                    onChange={(e) => {
                    setValues({ ...values, gestante: e.target.value });
                    setGestante(e.target.value);
                    }}
                    />
                    
                
                <label htmlFor='' className='flex mt-2 ml-1 text-center font-medium'>Alergia:
                <p className='p-1 rounded-lg w-16 ml-5' 
                style={{ 
                background: genter === 'SIM' ? 'red' : 'green', 
                color:'#fff' }}>{genter}</p>
                 </label>
                

                    <input type="radio" name="genter" value="SIM"
                    className="w-6 h-6 mr-5"
                    onChange={(e) => {
                    setValues({ ...values, alergica: e.target.value });
                    setGenter(e.target.value);
                    }} />

                    <input type="radio" name="genter" value="NÃO" placeholder='Nome do Cliente' 
                    className="w-6 h-6 mr-5"
                    onChange={(e) => {
                    setValues({ ...values, alergica: e.target.value });
                    setGenter(e.target.value);
                    }} />

                
                <label htmlFor='' className='grid font-medium ml-1'>Descreva a Alergia:</label>
                <input type="text" placeholder='Digite aqui...'
                className="w-full mr-1 outline-none border shadow focus:rounded-none focus:bg-gray-100 h-10 rounded-md"
                onChange={e => setValues({...values, alergia: e.target.value})}/>

                
                
            </div>

            <div className="w-4/5 items-center justify-center">
            <button className="w-full bottom-2 rounded tracking-wider shadow-md
            bg-gray-900 p-2 text-white">Registrar</button>
            </div>

        </form>

    </div>
  )
}

export default Form