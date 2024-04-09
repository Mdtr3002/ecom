import React from "react";
import { useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import GameOverAnimation from "./GameOverAnimation";
import ClickSound from "../../assets/sounds/effects/pick.m4a";
import useAudio from "../../custom-hook/useAudio";

export default function RequireLogin({
  show = false,
  onClose,
  showLeaderboard = false,
  rank,
  upperRank,
  distance,
  score,
}) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [playClickSound] = useAudio(ClickSound);
  const backToHome = () => {
    playClickSound();
    navigate("/");
  };
  return (
    <>
      <div className={`login-modal ${show ? "appear" : "hide"}`}>
        <div className={`login-box ml-252`}>
          <div
            className="game-slide"
            style={{ alignItems: "center", width: "fit-content" }}
          >
            <span>
              <h1>Good luck next time!!!</h1>
            </span>
            <GameOverAnimation />

            <span className="mt-3 mb-3">
              {!isNaN(score) && score !== undefined && (
                <p>You got {score / 10} points.</p>
              )}
            </span>

            {showLeaderboard && (
              <>
                <div className="thematic-break mb-3 mt-3"></div>
                <div
                  className="podium"
                  style={{
                    minHeight: "fit-content",
                    margin: 0,
                  }}
                >
                  <div
                    class="person"
                    style={{
                      margin: 0,
                    }}
                  >
                    {rank === 1 ? (
                      <i class="bi bi-award-fill"></i>
                    ) : (
                      <div style={{ fontSize: "30px" }}>
                        {rank !== -1 ? `Top ${rank}` : "Not on leaderboard"}
                      </div>
                    )}
                    <img
                      referrerpolicy="no-referrer"
                      src={user?.picture}
                      alt=""
                      class="photo"
                    />
                    <div className="photo-footer" />
                    {rank === 1 ? (
                      <p class="points">
                        Congratulation!! You are on top of the leaderboard! Your
                        highscore is {user?.highestScoreMathQuiz}
                      </p>
                    ) : (
                      <p class="points">
                        You are {distance} points to top {upperRank}! Your
                        highscore is {user?.highestScoreMathQuiz}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div style={{ display: "flex" }}>
              <button
                className="btn btn-success login game-over-box"
                onClick={backToHome}
                style={{
                  width: "fit-content",
                  marginRight: "12px",
                  backgroundColor: "#4285f4",
                }}
              >
                Home
                <img
                  src={require("../../assets/image/home.png")}
                  alt="restart"
                  style={{
                    marginTop: "-4px",
                    marginLeft: "4px",
                    width: "20px",
                  }}
                />
              </button>
              <button
                className={`${"btn btn-success login game-over-box"}`}
                onClick={onClose}
                style={{ width: "fit-content" }}
              >
                Replay
                <img
                  src={require("../../assets/icon/refresh.png")}
                  alt="restart"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
