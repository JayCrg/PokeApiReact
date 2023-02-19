import { useState, useEffect } from 'react';
import PokeCard from '../card/PokeCard';
import { Button } from 'react-bootstrap';
import './lista.css';

function ListaPokemon() {

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=8');
    useEffect(() => cargarPokemons(), []);
    function cargarMas() {
        cargarPokemons(nextUrl)
    }

    function cargarPokemons(url = 'https://pokeapi.co/api/v2/pokemon?limit=8') {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPokemons(pokemons.concat(data.results));
                setLoading(false);
                setNextUrl(data.next);
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
        <>

            <div className="container mt-5 pokeTabla">
                <div className="row row-cols-2">
                    {pokemons.map(pokemon => (
                        <PokeCard key={pokemon.name} pokeUrl={pokemon.url} />
                    ))}
                </div>
            <Button onClick={cargarMas}>Cargar más</Button>
            </div>
        </>
    )
}

export default ListaPokemon;