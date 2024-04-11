import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Dropdown from "react-bootstrap/Dropdown";
import Countdown from "react-countdown";
import TrendingAuctionData from "../../../data/demos/collection-dashboard.json";
import TinySlider from "tiny-slider-react";
import MarketPlaceServices from "../../../services/marketplace.service";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { UPDATE_COLLECTION } from "../../../action-types";
import { API } from "../../../config";

const ItemExchangeIntro = (props) => {
  const { title, icon } = props;
  const [copy, setCopy] = useState(false);
  const [collection, setCollection] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    MarketPlaceServices.getAllMarketPlaceItem()
      .then(async (res) => {
        await setCollection(collectionReduce(res.data.payload));
      })
      .catch((err) => {
        // console.log('Error in get marketplace items ',err);
      });
  }, []);

  useEffect(() => {
    dispatch({ type: UPDATE_COLLECTION, payload: collection });
  }, [collection]);

  const collectionReduce = (data) =>
    _.reduce(
      data,
      (collectionList, item) => {
        (
          collectionList[item.collectionName] ||
          (collectionList[item.collectionName] = [])
        ).push(item);
        // console.log(collectionList);
        return collectionList;
      },
      {}
    );

  const trendingAuctionSettings = {
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

  const clockTime = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="bid-ends">
        <div>
          <span className="days">{days}</span>
          <span>Days</span>
        </div>
        <div>
          <span className="hours">{hours}</span>
          <span>Hours</span>
        </div>
        <div>
          <span className="minutes">{minutes}</span>
          <span>Min</span>
        </div>
        <div>
          <span className="seconds">{seconds}</span>
          <span>Sec</span>
        </div>
      </div>
    );
  };

  const LiveAuctionsCards = Object.keys(collection).map((elem, index) => (
    <div key={index}>
      <div className="item-card card shadow-sm bg-gray border-0">
        <div className="card-body">
          <div className="img-wrap">
            {/* Image */}
            <img src={collection[elem][0].itemId.imgUrl} alt={elem} />

            {/* Bid End */}
            <Dropdown className={`section-dropdownVisibility`}>
              <Dropdown.Toggle
                className="rounded-pill shadow-sm"
                style={{ backgroundColor: "white" }}
                id={`discoverID${elem}`}
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
                      `${API}collection/bidding/${elem}`
                    );
                    setTimeout(() => setCopy(false), 500);
                  }}
                >
                  <i className={`me-2 bi bi-file-earmark`}></i>
                  {copy ? "Copied" : "Copy link"}
                </button>
              </Dropdown.Menu>
            </Dropdown>
            {/* <Countdown date={elem.bidEndsTime} intervalDelay={0} renderer={clockTime} /> */}
          </div>

          {/* Others Info */}
          <div className="row gx-2 align-items-center mt-3">
            <div className="col-8">
              <span className="d-block fz-12">
                {/* <i className={`bi ${elem.topLevelInfo[0].icon} me-1`} /> */}
                {collection[elem].length <= 0
                  ? "Out of stock"
                  : `${collection[elem].length} available`}
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="row gx-2 align-items-center mt-2">
            <div className="col-8" style={{ width: "100%" }}>
              <div className="name-info d-flex align-items-center">
                {/* <div className="author-img position-relative">
                                    <img className="shadow" src={`${process.env.PUBLIC_URL}/${elem.authorAvater}`} alt={elem.authorName} />
                                    <i className={`bi bi-check position-absolute bg-success ${elem.authorVerified}`} />
                                </div> */}

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
                    overlay={<Tooltip id={`liveAuctionNFT`}>{elem}</Tooltip>}
                  >
                    <h5
                      className="name d-block hover-primary text-truncate"
                      style={{
                        marginBottom: 0,
                        cursor: "pointer",
                      }}
                    >
                      {elem}
                    </h5>
                  </OverlayTrigger>
                </div>
              </div>
            </div>

            {/* <div className="col-4" style={{width: '100%'}}>
                            <div className="price text-end" style={{display: 'flex', alignItems: 'center'}}>
                                <h6 className="d-block" style={{marginBottom: 0, marginRight: '4px'}}>Highest Price:</h6>
                                <h6 className="mb-0">{elem.currentPrice}</h6>
                            </div>
                        </div> */}

            <div className="col-12">
              {collection[elem].length <= 0 ? (
                <button
                  className={`btn btn-primary rounded-pill btn-sm mt-3 w-100`}
                  disabled
                  style={{ backgroundColor: "gray", border: "none" }}
                >
                  {/* <i className={`bi ${elem.buttonInfo[0].icon} me-1`} ></i> */}
                  Browse
                </button>
              ) : (
                <Link
                  className={`btn btn-primary rounded-pill btn-sm mt-3 w-100`}
                  to={`/collection/bidding/${elem}`}
                >
                  {/* <i className={`bi ${elem.buttonInfo[0].icon} me-1`} ></i> */}
                  Browse
                </Link>
              )}
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
                src={`${process.env.PUBLIC_URL}/${icon}`}
                alt=""
              />
              <h4 className="mb-0">{title}</h4>
            </div>
            <Link className="btn btn-primary btn-minimal" to={"/collection"}>
              View all
            </Link>
          </div>
          <h6>Check out our item collection</h6>
          <div className="trending-auction-slide">
            <TinySlider settings={trendingAuctionSettings}>
              {LiveAuctionsCards}
            </TinySlider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemExchangeIntro;
