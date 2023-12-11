import axios from "axios";

export const eventsResource = "/Evento";
export const nextEventResource = "/Evento/ListarProximos";
export const eventsTypeResource = "/TiposEvento";
export const instituicaoResource = "/Instituicao";
export const myEventsResource = "/PresencaEvento/ListarMinhas";
export const presencesEventResource = "/PresencaEvento";
export const loginResource = "/Login";
export const commentaryEventResource = "/ComentariosEvento";



// const apiPort = "7118";
// const localApiUrl = `https://localhost:${apiPort}/api`;
const externalApiUri = `https://eventwebapi-lucas.azurewebsites.net/`;
// const externalApiUrl = null;

const api = axios.create({
    baseURL: externalApiUri,
});

export default api;
