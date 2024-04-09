import { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import { Link, useParams } from "react-router-dom";
import Countdown from 'react-countdown';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Divider from "../divider/Divider";
import LiveAuctionData from "../../data/liveAuction/live-auction.json";
import PriceModal from "../modal/PriceModal";

import MarketPlaceServices from "../../services/marketplace.service";

const LiveAuctionDetails = () => {
    const state = useLocation();
    const bidID = useParams().BIDSID;
    const [bidsdata, setBidData] = useState({});
    const [secondTabContent, setSecondTabContent] = useState();

    useEffect(() => {
        MarketPlaceServices.getMarketPlaceItemById(state.pathname.slice(10)).then((res) => {
            setBidData(res.data.payload);
            // console.log(res.data.payload);
        });
    }, [])

    useEffect(() => setSecondTabContent(bidsdata.priceHistory), [bidsdata])
    
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
    const firstTabContent = [];
    const [ price, setPrice ] = useState(bidsdata.currentPrice);

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

    const [modalShow, setModalShow] = useState(false);

    const [key, setKey] = useState('details');

    const relatedProjectSlides = {
        'items': 4,
        'gutter': 24,
        'slideBy': 1,
        'autoplay': true,
        'autoplayButtonOutput': false,
        'autoplayTimeout': 5000,
        'speed': 750,
        'loop': true,
        'mouseDrag': true,
        'controls': true,
        'nav': false,
        'controlsText': [('<i class="bi bi-arrow-left"></i>'), ('<i class="bi bi-arrow-right"></i>')],
        'responsive': {
            320: {
                'items': 1,
            },
            480: {
                'items': 1.3,
            },
            576: {
                'items': 2,
            },
            768: {
                'items': 2.4,
            },
            992: {
                'items': 3,
            },
            1200: {
                'items': 3.5,
            },
            1400: {
                'items': 4,
            }
        }
    };

    const LiveAuctionsCards = LiveAuctionData.map((elem, index) => (
        <div key={index}>
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
                    
                        {/* Dropdown */}
                        <Dropdown className={`section-${elem.dropdownVisibility}`} >
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
                        </Dropdown>

                        {/* Bid End */}
                        {/* <Countdown date={elem.bidEndsTime} intervalDelay={0} renderer={clockTime} /> */}
                    </div>

                    {/* Others Info */}
                    <div className="row gx-2 align-items-center mt-3">
                        <div className="col-8">
                            <span className="d-block fz-12">
                                <i className={`bi ${elem.topLevelInfo[0].icon} me-1`} />
                                {elem.topLevelInfo[0].text}
                            </span>
                        </div>
                        <div className="col-4 text-end">
                            <button 
                                className="wishlist-btn" 
                                type="button"
                            >
                                <i className="bi" />
                            </button>
                        </div>
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
                                to={elem.buttonInfo[0].url} 
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
            <Breadcrumb 
                breadcrumbTitle="Details" 
                breadcrumbNav={[
                    {
                        navText: "Home",
                        path: "/"
                    },
                    {
                        navText: "Live Bids",
                        path: "/live-bidding"
                    }
                ]}
            />

            <Divider />
            
            {/* Item Details */}
            <div className="item-details-wrap">
                <div className="container">
                    <div className="row g-4 g-lg-5 align-items-center justify-content-center">
                        {/* Item Thumbnail */}
                        <div className="col-12 col-md-12 col-lg-6">
                            <div className="item-big-thumb">
                                <Zoom 
                                    overlayBgColorStart="rgba(0, 0, 0, 0)" 
                                    overlayBgColorEnd="rgba(0, 0, 0, 0.95)"
                                    transitionDuration={400}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/img/bg-img/9.jpg`} alt="Bid Item Detail" />
                                </Zoom>
                            </div>
                        </div>

                        {/* Item Details Content */}
                        <div className="col-12 col-md-10 col-lg-6">
                            <div className="item-details-content mt-5 mt-lg-0">
                                <PriceModal 
                                    itemId={bidID}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    price={bidsdata.currentPrice}
                                />
                                <div className="d-flex flex-wrap align-items-center">
                                    {/* Wishlist */}
                                    {/* <button className="btn btn-danger btn-sm rounded-pill px-3 wishlist-btn" type="button">
                                        <i className="bi" />
                                        <span className="ms-1">
                                            22
                                        </span>
                                    </button> */}

                                    {/* Badge */}
                                    {secondTabContent && (
                                        <div className="btn btn-danger badge border px-3 py-2 rounded-pill fz-14 d-inline-block">
                                            <i className="me-1 bi bi-eye" />
                                            {Object.keys(secondTabContent).length} bidding now
                                        </div>
                                    )}
                                </div>
                                
                                {/* Title */}
                                <h2 className="my-3">
                                    Title
                                </h2>

                                <div className="d-flex align-items-center mb-4">
                                    {/* Author Image */}
                                    {/* <div className="author-img position-relative me-3">
                                        <img 
                                            className="shadow" 
                                            src={`${process.env.PUBLIC_URL}/${bidsdata.authorAvater}`} 
                                            alt={bidsdata.authorName} 
                                        />
                                        <i className={`bi bi-check position-absolute bg-primary ${bidsdata.authorVerified}`} />
                                    </div> */}

                                    {/* Name & Author */}
                                    <div className="name-author">
                                        <span className="d-block fz-14">Created by</span>
                                        <div 
                                            className="author d-block fz-16 hover-primary text-truncate" 
                                        >
                                            @author
                                        </div>
                                    </div>
                                </div>

                                <div className="border-top w-75 mb-4" />

                                {/* Bids Countdown */}
                                <p className="lh-1">Bid ending soon</p>
                                <Countdown date={new Date(bidsdata.expiredAt)} intervalDelay={0} renderer={clockTime} />
                                
                                <div className="mb-4"></div>

                                <div className="row align-items-end">
                                    <div className="col-6 col-sm-4">
                                        <p className="mb-2">Curent Bid</p>
                                        <h5 className="text-center mb-0 border border-2 px-3 py-2 border-primary d-inline-block rounded text-primary w-100">
                                            {bidsdata.currentPrice}
                                        </h5>
                                    </div>
                                    <div className="col-6 col-sm-4 col-lg-5">
                                        <Link className='btn btn-primary rounded-pill w-100' to='#' onClick={() => setModalShow(true)} >
                                            <img 
                                                className="me-1" 
                                                src={`${process.env.PUBLIC_URL}/img/core-img/fire.png`} 
                                                alt="" />
                                            Place Bid
                                        </Link>
                                    </div>
                                </div>

                                <div className="border-top w-75 my-4" />

                                {/* Short Description */}
                                <div className="short-description">
                                    <h5>Short Description</h5>
                                    <p className="mb-0" dangerouslySetInnerHTML={{__html: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque aut veniam consectetur magnam libero, natus eius numquam reprehenderit hic at, excepturi repudiandae magni optio odio doloribus?"}} >
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-block w-100 mb-70" />
            
            {/* Tabs */}
            <div className={`funto-tab-area`} >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab--area bg-gray p-4 p-lg-5">
                                <Tabs
                                    id="itemDetailsTab"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                    >
                                    <Tab eventKey="details" title="Details">
                                        {firstTabContent.map((elem, index) => (
                                            <div key={index} dangerouslySetInnerHTML={{__html: elem}} ></div>
                                        ))}
                                    </Tab>

                                    <Tab eventKey="activity" title="Bid History">
                                        <div className="table-responsive border shadow-sm activity-table bg-white">
                                            <table className="table mb-0">
                                                {secondTabContent && (
                                                    <tbody>
                                                    <tr key={0} >
                                                            <th scope="row">
                                                                User
                                                            </th>
                                                            <td>
                                                                Bidding Price
                                                            </td>
                                                            <td>
                                                                Created At
                                                            </td>
                                                        </tr>
                                                    {Object.values(secondTabContent).map((ele, index) => (
                                                        <tr key={index+1} >
                                                            <th scope="row">
                                                                {ele.email}
                                                            </th>
                                                            <td>
                                                                {ele.price}
                                                            </td>
                                                            <td>
                                                                {unixTimeConvert(ele.createdAt)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                )}
                                            </table>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />
        </>
    )
}

export default LiveAuctionDetails;
