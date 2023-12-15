import React from "react";
import "./NextEvent.css";
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import { Tooltip } from "react-tooltip";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";

const NextEvent = ({ title, description, eventDate, idEvent }) => {
    const { userData } = useContext(UserContext);

    function conectar(idEvent) {
        alert(`Chamar o recurso para conectar: ${idEvent}`);
    }
    return (
        <article className="event-card">
            <h2 className="event-card__title">{title}</h2>
            <p
                className="event-card__description"
                data-tooltip-id={idEvent}
                data-tooltip-content={description}
                data-tooltip-place="top"
            >
                <Tooltip id={idEvent} className="tooltip" />
                {description.substr(0, 15)}...
            </p>
            <p className="event-card__description">
                {dateFormatDbToView(eventDate)}
            </p>

            {userData.nome && userData.role === "administrador" ? (
                <Link
                    to={"/comentarios-evento-all"}
                    onClick={() => {
                        conectar(idEvent);
                    }}
                    className="event-card__connect-link"
                >
                    Detalhes
                </Link>
            ) : userData.nome && userData.role === "usuario" ? (
                <Link
                    to={"/comentarios-evento-only"}
                    onClick={() => {
                        conectar(idEvent);
                    }}
                    className="event-card__connect-link"
                >
                    Conectar
                </Link>
            ) : null}

        </article>
    );
};

export default NextEvent;

// substr limita o número de caracteres
