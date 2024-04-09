import { Link } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import ScrollAnimation from "react-animate-on-scroll";
import { useState, useEffect } from "react";
import MarketPlaceServices from "../../../services/marketplace.service";
import TinySlider from "tiny-slider-react";
import { API } from "../../../config";

import FeaturedNFTData from "../../../data/demos/collection-dashboard.json";

const FeaturedCard = (props) => {
    const { title, buttonText, buttonPath, animationTime, reload } = props;
    const [copy, setCopy] = useState(false);
    const [collection, setCollection] = useState([]);
    // console.log(collection)
    useEffect(() => {
        MarketPlaceServices.getAllMarketPlaceItem().then((res) => {
            setCollection((res.data.payload));
        }).catch((err) => {
            // console.log('Error in get marketplace items ',err);
        })
    },[]);
    const trendingAuctionSettings = {
        'items': 1,
        'gutter': 24,
        'slideBy': 1,
        'autoplay': true,
        'autoplayButtonOutput': false,
        'autoplayTimeout': 5000,
        'speed': 750,
        'loop': true,
        'mouseDrag': true,
        'controls': false,
        'nav': false,
        'responsive': {
            320: {
                'items': 1,
            },
            576: {
                'items': 1.8,
            },
            768: {
                'items': 2.5,
            },
            992: {
                'items': 2,
            },
            1200: {
                'items': 4,
            },
            1400: {
                'items': 4,
            }
        }
    };

    const FeaturedNFTCards = collection.slice(0, 4).map((elem, index) => (
        <div key={index} className="col-12 col-sm-10 col-md-6 col-xl-4 dashboard" >
            <div className="item-card card featured-card border-0 bg-gray">
                <div className="img-wrap">
                    {/* Image */}
                    <img src={elem.itemId.imgUrl} alt={elem?.itemId?.name} />
                    
                    {/* Badge */}
                    {/* <div className={`badge bg-${elem.badgeColor} position-absolute section-${elem.badgeVisibility}`} >
                        <img src={`${process.env.PUBLIC_URL}/${elem.badgeIcon}`} alt={elem.badgeText} />
                        {elem.badgeText}
                    </div> */}

                    {/* Dropdown */}
                    <Dropdown>
                        <Dropdown.Toggle className="rounded-pill shadow-sm" style={{backgroundColor: 'white'}} id={`ddID${elem._id}`}>
                            <i className="bi bi-three-dots-vertical" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end" >
                            <button key={0} className="dropdown-item" onClick={() => {
                                setCopy(true);
                                navigator.clipboard.writeText(`${API}collection/bidding/${elem.collectionName}/${elem._id}`);
                                setTimeout(() => setCopy(false), 500);
                            }} >
                                <i className={`me-2 bi bi-file-earmark`} ></i>
                                {copy ? 'Copied' : 'Copy link'}
                            </button>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="card-body">
                    {/* Others Info */}
                    <div className="row gx-2 align-items-center">
                        {/* <div className="col-8">
                            <span className="d-block fz-12">
                                <i className={`bi ${elem.topLevelInfo[0].icon} me-1`} />
                                {elem.quantity <= 0 ? 'Out of stock' : `${elem.quantity} available`}
                            </span>
                        </div> */}
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
                        <div>
                            <div className="name-info d-flex align-items-center" >                                
                                {/* <div className="author-img position-relative">
                                    <img className="shadow" src={`${process.env.PUBLIC_URL}/${elem.authorAvater}`} alt={elem.authorName} />
                                    <i className={`bi bi-check position-absolute bg-success ${elem.authorVerified}`} />
                                </div> */}

                                <div className="name-author" style={{width: '100%', maxWidth: '100%'}}>
                                    <OverlayTrigger placement="top" 
                                        delay={{ show: 250, hide: 400 }} 
                                        overlay={
                                            <Tooltip id={`featuredNFT${elem.id}`}>
                                                {elem.collectionName}
                                            </Tooltip>
                                        }
                                    >
                                        <h5 
                                            className="name d-block hover-primary text-truncate" 
                                            style={{marginBottom: 0 ,cursor: 'pointer', color: 'white'}}
                                        >
                                            {elem?.itemId?.name || elem?.name}
                                        </h5>
                                    </OverlayTrigger>
                                    
                                    {/* <Link 
                                        className="author d-block fz-12 hover-primary text-truncate" 
                                        to={`${process.env.PUBLIC_URL}/author/${elem.authorName}`}
                                    >
                                        @{elem.authorName}
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-4" style={{width: '100%'}}>
                            <div className="price text-end" style={{display: 'flex', alignItems: 'center'}}>
                                <h6 className="d-block" style={{marginBottom: 0, marginRight: '4px'}}>Current Bid:</h6>
                                <h6 className="mb-0">{elem.currentPrice}</h6>
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="row gx-2 align-items-center mt-3">
                        <div>
                            <Link className={`btn btn-primary rounded-pill btn-sm`} reloadDocument={reload} to={`../collection/bidding/${elem.collectionName}/${elem._id}`}>
                                Place Bid
                            </Link>
                        </div>
                        {/* <div className="col-6 text-end">
                            <Link className={`btn btn-${elem.buttonGroup[1].rightButtonStyle} btn-sm hover-primary`} to={elem.buttonGroup[1].rightButtonURL} >
                                <i className={`bi ${elem.buttonGroup[1].rightButtonIcon} me-1`} ></i>
                                {elem.buttonGroup[1].rightButtonText}
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    ))

    return(
        <div className="col-12">
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                                <img className="me-1" src={`${process.env.PUBLIC_URL}/img/core-img/notification.png`} alt="" />
                                <h4 className="mb-0">
                                    {title}
                                </h4>
                            </div>
                            <Link className="btn btn-primary btn-minimal" to={buttonPath} >
                                {buttonText}    
                            </Link>
                        </div>
                        <h6>Bid your GCoins for these unique prizes</h6>
                        <div className="row g-4 justify-content-center" style={{padding: '12px'}}>
                            {/* {FeaturedNFTCards} */}
                            <TinySlider settings={trendingAuctionSettings}>
                                {FeaturedNFTCards}
                            </TinySlider>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default FeaturedCard;
