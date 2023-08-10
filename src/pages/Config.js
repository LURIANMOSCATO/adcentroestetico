import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import styles from './Faturamento.module.css'
import {HiOutlineShoppingBag, HiOutlineScissors} from 'react-icons/hi2'
import {SlUserFemale} from 'react-icons/sl'
import {BiSolidEdit} from 'react-icons/bi'
import {BsTrash3} from 'react-icons/bs'
import {MdAddShoppingCart} from 'react-icons/md'
import {LiaTimesSolid} from 'react-icons/lia'

import FormProdutos from './FormProdutos';

function Configurar() {

  const [ModalIsOpen, setIsOpen] = useState(false);

  function openModal() {
      setIsOpen(true);
  }

  function closeModal() {
      setIsOpen(false);
  }

    const [tabIndex, setTabIndex] = useState(0);

    const [products, setProducts] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:8081/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
    })


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
        <div className={styles.list}>
          <table className={styles.tablePanel}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
            
            </tbody>
          </table>
        </div>
      </div>
      
    
    </div>
    
    </TabPanel>

  <TabPanel className={styles.tabPanel}>

  <div className={styles.content_panel}>

  <div className={styles.cards2}>
  <div className={styles.list}>
          <table className={styles.tablePanel}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo</th>
              </tr>
            </thead>
            <tbody>
            
            </tbody>
          </table>
        </div>

</div>

  </div>
  
  </TabPanel>

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
    <table className={styles.tablePanel}>
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
                        <td>{item.quantidadeProduto}</td>
                        <td  style={{
                          textAlign: "left"
                        }}>{item.valorProduto}</td>
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
                                style={{
                                    background: "none",
                                    border: "none",
                                    height: "30px",
                                    width: "40px",
                                    margin: "2px",
                                    marginRight: "3px",
                                    borderRadius: "5px",
                                    boxShadow: "0px 4px 18px -3px rgba(0,0,0,0.29)"
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
    </div>
  )
}

export default Configurar