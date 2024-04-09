import { GoogleLogin } from "@react-oauth/google";
import { API_URL } from "../../../../config";
import { axios } from "../../../../utils/custom-axios";
import { LOGIN, LOGIN_FAIL, SET_USER_INFO } from "../../../../action-types";
import { useDispatch } from "react-redux";
import { useStorageState } from "../../../../custom-hook/useLocalStorage";
import ClubDayServices from "../../../../services/clubday.service";
import UserServices from "../../../../services/user.service";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const [token, setToken] = useStorageState("token");
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const response = await axios.post(
          `${API_URL}auth/mobile/google/login`,
          {
            idToken: credentialResponse.credential,
          }
        );
        setToken(response.data.payload.token);
        window.location.reload();
      }}
      onError={(err) => {
        console.log("google login error", err);
        dispatch({
          type: LOGIN_FAIL,
        });
      }}
      useOneTap
    />
  );
};

export default LoginButton;
