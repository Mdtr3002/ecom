import Lottie from "lottie-react";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import coinSpinning from "../../../assets/animation/coin-spinning.json";

export default function CoinAnimation() {
  const lottieRef = useRef();
  return (
    <div style={{ width: "200px", alignSelf: "center" }}>
      <Lottie lottieRef={lottieRef} animationData={coinSpinning} loop />
    </div>
  );
}
