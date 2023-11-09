import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Titulo/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import axios from "axios";

const HomePage = () => {
    //dados mocados
    const [nextEvents, setnextEvents] = useState([]);
    const urlLocal = "https://localhost:7118/api";

    //roda somente na inicialização do componente
    useEffect(() => {
        async function getNextEvents() {
            try {
                const promise = await axios.get(`${urlLocal}/Evento`);
                const dados = await promise.data;

                setnextEvents(dados); //atualiza o state
            } catch (error) {
                alert("Deu ruim na api!");
            }
        }

        getNextEvents(); //doda a função
    }, []);

    return (
        <MainContent>
            <Banner />
            <section className="proximos-eventos">
                <Container>
                    <Title titleText={"Proximos Eventos"} />
                    <div className="events-box">
                        {nextEvents.map((e) => {
                            return (
                                <NextEvent
                                    key={e.idEvento}
                                    title={e.nomeEvento}
                                    description={e.descricao}
                                    eventDate={e.dataEvento}
                                />
                            );
                        })}
                    </div>
                </Container>
            </section>

            <VisionSection />
            <ContactSection />
        </MainContent>
    );
};

export default HomePage;
