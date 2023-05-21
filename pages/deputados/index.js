import Link from 'next/link'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import apiDeputados from '../../services/apiDeputados'
import Pagina from '../../components/Pagina'


const index = ({ deputados }) => {

  return (
    <Pagina titulo="Deputados">
      <Row md={6}>
        {deputados.map(item => (
          <Col>
            <Card className='mb-4'>
             <Link href={'/deputados/' + item.id}>
              <Card.Img variant="top" key={item.id} src={item.urlFoto}/>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  )
}

export default index

export async function getServerSideProps(context) {

  const imagens = await apiDeputados.get('/deputados')
  const deputados = imagens.data.dados

  return {
      props: { deputados },
  }
}