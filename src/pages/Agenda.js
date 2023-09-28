import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import styles from './Agenda.module.css'
import { Tooltip } from './Tooltip';
import Modal from 'react-modal';
import axios from 'axios';
import {LuCalendarDays} from 'react-icons/lu'
import { HiOutlineCalendarDays, HiOutlineCheckCircle, 
HiOutlinePencilSquare,HiOutlineXMark, HiOutlineBanknotes, HiOutlineTrash, 
HiOutlineClock, 
HiOutlineMagnifyingGlass} from 'react-icons/hi2'
import {SlOptions} from 'react-icons/sl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './Form';
import Calendario from './Calendario';


Modal.setAppElement("#root");

function Agenda() {

  const [ModalIsOpen, setIsOpen] = useState(false);


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

  const [ModalIsOpenTwo, setIsOpenTwo] = useState(false);  

  function openModalTwo() {
    setIsOpenTwo(true);
}

function closeModalTwo() {
    setIsOpenTwo(false);
}

    function formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    }
    const [openItems, setOpenItems] = useState({});

    function handleClickOptions(itemId) {
      setOpenItems((prevState) => ({
        ...prevState,
        [itemId]: !prevState[itemId],
      }));
    }

    const [startDate, setStartDate] = useState(""); // Data inicial do período
    const [endDate, setEndDate] = useState("");     // Data final do período

    const [data, setData] = useState([]);

    const [search, setSearch] = useState("");

    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState([]);
    const [name, setName] = useState([]);
    axios.defaults.withCredentials = true;

    useEffect(()=>{

      axios.get('http://localhost:8081/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));

      axios.get('http://localhost:8081/verify')
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

    const handleSearchByPeriod = () => {
      // Realize uma chamada à API passando as datas de início e fim como parâmetros
      axios.get(`http://localhost:8081/search?startDate=${startDate}&endDate=${endDate}`)
          .then((res) => {
              setData(res.data); // Atualize os dados filtrados na tabela
          })
          .catch((err) => {
              console.log(err);
          });
  };
  
    const handleCheck = (id) => {
    axios.post('http://localhost:8081/check/'+id)
      .then(res => {
          if(res.status===200)
      {
          console.log("Serviço Concluído");
          toast.success('Serviço Concluído!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }
      }, )
      .catch(err => console.log(err));

    axios.delete('http://localhost:8081/delete/'+id)
      .then(res => {
        setTimeout(()=>{
          window.location.reload();
      }, 1000);
      })
      .catch(err => console.log(err))   
  }

  const handleCancel = (id) => {
    axios.delete('http://localhost:8081/cancel/'+id)
    .then(res => {
      if(res.status===200) {
        toast.info('Agendamento Cancelado!', {
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
        alert("Erro!");
      }
    })

  }

  return (
    <div className="p-5 min-h-screen bg-gray-100">
      

      <button
      onClick={openModal}
      className="float-right h-16 w-16 shadow-md rounded-full fixed bottom-16 
      right-1 text-center text-gray-800 border-gray-300 border
    bg-white text-4xl font-normal uppercase outline-none bg-white-600 cursor-pointer"
      >+</button>

      <Link to={'/calendario'}>
        <button className="md:hidden border-none float-right h-16 w-16 shadow-md
        rounded-full fixed bottom-[9rem] right-1 text-center text-gray-700 border-gray-400 
      bg-white text-2xl font-semibold uppercase outline-none bg-white-600 cursor-pointer">
          <HiOutlineCalendarDays/>
        </button>
      
      </Link>
    
      <button
      onClick={openModalTwo}
      className="hidden md:block float-right h-16 w-16 shadow-md rounded-full fixed bottom-[9rem] 
      right-1 text-center text-gray-800 border-gray-300 border
    bg-white text-4xl font-normal uppercase outline-none bg-white-600 cursor-pointer"
      >
      <LuCalendarDays/>
      </button>

      <div className="w-4/5 p-2 shadow border rounded hidden md:flex">
      <input
      id='search-icon'
      type="search"
      placeholder="Digite para Buscar"
      className='w-3/4 outline-none rounded-md placeholder:font-light placeholder:text-left
      bg-gray-200 focus:border focus:border-gray-300 focus:shadow'
      onChange={(e)=>setSearch(e.target.value)} 
      />

<div className='flex ml-1'>
  <span className='mt-2'>Início</span>
<input
    type="date"
    placeholder="Data inicial"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="w-[5rem]"
/>
<span className='mt-2'>Fim</span>
<input
    type="date"
    placeholder="Data final"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    className="w-[5rem]"
/>

<button onClick={handleSearchByPeriod} className='bg-gray-800 text-white font-light w-[12rem] bottom-1.5
  p-2 ml-2 mr-1 rounded-md'><HiOutlineMagnifyingGlass className='inline'/> Busca</button>
  </div>
      </div>
      <div className="overflow-auto rounded-lg w-4/5 shadow hidden md:block">
      
        <div className='overflow-auto items-center h-screen'>
        <table className="w-full">
        <thead className="bg-gray-200 border-b-2 z-10 sticky top-0 border-gray-100 drop-shadow-md">
                    <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Cliente</th>
                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Serviço</th>
                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Atendimento</th>
                    <th className="w-11 p-3 text-sm font-semibold tracking-wide text-left">Pagamento</th>
                    <th className="w-1 text-sm font-bold tracking-wide text-left">Ação</th>
                    </tr>
        </thead>

                    <tbody className="divide-y divide-gray-200">
                    {data.filter((item) =>{
                    if (search === "") {
                      return true;
                  } else if (
                      item.cliente.toLowerCase().includes(search.toLowerCase()) ||
                      item.dataServico.toLowerCase().includes(search.toLowerCase())
                  ) {
                      return true;
                  }
                  return false;
                    }).map(item =>{
                  return <tr key={item.id} className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <Tooltip
      text={[
        <span>
          Alergica: {item.alergica}
          <br />
          Alergia: {item.alergia}
          <br />
          Gestante: {item.gestante}
          <br />
          Nascimento: {item.dataNascimento}
        </span>,
      ]}
      multiline={true}
    >
    <p style={{
      marginLeft: "5px"
    }}>{item.cliente}</p> 

    <span style={{
      fontWeight: '400',
      fontSize: '13px',
      marginLeft: '5px'
    }}>{item.telefone}</span>
                  </Tooltip>
                  </td>
                  <td className="p-3 text-sm text-gray-700 flex flex-col whitespace-nowrap">
                  {item.servico}
                  <span className={`p-1.5 text-xs text-center font-medium ml-0
                  uppercase tracking-wider rounded 
                  ${item.profissional === 'DAIANE' ? 'bg-green-200 text-green-700 bg-opacity-50' : 'bg-purple-200 text-purple-700 bg-opacity-50'}`}>
                  {item.profissional}</span>
                  </td>

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{formatDate(item.dataServico)}
                  <p style={{
                    marginTop: '5px',
                    fontWeight: '400',
                    color: 'gray'
                  }}>{item.hora}</p>
                  <p style={{
                    fontWeight: '300'
                  }}>{item.tempo}m</p>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <div>
                    {item.valor}
                    
                    </div>
                    <span>{item.pagamento}</span>
                    </td>
                        <td className="whitespace-nowrap">

                        <div className='relative'>
                        
                        <button className='bg-white border-gray-300 transition-colors outline-none ease-in duration-300
                        shadow border p-3 rounded-full'
                        onClick={() => handleClickOptions(item.id)}
                        >
                        <SlOptions className='text-black'/>
                        </button>
                          
                        {openItems[item.id] && (
                        <ul className="bg-white text-start border absolute right-6 mt-4
                        rounded-md shadow-md flex-col top-10 overflow-hidden"
                        style={{
                        right: "50%",  // Move o elemento horizontalmente para o meio
                        marginRight: "60px", // Ajusta a margem esquerda negativa pela metade da largura do elemento
                        top: "-30px", // Coloca a lista abaixo do botão
                        transform: "translateY(5px)", // Ajuste vertical (opcional)
                        }}>

                      <li className='px-4 py-2 hover:bg-gray-100 flex items-center'>

                            <div className='ml-1 text-3xl text-green-600'><HiOutlineCheckCircle/></div> 

                            <button className="inline-flex rounded cursor-pointer mr-1 
                            py-1 px-6 tracking-wide"
                            onClick={() => handleCheck(item.id) }>
                            Concluir
                            </button>
                            </li>
                            <Link to={`/view/${item.id}`}>
                      <li className='px-4 py-2 hover:bg-gray-100 flex items-center'>
                      
                        <div className='ml-1 text-3xl'> <HiOutlinePencilSquare/></div> 
                        <button className="inline-flex rounded cursor-pointer mr-1
                            py-1 px-6 tracking-wide">
                          Alterar 
                        </button>
                        
                        </li>
                        </Link>

                        <li className='px-4 py-2 hover:bg-gray-100 flex items-center'>
                        <div className='ml-1 text-3xl text-red-600'> <HiOutlineTrash/> </div> 
                        <button className="inline-flex rounded cursor-pointer mr-1
                            py-1 px-6 tracking-wide" 
                            onClick={() => handleCancel(item.id) } >
                          Cancelar 
                        </button>
                        </li>

                            
                          </ul>
                          )
                          }
                      </div>
                        </td>         
                  </tr>  
                })}
                    
                    </tbody>

        </table>
        </div>
        </div>

        <div className="overflow-y-auto h-[33.4rem] scroll-m-1 grid grid-cols-1 sm:grid-cols-2 gap-2 md:hidden">
        
        {data.map((item, i) => {
              return <div key={item.id}className="bg-white w-full space-y-3  p-4 rounded-lg shadow-md border border-gray-300">
            
              <div className="flex items-center space-x-2 text-sm">
                <div className='text-gray-600 font-bold text-left ml-1 mt-0'>
                  {item.cliente}
                  <p className='font-light'>{item.telefone}</p>
                </div>
                <div className='flex-col items-center'>
                  
                  <p className='font-light text-sm text-left w-24'>{item.servico}</p>
                  
                  <p className={`p-1.5 text-xs text-center font-medium ml-0
                  uppercase tracking-wider rounded-full 
                  ${item.profissional === 'DAIANE' ? 'bg-green-600 text-white' : 'bg-purple-200 text-purple-800'}`}>
                  {item.profissional}</p>
                </div>
              
              </div>
              <hr className='border-gray-300' />
              <div className='items-center text-left'>
              <HiOutlineCalendarDays className='inline mr-2 text-2xl'/>
              {formatDate(item.dataServico)} - <HiOutlineClock className='inline mr-1 text-2xl'/>{item.hora}
              </div>
              <hr className='border-gray-300' />
              <div>
                <HiOutlineBanknotes className='inline mr-2 text-2xl text-green-700'/> {item.valor}
                 </div>
              <div className='flex'>
                        <button className="inline-flex border border-gray-300 rounded py-2.5 px-6 tracking-wide items-center shadow-md"
                        onClick={() => handleCheck(item.id) }>
                         <HiOutlineCheckCircle className='inline text-2xl text-green-500'/>
                        </button>
                        
                        <Link to={`/view/${item.id}`}>
                        <button className="inline-flex border border-gray-300 rounded py-2.5 px-6 tracking-wide items-center shadow-md">
                           <HiOutlinePencilSquare className='inline text-2xl text-gray-600'/>
                        </button>
                        </Link>

                        <button className="inline-flex border border-gray-300 rounded py-2.5 px-6 tracking-wide items-center shadow-md" 
                        onClick={() => handleCancel(item.id) }>
                           <HiOutlineTrash className='inline text-2xl text-red-500'/>
                        </button>
              </div>
            </div>
            })}
          
        </div>

                    <Modal
                    isOpen={ModalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Modal Overlay"
                    overlayClassName={styles.modal_overlay}
                    className="bg-white shadow-md outline-none h-full w-full rounded-lg
                    md:h-full md:w-[30rem]">

                    <button 
                    onClick={closeModal} 
                    className={styles.close_btn}>
                    <HiOutlineXMark/>
                    </button>  
                    <Form/>
                    </Modal>

                    <Modal
                    isOpen={ModalIsOpenTwo}
                    onRequestClose={closeModalTwo}
                    contentLabel="Modal Overlay"
                    overlayClassName={styles.modal_overlay}
                    className="bg-white shadow-md outline-none h-[90%] w-[60rem]
                    rounded-lg items-center overflow-auto"
                    >
                    <button 
                    onClick={closeModalTwo} 
                    className={styles.close_btn}>
                    <HiOutlineXMark className='inline'/>
                    </button>
                  
                    <span className='top-px text-2xl font-medium ml-5'>Calendário</span>
                    
                    <Calendario />

                    </Modal>

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
    </div>
  )
}

export default Agenda