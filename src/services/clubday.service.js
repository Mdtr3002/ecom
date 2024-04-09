import { API_URL } from "../config";
import { axios } from "../utils/custom-axios";

const getClubDayInfo = async () => await axios.get(`${API_URL}clubday/private`);

const createClubDayInfo = async (name, studentId) => await axios.post(`${API_URL}clubday/private`, { name, studentId });

const updateClubDayInfo = async (name, studentId) => await axios.patch(`${API_URL}clubday/private`, { name, studentId });

const ClubDayServices = {
  getClubDayInfo,
  createClubDayInfo,
  updateClubDayInfo,
};

export default ClubDayServices;
