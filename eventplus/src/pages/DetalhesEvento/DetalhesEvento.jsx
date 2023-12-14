import React, { useEffect, useState } from "react";
import "./DetalhesEvento.css";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import Title from "../../components/Titulo/Title";
import { useParams } from "react-router-dom";
import api, { eventsResource } from "../../services/Service";

const EventosAnterioresAlunoPage = (e) => {
    const [evento, setEvento] = useState([]);
    const { idEvento } = useParams();

    useEffect(() => {
        getEventById();
    }, []);

    async function getEventById() {
        const promise = await api.get(`${eventsResource}/${idEvento}`);
        setEvento(promise.data);
        console.log(promise.data);
    }

    return (
        <>
            <MainContent>
                <Container>
                    <Title
                        titleText={"Eventos Anteriores"}
                        additionalClass="custom-title"
                        color=""
                    />
                    <div>
                        <p>{evento.nomeEvento}</p>
                    </div>
                </Container>
            </MainContent>
        </>
    );
};

export default EventosAnterioresAlunoPage;
