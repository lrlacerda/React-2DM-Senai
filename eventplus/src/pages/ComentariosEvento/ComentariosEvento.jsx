import React, { useEffect } from "react";
import Container from "../../components/Container/Container";
import MainContent from "../../components/MainContent/MainContent";
import "./ComentariosEvento.css";


const ComentariosEvento = () => {
    useEffect(() => {
        const loadAllCommentary = () => {};
    });
    return (
        <>
            <Container>
                <MainContent>
                    <>
                        <h1>Comentários eventos</h1>
                    </>
                </MainContent>
            </Container>
        </>
    );
};

export default ComentariosEvento;
