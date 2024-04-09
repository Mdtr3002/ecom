import React, { useState, useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default function GameIntro({ show, onClose }) {
  const { isAuthenticate } = useSelector((state) => state.auth);

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <button
        className="next-btn"
        disabled={isFirstItemVisible}
        onClick={() => scrollPrev()}
      >
        {!isFirstItemVisible && (
          <u>
            <b>Back</b>
          </u>
        )}
      </button>
    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext, scrollToItem } =
      React.useContext(VisibilityContext);

    return (
      <>
        {!isLastItemVisible ? (
          <button
            className="back-btn"
            disabled={isLastItemVisible}
            onClick={() => scrollNext()}
          >
            <u>
              <b>Next</b>
            </u>
          </button>
        ) : (
          <button className="back-btn" onClick={onClose}>
            <u>
              <b>Start</b>
            </u>
          </button>
        )}
      </>
    );
  }

  return (
    <div className={`intro-modal ${show ? "appear" : "hide"}`}>
      <div className={`intro-box ${isAuthenticate ? "ml-252" : ""}`}>
        <h1 className="game-title">Fast to G</h1>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          className="scroll-menu"
        >
          <div className="game-slide" id="1">
            <span>
              <b>How to Play!</b>
            </span>
            <p>
              <b>Step 1</b>: Remember the highlighted cells before the effect
              disappears
            </p>
            <img
              src={require("../../assets/image/gameDemo.png")}
              alt="Game Demo"
              className="game-img"
            />
          </div>
          <div className="game-slide">
            <span>
              <b>How to Play!</b>
            </span>
            <p>
              <b>Step 2</b>: Click on all the previous Highlighted Cells to
              clear the level.
            </p>
            <p>One wrong move will reset the game, so be careful!!!</p>
            <img
              src={require("../../assets/gif/gameDemo2.gif")}
              alt="Game Demo"
              className="game-img"
            />
          </div>
          <div className="game-slide">
            <span>
              <b>Win Awesome Prizes with GCOIN!</b>
            </span>
            <p>
              Use the <b>GCOINs</b> won for the mystery wheel, bidding and more
            </p>
            <img
              src={require("../../assets/image/gameDemo.png")}
              alt="Game Demo"
              className="game-img"
            />
          </div>
        </ScrollMenu>
      </div>
    </div>
  );
}
