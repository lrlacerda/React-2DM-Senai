import React, { useEffect, useState } from "react";
import "./TipoEventosPages.css";
import Title from "../../components/Titulo/Title";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import Container from "../../components/Container/Container";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import tipoEventoImage from "../../assets/images/tipo-evento.svg";
import api, { eventsTypeResource } from "../../services/Service";
import TableTp from "./TableTP/TableTp";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

const TipoEventosPages = () => {
    //state
    const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [idEvento, setIdEvento] = useState(null); //para editar, por causa do evento
    const [tipoEventos, setTipoEventos] = useState([]); //array
    const [notifyUser, setNotifyUser] = useState();
    const [showSpinner, setShowSpinner] = useState(false); //spinner loading

    //Chama a Função que após a pagina /DOM estar pronta
    useEffect(() => {
        //define a chamada na api
        async function loadEventsType() {
            setShowSpinner(true);
            try {
                const retorno = await api.get(eventsTypeResource);
                setTipoEventos(retorno.data);
                console.log(retorno.data);
            } catch (error) {
                console.log("Erro na api");
                console.log(error);
            }
            setShowSpinner(false);
        }
        loadEventsType();
    }, []);

    //**********************************Cadastrar************************************ */
    async function handleSubmit(e) {
        e.preventDefault();
        setShowSpinner(true);
        if (titulo.trim().length < 3) {
            setNotifyUser({
                titleNote: "Aviso",
                textNote: "O título deve ter pelo menos 3 caracteres",
                imgIcon: "warning",
                imgAlt: "Imagem de ilustração de Aviso. Moça em frente a um ponto de exclamação",
                showMessage: true,
            });
        }

        try {
            const retorno = await api.post(eventsTypeResource, {
                titulo: titulo,
            });
            setTitulo(""); //limpa o state
            setNotifyUser({
                titleNote: "Sucesso",
                textNote: "Evento Cadastrado com Sucesso",
                imgIcon: "success",
                imgAlt: "Imagem de ilustração de Aviso. Moça em frente a um ponto de exclamação",
                showMessage: true,
            });
            const buscaEventos = await api.get(eventsTypeResource);
            setTipoEventos(buscaEventos.data); //aqui retorna um array
        } catch (error) {
            setNotifyUser({
                titleNote: "Erro",
                textNote:
                    "Erro na Operação. Verifique a conexção com a internet",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão",
                showMessage: true,
            });
        }
        setShowSpinner(false);
    }

    /**************************************Editar Cadastro****************************************** */

    //mostra formulário de edição
    async function showUpdateForm(idElement) {
        setFrmEdit(true);
        setIdEvento(idElement); //preenche o id do evento para poder atualizar
        setShowSpinner(true);
        try {
            const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
            setTitulo(retorno.data.titulo);
        } catch (error) {
            alert(error);
        }
        setShowSpinner(false);
    }

    //cancela a tela / ação de edição (vonta para o form de cadastro)
    function editActionAbort() {
        setFrmEdit(false);
        setTitulo(""); //reseta as variáveis
        setIdEvento(null); //reseta as variáveis
    }

    //mostra o formulário de edição
    async function handleUpdate(e) {
        e.preventDefault(); //para o evento submit
        setShowSpinner(true);

        try {
            //atualizar na api
            const retorno = await api.put(eventsTypeResource + "/" + idEvento, {
                titulo: titulo,
            }); //o id está no state

            console.log(retorno);
            if (retorno.status === 204) {
                setTitulo("");
                setIdEvento(null);

                //notificar o usuário
                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: "Evento Atualizado com sucesso",
                    imgIcon: "success",
                    imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão",
                    showMessage: true,
                });
                //atualizar os dados na tela
                const buscaEventos = await api.get(eventsTypeResource);
                setTipoEventos(buscaEventos.data); //aqui retorna um array
            }
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

    /*****************************Apagar Dados******************************** */
    //apaga o tipo de evento na api
    async function handleDelete(idElement) {
        if (window.confirm("Confirma a exclusão?")) {
            setShowSpinner(true);
            try {
                // Chama a API para deletar o evento com o idElement
                const promise = await api.delete(
                    `${eventsTypeResource}/${idElement}`
                );
                if (promise.status == 204) {
                    setNotifyUser({
                        titleNote: "Sucesso",
                        textNote: "Evento excluido com sucesso",
                        imgIcon: "success",
                        imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão",
                        showMessage: true,
                    });
                    //Desafio: fazer uma função para retirar o registro apagado do array tipoEventos
                    const buscaEventos = await api.get(eventsTypeResource);
                    setTipoEventos(buscaEventos.data); //aqui retorna um array
                }
            } catch (error) {
                alert(`Erro ao deletar evento de id ${idElement}`);
                console.error(error);
            }
            setShowSpinner(false);
        }
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
                        <Title titleText={"Cadastro Tipo de Eventos"} />

                        <ImageIllustrator imageRender={tipoEventoImage} />

                        <form
                            className="ftipo-evento"
                            onSubmit={frmEdit ? handleUpdate : handleSubmit}
                        >
                            {!frmEdit ? (
                                //Cadastrar
                                <>
                                    <Input
                                        id="Titulo"
                                        placeholder="Titulo"
                                        name={"Titulo"}
                                        type={"text"}
                                        required={"required"}
                                        value={titulo}
                                        manipulationFunction={(e) => {
                                            setTitulo(e.target.value);
                                        }}
                                    />

                                    <Button
                                        textButton="Cadastrar"
                                        id="cadastrar"
                                        name="cadastrar"
                                        type="submit"
                                    />
                                </>
                            ) : (
                                //Editar
                                <>
                                    <Input
                                        id="Titulo"
                                        placeholder="Titulo"
                                        name={"Titulo"}
                                        type={"text"}
                                        required={"required"}
                                        value={titulo}
                                        manipulationFunction={(e) => {
                                            setTitulo(e.target.value);
                                        }}
                                    />

                                    <div className="buttons-editbox">
                                        <Button
                                            textButton="Atualizar"
                                            id="atualizar"
                                            name="atualizar"
                                            type="submit"
                                            additionalClass="button-component--middle"
                                        />
                                        <Button
                                            textButton="Cancelar"
                                            id="cancelar"
                                            name="cancelar"
                                            type="button"
                                            additionalClass="button-component--middle"
                                            manipulationFunction={
                                                editActionAbort
                                            }
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
                        <Title
                            titleText={"Lista Tipo de Eventos"}
                            color="white"
                        />
                        <TableTp
                            dados={tipoEventos}
                            fnUpdate={showUpdateForm}
                            fnDelete={handleDelete}
                        />
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default TipoEventosPages;
