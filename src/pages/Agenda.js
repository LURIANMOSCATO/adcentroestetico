import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import styles from './Agenda.module.css'
import { Tooltip } from './Tooltip';
import Modal from 'react-modal';
import axios from 'axios';
import {BiSolidEdit, BiMoneyWithdraw,BiUser, BiSearch} from 'react-icons/bi';
import {BsPersonFillCheck,BsPersonAdd, BsTrash3, BsClockHistory, BsPhone, BsCalendarCheck} from 'react-icons/bs'
import {AiOutlineScissor} from 'react-icons/ai'
import {CgSandClock} from 'react-icons/cg'
import {RiUserHeartLine} from 'react-icons/ri'
import {LiaTimesSolid} from 'react-icons/lia';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './Form';


Modal.setAppElement("#root");

function Agenda() {

  const [ModalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [data, setData] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(()=>{
      axios.get('http://localhost:8081/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    }, [])

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
      })
      .catch(err => console.log(err));

    axios.delete('http://localhost:8081/delete/'+id)
      .then(res => {
        setTimeout(()=>{
          window.location.reload();
      }, 2000);
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
          });
          setTimeout(()=>{
            window.location.reload();
        }, 2000);
      }
    })

  }

  return (
    <div className={styles.container}>
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

      <button
      onClick={openModal}
      className={styles.button_open}>
       <BsPersonAdd/>
      </button>

      <div className={styles.container_table}>

      <div className={styles.search_box}>

      <BiSearch id="search-icon"/>
      <input 
      type="search"
      placeholder="Digite para Buscar"
      onChange={(e)=>setSearch(e.target.value)} 
      />
      
      </div>
        <table className={styles.table_container}>
        <thead>
                        <tr>
                        <th> <BiUser/> Cliente</th>
                        <th> <BsPhone/> Telefone</th>
                        <th><RiUserHeartLine/> Profissional</th>
                        <th><AiOutlineScissor/> Serviço</th>
                        <th><BsCalendarCheck/> Atendimento</th>
                        <th><BsClockHistory/> Hora</th>
                        <th><CgSandClock/> tempo</th>
                        <th><BiMoneyWithdraw/> valor</th>
                        <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                    {data.filter((item) =>{
                      if(search===""){
                        return item
                      }
                      else if(item.cliente.toLowerCase().includes(search.toLocaleLowerCase())){
                        return item
                    }
                    else if (item.dataServico.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                        return item
                    }
                    }).map(item =>{
                    return <tr key={item.id}>
                  <td
                  style={{
                    textAlign: "left",
                  }}>
                  <Tooltip text={["Alergica: ", 
                  `${item.alergica}`, <br/>, 
                  "Alergia: ", `${item.alergia}`, <br/>,
                  "Gestante: ", `${item.gestante}`, <br/>,
                  "Dt Nascimento: ", `${item.dataNascimento}`]}
                    multiline={true}>

                        {item.cliente}
                        </Tooltip>
                  </td>
                  <td>{item.telefone}</td>
                  <td>
                  <p style={{ 
                  backgroundColor: item.profissional === 'DAIANE' ? '#228b22' : '#9d00db',
                  borderRadius: '6px',
                  height: '15px',
                  margin: '5px',
                  padding: '8px 10px',
                  color: '#fff',
                  fontWeight: '600',
                  letterSpacing: '1px'}}>{item.profissional} </p>
                  </td>
                  <td>{item.servico}</td>
                  <td>{item.dataServico}</td>
                  <td>{item.hora}</td>
                  <td>{item.tempo}m</td>
                  <td>
                    <div 
                    style={{backgroundColor: 'rgba(0, 128, 0, 1.4)',
                            color: '#fff',
                            height: '20px',
                            margin: '1px',
                            padding: '8px 10px',
                            borderRadius: '1vh',
                            fontWeight: '700',
                            letterSpacing: '1.1px',
                            fontFamily: 'Poppins',
                            boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.1)'
                            }}>
                    {item.valor}
                    </div>
                    </td>
                        <td>
                        <div className={styles.act_buttons}>
                        <button
                        onClick={() => handleCheck(item.id) }>
                        <BsPersonFillCheck/>
                        </button>
                        
                        <Link to={`/view/${item.id}`}>
                        <button>
                        <BiSolidEdit/>
                        </button>
                        </Link>

                        <button  
                        onClick={() => handleCancel(item.id) }>
                        <BsTrash3/>
                        </button>
                        
                        </div>
                        </td>         
                  </tr>  
                })}
                    
                    </tbody>


        </table>
      </div>
                    <Modal
                    isOpen={ModalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Modal Overlay"
                    overlayClassName={styles.modal_overlay}
                    className={styles.modal_content}>
                    <button onClick={closeModal} className={styles.close_btn}><LiaTimesSolid/></button>
                            
                    <Form/>

                    </Modal>
    </div>
  )
}

export default Agenda