import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Agenda from './pages/Agenda'
import ViewEdit from './pages/ViewEdit';
import Caixa from './pages/Caixa';
import Faturamento from './pages/Faturamento';
import Configurar from './pages/Config';
import Login from './Login'
import Protected from './Protected';

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
        <Route element= {<SidebarLayout/>}>
          <Route path="/" element= {<Protected Component={Home} />} />
          <Route path="/agenda" element={<Protected Component={Agenda} />} />
          <Route path="/view/:id" element={<Protected Component={ViewEdit} />} />
          <Route path="/caixa" element={<Protected Component={Caixa}/>} />
          <Route path="/faturamento" element={<Protected Component={Faturamento}/>} />
          <Route path="/configurar" element={<Protected Component={Configurar}/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;

