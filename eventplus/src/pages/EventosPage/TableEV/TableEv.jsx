import React from "react";
import "./TableEv.css";

import edtiPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";
import { dateFormatDbToView } from "../../../Utils/stringFunctions";
import { Tooltip } from "react-tooltip";

const TableEv = ({ dados, fnDelete = null, fnUpdate = null }) => {
    return (
        <table className="table-data">
            {/*cabeçalho*/}
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">
                        Evento
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Descrição
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Tipo Evento
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Instituição
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Data do Evento
                    </th>
                    <th className="table-data__head-title table-data__head-title--little">
                        Editar
                    </th>
                    <th className="table-data__head-title table-data__head-title--little">
                        Deletar
                    </th>
                </tr>
            </thead>
            {/*corpo*/}
            <tbody>
                {dados.map((tp) => {
                    return (
                        <tr className="table-data__head-row" key={tp.idEvento}>
                            <td className="table-data__data table-data__data--big">
                                {tp.nomeEvento}
                            </td>
                            <td
                                className="table-data__data table-data__data--big"
                                data-tooltip-id={tp.idEvento}
                                data-tooltip-content={tp.descricao}
                                data-tooltip-place="top"
                            >
                                <Tooltip id={tp.idEvento} className="tooltip" />
                                {tp.descricao.substr(0, 15)}...
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {tp.tiposEvento.titulo}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {tp.instituicao.nomeFantasia}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {dateFormatDbToView(tp.dataEvento)}
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img
                                    className="table-data__icon"
                                    src={edtiPen}
                                    alt=""
                                    onClick={() => {
                                        fnUpdate(tp.idEvento);
                                    }}
                                />
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img
                                    idevento={tp.idEvento}
                                    className="table-data__icon"
                                    src={trashDelete}
                                    alt=""
                                    onClick={(e) => {
                                        fnDelete(
                                            e.target.getAttribute("idEvento")
                                        );
                                    }}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            <tbody>
                <tr className=""></tr>
            </tbody>
        </table>
    );
};

export default TableEv;
