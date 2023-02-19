import './App.css';
import React, { useState, useEffect } from 'react';
import ListaPokemon from './components/lista/ComponenteLista';
import Cabecera from './components/cabecera/cabecera';
import Home from './components/home/home';
import Juego from './components/juego/juego';
import PaginaDetalle from './components/detalle/PaginaDetalle';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Cabecera />
      <BrowserRouter>
        <Routes>
          <Route path="/lista" element={<ListaPokemon />} />
          <Route path="/cabecera" element={<Cabecera />} />
          <Route path="/juego" element={<Juego />} />
          <Route path="/" element={<Home/>} />
          <Route path="/detalle/:id" element={< PaginaDetalle/>} />
        <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
