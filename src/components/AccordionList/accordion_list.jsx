import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Accordion, ListGroupItem } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./accordion_list.css";
import { useNavigate } from 'react-router-dom';

function AccordionListCourse({ sessions }) {
  const { lessons } = sessions;
  const navigate = useNavigate();

  const alertClicked = () => {
    alert('Você clicou em uma aula');
  };

  return (
    <Accordion alwaysOpen className="lesson-accordion">
      {lessons?.map(item => (
        <Card key={item.id}>
          <Accordion.Item eventKey={item.id.toString()} key={item.id}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                <ListGroupItem action onClick={() => navigate(`/student/lessons/${item.id}`)}>
                  <Row>
                    <Col className="col-2">
                      <img src={item.banner} alt="" className="expanded-image" />
                    </Col>
                    <Col className="col-10">
                      <p>{item.content}</p>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Card>
      ))}
    </Accordion>
  );
};

export default AccordionListCourse