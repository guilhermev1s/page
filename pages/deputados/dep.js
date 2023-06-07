import React from 'react'
import { Card, Col, Container, Row, Pagination } from 'react-bootstrap'
import apiDeputados from '@/services/apiDeputados'
import Link from 'next/link'
import Cabecalho from '@/components/Cabecalho'

const dep = ({ deputados }) => {
  return (
    <>
    <Cabecalho />
    <Container className='mb-5 bg-dark' >
    <Row md={6}>
    {deputados.map(item => (
        <Col>
            <Card>
                <Card.Img variant="top" src={item.urlFoto} />
                <Card.Body>
                    <Card.Title>{item.nome}</Card.Title>
                    <p>Partido: {item.siglaPartido}</p>
                    <p>UF: {item.siglaUf}</p>
                    <Link className='btn btn-info' href={'/deputados/' + item.id}>Detalhes</Link>
                </Card.Body>
            </Card>
        </Col>
    ))}
</Row> 

<h1></h1>

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
</Container>
</>
  )
}

export default dep

export async function getServerSideProps(context) {

    const resultado = await apiDeputados.get('/deputados/')
    const deputados = resultado.data.dados

    return {
        props: { deputados },
    
    }
}
