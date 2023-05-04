import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const Deputados = () => {

    const [deputados, setDeputados] = useState([])

    useEffect(() => {

        apiDeputados.get('deputados').then(resultado => {
            setDeputados(resultado.data.dados)
        })

    }, [])

    return (
        <>
            <Pagina titulo = "Deputados">

            <Row>
                {deputados.map(item => (
                    <Col md={2} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src={item.urlFoto} />
                        </Card>
                    </Col>
                ))}
            </Row>
       </Pagina> 
       </>

    )
}

export default Deputados