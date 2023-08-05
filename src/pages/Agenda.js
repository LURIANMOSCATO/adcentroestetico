import React, {useEffect, useState} from 'react'
import styles from './Agenda.module.css'
import { Tooltip } from './Tooltip';
import Modal from 'react-modal';
import axios from 'axios';
import {BiSolidEdit, BiUserPlus, BiMoneyWithdraw, BiSearch} from 'react-icons/bi';
import {BsPersonFillCheck} from 'react-icons/bs'
import {AiOutlineScissor} from 'react-icons/ai'
import {CiUser, CiMobile3, CiCalendarDate, CiCalendar, CiClock2, CiStopwatch} from 'react-icons/ci';
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
      <BiUserPlus/>
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
                        <th> <CiUser/> Cliente</th>
                        <th> <CiMobile3/> Telefone</th>
                        <th><RiUserHeartLine/> Profissional</th>
                        <th><AiOutlineScissor/> Serviço</th>
                        <th><CiCalendarDate/> Dt Nascimento</th>
                        <th><CiCalendar/> Atendimento</th>
                        <th><CiClock2/> Hora</th>
                        <th><CiStopwatch/> tempo</th>
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
                  <td>
                  <Tooltip text={["Alergica: ", 
                  `${item.alergica}`, <br/>, 
                  "Alergia: ", `${item.alergia}`, <br/>,
                  "Gestante: ", `${item.gestante}`]}
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
                  <td>{item.dataNascimento}</td>
                  <td>{item.dataServico}</td>
                  <td>{item.hora}</td>
                  <td>{item.tempo}</td>
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
                            boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.2)'
                            }}>
                    {item.valor}
                    </div>
                    </td>
                        <td>
                        <div className={styles.act_buttons}>
                        <button
                        style={{
                          backgroundColor:'#fff',
                          border:'none'

                        }}
                        onClick={() => handleCheck(item.id) }>
                        <BsPersonFillCheck/>
                        </button>
                        
                        
                        <BiSolidEdit/>
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