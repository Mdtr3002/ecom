import { API_URL, ENVIRONMENT } from "../config";
import { axios } from "../utils/custom-axios";

const login = () => {
  window.open(`${API_URL}auth/google/?domain=${ENVIRONMENT==='production' ? 'game' : 'fessior_dev'}`, "_self");
};

const getCode = async () => axios.post(`${API_URL}auth/code`);

const AuthService = {
  login,
  getCode,
};

export default AuthService;
