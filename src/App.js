import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Agenda from './pages/Agenda'
import ViewEdit from './pages/ViewEdit';
import ViewProduct from './pages/ViewProduct';
import Caixa from './pages/Caixa';
import Faturamento from './pages/Faturamento';
import Configurar from './pages/Config';
import Login from './Login'
import Calendario from './pages/Calendario';
import Register from './pages/Register';

const SidebarLayout = () => (

  <>
    <Sidebar />
    <Outlet />
  </>
);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SidebarLayout/>}>
          <Route path="/" element={<Home/>}  />
          <Route path="/agenda" element={<Agenda/>} />
          <Route path="/view/:id" element={<ViewEdit/>} />
          <Route path="/viewproduct/:id" element={<ViewProduct/>} />
          <Route path="/caixa" element={<Caixa />} />
          <Route path="/receita" element={<Faturamento/>} />
          <Route path="/configurar" element={<Configurar/>} />
          <Route path="/newuser" element={<Register/>} />

        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;

