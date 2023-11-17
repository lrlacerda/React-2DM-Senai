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

const TipoEventosPages = () => {
    //state
    const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [tipoEventos, setTipoEventos] = useState([]); //array
    const [notifyUser, setNotifyUser] = useState();

    //Chama a Função que após a pagina /DOM estar pronta
    useEffect(() => {
        //define a chamada na api
        async function loadEventsType() {
            try {
                const retorno = await api.get(eventsTypeResource);
                setTipoEventos(retorno.data);
                console.log(retorno.data);
            } catch (error) {
                console.log("Erro na api");
                console.log(error);
            }
        }
        loadEventsType();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (titulo.trim().length < 3) {
            alert("O título deve ter pelo menos 3 caracteres");
        }

        try {
            const retorno = await api.post(eventsTypeResource, {
                titulo: titulo,
            });
            setTitulo("");
            alert("Cadastrado com Sucesso");
        } catch (error) {
            alert("Deu rum no submit");
        }
    }

    /**************************************Editar Cadastro****************************************** */

    //mostra formulário de edição
    async function showUpdateForm(idElement) {
        setFrmEdit(true);
        try {
            const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
            setTitulo(retorno.data.titulo);
        } catch (error) {}
    }

    //cancela a tela / ação de edição (vonta para o form de cadastro)
    function editActionAbort() {
        setFrmEdit(false);
        setTitulo("");
    }

    //mostra o formulário de edição
    async function handleUpdate(e) {
        e.preventDefault();
    }

    /*****************************Apagar Dados******************************** */
    //apaga o tipo de evento na api
    async function handleDelete(idElement) {
        if (window.confirm("Confirma a exclusão?")) {
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
        }
    }

    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
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
