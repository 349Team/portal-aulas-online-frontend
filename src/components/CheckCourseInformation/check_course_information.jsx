import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCertificate, faFileArchive, faPlayCircle } from '@fortawesome/free-solid-svg-icons'


const CheckCourseInformation = () => {
    return (
      <div >
        <ListGroup>
        <ListGroup.Item><FontAwesomeIcon icon={faPlayCircle} className="me-2" />10 Aulas.</ListGroup.Item>
        <ListGroup.Item><FontAwesomeIcon icon={faBook} className="me-2" />7 arquivos de apoio.</ListGroup.Item>
        <ListGroup.Item><FontAwesomeIcon icon={faFileArchive} className="me-2" />10 arquivos adicionais.</ListGroup.Item>
        <ListGroup.Item><FontAwesomeIcon icon={faCertificate} className="me-2" />Certificação de conclusão.</ListGroup.Item>
        </ListGroup>
      </div>
    );
  };
  
  export default CheckCourseInformation;