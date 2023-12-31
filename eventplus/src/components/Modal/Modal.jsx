import React, { useContext, useEffect, useState } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";
import { UserContext } from "../../context/AuthContext";

import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
    modalTitle = "Feedback",
    comentaryText = "",
    showHideModal = false,
    fnGet = null,
    fnPost = null,
    fnDelete = null,
    userId = null,
    idEvento = null,
    idComentario = null,
}) => {
    const { userData } = useContext(UserContext);
    const [comentarioDesc, setComentarioDesc] = useState("");

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        await fnGet(userId, idEvento);
    }

    return (
        <div className="modal">
            <article className="modal__box">
                <h3 className="modal__title">
                    {modalTitle}
                    <span
                        className="modal__close"
                        onClick={() => showHideModal(true)}
                    >
                        x
                    </span>
                </h3>

                <div className="comentary">
                    <h4 className="comentary__title">Comentário</h4>
                    <img
                        src={trashDelete}
                        className="comentary__icon-delete"
                        alt="Ícone de uma lixeira"
                        onClick={async() => {
                           await fnDelete(idComentario);
                           await carregarDados();
                        }}
                    />

                    <p className="comentary__text">{comentaryText}</p>

                    <hr className="comentary__separator" />
                </div>

                <Input
                    placeholder="Escreva seu comentário..."
                    className="comentary__entry"
                    value={comentarioDesc}
                    manipulationFunction={(e) => {
                        setComentarioDesc(e.target.value);
                    }}
                />

                <Button
                    textButton="Comentar"
                    additionalClass="comentary__button"
                    manipulationFunction={async () => {
                        if (idComentario !== null) {
                            alert(
                                "Já existe um comentário cadastrado para o evento."
                            );
                        } else {
                           await fnPost(
                                comentarioDesc.trim(),
                                userData.userId,
                                userData.idEvento
                            );
                            await carregarDados();
                        }
                        setComentarioDesc("");
                    }}
                />
            </article>
        </div>
    );
};

export default Modal;
