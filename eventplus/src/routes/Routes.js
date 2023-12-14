import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import EventosPages from "../pages/EventosPage/EventosPages";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import TestePage from "../pages/TestePage/TestePage";
import TipoEventosPages from "../pages/TipoEventosPage/TipoEventosPages";
import Footer from "../components/Footer/Footer";
import { PrivateRoute } from "./PrivateRoute";
import EventosAlunoPage from "../pages/EventosAlunoPage/EventosAlunoPage";
import Comentario from "../pages/ComentariosEvento/ComentariosEvento";
import DetalhesEvento from "../pages/DetalhesEvento/DetalhesEvento";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<HomePage />} path={"/"} exact />

                <Route element={<DetalhesEvento />} path={"/detalhesEvento"} />

                <Route
                    path={"/tipo-eventos"}
                    element={
                        <PrivateRoute redirectTo="/">
                            <TipoEventosPages />
                        </PrivateRoute>
                    }
                />

                <Route
                    path={"/eventos"}
                    element={
                        <PrivateRoute redirectTo="/">
                            <EventosPages />
                        </PrivateRoute>
                    }
                />

                <Route
                    path={"/eventos-aluno"}
                    element={
                        <PrivateRoute redirectTo="/">
                            <EventosAlunoPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/comentarios-evento-all"
                    element={
                        <PrivateRoute redirectTo="/">
                            <Comentario />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comentarios-evento-only"
                    element={
                        <PrivateRoute redirectTo="/">
                            <Comentario />
                        </PrivateRoute>
                    }
                />

                <Route element={<LoginPage />} path={"/login"} />
                <Route element={<TestePage />} path={"/teste/:idEvento"} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Rotas;
