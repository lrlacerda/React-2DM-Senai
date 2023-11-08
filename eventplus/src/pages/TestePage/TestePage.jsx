import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Titulo/Title";

const TestePage = () => {
    //vari[aveis do componente]
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [total, setTotal] = useState(0);

    function handleCalcular(e) {
        e.preventDefault();
        setTotal(parseFloat(n1) + parseFloat(n2));
    }

    return (
        <div>
             <Title
                titleText="Página de Poc's"
             />
            <h2>Calculator</h2>

            <form onSubmit={handleCalcular}>
                <Input
                    type="number"
                    placeholder="Primeiro número"
                    name="n1"
                    id="n1"
                    value={n1}
                    onChange={(e) => {
                        setN1(e.target.value);
                    }}
                />

                <br />

                <Input
                    type="number"
                    placeholder="Segundo número"
                    name="n2"
                    id="n2"
                    value={n2}
                    onChange={(e) => {
                        setN2(e.target.value);
                    }}
                />

                <br />

                <Button
                    texButton="Calcular"
                    type="submit"
                    onClick={handleCalcular}
                />
                <span>
                    Resultado: <strong>{total}</strong>
                </span>
            </form>
            {/* <p>Valor do N1: {n1}</p>
            <p>Valor do N1: {n2}</p> */}
        </div>
    );
};

export default TestePage;
