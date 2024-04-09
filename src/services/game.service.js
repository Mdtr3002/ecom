import { API_URL } from "../config";
import { axios } from "../utils/custom-axios";

const getUserSession = async () => await axios.get(`${API_URL}game/private/session`);

const startSessionPrivate = async (userId) => await axios.post(`${API_URL}game/private/session`, { userId });

const nextLevelPrivate = async (userId) => await axios.post(`${API_URL}private/session/${userId}/next`);

const finishSessionPrivate = async (userId) => await axios.post(`${API_URL}game/private/gift`, { userId });

const GameService = {
    getUserSession,
    startSessionPrivate,
    nextLevelPrivate,
    finishSessionPrivate
};

export default GameService;
