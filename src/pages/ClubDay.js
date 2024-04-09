import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import CheckCircle from "../assets/icon/check_circle.svg";
import CheckCircleChecked from "../assets/icon/check_circle_checked.svg";
import CheckIn from "../assets/image/check-in-oif.jpg";
// import FastToG from "../assets/image/fasttog.png";
// import GDSCMaze from "../assets/image/maze.png";
import SpinningTop from "../assets/image/spinning-top.png";
import Quiz from "../assets/image/quiz.png";
// import KeyMatching from "../assets/image/logo.png";
import Rocks from "../assets/image/rocks.png";
import O_AN_QUAN from "../assets/image/o-an-quan.webp";
import QuizLogo from "../assets/image/quiz_logo.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClubDayServices from "../services/clubday.service";
import UserServices from "../services/user.service";
import { SET_USER_INFO } from "../action-types";

const ClubDay = () => {
  const [clubDayInfo, setclubDayInfo] = useState(null);
  const [num, setNum] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setNum(
      [
        clubDayInfo ? clubDayInfo.isFinishCheckIn : false,
        clubDayInfo ? clubDayInfo.isFinishMathQuiz : false,
        clubDayInfo ? clubDayInfo.isFinishOAnQuan : false,
        clubDayInfo ? clubDayInfo.isFinishThayDa : false,
        clubDayInfo ? clubDayInfo.isFinishCuQuay : false,
      ].filter((el) => el === true).length
    );
  }, [clubDayInfo]);

  console.log("clubDayInfo", clubDayInfo);

  useEffect(() => {
    (async () => {
      await ClubDayServices.getClubDayInfo()
        .then((res) => setclubDayInfo(res?.data?.payload))
        .catch((err) => console.log(err));
      // const { payload } = clubDayInfoRes.data;
      // const profileRes = await UserServices.getProfile();
      // dispatch({ type: SET_USER_INFO, payload: profileRes.data.payload });
      // console.log("payload", clubDayInfoRes);
      // setclubDayInfo(payload);
    })();
  }, []);

  return (
    <>
      <Breadcrumb
        breadcrumbTitle={`Tutorial`}
        breadcrumbNav={[
          {
            navText: "OIF 2024",
            path: "/oif",
          },
        ]}
      />

      <div className="activity-wrapper">
        <div
          style={{
            marginTop: "20px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4 className="cd-title">GDSC's OIF activities Tutorial</h4>
            <h6 className="cd-subtitle">One-of-a-kind Games. Amazing Prizes</h6>
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="activity-field">
            <h3>Prize Exchange rules</h3>
            <div
              className="activity-text prize-box f-20"
              style={{ marginTop: "12px", color: "#c2d4f8" }}
            >
              1. Upon completion of each activity, you will receive{" "}
              <b>two stickers </b>
              and a certain amount of <b style={{ color: "#fbbc04" }}>GCoins</b>
              .
              <br />
              2. Utilize your GCoins to engage in{" "}
              <Link to="/collection" style={{ color: "white" }}>
                <b>
                  <u>Bidding</u>
                </b>
              </Link>{" "}
              and secure prizes.
              <br />
              3. Participate in the{" "}
              <Link to="/special-bids" style={{ color: "white" }}>
                <b>
                  <u>Special Bidding</u>
                </b>
              </Link>{" "}
              with a chance to win a<b> Logitech G102 LightSync Gen2 Mouse</b>.
              <br />
              4. Students requiring OIF certification to confirm their
              participation in the GDSC booth must complete at least the
              <b> Check-in</b> activity.
              {/* <div style={{ display: "flex" }}>
                {num < 1 ? (
                  <img
                    src={CheckCircle}
                    alt="Check circle"
                    className="rules-circle"
                  />
                ) : (
                  <img
                    src={CheckCircleChecked}
                    alt="Check circle"
                    className="rules-circle"
                  />
                )}
                <p style={{ marginLeft: "4px" }} className="f-20">
                  1 mark = 2 Stickers and 1 Bracelet
                </p>
              </div>
              <div style={{ display: "flex" }}>
                {num < 2 ? (
                  <img
                    src={CheckCircle}
                    alt="Check circle"
                    className="rules-circle"
                  />
                ) : (
                  <img
                    src={CheckCircleChecked}
                    alt="Check circle"
                    className="rules-circle"
                  />
                )}
                <p style={{ marginLeft: "4px" }} className="f-20">
                  2 marks = 2 Stickers, 1 Bracelet and 1 Keychain
                </p>
              </div>
              <div style={{ display: "flex" }}>
                {num < 3 ? (
                  <img
                    src={CheckCircle}
                    alt="Check circle"
                    className="rules-circle"
                  />
                ) : (
                  <img
                    src={CheckCircleChecked}
                    alt="Check circle"
                    className="rules-circle"
                  />
                )}
                <p style={{ marginLeft: "4px" }} className="f-20">
                  3 marks = 2 Stickers, 1 Bracelet, 1 Keychain and 1 Tote bag
                </p>
              </div>
              <div style={{ display: "flex" }}>
                {num < 4 ? (
                  <img
                    src={CheckCircle}
                    alt="Check circle"
                    className="rules-circle"
                  />
                ) : (
                  <img
                    src={CheckCircleChecked}
                    alt="Check circle"
                    className="rules-circle"
                  />
                )}
                <p style={{ marginLeft: "4px" }} className="f-20">
                  4 marks = 2 Stickers, 1 Bracelet, 1 Keychain, 1 Tote bag and 1
                  Lanyard
                </p>
              </div> */}
            </div>
          </div>
        </div>
        <div id="checkin" />
        <div
          style={{
            marginTop: "20px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="activity-field" style={{ color: "#c2d4f8" }}>
            <h3>Check-in</h3>
            <div className="md-show">
              <img src={CheckIn} alt="Check-in" className="activity-img" />
              <p className="activity-text">
                ● Log in to your Facebook account.
                <br />
                ● Like the fanpage "Developer Student Club - HCMUT".
                <br />● React and Share our fanpage{" "}
                <a
                  href="https://www.facebook.com/share/p/e84MsDsmhkw4ZTGp/?mibextid=oFDknk"
                  style={{ color: "white" }}
                >
                  <b>
                    <u>Fessior Recruitment</u>
                  </b>
                </a>{" "}
                post with the hashtag #FessiorRecruitment in public mode.
                <br />● Show the post to our organizers to get your first mark.
                <br />● Rewarded with 2000 GCoins upon completion.
                {/* <br />
                <b>#GDSC_HCMUT</b>
                <br />
                <b>#IS2022</b>
                <br />
                <b>#FessiorSolution</b> */}
              </p>
            </div>
            <img
              src={CheckIn}
              alt="Check-in"
              className="activity-img md-hide"
            />
            <p className="activity-text md-hide">
              ● Log in to your Facebook account.
              <br />
              ● Like the fanpage "Developer Student Club - HCMUT".
              <br />● React and Share our fanpage{" "}
              <a
                href="https://www.facebook.com/share/p/e84MsDsmhkw4ZTGp/?mibextid=oFDknk"
                style={{ color: "white" }}
              >
                <b>
                  <u>Fessior Recruitment</u>
                </b>
              </a>{" "}
              post with the hashtag #FessiorRecruitment in public mode.
              <br />● Show the post to our organizers to get your first mark.
              <br />● Rewarded with 2000 GCoins upon completion.
            </p>
          </div>
        </div>
        <div id="quiz" />
        <div
          style={{
            marginTop: "20px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="activity-field" style={{ color: "#c2d4f8" }}>
            <h3>GDSC Quiz</h3>
            <div className="md-show">
              <div className="activity-img" style={{ display: "flex" }}>
                <img
                  src={QuizLogo}
                  alt="GDSC Quiz"
                  style={{ width: "100%", margin: "auto" }}
                />
              </div>
              <p className="activity-text">
                ● Player will be given a random math equation.
                <br />
                ● Determine whether the equation is accurate or not.
                <br />
                ● If choose correctly, procceed to the next level. If wrong, you
                will have to restart.
                <br />● The game is completed when the player has cleared 30
                levels.
                <br />● Rewarded with 5000 GCoins upon completion.
              </p>
            </div>
            <div className="activity-img md-hide keymatch">
              <img
                src={QuizLogo}
                alt="GDSC Quiz"
                style={{ width: "100%", margin: "auto" }}
              />
            </div>
            <p className="activity-text md-hide">
              ● Player will be given a random math equation.
              <br />
              ● Determine whether the equation is accurate or not.
              <br />
              ● If choose correctly, procceed to the next level. If wrong, you
              will have to restart.
              <br />● The game is completed when the player has cleared 30
              levels.
              <br />● Rewarded with 5000 GCoins upon completion.
            </p>
            <Link
              to="/math-quiz"
              className="play-btn btn btn-primary rounded-pill clubday"
            >
              Play
            </Link>
          </div>
        </div>
        <div id="o-an-quan" />
        <div
          style={{
            marginTop: "20px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="activity-field" style={{ color: "#c2d4f8" }}>
            <h3 className="md-hide" style={{ textAlign: "center" }}>
              Mandarin square capturing
              <br />
              (Ô ăn quan)
            </h3>
            <h3
              className="md-show"
              style={{ textAlign: "center", width: "fit-content" }}
            >
              Mandarin square capturing (Ô ăn quan)
            </h3>
            <div className="md-show">
              <div className="activity-img" style={{ display: "flex" }}>
                <img
                  src={O_AN_QUAN}
                  alt="Ô ăn quan"
                  style={{ width: "100%", margin: "auto", borderRadius: "8px" }}
                />
              </div>
              <p className="activity-text">
                ● Require 2 players to start the game. The detailed rules will
                be instructed by GDSC HCMUT's organizers.
                <br />
                ● Each player will have 5 minutes to play and score. The person
                with more points will win; the winner will receive 10,000
                GCoins, and the loser will receive 5,000 GCoins.
                <br />● In the case where both players have the same score, both
                will receive 7,000 GCoins.
              </p>
            </div>
            <div className="activity-img md-hide keymatch">
              <img
                src={O_AN_QUAN}
                alt="Ô ăn quan"
                style={{ width: "100%", margin: "auto", borderRadius: "8px" }}
              />
            </div>
            <p className="activity-text md-hide">
              ● Require 2 players to start the game. The detailed rules will be
              instructed by GDSC HCMUT's organizers.
              <br />
              ● Each player will have 5 minutes to play and score. The person
              with more points will win; the winner will receive 10,000 GCoins,
              and the loser will receive 5,000 GCoins.
              <br />● In the case where both players have the same score, both
              will receive 7,000 GCoins.
            </p>
          </div>
        </div>
        <div id="rock" />
        <div
          style={{
            marginTop: "20px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="activity-field" style={{ color: "#c2d4f8" }}>
            <h3>Rock Juggling (Thảy đá)</h3>
            <div className="md-show">
              <div className="activity-img" style={{ display: "flex" }}>
                <img
                  src={Rocks}
                  alt="rock"
                  style={{ width: "100%", margin: "auto" }}
                />
              </div>
              <p className="activity-text">
                You will have 6 stones. At each level, you will spread all of
                them on the table and pick up 1 stone in hand, then throw it
                into the air. After throwing, you must quickly pick up the
                stones on the table. The higher level, the more stones must be
                picked up:
                <br />
                ● Level 1: 3 stones.
                <br />
                ● Level 2: 4 stones.
                <br />
                ● Level 3: 5 stones.
                <br />
                ● Final level: you will hold all the stones in hand, throw them
                into the air and flip your hand to catch the stones with the
                back of your hand, then throw them into the air again, and catch
                them with your palm. If you catch 3 out of 6 stones, you will
                complete the game.
                <br />
                If you drop any stones that you are supposed to catch at any
                level, you will lose and start over (or pass your turn to other
                players, if any).
              </p>
            </div>
            <div className="activity-img md-hide keymatch">
              <img
                src={Rocks}
                alt="rock"
                style={{ width: "100%", margin: "auto" }}
              />
            </div>
            <p className="activity-text md-hide">
              You will have 6 stones. At each level, you will spread all of them
              on the table and pick up 1 stone in hand, then throw it into the
              air. After throwing, you must quickly pick up the stones on the
              table. The higher level, the more stones must be picked up:
              <br />
              ● Level 1: 3 stones.
              <br />
              ● Level 2: 4 stones.
              <br />
              ● Level 3: 5 stones.
              <br />
              ● Final level: you will hold all the stones in hand, throw them
              into the air and flip your hand to catch the stones with the back
              of your hand, then throw them into the air again, and catch them
              with your palm. If you catch 3 out of 6 stones, you will complete
              the game.
              <br />
              If you drop any stones that you are supposed to catch at any
              level, you will lose and start over (or pass your turn to other
              players, if any).
            </p>
          </div>
        </div>
        <div
          id="spinning-top"
          style={{
            marginTop: "20px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="activity-field" style={{ color: "#c2d4f8" }}>
            <h3>Spinning Top (Đánh Quay)</h3>
            <div className="md-show">
              <img
                src={SpinningTop}
                alt="Spinning Top"
                className="activity-img"
              />
              <p className="activity-text">
                ● The player will have to spin a top given by GDSC HCMUT.
                <br />
                ● The player must perform a “successful” spin (which will be
                described by the supporter in charge).
                <br />
                ● Each player will have 2 trials.
                <br />● Rewarded with 10000 GCoins upon completion.
              </p>
            </div>
            <img
              src={SpinningTop}
              alt="Spinning Top"
              className="activity-img md-hide"
            />
            <p className="activity-text md-hide">
              ● The player will have to spin a top given by GDSC HCMUT.
              <br />
              ● The player must perform a “successful” spin (which will be
              described by the supporter in charge).
              <br />
              ● Each player will have 2 trials.
              <br />● Rewarded with 10000 GCoins upon completion.
            </p>
          </div>
        </div>
        <div className="checkpoint-bar">
          {/* <div className={`checkpoint-line`} /> */}
          {/* <a href='#checkin' className={`check-bg ${first ? 'green-col' : ''}`}>
                        <img src={CheckIn} alt="Check circle" className="checkpoint-circle" />
                    </a> */}
          {(clubDayInfo ? clubDayInfo.isFinishCheckIn : false) ? (
            <img
              src={CheckCircleChecked}
              alt="Check circle"
              style={{ width: "50px", aspect: "square" }}
            />
          ) : (
            <a
              href="#checkin"
              className={`check-bg ${
                (clubDayInfo ? clubDayInfo.isFinishCheckIn : false)
                  ? "green-col"
                  : ""
              }`}
            >
              <div
                className="checkpoint-circle"
                style={{ display: "flex", background: "white" }}
              >
                <img
                  src={CheckIn}
                  alt="Key Matching"
                  style={{ margin: "auto", borderRadius: "50%" }}
                />
              </div>
            </a>
          )}
          <div className={`checkpoint-line`} />
          {(clubDayInfo ? clubDayInfo.isFinishMathQuiz : false) ? (
            <img
              src={CheckCircleChecked}
              alt="Check circle"
              style={{ width: "50px", aspect: "square" }}
            />
          ) : (
            <a
              href="#quiz"
              className={`check-bg ${
                (clubDayInfo ? clubDayInfo.isFinishMathQuiz : false)
                  ? "green-col"
                  : ""
              }`}
            >
              <div
                className="checkpoint-circle"
                style={{ display: "flex", background: "white" }}
              >
                <img
                  src={Quiz}
                  alt="Quiz"
                  style={{ margin: "auto", borderRadius: "9999px" }}
                />
              </div>
            </a>
          )}
          <div className={`checkpoint-line`} />
          {(clubDayInfo ? clubDayInfo.isFinishOAnQuan : false) ? (
            <img
              src={CheckCircleChecked}
              alt="Check circle"
              style={{ width: "50px", aspect: "square" }}
            />
          ) : (
            <a
              href="#o-an-quan"
              className={`check-bg ${
                (clubDayInfo ? clubDayInfo.isFinishOAnQuan : false)
                  ? "green-col"
                  : ""
              }`}
            >
              <div
                className="checkpoint-circle"
                style={{ display: "flex", background: "white" }}
              >
                <img
                  src={O_AN_QUAN}
                  alt="Ô ăn quan"
                  style={{ margin: "auto", borderRadius: "9999px" }}
                />
              </div>
            </a>
          )}
          <div className={`checkpoint-line`} />
          {(clubDayInfo ? clubDayInfo.isFinishThayDa : false) ? (
            <img
              src={CheckCircleChecked}
              alt="Check circle"
              style={{ width: "50px", aspect: "square" }}
            />
          ) : (
            <a
              href="#rock"
              className={`check-bg ${
                (clubDayInfo ? clubDayInfo.isFinishThayDa : false)
                  ? "green-col"
                  : ""
              }`}
            >
              <div
                className="checkpoint-circle"
                style={{ display: "flex", background: "white" }}
              >
                <img src={Rocks} alt="rock" style={{ margin: "auto" }} />
              </div>
            </a>
          )}
          <div className={`checkpoint-line`} />
          {(clubDayInfo ? clubDayInfo.isFinishCuQuay : false) ? (
            <img
              src={CheckCircleChecked}
              alt="Check circle"
              style={{ width: "50px", aspect: "square" }}
            />
          ) : (
            <a
              href="#spinning-top"
              className={`check-bg ${
                (clubDayInfo ? clubDayInfo.isFinishCuQuay : false)
                  ? "green-col"
                  : ""
              }`}
            >
              <div
                className="checkpoint-circle"
                style={{ display: "flex", background: "white" }}
              >
                <img
                  src={SpinningTop}
                  alt="Spinning Top"
                  style={{ margin: "auto", borderRadius: "50%" }}
                />
              </div>
            </a>
          )}
          {/* <a href='#fasttog' className={`check-bg ${second ? 'green-col' : ''}`}>
                        <img src={FastToG} alt="Check circle" className="checkpoint-circle" />
                    </a> */}
          {/* {second ? <img src={CheckCircleChecked} alt="Check circle" style={{ width: '50px', aspect: 'square' }} /> :
                    <a href='#fasttog' className={`check-bg ${second ? 'green-col' : ''}`}>
                        <div className="checkpoint-circle" style={{display: 'flex', background: 'white'}} >
                            <img src={FastToG} alt="Fast to G" style={{margin: 'auto', borderRadius: '50%'}} />
                        </div>
                    </a>}
                    <div className={`checkpoint-line`} /> */}
          {/* <a href='#quiz' className={`check-bg ${third ? 'green-col' : ''}`}>
                        <img src={Quiz} alt="Check circle" className="checkpoint-circle" />
                    </a> */}
          {/* <div className={`checkpoint-line`} /> */}
        </div>
      </div>

      <Divider />
    </>
  );
};

export default ClubDay;
