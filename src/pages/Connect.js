import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import Divider from "../components/divider/Divider";
import discordLogo from "../assets/image/discordLogo.png";
import connectIcon from "../assets/image/connect.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthService from "../services/auth.service";
import HeroCard from "../components/dashboard/hero/HeroCard";
import ScrollAnimation from "react-animate-on-scroll";

import DiscordLogo from "../assets/images/discord.png";
import Footer from "../components/footer/Footer";

const UNCONNECTED_MSG =
  "Verify code not existed, please type /connect on discord";

const LINKED_MSG = "Email already linked to GDSC Game";

const STATE = {
  UNCONNECTED: "UNCONNECTED",
  CONNECTED: "CODE RECEIVED",
  LINKED: "LINKED",
  ERROR: "ERROR",
};

const Connect = () => {
  const [connectState, setconnectState] = useState(STATE.UNCONNECTED);
  const [code, setCode] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // console.log("Fetched");
        const { data } = await AuthService.getCode();
        const { verifyCode } = data.payload;
        setconnectState(STATE.CONNECTED);
        setCode(verifyCode);
      } catch (err) {
        if (err?.response?.data?.message === UNCONNECTED_MSG) {
          setconnectState(STATE.UNCONNECTED);
        } else if (err?.response?.data?.message === LINKED_MSG) {
          setconnectState(STATE.LINKED);
        } else {
          setconnectState(STATE.ERROR);
        }
      }
      localStorage.setItem("connectRequired", false);
    })();
  }, []);

  return (
    <>
      <div className="activity-wrapper">
        <div
          style={{
            marginTop: "20px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
            <div
              className="card discord-hero-card p-2 border-0 bg-img shadow-sm"
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg-img/network.jpg)`,
              }}
            >
              <div className="card-body p-4 pb-0">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h2 className="cd-title">GDSC HCMUT's Discord</h2>
                </div>
                <h5>Join our community!</h5>
                <p style={{ color: "white" }}>
                  ● Interaction and knowledge sharing with students who are
                  interested in technology topics.
                  <br />
                  ● Provide support in solving students' questions relating to
                  study and activities.
                  <br />● A place where activities hosted by GDSC HCMUT are
                  held.
                </p>
              </div>
            </div>
        </div>

        <div className="pt-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-9 col-sm-8 col-md-4">
                <div className="welcome-content">
                    <h3>STATUS: {connectState}</h3>
                    {(connectState === STATE.UNCONNECTED ||
                      connectState === STATE.ERROR) && (
                      <span
                        className="activity-text"
                        style={{ width: "fit-content" }}
                      >
                        ● Save your acquired GCoin through Discord activities
                        <br />● Amazing prizes are waiting to be exchanged
                        <br />● User the command <code>/connect</code> on GDSC Discord Server to start the connection
                      </span>
                    )}
                    {connectState === STATE.CONNECTED && (
                      <span
                        className="activity-text"
                        style={{ width: "fit-content" }}
                      >
                        <p>
                          Use the command <code>/verify</code> on GDSC
                          Discord Server and input the verify code: <code>{code}</code>.{" "}
                          <span style={{ color: "red" }}>
                            Please don't give this code to anyone.
                          </span>
                        </p>
                      </span>
                    )}
                    {connectState === STATE.LINKED && (
                      <span
                        className="activity-text"
                        style={{ width: "fit-content" }}
                      >
                        <h5>Amazing features unlock:</h5>
                        ● Save your acquired GCoin through Discord activities
                        <br />● Amazing prizes are waiting to be exchanged
                      </span>
                    )}
                  <br />
                  <br />
                    <div className="activity-text">
                      <a
                        href="https://link.gdsc.app/discord"
                        className="btn btn-primary rounded-pill clubday"
                        style={{ backgroundColor: "#5865f2" }}
                      >
                        {connectState === STATE.CONNECTED ||
                        connectState === STATE.LINKED
                          ? "To Discord"
                          : "Connect"}
                      </a>
                    </div>
                </div>
              </div>
              <div className="col-9 col-sm-8 col-md-4 d-flex justify-content-end">
                  <img style={{objectFit: 'contain'}} src={DiscordLogo} alt="quiz logo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <Footer />
    </>
  );
};

export default Connect;
