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
    commentaryEventResourceIA,
} from "../../services/Service";
import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";

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
    const [idComentario, setIdComentario] = useState(null);
     const [idEvento, setIdEvento] = useState("");

    useEffect(() => {
        loadEventsType();
    }, [tipoEvento, userData.userId]); // Adiciona 'tipoEvento' como dependência para disparar o useEffect sempre que o valor de 'tipoEvento' mudar

    async function loadEventsType() {
        setShowSpinner(true);
        // setEventos([]); //zera array de eventos

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
                const retornoEventos = await api.get(
                    `${myEventsResource}/${userData.userId}`
                );

                const arrEventos = [];

                retornoEventos.data.forEach((e) => {
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
                        eventsUser[i].idPresencaEvento = eventsUser[i].idPresencaEvento;
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

           const myComm = await promise.data.filter(
               (comm) =>
                   comm.idEvento === idEvento && comm.idUsuario === idUsuario
           );

           setComentario(myComm.length > 0 ? myComm[0].descricao : "");
           setIdComentario(
               myComm.length > 0 ? myComm[0].idComentarioEvento : null
           );
        } catch (error) {
            console.error("Erro ao carregar comentários:", error);
        }
    };
    //ler comentário - post
    const postMyCommentary = async (descricao, idUsuario, idEvento) => {
        try {
          const promise = await api.post(commentaryEventResourceIA, {
            descricao: descricao,
            exibe: true,
            idUsuario: idUsuario,
            idEvento: idEvento,
          });
    
          if (promise.status === 200) {
            alert("Comentário cadastrado com sucesso");
          }
        } catch (error) {
          console.log("Erro ao cadastrar o evento");
          console.log(error);
        }
      };

    //remove comentário - delete
    const commentaryRemove = async (idComentario) => {
        try {
            const promise = await api.delete(
                `${commentaryEventResource}/${idComentario}`
            );
            if (promise.status === 200) {
                alert("Evento excluído com sucesso");
            }
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
                    fnDelete={commentaryRemove}
                    fnPost={postMyCommentary}
                    comentaryText={comentario}
                    idEvento={idEvento}
                    idComentario={idComentario}
                />
            ) : null}
        </>
    );
};

export default EventosAlunoPage;
