import React from 'react';
import './Card.css';
import { ICard, CardStatus } from '../utils/interfaces/card.interface';

interface Props extends ICard {
    cardClick: (value: number, id: number, status: CardStatus) => void;
}

const Card: React.FC<Props> = ({status, value, id, cardClick}): JSX.Element => {
    const cardClass: string = ` ${status}`;

    return (
        <div className={'card-body' + cardClass} onClick={() => cardClick(value, id, status)}>
            {status !== 'passive' && <h1>{value}</h1>}
        </div>
    )
}

export default Card;
