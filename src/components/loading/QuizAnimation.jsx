import Lottie from 'lottie-react';
import React from 'react';

import QuizLoading from '../../assets/animation/quiz_home.json';

export default function QuizLoadingAnimation({ show, background }) {
  return (
    <>
      <Lottie style={{ width: '40%', margin: 'auto' }}  animationData={QuizLoading} loop />
    </>
  );
}
