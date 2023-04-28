import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function StarRating({ value }) {
  const fullStars = Math.floor(value);
  const halfStars = Math.ceil(value - fullStars);
  const emptyStars = 5 - fullStars - halfStars;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
  }

  if (halfStars > 0) {
    stars.push(<FontAwesomeIcon key={stars.length} icon={faStar} className="text-warning" style={{ opacity: 0.5 }} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesomeIcon key={stars.length} icon={faStar} className="text-secondary" />);
  }

  const tooltip = <Tooltip id="tooltip-star-rating">{value} de 5 estrelas</Tooltip>;

  return (
    <OverlayTrigger placement="top" overlay={tooltip}>
      <div>{stars}</div>
    </OverlayTrigger>
  );
}

export default StarRating;