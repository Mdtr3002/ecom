import { API_URL } from "../config";
import { axios } from "../utils/custom-axios";

const getUsers = () => axios.get(`${API_URL}users`);

const getProfile = () => axios.get(`${API_URL}users/me`);

const editProfile = (userInfo) => axios.patch(`${API_URL}users/me`, userInfo);

const getBalance = () => axios.get(`${API_URL}users/balance`);

const getTransaction = () => axios.get(`${API_URL}users/transaction`);

const UserServices = {
  getUsers,
  getProfile,
  getBalance,
  getTransaction,
  editProfile,
};

export default UserServices;
