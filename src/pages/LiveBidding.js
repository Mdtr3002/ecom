import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';

import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import LiveAuctionData from "../data/liveAuction/live-auction.json";

import MarketPlaceServices from '../services/marketplace.service';

const LiveBidding = () => {
    const [count, setCount] = useState(12);
    const [noMorePost, setNoMorePost] = useState(false);
    const countSlice = LiveAuctionData.slice(0, count);
    const [bidItems, setBidItems] = useState({});

    useEffect(() => {
        MarketPlaceServices.getMyFollowedBids().then((res) => {
            setBidItems(res.data.payload);
        });
    }, [])

    const handleLoadMore = () => {
        setCount(count + 4);
        if(count >= LiveAuctionData.length) {
            setNoMorePost(true);
        }
    }
    const unixTimeConvert = (unixStamp) => {
        var a = new Date(unixStamp);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
        return time;
    }
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

    const LiveAuctionsCards = Object.values(bidItems).map((elem) => (
        <div key={elem._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div className="item-card card shadow-sm">
                <div className="card-body">
                    <div className="img-wrap">
                        {/* Image */}
                        <img src={`${process.env.PUBLIC_URL}/img/bg-img/9.jpg`} alt="Bid Item" />

                        {/* Badge */}
                        {/* <div className={`badge bg-${elem.badgeInfo[0].color} position-absolute section-${elem.badgeInfo[0].visibility}`} >
                            <img src={`${process.env.PUBLIC_URL}/${elem.badgeInfo[0].icon}`} alt={elem.badgeInfo[0].text} />
                            {elem.badgeInfo[0].text}
                        </div> */}
                    
                        {/* Dropdown */}
                        {/* <Dropdown className={`section-${elem.dropdownVisibility}`} >
                            <Dropdown.Toggle className="rounded-pill shadow-sm" id={`discoverID${elem.id}`}>
                                <i className="bi bi-three-dots-vertical" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end" >
                                {elem.dropdownInfo.map((item, index) => (
                                    <Link key={index} className="dropdown-item" to={item.dropdownItemURL} >
                                        <i className={`me-2 bi ${item.dropdownItemIcon}`} ></i>
                                        {item.dropdownItemText}
                                    </Link>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown> */}

                        {/* Bid End */}
                        <Countdown date={new Date(elem.expiredAt)} intervalDelay={0} renderer={clockTime} />
                    </div>

                    {/* Others Info */}
                    <div className="row gx-2 align-items-center mt-3">
                        <div className="col-8" style={{ width: '100%' }}>
                            <span className="d-block fz-12">
                                <i className="bi bi-arrow-up me-1" />
                                Upload at {unixTimeConvert(elem.createdAt)}
                            </span>
                        </div>
                        {/* <div className="col-4 text-end">
                            <button 
                                className="wishlist-btn" 
                                type="button"
                            >
                                <i className="bi" />
                            </button>
                        </div> */}
                    </div>

                    {/* Meta Info */}
                    <div className="row gx-2 align-items-center mt-2">
                        <div className="col-8">
                            <div className="name-info d-flex align-items-center">
                                {/* <div className="author-img position-relative">
                                    <img className="shadow" src={`${process.env.PUBLIC_URL}/${elem.authorAvater}`} alt={elem.authorName} />
                                    <i className={`bi bi-check position-absolute bg-success ${elem.authorVerified}`} />
                                </div> */}

                                <div className="name-author">
                                    <OverlayTrigger placement="top" 
                                        delay={{ show: 250, hide: 400 }} 
                                        overlay={
                                            <Tooltip id={`liveAuctionNFT${elem._id}`}>
                                                Max Price: {elem.maxPrice}
                                            </Tooltip>
                                        }
                                    >
                                        <Link className="name d-block hover-primary text-truncate" to={`${process.env.PUBLIC_URL}/live-bid/${elem._id}`} >
                                                Max Price: {elem.maxPrice}
                                        </Link>
                                    </OverlayTrigger>
                                    <div 
                                        className="author d-block fz-12 hover-primary text-truncate" 
                                    >
                                        Min Price: {elem.minPrice}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="price text-end">
                                <span className="fz-12 d-block">Current Bid</span>
                                <h6 className="mb-0">{elem.currentPrice}</h6>
                            </div>
                        </div>

                        <div className="col-12">
                            <Link 
                                className="btn btn-primary rounded-pill btn-sm mt-3 w-100"
                                to={`${process.env.PUBLIC_URL}/live-bid/${elem._id}`}
                            >
                                <i className="bi img/core-img/fire.png me-1" ></i>
                                Place Bid
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
                            <h2 className="mb-0">My Followed Bids</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-bids-wrapper">
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {LiveAuctionsCards}
                    </div>
                </div>

                <div className="container">
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
                </div>
            </div>

            <Divider />
        </>
    )
}

export default LiveBidding;
