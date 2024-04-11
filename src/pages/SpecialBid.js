import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import CheckCircle from "../assets/icon/check_circle.svg";
import CheckCircleChecked from "../assets/icon/check_circle_checked.svg";
import CheckIn from "../assets/image/check-in.jpg";
import FastToG from "../assets/image/fasttog.png";
import Quiz from "../assets/image/quiz.png";
import KeyMatching from "../assets/image/logo.png";
import QuizLogo from "../assets/image/quiz_logo.png";
import Podium from "../assets/image/podium.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClubDayServices from "../services/clubday.service";
import UserServices from "../services/user.service";
import { SET_USER_INFO } from "../action-types";
import { useRef } from "react";
import BiddingAnimation from "../assets/animation/auction.json";
import Lottie from "lottie-react";
import Footer from "../components/footer/Footer";
import SpecialBidContent from "../components/specialbids/SpecialBidContent";

const LoginContent = (props) => {
  const lottieRef = useRef();

  const dispatch = useDispatch();

  return (
    <div className="register-area" style={{ marginTop: "20px" }}>
      <div className="container">
        <div className="d-flex flex-column-reverse flex-md-row g-4 g-lg-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6 col-xl-5">
            <div className="register-card">
              <h2>Coming soon: Special BIDDING!</h2>
              <p
                style={{
                  color: "white",
                  whiteSpace: "pre-line",
                  fontSize: "20px",
                }}
              >
                <b>Stay tuned</b> for occasionally held
                <b style={{ color: "yellow" }}> GCoins</b> auctions where
                players will compete for chances to own{" "}
                <b style={{ color: "yellow" }}>limited exclusive Items</b>.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="register-thumbnail mt-5 mt-md-0">
              {/* <img src={LoginImage} alt="Login" /> */}
              <Lottie lottieRef={lottieRef} animationData={BiddingAnimation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecialBid = () => {
  return (
    <>
      <Breadcrumb
        breadcrumbTitle={`Special Bids`}
        breadcrumbNav={[
          {
            navText: "Home",
            path: "/",
          },
        ]}
        adjustPos
      />

      {/* <LoginContent
                title="Welcome to GDSC Game!"
                subTitle="From our dedicated organizers, a community-based web which promote exciting Discord activities, fun-to-play games and built-in prize exchange mechanism"
                button={[
                {
                    text: "",
                    path: "/register",
                },
                ]}
            /> */}

      <SpecialBidContent />

      <Divider />

      <div style={{ marginBottom: "-32px" }} className="footer-login">
        <Footer />
      </div>
    </>
  );
};

export default SpecialBid;
