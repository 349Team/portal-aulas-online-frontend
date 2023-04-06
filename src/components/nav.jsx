import React from 'react';
import { Component } from 'react';
import './nav.css';

import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark, faBookmark, faCompass, faPen, faTag } from '@fortawesome/free-solid-svg-icons'



class SideNav extends Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
    }

    onSelect(e) {
        console.log('onSelect');
    }

    toggleNav() {
        console.log('toggle..');
    }

    render() {

        return (
            <Navbar className='home'>
                <Card className='cardSide'>
                    <Card.Img className="cardSide-img-top mx-auto mt-2" variant="top" src={'https://i.ibb.co/DfGzNpM/logo.png'} />

                    <Card.Body style={{
                        paddingLeft: "0px",
                        paddingRRight: "0px"
                    }}>
                        <Navbar.Text className='fw-bold' style={{ fontSize: "x-small", color: "#b4bbbf", paddingLeft: "16px" }}>
                            ENSINO GRATUITO
                        </Navbar.Text>
                        <ListGroup variant='flush'>

                            <ListGroupItem className='list' style={{
                                paddingLeft: "15px",
                                paddingRight: "0px"
                            }}>
                                <ListGroup horizontal>
                                    <ListGroup.Item style={{
                                        paddingLeft: "5px",
                                        paddingRight: "0px"
                                    }} className='li'>
                                        <FontAwesomeIcon style={{ color: "#8a9094", fontSize: "18" }} icon={faBookmark} className="me-2" />
                                    </ListGroup.Item>
                                    <ListGroup.Item className='li'>
                                        <p style={{ color: "#8a9094" }}>Meus cursos</p>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item style={{
                                        paddingLeft: "1px",
                                        paddingRight: "0px"
                                    }} className='li'>
                                        <FontAwesomeIcon style={{ color: "#8a9094", fontSize: "18" }} icon={faCompass} className="me-2" />
                                    </ListGroup.Item>
                                    <ListGroup.Item className='li'>
                                        <p style={{ color: "#8a9094" }}>Explorar cursos</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </ListGroupItem>
                        </ListGroup>



                        <Navbar.Text className='fw-bold' style={{ fontSize: "x-small", color: "#b4bbbf", paddingLeft: "16px" }}>
                            KULTIVI+
                        </Navbar.Text>


                        <ListGroup variant='flush'>

                            <ListGroupItem className='list' style={{
                                paddingLeft: "15px",
                                paddingRight: "0px"
                            }}>
                                <ListGroup horizontal>
                                    <ListGroup.Item style={{
                                        paddingLeft: "5px",
                                        paddingRight: "0px"
                                    }} className='li'>
                                        <FontAwesomeIcon style={{ color: "#8a9094", fontSize: "18" }} icon={faBookBookmark} className="me-2" />
                                    </ListGroup.Item>
                                    <ListGroup.Item className='li'>
                                        <p style={{ color: "#8a9094" }}>E-books</p>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item style={{
                                        paddingLeft: "1px",
                                        paddingRight: "0px"
                                    }} className='li'>
                                        <FontAwesomeIcon style={{ color: "#8a9094", fontSize: "18" }} icon={faPen} className="me-2" />
                                    </ListGroup.Item>
                                    <ListGroup.Item className='li'>
                                        <p style={{ color: "#8a9094" }}>Exercícios</p>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item style={{
                                        paddingLeft: "1px",
                                        paddingRight: "0px"
                                    }} className='li'>
                                        <FontAwesomeIcon style={{ color: "#8a9094", fontSize: "18" }} icon={faTag} className="me-2" />
                                    </ListGroup.Item>
                                    <ListGroup.Item className='li'>
                                        <p style={{ color: "#8a9094" }}>Clube de descontos</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </ListGroupItem>
                        </ListGroup>


                    </Card.Body>
                </Card>
            </Navbar >
        );
    }
    componentDidMount() { }
}

export default SideNav;
