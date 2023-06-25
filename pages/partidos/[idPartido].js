import 'bootstrap/dist/css/bootstrap.min.css';
import apiDeputados from '@/services/apiDeputados'
import React from 'react'
import Pagina from '@/components/Pagina';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';

const DatalhesPartido = ({ partidoDetalhe, membros }) => {
console.log('AAA', membros)
  return (
    <>
      <Pagina titulo={partidoDetalhe.nome} />
      <Container>
        <Row className='mt-5'>
          <Col md={4}>
            <Card >
              <Card.Img variant="top" src={partidoDetalhe.status.lider.urlFoto} />
              <Card.Body>
                <Card.Title> Lider {partidoDetalhe.status.lider.nome} </Card.Title>
                <Card.Text>
                  <strong>UF: </strong>
                  {partidoDetalhe.status.lider.uf}
                </Card.Text>
                <Card.Text>
                  <strong>Membros no Partido: </strong>
                  {partidoDetalhe.status.totalMembros}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Accordion defaultActiveKey="0">
              {membros.map(item => (
                <Accordion.Item key={item.id} eventKey={item.id}>
                  <Accordion.Header>{item.nome}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={4}>
                        <Card>
                          <Link href={'/deputados/' + item.id}>
                            <Card.Img variant="top" className='rounded' src={item.urlFoto} />
                          </Link>
                        </Card>
                      </Col>
                      <Col md={8}>
                        <p><strong>Nome: </strong>{item.nome}</p>
                        <p><strong>E-mail: </strong>{item.email}</p>
                        <p><strong>UF: </strong>{item.siglaUf}</p>
                      </Col>
                    </Row>


                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DatalhesPartido

export async function getServerSideProps(context) {

  const idPartido = context.params.idPartido
  const resultado = await apiDeputados.get('/partidos/' + idPartido)
  const partidoDetalhe = resultado.data.dados
  const resMembros = await apiDeputados.get('/partidos/' + idPartido + '/membros')
  const membros = resMembros.data.dados
  


  return {
    props: { partidoDetalhe, membros, },
  }
}