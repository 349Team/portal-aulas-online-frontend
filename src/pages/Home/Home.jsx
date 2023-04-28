import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Avatar from 'react-avatar'

import './style.css'

// componentes
import CardCourses from '../../components/CardCourses'

//Bootstrap
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { ListGroup } from 'react-bootstrap'

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { AuthAPI } from '../../api/auth-api'
import { HttpResponse, HttpStatus } from '../../api/default'
import { useAuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

function Home() {
    const [data, setData] = useState({})
    const [isFetched, setIsFetched] = useState(false)

    const { logged, user } = useAuthContext()

    const getCourses = async (e) => {
        const responseCourses = await AuthAPI.getCoursesData()
        if (responseCourses.status == HttpStatus.OK) {
            setData(responseCourses.data)
            setIsFetched(true)
        }
    }


    useEffect(() => {
        getCourses()
    }, [])

    return (
        <>
            <Col>
                <Navbar>
                    <Container fluid>
                        {logged && user ? <p style={{ color: '#0f5b7a' }} className="mt-3 fs-6 fw-bold">
                            &#128075;&nbsp; Hey, {user?.name?.split(' ')[0]}!
                        </p> :
                            <p style={{ color: '#0f5b7a' }} className="mt-3 fs-6 fw-bold">
                                &#128075;&nbsp; BEM-VINDO!
                            </p>}

                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">

                            <Navbar.Text>
                                {user &&
                                    <Avatar
                                        name={user.name}
                                        color="#0f5b7a"
                                        size={30}
                                        textSizeRatio={2}
                                        round={true}
                                    />
                                }
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Row className="home-card">


                    <div className="col">
                        <h1 className="mt-3 mb-3 fs-5 fw-bold">Todos os cursos</h1>

                        {/* <InputGroup className="mb-3">
                            <Form.Control placeholder="Buscar cursos" disabled={true}/>
                            <Button variant="outline-secondary" id="button-addon2" disabled={true}>
                                <FontAwesomeIcon icon={faMagnifyingGlass}  className="me-2" />
                            </Button>
                        </InputGroup> */}

                        {isFetched && logged && !!user ? (
                            <Row className="g-4">
                                {data.results.map((course) => (
                                    <Col xs={12} lg={4} key={course.id}>
                                        <Link to={`/student/courses/${course.id}`}>
                                            <CardCourses teste={course} />
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        ) : <></>}

                        {isFetched && !logged ? (
                            <Row className="g-4">
                                {data.results.map((course) => (
                                    <Col xs={12} lg={4} key={course.id}>
                                        <Link to={`/courses/${course.id}`}>
                                            <CardCourses teste={course} />
                                        </Link>
                                    </Col>
                             ))}
                            </Row>
                        )
                        : <></>
                        }
                    </div>
                </Row>
            </Col>
        </>
    )
}

export default Home
