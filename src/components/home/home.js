import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import './home.css'



function Home() {


    return (
        <Container fluid>
            <Row >
                <Col className='mt-3'>
                    <h1>Welcome to your Pokemon Web Page</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="bg-dark text-white">
                        <Carousel>
                            <Carousel.Item interval={3000}>
                                <img
                                    className="d-block w-100"
                                    src={require('../../images/poke2.webp')}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={3000}>
                                <img
                                    className="d-block w-100"
                                    src={require('../../images/poke3.webp')}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                        <Card.ImgOverlay className='text-dark justify-content-center align-items-center'>
                            {/* <Card.Title ><p className='h3'>Come in and discover about Pokemon</p></Card.Title>
                            <Card.Text className='h4'>
                                Here you can find all the information about your favorite pokemon
                            </Card.Text> */}
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className='mt-3 col-2' />
                <Col className='mt-3 col-8'>
                    <Card className="d-flex flex-row w-100">
                        <Card.Img variant="botton" src={require("../../images/poke4.webp")} className='w-25' />
                        <Card.Body>
                            <Card.Title>What is Pokemon?</Card.Title>
                            <Card.Text>
                                Pokémon (ポケモン, Pokemon?, [pokeːˈmon]) is a Japanese media franchise managed by The Pokémon Company, a company founded by Nintendo, Game Freak, and Creatures. The franchise was created by Satoshi Tajiri in 1995, and is centered on fictional creatures called "Pokémon", which humans, known as Pokémon Trainers, catch and train to battle each other for sport. The franchise has expanded into other media, including animated television shows, films, manga, trading card games, and video games. The Pokémon franchise is the second-highest-grossing media franchise of all time, having generated over $90 billion in revenue as of 2020.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Home;