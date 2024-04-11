import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

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
import DemoHero from "../components/hero/DemoHero";
import ScrollAnimation from "react-animate-on-scroll";
import Lottie from "lottie-react";

import LoginJSON from "../assets/animation/auction.json";
import leaderboardAnimation from "../assets/animation/leaderboard.json";
import fastToGAnimation from "../assets/animation/homepage-loading.json";
import BiddingIntroBox from "../components/dashboard/biddingIntro";

import bidDemo1 from "../assets/gif/bidDemo1.gif";
import bidDemo2 from "../assets/image/bidDemo2.png";
import bidDemo3 from "../assets/gif/bidDemo3.gif";
import bidDemo4 from "../assets/gif/bidDemo4.gif";
import bidDemo5 from "../assets/gif/bidDemo5.gif";
import Footer from "../components/footer/Footer";

const BidTutorial = () => {
  return (
    <>
      <div className="create-new-button">
        <button
          className="shadow-lg btn btn-warning"
          onClick={() => {
            let scrollDistance = document.documentElement.clientHeight;
            window.scrollBy(0, (scrollDistance * 3) / 4);
          }}
        >
          <i className="fz-20 bi bi-arrow-down" />
        </button>
      </div>
      <div className="activity-wrapper">
        <div className="welcome-area" id="tutorial-0">
          <div className="container bid-tutorial-intro">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-xl-8">
                <div className="welcome-content text-center">
                  <h2>Bid It To Win It.</h2>
                  <Lottie
                    style={{ width: "36vw", margin: "auto" }}
                    animationData={LoginJSON}
                  />
                  <p>How to partake in our bidding activity?</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="welcome-area pt-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-6 bid-mb-24">
                <div className="welcome-content">
                  <h2 id="tutorial-1">1. Pick An Item</h2>
                  <h5 style={{ fontSize: "24px" }}>
                    To view the list of currently live bidding Items:
                  </h5>
                  <p style={{ fontSize: "20px" }}>
                    ● Visit the{" "}
                    <Link to="/collection" className="white-hover">
                      <u>Collection</u>
                    </Link>{" "}
                    page and choose a type of item
                  </p>
                  <p style={{ fontSize: "20px" }}>
                    ● Pick an Item which suit your interest
                  </p>
                  <p></p>
                  <div className="hero-btn-group">
                    <Link
                      to="/collection"
                      className="btn btn-primary rounded-pill clubday"
                    >
                      Collection
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-9 col-sm-8 col-md-6">
                <img
                  src={bidDemo1}
                  alt="quiz logo"
                  style={{ borderRadius: "20px", border: "1px white" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="welcome-area pt-120">
          <div className="container">
            <div className="bid-row-col">
              <div className="col-10 col-sm-8 col-md-6 bid-mr-20">
                <img
                  src={bidDemo2}
                  style={{ borderRadius: "20px" }}
                  alt="Bid Item Detail"
                />
              </div>
              <div className="col-12 col-sm-10 col-md-6">
                <div className="welcome-content">
                  <h2 id="tutorial-2">2. Bid Item Info</h2>
                  <p
                    className="activity-text"
                    style={{ width: "fit-content", fontSize: "20px" }}
                  >
                    <h5 style={{ fontSize: "24px" }}>
                      Strategize your bidding with the given information:
                    </h5>
                    ● Auction duration
                    <br />
                    ● Starting price, current bid and ceiling price
                    <br />
                    ● Item's bid history
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="process-wrapper">
          <div className="container">
            <h2>Bidding Rules</h2>
            <div className="row g-4 g-xxl-5 align-items-center justify-content-center">
              <div className="col-12 col-sm-6 col-xl-4">
                <div className="single-process-card card bg-gray border-0">
                  <div className="card-body p-4 text-center">
                    <img
                      className="mb-3 mx-auto"
                      src={`${process.env.PUBLIC_URL}/img/illustrator/5.png`}
                      alt={1}
                    />
                    <h5 className="mb-3">Bidding Price</h5>
                    <p className="mb-0">1. 10% higher than the current price</p>
                    <p className="mb-0">
                      2. Lower or equal to the highest price
                    </p>
                    <p className="mb-0">
                      3. Affordable with your current balance
                    </p>
                  </div>
                  <div className="step-number">{1}</div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-4">
                <div className="single-process-card card bg-gray border-0">
                  <div className="card-body p-4 text-center">
                    <img
                      className="mb-3 mx-auto"
                      src={`${process.env.PUBLIC_URL}/img/illustrator/2.png`}
                      alt={2}
                    />
                    <h5 className="mb-3">Winning conditions</h5>
                    <p className="mb-0">
                      Become the first player to bid the highest price. If not,
                      the highest bidder when the auction period ends
                    </p>
                  </div>
                  <div className="step-number">{2}</div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-4">
                <div className="single-process-card card bg-gray border-0">
                  <div className="card-body p-4 text-center">
                    <img
                      className="mb-3 mx-auto"
                      src={`${process.env.PUBLIC_URL}/img/illustrator/1.png`}
                      alt={3}
                    />
                    <h5 className="mb-3">Aftermath</h5>
                    <p className="mb-0">● If won, you can claim the item</p>
                    <p className="mb-0">
                      ● If lost, your money will be refunded
                    </p>
                  </div>
                  <div className="step-number">3</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ justifyContent: "center" }}
          className="welcome-area container row-col"
        >
          <div
            className="col-12 col-md-6 col-xl-4 first-item"
            style={{ marginRight: "40px" }}
          >
            <div className="card border-0 shadow-sm dashboard-responsive">
              <div
                className="card-body p-4"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h2 id="tutorial-4">3. Place your Bid</h2>
                </div>
                <p>
                  Remember to bid your
                  <b style={{ color: "#fbbc04" }}> money</b> in accordance with
                  our bidding rules
                </p>
                <img
                  src={bidDemo3}
                  alt="Place Bid demo"
                  style={{ borderRadius: "20px" }}
                />
              </div>
            </div>
          </div>

          <div
            className="col-12 col-md-6 col-xl-4"
            style={{ marginRight: "20px" }}
          >
            <div className="card border-0 shadow-sm dashboard-responsive">
              <div
                className="card-body p-4"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h2>4. Keeping track</h2>
                </div>
                <p>
                  Remember to keep track with your auction item in the{" "}
                  <Link to="/my-bids">
                    <u style={{ color: "#fbbc04" }}> My Bids</u>
                  </Link>{" "}
                  page
                </p>
                <img
                  src={bidDemo4}
                  alt="Place Bid demo"
                  style={{ borderRadius: "20px" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="welcome-area pt-120">
          <div className="container">
            <div className="bid-row-col">
              <div className="col-10 col-sm-8 col-md-6 bid-mr-20">
                <img
                  src={bidDemo5}
                  style={{ borderRadius: "20px" }}
                  alt="Bid Item Detail"
                />
              </div>
              <div className="col-12 col-sm-10 col-md-6">
                <div className="welcome-content">
                  <h2 id="tutorial-5">5. Claim your Item</h2>
                  <p
                    className="activity-text"
                    style={{ width: "fit-content", fontSize: "20px" }}
                  >
                    <h5 style={{ fontSize: "24px" }}>
                      When you are the winner of the auction
                    </h5>
                    1. Go to the 'Item Detail' page
                    <br />
                    2. Click on the 'Claim' button
                    <br />
                    3. Choose confirm and the item is officially yours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />
      </div>

      <Footer />
    </>
  );
};

export default BidTutorial;
