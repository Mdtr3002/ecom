import { useLayoutEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { createNotification, SUCCESS_NOTI } from "../../utils/notification";

import Divider from "../../components/divider/Divider";
import DiscoverNFTData from "../../data/demos/collection-dashboard.json";
import { useSelector } from "react-redux";
import { SET_USER_INFO } from "../../action-types";
import _ from "lodash";

import ConfirmModal from "../../components/modal/ConfirmModal";
import ProfileModal from "../../components/modal/ProfileModal";
import StartBidModal from "../../components/modal/StartBidModal";
import { Dropdown } from "react-bootstrap";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import MarketPlaceServices from "../../services/marketplace.service";
import NotFoundContent from "../../components/notFound/NotFound";
import { useParams } from "react-router-dom";
import { API } from "../../config";
import { timeConverter } from "../../utils/utils";
import gdscLogo from "../../assets/image/gdsclogo.png";
import FeaturedCard from "../../components/dashboard/featuredCard/FeaturedCard";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";

const STATE = {
  OWNED: "OWNED",
  WAITING: "WAITING",
  DELIVERED: "DELIVERED",
  BIDDING: "BIDDING",
};

const Item = () => {
  const { itemId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [item, setItem] = useState({
    name: "",
    imgUrl: "",
    description: "",
    priceHistory: [
      {
        name: "",
        createdAt: Date.now(),
        price: 0,
      },
    ],
  });
  const [itemState, setItemState] = useState(STATE.OWNED);
  const [received, setReceived] = useState(false);
  const [request, setRequest] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [receivedModal, setReceivedModal] = useState(false);
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [startBidModal, setStartBidModal] = useState(false);
  const [errMsg, setErrMsg] = useState("khkjhk");
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState(false);
  const [key, setKey] = useState("history");
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();

  const receiveItem = (event) => {
    if (
      _.isEmpty(user.name) ||
      _.isEmpty(user.email) ||
      _.isEmpty(user.phone)
    ) {
      setProfileModalShow(true);
      return;
    }
    setProfileModalShow(false);
    setStartBidModal(false);
    setConfirmModal(true);
  };

  const startBidding = (event) => {
    setStartBidModal(true);
    setProfileModalShow(false);
    setConfirmModal(false);
  };

  const receiveConfirm = () => {
    setReceivedModal(true);
  };

  const onRefresh = () => {
    MarketPlaceServices.receiveItem(itemId)
      .then((res) => {
        setItem(res.data.payload);
        setReceived(item.isReceived);
        setRequest(item.isRequestToReceiveItem);
        setErrMsg("");
        setFetchError(false);
      })
      .catch((err) => {
        setFetchError(true);
      });
  };

  useLayoutEffect(() => {
    (async () => {
      try {
        const { data } = await MarketPlaceServices.getUserItemById(itemId);
        const { payload } = data;
        setItem(payload);
        console.log(payload);
        setReceived(payload.isReceived);
        setRequest(payload.isRequestToReceiveItem);
        // console.log(payload)
        setErrMsg("");
        setFetchError(false);
      } catch (err) {
        setFetchError(true);
      }
    })();
    // const itemFound = _.find(inventory, (element) => {
    //   if (element._id === itemId) return true;
    // });
    // console.log(itemFound);
    // console.log(itemId);
    // if (itemFound) {
    //   setItem(itemFound);
    //   setFetchError(false);
    // } else {
    //   setFetchError(true);
    // }
  }, []);

  if (!user || fetchError) {
    return (
      <>
        <NotFoundContent
          nopadding
          notFoundImage="img/illustrator/empty.svg"
          heading="Item not found"
          subHeading="Make sure you own this item."
          button={[
            {
              color: "warning",
              path: "/inventory",
              icon: "bi-house",
              text: "My Inventory",
            },
          ]}
        />
      </>
    );
  }

  return (
    <>
      <Breadcrumb
        breadcrumbTitle="My Item"
        breadcrumbNav={[
          {
            navText: "Home",
            path: "/",
          },
          {
            navText: "Inventory",
            path: "/inventory",
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
                  {item?.collectionName === "GicReward" ? (
                    <img
                      style={{ margin: "0 auto" }}
                      src={item?.imgUrl}
                      alt={item?.name}
                    />
                  ) : (
                    <img src={item?.imgUrl} alt={item?.name} />
                  )}
                </Zoom>
              </div>
            </div>

            {/* Item Details Content */}
            <div className="col-12 col-md-9 col-lg-6" style={{ marginTop: 0 }}>
              <div className="item-details-content mt-5 mt-lg-0">
                {/* Modal */}
                {/* <ConfirmModal
                  show={confirmModal}
                  onHide={() => setConfirmModal(false)}
                  text="Are you sure you want to confirm"
                  request={async () => {
                    return new Promise((resolve, reject) =>
                      reject({ message: "Feature comming soon" })
                    );
                  }}
                  onSuccess
                  onError={(err) => console.log(err)}
                /> */}

                <Modal
                  show={receivedModal}
                  size="lg"
                  aria-labelledby="ReportLabel"
                  centered
                  className="share-modal"
                >
                  <Modal.Body>
                    <div className="row g-4">
                      <h4>Receive Item</h4>
                      <p style={{ marginTop: 0 }}>
                        Please present this QR code to the organizer in charge
                        of gift exchange to claim your item.
                      </p>
                      <div style={{ marginTop: 0 }}>
                        <div
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                            background: "white",
                          }}
                        >
                          <QRCode
                            renderAs="svg"
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                            id="qrcode"
                            value={item._id}
                            size="100%"
                            style={{
                              display: "block",
                              margin: "0 auto",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setReceivedModal(false);
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
                  show={confirmModal}
                  size="lg"
                  aria-labelledby="ReportLabel"
                  centered
                  className="share-modal"
                >
                  <Modal.Body>
                    <div className="row g-4">
                      <h4>Request Item</h4>
                      <p style={{ marginTop: 0 }}>
                        Please make sure the information below is accurate to
                        procceed with the request.
                      </p>
                      <div style={{ marginTop: 0 }}>
                        <div
                          className="col-12"
                          style={{
                            backgroundColor: "#1F0757",
                            borderRadius: "8px",
                            marginTop: 0,
                            padding: "12px",
                          }}
                        >
                          <h5>Email</h5>
                          <p style={{ marginBottom: 0 }}>{user.email}</p>
                        </div>
                      </div>

                      <div>
                        <div
                          className="col-12"
                          style={{
                            backgroundColor: "#1F0757",
                            borderRadius: "8px",
                            padding: "12px",
                          }}
                        >
                          <h5>Tel</h5>
                          <p style={{ marginBottom: 0 }}>
                            {user.phone === undefined || user.phone === ""
                              ? "Not set"
                              : user.phone}
                          </p>
                        </div>
                      </div>

                      <span style={{ color: "red" }}>{errMsg}</span>
                    </div>
                    <div className="row align-items-end">
                      <div
                        className="col-6 col-sm-4 col-lg-6"
                        style={{ width: "fit-content" }}
                      >
                        {user.phone === undefined || user.phone === "" ? (
                          <di>
                            <p style={{ marginBottom: "12px" }}>
                              To request the item, email and phone number must
                              be set
                            </p>
                            <Link
                              className={`btn btn-primary rounded-pill w-100`}
                              style={{ marginTop: "20px" }}
                              to="/my-profile"
                            >
                              {/* <img
                                className="me-1"
                                src={`${process.env.PUBLIC_URL}/${discoverData.buttonGroup[0].leftButtonIcon}`}
                                alt=""
                              /> */}
                              Edit Profile
                            </Link>
                          </di>
                        ) : (
                          <button
                            className={`btn btn-primary rounded-pill w-100`}
                            style={{ marginTop: "20px" }}
                            onClick={() => {
                              // e.preventDefault();
                              MarketPlaceServices.receiveItem(itemId)
                                .then((res) => {
                                  setConfirmModal(false);
                                  createNotification(
                                    SUCCESS_NOTI,
                                    "Request success"
                                  );
                                  // setReceivedModal(true);
                                  navigate(0);
                                })
                                .catch((err) => {
                                  console.log("Error in claim item", err);
                                });
                            }}
                          >
                            {/* <img
                              className="me-1"
                              src={`${process.env.PUBLIC_URL}/${discoverData.buttonGroup[0].leftButtonIcon}`}
                              alt=""
                            /> */}
                            Request Item
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setConfirmModal(false);
                        setErrMsg("");
                      }}
                      className="btn btn-close-style btn-danger btn-sm rounded-pill"
                      type="button"
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  </Modal.Body>
                </Modal>

                <ProfileModal
                  show={profileModalShow}
                  onHide={() => {
                    setProfileModalShow(false);
                    setErrMsg("");
                  }}
                  onConfirm={async () => {
                    setProfileModalShow(false);
                    setErrMsg("");
                    setConfirmModal(true);
                  }}
                />

                <StartBidModal
                  show={startBidModal}
                  onHide={() => {
                    setStartBidModal(false);
                    setErrMsg("");
                  }}
                  request={async () => {
                    return new Promise((resolve, reject) =>
                      reject({ message: "Feature comming soon" })
                    );
                  }}
                  onError={(err) => console.log(err)}
                />

                {/* Dropdown */}
                <Dropdown className={`item-details-dd`}>
                  <Dropdown.Toggle
                    className="rounded-pill shadow-sm p-0"
                    id={`discoverDetailsID${item?._id}`}
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
                          `${API}inventory/${itemId}`
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
                <h2 style={{ marginTop: "12px" }}>{item?.name}</h2>

                <div>
                  <span className="d-block">
                    Description: {item.description}
                  </span>
                </div>

                <div className="border-top w-75 mb-4" />

                {/* Button */}

                {received === false && request === false && (
                  <div className="row align-items-end">
                    <div className="col-6 col-sm-4 col-lg-5">
                      {item?.collectionName !== "GicReward" && (
                        <button
                          className={`btn btn-primary rounded-pill w-100`}
                          onClick={() => setConfirmModal(true)}
                        >
                          {/* <img
                          className="me-1"
                          src={`${process.env.PUBLIC_URL}/${discoverData.buttonGroup[0].leftButtonIcon}`}
                          alt="" /> */}
                          Receive
                        </button>
                      )}
                    </div>
                    {/* <div className="col-6 col-sm-4 col-lg-5">
                      <button className={`btn btn-warning rounded-pill w-100`} onClick={startBidding}>
                          Start Bid
                      </button>
                    </div> */}
                  </div>
                )}

                {request === true && received === false && (
                  <div className="row align-items-end">
                    <div className="col-6 col-sm-4 col-lg-5">
                      <button
                        className={`btn btn-primary rounded-pill w-100`}
                        onClick={receiveConfirm}
                      >
                        {/* <img
                          className="me-1"
                          src={`${process.env.PUBLIC_URL}/${discoverData.buttonGroup[0].leftButtonIcon}`}
                          alt="" /> */}
                        Receive item
                      </button>
                      {/* <h4>
                        <i
                          className="bi bi-truck"
                          style={{ marginRight: "8px" }}
                        />
                        Item is being delivered
                      </h4> */}
                    </div>
                  </div>
                )}

                {request === true && received === true && (
                  <div className="row align-items-end">
                    <div className="col-12 col-sm-10 col-lg-10">
                      {/* <button
                        className={`btn btn-success rounded-pill w-100`}
                        onClick={() => {}}
                        disabled
                      >
                        <img
                          className="me-1"
                          src={`${process.env.PUBLIC_URL}/${discoverData.buttonGroup[0].leftButtonIcon}`}
                          alt="" />
                        Delivered
                      </button> */}
                      <h4>
                        <i
                          className="bi bi-gift"
                          style={{ marginRight: "8px" }}
                        />
                        Item Delivered!
                      </h4>
                    </div>
                  </div>
                )}

                {item?.collectionName !== "GicReward" && (
                  <div className="border-top w-75 my-3" />
                )}

                {/* Short Description */}
                <div className="short-description">
                  {received === false && request === false && (
                    <h5 className="my-1">State: OWNED</h5>
                  )}
                  {received === false && request === true && (
                    <h5 className="my-1">State: WAITING</h5>
                  )}
                  {received === true && request === true && (
                    <h5 className="my-1">State: DELIVERED</h5>
                  )}
                  {received === false && request === false && (
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {/* {
                        "You have earned this item. Now, you can either contact our organizer to RECEIVE the item immediately, or place the item on the market for BIDDING."
                      } */}
                      {item?.collectionName !== "GicReward"
                        ? "You have earned this item through bidding. Click on the 'Receive' button to request an item receipt."
                        : "You have earned this item through completing mission of GDSC Idea Contest. Visit the event website for more activities and awesome prizes"}
                    </p>
                  )}
                  {item?.collectionName === "GicReward" && (
                    <a
                      className={`btn btn-primary rounded-pill w-60`}
                      style={{ marginTop: "20px" }}
                      href="https://gdsc.app"
                    >
                      {/* <img
                          className="me-1"
                          src={`${process.env.PUBLIC_URL}/${discoverData.buttonGroup[0].leftButtonIcon}`}
                          alt="" /> */}
                      GDSC Idea Contest
                    </a>
                  )}
                  {received === false && request === true && (
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {/* {
                        "Our organizers are contacting you via email or phone number. If you have received the item, please the RECEIVE CONFIRM button to confirm that the item is now in your hand. \nIf, however, our organizers haven't contacted you, please contact us via Facebook, Discord or email."
                      } */}
                      {/* {
                        "Our organizers are contacting you via email or phone number to reach an agreement in terms of delivering method. \nIf, however, our organizers haven't contacted you, please contact us via Facebook, Discord or email."
                      } */}
                      Click on the <b>"Receive item"</b> button to access the
                      item's QR code. Present the QR code to the organizer in
                      charge of gift exchange to claim your item.
                    </p>
                  )}
                  {received === true && request === true && (
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {"Your item has been delivered."}
                    </p>
                  )}
                  {itemState === STATE.BIDDING && (
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {
                        "The item has been placed for bidding on the market place."
                      }
                    </p>
                  )}
                </div>

                {item?.collectionName !== "GicReward" && (
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
                              {item.priceHistory.map((ele, index) => (
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
                                        color: "white",
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
                                          color: "white",
                                        }}
                                      >
                                        <b>{ele.name} place a bid</b>
                                      </p>
                                      <p
                                        className="user-info"
                                        style={{
                                          marginBottom: 0,
                                          color: "white",
                                        }}
                                      >
                                        At {timeConverter(ele.createdAt)}
                                      </p>
                                    </div>
                                  </div>
                                  <p
                                    className="user-info"
                                    style={{ color: "white" }}
                                  >
                                    Price: <b>{ele.price}</b>{" "}
                                    <img
                                      style={{
                                        width: "20px",
                                        marginBottom: "2px",
                                      }}
                                      src={gdscLogo}
                                      alt="GDSC Logo"
                                    />
                                  </p>
                                </div>
                              ))}
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-block w-100 mb-70" />

      {/* Tabs */}
      <div className={`funto-tab-area `}>
        <div className="container">
          {/* <div className="row">
            <div className="col-12">
              <div className="tab--area bg-gray p-4 p-lg-5">
                <Tabs
                  id="itemDetailsTab"
                  activeKey={key}
                  onSelect={(k) => {
                    setKey(k);
                  }}
                  className="mb-3"
                >
                  <Tab eventKey="history" title="History">
                    <div className="table-responsive border shadow-sm activity-table bg-white">
                      <table className="table mb-0">
                        <tbody>
                          <tr key={0}>
                            <th scope="row">
                              <h5>Name</h5>
                            </th>
                            <td>
                              <h5>Bid Price</h5>
                            </td>
                            <td>
                              <h5>Bid Time</h5>
                            </td>
                          </tr>
                          {item?.priceHistory.map((ele, index) => (
                            <tr key={index}>
                              <th scope="row">{ele?.name}</th>
                              <td>{ele?.price}</td>
                              <td>{ele?.createdAt && new Date(ele.createdAt).toLocaleString("en-US")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Tab>
                  <Tab eventKey="Description" title="Description">
                    <p>{item?.description}</p>
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

export default Item;
