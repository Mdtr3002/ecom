import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from 'react-countdown';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";
import LiveBidsData from "../data/dashboard/live-bids-data.json";
import Divider from "../components/divider/Divider";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import MarketPlaceServices from "../services/marketplace.service";

const DashboardLiveBids = () => {
    const [count, setCount] = useState(8);
    const [noMorePost, setNoMorePost] = useState(false);
    const countSlice = LiveBidsData.slice(0, count);

    const handleLoadMore = () => {
        setCount(count + 4);
        if(count >= LiveBidsData.length) {
            setNoMorePost(true);
        }
    }

    // useEffect(() => {
    //     (async () => {
    //         const { data } = await MarketPlaceServices.getMyPublishedBids();
    //         console.log('published data', data)
    //     })();

    // }, [])

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
        )
    }

    const LiveBidCards = countSlice.map((elem, index) => (
        <div key={index} className="col-12 col-sm-6 col-xl-4 col-xxl-3">
            <div className="item-card card shadow-sm">
                <div className="card-body">
                    <div className="img-wrap">
                        {/* Image */}
                        <img src={`${process.env.PUBLIC_URL}/${elem.image}`} alt={elem.title} />

                        {/* Badge */}
                        <div className={`badge bg-${elem.badgeInfo[0].color} position-absolute section-${elem.badgeInfo[0].visibility}`} >
                            <img src={`${process.env.PUBLIC_URL}/${elem.badgeInfo[0].icon}`} alt={elem.badgeInfo[0].text} />
                            {elem.badgeInfo[0].text}
                        </div>

                        {/* Bid End */}
                        <Countdown date={elem.bidEndsTime} intervalDelay={0} renderer={clockTime} />
                    </div>

                    {/* Meta Info */}
                    <div className="row gx-2 align-items-center mt-2">
                        <div className="col-8">
                            <div className="name-info d-flex align-items-center">
                                <div className="author-img position-relative">
                                    <img className="shadow" src={`${process.env.PUBLIC_URL}/${elem.authorAvater}`} alt={elem.authorName} />
                                    <i className={`bi bi-check position-absolute bg-success ${elem.authorVerified}`} />
                                </div>

                                <div className="name-author">
                                    <OverlayTrigger placement="top" 
                                        delay={{ show: 250, hide: 400 }} 
                                        overlay={
                                            <Tooltip id={`liveAuctionNFT${elem.id}`}>
                                                {elem.title}
                                            </Tooltip>
                                        }
                                    >
                                        <Link className="name d-block hover-primary text-truncate" to={`${process.env.PUBLIC_URL}/live-bid/${elem.id}`} >
                                            {elem.title}
                                        </Link>
                                    </OverlayTrigger>
                                    <Link 
                                        className="author d-block fz-12 hover-primary text-truncate" 
                                        to={`${process.env.PUBLIC_URL}/author/${elem.authorName}`}
                                    >
                                        @{elem.authorName}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="price text-end">
                                <span className="fz-12 d-block">{elem.priceText}</span>
                                <h6 className="mb-0">{elem.currentPrice}</h6>
                            </div>
                        </div>

                        <div className="col-12">
                            <Link 
                                className={`btn btn-${elem.buttonInfo[0].style} rounded-pill btn-sm mt-3 w-100`} 
                                to={`/edit-bids/${`6333292494d9bf176433bb6c`}`} /* TODO */
                            >
                                <i className={`bi ${elem.buttonInfo[0].icon} me-1`} ></i>
                                {elem.buttonInfo[0].text}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-9 col-lg-6">
                        <div className="section-heading">
                            <h2 className="mb-0" onClick={async () => {
                                const { data } = await MarketPlaceServices.getMyPublishedBids();
                                // console.log('published data', data)
                            }}>My Published Bids</h2>
                        </div>
                    </div>
                </div>
            </div>
            <CreateNewButton />

            <div className="container">
                <h5 className="mb-3">Your all live bids in one place</h5>

                <div className="row g-4">
                    {LiveBidCards}
                </div>

                <div className="text-center mt-5">
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
            </div>
        </>
    )
}

export default DashboardLiveBids;
