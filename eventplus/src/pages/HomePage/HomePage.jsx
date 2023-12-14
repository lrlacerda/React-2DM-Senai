import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Titulo/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import Notification from "../../components/Notification/Notification";

import api from "../../services/Service";

import { nextEventResource } from "../../services/Service";

const HomePage = () => {
    //dados mocados
    const [nextEvents, setnextEvents] = useState([]);
    const [notifyUser, setNotifyUser] = useState();

    //roda somente na inicialização do componente
    useEffect(() => {
        async function getNextEvents() {
            try {
                const promise = await api.get(`${nextEventResource}`);
                const dados = await promise.data;

                setnextEvents(dados); //atualiza o state
            } catch (error) {
                setNotifyUser({
                    titleNote: "Erro",
                    textNote:
                        "Erro não foi possivel carregar os próximos eventos",
                    imgIcon: "danger",
                    imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão",
                    showMessage: true,
                });
            }
        }

        getNextEvents(); //doda a função
    }, []);

    return (
        <MainContent>
            {/* <Link to={`/teste/${e.idEvento}`}>Visualizar</Link> */}
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
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
                                    idEvent={e.idEvento}
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
