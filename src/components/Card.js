import React, { useEffect, useState } from "react";
import './Card.css';

function Card(props) {
    const [status, setStatus] = useState(props.status);
    const value = props.value;
    const cardClass = ` ${props.status}`
    

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <div className={'card-body'+cardClass} onClick={() => props.cardClick(props.id, props.ui)}>
            {status !== 'passive' && <h1>{value}</h1>}
        </div>
    )
}

export default Card;