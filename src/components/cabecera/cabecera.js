import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./cabecera.css"


function Cabecera() {
    const { id } = useParams();
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="nav">
      <Container>
        <Navbar.Brand href="/"><img src={require("../../images/poke.png")} alt="pokemon" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav className="separar">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/lista">Lista</Nav.Link>
            <Nav.Link href="/juego">Juego</Nav.Link>
            <Nav.Link href="/">Registrate</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Cabecera;