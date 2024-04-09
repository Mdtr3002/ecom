import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Dropdown from "react-bootstrap/Dropdown";
import Divider from "../components/divider/Divider";
import DiscoverNFTData from "../data/demos/collection-dashboard.json";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import MarketPlaceServices from "../services/marketplace.service";
import NotFoundContent from "../components/notFound/NotFound";
import { API } from "../config";

import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_INVENTORY } from "../action-types";
import Footer from "../components/footer/Footer";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const mockItemList = [
  {
    _id: "123123",
    ownerId: "6x123123123",
    name: "Khoa",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/gdsc-game-ec439.appspot.com/o/image%2FMerchandise%2Fkeychain.jpg?alt=media&token=34f75470-300f-4983-8be1-39fc5d847c4e",
    description: "An example description",
    currentPrice: 123456,
    collectionName: "Keychain",
    priceHistory: [
      {
        name: "Khoa",
        email: "tndangkhoa218@gmail.com",
        createdAt: 1676483931773,
        price: 123456,
      },
    ],
  },
];

export default function MyInventory() {
  // const [count, setCount] = useState(12);
  // const [noMorePost, setNoMorePost] = useState(false);
  const { inventory } = useSelector((state) => state.marketplace);
  const [test, setTest] = useState(DiscoverNFTData);
  const [copy, setCopy] = useState([]);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    MarketPlaceServices.getAllUserItems()
      .then((res) => {
        dispatch({
          type: UPDATE_INVENTORY,
          payload: res?.data?.payload || [] /* mockItemList */,
        });
        console.log(res?.data?.payload);
        // dispatch({ type: UPDATE_INVENTORY, payload: mockItemList });
      })
      .catch((err) => {
        console.log("Error in get marketplace items ", err);
      });
  }, []);
  // console.log('inventory', inventory);
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

  if (inventory.length === 0) {
    return (
      <>
        <Breadcrumb
          breadcrumbTitle="Inventory"
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
          subHeading="Explore Market. Play Games. Win Prizes. Visit the tutorial for more details."
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

  const CollectionCards = inventory.map((elem, index) => (
    <>
      <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div className="item-card card shadow-sm">
          <div className="card-body">
            <div className="img-wrap">
              {/* Image */}
              <img src={elem.imgUrl} alt={elem.collectionName} />

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
                        `${API}inventory/${elem._id}`
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

            {/* Item name */}

            <div className="row gx-2 align-items-center mt-3">
              <h5 className="text-truncate">
                {elem.name}{" "}
                <img
                  className="me-1"
                  src={`${process.env.PUBLIC_URL}/img/core-img/fire.png`}
                  alt=""
                />
              </h5>
            </div>
            <div className="row gx-2 align-items-center">
              <div>
                {/* <span className="d-block fz-16" style={{color: 'white'}}>
                  Description: {elem.description}
                </span> */}
                {elem.isReceived === false &&
                  elem.isRequestToReceiveItem === false && (
                    <span className="d-block fz-16" style={{ color: "white" }}>
                      Status: Not yet received
                    </span>
                  )}
                {elem.isReceived === false &&
                  elem.isRequestToReceiveItem === true && (
                    <span className="d-block fz-16" style={{ color: "white" }}>
                      Status: Delivering
                    </span>
                  )}
                {elem.isReceived === true &&
                  elem.isRequestToReceiveItem === true && (
                    <span className="d-block fz-16" style={{ color: "white" }}>
                      Status: Received
                    </span>
                  )}
              </div>
            </div>
            {/* Button */}
            <div
              className="row gx-2 align-items-center mt-3"
              style={{ justifyContent: "center" }}
            >
              <div className="col-6" style={{ width: "fit-content" }}>
                <Link
                  className="btn btn-primary rounded-pill btn-sm"
                  to={`/inventory/${elem._id}`}
                >
                  <i className="bi"></i>
                  More Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
        breadcrumbTitle="Inventory"
        breadcrumbNav={[
          {
            navText: "Home",
            path: "/",
          },
        ]}
      />

      <Divider />

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
        <div className="row g-4 justify-content-center">{CollectionCards}</div>
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

      <Divider />
    </>
  );
}
