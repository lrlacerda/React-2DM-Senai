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

const TipoEventosPages = () => {
    //state
    const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [tipoEventos, setTipoEventos] = useState([]);

    useEffect(() => {
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
    function handleUpdate() {
        alert(`Bora Editar`);
    }

    //cancela a tela / ação de edição (vonta para o form de cadastro)
    function editActionAbort() {
        alert("Cancelar a tela de edição de dados");
    }

    //mostra formulário de edição
    function showUpdateForm() {
        alert(`Vamos mostrar o formulário de edição`);
    }

    //apaga o tipo de evento na api
    function handleDelete(idElement) {
        alert(`Vamos apagar o evento de id ${idElement}`);
    }

    return (
        <>
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
                                <p>Tela de Edição</p>
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
