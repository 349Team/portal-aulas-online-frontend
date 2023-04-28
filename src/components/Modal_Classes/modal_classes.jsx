import React from "react";
import { Modal, Button } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


function ModalClasses ({onClose}) { 
    
    return (
        <div>
            <Row>
                <Col>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar aula</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form>
                                    <Card.Body>
                                        <Row className='align-items-center pt-4 pb-3'>
                                            <Col md='4' className='ps-4'>
                                                <h6 className="mb-4">Título da aula:</h6>
                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Control type="text" name="title" placeholder="Insira o título do curso." />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className='align-items-center pt-4 pb-3'>
                                            <Col md='4' className='ps-4'>
                                                <h6 className="mb-4">Descrição da aula:</h6>
                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Control type="text" name="URL" placeholder="Insira uma descrição da aula." />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className='align-items-center pt-4 pb-3'>
                                            <Col md='4' className='ps-4'>
                                                <h6 className="mb-4">Imagem da aula:</h6>
                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Control type="text" name="URL" placeholder="Insira uma imagem sobre a aula." />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className='align-items-center pt-4 pb-3'>
                                            <Col md='4' className='ps-4'>
                                                <h6 className="mb-4">URL da aula:</h6>
                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Control type="text" name="URL" placeholder="Insira a URL do vídeo." />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={onClose}>
                        Salvar
                    </Button>
                    </Modal.Footer>
                </Col>
            </Row>
        </div>
    );
  };
  
  export default ModalClasses