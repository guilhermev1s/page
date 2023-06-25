import Cabecalho from '@/components/Cabecalho'
import Rodape from '@/components/Rodape'
import Link from 'next/link'
import React from 'react'
import { Card, Carousel, Col, Row } from 'react-bootstrap'

const index = ({ deputados }) => {
  return (
    <>
    <Cabecalho />
         <Carousel>
      <Carousel.Item> <Link href={'/deputados/dep/'}>             
        <img
          className="d-block w-100"
          src="https://th.bing.com/th/id/R.f02aebf12ed3b653875ffeda4084acbb?rik=7aAo7dus7pbSqQ&riu=http%3a%2f%2fagenciabrasil.ebc.com.br%2fsites%2fdefault%2ffiles%2fatoms%2fimage%2f1012786-capa_camara_1060.jpg&ehk=C%2bM94zBDZf9DRPlSVolqGw1HwD2Ka9jo4m%2bEcaOsHlg%3d&risl=1&pid=ImgRaw&r=0"
          alt="Plenario"
        />
        <Carousel.Caption>
          <h3>Plenário</h3>
          <p>Deputados.</p>
        </Carousel.Caption>  </Link>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www2.camara.leg.br/a-camara/visiteacamara/fotos-e-imagens/home-visitacao-congresso-retangular"
          alt="Second slide"
        />
 <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <img
          className="d-block w-100"
          src="https://www2.camara.leg.br/a-camara/visiteacamara/fotos-e-imagens/home-visitacao-congresso-retangular"
          alt="Second slide"
        />
    </Carousel>
    
    
        
            <Rodape />
    </>
  )
}

export default index

