import './App.css';
import React, { useState, useEffect } from 'react';
import ListaPokemon from './components/lista/ComponenteLista';
import Cabecera from './components/cabecera/cabecera';
import Home from './components/home/home';
import Juego from './components/juego/juego';
import PaginaDetalle from './components/detalle/PaginaDetalle';
import Registro from './components/registro/registro';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from 'react-router-dom';


function App() {


  const [allowGame, setAllowGame] = useState(false)
  const [allowSignUp, setAllowSignUp] = useState(false)

    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setAllowGame(true)
        setAllowSignUp(false)
        // ...
      } else {
        // User is signed out
        // ...
        setAllowGame(false)
        setAllowSignUp(true)

      }
    })
    }, []);
  const RequireAuth = ({children}) => {
    if (allowGame) {
      return children;
    }
    return <Navigate to='/'/>
    };
  const RequireSignUp = ({children}) => {

    if (allowSignUp) {
      return children;
    }
    return <Navigate to='/'/>
    };


  return (
    <div className="App">
      <BrowserRouter>
      <Cabecera />
        <Routes>
          <Route path="/lista" element={<ListaPokemon />} />
          <Route path="/cabecera" element={<Cabecera />} />
          <Route path="/juego" element={<RequireAuth><Juego/></RequireAuth>} />
          <Route path="/" element={<Home/>} />
          <Route path="/detalle/:id" element={< PaginaDetalle/>} />
          <Route path="/registro" element={<RequireSignUp><Registro/></RequireSignUp>} />
        <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
