//Huelga que no tengo ni idea de por qué se realizan dos veces las peticiones
import React, { useState, useEffect } from 'react';
import Comprobacion from './comprobacion';
import { ListGroup } from 'react-bootstrap';

function Juego() {

    const pokemonCap = 1008; //cantidad de pokemon de verdad
    const [intentos, setIntentos] = useState(7);
    const [pokemon, setPokemon] = useState({});//pokemon bueno
    const [listaPokemon, setListaPokemon] = useState([]);//lista de pokemon
    const [inputPokemon, setInputPokemon] = useState('');//input del usuario
    const [arrayIntentos, setArrayIntentos] = useState([]);//array de intentos

    const [pokemonExiste, setPokemonExiste] = useState(false);//booleano para saber si el pokemon existe
    const [juegoTerminado, setJuegoTerminado] = useState(false);//booleano para saber si el juego termino
    const [juegoGanado, setJuegoGanado] = useState(false);//booleano para saber si el 

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => cargarTodo(), []);

    function handleInputChange(event) {
        setInputPokemon(event.target.value);
        for (let i = 0; i < listaPokemon.length; i++) {
            if (event.target.value.toLowerCase() === listaPokemon[i].name) {
                setPokemonExiste(true);
                return;
            } else {
                setPokemonExiste(false);
            }
        }
    }

    function keyHandler(event) {
        if (pokemonExiste && (event.keyCode === 13 || event.key == 'Enter')) {
            guardarItem();
        }
    }

    function guardarItem() {
        setPokemonExiste(false);
        verificarPokemon();
        setInputPokemon('');
    }

    function getRandPokemon(data) {
        let rand = Math.floor(Math.random() * pokemonCap);
        let pokemon = data.find((pokemon, index) => index === rand);
        cargarSinglePokemon(pokemon.url);
    }

    function inicializarTodo() {
        setPokemonExiste(false);
        setJuegoTerminado(false);
        setJuegoGanado(false);
        setPokemon([]);
        setInputPokemon('');
        setArrayIntentos([]);
        setIntentos(7);
        getRandPokemon(listaPokemon);
    }
    //para el boton de reset
    const [hovered, setHovered] = useState(false);

    function handleMouseOver() {
        setHovered(true);
    }

    function handleMouseOut() {
        setHovered(false);
    }
    const className = `fa-solid fa-rotate-right ${hovered ? "fa-spin" : ""}`;
    ////////////////////////////

    function cargarSinglePokemon(url, bueno = true) {
        fetch(url)
            .then(response => response.json())
            .then(escogido => {
                if (bueno)
                    setPokemon({ escogido })
                else
                    setArrayIntentos(arrayIntentos.concat(escogido));
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }
    function cargarTodo(url = 'https://pokeapi.co/api/v2/pokemon?limit=1008') {
        setLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setListaPokemon(listaPokemon.concat(data.results));
                getRandPokemon(data.results);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }

    function verificarPokemon() {

        console.log(pokemon.escogido)
        if (inputPokemon.toLowerCase() === pokemon.escogido.name) {
            let url = listaPokemon.find(pokemon => pokemon.name === inputPokemon.toLowerCase()).url;
            cargarSinglePokemon(url, false);
            setJuegoTerminado(true);


        } else {
            setIntentos(intentos - 1);
            let url = listaPokemon.find(pokemon => pokemon.name === inputPokemon.toLowerCase()).url;
            cargarSinglePokemon(url, false);
            if (intentos <= 1) {
                setJuegoTerminado(true);
            }
        }
    }



    if (loading) {
        return <p>Cargando...</p>
    }
    if (error) {
        return <p>Hubo un error</p>
    }
    return (
        <div className='container d-flex flex-column justify-content-center mt-5'>
            <div className='row '>
                <h1 className='justify-self-center'>Guess the Pokemon</h1>
                {juegoTerminado ? <input type="text" placeholder="Write the name of a Pokemon" disabled className='col-7' value={inputPokemon} onChange={handleInputChange} onKeyDown={keyHandler} /> : <input type="text" placeholder="Nombre del Pokemon" className='col-7' value={inputPokemon} onChange={handleInputChange} onKeyDown={keyHandler} />}
                {intentos <= 0 || !pokemonExiste ? <button className='col-3' disabled onClick={guardarItem}>Verify</button> : <button className='col-3' onClick={guardarItem}>Verify</button>}
                <h4 className='col-2'>Intentos {intentos}  <span onClick={inicializarTodo} title="Resetear"><i className={className} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}></i></span></h4>
            </div>
            <ul className="nav nav-pills nav-fill mt-3">
                <li className="nav-item col-2">
                    <h3>Generation</h3>
                </li>
                <li className="nav-item col-1">
                    <h3>Type 1</h3>
                </li>
                <li className="nav-item col-1">
                    <h3>Type 2</h3>
                </li>
                <li className="nav-item col-1">
                    <h3>Height</h3>
                </li>
                <li className="nav-item col-1">
                    <h3>Weight</h3>
                </li>
                <li className="nav-item col-1">
                    <h3>Name</h3>
                </li>
            </ul>
            {arrayIntentos.map((pokemonInvitado, index) => <Comprobacion key={index} pokemon={pokemon.escogido} invitado={pokemonInvitado} />)}
            {juegoTerminado ? <div className='row justify-content-center mt-5'>
                <div className='col-6'>
                    <h1>El pokemon era <span className='primeraMayus'>{pokemon.escogido.name}</span></h1>
                    <div >
                        <img src={pokemon.escogido.sprites.other['official-artwork'].front_default} alt={pokemon.escogido.name} />
                    </div>
                </div>
            </div> : <div></div>
            }
        </div>
    )
}
export default Juego;   
