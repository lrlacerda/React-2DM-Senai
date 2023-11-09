import React from "react";
import { useState, useEffect } from "react";

const TestePage = () => {
    const [count, setCount] = useState(1);
    const [calculation, setCalculation] = useState(0);

    //EXECUTA QUANDO O COMPONENTE FOR MONTADO
    //E QUANDO O STATTE COUNT FOR ALTERADA
    useEffect(() => {
        setCalculation(() => count * 2);
    }, [count]); // <- add the count variable here

    return (
        <>
            <p>Count: {count}</p>
            <button onClick={() => setCount((c) => c + 1)}>+</button>
            <p>Calculation: {calculation}</p>
        </>
    );
};

export default TestePage;
