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
import OpenChestAnimation from "./OpenChestAnimation";

const Wheel = () => {

  const dispatch = useDispatch();
  const { isWheelOpen: open, gameReward } = useSelector((state) => state.game);

  useEffect(() => {
  }, [open])

  const on_complete = (prize) => {
    switch (prize) {
      case "1000xu":
        dispatch(updateReward( gameReward + 1));
        break;
      case "100xu":
        dispatch(updateReward( gameReward + 2));
        break;
      case "500xu":
        dispatch(updateReward( gameReward + 3));
        break;
      case "2000xu":
        dispatch(updateReward( gameReward + 4));
        break;
      case "mask":
        dispatch(updateReward( gameReward + 5));
        break;
      case "serum":
        dispatch(updateReward( gameReward + 6));
        break;
      default:
        break;
    }

    dispatch({ type: WHEEL_CLOSE });
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

  // if (!open)
  //   return <></>

  return (
    <div className="wheel-wrapper" >
        <div aria-hidden onClick={() => dispatch({ type: WHEEL_CLOSE })}>Close</div>
        <div className="game-box">
          {/* <Roulette {...roulette_props} /> */}
          <OpenChestAnimation />
        </div>
    </div>
  );
};

export default Wheel;
