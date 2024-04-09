import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CollectionData from "../../data/collection/collection.json";
import MarketPlaceServices from "../../services/marketplace.service";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_COLLECTION } from "../../action-types";
import { useMemo } from "react";
import { Dropdown } from "react-bootstrap";
import { API } from "../../config";

const example = [
  {
    _id: "63f733bb185e0976acdf916c",
    itemId: {
      _id: "63f733ba185e0976acdf9168",
      ownerId: "63f34a11deecb6f2d3dcba5d",
      name: "Logitech G102",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/gdsc-game-ec439.appspot.com/o/Chuot-Gaming-Logitech-G102-Gen-2-LIGHTSYNC.webp?alt=media&token=7cfdd7d6-5ffe-478b-86f8-337794337083",
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

const SpecialBidContent = () => {
  const [count, setCount] = useState(9);
  const [noMorePost, setNoMorePost] = useState(false);
  const [copy, setCopy] = useState(false);

  const [collection, setCollection] = useState(example);
  const dispatch = useDispatch();

  useEffect(() => {
    // MarketPlaceServices.getAllMarketPlaceItem().then((res) => {
    //     setCollection(collectionReduce(res.data.payload));
    // }).catch((err) => {
    //    // console.log('Error in get marketplace items ',err);
    // })
  }, []);

  useEffect(() => {
    dispatch({ type: UPDATE_COLLECTION, payload: collection });
  }, [collection]);

  // console.log('test', collection);

  const handleLoadMore = () => {
    setCount(count + 3);
    if (count >= Object.keys(collection).length) {
      setNoMorePost(true);
    }
  };

  const SpecialBidCards = collection.map((elem, index) => (
    <>
      <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div className="item-card card shadow-sm">
          <div className="card-body">
            <div className="img-wrap">
              {/* Image */}
              <img src={elem?.itemId?.imgUrl} alt={elem.collectionName} />

              {/* Badge */}
              {/* Dropdown */}
              {/* <Dropdown>
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
                        `${API}iventory/${elem._id}`
                      );
                      setTimeout(() => setCopy(false), 500);
                    }}
                  >
                    <i className={`me-2 bi bi-file-earmark`}></i>
                    {copy ? "Copied" : "Copy link"}
                  </button>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>

            {/* Obtained on */}

            {/* Item name */}

            <div className="row gx-2 align-items-center mt-3">
              <h5 className="text-truncate">
                {elem?.itemId?.name}{" "}
                <img
                  className="me-1"
                  src={`${process.env.PUBLIC_URL}/img/core-img/fire.png`}
                  alt=""
                />
              </h5>
            </div>
            <div className="row gx-2 align-items-center">
              <div>
                <span className="d-block fz-16" style={{ color: "white" }}>
                  Coming Soon
                </span>
              </div>
            </div>
            {/* Button */}
            <div
              className="row gx-2 align-items-center mt-3"
              style={{ justifyContent: "center" }}
            >
              <div className="col-6" style={{ width: "fit-content" }}>
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
    </>
  ));

  return (
    <div className="collection-wrapper">
      <div className="container">
        <div className="row g-4">{SpecialBidCards}</div>
      </div>

      {/* <div className="container">
        <div className="text-center mt-70">
          <button
            className="btn btn-primary px-4 rounded-pill"
            onClick={() => handleLoadMore()}
            disabled={noMorePost ? "disabled" : null}
          >
            {noMorePost ? (
              <span className="d-flex align-items-center">
                No Items Here
                <i className="ms-2 bi bi-emoji-frown" />
              </span>
            ) : (
              <span className="d-flex align-items-center">
                View More Items
                <i className="ms-2 bi bi-arrow-repeat" />
              </span>
            )}
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default SpecialBidContent;
