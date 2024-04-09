import React from "react";
import { useDispatch } from "react-redux";
import { login } from '../../actions/auth';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GameCleared({ show = false, onClose, gameName = "" }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticate } = useSelector((state) => state.auth);
    return (
            <div className={`login-modal ${show ? 'appear' : 'hide'}`}>
            <div className={`login-box ${isAuthenticate ? 'ml-252' : ''}`} >
                    {/* <p>
                        You have completed 5 trial levels. If you want to challenge higher rounds, save your GCoin as well as unlock other awesome features from GDSC Game including: the Mystery Wheel, Prize Exchange, Create and Participate in auctions, log in with your Google Account right now!
                    </p>
                    <Link to="/login">Log In</Link>
                    <button onClick={onClose}>Close</button> */}
                    <div className="game-slide">
                            <span><b>Congratulation!!! You have cleared {gameName}</b></span>
                            <p><b>One Digital Stamp has been awarded to your account</b></p>
                            <button className={`${isAuthenticate ? "btn btn-success login" : "replay-btn"}`}onClick={onClose}>
                                Replay<img src={require('../../assets/icon/refresh.png')} alt="restart" />
                            </button>
                    </div>
            </div>
        </div>
    )
}
