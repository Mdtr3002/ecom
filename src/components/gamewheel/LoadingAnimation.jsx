import Lottie from 'lottie-react';
import React from 'react';

import googleLoading from '../../assets/animation/wheel-loading.json';

export default function WheelAnimation({ show, background }) {
  return (
    <div className='wheel-wrapper-log-in'
    style={{ width: '20vw', margin: 'auto' }}
    //   className={`fixed z-50 inset-0 ${
    //     background ? 'bg-gdscGrey-100 bg-opacity-50' : 'bg-white'
    //   } flex justify-center items-center ${show ? 'block' : 'hidden'}`}
    >
      <Lottie animationData={googleLoading} loop />
    </div>
  );
}