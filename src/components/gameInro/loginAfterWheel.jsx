import React from "react";
import { useDispatch } from "react-redux";
import { login } from '../../actions/auth';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function LoginAfterWheel({ show = false, onClose, prize = "prizeName", imgUrl }) {
    const { isAuthenticate } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if(!isAuthenticate)
    return (
        <div className={`login-modal ${show ? 'appear' : 'hide'}`}>
                <div className={`login-box ${isAuthenticate ? 'ml-252' : ''}`}>
                    {/* <p>
                        You have completed 5 trial levels. If you want to challenge higher rounds, save your GCoin as well as unlock other awesome features from GDSC Game including: the Mystery Wheel, Prize Exchange, Create and Participate in auctions, log in with your Google Account right now!
                    </p>
                    <Link to="/login">Log In</Link>
                    <button onClick={onClose}>Close</button> */}
                        <div className="game-slide">
                            <h1>Congratulation, You get "{prize}" from the wheel</h1>
                            <span><b>Want to save this prize. Login now to your Google Account</b></span>
                            <p><b>There are other amazing features waiting to be explored</b></p>
                            <img src={require('../../assets/image/gameDemo.png')} alt="Game Demo" className="prize-img" />
                            {isAuthenticate && (
                                <button className="btn btn-success login" type="submit" 
                                    onClick={async () => {
                                    dispatch(login());
                                    await navigate("/");
                                }}>
                                Log In
                                </button>
                            )}
                            <button className="replay-btn" onClick={onClose}>
                                Replay<img src={require('../../assets/icon/refresh.png')} alt="restart" />
                            </button>
                        </div>
                </div>
        </div>
    )
    return (
        <div className={`login-modal ml-252 ${show ? 'appear' : 'hide'}`}>
                <div className="login-box">
                    {/* <p>
                        You have completed 5 trial levels. If you want to challenge higher rounds, save your GCoin as well as unlock other awesome features from GDSC Game including: the Mystery Wheel, Prize Exchange, Create and Participate in auctions, log in with your Google Account right now!
                    </p>
                    <Link to="/login">Log In</Link>
                    <button onClick={onClose}>Close</button> */}
                        <div className="game-slide">
                            <h1>Congratulation, You get "{prize}" from the Mystery Box</h1>
                            <img src={imgUrl} alt="Game Demo" className="prize-img" />
                            {isAuthenticate && (
                                <Link className="btn btn-success login" type="submit" 
                                    to={`${process.env.PUBLIC_URL}/collection`}
                                >
                                To My Collection
                                </Link>
                            )}
                            <button className="replay-btn" onClick={onClose}>
                                Close <i className="bi bi-x-lg" />
                            </button>
                        </div>
                </div>
        </div>
    )
}
