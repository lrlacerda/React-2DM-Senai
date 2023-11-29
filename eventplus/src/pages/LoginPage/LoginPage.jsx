import React, { useContext, useState } from "react";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import loginImage from "../../assets/images/login.svg";
import api, { loginResource } from "../../services/Service";
import "./LoginPage.css";
import { UserContext, userDecodeToken } from "../../context/AuthContext";

import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

const LoginPage = () => {
    const [user, setUser] = useState({ email: "lucas@email.com", senha: "" });
    const { userData, setUserData } = useContext(UserContext); //importa os dados locais do usuário

    const isValidEmail = validateEmail(user.email);
    const isValidPassword = validatePassword(user.senha);

    const [notifyUser, setNotifyUser] = useState();

    async function handleSubmit(e) {
        e.preventDefault();
        //validar usuário e senha
        //tamnho minimo de caracteres : 3
        if (!isValidEmail || !isValidPassword) {
            setNotifyUser({
                titleNote: "Aviso",
                textNote: "Preencha os dados corretamente",
                imgIcon: "warning",
                imgAlt: "Imagem de ilustração de Aviso. Moça em frente a um ponto de exclamação",
                showMessage: true,
            });
            return;
        }

        try {
            const promise = await api.post(loginResource, {
                email: user.email,
                senha: user.senha,
            });

            setNotifyUser({
                titleNote: "Sucesso",
                textNote: "Login efetuado com sucesso!",
                imgIcon: "success",
                imgAlt: "Imagem de ilustração de Aviso. Moça em frente a um ponto de exclamação",
                showMessage: true,
            });

            const userFullToken = userDecodeToken(promise.data.token);
            setUserData(userFullToken); //guarda o token globalmente
            localStorage.setItem("token", JSON.stringify(userFullToken));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setNotifyUser({
                    titleNote: "Erro",
                    textNote:
                        "Credenciais inválidas. Verifique seu e-mail e senha.",
                    imgIcon: "danger",
                    imgAlt: "Ilustração de erro. Moço em frente a um símbolo de erro",
                    showMessage: true,
                });
            } else {
                alert(
                    "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde."
                );
                console.error(error);
            }
        }
    }

    function validateEmail(email) {
        // Expressão regular para validar o formato do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        // Validação do comprimento mínimo da senha
        return password.length >= 3;
    }

    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

            <div className="layout-grid-login">
                <div className="login">
                    <div className="login__illustration">
                        <div className="login__illustration-rotate"></div>
                        <ImageIllustrator
                            imageRender={loginImage}
                            altText="Imagem de um homem em frente de uma porta de entrada"
                            additionalClass="login-illustrator "
                        />
                    </div>

                    <div className="frm-login">
                        <img src={logo} className="frm-login__logo" alt="" />

                        <form
                            className="frm-login__formbox"
                            onSubmit={handleSubmit}
                        >
                            <Input
                                additionalClass="frm-login__entry"
                                type="email"
                                id="login"
                                name="login"
                                required={true}
                                value={user.email}
                                manipulationFunction={(e) => {
                                    setUser({
                                        ...user,
                                        email: e.target.value.trim(),
                                    });
                                }}
                                placeholder="Username"
                            />
                            <Input
                                additionalClass="frm-login__entry"
                                type="password"
                                id="senha"
                                name="senha"
                                required={true}
                                value={user.senha}
                                manipulationFunction={(e) => {
                                    setUser({
                                        ...user,
                                        senha: e.target.value.trim(),
                                    });
                                }}
                                placeholder="****"
                            />

                            <a href="" className="frm-login__link">
                                Esqueceu a senha?
                            </a>

                            <Button
                                textButton="Login"
                                id="btn-login"
                                name="btn-login"
                                type="submit"
                                additionalClass="frm-login__button"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
