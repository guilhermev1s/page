import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import apiDeputados from '@/services/apiDeputados'
import Link from 'next/link'
import Pagina from '@/components/Pagina'

const dep = ({ deputados }) => {
  return (
    <Pagina titulo="Deputados">
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
</Pagina>
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
