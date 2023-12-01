import React, { useContext } from "react";
import "./Nav.css";
import logoMobile from "../../assets/images/logo-white.svg";
import logoDesktop from "../../assets/images/logo-pink.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
    const { userData } = useContext(UserContext);

    return (
        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""} `}>
            <span
                onClick={() => {
                    setExibeNavbar(false);
                }}
                className="navbar__close"
            >
                X
            </span>

            <Link to="" className="eventlogo">
                <img
                    className="eventlogo__logo-image"
                    src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
                    alt="Event Plus Logo"
                />
            </Link>

            <div className="navbar__items-box">
                <Link to="/" className="navbar__item">
                    Home
                </Link>

                {userData.nome && userData.role === "administrador" ? (
                    <>
                        <Link to="/tipo-eventos" className="navbar__item">
                            Tipos de Evento
                        </Link>
                        <Link to="/eventos" className="navbar__item">
                            Eventos
                        </Link>
                    </>
                ) : userData.nome && userData.role === "usuario" ? (
                    <Link to="/eventos" className="navbar__item">
                        Eventos Aluno
                    </Link>
                ) : null}

                {/* <Link to="/testes" className="navbar__item">Teste</Link> */}
            </div>
        </nav>
    );
};

export default Nav;
