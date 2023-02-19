import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
// import PokeDetalle from '../detalle/PokeDetalle';
import Modal from 'react-bootstrap/Modal';  
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './card.css';



function PokeCard(props) {

    const [SinglePokemon, setPokemons] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => cargarSinglePk(), []);

    function cargarSinglePk(urlpoke = props.pokeUrl) {
        fetch(urlpoke)
            .then(response => response.json())
            .then(data => {
                setPokemons(data);
                setLoading(false);
                
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
        }
        if (loading) {
            return <p>Cargando...</p>
        }
        if (error) {
            return <p>Hubo un error</p>
        }

        return (
            <Link className="card col-xl-3 col-lg-4 col-xl-2 mb-5 btn mt-4 card" to={`/detalle/${SinglePokemon.name}`}>{/*aqui va el data-bs*/}
                <img src={SinglePokemon.sprites.front_default} className="card-img-top" alt={SinglePokemon.name}/>
                <div className="card-body">
                    <h5 className="card-title fs-2">{SinglePokemon.name.toUpperCase()}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {SinglePokemon.types.map((type, index) => (
                            <span key={index}> <img src={require(`../../images/${type.type.name}.webp`)} alt={type.type.name} className="mt-2"></img> </span>
                        ))}
                    </h6>
                </div>
            </Link>
        )
    }
    
    
    export default PokeCard;
    /* data-bs-toggle="modal" data-bs-target={`#${SinglePokemon.name}Detail`}
    <PokeDetalle pokemon={SinglePokemon} /> */