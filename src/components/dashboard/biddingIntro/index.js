import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ScrollAnimation from "react-animate-on-scroll";

import TodaysDropData from "../../../data/todaysDrop/todays-drop.json";
import BiddingAnimation from "./bidAnimation";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { API } from "../../../config";
import TinySlider from "tiny-slider-react";

const example = [
  {
    _id: "63f733bb185e0976acdf916c",
    itemId: {
      _id: "63f733ba185e0976acdf9168",
      ownerId: "63f34a11deecb6f2d3dcba5d",
      name: "GDSC Bottle",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/gdsc-game-ec439.appspot.com/o/Bottle.png?alt=media&token=9e6c1fd9-90b5-4e07-9f3c-0d508942033b",
      description: "Vacumn Bottle from GDSC",
      currentPrice: 2,
      collectionName: "Bottle",
      isReceived: false,
      isRequestToReceiveItem: false,
      priceHistory: [],
      __v: 0,
    },
    currentPrice: 1,
    collectionName: "Bottle",
    followedUsers: [],
    minPrice: 1,
    maxPrice: 10,
    createdAt: 1677145019059,
    expiredAt: 1677145800000,
    ownerName: "minhduytranct2017@gmail.com",
    claimed: false,
    priceHistory: [],
    __v: 0,
  },
];

const BiddingIntro = (props) => {
  const { title, btnPath, btnText } = props;

  const [copy, setCopy] = useState(false);
  const [collection] = useState(example);

  const liveBidsSetting = {
    items: 1,
    gutter: 24,
    slideBy: 1,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 5000,
    speed: 750,
    loop: true,
    mouseDrag: true,
    controls: false,
    nav: false,
    responsive: {
      320: {
        items: 1,
      },
      576: {
        items: 1.8,
      },
      768: {
        items: 1.8,
      },
      992: {
        items: 1.8,
      },
      1200: {
        items: 1.8,
      },
      1400: {
        items: 2,
      },
    },
  };

  const SpecialBidCards = collection.map((elem, index) => (
    <div key={index}>
      <div className="item-card card shadow-sm bg-gray border-0">
        <div className="card-body">
          <div className="img-wrap">
            {/* Image */}
            <img src={elem.itemId.imgUrl} alt={elem} />

            {/* Bid End */}
            <Dropdown className={`section-dropdownVisibility`}>
              <Dropdown.Toggle
                className="rounded-pill shadow-sm"
                style={{ backgroundColor: "white" }}
                id={`discoverID${elem}`}
              >
                <i className="bi bi-three-dots-vertical" />
              </Dropdown.Toggle>

              {/* <Dropdown.Menu align="end">
                <button
                  key={0}
                  className="dropdown-item"
                  onClick={() => {
                    setCopy(true);
                    navigator.clipboard.writeText(
                      `${API}collection/bidding/${elem}`
                    );
                    setTimeout(() => setCopy(false), 500);
                  }}
                >
                  <i className={`me-2 bi bi-file-earmark`}></i>
                  {copy ? "Copied" : "Copy link"}
                </button>
              </Dropdown.Menu> */}
            </Dropdown>
          </div>

          {/* Others Info */}
          <div className="row gx-2 align-items-center mt-3">
            <div className="col-8">
              <span className="d-block fz-12">
                {/* <i className={`bi ${elem.topLevelInfo[0].icon} me-1`} /> */}
                Available in April
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="row gx-2 align-items-center mt-2">
            <div className="col-8" style={{ width: "100%" }}>
              <div className="name-info d-flex align-items-center">
                <div
                  className="name-author"
                  style={{
                    width: "calc(100% - 0.25rem)",
                    maxWidth: "calc(100% - 0.25rem)",
                  }}
                >
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip id={`liveAuctionNFT`}>{elem?.itemId?.name || elem?.name}</Tooltip>}
                  >
                    <h5
                      className="name d-block hover-primary text-truncate"
                      style={{
                        marginBottom: 0,
                        cursor: "pointer",
                        color: "white",
                      }}
                    >
                      {elem?.itemId?.name || elem?.name}
                    </h5>
                  </OverlayTrigger>
                </div>
              </div>
            </div>

            <div className="col-12">
              <button
                className={`btn btn-primary rounded-pill btn-sm mt-3 w-100`}
                disabled
                style={{ backgroundColor: "gray", border: "none" }}
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="col-12 col-xl-6">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 pb-3">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <img
                className="me-1"
                src={`${process.env.PUBLIC_URL}img/core-img/law.png`}
                alt=""
              />
              <h4 className="mb-0">{title}</h4>
            </div>
            <Link className="btn btn-primary btn-minimal" to={"/collection"}>
              View all
            </Link>
          </div>
          <h6>Check out our reward collection</h6>
          <div className="trending-auction-slide">
            <TinySlider settings={liveBidsSetting}>
              {SpecialBidCards}
            </TinySlider>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="col-12 col-xl-6">
  //     <div className="card border-0 shadow-sm dashboard-responsive">
  //       <div
  //         className="card-body p-4"
  //         style={{ display: "flex", flexDirection: "column" }}
  //       >
  //         <div className="d-flex align-items-center justify-content-between mb-3">
  //           <h5>{title}</h5>
  //         </div>
  //         <p style={{ color: "white" }}>
  //           <b>Stay tuned</b> for occasionally held
  //           <b style={{ color: "yellow" }}> GCoins</b> auctions where players
  //           will compete for chances to own{" "}
  //           <b style={{ color: "yellow" }}>limited exclusive Items</b>.
  //         </p>
  //         <BiddingAnimation />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default BiddingIntro;
