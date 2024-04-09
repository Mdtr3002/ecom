import Lottie from 'lottie-react';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import biddingAnimation from '../../../assets/animation/bidding.json';

export default function BiddingAnimation() {
  const lottieRef = useRef();
  return (
    <div style={{width: '180px', alignSelf: 'center', marginTop: '20px'}}>
      <Lottie lottieRef={lottieRef} animationData={biddingAnimation} loop />
    </div>
  )
}