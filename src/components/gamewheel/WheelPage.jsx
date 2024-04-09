import React, { useState } from "react";
import Roulette from "./Roulette";
import "../../assets/scss/_wheel.scss";
import highlight_img from "../../assets/images/hightlight.png";
import pointer_img from "../../assets/images/pointer.png";
import roulette_img_under_highlight from "../../assets/images/rou_under_high.png";
import roulette_img_on_highlight from "../../assets/images/rou_on_high.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {  WHEEL_CLOSE } from "../../action-types";
import { useEffect } from "react";
import { updateReward } from "../../actions/game";
import WheelAnimation from "./LoadingAnimation";

const WheelPage = () => {
  const [prizeImg, setPrizeImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const dispatch = useDispatch();
  const { isWheelOpen: open, gameReward } = useSelector((state) => state.game);
  // console.log(open ? 'open' : 'closed');

  useEffect(() => {
    setPrizeImg("");
    setShowReward("");
  }, [open])

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 4000);
  }, [])

  const on_complete = (prize) => {
    // TODO: open login requried 
    switch (prize) {
      case "1000xu":
        dispatch(updateReward( gameReward + 1));
        setPrizeImg("1000xu.png");
        break;
      case "100xu":
        dispatch(updateReward( gameReward + 2));
        setPrizeImg("100xu.png");
        break;
      case "500xu":
        dispatch(updateReward( gameReward + 3));
        setPrizeImg("500xu.png");
        break;
      case "2000xu":
        dispatch(updateReward( gameReward + 4));
        setPrizeImg("2000xu.png");
        break;
      case "mask":
        dispatch(updateReward( gameReward + 5));
        setPrizeImg("mask.png");
        break;
      case "serum":
        dispatch(updateReward( gameReward + 6));
        setPrizeImg("serum.png");
        break;
      default:
        break;
    }
  };

  const roulette_props = {
    roulette_img_under_highlight,
    roulette_img_on_highlight,
    highlight_img,
    pointer_img,
    prize_arr: ["1000xu", "vp", "100xu", "500xu", "2000px", "vp"],
    on_complete,
    has_reset: true,
    start_text: "START",
  };

if(loading) return (
    <WheelAnimation />
)

  return (
    <div className="wheel-wrapper-log-in" onClick={() => dispatch({ type: WHEEL_CLOSE })}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="game-box">
          <Roulette {...roulette_props} />
        </div>
        {showReward ? (
          <div>
            <div className="reward">
              <p>You have earned {gameReward}</p>
              <img src={prizeImg} alt={gameReward} />
              <button
                className="btn-close"
                onClick={() => {
                  setShowReward(false);
                  document.querySelector(".reset-btn").click();
                }}
              >
                Đóng
              </button>
            </div>
            <div className="mask" />
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default WheelPage;
