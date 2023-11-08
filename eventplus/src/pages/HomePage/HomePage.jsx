import React from "react";
import "./HomePage.css";
import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Titulo/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";

const HomePage = () => {
    return (
        <div>
            <MainContent>
                <Banner />
                <section className="proximos-eventos">
                    <Container>
                        <Title titleText={"Proximos Eventos"} />
                        <div className="events-box">
                            <NextEvent
                                title={"Evento Musical"}
                                description={"Banda Nocturna"}
                                eventDate={"10/11/2023"}
                                idEvent={""}
                            />
                            <NextEvent
                                title={"Evento DJ"}
                                description={"Evento com vários DJ"}
                                eventDate={"12/11/2023"}
                                idEvent={""}
                            />
                            <NextEvent
                                title={"Evento Teatro"}
                                description={"A Fantastica Fabrica"}
                                eventDate={"20/11/2023"}
                                idEvent={""}
                            />
                            <NextEvent
                                title={"Evento Musical"}
                                description={"Bandas de Rock"}
                                eventDate={"26/11/2023"}
                                idEvent={""}
                            />
                        </div>
                    </Container>
                </section>

                <VisionSection />
                <ContactSection />
            </MainContent>
        </div>
    );
};

export default HomePage;
