import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import LoginContent from "../components/authentification/Login";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import useQuery from "../custom-hook/useQuery";
import { useEffect } from "react";
import { useStorageState } from "../custom-hook/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../action-types";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Login() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname == "/connect") {
      localStorage.setItem("connectRequired", "true");
    }
  }, []);
  const query = useQuery();
  const [_token, setToken] = useStorageState("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.get("token")) {
      setToken(query.get("token"));
      dispatch({
        type: LOGIN,
      });
      const connectRequired = localStorage.getItem("connectRequired");
      console.log("connectRequired");
      if (connectRequired == "true") {
        localStorage.setItem("connectRequired", "false");
        navigate("/connect");
      } else navigate("/");

      setTimeout(() => window.location.reload(), 300);
    }
  });

  return (
    <>
      {/* <Header /> */}
      <Divider />

      <LoginContent
        title="Welcome to NCWin!"
        subTitle="From our dedicated organizers, a community-based web which promote exciting Discord activities, fun-to-play games and built-in prize exchange mechanism"
        button={[
          {
            text: "",
            path: "/register",
          },
        ]}
      />

      <Divider />
      <Divider />
      <Divider />

      <div style={{ marginBottom: "-32px" }} className="footer-login">
        <Footer />
      </div>
    </>
  );
}
