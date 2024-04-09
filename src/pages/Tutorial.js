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

import LoginJSON from "../assets/animation/login.json";
import leaderboardAnimation from "../assets/animation/leaderboard.json";
import fastToGAnimation from "../assets/animation/homepage-loading.json";

import quizIcon from "../assets/image/quiz.png";
import Footer from "../components/footer/Footer";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Tutorial = () => {
  return (
    <>
      <div className="create-new-button">
        <button
          className="shadow-lg btn btn-warning"
          onClick={() => {
            let scrollDistance = document.documentElement.clientHeight;
            window.scrollBy(0, scrollDistance * 3 / 4);
          }}
        >
          <i className="fz-20 bi bi-arrow-down" />
        </button>
      </div>
      <div className="activity-wrapper">
        <div className="welcome-area">
          <div className="container" style={{ height: "75vh" }}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-xl-8">
                <div className="welcome-content text-center">
                    <h2>One-of-a-kind. Amazing Prizes.</h2>
                    <Lottie animationData={LoginJSON} />
                    <p>
                      Desgined by our dedicated organizers, exciting activities
                      and valuable prizes await.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div className="welcome-area pt-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-6">
                <div className="welcome-content">
                    <h2>GDSC QUIZ</h2>
                    <p>
                      Ready to put your problem-solving skills to the test?
                      Sharpen your mental math and race against the clock!
                    </p>
                    <div className="hero-btn-group">
                      <Link
                        to="/math-quiz"
                        className="btn btn-primary rounded-pill clubday"
                      >
                        Play
                      </Link>
                    </div>
                </div>
              </div>
              <div className="col-9 col-sm-8 col-md-4">
                  <img src={quizIcon} alt="quiz logo" />
              </div>
            </div>
          </div>
        </div>

        <Divider />

          <div className="process-wrapper">
            <div className="container">
              <div className="row g-4 g-xxl-5 align-items-center justify-content-center">
                <div className="col-12 col-sm-6 col-xl-3">
                    <div className="single-process-card card bg-gray border-0">
                      <div className="card-body p-4 text-center">
                        <img
                          className="mb-3 mx-auto"
                          src={`${process.env.PUBLIC_URL}/img/illustrator/1.svg`}
                          alt={1}
                        />
                        <h5 className="mb-3">Intelligent</h5>
                        <p className="mb-0">
                          Player will be given a random math equation
                        </p>
                      </div>
                      <div className="step-number">{1}</div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <div className="single-process-card card bg-gray border-0">
                      <div className="card-body p-4 text-center">
                        <img
                          className="mb-3 mx-auto"
                          src={`${process.env.PUBLIC_URL}/img/illustrator/2.svg`}
                          alt={2}
                        />
                        <h5 className="mb-3">Accurate</h5>
                        <p className="mb-0">
                          Determine whether the equation is accurate or not
                        </p>
                      </div>
                      <div className="step-number">{2}</div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <div className="single-process-card card bg-gray border-0">
                      <div className="card-body p-4 text-center">
                        <img
                          className="mb-3 mx-auto"
                          src={`${process.env.PUBLIC_URL}/img/illustrator/3.svg`}
                          alt={3}
                        />
                        <h5 className="mb-3">Proceed</h5>
                        <p className="mb-0">
                          If choose correctly, proceed to the next level. If
                          wrong, you will have to restart
                        </p>
                      </div>
                      <div className="step-number">3</div>
                    </div>
                </div>
              </div>
            </div>
          </div>

        <div className="welcome-area pt-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-10 col-sm-8 col-md-4">
                  <Lottie animationData={leaderboardAnimation} />
              </div>
              <div className="col-12 col-sm-10 col-md-6">
                <div className="welcome-content">
                    <h2>Leaderboard</h2>
                    <p
                      className="activity-text"
                      style={{ width: "fit-content" }}
                    >
                      <h5>
                        Bonus points for players with high daily score in GDSC
                        Quiz:
                      </h5>
                      ● 1st place: +700 GCoins
                      <br />
                      ● 2nd place: +500 GCoins
                      <br />
                      ● 3rd place: +300 GCoins
                      <br />● 4th - 10th place: +200 GCoins
                    </p>
                    <div className="hero-btn-group">
                      <Link
                        to="/leaderboard"
                        className="btn btn-warning rounded-pill clubday"
                      >
                        To Leaderboard
                      </Link>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div className="live-bidding-wrapper bg-gray pt-120 pb-120">
          <div className="container" style={{ height: "75vh" }}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-xl-8">
                <div className="welcome-content text-center">
                    <h1>FAST TO G</h1>
                    <p>
                      Crafted with the latest trend of design & coded with all
                      modern approaches.
                    </p>
                    <p className="text-warning">In development</p>
                    <Lottie animationData={fastToGAnimation} />
                    <Link
                      to="/fast-to-g"
                      className="play-btn btn btn-primary rounded-pill clubday"
                    >
                      Try
                    </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <ScrollAnimation
            animateIn="fadeInUp"
            delay={800}
            animateOnce={true}
          > */}
          {/* <div className="about-area">
            <div className="container">
              <div className="row g-4">
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card about-card shadow-sm">
                    <div className="card-body py-4">
                      <div className={`icon bg-warning`}>
                        <i className={`bi bi-hourglass-bottom`} />
                      </div>
                      <h1 className="mb-3">1</h1>
                      <p>
                        Within the first 0.5s to 1s, some squares within the
                        grid will be highlighted
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card about-card shadow-sm">
                    <div className="card-body py-4">
                      <div className={`icon bi-grid-3x3-gap-fill`}>
                        <i className={`bi bi-grid-3x3`} />
                      </div>
                      <h1 className="mb-3">2</h1>
                      <p>
                        Player needs to memorize the number and the position of
                        these squares.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card about-card shadow-sm">
                    <div className="card-body py-4">
                      <div className={`icon bg-danger`}>
                        <i className={`bi bi-grid-3x3`} />
                      </div>
                      <h1 className="mb-3">3</h1>
                      <p>The highlighting effect disappears</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card about-card shadow-sm">
                    <div className="card-body py-4">
                      <div className={`icon bg-info`}>
                        <i className={`bi bi-ui-checks-grid`} />
                      </div>
                      <h1 className="mb-3">4</h1>
                      <p>
                        The player's task is to select all the previously
                        highlighted squares
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card about-card shadow-sm">
                    <div className="card-body py-4">
                      <div className={`icon bg-secondary`}>
                        <i className={`bi bi-check-circle-fill`} />
                      </div>
                      <h1 className="mb-3">5</h1>
                      <p>
                        If you correctly select all the marked squares, you will
                        complete a level. If you choose a wrong cell, you have
                        to play again from the first level
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Tutorial;
