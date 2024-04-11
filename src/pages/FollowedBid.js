import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Divider from "../components/divider/Divider";
import DiscoverNFTData from "../data/demos/collection-dashboard.json";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import MarketPlaceServices from "../services/marketplace.service";
import claimAnimation from "../assets/animation/claim.json";
import Lottie from "lottie-react";
import { createNotification, SUCCESS_NOTI } from "../utils/notification";
import { useSelector } from "react-redux";
import { API } from "../config";

import $ from "jquery";
import NotFoundContent from "../components/notFound/NotFound";
import Footer from "../components/footer/Footer";
window.jQuery = window.$ = $;
require("jquery-nice-select");

export default function FollowedBid() {
  // const [count, setCount] = useState(12);
  // const [noMorePost, setNoMorePost] = useState(false);
  const [collection, setCollection] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [test, setTest] = useState(DiscoverNFTData);
  const [copy, setCopy] = useState([]);
  const [claimModalShow, setClaimModalShow] = useState(false);

  const onRefresh = () => {
    MarketPlaceServices.getAllBidItem()
      .then(async (res) => {
        setCollection(res.data.payload);
      })
      .catch((err) => {
        // console.log("Error in get marketplace items ", err);
      });
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const selectStatus = useRef();
  const selectCategories = useRef();
  const selectItems = useRef();
  const selectISortBy = useRef();
  const selectRatings = useRef();
  const selectChains = useRef();
  const selectChains2 = useRef();

  // useEffect(() => {
  //   $(selectStatus.current).niceSelect();
  // }, []);

  // useEffect(() => {
  //   $(selectCategories.current).niceSelect();
  // }, []);

  // useEffect(() => {
  //   $(selectItems.current).niceSelect();
  // }, []);

  // useEffect(() => {
  //   $(selectISortBy.current).niceSelect();
  // }, []);

  // useEffect(() => {
  //   $(selectRatings.current).niceSelect();
  // }, []);

  // useEffect(() => {
  //   $(selectChains.current).niceSelect();
  // }, []);

  // useEffect(() => {
  //   $(selectChains2.current).niceSelect();
  // }, []);

  // const handleLoadMore = () => {
  //   setCount(count + 4);
  //   if (count >= DiscoverNFTData.length) {
  //     setNoMorePost(true);
  //   }
  // }

  if (!collection || collection.length === 0) {
    return (
      <>
        <Breadcrumb
          breadcrumbTitle="My Followed Bids"
          breadcrumbNav={[
            {
              navText: "Home",
              path: "/",
            },
          ]}
        />
        <NotFoundContent
          nopadding
          notFoundImage="img/illustrator/empty.svg"
          heading="Empty"
          subHeading="Try bidding an item. Visit the tutorial for more details."
          button={[
            {
              color: "primary",
              path: "/bid-tutorial",
              icon: "bi-book",
              text: "Tutorial",
            },
          ]}
        />
      </>
    );
  }

  const DiscoverNFTCards = collection.map((elem, index) => (
    <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div className="item-card card shadow-sm">
        <div className="card-body">
          <div className="img-wrap">
            {/* Image */}
            <img src={elem.itemId.imgUrl} alt={elem.collectionName} />

            {/* Badge */}
            {/* Dropdown */}
            <Dropdown>
              <Dropdown.Toggle
                className="rounded-pill shadow-sm"
                style={{ backgroundColor: "white" }}
                id={`discoverID${elem._id}`}
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
                      `${API}collection/bidding/${elem.collectionName}/${elem._id}`
                    );
                    setTimeout(() => setCopy(false), 500);
                  }}
                >
                  <i className={`me-2 bi bi-file-earmark`}></i>
                  {copy ? "Copied" : "Copy link"}
                </button>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Obtained on */}
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
                      MarketPlaceServices.claimBidItem(elem._id)
                        .then((res) => {
                          setClaimModalShow(false);
                          createNotification(
                            SUCCESS_NOTI,
                            "Claim item success"
                          );
                          onRefresh();
                        })
                        .catch((err) => {
                          // console.log("Error in claim item", err);
                        });
                    }}
                  >
                    Confirm <i className="bi bi-check-lg" />
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
                    Cancel <i className="bi bi-x-lg" />
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
          {/* Item name */}

          <div className="row gx-2 align-items-center mt-3">
            <h5 className="text-truncate">
              {elem?.itemId?.name || elem?.name}{" "}
              <img
                className="me-1"
                src={`${process.env.PUBLIC_URL}/img/core-img/fire.png`}
                alt=""
              />
            </h5>
            <p style={{ color: "white", marginBottom: 0, display: "flex" }}>
              {/* Current Bid: {elem.currentPrice} */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <div style={{ color: " #CFDEDB" }}>
                    <i className="me-1 bi bi-person-circle" />
                    Owned by
                  </div>
                  <div style={{ color: " #CFDEDB" }}>Price:</div>
                </div>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between", height: "24px" }}
                >
                  <OverlayTrigger
                    key={"progress"}
                    placement="top"
                    delay={{ show: 250, hide: 100 }}
                    overlay={
                      <Tooltip
                        id={`tooltip-progress`}
                        style={{ marginBottom: "0", textAlign: "start" }}
                      >
                        <p style={{ marginBottom: 0 }}>{elem.ownerName}</p>
                      </Tooltip>
                    }
                  >
                    <div
                      className="hover-blue"
                      style={{
                        maxWidth: "60%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        color: "#8480AE",
                      }}
                    >
                      {elem.ownerName}
                    </div>
                  </OverlayTrigger>
                  <div style={{ color: "#8480AE" }}>
                    {elem.currentPrice} VND
                  </div>
                </div>
              </div>
            </p>
          </div>
          {/* Button */}
          <div
            className="row gx-2 align-items-center mt-3"
            style={{ justifyContent: "center" }}
          >
            <div
              className="col-6"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Link
                className="btn btn-primary rounded-pill btn-sm"
                to={`/collection/bidding/${elem.collectionName}/${elem._id}`}
                style={{ marginRight: "4px" }}
              >
                <i className="bi"></i>
                Detail
              </Link>
              {user._id === elem.currentBidUserId &&
                new Date(elem.expiredAt) < Date.now() && (
                  <button
                    className="btn btn-success rounded-pill btn-sm"
                    onClick={() => setClaimModalShow(true)}
                  >
                    <i className="bi"></i>
                    Claim
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div className="col-12 col-sm-9 col-lg-6">
            <div className="section-heading">
              <h2 className="mb-0">My Collection</h2>
            </div>
          </div>
        </div>
      </div> */}
      <Breadcrumb
        breadcrumbTitle="My Followed Bids"
        breadcrumbNav={[
          {
            navText: "Home",
            path: "/",
          },
        ]}
      />

      {/* <div className="container">
        <div className="row g-4 align-items-end">

          <div className="col-12 col-sm-6 col-lg-3">
            <h5>Status</h5>
            <select ref={selectStatus} className="filter-select bg-gray w-100">
              <option value="buy-now">Buy Now</option>
              <option value="on-auction">On Auction</option>
              <option value="new">New</option>
              <option value="featured">Featured</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h5>Categories</h5>
            <select ref={selectCategories} className="filter-select bg-gray w-100">
              <option value={1}>Art</option>
              <option value={2}>Cards</option>
              <option value={3}>Collectibles</option>
              <option value={4}>Domain</option>
              <option value={5}>Music</option>
              <option value={6}>Memes</option>
              <option value={7}>Photos</option>
              <option value={8}>Sports</option>
              <option value={9}>Videos</option>
              <option value={10}>Vitual Worlds</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h5>Items</h5>
            <select ref={selectItems} className="filter-select bg-gray w-100">
              <option value={1}>All</option>
              <option value={2}>Single</option>
              <option value={3}>Bundle</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h5>Sort By</h5>
            <select ref={selectISortBy} className="filter-select bg-gray w-100">
              <option value={1}>Recently Added</option>
              <option value={2}>Recently Sold</option>
              <option value={3}>Ending Soon</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h5>Ratings</h5>
            <select ref={selectRatings} className="filter-select bg-gray w-100">
              <option value={1}>5 Star</option>
              <option value={2}>4 Star & Above</option>
              <option value={3}>3 Star & Above</option>
              <option value={4}>2 Star & Above</option>
              <option value={5}>1 Star & Above</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h5>Chains</h5>
            <select ref={selectChains} className="filter-select bg-gray w-100">
              <option value={1}>Bitcoin</option>
              <option value={2}>Ethereum</option>
              <option value={3}>Tether</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h5>Chains</h5>
            <select ref={selectChains2} className="filter-select bg-gray w-100">
              <option value={1}>Bitcoin</option>
              <option value={2}>Ethereum</option>
              <option value={3}>Tether</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <button
              className="btn btn-primary rounded-pill w-100"
              type="submit"
            >
              Apply
              <i className="ms-1 bi bi-arrow-right" />
            </button>
          </div>

        </div>
      </div> */}

      <div className="container">
        <div className="row g-4 justify-content-center">{DiscoverNFTCards}</div>
      </div>

      {/* <div className="container">
        <div className="text-center mt-70">
          <button
            className="btn btn-primary px-4 rounded-pill"
            onClick={() => handleLoadMore()}
            disabled={noMorePost ? "disabled" : null}
          >
            {noMorePost ?
              (<span className="d-flex align-items-center">
                No Items Here
                <i className="ms-2 bi bi-emoji-frown" />
              </span>) :
              (<span className="d-flex align-items-center">
                View More Items
                <i className="ms-2 bi bi-arrow-repeat" />
              </span>)}
          </button>
        </div>
      </div> */}

      <Divider />

      <Footer />
    </>
  );
}
