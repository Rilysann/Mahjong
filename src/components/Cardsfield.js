import React, { useEffect, useState } from "react";
import './Cardsfield.css';
import Card from "./Card";

export default function Cards() {
    function arrInit() {
        let arr = [];

        while (arr.length < 16) {
            let randomNum = Math.floor(Math.random() * 100) + 1;
            if (arr.includes(randomNum)) continue;
            arr.push(randomNum);
        }

        arr = arr.map((el, idx) => { return { id: idx+1, value: el, status: 'active'} })
        return arr.concat(arr).sort(() => Math.random() - 0.5)
    }

    const [values, setValues] = useState(arrInit());
    const [currentValue, setCurrentValue] = useState(null)
    const [currentKey, setCurrentKey] = useState(null)

    useEffect(() => {
        setTimeout(() => setValues(values.map((x) => { return { ...x, status: 'passive' } })), 5000)
    }, [])

    const cardClick = (id, k) => {
        if (values[k]['status'] !== 'active' && values[k]['status'] !== 'done' && values.filter(x => x.status !== 'active').length !== values.length - 2) {
            if (!currentValue) {
                setValues(values.map((x, i) => { return i == k ? { ...x, status: 'active' } : x }));
                setCurrentValue(id);
                setCurrentKey(k);
            } else if (currentValue == id && currentKey !== k) {
                setValues(values.map((x) => { return x.id == id ? { ...x, status: 'done' } : x }))
                setCurrentValue(null);
                setCurrentKey(null);
            } else if (k !== currentKey) {
                setTimeout(() => setValues(values.map((x, i) => { return i == k ? { ...x, status: 'active' } : x })), 0);
                setTimeout(() => setValues(values.map((x) => { return x.status !== 'done' ? { ...x, status: 'passive' } : x })), 700)
                setCurrentValue(null);
                setCurrentKey(null);
            }
        }
    }

    return (
        <div className="cards-container">
            {values.map((x, idx) => <Card ui={idx} key={idx} id={x.id} status={x.status} value={x.value} cardClick={cardClick} />)}
        </div>
    )
}