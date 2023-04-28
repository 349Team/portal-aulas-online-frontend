import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck} from '@fortawesome/free-solid-svg-icons'

function CheckDetails ({cdetails}) {
  const { learnings } = cdetails;
  return (
    <div >
      <ListGroup>
        {learnings?.map((learning) => (
          <ListGroup.Item key={learning.id}>
            <FontAwesomeIcon icon={faCheck} className="me-2" />{learning.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CheckDetails;