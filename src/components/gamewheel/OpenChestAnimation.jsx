import Lottie from 'lottie-react';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import openChest from '../../assets/animation/open_chest.json';
import { WHEEL_CLOSE } from '../../action-types';

export default function OpenChestAnimation() {
  const state = useLocation();
  // console.log(state);
  const lottieRef = useRef();
  const { isWheelOpen: open, gameReward } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  useEffect(() => {
    lottieRef.current.stop();
  }, [])
//   const openChest = () => {
//     setPLay(true)
//   }
  const { isAuthenticate } = useSelector((state) => state.auth);
  if(!open) return <></> 
  return (
    <div className='wheel-wrapper'
    style={{ display: 'flex', flexDirection: 'column' }}
    //   className={`fixed z-50 inset-0 ${
    //     background ? 'bg-gdscGrey-100 bg-opacity-50' : 'bg-white'
    //   } flex justify-center items-center ${show ? 'block' : 'hidden'}`}
    >
      <Lottie lottieRef={lottieRef} animationData={openChest} />
      <button
            className="start-btn btn rounded-pill"
            style={{
              backgroundColor: "#6f42c1",
              border: 'none',
            }}
            onClick={() => {
                lottieRef.current.play();
                setTimeout(() => {
                    lottieRef.current.stop();
                    dispatch({ type: WHEEL_CLOSE })
            }, 4000)
            }}
          >
            Open
        </button>
    </div>
  );
}
