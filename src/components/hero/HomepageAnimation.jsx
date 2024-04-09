import Lottie from 'lottie-react';
import React from 'react';

import googleLoading from '../../assets/animation/homepage-loading.json';

export default function HomepageLoadingAnimation({ show, background }) {
  return (
    <div
    //   className={`fixed z-50 inset-0 ${
    //     background ? 'bg-gdscGrey-100 bg-opacity-50' : 'bg-white'
    //   } flex justify-center items-center ${show ? 'block' : 'hidden'}`}
    >
      <Lottie style={{ width: '70%', margin: 'auto' }}  animationData={googleLoading} loop />
    </div>
  );
}
