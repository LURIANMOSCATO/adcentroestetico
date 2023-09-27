import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'

import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import Modal2 from 'react-modal';
import styles from './Faturamento.module.css'
import {HiOutlineShoppingBag, HiOutlineScissors} from 'react-icons/hi2'
import {SlUserFemale} from 'react-icons/sl'
import {BiSolidEdit} from 'react-icons/bi'
import {BsTrash3, BsPersonAdd} from 'react-icons/bs'
import {MdAddShoppingCart, MdFormatListBulletedAdd} from 'react-icons/md'
import {LiaTimesSolid} from 'react-icons/lia'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormProdutos from './FormProdutos';
import FormServico from './FormServico';

function Configurar() {

  const [ModalIsOpen, setIsOpen] = useState(false);
  const [Modal2IsOpen, setIsOpen2] = useState(false);

  function openModal() {
      setIsOpen(true);
  }

  function closeModal() {
      setIsOpen(false);
  }

  function openModal2() {
    setIsOpen2(true);
}

function closeModa2l() {
    setIsOpen2(false);
}



    const [tabIndex, setTabIndex] = useState(0);

    const [products, setProducts] = useState([]);
    const [servicos, setServicos] = useState([]);

    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState([]);
    const [name, setName] = useState([]);
    axios.defaults.withCredentials = true;

    useEffect(() =>{

      axios.get('http://localhost:8081/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

      axios.get('http://localhost:8081/servicos')
      .then(res => setServicos(res.data))
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

    },[])

    const handleDeleteProduct = (id) => {
      axios.delete('http://localhost:8081/deletepdt/'+id)
      .then(res => {
        if(res.status===200) {
          toast.info('Produto Deletado da Loja!', {
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
      }, [])
      .catch(err =>console.log(err))
    }


    const handleDeleteServico = (id) => {
      axios.delete('http://localhost:8081/deleteservico/'+id)
      .then(res => {
        if(res.status===200) {
          toast.info('Serviço Excluído!', {
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
      }, [])
      .catch(err =>console.log(err));
  
    }
  


  return (
    <div className={styles.container}>
    <div className={styles.listagem2}>
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>

        <TabList className={styles.tabList}>
        <Tab className={tabIndex === 0 ? `${styles.tab} ${styles.active}` : styles.tab}> 

        <div className={styles.desc_list}> 

        <SlUserFemale/>

        <div className={styles.desc_cont}> 

        <div className={styles.contet_txt}>
        <span>Profissionais</span>
        <p className={styles.description_list}>
        Cadastro de Profissioanais
        </p>
        </div>

        </div>

        </div>

        </Tab>
        <Tab className={tabIndex === 1 ? `${styles.tab} ${styles.active}` : styles.tab}>
        <div className={styles.desc_list}> 

<HiOutlineScissors/>

<div className={styles.desc_cont}> 

<div className={styles.contet_txt}>
        <span>Serviços</span>
        <p className={styles.description_list}>
        Cadastro de Serviços
        </p>
        </div>

</div>

</div>
</Tab>
<Tab className={tabIndex === 2 ? `${styles.tab} ${styles.active}` : styles.tab}>
<div className={styles.desc_list}> 

<HiOutlineShoppingBag/>

<div className={styles.desc_cont}> 

        <div className={styles.contet_txt}>
        <span>Produtos</span>
        <p className={styles.description_list}>
        Cadastro de Produtos<br/> e Serviços
        </p>
        </div>

</div>

</div>
</Tab>

      </TabList>

      <TabPanel className={styles.tabPanel}>

    <div className={styles.content_panel}>

      <div className={styles.cards2}>
      <button
      className={styles.button_open}
      >
      <BsPersonAdd/>
      </button>
        <div className={styles.list}>
          <div>
            
          </div>
        </div>
      </div>
      
    
    </div>
    
    </TabPanel>

  <TabPanel className={styles.tabPanel}>

  <div className={styles.content_panel}>

  <div className={styles.cards2}>
  <button
  className={styles.button_open}
  onClick={openModal2}
  >
  <MdFormatListBulletedAdd/>
  </button>
  <div className={styles.list}>
          <table className="w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Serviços</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
            {servicos.map(item => (
            <tr key={item.idProduto}>
                        <td>{item.id}</td>
                        <td style={{
                          textAlign: "left"
                        }}>{item.tituloServico}</td>
                      
                        <td style={{
                            width: "30px"
                        }}>
                            <div className={styles.act_buttons}>

                                <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    height: "30px",
                                    width: "40px",
                                    margin: "3px",
                                    borderRadius: "5px",
                                    boxShadow: "0px 4px 18px -3px rgba(0,0,0,0.29)"
                                }}
                                >
                                <BiSolidEdit/>
                                </button>
                                <button
                                onClick={() => handleDeleteServico(item.id) }
                                style={{
                                    background: "none",
                                    border: "none",
                                    height: "30px",
                                    width: "40px",
                                    margin: "2px",
                                    marginRight: "3px",
                                    borderRadius: "5px",
                                    boxShadow: "0px 4px 18px -3px rgba(0,0,0,0.29)",
                                    cursor: "pointer"
                                }}>
                                <BsTrash3/>
                                </button>
                            </div>
                             </td>
            </tr>
            ))}
            
            </tbody>
          </table>
        </div>

</div>

  </div>
  
  </TabPanel>
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

  <TabPanel className={styles.tabPanel}>  
  
  <div className={styles.content_panel}>

<div className={styles.cards2}>
  <div className={styles.list}>
  <button
  className={styles.button_open}
  onClick={openModal}
  >
  <MdAddShoppingCart/>
  </button>
    <table className="w-full">
      <thead>
        <tr>
          <th>ID Produto</th>
          <th>Título</th>
          <th>quantidade</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
      {products.map(item => (
            <tr key={item.idProduto}>
                        <td>{item.idProduto}</td>
                        <td style={{
                          textAlign: "left"
                        }}>{item.tituloProduto}</td>
                        <td style={{
                          fontWeight: "bold",
                          letterSpacing: "1px",
                          color: "gray"
                        }}>{item.quantidadeProduto}</td>
                        <td  style={{
                          textAlign: "left",
                          fontWeight: "400",
                        }}>{item.valorProduto}</td>
                        <td style={{
                            width: "30px"
                        }}>
                            <div className={styles.act_buttons}>
                            <Link to={`/viewproduct/${item.idProduto}`}>
                                <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    height: "30px",
                                    width: "40px",
                                    margin: "3px",
                                    borderRadius: "5px",
                                    boxShadow: "0px 4px 18px -3px rgba(0,0,0,0.29)"
                                }}
                                >
                                <BiSolidEdit/>
                                </button>
                                </Link>

                                <button
                                onClick={() => handleDeleteProduct(item.idProduto) }
                                style={{
                                    background: "none",
                                    border: "none",
                                    height: "30px",
                                    width: "40px",
                                    margin: "2px",
                                    marginRight: "3px",
                                    borderRadius: "5px",
                                    boxShadow: "0px 4px 18px -3px rgba(0,0,0,0.29)",
                                    cursor: "pointer"
                                }}

                                >
                                <BsTrash3/>
                                </button>
                            </div>
                             </td>
            </tr>
            ))}
      </tbody>
    </table>
  </div>
</div>


</div>
</TabPanel>
</Tabs>
    </div>
                    <Modal
                    isOpen={ModalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Modal Overlay"
                    overlayClassName={styles.modal_overlay}
                    className={styles.modal_content}>
                    <button onClick={closeModal} className={styles.close_btn}><LiaTimesSolid/></button>
                            
                    <FormProdutos/>
                    </Modal>

                    <Modal2
                    isOpen={Modal2IsOpen}
                    onRequestClose={closeModa2l}
                    contentLabel="Modal Overlay"
                    overlayClassName={styles.modal_overlay}
                    className={styles.modal_content}>
                    <button onClick={closeModa2l} className={styles.close_btn}><LiaTimesSolid/></button>
                            
                    <FormServico/>
                    </Modal2>
    </div>
  )
}

export default Configurar