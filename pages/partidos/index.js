import Cabecalho from '@/components/Cabecalho'
import apiDeputados from '@/services/apiDeputados'
import Link from 'next/link'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const index = ({deputados}) => {
  return (
    <>
    <Cabecalho />
    <Row md={6}>
    {deputados.map(item => (
        <Col>
            <Card mt-4> 
                <Card.Img variant="top" src={item.urlFoto} />
                <Card.Body>
                    <Card.Title>{item.nome}</Card.Title>
                    <p>{item.siglaPartido}</p>
                    <p>{item.siglaUf}</p>
                    <Link className='btn btn-info' href={'/partidos/' + item.id}>Detalhes</Link>
                </Card.Body>
            </Card>
        </Col>
    ))}
</Row>

    </>
  )
}

export default index

export async function getServerSideProps(context) {

    const resultado = await apiDeputados.get('/partidos/')
    const deputados = resultado.data.dados

    return {
        props: { deputados },
    }
}