import React, { useState } from "react";
import "./TipoEventosPages.css";
import Title from "../../components/Titulo/Title";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import Container from "../../components/Container/Container";

import tipoEventoImage from "../../assets/images/tipo-evento.svg";

const TipoEventosPages = () => {
    const [frmEdit, setFrmEdit] = useState(false);

    function handleSubmit() {
        alert("Bora Cadastrar");
    }

    function handleUpdate() {
        alert(`Bora Editar`);
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
                                <p>Tela de Cadastro</p>
                            ) : (
                                <p>Tela de Edição</p>
                            )}
                        </form>
                    </div>
                    <Container />
                </section>
            </MainContent>
        </>
    );
};

export default TipoEventosPages;
