import React from 'react';
import './Card.css';

function Card({status, value, id, cardClick}) {
    const cardClass = ` ${status}`

    return (
        <div className={'card-body' + cardClass} onClick={() => cardClick(value, id, status)}>
            {status !== 'passive' && <h1>{value}</h1>}
        </div>
    )
}

export default Card;
