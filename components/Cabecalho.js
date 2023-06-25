import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

const Cabecalho = () => {

  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid >
        <Navbar.Brand href="/deputados/" className='text-white' >Home</Navbar.Brand>
        <Navbar.Brand href="/votacoes/" className='text-white' >Votações</Navbar.Brand>
        <Navbar.Brand href="/eventos/" className='text-white' >Eventos</Navbar.Brand>
        <Navbar.Brand href="/partidos/" className='text-white' >Partidos</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Cabecalho