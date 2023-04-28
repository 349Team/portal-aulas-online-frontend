import React from "react";
import Card from 'react-bootstrap/Card';

import './style.css'



function CardCourses({ teste }) {

  let description = teste.description;
  if (description.length > 100) {
    description = description.substring(0, 100);
  }

  return (
    <Card className="cardAula" style={{ width: '15rem' }}>
      <Card.Img className="cardAula-img-top" variant="top" src={teste.banner} />
      <Card.Body>
        <Card.Title className="cardAula-title">{teste.title}</Card.Title>
        <Card.Text className="cardAula-description">
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardCourses
