import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import {
  STAFF_CLUBDAY_GIFT,
  STAFF_CLUBDAY_VERIFY,
  SUPER_ADMIN,
} from "./config/roles";

import "./assets/css/animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery-nice-select/css/nice-select.css";
import "./assets/css/bootstrap-icons.css";
import "tiny-slider/dist/tiny-slider.css";
import "./assets/scss/style.scss";
import "react-notifications/lib/notifications.css";

import HomeTwo from "./pages/HomeTwo";

import Explore from "./pages/Explore";
import LiveBidding from "./pages/LiveBidding";
import TopSeller from "./pages/TopSeller";
import Transaction from "./pages/Transaction";
import TopBuyer from "./pages/TopBuyer";
import LiveAuctionDetails from "./components/liveAuction/LiveAuctionDetails";
import DiscoverNFTDetails from "./components/discover/DiscoverNFTDetails";

import Dashboard from "./dashboard/Dashboard";
import DashboardNotification from "./dashboard/Notifications";
import DashboardNotificationDetails from "./dashboard/NotificationDetails";
import MyProfile from "./dashboard/MyProfile";
import ClubDayProfile from "./dashboard/ClubDayProfile";

import Author from "./pages/Author";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";

import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";

import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import GameScreen from "./pages/GameScreen";

import HelpCenter from "./pages/HelpCenter";
import CatagoryQuestions from "./components/helpCenter/CatagoryQuestions";
import HelpQuestionDetails from "./components/helpCenter/QuestionDetails";

import { ThemeProvider, createGlobalStyle } from "styled-components";
import themes from "./config/themes.json";
import useTheme from "./custom-hook/useTheme";
import { useEffect, useMemo, useState } from "react";
import { useStorageState } from "./custom-hook/useLocalStorage";
import { axios } from "./utils/custom-axios";
import { ClientEventSystem } from "./client-events";
import {
  CREATE_CLUBDAY_INFO,
  LOGIN,
  LOGIN_FAIL,
  SET_USER_INFO,
  UPDATE_PODIUM,
} from "./action-types";
import Wheel from "./components/gamewheel/Wheel";
import Header from "./components/header/Header";
import MarketPlace from "./pages/MarketPlace";
import WheelPage from "./components/gamewheel/WheelPage";
import WheelAnimation from "./components/gamewheel/LoadingAnimation";
import CountdownAnimation from "./components/gameboard/components/CountdownAnimation";
import MyBidding from "./pages/MyBidding";
import EditBids from "./pages/EditBids";
import CreateBids from "./pages/CreateBids";
import DashboardHeader from "./components/dashboard/header/DashboardHeader";
import OpenChestAnimation from "./components/gamewheel/OpenChestAnimation";
import OpenChestPage from "./components/gamewheel/OpenChestPage";
import RankingTable from "./pages/TopSeller";
import HistoryTable from "./pages/HistoryTable";
import EventCheckIn from "./pages/EventCheckIn";
import AdminCheckIn from "./pages/AdminCheckIn";
import UserServices from "./services/user.service";
import GameCleared from "./components/gameInro/GameCleared";
import PrizeExchange from "./pages/PrizeExchange";
import PrizeHistory from "./pages/PrizeHistory";
import ClubDay from "./pages/ClubDay";
import MathQuiz from "./pages/MathQuiz";

import { NotificationContainer } from "react-notifications";
import { createNotification } from "./utils/notification";
import ClubDayServices from "./services/clubday.service";
import CreateNewCDProfile from "./dashboard/CreateNewCDProfile";
// import Notification from "./dashboard/Notifications";
import QuizIntro from "./components/MathQuiz/QuizIntro";
import Preloader from "./components/preLoader/GoogleLoading";
import Tutorial from "./pages/Tutorial";
import Leaderboard from "./dashboard/Leaderboard";
import Connect from "./pages/Connect";
import Item from "./pages/ItemDetail";
import ItemExchange from "./pages/ItemExchange";
import FastToG from "./pages/FastToG";
import Privacy from "./pages/Privacy";
import MyInventory from "./dashboard/MyInventory";
import Collections from "./pages/Collections";
import SpecialBid from "./pages/SpecialBid";
import ExchangeItemDetail from "./pages/ExchangeItemDetail";
import BidTutorial from "./pages/BidTutorial";
import FollowedBid from "./pages/FollowedBid";
import { API_URL, GOOGLE_CLIENT_ID } from "./config";
import { useNavigate } from "react-router-dom";
import MascotReward from "./assets/image/Mascot_Reward.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import GICPano from './assets/image/gicPano.png';

