import React, { useEffect, useState } from 'react';
import './Cardsfield.css';
import Card from './Card';
import arrayGeneration from '../utils/arrayGeneration';

export default function Cardsfield() {
    let initialArray = arrayGeneration();
    initialArray = initialArray.map((el, idx) => { return { id: idx, value: el, status: 'preview' } });

    const [values, setValues] = useState(initialArray);
    const [currentValue, setCurrentValue] = useState(null)
    const [currentKey, setCurrentKey] = useState(null)
    const [cardLock, setCardLock] = useState(false);

    useEffect(() => {
        setTimeout(() => setValues(values.map((card) => { return { ...card, status: 'passive' } })), 5000)
    }, [])

    const isPassive = (status) => status === 'passive' && !cardLock;

    const initValue = (value, id) => {
        setCurrentValue(value);
        setCurrentKey(id)
        setValues(values.map(card => card.id === id ? { ...card, status: 'active' } : card));
    }

    const toggleDone = (value) => {
        setValues(values.map(card => card.value === value ? { ...card, status: 'done' } : card));
        setCurrentValue(null);
        setCurrentKey(null);
    }

    const resetValues = (id) => {
        setValues(values.map(card => card.id === id ? { ...card, status: 'active' } : card));
        setCardLock(true);
        setTimeout(() => {
            setCardLock(false);
            setValues(values.map(card => card.status !== 'done' ? { ...card, status: 'passive' } : card));
            setCurrentValue(null);
            setCurrentKey(null);
        }, 800);
    }

    const cardClick = (value, id, status) => {
        if (isPassive(status)) {
            if (!currentValue) {
                initValue(value, id);
            } else if (value === currentValue && id !== currentKey) {
                toggleDone(value);
            } else {
                resetValues(id);
            }
        }
    }

    return (
        <div className="cards-container">
            {values.map(card => <Card key={card.id} cardClick={cardClick} {...card} />)}
        </div>
    )
}