import React, {useEffect, useState} from 'react'
import axios from 'axios'

import styles from './Faturamento.module.css'
import {IoCart} from 'react-icons/io5'
import {HiOutlineShoppingBag, HiOutlineCake} from 'react-icons/hi2'
import {BsClipboardCheck, BsCashCoin} from 'react-icons/bs'
import {LiaShoppingBagSolid, LiaCartArrowDownSolid, LiaFileInvoiceDollarSolid} from 'react-icons/lia'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function Faturamento() {

  const [services, setServices] = useState([]);
  const [faturatendimento, setFaturatendimento] = useState([]);
  const [prod, setProd] = useState([]);
  const [register, setRegister] = useState([]);
  const [totalv, setTotalv] = useState([]);

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8081/servicosrealizados')
      .then(res => setServices(res.data))
      .catch(err => console.log(err));

      axios.get('http://localhost:8081/faturatendimentos')
      .then(res => {
        setFaturatendimento(res.data[0].valor)
      }).catch(err => console.log(err));

      axios.get('http://localhost:8081/vendasrealizadas')
      .then(res => {
        setProd(res.data)
      }).catch(err => console.log(err));

      axios.get('http://localhost:8081/vendasregister')
      .then(res => {
        setRegister(res.data)
      }).catch(err => console.log(err));

      axios.get('http://localhost:8081/vendastotal')
      .then(res => {
        setTotalv(res.data[0].total)
      }).catch(err => console.log(err));
  })

  return (
    <div className={styles.container}>
    
    <div className={styles.cards}>

      <div className={styles.values}>

      <div className={styles.content}>

        <h1 className={styles.title}>Faturamento vendas
        <IoCart/>
        </h1>
        

        <div className={styles.values_money}>
          <span>{totalv}</span>
        </div>

        <div className={styles.days_count}>

          <div className={styles.days_val}>

          <p>Mês:</p> 
          <span>200,00</span>
          </div>
          
          <div className={styles.days_val}>

          <p>Semana:</p> 
          <span>200,00</span>
          </div>

        
          
          
        </div>

        </div>
      </div>

      <div className={styles.values}>

      <div className={styles.content}>

        <h1 className={styles.title}>Faturamento atendimentos
        <BsCashCoin/>
        </h1>
        

        <div className={styles.values_money}>
          <span>{faturatendimento}</span>
        </div>
        <div className={styles.days_count}>

          <div className={styles.days_val}>

          <p>Semana:</p> 
          <span>200,00</span>
          </div>
          
          <div className={styles.days_val}>

          <p>Mês:</p> 
          <span>200,00</span>
          </div>

        
          
          
        </div>

        </div>
      </div>

    </div>

    <div className={styles.listagem}>
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>

        <TabList className={styles.tabList}>
        <Tab className={tabIndex === 0 ? `${styles.tab} ${styles.active}` : styles.tab}> 

        <div className={styles.desc_list}> 

        <BsClipboardCheck/>

        <div className={styles.desc_cont}> 

        <div className={styles.contet_txt}>
        <span>Serviços Realizados</span>
        <p className={styles.description_list}>
        Entradas de Serviços
        </p>
        </div>

        </div>

        </div>

        </Tab>
        <Tab className={tabIndex === 1 ? `${styles.tab} ${styles.active}` : styles.tab}>
        <div className={styles.desc_list}> 

<HiOutlineShoppingBag/>

<div className={styles.desc_cont}> 

<div className={styles.contet_txt}>
        <span>Produtos & Serviços</span>
        <p className={styles.description_list}>
        Venda de Produtos
        </p>
        </div>

</div>

</div>
</Tab>
<Tab className={tabIndex === 2 ? `${styles.tab} ${styles.active}` : styles.tab}>
<div className={styles.desc_list}> 

<LiaFileInvoiceDollarSolid/>

<div className={styles.desc_cont}> 

        <div className={styles.contet_txt}>
        <span>Registro de Valores</span>
        <p className={styles.description_list}>
        fluxo de caixa
        </p>
        </div>

</div>

</div>
</Tab>

<Tab className={tabIndex === 3 ? `${styles.tab} ${styles.active}` : styles.tab}>
<div className={styles.desc_list}> 

<HiOutlineCake/>

<div className={styles.desc_cont}> 

        <div className={styles.contet_txt}>
        <span>Aniversários</span>
        <p className={styles.description_list}>
        Aniversários hoje (5)
        </p>
        </div>

</div>

</div>
</Tab>

      </TabList>

      <TabPanel className={styles.tabPanel}>

    <div className={styles.content_panel}>

      <div className={styles.contents}>
        <div className={styles.list}>
          <table className={styles.tablePanel}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>profissional</th>
                <th>Valor</th>
                <th>Data Nascimento</th>
              </tr>
            </thead>
            <tbody>
            {services.map(item => (
                    <tr key={item.id}>
                        <td>{item.cliente}</td>
                        <td>{item.profissional}</td>
                        <td>{item.valor}</td>
                        <td>{item.dtNascimento}</td>
                    </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      
    
    </div>
    
    </TabPanel>

  <TabPanel className={styles.tabPanel}>

  <div className={styles.content_panel}>

  <div className={styles.cards2}>

    
        {prod.map((product, index) =>{
          return (
        <div className={styles.product_card} key={index}>

        <div className={styles.product_content}>
        <div className={styles.register_sell}>
          <p>venda:<br/> {product.datatime}</p>
          </div>
        <h1 className={styles.products_title}><LiaShoppingBagSolid/> {product.titulo}</h1>

        <p className={styles.qtd}><LiaCartArrowDownSolid/> Qtd: {product.quantidade}</p>

        <span className={styles.total_money}>venda nº: {product.venda_id}</span>
        </div>
        </div>
          );
        })}
        
    
        </div>

  </div>
  
  </TabPanel>

  <TabPanel className={styles.tabPanel}>  <div className={styles.content_panel}>

<div className={styles.contents}>
  <div className={styles.list}>
    <table className={styles.tablePanel}>
      <thead>
        <tr>
          <th>ID da Venda</th>
          <th>Total da Venda</th>
          <th>dt & hora venda</th>
        </tr>
      </thead>
      <tbody>
      {register.map(item => (
              <tr key={item.Venda_id}>
                  <td>{item.Venda_id}</td>
                  <td>{item.total}</td>
                  <td>{item.register_datetime}</td>
              </tr>
      ))}
      </tbody>
    </table>
  </div>
</div>


</div></TabPanel>
  <TabPanel className={styles.tabPanel}>Cadastro de Serviços</TabPanel>
  
    </Tabs>
    </div>












    </div>
  )
}

export default Faturamento