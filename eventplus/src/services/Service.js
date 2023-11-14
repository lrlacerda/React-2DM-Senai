import axios from "axios";

export const eventsResource = '/Evento'
export const nextEventResource = '/Evento/ListarProximos'
export const eventsTypeResource = '/TiposEvento'

const apiPort = "7118";
const localApiUrl = `https://localhost:${apiPort}/api`;
const externalApiUrl = null;

const api = axios.create({
    baseURL: localApiUrl,
});

export default api;
