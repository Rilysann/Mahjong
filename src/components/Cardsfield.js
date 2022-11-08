import React, { useEffect, useState } from "react";
import './Cardsfield.css';
import Card from "./Card";
import arrayGeneration from "../utils/arrayGeneration";

export default function Cardsfield() {
    let initialArray = arrayGeneration();
    initialArray = initialArray.map((el, idx) => { return { id: idx, value: el, status: 'preview' } });

    const [values, setValues] = useState(initialArray);
    const [currentValue, setCurrentValue] = useState(null)
    const [currentKey, setCurrentKey] = useState(null)
    const [cardLock, setCardLock] = useState(false);

    useEffect(() => {
        setTimeout(() => setValues(values.map((x) => { return { ...x, status: 'passive' } })), 5000)
    }, [])

    const initValue = (value, id) => {
        setCurrentValue(value);
        setCurrentKey(id)
        setValues(values.map(x => x.id === id ? { ...x, status: 'active' } : x));
    }

    const toggleDone = (value) => {
        setValues(values.map(x => x.value === value ? { ...x, status: 'done' } : x));
        setCurrentValue(null);
        setCurrentKey(null);
    }

    const resetValues = (id) => {
        setValues(values.map(x => x.id === id ? { ...x, status: 'active' } : x));
        setCardLock(true);
        setTimeout(() => {
            setCardLock(false);
            setValues(values.map(x => x.status !== 'done' ? { ...x, status: 'passive' } : x));
            setCurrentValue(null);
            setCurrentKey(null);
        }, 800);
    }

    const cardClick = (value, id, status) => {
        if (status === 'passive' && !cardLock) {
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
            {values.map(x => <Card key={x.id} cardClick={cardClick} {...x} />)}
        </div>
    )
}