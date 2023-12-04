import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Titulo/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, {eventsResource, nextEventResource} from "../../services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";

const EventosAlunoPage = () => {
    // state do menu mobile
    const [exibeNavbar, setExibeNavbar] = useState(false);
    const [eventos, setEventos] = useState([
        // { idEvento: "15876", nomeEvento: "Evento 1", dataEvento: "2023-12-01" },
        // { idEvento: "15878", nomeEvento: "Evento 2", dataEvento: "2023-12-10" },
        // { idEvento: "15237", nomeEvento: "Evento 3", dataEvento: "2023-12-23" },
    ]);
    // select mocado
    const [quaisEventos, setQuaisEventos] = useState([
        { value: 1, text: "Todos os eventos" },
        { value: 2, text: "Meus eventos" },
    ]);

    const [tipoEvento, setTipoEvento] = useState(1); //código do tipo do Evento escolhido
    const [showSpinner, setShowSpinner] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // recupera os dados globais do usuário
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
        async function name(params) {
            if (tipoEvento == 1) {
                try {
                    const retornoEventos = await api.get(eventsResource)
                    setEventos(retornoEventos.data)
                } catch (error) {
                    console.log("Erro na Api")
                }
            } else {
                
            }
        }
        setShowSpinner(true)
        setEventos([])//zera array de eventos
       
        //Fazer criar a função loadEventsType trazer todos os eventos ou meus eventos (tipoEventos colocar para ser observada no useffet)
        //roda no carregamento da pagina e sempre que tipo de evento for alterado
        // loadEventsType();
        // Função para carregar os eventos de acordo com o tipo selecionado
       

      
    }, [tipoEvento]); // Adiciona 'tipoEvento' como dependência para disparar o useEffect sempre que o valor de 'tipoEvento' mudar


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
