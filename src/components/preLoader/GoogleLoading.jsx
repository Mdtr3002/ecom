import React from "react";
import Lottie from "lottie-react";
import googleLoading from "../../assets/animation/google-loading.json";
const Preloader = () => {
  return (
    // <div className="preloader">
    //     <div className="loader"></div>
    // </div>
    <div
      // className={`fixed z-50 inset-0 ${
      // ackground ? 'bg-gdscGrey-100 bg-opacity-50' : 'bg-white'
      // } flex justify-center items-center ${show ? 'block' : 'hidden'}`}
      className="wheel-wrapper"
      style={{ background: "white" }}
    >
      <Lottie className="google-loading" animationData={googleLoading} loop />
    </div>
  );
};

export default Preloader;
