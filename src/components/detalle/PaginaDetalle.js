import React, { useState, useEffect } from 'react';
import { Carousel } from "react-bootstrap";
import { Pagination } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

import './detalle.css';

const ITEMS_PER_PAGE = 10;

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

    const totalPages = Math.ceil(SinglePokemon.data.moves.length / ITEMS_PER_PAGE);
    const range = 3;
    const minPage = Math.max(1, currentPage - range);
    const maxPage = Math.min(totalPages, currentPage + range);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const itemsToShow = SinglePokemon.data.moves.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );


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
                <div className="col-xl-4 col-md-6">
                    <div className="card-body">
                        <h1 className="card-title">Nº{SinglePokemon.data.id} {SinglePokemon.data.name.toUpperCase()}</h1>
                        {SinglePokemon.data.types.map((type, index) => (
                            <span key={index}> <img src={require(`../../images/${type.type.name}.webp`)}
                            title={type.type.name} alt={type.type.name} className="mt-2"></img> </span>
                        ))}
                        <div className="card-text mt-3">
                            <h4>Height: {SinglePokemon.data.height/10} m</h4>
                            <h4>Weight: {SinglePokemon.data.weight/10} kg</h4>
                            <h4>Abilities: {SinglePokemon.data.abilities.map((ability, index) => (
                                <li className="primeraMayus" key={index}>{ability.ability.name} </li>
                            ))}</h4>
                        </div>
                        <div className='mt-2'>
                            <h4>Moves:</h4>
                            <ListGroup>
                                {itemsToShow.map((item) => (
                                    <ListGroup.Item className='primeraMayus' key={item.move.name}>{item.move.name}</ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Pagination>
                                <Pagination.First onClick={() => paginate(1)} />
                                <Pagination.Prev
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                />
                                {minPage > 1 && <Pagination.Ellipsis />}
                                {[...Array(maxPage - minPage + 1)].map((a, index) => {
                                    const pageNumber = minPage + index;
                                    return (
                                        <Pagination.Item
                                            key={pageNumber}
                                            active={pageNumber === currentPage}
                                            onClick={() => paginate(pageNumber)}
                                        >
                                            {pageNumber}
                                        </Pagination.Item>
                                    );
                                })}
                                {maxPage < totalPages && <Pagination.Ellipsis />}
                                <Pagination.Next
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                />
                                <Pagination.Last onClick={() => paginate(totalPages)} />
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <>

            </>
        </div>
    )

}
export default PaginaDetalle;