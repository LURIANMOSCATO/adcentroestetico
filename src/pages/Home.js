import React, { useEffect, useState } from 'react'
import { BsCalendar4Week, BsCalendar3} from 'react-icons/bs'
import {WiDayCloudy} from 'react-icons/wi'
import {RxScissors} from 'react-icons/rx'
import {GiEyelashes, GiExitDoor} from 'react-icons/gi'
import axios from 'axios'; 
import Modal from 'react-modal';
import { useNavigate } from 'react-router'

Modal.setAppElement("#root");

function Home() {

  const [day, setDay] = useState([]);
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);
  const [deza, setDeza] = useState([]);
  const [daia, setDaia] = useState([]);

  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [name, setName] = useState([]);
  axios.defaults.withCredentials = true;


  useEffect(() =>{    
    axios.get('http://node147829-login-adce.jelastic.saveincloud.net/clientsday')
    .then(res =>{
      setDay(res.data[0].id)
      }).catch(err => console.log(err));

      axios.get('http://node147829-login-adce.jelastic.saveincloud.net/clientsweek')
      .then(res =>{
        setWeek(res.data[0].id)
      }).catch(err =>console.log(err));

      axios.get('http://node147829-login-adce.jelastic.saveincloud.net/clientsmonth')
      .then(res =>{
        setMonth(res.data[0].id)
      }).catch(err =>console.log(err));

      axios.get('http://node147829-login-adce.jelastic.saveincloud.net/clientsdaia')
      .then(res =>{
        setDaia(res.data[0].id)
      }).catch(err =>console.log(err));

      axios.get('http://node147829-login-adce.jelastic.saveincloud.net/clientsdeza')
      .then(res =>{
        setDeza(res.data[0].id)
      }).catch(err =>console.log(err));

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

  const handleLogout = () => {
    axios.get(' http://node147829-login-adce.jelastic.saveincloud.net/logout')
    .then(res => {
        window.location.reload(true);
    }).catch(err => console.log(err));
}

  

  return (
  
    <div className="p-5 min-h-screen bg-gray-100">
      {
        auth ?
      
    <div className='h-[32rem] md:w-[65rem] overflow-auto grid grid-cols-1 top-5 mr-3
    sm:w-full sm:h-42 sm:mr-0 sm:top-5 sm:grid-cols-2 gap-3 '>
          <button
      onClick={handleLogout}
      className="float-right h-11 w-22 shadow-md rounded-sm fixed bottom-16 md:hidden
      right-2 text-center text-gray-800 border-gray-300 border
    bg-white p-1.5 font-normal outline-none bg-white-600 cursor-pointer"
      ><p className='text-sm capitalize inline'>Sair</p> <GiExitDoor className='inline text-xl'/></button>

      
      
      <div className="w-full bg-white rounded-md border-l-8 border-red-500 shadow">
      
      <div className="grid top-px">

        <h1 className="flot-left text-xl font-light ml-2 top-4 capitalize">dia
        <WiDayCloudy className='inline float-right mr-5  text-4xl text-yellow-500'/>
        </h1>
        <div className="text-4xl text-gray-500">
          <span>{day}</span>
          
        </div>

        </div>
      </div>

      <div className="w-full bg-white rounded-md border-l-8 border-red-500 shadow">

      <div className="grid top-px">

        <h1 className="flot-left text-xl font-light ml-2 top-4 capitalize">Semana
        <BsCalendar4Week className='inline float-right mr-5 top-5 text-4xl text-yellow-500'/>
        </h1>
        

        <div className="text-4xl text-gray-500">
          <span>{week}</span>
        </div>

        </div>
      </div>

      <div className="w-full bg-white rounded-md border-l-8 border-red-500 shadow">

      <div className="grid top-px">

        <h1 className="flot-left text-xl font-light ml-2 top-4 capitalize">Mês
        <BsCalendar3   className='inline float-right mr-5 top-5 text-4xl text-yellow-500'/>
        </h1>
        

        <div className="text-4xl text-gray-500">
          <span>{month}</span>
        </div>

        </div>
      </div>

      <div className="w-full bg-white rounded-md border-l-8 border-purple-500 shadow">

<div className="grid top-px">

  <h1 className="flot-left text-xl font-light ml-2 top-4 capitalize">Andreza
  <GiEyelashes  className='inline float-right mr-5 top-5 text-4xl text-purple-500'/>
  </h1>
  

  <div className="text-4xl text-gray-500">
    <span>{deza}</span>
  </div>

  </div>
</div>

<div className="w-full bg-white rounded-md border-l-8 border-green-600 shadow">

      <div className="grid top-px">

        <h1 className="flot-left text-xl font-light ml-2 top-4 capitalize">Daiane
        <RxScissors className='inline float-right mr-5 top-5 text-4xl text-green-600'/>
        </h1>
        

        <div className="text-4xl text-gray-500">
          <span>{daia}</span>
        </div>

        </div>
      </div> 

      </div>
        :
        <div className='grid items-center justify-center min-h-screen bg-blue-300'>   
          <p>{message}</p>
          
          
        </div>
      }
      
    </div>
  )
}

export default Home