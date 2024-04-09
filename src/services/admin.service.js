import { API_URL } from "../config";
import giftHistory from "../config/giftHistory.json";
import { validGift } from "../config/gift";
import { axios } from "../utils/custom-axios";

const verifyGame = async (userId, type, isWin) =>
  axios.post(`${API_URL}clubday/private/verify`, { userId, type, isWin });

const getPrizeHistory = async () =>
  axios.get(`${API_URL}clubday/private/received/all`);

const validatePrize = async (itemId) =>
  axios.get(`${API_URL}clubday/private/reward?itemId=${itemId}`);

const confirmPrize = async (itemId) =>
  axios.post(`${API_URL}clubday/private/reward?itemId=${itemId}`, { itemId });

const AdminService = {
  verifyGame,
  getPrizeHistory,
  validatePrize,
  confirmPrize,
};

export default AdminService;
