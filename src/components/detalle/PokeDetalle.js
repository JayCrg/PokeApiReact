import "./detalle.css";
import { Carousel } from "react-bootstrap";



function PokeDetalle(props) {

    return (
            <>
            <div className="modal fade" id={`${props.pokemon.name}Detail`} tabIndex="-1" aria-labelledby={`${props.pokemon.name}Detail`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title" id="pokemonDetailLabel">{props.pokemon.name.toUpperCase()} - <span className="text-muted">N.º {props.pokemon.id}</span></h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={props.pokemon.sprites.front_default}
                        alt={props.pokemon.name}
                        />
                        <Carousel.Caption>
                            <h3>Default Front</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={props.pokemon.sprites.back_default}
                        alt={props.pokemon.name}
                        />
                        <Carousel.Caption>
                            <h3>Default Back</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={props.pokemon.sprites.front_shiny}
                        alt={props.pokemon.name}
                        />
                        <Carousel.Caption>
                            <h3>Shiny Front</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={props.pokemon.sprites.back_shiny}
                        alt={props.pokemon.name}
                        />
                        <Carousel.Caption>
                            <h3>Shiny Back</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                    
                    <div className="container mt-3">
                        <div className="row row-cols-2 d-flex justify-content-center align-items-center">
                            <div className="col"><p className="fs-4"><span>Height: </span>{props.pokemon.height}dm</p></div>
                            <div className="col"><p className="fs-4"><span>Weight: </span>{props.pokemon.weight}hg</p></div>
                            <div className="col"><p className="fs-4"><span>Type: </span>
                                {props.pokemon.types.map((type, index) => (
                                    <span key={index}> {type.type.name} </span>
                                ))}
                            </p></div>
                            <div className="col"><p className="fs-4"><span>Main ability: </span>{props.pokemon.abilities[0].ability.name}</p></div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </>
          );  
}

export default PokeDetalle;