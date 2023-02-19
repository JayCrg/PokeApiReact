import React, { useState, useEffect } from 'react';
import { Carousel } from "react-bootstrap";
import { Pagination } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 20;

function PaginaDetalle(props) {

    const idPk = useParams().id;
    const [SinglePokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => cargarSinglePk(), []);

    function cargarSinglePk(urlpoke = `https://pokeapi.co/api/v2/pokemon/${idPk}`) {
        fetch(urlpoke)
            .then(response => response.json())
            .then(data => {
                setPokemon({ data });
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

    const handleClick = (page) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = SinglePokemon.data.moves.slice(startIndex, endIndex);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(SinglePokemon.data.moves.length / ITEMS_PER_PAGE); i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handleClick(i)}>{i}</button>
            </li>
        );
    }

    return (
        <div className="card">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={SinglePokemon.data.sprites.other["official-artwork"].front_default}
                                alt={SinglePokemon.data.name}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={SinglePokemon.data.sprites.other["official-artwork"].front_shiny}
                                alt={SinglePokemon.data.name}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={SinglePokemon.data.sprites.front_default}
                                alt={SinglePokemon.data.name}
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="col-6">
                    <div className="card-body">
                        <h1 className="card-title">Nº{SinglePokemon.data.id} {SinglePokemon.data.name.toUpperCase()}</h1>
                        {SinglePokemon.data.types.map((type, index) => (
                            <span key={index}> <img src={require(`../../images/${type.type.name}.webp`)} alt={type.type.name} className="mt-2"></img> </span>
                        ))}
                        <div className="card-text mt-3">
                            <h4>Height: {SinglePokemon.data.height} m</h4>
                            <h4>Weight: {SinglePokemon.data.weight} kg</h4>
                            <h4>Abilities: {SinglePokemon.data.abilities.map((ability, index) => (
                                <span key={index}>- {ability.ability.name} </span>
                            ))}</h4>
                        </div>
                        <div>  
                            <h4>Moves:</h4>
                            <ul>
                                {currentItems.map(item => (
                                    <li key={item.move.name}>{item.move.name}</li>
                                ))}
                            </ul>
                            <nav>
                                <ul className="pagination">
                                    {pageNumbers}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
        </div>
    )

}
export default PaginaDetalle;