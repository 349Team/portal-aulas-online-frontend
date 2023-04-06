import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Avatar from 'react-avatar';

import './App.css'

// componentes
import CardCourses from "./components/CardCourses"
import SideNav from "./components/nav";



//Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { ListGroup } from "react-bootstrap"

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons'



function App() {


    const [data, setData] = useState();
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    "https://dummyjson.com/products"
                )
            ).json();

            // set state when the data received
            setData(data);
            setIsFetched(true);
        };

        dataFetch();
    }, []);




    return (
        <>
            <div className="container-fluid fundo">
                <Row>
                    <div className="col-2">
                        <SideNav />
                    </div>
                    <Col>
                        <Navbar>
                            <Container fluid>
                                <p style={{ color: "#0f5b7a" }} className="mt-3 fs-6 fw-bold">&#128075;&nbsp; Hey, CHRISTOFER!</p>
                                <Navbar.Toggle />
                                <Navbar.Collapse className="justify-content-end">
                                    <Navbar.Text>
                                        <button style={{ color: "#1dbfb0" }} data-mdb-ripple-color="#1dbfb0" type="button" class="fw-bold btn btn-light">ASSINE KULTIVI+</button>
                                    </Navbar.Text>
                                    <Navbar.Text>
                                        <Avatar class name="Christofer" color="#0f5b7a" size={30} textSizeRatio={2} round={true} />
                                    </Navbar.Text>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>




                        {/* <Row>
                        <Col>
                            <p style={{ color: "#0f5b7a" }} className="mt-3 fs-6 fw-bold">&#128075;&nbsp; Hey, CHRISTOFER!</p>
                        </Col>
                        <Col className="justify-content-end ml-3">
                            <Row className="justify-content-end ml-3">
                                <Col className="justify-content-end ml-3">
                                    <button style={{ color: "#1dbfb0" }} data-mdb-ripple-color="#1dbfb0" type="button" class="btn btn-light">ASSINE KULTIVI+</button>
                                    <Avatar name="Christofer" color="#0f5b7a" size={30} textSizeRatio={2} round={true} />
                                </Col>

                            </Row>
                        </Col>

                    </Row> */}
                        <Row>
                            <div className="col-2">
                                <p style={{ color: "#1dbfb0", fontWeight: 'bold', fontSize: 14 }} className="mt-5">Mostrar todos os cursos</p>
                                <p style={{ color: "#727273", fontWeight: 'bold', fontSize: 14 }}>Categorias</p>
                                <ListGroup >
                                    <ListGroup.Item style={{ fontSize: 14 }} className="m-1 border-0 fundo">Idiomas</ListGroup.Item>
                                    <ListGroup.Item style={{ fontSize: 14 }} className="m-1 border-0 fundo">Concursos</ListGroup.Item>
                                    <ListGroup.Item style={{ fontSize: 14 }} className="m-1 border-0 fundo">Carreira e Negócios</ListGroup.Item>
                                    <ListGroup.Item style={{ fontSize: 14 }} className="m-1 border-0 fundo">Oab</ListGroup.Item>
                                    <ListGroup.Item style={{ fontSize: 14 }} className="m-1 border-0 fundo">Enem</ListGroup.Item>
                                    <ListGroup.Item style={{ fontSize: 14 }} className="m-1 border-0 fundo">Saúde</ListGroup.Item>
                                </ListGroup>

                            </div>

                            <div className="col">
                                <h1 className="mt-3 mb-3 fs-5 fw-bold">Todos os cursos</h1>

                                <InputGroup className="mb-3">
                                    <Form.Control placeholder="Buscar cursos" />
                                    <Button variant="outline-secondary" id="button-addon2">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
                                    </Button>
                                </InputGroup>

                                {
                                    isFetched ?
                                        <Row xs={1} md={3} lg={4} className="g-4">
                                            {data.products.map((aula) => (
                                                <Col>
                                                    <CardCourses key={aula.id} teste={aula} />
                                                </Col>
                                            ))}
                                        </Row>

                                        : <p>Carregando</p>
                                }


                                {/* {data.map((aula) => {
                            return <p key={aula.id}>{aula.texto} </p>
                        })} */}
                            </div>

                        </Row>
                    </Col>
                </Row>


            </div>

        </>
    )
}

export default App