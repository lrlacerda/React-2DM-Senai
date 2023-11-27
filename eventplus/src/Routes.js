import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import EventosPages from "./pages/EventosPage/EventosPages";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TestePage from "./pages/TestePage/TestePage";
import TipoEventosPages from "./pages/TipoEventosPage/TipoEventosPages";
import Footer from "./components/Footer/Footer";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<HomePage />} path={"/"} exact />
                <Route element={<TipoEventosPages />} path={"/tipo-eventos"} />
                <Route element={<EventosPages />} path={"/eventos"} />
                <Route element={<LoginPage />} path={"/login"} />
                <Route element={<TestePage />} path={"/testes"} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Rotas;
