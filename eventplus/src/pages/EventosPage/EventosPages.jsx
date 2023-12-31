import React, { useEffect, useState } from "react";
import "./EventosPages.css";
import Title from "../../components/Titulo/Title";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import Container from "../../components/Container/Container";
import {Input,Button,Select, Select2} from "../../components/FormComponents/FormComponents";
import EventoImage from "../../assets/images/evento.svg";
import api, {eventsTypeResource,eventsResource,instituicaoResource,} from "../../services/Service";
import TableEv from "./TableEV/TableEv";
// import { dateFormatDbToView } from "../../Utils/stringFunctions";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

const EventosPages = () => {
    //state
    const idInstituicao = "899bf890-b2a3-447d-a134-a00c372dce12";
    const [instituicao, setInstituicao] = useState([])
    const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tiposEvento, setTiposEvento] = useState([]);
    const [dataEvento, setDataEvento] = useState("");
    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [eventos, setNextEvents] = useState([]);
    const [idEvento, setIdEvento] = useState(null); //para editar, por causa do evento

    const [notifyUser, setNotifyUser] = useState();
    const [showSpinner, setShowSpinner] = useState(false); //spinner loading

    //Chama a Função que após a pagina /DOM estar pronta
    useEffect(() => {
        //define a chamada na api
        async function loadEvents() {
            setShowSpinner(true);
            try {
                const retorno = await api.get(eventsTypeResource);
                dePara(retorno.data);
                console.log(retorno.data);

                // Buscar eventos
                const promiseEvent = await api.get(eventsResource);
                setNextEvents(promiseEvent.data);
            } catch (error) {
                console.log("Erro na api");
                console.log(error);
            }
            setShowSpinner(false);
        }
        loadEvents();
    }, []);

    useEffect(() => {
        //define a chamada na api instituição
        async function loadInstituicao() {
            setShowSpinner(true);
            try {
                const retorno = await api.get(instituicaoResource);
                deParaInstituicao(retorno.data);
                console.log(retorno.data);

                // Buscar eventos
                const promiseEvent = await api.get(eventsResource);
                setNextEvents(promiseEvent.data);
            } catch (error) {
                console.log("Erro na api");
                console.log(error);
            }
            setShowSpinner(false);
        }
        loadInstituicao();
    }, []);

    //**********************************Cadastrar************************************ */

    // Função para mapear tipos de evento para opções do Select
    function dePara(eventos) {
        const arrayOptions = [];
        eventos.forEach((e) => {
            arrayOptions.push({ value: e.idTipoEvento, text: e.titulo });
        });
        setOptions(arrayOptions);
    }
    // Função para mapear a instituição para opções do Select
    function deParaInstituicao(instituicao) {
        const arrayOptions2 = [];
        instituicao.forEach((e) => {
            arrayOptions2.push({ value: e.idInstituicao, text: e.nomeFantasia });
        });
        setOptions2(arrayOptions2);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (titulo.trim().length < 3) {
            setNotifyUser({
                titleNote: "Aviso",
                textNote: "O título deve ter pelo menos 3 caracteres",
                imgIcon: "warning",
                imgAlt: "Imagem de ilustração de Aviso. Moça em frente a um ponto de exclamação",
                showMessage: true,
            });
            return;
        }
        setShowSpinner(true);

        try {
            await api.post(eventsResource, {
                nomeEvento: titulo,
                idTipoEvento: tiposEvento,
                dataEvento: dataEvento,
                descricao: descricao,
                idInstituicao: idInstituicao,
            });

            setNotifyUser({
                titleNote: "Sucesso",
                textNote: "Evento Cadastrado com Sucesso",
                imgIcon: "success",
                imgAlt: "Imagem de ilustração de Aviso. Moça em frente a um ponto de exclamação",
                showMessage: true,
            });

            // Atualização da lista de eventos
            const searchEvents = api.get(eventsResource);
            setNextEvents((await searchEvents).data);
            // Limpeza dos campos do formulário
            setTitulo("");
            setDescricao("");
            setTiposEvento("");
            setInstituicao("");
            setDataEvento("");
        } catch (error) {
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Não foi possível cadastrar o evento!",
                imgIcon: "danger",
                imgAlt: "Ilustração de erro. Moço em frente a um símbolo de erro",
                showMessage: true,
            });
        }
        setShowSpinner(false);
    }

    /**************************************Editar Cadastro****************************************** */

    //mostra o formulário de edição
    async function handleUpdate(e) {
        e.preventDefault(); //para o evento submit
        setShowSpinner(true);

        try {
            //atualizar na api
            const retorno = await api.put(`${eventsResource}/${idEvento}`, {
                nomeEvento: titulo,
                idTipoEvento: tiposEvento,
                dataEvento: dataEvento,
                descricao: descricao,
                idInstituicao: idInstituicao,
            });

            console.log(retorno);

            if (retorno.status === 204) {
                //notificar o usuário
                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: "Evento Atualizado com sucesso",
                    imgIcon: "success",
                    imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão",
                    showMessage: true,
                });
            }
            editActionAbort(true);

            //atualizar os dados na tela
            const searchEvents = await api.get(eventsResource);
            setNextEvents(searchEvents.data); //aqui retorna um array
            
        } catch (error) {
            //notificar o usuário sobre o erro
            setNotifyUser({
                titleNote: "Erro",
                textNote:
                    "Erro ao atualizar o evento. Verifique a conexão com a internet",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de erro. Exemplo: Moça segurando um balão de erro",
                showMessage: true,
            });
        }
        setShowSpinner(false);
    }

    async function showUpdateForm(idElement) {
        setIdEvento(idElement);
        setShowSpinner(true);
        try {
            // Requisição GET para obter os detalhes do evento
            const promise = await api.get(`${eventsResource}/${idElement}`);
            setTitulo(promise.data.nomeEvento);
            setDescricao(promise.data.descricao);
            setTiposEvento(promise.data.idTipoEvento);
            setInstituicao(promise.data.idInstituicao);
            setDataEvento(new Date(promise.data.dataEvento).toLocaleDateString("sv-SE"));
        } catch (error) {
            console.log(error.message);
        }
        setShowSpinner(false);
        setFrmEdit(true);
    }

    // Função para cancelar a edição
    function editActionAbort() {
        setFrmEdit(false);
        // Limpeza dos campos do formulário
        setTitulo("");
        setDescricao("");
        setTiposEvento("");
        setInstituicao("");
        setDataEvento("");
    }

    /*****************************Apagar Dados******************************** */
    //apaga o tipo de evento na api
    async function handleDelete(idElement) {
        if (!window.confirm("Confirma a exclusão?")) {
            return;
        }
            setShowSpinner(true);
            try {
                // Chama a API para deletar o evento com o idElement
                const promise = await api.delete(
                    `${eventsResource}/${idElement}`
                );
                if (promise.status === 204) {
                    setNotifyUser({
                        titleNote: "Sucesso",
                        textNote: "Evento excluido com sucesso",
                        imgIcon: "success",
                        imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão",
                        showMessage: true,
                    });
                }
                // Atualização da lista de eventos
                const searchEvents = await api.get(eventsResource);
                setNextEvents(searchEvents.data);
            } catch (error) {
                alert(`Erro ao deletar evento de id ${idElement}`);
                console.error(error);
            }
            setShowSpinner(false);
        
    }

    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
            {/* spinner feito com position */}
            {showSpinner ? <Spinner /> : null}
            <MainContent>
                <section className="cadastro-evento-section">
                    <Container />
                    <div className="cadastro-evento__box">
                        <Title titleText={"Cadastro de Evento"} />

                        <ImageIllustrator imageRender={EventoImage} />

                        <form
                            className="ftipo-evento"
                            onSubmit={frmEdit ? handleUpdate : handleSubmit}
                        >
                            {!frmEdit ? (
                                // Cadastrar
                                <>
                                    <Input
                                        id="titulo"
                                        placeholder="Título"
                                        name="titulo"
                                        type="text"
                                        required="required"
                                        value={titulo}
                                        manipulationFunction={(e) => {
                                            setTitulo(e.target.value);
                                        }}
                                    />
                                    <Input
                                        id="descricao"
                                        placeholder="Descrição"
                                        name="descricao"
                                        type="text"
                                        required="required"
                                        value={descricao}
                                        manipulationFunction={(e) => {
                                            setDescricao(e.target.value);
                                        }}
                                    />

                                    <Select
                                        id="eventos"
                                        name="Eventos"
                                        required="required"
                                        options={options}
                                        value={tiposEvento}
                                        manipulationFunction={(e) =>
                                            setTiposEvento(e.target.value)
                                        }
                                    />

                                    <Select2
                                        id="instituicao"
                                        name="Instituicao"
                                        required="required"
                                        options={options2}
                                        value={instituicao}
                                        manipulationFunction={(e) =>
                                            setInstituicao(e.target.value)
                                        }
                                    />

                                    <Input
                                        id="dataEvento"
                                        name="dataEvento"
                                        type="date"
                                        placeholder="Data do Evento"
                                        required="required"
                                        value={dataEvento}
                                        manipulationFunction={(e) => {
                                            setDataEvento(e.target.value);
                                        }}
                                    />
                                    <Button
                                        textButton="Cadastrar"
                                        id="cadastrar"
                                        name="cadastrar"
                                        type="submit"
                                        additionalClass="btn-cadastrar"
                                    />
                                </>
                            ) : (
                                // Editar
                                <>
                                    <Input
                                        id="titulo"
                                        placeholder="Título"
                                        name="titulo"
                                        type="text"
                                        required="required"
                                        value={titulo}
                                        manipulationFunction={(e) => {
                                            setTitulo(e.target.value);
                                        }}
                                    />

                                    <Input
                                        id="Descricao"
                                        placeholder="Descrição"
                                        name="descricao"
                                        type="text"
                                        required="required"
                                        value={descricao}
                                        manipulationFunction={(e) =>
                                            setDescricao(e.target.value)
                                        }
                                    />
                                    <Select
                                        name="eventos"
                                        id="eventos"
                                        required="required"
                                        options={options}
                                        value={tiposEvento}
                                        defaultValue={tiposEvento}
                                        manipulationFunction={(e) =>
                                            setTiposEvento(e.target.value)
                                        }
                                    />

                                    <Select2
                                        id="instituicao"
                                        name="Instituicao"
                                        required="required"
                                        options={options2}
                                        value={instituicao}
                                        manipulationFunction={(e) =>
                                            setInstituicao(e.target.value)
                                        }
                                    />

                                    <Input
                                        id="data"
                                        placeholder="Data do Evento"
                                        name="data"
                                        type="date"
                                        required="required"
                                        value={dataEvento}
                                        manipulationFunction={(e) =>
                                            setDataEvento(e.target.value)
                                        }
                                    />

                                    <div className="buttons-editbox">
                                        <Button
                                            textButton="Atualizar"
                                            id="atualizar"
                                            name="atualizar"
                                            type="submit"
                                            additionalClass="btn-cadastrar"
                                        />
                                        <Button
                                            textButton="Cancelar"
                                            id="cancelar"
                                            name="cancelar"
                                            type="button"
                                            additionalClass="btn-cadastrar"
                                            manipulationFunction={(e) => {
                                                editActionAbort();
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                    <Container />
                </section>

                <section className="lista-eventos-section">
                    <Container>
                        <Title titleText={"Lista de Eventos"} color="white" />
                        <TableEv
                            dados={eventos}
                            fnUpdate={showUpdateForm}
                            fnDelete={handleDelete}
                        />
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default EventosPages;
