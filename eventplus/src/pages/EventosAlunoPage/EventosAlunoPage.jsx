import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Titulo/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, {
    eventsResource,
    nextEventResource,
    myEventsResource,
} from "../../services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";
import { wait } from "@testing-library/user-event/dist/utils";

const EventosAlunoPage = () => {
    // state do menu mobile
    const [exibeNavbar, setExibeNavbar] = useState(false);
    const [eventos, setEventos] = useState([]);
    // select mocado
    const [quaisEventos, setQuaisEventos] = useState([
        { value: 1, text: "Todos os eventos" },
        { value: 2, text: "Meus eventos" },
    ]);

    const [tipoEvento, setTipoEvento] = useState(); //código do tipo do Evento escolhido
    const [showSpinner, setShowSpinner] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // recupera os dados globais do usuário
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
        async function loadEventsType() {
            setShowSpinner(true);
            setEventos([]); //zera array de eventos

            if (tipoEvento == "1") {
                try {
                    const retornoEventos = await api.get(eventsResource);
                    setEventos(retornoEventos.data);
                } catch (error) {
                    console.log("Erro na Api");
                }
            } else if (tipoEvento === "2") {
                try {
                    const retornoEventos = await api.get(
                        `${myEventsResource}/${userData.userId}`
                    );
                    console.log(retornoEventos.data);

                    const arrEventos = [];
                    retornoEventos.data.forEach((e) => {
                        arrEventos.push(e.evento);
                    });

                    setEventos(arrEventos);
                } catch (error) {
                    console.log("Erro na api");
                }
            } else {
                setEventos([]);
            }
            setShowSpinner(false);
        }

        loadEventsType();
    }, [tipoEvento]); // Adiciona 'tipoEvento' como dependência para disparar o useEffect sempre que o valor de 'tipoEvento' mudar

    const verificaPresenca = (arrAllEvents, eventsUser) => {
        for (let x = 0; x < arrAllEvents.length; x++) {
            //para cada evento principal
            for (let i = 0; i < eventsUser.length; i++) {
                //procura a correspondencia em minhas presenças
                if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {
                    arrAllEvents[x].situacao = true;
                    break; //para de procurar para o evento principal atual
                }
            }
        }
    };

    // toggle meus eventos ou todos os eventos
    function myEvents(tpEvent) {
        setTipoEvento(tpEvent);
    }

    async function loadMyComentary(idComentary) {
        return "????";
    }

    const showHideModal = () => {
        setShowModal(showModal ? false : true);
    };

    const commentaryRemove = () => {
        alert("Remover o comentário");
    };

    function handleConnect() {
        alert("Desenvolver a função conectar evento");
    }
    return (
        <>
            <MainContent>
                <Container>
                    <Title titleText={"Eventos"} className="custom-title" />

                    <Select
                        id="id-tipo-evento"
                        name="tipo-evento"
                        required={true}
                        options={quaisEventos} // aqui o array dos tipos
                        manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
                        defaultValue={tipoEvento}
                        className="select-tp-evento"
                    />
                    <Table
                        dados={eventos}
                        fnConnect={handleConnect}
                        fnShowModal={() => {
                            showHideModal();
                        }}
                    />
                </Container>
            </MainContent>

            {/* SPINNER -Feito com position */}
            {showSpinner ? <Spinner /> : null}

            {showModal ? (
                <Modal
                    userId={userData.userId}
                    showHideModal={showHideModal}
                    fnDelete={commentaryRemove}
                />
            ) : null}
        </>
    );
};

export default EventosAlunoPage;
