import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import useStickyHeader from "./StickyHeader";
import { logout } from "../../actions/auth";
import { useStorageState } from "../../custom-hook/useLocalStorage";
import UserService from "../../services/user.service";
import { SET_USER_INFO } from "../../action-types";
import Divider from "../divider/Divider";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "../../components/provider/AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";
import { useSwipe } from "../../custom-hook/useSwipe";
import _ from "lodash";
import {
  STAFF_CLUBDAY_GIFT,
  STAFF_CLUBDAY_VERIFY,
  SUPER_ADMIN,
} from "../../config/roles";

export default function Header() {
  const state = useLocation();
  const arrowUp = "img/icons/arrowup.svg";
  const brandLogo = "img/core-img/logo.png";
  const darkLogo = "img/core-img/logo-white.png";

  const sideNavRef = useRef(null);

  const [check] = useState(true);
  const [isActive, setActive] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [arrowAppear, setArrowApear] = useState(true);
  const sticky = useStickyHeader(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clubDayStaff, setClubDayStaff] = useState(false);
  const stickyClass = `${sticky && check ? "sticky-on" : ""}`;
  useSwipe({ right: () => setActive(false) });

  const { isAuthenticate, user } = useSelector((state) => state.auth);

  const MAX_GCOIN = 1000;

  const receiving =
    user?.availableReceiving < 0
      ? MAX_GCOIN
      : MAX_GCOIN - user?.availableReceiving;

  const toggleArrow = () => setArrowApear(!arrowAppear);

  const handleToggle = (event) => {
    setActive(!isActive);
  };

  const handleOpen = (e) => {
    setActive(true);
  };

  const handleClickOutside = (event) => {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  const BrandLogo = "img/core-img/logo-white.png";

  useLayoutEffect(() => {
    (async () => {
      const { data } = await UserService.getProfile();
      const { payload } = data;
      dispatch({ type: SET_USER_INFO, payload: payload });
      setClubDayStaff(
        _.includes(payload?.roles, STAFF_CLUBDAY_VERIFY) ||
          _.includes(payload?.roles, STAFF_CLUBDAY_VERIFY)
      );
    })();
  }, [state]);

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const balanceCard = [
    {
      title: "Current balance",
      icon: "img/core-img/logo.png",
      balance: "empty",
      balanceType: "G",
    },
    {
      title: "Current balance",
      icon: "img/core-img/logo.png",
      balance: "empty",
      balanceType: "G",
    },
  ];

  const ClubDaySection = [
    {
      id: 1,
      path: "/oif",
      icon: "bi-journal-code",
      text: "Tutorial",
    },
    {
      id: 2,
      path: "/math-quiz",
      icon: "bi-mortarboard",
      text: "GDSC Quiz",
    },
    {
      id: 3,
      path: "/checkin",
      icon: "bi-qr-code",
      text: "Check-In",
    },
  ];

  const ClubDayAdminSection = [
    {
      id: 4,
      path: "/admin-checkin",
      icon: "bi-qr-code-scan",
      text: "Admin Checkin",
    },
    {
      id: 5,
      path: "/prize-exchange",
      icon: "bi-gift",
      text: "Prize Exchange",
    },
    // {
    //   id: 6,
    //   path: "/prize-history",
    //   icon: "bi-clock-history",
    //   text: "Prize History",
    // },
  ];

  const MainSection = [
    {
      id: 7,
      path: "/",
      icon: "bi-house",
      text: "Dashboard",
    },
    {
      id: 8,
      path: "/privacy",
      icon: "bi-file-earmark-lock",
      text: "Privacy Policy",
    },
  ];

  const ShopSection = [
    {
      id: 9,
      path: "/bid-tutorial",
      icon: "bi-book",
      text: "Tutorial",
    },
    {
      id: 10,
      path: "/special-bids",
      icon: "bi-bag-check",
      text: "Special Bids",
    },
    {
      id: 11,
      path: "/collection",
      icon: "bi-collection",
      text: "Bidding",
    },
    {
      id: 12,
      path: "/inventory",
      icon: "bi-bag-fill",
      text: "Inventory",
    },
    {
      id: 13,
      path: "/my-bids",
      icon: "bi-bookmark-heart-fill",
      text: "My Bids",
    },
  ];

  const GameSection = [
    {
      id: 15,
      path: "/tutorial",
      icon: "bi-flag",
      text: "Tutorial",
    },
    {
      id: 16,
      path: "/leaderboard",
      icon: "bi-trophy",
      text: "Leaderboard",
    },
    {
      id: 17,
      path: "/math-quiz",
      icon: "bi-mortarboard",
      text: "GDSC Quiz",
    },
    {
      id: 18,
      path: "/fast-to-g",
      icon: "bi-boxes",
      text: "Fast to G",
    },
  ];

  const AccountSection = [
    {
      id: 19,
      path: "/my-profile",
      icon: "bi-person-circle",
      text: "My Profile",
    },
    {
      id: 20,
      path: "/transaction",
      icon: "bi-hourglass-split",
      text: "Transaction",
    },
    {
      id: 21,
      path: "/connect",
      icon: "bi-discord",
      text: "Connect",
    },
  ];

  return (
    <>
      <div className="head-divider">
        <Divider />
      </div>
      <div
        onClick={handleClickOutside}
        style={{
          zIndex: 1025,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: isActive ? "block" : "none",
        }}
      />
      <header
        className={`header-area ${stickyClass} dashboard-header px-0 px-sm-0`}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              {/* Brand Logo */}
              <div className="admin-logo me-2 me-sm-3">
                <a href="/" className="d-block">
                  <img
                    style={{ maxWidth: "60px" }}
                    src={`${process.env.PUBLIC_URL}/${BrandLogo}`}
                    alt=""
                  />
                </a>
              </div>
            </div>

            {/* Header Meta */}
            {isAuthenticate && (
              <div className="header-meta d-flex align-items-center">
                {/* Menu Toggler */}
                <div
                  className="menu-toggler ms-1 ms-sm-3"
                  onClick={handleToggle}
                >
                  <i className="bi bi-list" />
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
      {isAuthenticate && (
        <div
          className={`admin-sidebar-wrap ${
            isActive ? "sidebar-active" : "sidebar-disabled"
          }`}
          ref={sideNavRef}
        >
          <div className="overflowY-scroll">
            {/* User Profile */}

            {/* Balance */}
            <div className="card shadow mb-5">
              <div className="card-body text-center p-4">
                <h6 className="mb-1">{balanceCard[0].title}</h6>
                <h5 className="mb-0 text-dark d-flex align-items-center justify-content-center">
                  <img
                    className="me-1"
                    style={{ width: "30px" }}
                    src={`${process.env.PUBLIC_URL}/${balanceCard[0].icon}`}
                    alt=""
                  />
                  <span className="counter">{user.balance}</span>
                  <span className="ms-2">{balanceCard[0].balanceType}</span>
                </h5>
                <div className="thematic-break mb-3 mt-3" />
                <OverlayTrigger
                  key={"progress"}
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip
                      id={`tooltip-progress`}
                      style={{ zIndex: 1300, textAlign: "start" }}
                    >
                      <h6 className="mb-3">Daily Earning</h6>
                      <p
                        className="mb-0"
                        style={{
                          fontWeight: "normal",
                          textAlign: "start",
                          fontSize: "14px",
                        }}
                      >
                        ● You can earn up to {MAX_GCOIN} GCoins per day by
                        playing our games.
                      </p>
                      <p
                        className="mb-0"
                        style={{
                          fontWeight: "normal",
                          textAlign: "start",
                          fontSize: "14px",
                        }}
                      >
                        ● This capacity will be reset at 0:00 (GMT+7) everyday.
                      </p>
                    </Tooltip>
                  }
                >
                  <div
                    aria-hidden
                    onClick={() => {
                      navigate("/math-quiz");
                    }}
                    style={{
                      cursor: "pointer",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    <p>Daily Earning</p>
                    <AnimatedProgressProvider
                      valueStart={0}
                      valueEnd={receiving}
                      duration={1}
                      easingFunction={easeQuadInOut}
                    >
                      {(value) => {
                        const rounded = Math.round(value);
                        if (rounded >= MAX_GCOIN) {
                          return (
                            <CircularProgressbarWithChildren
                              value={rounded}
                              styles={buildStyles({
                                pathTransition: "none",
                                textColor: "#0F9D58",
                                pathColor: "#0F9D58",
                                trailColor: "#0F9D58",
                              })}
                              strokeWidth={4}
                            >
                              <i
                                className="bi bi-check"
                                style={{ fontSize: "80px", color: "#0F9D58" }}
                              />
                            </CircularProgressbarWithChildren>
                          );
                        }
                        return (
                          <CircularProgressbar
                            value={(rounded / 1000) * 100}
                            text={`${rounded} / ${MAX_GCOIN}`}
                            styles={buildStyles({
                              pathTransition: "none",
                              textSize: "12px",
                              textColor: "#c2d4f8",
                              pathColor: "#8480ae",
                              trailColor: "rgba(199, 199, 199, 0.075)",
                            })}
                            strokeWidth={4}
                          />
                        );
                      }}
                    </AnimatedProgressProvider>
                  </div>
                </OverlayTrigger>
              </div>
            </div>

            {/* Sidenav */}
            <div className="sidenav">
              <ul style={{ marginTop: 0 }}>
                {/* Dashboard Section */}
                <li>OIF 2024</li>
                {ClubDaySection.map((elem) => (
                  <li key={elem.id}>
                    <NavLink to={elem.path} end onClick={handleToggle}>
                      <i className={`bi ${elem.icon}`} />
                      {elem.text}
                    </NavLink>
                  </li>
                ))}
                {clubDayStaff &&
                  ClubDayAdminSection.map((elem) => (
                    <li key={elem.id}>
                      <NavLink to={elem.path} end onClick={handleToggle}>
                        <i className={`bi ${elem.icon}`} />
                        {elem.text}
                      </NavLink>
                    </li>
                  ))}
                <li className="thematic-break" />

                <li>Main</li>
                {MainSection.map((elem) => (
                  <li key={elem.id}>
                    <NavLink to={elem.path} end onClick={handleToggle}>
                      <i className={`bi ${elem.icon}`} />
                      {elem.text}
                    </NavLink>
                  </li>
                ))}
                <li className="thematic-break" />

                {/* Shop Section */}
                <li>Shop</li>
                {ShopSection.map((elem) => (
                  <li key={elem.id}>
                    <NavLink to={elem.path} end onClick={handleToggle}>
                      <i className={`bi ${elem.icon}`} />
                      {elem.text}
                    </NavLink>
                  </li>
                ))}
                <li className="thematic-break" />

                {/* Game Section */}
                <li>Game</li>
                {GameSection.map((elem) => (
                  <li key={elem.id}>
                    <NavLink to={elem.path} end onClick={handleToggle}>
                      <i className={`bi ${elem.icon}`} />
                      {elem.text}
                    </NavLink>
                  </li>
                ))}
                <li className="thematic-break" />

                {/* Account Section */}
                <li>Account</li>
                {AccountSection.map((elem, index) => (
                  <li key={index}>
                    <NavLink to={elem.path} onClick={handleToggle}>
                      <i className={`bi ${elem.icon}`} />
                      {elem.text}
                    </NavLink>
                  </li>
                ))}
                <li className="thematic-break" />

                {/* Logout */}
                <li key={"Logout"}>
                  <button
                    type="submit"
                    onClick={() => {
                      setModalShow(true);
                    }}
                  >
                    <i className={"bi bi-door-open"} />
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
            <Modal
              show={modalShow}
              size="lg"
              aria-labelledby="ReportLabel"
              centered
              className="share-modal"
            >
              <Modal.Body>
                <div
                  className="row g-4"
                  style={{ color: "white", padding: "12px" }}
                >
                  <h5>Are you sure you want to log out?</h5>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      type="submit"
                      style={{
                        padding: "8px",
                        color: "white",
                        borderRadius: "12px",
                        border: "none",
                        backgroundColor: "#EA4335",
                        marginRight: "8px",
                      }}
                      onClick={async () => {
                        setActive(false);
                        await dispatch(logout());
                        navigate("/");
                        localStorage.clear();
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: "8px",
                        color: "white",
                        borderRadius: "12px",
                        border: "none",
                        backgroundColor: "#34A853",
                      }}
                      onClick={() => {
                        setModalShow(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setModalShow(false);
                  }}
                  className="btn btn-close-style btn-danger btn-sm rounded-pill"
                  type="button"
                >
                  <i className="bi bi-x-lg" />
                </button>
              </Modal.Body>
            </Modal>

            <div className="mt-auto">
              <div className="mt-5" />
              {/* Copyright Text */}
              <div className="copywrite-text mt-4">
                <a
                  className="mb-0 fz-12"
                  rel="noreferrer"
                  href="https://gdsc.app"
                  target="_blank"
                >
                  {new Date().getFullYear()} © All rights reserved by
                  <p className="fz-12" style={{ marginBottom: 0 }}>
                    GDSC HCMUT
                  </p>
                  <p className="fz-12">v0.3.1-02032023</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
