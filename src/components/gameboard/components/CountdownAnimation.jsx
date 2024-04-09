import Lottie from 'lottie-react';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import googleLoading from '../../../assets/animation/countdown.json';

export default function CountdownAnimation() {
  const lottieRef = useRef();
  useEffect(() => lottieRef.current.setSpeed(2), [])
  const { isAuthenticate } = useSelector((state) => state.auth);
  if(!isAuthenticate) return (
    <div className='wheel-wrapper'
    //   className={`fixed z-50 inset-0 ${
    //     background ? 'bg-gdscGrey-100 bg-opacity-50' : 'bg-white'
    //   } flex justify-center items-center ${show ? 'block' : 'hidden'}`}
    >
      <Lottie speed={10} lottieRef={lottieRef} animationData={googleLoading} loop />
    </div>
  );
  return (
    <div className='wheel-wrapper-log-in countdown'
    //   className={`fixed z-50 inset-0 ${
    //     background ? 'bg-gdscGrey-100 bg-opacity-50' : 'bg-white'
    //   } flex justify-center items-center ${show ? 'block' : 'hidden'}`}
    >
      <Lottie speed={10} lottieRef={lottieRef} animationData={googleLoading} loop />
    </div>
  )
}
