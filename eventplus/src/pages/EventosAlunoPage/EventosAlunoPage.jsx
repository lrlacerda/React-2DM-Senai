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
    myEventsResource,
    presencesEventResource,
    commentaryEventResource,
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
    const [comentario, setComentario] = useState("");

    useEffect(() => {
        loadEventsType();
    }, [tipoEvento, userData.userId]); // Adiciona 'tipoEvento' como dependência para disparar o useEffect sempre que o valor de 'tipoEvento' mudar

    async function loadEventsType() {
        setShowSpinner(true);
        setEventos([]); //zera array de eventos

        if (tipoEvento === "1") {
            try {
                const todosEventos = await api.get(eventsResource);
                const meusEventos = await api.get(
                    `${myEventsResource}/${userData.userId}`
                );
                const eventosMarcados = verificaPresenca(
                    todosEventos.data,
                    meusEventos.data
                );

                setEventos(eventosMarcados);
            } catch (error) {
                console.log("Erro na Api");
            }
        } else if (tipoEvento === "2") {
            try {
                const todosEventos = await api.get(
                    `${myEventsResource}/${userData.userId}`
                );
                console.log(todosEventos.data);

                const arrEventos = [];

                todosEventos.data.forEach((e) => {
                    arrEventos.push({
                        ...e.evento,
                        situacao: e.situacao,
                        idPresencaEvento: e.idPresencaEvento,
                    });
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

    const verificaPresenca = (arrAllEvents, eventsUser) => {
        for (let x = 0; x < arrAllEvents.length; x++) {
            //para cada evento principal
            for (let i = 0; i < eventsUser.length; i++) {
                //procura a correspondencia em minhas presenças
                if (
                    arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento
                ) {
                    arrAllEvents[x].situacao = true;
                    arrAllEvents[x].idPresencaEvento =
                        eventsUser[i].idPresencaEvento;
                    break; //para de procurar para o evento principal atual
                }
            }
        }
        //retorna todos os eventos marcados com a presença do usuário
        return arrAllEvents;
    };

    // toggle meus eventos ou todos os eventos
    function myEvents(tpEvent) {
        setTipoEvento(tpEvent);
    }

    const showHideModal = (idEvent) => {
        setShowModal(showModal ? false : true);
        setUserData({ ...userData, idEvento: idEvent });
    };

    //ler comentário - get
    const loadMyComentary = async (idUsuario, idEvento) => {
        try {
            const promise = await api.get(
                `${commentaryEventResource}?idUsuario=${idUsuario}&idEvento=${idEvento}}`
            );
            console.clear();
            console.log(promise.data.descricao);

            setComentario(promise.data[0].descricao);
        } catch (error) {
            console.error("Erro ao carregar comentários:", error);
        }
    };
    //ler comentário - post
    const PostMyComentary = async (descricao, idUsuario, idEvento) => {
        try {
            const promise = await api.post(commentaryEventResource, {
                descricao: descricao,
                exibe: true,
                idUsuario: idUsuario,
                idEvento: idEvento
            });
 
            if (promise.status == 200) {
                alert("Comentario Cadastrado com Sucesso")
            }
        } catch (error) {
            console.error("Erro ao postar comentários:", error);
        }
    };
    //remove comentário - delete
    const commentaryRemove = async () => {
        alert("Remover o comentário");

        try {
            const promise = await api.delete();
            console.log("Comentários do usuário:", promise.data);
        } catch (error) {
            console.error("Erro ao deletar comentários:", error);
        }
    };

    async function handleConnect(eventId, whatTheFunction, presencaId = null) {
        if (whatTheFunction === "connect") {
            try {
                //connect
                const promise = await api.post(presencesEventResource, {
                    situacao: true,
                    idUsuario: userData.userId,
                    idEvento: eventId,
                });

                if (promise.status === 201) {
                    loadEventsType();
                    alert("Presença confirmada!!");
                }
                setTipoEvento("1");
                const todosEventos = api.get(eventsResource);
                setEventos(todosEventos.data);
            } catch (error) {}
            return;
        }

        try {
            const unconnected = await api.delete(
                `${presencesEventResource}/${presencaId}`
            );
            if (unconnected.status === 204) {
                loadEventsType();
                alert("Desconectado do evento");
            }
        } catch (error) {
            console.log("Erro ao desconectar o usuário do evento");
            console.log(error);
        }
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
                        fnShowModal={showHideModal}
                    />
                </Container>
            </MainContent>

            {/* SPINNER -Feito com position */}
            {showSpinner ? <Spinner /> : null}

            {showModal ? (
                <Modal
                    userId={userData.userId}
                    showHideModal={showHideModal}
                    fnGet={loadMyComentary}
                    fnPost={PostMyComentary}
                    fnDelete={commentaryRemove}
                    comentaryText={comentario}
                />
            ) : null}
        </>
    );
};

export default EventosAlunoPage;
