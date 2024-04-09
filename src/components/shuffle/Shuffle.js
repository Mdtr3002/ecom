import React, { Component, PropTypes, useState } from "react";
import throttle from "lodash/throttle";
import { Modal } from "react-bootstrap";

// import articles from './test-data.js';

import FlipMove from "react-flip-move";
import Temp from "../../assets/image/u1.jpg";

import "../../assets/scss/_podium.scss";
import ScrollAnimation from "react-animate-on-scroll";
import leaderboardAnimation from "../../assets/animation/leaderboard.json";
import Lottie from "lottie-react";

class ListItem extends Component {
  render() {
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <li id={this.props.id} className={listClass} style={style}>
        <h3>{this.props.index}</h3>
        <h3 style={{ fontWeight: "normal" }}>{this.props.name}</h3>
        <h4>
          {this.props.compare === 0 && (
            <i className="bi bi-activity" style={{ marginRight: "2px" }} />
          )}
          {this.props.compare > 0 && (
            <i
              className="bi bi-caret-up-fill"
              style={{ color: "green", marginRight: "2px" }}
            />
          )}
          {this.props.compare < 0 && (
            <i
              className="bi bi-caret-down-fill"
              style={{ color: "red", marginRight: "2px" }}
            />
          )}
          {this.props.highestScoreMathQuiz} G
        </h4>
      </li>
    );
  }
}

function Shuffle({ articles }) {
  const [modalShow, setModalShow] = useState(false);

  const renderArticles = () => {
    return articles.slice(3, 10).map((article, i) => {
      return (
        <ListItem
          key={article.email}
          view={"list"}
          index={i + 4}
          // clickHandler={throttle(() => this.moveArticle('articles', 'removedArticles', article.id), 800)}
          {...article}
        />
      );
    });
  };
  return (
    <>
      <div id="shuffle" className={"list"}>
        <div className="podium-wrapper">
          <div className="podium">
            {articles[1] && (
              <div class="person second">
                <div class="num">2</div>
                <i class="bi bi-caret-up-fill"></i>
                <img
                  referrerpolicy="no-referrer"
                  src={articles[1].picture ? articles[1].picture : Temp}
                  alt=""
                  class="photo"
                />
                <div className="photo-footer" />
                <p class="link">{articles[1].name}</p>
                <p class="points">{articles[1].highestScoreMathQuiz} G</p>
              </div>
            )}
            {articles[0] && (
              <div class="person first">
                <i class="bi bi-award-fill"></i>
                <img
                  referrerpolicy="no-referrer"
                  src={articles[0].picture ? articles[0].picture : Temp}
                  alt=""
                  class="photo main"
                />
                <div className="photo-footer" />
                <p class="link">{articles[0].name}</p>
                <p class="points">{articles[0].highestScoreMathQuiz} G</p>
              </div>
            )}
            {articles[2] && (
              <div class="person third">
                <div class="num">3</div>
                <i class="bi bi-caret-up-fill"></i>
                <img
                  referrerpolicy="no-referrer"
                  src={articles[2].picture ? articles[2].picture : Temp}
                  alt=""
                  class="photo"
                />
                <div className="photo-footer" />
                <p class="link">
                  {articles[2].name ? articles[2].name : "name"}
                </p>
                <p class="points">{articles[2].highestScoreMathQuiz} G</p>
              </div>
            )}
          </div>
        </div>
        <Modal
          show={modalShow}
          size="xl"
          aria-labelledby="ReportLabel"
          centered
          className="share-modal"
        >
          <Modal.Body>
            <div
              className="row g-4"
              style={{ color: "white", padding: "12px"}}
            >
              <h5 style={{ padding: 0 }}>
                Bonus points will be given to players with high daily score in
                GDSC Quiz:
              </h5>
              <div style={{display: 'flex', alignItems: 'start'}}>
                <Lottie style={{marginTop: '-20px', width: '64vw', marginRight: '20px'}} animationData={leaderboardAnimation} />
                  <p style={{width: '124vw'}}>
                  ● 1st: <span style={{color: 'yellow'}}>+700 GCoins</span>
                  <br />
                  ● 2nd: <span style={{color: 'yellow'}}>+500 GCoins</span>
                  <br />
                  ● 3rd: <span style={{color: 'yellow'}}>+300 GCoins</span>
                  <br />
                  ● 4 - 10th: <span style={{color: 'yellow'}}>+200 GCoins</span>
                  </p>
              </div>
            </div>
            <button
              onClick={() => {
                setModalShow(false);
              }}
              className="btn btn-close-style btn-danger btn-sm rounded-pill"
              type="button"
            >
              <i className="bi bi-x-lg" />
            </button>
          </Modal.Body>
        </Modal>

        <div className="leaderboard-wrapper">
          <div className="leaderboard">
            <div style={{ display: "flex" }}>
              <h3 className="mt-4"> Quiz Leaderboard</h3>
              {/* <button
                onClick={() => setModalShow(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#C2D4F8",
                  marginTop: "16px",
                }}
              >
                <i
                  className="bi bi-question-circle"
                  style={{
                    fontSize: "1.5rem",
                    marginLeft: "8px",
                  }}
                />
              </button> */}
              <button
                className={`btn btn-success place-bid-item`}
                style={{
                  marginTop: '24px',
                  border: 'none',
                  padding: '4px 20px',
                  borderRadius: '8px',
                  marginLeft: '8px',
                  height: 'fit-content'
                }}
                onClick={() => setModalShow(true)}
              >
                More Info
              </button>
            </div>
            <h5 style={{ color: "#8480ae" }} className="mb-4">
              Ranking is based on daily acquired GCoins through GDSC Quiz
            </h5>
            <FlipMove
              staggerDurationBy="30"
              duration={500}
              enterAnimation={"accordionVertical"}
              leaveAnimation={"accordionVertical"}
              maintainContainerHeight={true}
              typeName="ul"
            >
              {renderArticles()}
            </FlipMove>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shuffle;
