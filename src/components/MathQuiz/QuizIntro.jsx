import React, { useState, useEffect } from "react";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default function QuizIntro({ show, onClose }) {
  const { isAuthenticate } = useSelector((state) => state.auth);


    function LeftArrow() {
        const { isFirstItemVisible, scrollPrev } =
          React.useContext(VisibilityContext);
      
        return (
          <button className="next-btn" disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            {!isFirstItemVisible && (<u><b>Back</b></u>)}
          </button>
        );
    }
      
    function RightArrow() {
        const { isLastItemVisible, scrollNext, scrollToItem } = React.useContext(VisibilityContext);

        return (
            <>
            {!isLastItemVisible ? 
                (<button className="back-btn" disabled={isLastItemVisible} onClick={() => scrollNext()}>
                    <u><b>Next</b></u>
                </button>) : (<button className="back-btn" onClick={onClose}>
                    <u><b>Start</b></u>
                </button>)
            }
            </>
        );
    }
    
    return (
        <div className={`intro-modal ${show ? 'appear' : 'hide'}`}>
            <div className={`intro-box ${isAuthenticate ? 'ml-252' : ''}`}>
                <h1 className="game-title">GDSC Quiz</h1>
                        <div className="game-slide" id="1">
                            <span><b>How to Play!</b></span>
                            <p><b>Given a math equation. Determine whether it is correct or not</b></p>
                            <div className="quiz-img" style={{display: 'flex', justifyContent: 'center', marginBottom: '12px'}}>
                                <img src={require('../../assets/image/quiz-demo2.png')} alt="Game Demo" className="game-img2" />
                                <img src={require('../../assets/image/quiz-demo.png')} alt="Game Demo" className="game-img1" />
                            </div>
                        </div>
                        <button className="quiz-btn" onClick={onClose}>
                            <u><b>Start</b></u>
                        </button>
            </div>
        </div>
    )
}