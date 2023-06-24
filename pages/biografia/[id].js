import React from 'react'
import { Button, Card, Col, Figure, Pagination, Row, Table } from 'react-bootstrap'
import apiDeputados from '../../services/apiDeputados'
import Link from 'next/link'



const Detalhes = ({ deputado, despesas, profissoes }) => {
  return (
    <>

      <Row>
        <Col md={3}>
        <Figure >
            <Figure.Image
              width={300}
              height={300}
              alt="200x180"
              key={deputado.id} src={deputado.ultimoStatus.urlFoto}
            />             
        </Figure>
        </Col>
        <Col md={9}>
          <h1 text-align="center"> Biografia - {deputado.ultimoStatus.nome}</h1>
          <Figure.Caption>Nome Completo: {deputado.nomeCivil}</Figure.Caption>
          <Figure.Caption>Partido: {deputado.ultimoStatus.siglaPartido}</Figure.Caption>
          <Figure.Caption>UF Partido: {deputado.ultimoStatus.siglaUf}</Figure.Caption>
          <Figure.Caption>Gabinete: {deputado.ultimoStatus.gabinete.nome}</Figure.Caption>
          <Figure.Caption>Profissões: {profissoes.map(item => (
              <li>{item.titulo}</li>
            ))} 
          <Link href='/biografia/'>
            <Button variant='success'>Voltar</Button>
          </Link>
            </Figure.Caption>
        </Col>
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
      </Row>

    </>
  )
}

export default Detalhes

export async function getServerSideProps(context) {

  const id = context.params.id

  const dep = await apiDeputados.get('/deputados/' + id)
  const deputado = dep.data.dados


  const prof = await apiDeputados.get('/deputados/' + id + '/profissoes')
  const profissoes = prof.data.dados

  return {
    props: { deputado, profissoes },
  }

}