function App() {
  const [themeName] = useTheme("darkTheme");
  const { isAuthenticate, user, connect } = useSelector((state) => state.auth);
  const { isWheelOpen: open } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [token] = useStorageState("token");
  const [clubDayInfo, setclubDayInfo] = useStorageState(
    "clubDayInfo",
    null,
    sessionStorage
  );
  const [clubDayUpdated, setClubDayUpdated] = useState(false);
  const navigate = useNavigate();
  const [isLogin, setIsLogIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [prizeModal, setPrizeModal] = useState(false);
  // const [gicPano, setGICPano] = useState(false);
  const [gicGameContent, setGicGameContent] = useState({
    description: "",
    imgUrl: "",
  });
  const [data, setData] = useState([]);
  console.log(user);

  useEffect(() => {
    if (isAuthenticate) {
      setIsLogIn(true);
    } else setIsLogIn(false);
  }, [isAuthenticate]);

  const verifyToken = async () => {
    setLoading(true);
    try {
      await axios.get(`${API_URL}auth/ping`);
      dispatch({ type: LOGIN });
      const clubDayInfoRes = await ClubDayServices.getClubDayInfo();
      const profileRes = await UserServices.getProfile();
      console.log("my-profile", clubDayInfoRes.data.payload);
      if (
        !clubDayInfoRes.data.payload &&
        profileRes?.data?.payload?.name &&
        profileRes?.data?.payload?.studentId
      ) {
        await ClubDayServices.createClubDayInfo(
          profileRes.data.payload.name,
          profileRes.data.payload.studentId
        );
      } else {
        dispatch({ type: CREATE_CLUBDAY_INFO });
      }
      dispatch({ type: SET_USER_INFO, payload: profileRes.data.payload });
      setLoading(false);
      // ClientEventSystem.connectToServer(token)
      // .then((res) => {
      //   console.log(res);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      // setclubDayInfo(payload);
      // const { payload } = clubDayInfoRes.data;
    } catch (err) {
      setLoading(false);
      window.localStorage.clear();
      dispatch({ type: LOGIN_FAIL });
    }
  };

  useEffect(() => {
    if (token) verifyToken();
  }, [token]);

  useMemo(() => {
    ClientEventSystem.connectToServer(token)
      .then((res) => {
        // console.log(res);
        dispatch({ type: UPDATE_PODIUM, payload: data });
        // console.log(data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  useEffect(() => {
    ClientEventSystem.socket.on(ClientEventSystem.EventTypes.NOTIFY, (res) => {
      createNotification(res.type, res.message);
    });
  }, []);

  useEffect(() => {
    ClientEventSystem.socket.on(
      ClientEventSystem.EventTypes.GIC_REWARD,
      (res) => {
        setPrizeModal(true);
        setGicGameContent({ description: res.description, imgUrl: res.imgUrl });
      }
    );
  }, []);

  // useEffect(() => {
  //   if (isAuthenticate !== false) {
  //     setGICPano(true);
  //   }
  //   else {
  //     if(!localStorage.getItem('lastLogin')) {
  //       setGICPano(true);
  //     } else {
  //       const bannerDisabledTime = JSON.parse(
  //         localStorage.getItem('lastLogin'),
  //       );
  //       const currentTime = Date.now();
  //       if ((currentTime - bannerDisabledTime) > 1000*60*60*48) { setGICPano(true); }
  //     }
  //   }
  // }, [])

  const checkMissingInfo = () => {
    console.log("Check missing info");
    if (!user?.name || user?.name === "") return true;
    if (!user?.studentId || user?.studentId === "") return true;
    if (!user?.phone || user?.phone === "") return true;
    return false;
  };

  if (isLoading) {
    return (
      <>
        <Preloader />
        <ThemeProvider theme={themes[themeName]}></ThemeProvider>
      </>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={themes[themeName]}>
        <div className="App">
          <Modal
            show={prizeModal}
            size="lg"
            aria-labelledby="CopyLinkLabel"
            centered
            className="share-modal gic-reward-modal"
          >
            <Modal.Body>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3 id="CopyLinkLabel" className="text-center g-3">
                  GIC Reward!
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "12px",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ marginRight: "8px" }}
                    className="gic-prize-mascot"
                    src={MascotReward}
                    alt="GIC Prize"
                  />
                  <div>
                    <img
                      src={gicGameContent.imgUrl}
                      style={{ alignSelf: "center", borderRadius: "0.5rem" }}
                      alt="GIC Prize"
                      className="gic-prize"
                    />
                    {/* <button
                  className={`${"btn btn-success login game-over-box"}`}
                  style={{ width: "fit-content", alignSelf: 'center', marginTop: '20px' }}
                  onClick={() => {
                    navigate("/inventory")
                    setPrizeModal(false);
                    }
                  }
                  >
                  My Inventory
                  </button> */}
                  </div>
                  <button
                    onClick={() => {
                      setPrizeModal(false);
                    }}
                    className="btn btn-close-style btn-danger btn-sm rounded-pill"
                    type="button"
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
                <p
                  style={{
                    cmarginBottom: "1rem",
                    textAlign: "center",
                    fontSize: "18px",
                    color: "white",
                    marginTop: "12px",
                  }}
                >
                  {gicGameContent.description}
                </p>
              </div>
            </Modal.Body>
          </Modal>
          {/* <Modal
      show={gicPano}
      size="lg"
      aria-labelledby="CopyLinkLabel"
      centered
      className={`share-modal gicPano ${isAuthenticate ? 'pano-responsive' : ''}`}
    >
      <Modal.Body>
            <a href="https://gdsc.app" target="_blank" rel="noreferrer">
            <img src={GICPano} alt="GIC Pano"/>
            </a>
            <div onClick={() => {
              setGICPano(false);
              if (isAuthenticate) localStorage.setItem('lastLogin', JSON.stringify(Date.now()));
            }} style={{position: 'absolute', top: 0, right: 0, cursor: 'pointer'}}>
              <i className="bi bi-x-lg" style={{fontSize: '24px'}} />
            </div>
      </Modal.Body>
    </Modal> */}
          <div className={`admin-wrapper ${isLogin ? "no-mt" : "notLogin"}`}>
            {isAuthenticate && <Header clubDayInfo={clubDayInfo} />}
            <NotificationContainer />
            <Routes>
              <Route path="/box" element={<OpenChestPage />} />

              {isAuthenticate && (
                <>
                  <Route
                    path="/"
                    index
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <Dashboard />
                      )
                    }
                  />
                  <Route
                    path="/create-new-profile"
                    element={
                      <CreateNewCDProfile
                        setClubDayUpdated={setClubDayUpdated}
                      />
                    }
                  />
                  {/* GAME */}
                  <Route
                    path="/math-quiz"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <MathQuiz />
                      )
                    }
                  />
                  <Route
                    path="/fast-to-g"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <FastToG />
                      )
                    }
                  />
                  {/* Profile */}
                  <Route
                    path="/my-profile"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <MyProfile setClubDayUpdated={setClubDayUpdated} />
                      )
                    }
                  />
                  {/* Discord connect */}
                  <Route
                    path="/connect"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <Connect />
                      )
                    }
                  />
                  {/* Marketplace */}
                  <Route
                    path="/collection"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <Collections />
                      )
                    }
                  />
                  <Route
                    path="/inventory"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <MyInventory />
                      )
                    }
                  />
                  <Route
                    path="/livebids"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <ItemExchange />
                      )
                    }
                  />
                  <Route
                    path="/inventory/:itemId"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <Item />
                      )
                    }
                  />
                  <Route
                    path="/my-bids"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <FollowedBid />
                      )
                    }
                  />
                  <Route
                    path="/wheel"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <WheelPage />
                      )
                    }
                  />
                  <Route
                    path="/collection/bidding/:itemTypeId/:itemId"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <ExchangeItemDetail />
                      )
                    }
                  />
                  <Route
                    path="/collection/bidding/:itemTypeId"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <ItemExchange />
                      )
                    }
                  />
                  {/* Dashboard */}
                  <Route
                    path="/dashboard"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <Dashboard />
                      )
                    }
                  />
                  {/* Leaderboard */}
                  <Route
                    path="/leaderboard"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <Leaderboard />
                      )
                    }
                  />
                  {/* Tutorial */}
                  <Route
                    path="/tutorial"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <Tutorial />
                      )
                    }
                  />
                  <Route
                    path="/bid-tutorial"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <BidTutorial />
                      )
                    }
                  />
                  <Route
                    path="/special-bids"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <SpecialBid />
                      )
                    }
                  />
                  <Route
                    path="/transaction"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <Transaction />
                      )
                    }
                  />
                  <Route
                    path="/oif"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" />
                      ) : (
                        <ClubDay />
                      )
                    }
                  />
                  <Route
                    path="/checkin"
                    element={
                      checkMissingInfo() && !clubDayUpdated ? (
                        <Navigate to="/create-new-profile" replace={true} />
                      ) : (
                        <EventCheckIn />
                      )
                    }
                  />
                  <Route path="/gdsc-maze" element={<NotFound />} />
                  {_.includes(user?.roles, STAFF_CLUBDAY_VERIFY) && (
                    <Route path="/admin-checkin" element={<AdminCheckIn />} />
                  )}
                  {_.includes(user?.roles, STAFF_CLUBDAY_GIFT) && (
                    <Route path="/prize-exchange" element={<PrizeExchange />} />
                  )}
                  {_.includes(user?.roles, STAFF_CLUBDAY_GIFT) && (
                    <Route path="/prize-history" element={<PrizeHistory />} />
                  )}
                </>
              )}
              {!isAuthenticate && (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/connect" element={<GameScreen />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forget-password" element={<ForgetPassword />} />
                </>
              )}

              {/* <Route path="/top-seller" element={<TopSeller />} /> */}
              {/* <Route path="/top-buyer" element={<TopBuyer />} /> */}
              {/* <Route path="/explore" element={<Explore />} /> */}
              {/* <Route path="/author/:AUTHORUSERNAME" element={<Author />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}

              {/* <Route path="/home1" element={<HomeOne />} /> */}
              {/* <Route path="/home2" element={<HomeTwo />} /> */}

              {/* <Route path="/featured-items" element={<FeaturedItems />} /> */}
              {/* <Route path="/explore1" element={<ExploreOne />} />
            <Route path="/explore2" element={<ExploreTwo />} /> */}
              {/* <Route path="/collections" element={<Collections />} /> */}
              {/* <Route
                      path="/featured-items/:FEATUREDID"
                      element={<FeaturedNFTDetails />}
                  /> */}

              {/* <Route path="/activity" element={<Activity />} /> */}

              {/* <Route path="/connet-wallet" element={<ConnectWallet />} /> */}

              {/* <Route path="/blog" element={<Blog />} /> */}
              {/* <Route path="/blog-details/:POSTID" element={<BlogDetails />} /> */}

              {/* <Route path="/about" element={<About />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/terms" element={<Terms />} /> */}
              <Route path="/privacy" element={<Privacy />} />

              {/* <Route path="/help-center" element={<HelpCenter />} />
              <Route
                  path="/help-center/:CATAGORY"
                  element={<CatagoryQuestions />}
              />
              <Route
                  path="/help-question-details/:CATAGORYID"
                  element={<HelpQuestionDetails />}
              /> */}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {open && <OpenChestAnimation />}

          {/* Scroll To Top */}
          {/* <ScrollToTop
          id="scrollTopButton"
          width="14"
          height="14"
          component={<i className="bi bi-arrow-up-short" />}
          color="white"
          smooth
          top={200}
        /> */}
        </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
