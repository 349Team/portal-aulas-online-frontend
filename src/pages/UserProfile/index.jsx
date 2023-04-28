import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row, Card, Button, Modal, Form } from 'react-bootstrap'
import Avatar from 'react-avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { AuthAPI } from "../../api/auth-api";
import { HttpStatus } from "../../api/default";
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { Roles } from '../../api/default'

import './style.css'

const UserProfileScreen = () => {
  const navigate = useNavigate()

  const { logged, user, token, setToken } = useAuthContext();

  const [authorizationCode, setAuthorizationCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalNotification, setShowModalNotification] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModalNotification = () => {
    setShowModalNotification(false);
    handleShowModal();
  }
  const handleShowModalNotification = () => setShowModalNotification(true);

  const date = (dateString) => {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const formattedDate = `Usuário desde: ${month}/${year}`;
    return formattedDate // saída: "23/4/2023"

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await AuthAPI.putInvite(user.id, authorizationCode, token)
    if (response.status === HttpStatus.OK) {
      setToken(token)
      handleCloseModal()
    } else {
      setAuthorizationCode('')
      handleCloseModal()
      handleShowModalNotification()
    }
  }

  return logged && user ? (
    <>
      <Navbar style={{ marginBottom: '50px' }}>
        <Container fluid>
          <p style={{ color: '#0f5b7a' }} className="mt-3 fs-6 fw-bold">
            &#128075;&nbsp; Hey, {user.name.split(' ')[0]}!
          </p>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Avatar
                class
                name={user.name}
                color="#0f5b7a"
                size={30}
                textSizeRatio={2}
                round={true}
              />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="d-flex justify-content-center gap-4">
          <Col xs={3}>
            <Card
              style={{
                paddingTop: '16px',
              }}
            >
              <Row>
                <Col className="d-flex justify-content-center align-items-center flex-column">
                  <Avatar
                    class
                    name={user.name && user.name.split(' ')[0]}
                    color="#0f5b7a"
                    size={150}
                    textSizeRatio={2}
                    round={true}
                  />
                  <Col className="d-flex align-items-center gap-1">
                    <h1
                      className="fw-bold fs-4 mt-4 mb-4 ms-1"
                      style={{ color: '#727273' }}
                    >
                      {user.name}
                    </h1>
                    <Button variant="outline-light">
                      <FontAwesomeIcon
                        style={{ color: '#8a9094', fontSize: '16' }}
                        icon={faPen}
                      />
                    </Button>
                  </Col>
                </Col>
              </Row>
              <Card.Footer className="d-flex justify-content-center align-items-center">
                <p className="mt-0 mb-0 fs-6" style={{ color: '#727273' }}>
                  {date(user.created)}
                </p>
              </Card.Footer>
            </Card>
            {
              user?.role?.includes(Roles.STUDENT)
              && (!user?.role?.includes(Roles.PROFESSOR) ?? false)
              && (!user?.role?.includes(Roles.ADMIN) ?? false) &&
              <Card style={{ cursor: 'pointer' }} className='mt-1' onClick={handleShowModal}>
                <Col style={{ backgroundColor: "#198754", color: "white" }} className="d-flex justify-content-center align-items-center bg-gradient">
                  <p className="m-1">Tornar-me professor!</p>
                </Col>
              </Card>
            }

            <Modal show={showModal} onHide={handleCloseModal} className="modal-invite">
              <Modal.Header closeButton>
                <Modal.Title>Tornar-se professor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="authorizationCode">
                    <Form.Control autoComplete="off" type="text" placeholder="Cole o código aqui" value={authorizationCode} onChange={(e) => setAuthorizationCode(e.target.value)} />
                  </Form.Group>
                  <Button disabled={authorizationCode?.length < 3} className='mt-2' variant="success" type="submit">Utilizar convite</Button>
                </Form>
              </Modal.Body>
            </Modal>
            <Modal
              size="lg"
              className="modal-invite"
              show={showModalNotification}
              onHide={handleCloseModalNotification}
            >
              <Modal.Header closeButton style={{border: 'none'}}/>
              <Modal.Body>
                <h5>Convite inválido, tente novamente ou contate o administrador !</h5>
              </Modal.Body>
            </Modal>
          </Col>

          <Col>
            <Row className="mb-4">
              <Card
                style={{
                  padding: '16px',
                }}
              >
                <Row className="mb-4">
                  <Col className="d-flex justify-content-between align-items-center">
                    <h1 className="fw-bold fs-5" style={{ color: '#727273' }}>
                      Sobre mim
                    </h1>
                    <Button variant="outline-light">
                      <FontAwesomeIcon
                        style={{ color: '#8a9094', fontSize: '16' }}
                        icon={faPen}
                      />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="mt-0 mb-0 fs-6" style={{ color: '#727273' }}>
                      {user.about}
                    </p>
                  </Col>
                </Row>
              </Card>
            </Row>

           
          </Col>
        </Row>
      </Container>
    </>
  ) : <></>
}

export default UserProfileScreen
