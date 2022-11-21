import React, { useEffect, useState } from 'react';
import './Cardsfield.css';
import Card from './Card';
import arrayGeneration from '../utils/arrayGeneration';
import { ICard, CardStatus } from '../utils/interfaces/card.interface';

export default function Cardsfield() {
    let initialArray: ICard[] = arrayGeneration().map((el: number, idx: number) => { return { id: idx, value: el, status: CardStatus.Preview } });

    const [values, setValues] = useState<ICard[]>(initialArray);
    const [currentValue, setCurrentValue] = useState<null | number>(null)
    const [currentKey, setCurrentKey] = useState<null | number>(null)
    const [cardLock, setCardLock] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setValues(values.map((card: ICard) => { return { ...card, status: CardStatus.Passive } })), 5000)
    }, [])

    const isPassive = (status: CardStatus) => status === CardStatus.Passive && !cardLock;

    const initValue = (value: number, id: number) => {
        setCurrentValue(value);
        setCurrentKey(id)
        setValues(values.map((card: ICard) => card.id === id ? { ...card, status: CardStatus.Active } : card));
    }

    const toggleDone = (value: number) => {
        setValues(values.map((card: ICard) => card.value === value ? { ...card, status: CardStatus.Done } : card));
        setCurrentValue(null);
        setCurrentKey(null);
    }

    const resetValues = (id: number) => {
        setValues(values.map((card: ICard) => card.id === id ? { ...card, status: CardStatus.Active } : card));
        setCardLock(true);
        setTimeout(() => {
            setCardLock(false);
            setValues(values.map((card: ICard) => card.status !== CardStatus.Done ? { ...card, status: CardStatus.Passive } : card));
            setCurrentValue(null);
            setCurrentKey(null);
        }, 800);
    }

    const cardClick = (value: number, id: number, status: CardStatus): void => {
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