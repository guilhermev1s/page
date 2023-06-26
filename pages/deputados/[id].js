import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Figure, Pagination, Row} from 'react-bootstrap'
import apiDeputados from '../../services/apiDeputados'
import Link from 'next/link'
import Cabecalho from '@/components/Cabecalho'
import axios from 'axios'



const Detalhes = ({ deputado, profissoes }) => {
  const [noticias, setNoticias] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const noticiasPorPagina = 10;
  const numeroDePaginas = Math.ceil(noticias.length / noticiasPorPagina);
  const indiceUltimaNoticia = paginaAtual * noticiasPorPagina;
  const indicePrimeiraNoticia = indiceUltimaNoticia - noticiasPorPagina;
  const noticiasPaginadas = noticias.slice(indicePrimeiraNoticia, indiceUltimaNoticia);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=deputados&language=pt&apiKey=9f6af0220e884608992a91c7847f9f84'
        );
        setNoticias(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNoticias();
  }, []);

  const handlePaginaClicada = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  return (
    <>
     <Cabecalho />
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
          <Link href='/deputados/dep'>
            <Button variant='success'>Voltar</Button>
          </Link>
            </Figure.Caption>


            <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
        {noticiasPaginadas.map((noticia, index) => (
          <Col key={index} className="mb-4">
            <Card style={{ height: '100%' }}>
              <Card.Img variant="top" src={noticia.urlToImage} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{noticia.title}</Card.Title>
                <Card.Text>{noticia.description}</Card.Text>
                <div className="mt-auto">
                  <Button variant="primary" href={noticia.url}>Ver mais</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {Array.from({ length: numeroDePaginas }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === paginaAtual}
              onClick={() => handlePaginaClicada(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
        </Col>
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