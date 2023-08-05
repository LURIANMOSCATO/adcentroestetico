import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router'
import styles from './Home.module.css'
import { BsCalendar4Week, BsCalendar3} from 'react-icons/bs'
import {WiDayCloudy} from 'react-icons/wi'
import {MdLogout} from 'react-icons/md'
import {AiOutlineScissor} from 'react-icons/ai'
import {GiEyelashes} from 'react-icons/gi'

import axios from 'axios'; 

function Home() {

  const [day, setDay] = useState([]);
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);


  useEffect(() =>{

    axios.get('http://localhost:8081/clientsday')
    .then(res =>{
      setDay(res.data[0].id)
      }).catch(err => console.log(err));

      axios.get('http://localhost:8081/clientsweek')
      .then(res =>{
        setWeek(res.data[0].id)
      }).catch(err =>console.log(err));

      axios.get('http://localhost:8081/clientsmonth')
      .then(res =>{
        setMonth(res.data[0].id)
      }).catch(err =>console.log(err));

  })

  return (
    <div className={styles.container}>
    
    <div className={styles.cards}>

      <div className={styles.values}>

      <div className={styles.content}>

        <h1 className={styles.title}>dia
        <WiDayCloudy/>
        </h1>
        

        <div className={styles.values_money}>
          <span>{day}</span>
        </div>

        <div>
          detalhes
        </div>

        </div>
      </div>

      <div className={styles.values}>

      <div className={styles.content}>

        <h1 className={styles.title}>Semana
        <BsCalendar4Week/>
        </h1>
        

        <div className={styles.values_money}>
          <span>{week}</span>
        </div>

        </div>
      </div>

      <div className={styles.values}>

      <div className={styles.content}>

        <h1 className={styles.title}>Mês
        <BsCalendar3/>
        </h1>
        

        <div className={styles.values_money}>
          <span>{month}</span>
        </div>

        </div>
      </div>


      </div>
      
      <div className={styles.cardspro}>
      <div className={styles.values}>

      <div className={styles.content}>

        <h1 className={styles.title}>Andreza
        <GiEyelashes/>
        </h1>
        

        <div className={styles.values_money}>
          <span>{day}</span>
        </div>

        </div>
      </div>
      <div className={styles.values}>

      <div className={styles.content}>

        <h1 className={styles.title}>Daiane
        <AiOutlineScissor/>
        </h1>
        

        <div className={styles.values_money}>
          <span>{day}</span>
        </div>

        </div>
      </div> 
      </div>
    </div>
  )
}

export default Home