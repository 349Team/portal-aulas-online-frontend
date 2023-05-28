import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AiFillLinkedin } from 'react-icons/ai';
import StarRating from '../StarRating/star_rating';
import { AuthAPI } from '../../api/auth-api';
import { HttpStatus } from '../../api/default';
import { useParams } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext'


function CardProfessorProfile() {

    const [data, setData] = useState({});
    const [isFetched, setIsFetched] = useState(false);

    const { logged, user } = useAuthContext()

    const { id } = useParams(); //Alterar o curso que deseja visualizar, quando for integrar vou deixar direto na função

    useEffect(() => {
        const getProfessorPerfil = async () => {
            setIsFetched(false)
            try {
                const responsePerfil = await AuthAPI.getProfessorPerfil(id)
                if (responsePerfil.status === HttpStatus.OK) {
                    setData(responsePerfil.data)
                    setIsFetched(true)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getProfessorPerfil();
    }, [id])

    const date = (dateString) => {
        const dateObj = new Date(dateString);
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        const formattedDate = `Docente desde: ${month}/${year}`;
        return formattedDate // saída: "23/4/2023"

    }

    return (
        <Container fluid className='mt-5'>
            <Row>
                <Card>
                    <Row className='mt-4'>
                        <Col className='col-4 ms-2'>
                            <Row>
                                <Col className="d-flex justify-content-center align-items-center flex-column">
                                    {data.photo ? <img src={data.photo} style={{ width: '70%', aspectRatio: 1, borderRadius: '50%', objectFit: 'fill', objectPosition: 'center', cursor: 'pointer' }} alt="profile"/>
                                    : <Avatar
                                        name={data.name && data.name.split(' ')[0]}
                                        color="#0f5b7a"
                                        size={150}
                                        textSizeRatio={2}
                                        round={true}
                                        style={{ cursor: 'pointer' }}
                                    />}
                                    <Col className="d-flex align-items-center gap-1">
                                        <h1
                                            className="fw-bold fs-4 mt-4 mb-4 ms-1"
                                            style={{ color: '#727273' }}
                                        >
                                            {data.name && data.name.split(' ')[0]}
                                        </h1>
                                    </Col>
                                </Col>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <h1 className="fw-bold fs-5" style={{ color: '#727273' }}>
                                    Sobre o docente {data.name}
                                </h1>
                            </Row>
                            <Row className="mt-1">
                                <Col>
                                    <p className="mt-0 mb-0 fs-6" style={{ color: '#727273' }}>
                                        {data.about}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Card.Text className="d-flex mt-3">
                                    <p className="mt-0 mb-0 fs-6" style={{ color: '#727273' }}>
                                        {date(user.created)}
                                    </p>
                                </Card.Text>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    <p className="mt-0 mb-0 fs-6" style={{ color: '#727273' }}>
                                        <StarRating value={4.0} />
                                    </p>
                                </Col>
                            </Row>
                            <Row className="mt-2 mb-2">
                                <Row>
                                    <h1 className="fw-bold mt-2 fs-5" style={{ color: '#727273' }}>
                                        Redes sociais
                                    </h1>
                                </Row>
                                <Row>
                                    <Col className='col-1'>
                                        <Button variant="outline-light" href={data.contactLink} target="_blank">
                                            <AiFillLinkedin style={{ color: '#0072b1', fontSize: '25' }} />
                                        </Button>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>
    )
};

export default CardProfessorProfile;