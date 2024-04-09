import React, { useEffect, useState } from "react";
import "./Quiz.css";

import Question from "./Question";
import Answer from "./Answer";
import Score from "./Score";
import Timer from "./Timer";
import { ClientEventSystem } from "../../client-events";
import { useStorageState } from "../../custom-hook/useLocalStorage";
import HeroOne from "../hero/HeroOne";
import CountdownAnimation from "../gameboard/components/CountdownAnimation";
import QuizIntro from "./QuizIntro";
import RequireLogin from "../gameInro/requireLogin";
import GameCleared from "../gameInro/GameCleared";
import Preloader from "../preLoader/GoogleLoading";
import PickSound from "../../assets/sounds/effects/pick.m4a";
import SuccessSound from "../../assets/sounds/effects/success.mp3";
import CountDownSound from "../../assets/sounds/effects/countdown.mp3";
import BackGroundSound from "../../assets/sounds/background/AProperStory.mp3"
import useAudio from "../../custom-hook/useAudio";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_INFO } from "../../action-types";
import UserServices from "../../services/user.service";

const Quiz = () => {
  const [isFinishFirstQuiz, setIsFinishFirstQuiz] =
    useStorageState("isFinishFirstQuiz");
  const [isLoading, setIsLoading] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [endModal, setEndModal] = useState(false);
  const [score, setScore] = useState(100);
  const [cleared, setCleared] = useState(false);
  const [question, setQuestion] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(100);
  const [timer, setTimer] = useState(1);
  const [start, setStart] = useState(false);
  const [rank, setRank] = useState({
    currentRank: -1,
    distance: -1,
  });

  const [playPickSound] = useAudio(PickSound);
  const [playSucessSound] = useAudio(SuccessSound);
  const [playCountDownSound] = useAudio(CountDownSound);
  const [playBackground, {stop: stopBackground}] = useAudio(BackGroundSound, {
    interrupt: true,
    loop: true,
    volume: 0.25,
  });

  const dispatch = useDispatch();

  const checkAnswer = (answer) => {
    playPickSound();
    ClientEventSystem.socket.emit(
      ClientEventSystem.EventTypes.ANSWER_QUIZ,
      answer
    );
  };

  const getRank = (user, ranking) => {
    let stop = false;

    let userRank = -1;

    console.log(ranking);

    ranking = ranking.reduce((reducedRanking, element, index) => {
      if (element.highestScoreMathQuiz <= user.highestScoreMathQuiz) stop = true;
      if (element._id === user._id) userRank = index + 1;
      if (stop) return reducedRanking;
      reducedRanking.push(element);
      return reducedRanking;
    }, []);

    return {
      currentRank: userRank,
      upperRank: ranking.length > 0 ? ranking.length : 1,
      distance: ranking.length !== 0 ? 
        ranking[ranking.length - 1]?.highestScoreMathQuiz -
        user?.highestScoreMathQuiz : 1
    };
  };

  const startGame = async () => {
    playPickSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (isFinishFirstQuiz) {
      setCountdown(true);
      setTimeout(() => playCountDownSound(), 200);
      setTimeout(() => {
        const time = new Date().getTime();
        setStartTime(time);
        setEndTime(time);
        setCountdown(false);
      }, 2000);
    }
    ClientEventSystem.socket.emit(ClientEventSystem.EventTypes.START_QUIZ);
  };
  const onClose = () => {
    playPickSound();
    setShowManual(false);
    setIsFinishFirstQuiz(true);
    setCountdown(true);
    setTimeout(() => playCountDownSound(), 200);
    setTimeout(() => {
      const time = new Date().getTime();
      setStartTime(time);
      setEndTime(time);
      setCountdown(false);
    }, 2000);
  };

  useEffect(() => {
    ClientEventSystem.socket.on(
      ClientEventSystem.EventTypes.RECEIVE_QUESTION_QUIZ,
      (res) => {
        if (!start) setStart(true);
        const time = new Date().getTime();
        setStartTime(time);
        setEndTime(time);
        setScore(res.score);
        setTimer(res.questionTime);
        setQuestion(res.question);
        if (!localStorage.getItem("isFinishFirstQuiz")) {
          setShowManual(true);
        }
      }
    );
    ClientEventSystem.socket.on(
      ClientEventSystem.EventTypes.END_QUIZ,
      (res) => {
        setIsLoading(true);
        (async () => {
          const { data } = await UserServices.getProfile();
          const { payload: user } = data;
          setIsLoading(false);
          setRank(getRank(user, res?.ranking));
          setStart(false);
          setEndModal(true);
          setQuestion("");
          dispatch({ type: SET_USER_INFO, payload: user });
        })();
      }
    );
  }, []);

  useEffect(() => {
    if (endModal) playSucessSound();
  }, [endModal, playSucessSound]);

  useEffect(() => {
    if (start && !countdown) {
      playBackground();
      console.log('play background');
    } else {
      console.log('stop background');
      stopBackground();
    }
    return () => stopBackground();
  }, [start, countdown]);

  useEffect(() => {
    if (endTime - startTime > timer && start) {
      ClientEventSystem.socket.emit(ClientEventSystem.EventTypes.QUIZ_TIMEOUT);
    }
  }, [startTime, endTime]);

  const closeLoginModal = () => {
    playPickSound();
    startGame();
    setEndModal(false);
    setCountdown(true);
    setTimeout(() => playCountDownSound(), 200);
    setTimeout(() => {
      setCountdown(false);
    }, 2000);
  };
  const closeClearedModal = () => {
    playPickSound();
    setCleared(false);
    setCountdown(true);
    setTimeout(() => playCountDownSound(), 200);
    setTimeout(() => {
      setCountdown(false);
    }, 2000);
  };
  if (isLoading) {
    return (
      <>
        <Preloader />
      </>
    );
  }
  return (
    <div>
      <HeroOne
        heading="GDSC Quiz"
        subHeading="Test your intelligence with GDSC's Math Quiz!!"
        show={!start}
        quiz={true}
        buttonGroup={[
          {
            btnColor: "primary",
            btnText: "Play Now",
            btnURL: "/play",
            btnIcon: "bi-arrow-right",
          },
          {
            btnColor: "minimal",
            btnText: "All Collections",
            btnURL: "/collections",
            btnIcon: "bi-grid-3x3-gap",
          },
        ]}
        welcomeImage="img/illustrator/2.png"
        startGame={startGame}
      />
      <QuizIntro show={showManual} onClose={onClose} />
      <RequireLogin
        showLeaderboard={true}
        show={endModal}
        onClose={closeLoginModal}
        rank={rank.currentRank}
        upperRank={rank.upperRank}
        distance={rank.distance}
        score={score}
      />
      <GameCleared
        show={cleared}
        onClose={closeClearedModal}
        gameName="GDSC Quiz"
      />
      {countdown && <CountdownAnimation />}
      {start && !countdown && !endModal && !cleared && !showManual && (
        <>
          <div className="quiz-info">
            <Score score={score} />
          </div>
          <div className="quiz_container">
            <Timer
              startTime={startTime}
              endTime={endTime}
              setEndTime={setEndTime}
              timer={timer}
            />
            <Question question={question} />
            <Answer checkAnswer={checkAnswer} />
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
