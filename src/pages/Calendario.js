import React, { useState, useEffect } from "react";
import axios from 'axios';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import styles from './Calendario.module.css'
import { Link } from "react-router-dom";

function Calendario() {

    const [selectedDay, setSelectedDay] = useState(null);
    const [servicosDoDia, setServicosDoDia] = useState([]);
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        // Faça a chamada à API Node.js para buscar os eventos
        axios.get(`http://localhost:8081/agendas`)
          .then((response) => {
                console.log('Eventos recebidos da API:', response.data);
                setEventos(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar eventos:', error);
            });
    }, [])

    const handleDateChange = (selectedDay) => {
      if (selectedDay instanceof Date) {
        setSelectedDay(selectedDay);
    
        // Formate a data selecionada no formato 'dd/MM/yyyy'
        const formattedSelectedDate = selectedDay.toLocaleDateString('pt-BR');

        console.log('Data selecionada:', formattedSelectedDate);
        console.log('Eventos:', eventos);

        // Filtrar os eventos com base na nova data selecionada

        const eventosDoDia = eventos.filter(evento =>
          evento.dataServico === formattedSelectedDate
        );
        console.log('Eventos do dia:', eventosDoDia);
    
        setServicosDoDia(eventosDoDia);
      }
    };
      
    return (
        <div className="w-[120vh] md:min-h-screen md:flex grid grid-cols-1 items-center">
          
            <div className="items-center top-px w-full md:h-[28rem]">
                <Link to={'/agenda'}>
              <span className="text-red-500 font-normal text-xl ml-2">Voltar</span>
                </Link>

                <Calendar
                  className={styles.calendar}
                  value={selectedDay}
                  onChange={handleDateChange}
                />
            </div>

  <div className="h-[28rem] bottom-10 w-full mt-0 border overflow-auto border-gray-400 rounded-md shadow-md">

        {selectedDay ? (
          <h2 className={styles.title}> Agenda do Dia - {selectedDay.getDate()}/{selectedDay.getMonth() + 1}/{selectedDay.getFullYear()}</h2>
        ) : (
          <h2 className={styles.title}>Selecione um dia no calendário</h2>
        )}
    <ul>
    {servicosDoDia.map((evento, index) => (
    <li key={index} className="border-l-indigo-500">
        <div className="ml-2 w-[90%] shadow border border-l-4 rounded mt-2 border-l-indigo-500">
        <p className="ml-1"><strong>Cliente: </strong>{evento.cliente}</p>
        <p className="ml-1"><strong>Serviço: </strong>{evento.servico}</p>
        <p className="ml-1"><strong>Profissional: </strong>{evento.profissional}</p>
        <p className="ml-1"><strong>Atendimento: </strong>{evento.dataServico} - {evento.hora}</p>
        <p className="ml-1 font-bold">{evento.valor}</p>
        </div>
    </li>
    ))}
  </ul>
    </div>
</div>
    )
}

export default Calendario;
