import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Dropdown from "react-bootstrap/Dropdown";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { NotificationContainer } from "react-notifications";
import { createNotification, SUCCESS_NOTI } from "../utils/notification";

import Divider from "../components/divider/Divider";
import DiscoverNFTData from "../data/demos/collection-dashboard.json";
import FeaturedCard from "../components/dashboard/featuredCard/FeaturedCard";
import ItemDescription from "../data/about/item-description.json";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_INFO } from "../action-types";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import _ from "lodash";

import checkAnimation from "../assets/animation/check.json";
import claimAnimation from "../assets/animation/claim.json";
import gdscLogo from "../assets/image/gdsclogo.png";
import Lottie from "lottie-react";
import Countdown from "react-countdown";
import MarketPlaceServices from "../services/marketplace.service";
import { timeConverter } from "../utils/utils";
import { API } from "../config";
import { useNavigate } from "react-router-dom";

const ExchangeItemDetail = () => {
  const { itemId, itemTypeId } = useParams();
  const discoverDetailsData = DiscoverNFTData.filter((item) => item.id === 1);
  const discoverData = discoverDetailsData[0];

  const { user } = useSelector((state) => state.auth);
  // const [modalShow, setModalShow] = useState(false);
  // const [modalShow2, setModalShow2] = useState(false);
  // const [modalShow3, setModalShow3] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [claimModalShow, setClaimModalShow] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [errMsg, setErrMsg] = useState("");
  const [key, setKey] = useState("history");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState(false);
  const [userBid, setUserBid] = useState(0);
  const [currentBid, setCurrentBid] = useState(discoverData.currentPrice);
  const [highestPrice, setHighestPrice] = useState(29);
  const [bidEnd, setBidEnd] = useState({
    state: false,
    msg: "Bid ending soon",
  });
  const [claim, setClaim] = useState(false);
  const [itemData, setItemData] = useState({
    collectionName: "",
    minPrice: 0,
    maxPrice: 0,
    currentPrice: 0,
    expiredAt: 0,
    ownerName: "",
    followedUsers: [],
    priceHistory: [],
    currentBidUserId: "",
    itemId: {
      imgUrl: "",
      description: "",
    },
  });
  const demo = [
    {
      email: "ffff",
      price: 1000,
      createdAt: 1676550346132,
    },
    {
      email: "ffff",
      price: 1000,
      createdAt: 1676550346132,
    },
    {
      email: "ffff",
      price: 1000,
      createdAt: 1676550346132,
    },
    {
      email: "ffff",
      price: 1000,
      createdAt: 1676550346132,
    },
    {
      email: "ffff",
      price: 1000,
      createdAt: 1676550346132,
    },
    {
      email: "ffff",
      price: 1000,
      createdAt: 1676550346132,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeProfile = (e) => {
    const api = async () =>
      new Promise((resolve, reject) => reject({ message: "data" }));
    setLoading(true);
    api()
      .then(() => {
        setLoading(false);
        dispatch({
          type: SET_USER_INFO,
          payload: { name, email, phone },
        });
        setErrMsg("");
        setProfileModalShow(false);
        setTimeout(() => setConfirmModal(true), 500);
      })
      .catch((err) => {
        setLoading(false);
        setErrMsg(err?.message || "Unexpected error");
      });
  };
  // console.log('here', (ItemDescription.filter(el => el.name === itemData.collectionName))[0].description)
  const checkCondition = () => {
    if (new Date(itemData.expiredAt) < Date.now()) {
      if (user._id === itemData.currentBidUserId) setClaim(true);
      else setBidEnd({ state: true, msg: "Bidding Period has ended" });
    } else if (itemData.currentPrice === itemData.maxPrice) {
      // if (user._id === itemData.currentBidUserId) setClaim(true);
      // else
      setBidEnd({
        state: true,
        msg: "Auction ended since highest price is reached",
      });
    } else {
      setBidEnd({ state: false, msg: "Bid ending soon" });
      setClaim(false);
    }
    // console.log('claim', claim);
    // console.log('state', bidEnd)
  };
  const onRefresh = () => {
    MarketPlaceServices.getMarketPlaceItemById(itemId)
      .then(async (res) => {
        // console.log('re', res.data.payload);
        setItemData(res.data.payload);
        //  checkCondition();
      })
      .catch((err) => {
        // console.log("Error in get marketplace items ", err);
      });
  };

  useEffect(() => {
    onRefresh();
  }, []);
  useEffect(() => checkCondition(), [itemData]);

  const handleReceivePrize = (e) => {
    if (_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(phone)) {
      // console.log("handleLoadMore");
      setProfileModalShow(true);
      return;
    }
    setProfileModalShow(false);
    setConfirmModal(true);
  };

  const handleConfirm = (e) => {
    setLoading(true);
    const api = async () =>
      new Promise((resolve, reject) => resolve({ message: "" }));
    api()
      .then(() => {
        setErrMsg("");
        setSuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setErrMsg(err.message);
      });
  };

  const checkPrice = () => {
    if (userBid < itemData.minPrice) {
      setErrMsg("Input price must be higher than the starting price");
      return false;
    } else if (userBid < itemData.currentPrice * 1.1) {
      setErrMsg("Input price must be 10% higher than the current bid");
      return false;
    } else if (userBid > user.balance) {
      setErrMsg("You do not have enough GCoin");
      return false;
    } else setErrMsg("");
    return true;
  };

  useEffect(() => {
    if (success && confirmModal) {
      setTimeout(() => setConfirmModal(false), 2000);
    }
  }, [success, confirmModal]);

  function Confirm(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="CopyLinkLabel"
        centered
        className="share-modal"
      >
        <Modal.Body>
          {success ? (
            <div style={{ alignSelf: "center" }}>
              <Lottie animationData={checkAnimation} loop={false} />
            </div>
          ) : (
            <>
              <h5 id="CopyLinkLabel" className="text-center mb-3">
                Are you sure you want to receive this item?
              </h5>

              <span style={{ color: "red", marginBottom: "1rem" }}>
                {errMsg}
              </span>

              <button
                className={`btn btn-primary rounded-pill w-100`}
                onClick={handleConfirm}
                disabled={loading}
              >
                Confirm
              </button>

              <button
                onClick={props.onHide}
                className="btn btn-close-style btn-danger btn-sm rounded-pill"
                type="button"
              >
                <i className="bi bi-x-lg" />
              </button>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  }
  const clockTime = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="bid-ends">
        <div className="xl-hide" style={{ width: "93px" }}>
          <span className="days">{days} Days</span>
        </div>
        <div className="xl-show">
          <span className="days">{days}</span>
          <span>Days</span>
        </div>
        <div className="xl-hide">
          <span className="hours">{hours} Hours</span>
        </div>
        <div className="xl-show">
          <span className="hours">{hours}</span>
          <span>Hours</span>
        </div>
        <div className="xl-hide" style={{ width: "93px" }}>
          <span className="minutes">{minutes} Min</span>
        </div>
        <div className="xl-show">
          <span className="minutes">{minutes}</span>
          <span>Min</span>
        </div>
        <div className="xl-hide" style={{ width: "93px" }}>
          <span className="seconds">{seconds} Sec</span>
        </div>
        <div className="xl-show">
          <span className="seconds">{seconds}</span>
          <span>Sec</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div className="col-12 col-sm-9 col-lg-6">
            <div className="section-heading">
              <h2 className="mb-0">Live Auction Item</h2>
            </div>
          </div>
        </div>
      </div> */}
      <Breadcrumb
        breadcrumbTitle="Live Auction Item"
        breadcrumbNav={[
          {
            navText: "Home",
            path: "/",
          },
          {
            navText: "Bidding",
            path: "/collection",
          },
        ]}
        adjustPos
      />

      <Divider />

      <div className="item-details-wrap">
        <div className="container">
          <div className="row g-4 g-lg-5 align-items-center justify-content-center">
            <div className="col-12 col-md-12 col-lg-6">
              <div className="item-big-thumb">
                <Zoom
                  overlayBgColorStart="rgba(0, 0, 0, 0)"
                  overlayBgColorEnd="rgba(0, 0, 0, 0.95)"
                  transitionDuration={400}
                >
                  <img
                    src={itemData.itemId.imgUrl}
                    alt={itemData.collectionName}
                  />
                </Zoom>
              </div>
            </div>

            {/* Item Details Content */}
            <div className="col-12 col-md-9 col-lg-6" style={{ marginTop: 0 }}>
              {/* Modal */}
              <div className="item-details-content mt-5 mt-lg-0">
                <Confirm
                  show={confirmModal}
                  onHide={() => {
                    setConfirmModal(false);
                    setErrMsg("");
                  }}
                />
                {/* <NotificationContainer /> */}
                <Modal
                  show={profileModalShow}
                  size="lg"
                  aria-labelledby="ReportLabel"
                  centered
                  className="share-modal"
                >
                  <Modal.Body>
                    {/* <div className="row g-4">
                      <p>Please filled all neccessary information for our team to contact you.</p>
                      <div className="col-12">
                        <input className="form-control bg-gray border-0" value={name} onChange={e => setName(e.target.value)} type="text" name="fullName" placeholder="Full Name" />
                      </div>

                      <div className="col-12">
                        <input className="form-control bg-gray border-0" type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder="Email Address" />
                      </div>

                      <div className="col-12">
                        <input className="form-control bg-gray border-0" type="number" value={phone} onChange={e => setPhone(e.target.value)} name="phone" placeholder="Phone" />
                      </div>

                      <span style={{ color: 'red' }}>{errMsg}</span>

                      <div className="col-12 g-3">
                        <button className="btn btn-primary w-100 rounded-pill" type="button" onClick={handleChangeProfile} disabled={loading}>
                          <i className="bi bi-sd-card-fill me-1" />Save changes
                        </button>
                      </div>
                    </div> */}
                    <div className="row align-items-end">
                      <h5>
                        Bid on this item
                        <i
                          className="bi bi-hammer"
                          style={{ marginLeft: "4px" }}
                        />
                      </h5>
                      <div className="col-6 col-sm-4">
                        <p style={{ color: "white" }} className="mb-2">
                          Starting Price
                        </p>
                        <h5 className="text-center mb-0 border border-2 px-3 py-2 border-primary d-inline-block rounded text-primary w-100">
                          {itemData.minPrice}G
                        </h5>
                      </div>
                      <div className="col-6 col-sm-4">
                        <p style={{ color: "white" }} className="mb-2">
                          Current Bid
                        </p>
                        <h5 className="text-center mb-0 border border-2 px-3 py-2 border-primary d-inline-block rounded text-primary w-100">
                          {itemData.currentPrice}G
                        </h5>
                      </div>
                      {/* <div className="col-6 col-sm-4">
                        <p style={{ color: "white" }} className="mb-2">
                          Highest Price
                        </p>
                        <h5 className="text-center mb-0 border border-2 px-3 py-2 border-primary d-inline-block rounded text-primary w-100">
                          {itemData.maxPrice}G
                        </h5>
                      </div> */}
                      <h6 style={{ marginTop: "20px" }}>
                        Input your bidding price
                      </h6>
                      <div>
                        <input
                          className="form-control bg-gray border-0"
                          value={userBid}
                          onChange={(e) => setUserBid(e.target.value)}
                          type="text"
                          name="Bid Value"
                          placeholder="Bid Value"
                        />
                      </div>
                      {errMsg === "" ? (
                        <div className="mb-4" />
                      ) : (
                        <p
                          style={{
                            marginBottom: 0,
                            marginTop: "2px",
                            color: "red",
                          }}
                        >
                          {errMsg}
                        </p>
                      )}
                      <div className="col-6 col-sm-4 col-lg-5">
                        <button
                          className={`btn btn-primary rounded-pill w-100`}
                          style={{ marginTop: "20px" }}
                          onClick={() => {
                            if (checkPrice()) {
                              MarketPlaceServices.placeBids(itemId, userBid)
                                .then((res) => {
                                  // console.log("Bid success");
                                  createNotification(
                                    SUCCESS_NOTI,
                                    "Place bid success"
                                  );
                                  setProfileModalShow(false);
                                  setErrMsg("");
                                  onRefresh();
                                })
                                .catch((err) => {
                                  // console.log(err);
                                });
                            }
                          }}
                          disabled={success}
                        >
                          {/* <img
                            className="me-1"
                            src={`${process.env.PUBLIC_URL}/${discoverData.buttonGroup[0].leftButtonIcon}`}
                            alt="" /> */}
                          Place Bid
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setProfileModalShow(false);
                        setErrMsg("");
                      }}
                      className="btn btn-close-style btn-danger btn-sm rounded-pill"
                      type="button"
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  </Modal.Body>
                </Modal>
                <Modal
                  show={claimModalShow}
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
                      <h4 style={{ textAlign: "center", marginBottom: 0 }}>
                        Claim this Item?
                      </h4>
                      <Lottie
                        style={{
                          marginTop: 0,
                          width: "72%",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                        animationData={claimAnimation}
                        loop={true}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 0,
                        }}
                      >
                        <button
                          type="submit"
                          style={{
                            padding: "8px",
                            color: "white",
                            borderRadius: "12px",
                            border: "none",
                            backgroundColor: "#34A853",
                            marginRight: "8px",
                          }}
                          onClick={() => {
                            MarketPlaceServices.claimBidItem(itemId)
                              .then((res) => {
                                setClaimModalShow(false);
                                createNotification(
                                  SUCCESS_NOTI,
                                  "Claim item success"
                                );
                                navigate(
                                  `../inventory/${itemData.itemId._id}`,
                                  { replace: true }
                                );
                              })
                              .catch((err) => {
                                // console.log("Error in claim item", err);
                              });
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
                            backgroundColor: "#EA4335",
                          }}
                          onClick={() => {
                            setClaimModalShow(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setClaimModalShow(false);
                      }}
                      className="btn btn-close-style btn-danger btn-sm rounded-pill"
                      type="button"
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  </Modal.Body>
                </Modal>

                {/* Dropdown */}
                <Dropdown
                  className={`section-${discoverData.dropdownVisibility} item-details-dd`}
                >
                  <Dropdown.Toggle
                    className="rounded-pill shadow-sm p-0"
                    id={`discoverDetailsID${itemId}`}
                  >
                    <i className="bi bi-three-dots-vertical" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <button
                      key={0}
                      className="dropdown-item"
                      onClick={() => {
                        setCopy(true);
                        navigator.clipboard.writeText(
                          `${API}collection/bidding/${itemTypeId}/${itemId}}`
                        );
                        setTimeout(() => setCopy(false), 500);
                      }}
                    >
                      <i className={`me-2 bi bi-file-earmark`}></i>
                      {copy ? "Copied" : "Copy link"}
                    </button>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Title */}
                <h2 className="my-3">
                  {itemData?.itemId?.name || itemData?.name}
                </h2>

                <div className="d-flex align-items-center mb-2">
                  {/* Author Image */}
                  <div className="author-img position-relative me-3">
                    {/* <img
                      className="shadow"
                      src={`${process.env.PUBLIC_URL}/${discoverData.authorAvater}`}
                      alt={discoverData.authorName}
                    /> */}
                    <i
                      className="bi bi-person-circle true"
                      style={{
                        backgroundColor: "transparent",
                        color: "#8480AE",
                        fontSize: "24px",
                      }}
                    />
                    {/* <i className={`bi bi-check position-absolute bg-primary ${discoverData.authorVerified}`} /> */}
                  </div>

                  {/* Name & Author */}
                  <div
                    className="name-author fz-16"
                    style={{
                      display: "flex",
                      color: "white",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="d-bloc xl-fz12"
                      style={{ marginRight: "4px", color: "#8480AE" }}
                    >
                      Owned by
                    </span>
                    <div
                      className="author d-blockhover-primary text-truncate xl-fz12"
                      style={{ color: "#8480AE" }}
                    >
                      {itemData.ownerName}
                    </div>
                  </div>
                </div>
                <p style={{ marginBottom: 0 }}>
                  Description: {itemData.itemId.description}
                </p>
                {user._id === itemData.currentBidUserId &&
                  !bidEnd.state &&
                  !claim && <h5>You are currently the Highest Bidder</h5>}
                <div className="border-top w-75 mb-4" />
                <h5 style={{ marginTop: "12px" }}>{bidEnd.msg}</h5>
                {itemData.expiredAt != 0 && (
                  <Countdown
                    date={itemData.expiredAt}
                    intervalDelay={0}
                    renderer={clockTime}
                  />
                )}

                <div
                  className="row align-items-end"
                  style={{ marginTop: "12px" }}
                >
                  <div className="col-6 col-sm-4">
                    <p className="mb-2 xl-fz12">Starting Price</p>
                    <h5 className="text-center mb-0 border border-2 px-3 py-2 border-primary d-inline-block rounded text-primary w-100">
                      {itemData.minPrice}G
                    </h5>
                  </div>
                  <div className="col-6 col-sm-4">
                    <p className="mb-2 xl-fz12">Current Bid</p>
                    <h5 className="text-center mb-0 border border-2 px-3 py-2 border-primary d-inline-block rounded text-primary w-100">
                      {itemData.currentPrice}G
                    </h5>
                  </div>
                  {/* <div className="col-6 col-sm-4">
                    <p style={{ color: "white" }} className="mb-2">
                      Highest Price
                    </p>
                    <h5 className="text-center mb-0 border border-2 px-3 py-2 border-primary d-inline-block rounded text-primary w-100">
                      {itemData.maxPrice}G
                    </h5>
                  </div> */}
                  {bidEnd.state &&
                    !claim &&
                    itemData.itemId.ownerId !== user._id && (
                      <>
                        <div
                          className="col-6 col-sm-4 col-lg-5"
                          style={{ width: "100%" }}
                        >
                          <button
                            disabled
                            className={`btn btn-primary rounded-pill w-100`}
                            style={{
                              marginTop: "20px",
                              backgroundColor: "gray",
                              border: "none",
                            }}
                            onClick={handleReceivePrize}
                          >
                            {/* <img
                            className="me-1"
                            src={`${process.env.PUBLIC_URL}/${discoverData.buttonGroup[0].leftButtonIcon}`}
                            alt="" /> */}
                            Place a Bid
                          </button>
                        </div>
                      </>
                    )}
                  {claim && itemData.itemId.ownerId !== user._id && (
                    <div
                      className="col-6 col-sm-4 col-lg-5"
                      style={{ width: "100%" }}
                    >
                      <button
                        className={`btn btn-primary rounded-pill w-100`}
                        style={{ marginTop: "20px" }}
                        onClick={() => setClaimModalShow(true)}
                      >
                        {/* <img
                          className="me-1"
                          src={`${process.env.PUBLIC_URL}/${discoverData.buttonGroup[0].leftButtonIcon}`}
                          alt="" /> */}
                        <i
                          className="hover-black bi bi-bag-check true"
                          style={{
                            backgroundColor: "transparent",
                            marginRight: "4px",
                          }}
                        />
                        Claim Item
                      </button>
                    </div>
                  )}
                  {!bidEnd.state &&
                    !claim &&
                    itemData.itemId.ownerId !== user._id && (
                      <div
                        className="col-6 col-sm-4 col-lg-5"
                        style={{ width: "100%" }}
                      >
                        <button
                          className={`btn btn-primary rounded-pill w-100`}
                          style={{ marginTop: "20px" }}
                          onClick={() => setProfileModalShow(true)}
                        >
                          {/* <img
                          className="me-1"
                          src={`${process.env.PUBLIC_URL}/${discoverData.buttonGroup[0].leftButtonIcon}`}
                          alt="" /> */}
                          Place a Bid
                        </button>
                      </div>
                    )}
                </div>

                {/* <div className="border-top w-75 my-4" /> */}

                <div className="row" style={{ marginTop: "12px" }}>
                  <div className="col-12">
                    <div
                      className="tab--area-custom"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <Tabs
                        id="itemDetailsTab"
                        activeKey={"history"}
                        className="mb-3"
                      >
                        <Tab
                          eventKey="history"
                          className="history-scroll"
                          title="History"
                          style={{
                            overflowY: "scroll",
                          }}
                        >
                          <div
                            className="table-responsive shadow-sm activity-table"
                            style={{ backgroundColor: "transparent" }}
                          >
                            {itemData.priceHistory.map((ele, index) => (
                              <div
                                key={index + 1}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  borderBottom: "1px solid gray",
                                  marginBottom: "4px",
                                  paddingBottom: "4px",
                                }}
                              >
                                {/* <div scope="row">{ele.email}</div>
                                  <div>{ele.price}</div>
                                  <div>{timeConverter(ele.createdAt)}</div> */}
                                <div className="d-flex">
                                  <i
                                    className="bi bi-person-circle true"
                                    style={{
                                      backgroundColor: "transparent",
                                      marginRight: "4px",
                                    }}
                                  />
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <p
                                      className="user-info"
                                      style={{
                                        marginBottom: 0,
                                      }}
                                    >
                                      <b>{ele.email} place a bid</b>
                                    </p>
                                    <p
                                      className="user-info"
                                      style={{
                                        marginBottom: 0,
                                      }}
                                    >
                                      At {timeConverter(ele.createdAt)}
                                    </p>
                                  </div>
                                </div>
                                <p className="user-info">
                                  Price: <b>{ele.price}</b> VND
                                </p>
                              </div>
                            ))}
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>

                {/* Short Description */}
                <div className="short-description">
                  {/* <h5>{discoverData.shortDesc[0].heading}</h5>
                  <p className="mb-0" dangerouslySetInnerHTML={{ __html: discoverData.shortDesc[0].body }} >
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-block w-100 mb-70" />

      {/* Tabs */}
      <div className={`funto-tab-area ${discoverData.tabVisibility}`}>
        <div className="container">
          {/* <div className="row" style={{marginBottom: '20px'}}>
            <div className="col-12">
              <div className="tab--area bg-gray p-4 p-lg-5">
                <Tabs
                  id="itemDetailsTab"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="history" title="History">
                    <div className="table-responsive border shadow-sm activity-table bg-white">
                      <table className="table mb-0">
                        <tbody>
                          <tr key={0}>
                            <th scope="row">
                              <h5>User</h5>
                            </th>
                            <td>
                              <h5>Bid Price</h5>
                            </td>
                            <td>
                              <h5>Bid Time</h5>
                            </td>
                          </tr>
                          {itemData.priceHistory.map((ele, index) => (
                            <tr key={index + 1}>
                              <th scope="row">{ele.email}</th>
                              <td>{ele.price}</td>
                              <td>{timeConverter(ele.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Tab>
                  <Tab eventKey="Description" title="Description">
                    {discoverData.firstTabContent.map((elem, index) => (
                      <div key={index} dangerouslySetInnerHTML={{ __html: elem }} ></div>
                    ))}
                    <h5>{itemData.itemId.description}</h5>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div> */}
          <FeaturedCard
            title="Auction Item"
            buttonText="View all"
            buttonPath="/collection"
            animationTime={0}
            reload={true}
          />
        </div>
      </div>
    </>
  );
};

export default ExchangeItemDetail;
