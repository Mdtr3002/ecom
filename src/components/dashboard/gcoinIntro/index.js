import { useState } from "react";
import Chart from "react-apexcharts";
import ScrollAnimation from "react-animate-on-scroll";
import CoinAnimation from "./CoinAnimation";

const gcoinIntro = (props) => {
  const { backgroundImage } = props;

  return (
    <div className="col-12 col-xxl-6">
      <div
        className="card border-0 shadow-sm"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundImage: `url(${process.env.PUBLIC_URL}/${backgroundImage})`,
        }}
      >
        <div className="card-body p-4 pb-0">
          <h3 style={{ color: "#fbbc04" }}>{props.title}</h3>
          <h5 style={{ color: "white" }}>Bid and Win</h5>
          <p style={{ color: "white" }}>
            ● Browse our diverse selection of exclusive fashion items.
            <br />
            ● Place your bids on coveted pieces from top designers.
            <br />● Secure your unique style with each winning bid.
          </p>
        </div>
        <CoinAnimation />
      </div>
    </div>
  );
};

export default gcoinIntro;
