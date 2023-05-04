import React from 'react'
import Pagina from '@/components/Pagina'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import apifilmes from '@/services/apiFilmes'
import Galeria from '@/components/Galeria'

const Detalhes = ({ ator, imagens, filpopular, seriespopular}) => {
    return (
        <Pagina titulo={ator.name}>
            <Row>
                <Col md={3}>
                    <Card.Img variant="top" title={ator.name} src={'https://image.tmdb.org/t/p/w500/' + ator.profile_path} />
                </Col>
                <Col md={9}>

                    <p><strong>Data de Nascimento: </strong>{ator.birthday}</p>
                    <br></br>
                    <p><strong>Local de Nascimento: </strong>{ator.place_of_birth}</p>
                    <br></br>
                    <p>{ator.biography}</p>
                </Col>
            </Row>
           
            <Galeria  titulo='Imagens' lista={imagens} foto='file_path' size={1}/>
            <Galeria  titulo='Filmes em que atuou' lista={filpopular} foto='poster_path' />

            <h2>Imagens</h2>
            <Row>
                {imagens.map(item => (
                    <Col className='mb-3' md={2}>
                            <Card.Img variant="top" title={item.name} src={'https://image.tmdb.org/t/p/w500/' + item.file_path} />
                    </Col>
                ))}
            </Row>
            <h2>Filmes em que atuou</h2>

            <Row>
                {filpopular.map(item => (
                    <Col className='mb-3' md={2}>
                        <Link href={'/filmes/' + item.id}>
                            <Card.Img variant="top" title={item.name} src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} />
                        </Link>
                    </Col>
                ))}
            </Row>
            <h2 className='mt-4'>Séries em que atuou</h2>
            <Row>
                {seriespopular.map(item => (
                    <Col className='mb-4' md={2}>
                        <Link href={'/filmes/' + item.id}>
                            <Card.Img variant="top" title={item.name} src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} />
                        </Link>
                    </Col>
                ))}
            </Row>






        </Pagina>
    )
}

export default Detalhes

export async function getServerSideProps(context) {
    const id = context.params.id

    const resAtor = await apifilmes.get("/person/" + id + '?language=pt-BR')
    const ator = resAtor.data

    const resimagens = await apifilmes.get("/person/" + id + "/images")
    const imagens = resimagens.data.profiles

    const resfilPopular = await apifilmes.get("/person/"+ id+ "/movie_credits")
    const filpopular = resfilPopular.data.cast

    const resseriespopular = await apifilmes.get("/person/"+ id+ "/tv_credits")
    const seriespopular = resseriespopular.data.cast




    return {
        props: { ator, imagens, filpopular, seriespopular},
    }


}