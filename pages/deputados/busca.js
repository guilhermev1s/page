import apiDeputados from '@/services/apiDeputados'
import Pagina from '@/components/Pagina'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const index = (pesquisar) => {

    const [deputados, setDeputados] = useState([])
    const { register, handleSubmit } = useForm()

    useEffect(() => {
        carregarDeputados()
    }, [])

    function carregarDeputados() {
        apiDeputados.get('/deputados').then(resultado =>
            setDeputados(resultado.data.dados))
    }
}

function pesquisar(dados) {
    apiDeputados.get('/deputados?nome=' + dados.nome).then(resultado =>
        setDeputados(resultado.data.dados))
}

return (
    <Pagina título="deputados">
        <Row>
            <Col>
                <FloatingLabel controlId="nome" label="Nome" className="mb-3">
                    <Form.Control type="text" {...register('nome')} />
                </FloatingLabel>
            </Col>
            <Col>
                <Button onClick={handleSubmit(pesquisar)}>Pesquisar</Button>
            </Col>
            <Col>
            </Col>
        </Row>
        <Row>
            {deputados.map(item => (
                <Col md={2} Key={item.id}>
                    <Card.Img variant="top" src={item.urlFoto} />
                </Col>
            ))}
        </Row>
    </Pagina>
)

export default index

export async function getServerSideProps(context) {
    const res = await apiDeputados.get('/deputados?nome=')
    const deputados = res.data.dados

    return {
        props: { deputados },
    }
}