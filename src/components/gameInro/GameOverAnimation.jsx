import Lottie from 'lottie-react';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import GameOver from '../../assets/animation/game-over.json';

export default function GameOverAnimation() {
  const lottieRef = useRef();
  return (
    <div style={{width: '180px', alignSelf: 'center'}}>
      <Lottie lottieRef={lottieRef} animationData={GameOver} loop />
    </div>
  )
}