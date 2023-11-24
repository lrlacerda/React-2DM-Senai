import React from "react";
import Titulo from "../../components/Titulo/Title";
import Logo from "../../assets/images/logo-pink.svg";
import Container from "../../components/Container/Container";
import "./LoginPage.css";

const LoginPage = () => {
    return (
        <>
            <section className="login">
                <Container>
                    <form action="">
                        <img src={Logo} alt="" />
                    </form>
                </Container>
            </section>
        </>
    );
};

export default LoginPage;
