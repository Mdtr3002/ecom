import React, { memo, useReducer, useMemo, useEffect, useState } from "react";

import { Field } from "./components/GameField";
import { GameFieldView, GameView, SwitchView } from "./components/Styled";
import {
  GameReducer,
  initialState,
  NEW_LEVEL,
  FIELD_HIDE,
  FIELD_SHOW,
  RESET_LEVEL,
} from "./game.reducer";
import { generateGameField } from "./game.utils";
import "rc-switch/assets/index.css";
import GameIntro from "../gameInro";
import RequireLogin from "../gameInro/requireLogin";
import Preloader from "../preLoader/GoogleLoading";

import { useStorageState } from "../../custom-hook/useLocalStorage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateReward } from "../../actions/game";
import { RESET_REWARD, WHEEL_OPEN } from "../../action-types";
import CountdownAnimation from "./components/CountdownAnimation";
import GameCleared from "../gameInro/GameCleared";
import { ClientEventSystem } from "../../client-events/index.js";
import Entrance from "./entrance";

import PickSound from "../../assets/sounds/effects/pick.m4a";
import CountDownSound from "../../assets/sounds/effects/countdown.mp3";
import SucessSound from "../../assets/sounds/effects/success.mp3";
import BackGroundSound from "../../assets/sounds/background/Sable.mp3"
import useAudio from "../../custom-hook/useAudio";

function Game({ toggleTheme }) {
  const [{ level, showHidden, showField, levelConfig }, dispatch] = useReducer(
    GameReducer,
    initialState
  );

  const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [showRequireLogin, setShowRequireLogin] = useState(false);
  const [showGameCleared, setShowGameCleared] = useState(false);
  const [setShowPrize] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [count, setCount] = useState(1);
  const [sessionId, setSessionId] = useState(0);

  const [isFinishGameOnboard, setIsFinishGameOnboard] = useStorageState(
    "isFinishGameOnboard"
  );

  const { isAuthenticate } = useSelector((state) => state.auth);
  const { gameReward, isWheelOpen: open } = useSelector((state) => state.game);
  const reduxDispatch = useDispatch();

  const [playPickSound] = useAudio(PickSound, {interrupt: true});
  const [playCountDownSound] = useAudio(CountDownSound, {interrupt: true});
  const [playSuccessSound] = useAudio(SucessSound, {interrupt: true});
  const [playBackground, {stop: stopBackground}] = useAudio(BackGroundSound, {
    interrupt: true,
    loop: true,
    volume: 0.5,
  });

  const { cellCount, memoryCount } = levelConfig;

  const [field, setField] = useState([]);
  const [hiddenCells, setHiddenCells] = useState([]);

  const handleCountDown = () => {
    setCountdown(true);
    playCountDownSound();
    setTimeout(() => setCountdown(false), 2000);
  }

  useEffect(() => {
    setTimeout(dispatch, 500, { type: FIELD_SHOW });
  }, [levelConfig]);

  useEffect(() => {
    if (countdown) {
      playCountDownSound();
      setTimeout(() => {
        setCountdown(false);
        playBackground();
      }, 2000);
    }
  }, [countdown]);

  useEffect(() => {
    ClientEventSystem?.socket?.on(
      ClientEventSystem.EventTypes.RECEIVE_NEW_GAME_SESSION,
      (res) => {
        setStart(true);
        setIsLoading(false);
        dispatch({
          type: NEW_LEVEL,
          level: res.level,
          levelInfo: {
            cellCount: res.levelInfo.cellCount,
            memoryCount: res.levelInfo.memoryCount,
            fieldSize: res.levelInfo.fieldSize,
            space: res.levelInfo.space,
            score: res.levelInfo.score,
            time: res.levelInfo.time,
          },
        });
        setField(res.levelInfo.field);
        setHiddenCells(res.levelInfo.hiddenCells);
        if (!localStorage.getItem("isFinishGameOnboard")) {
          setShowManual(true);
        } else setCountdown(true);
      }
    );
    ClientEventSystem?.socket?.on(
      ClientEventSystem.EventTypes.NEXT_LEVEL_GAME,
      (res) => {
        // console.log('NEXT_LEVEL_GAME');
        dispatch({ type: FIELD_HIDE });
        setTimeout(() => {
          dispatch({
            type: NEW_LEVEL,
            level: res.level,
            levelInfo: {
              cellCount: res.levelInfo.cellCount,
              memoryCount: res.levelInfo.memoryCount,
              fieldSize: res.levelInfo.fieldSize,
              space: res.levelInfo.space,
              score: res.levelInfo.score,
              time: res.levelInfo.time,
            },
          });
          setField(res.levelInfo.field);
          setHiddenCells(res.levelInfo.hiddenCells);
        }, 500);
      }
    );
  }, []);

  const startGame = () => {
    playPickSound();
    setIsLoading(true);
    setTimeout(() => {
      if (isLoading)
        setIsLoading(false);
    }, 1000);
    ClientEventSystem.socket.emit(ClientEventSystem.EventTypes.CREATE_NEW_GAME);
  };

  const resetLevel = () => {
    playSuccessSound();
    dispatch({ type: FIELD_HIDE });
    setShowRequireLogin(true);
    reduxDispatch(updateReward(gameReward));
    setCleared(false);

    setTimeout(() => {
      dispatch({ type: RESET_LEVEL });
      stopBackground();
    }, 500);
  };
  const onClose = () => {
    playPickSound();
    setShowManual(false);
    reduxDispatch({ type: RESET_REWARD });
    if (!isFinishGameOnboard) {
      setIsFinishGameOnboard(true);
    }
    setCountdown(true);
  };
  const closeLoginModal = () => {
    playPickSound();
    startGame();
    setShowRequireLogin(false);
    reduxDispatch({ type: RESET_REWARD });
  };
  const closePrizeModal = () => {
    setShowPrize(false);
    reduxDispatch({ type: RESET_REWARD });
    setCountdown(true);
  };
  const closeClearedModal = () => {
    playPickSound();
    setShowGameCleared(false);
    reduxDispatch({ type: RESET_REWARD });
    setCountdown(true);
  };
  if (isLoading) {
    return (
      <>
        <Preloader />
      </>
    );
  }

  return (
    <GameView>
      <Entrance
        heading="FAST TO GDSC"
        subHeading="Crafted with the latest trend of design & coded with all modern approaches."
        notification="Fast to G is still in the developing process. Level completion will not reward the player with actual GCoins."
        show={!start}
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
      <GameIntro show={showManual} onClose={onClose} />
      <RequireLogin
        show={showRequireLogin}
        onClose={closeLoginModal}
        cleared={cleared}
        gcoin={gameReward}
      />
      <GameCleared
        show={showGameCleared}
        onClose={closeClearedModal}
        gameName="Fast to G"
      />
      {/* <LoginAfterWheel show={showPrize && !open } onClose={closePrizeModal} prize="k" /> */}
      {countdown && <CountdownAnimation />}
      {!showRequireLogin && !countdown && start && (
        <GameFieldView {...levelConfig}>
          <SwitchView>
            <div className="level">
              <b>Level: {level}</b>
            </div>
            <button onClick={() => {
              playPickSound();
              setShowManual(true);
            }} className="detail-btn">
              <u>
                <b>How to play</b>
              </u>
            </button>
          </SwitchView>
          <Field
            {...levelConfig}
            levelConfig={levelConfig}
            visible={start && showField}
            key={field}
            level={level}
            field={field}
            hiddenCells={hiddenCells}
            dispatch={dispatch}
            showHidden={showHidden}
            resetLevel={resetLevel}
          />
        </GameFieldView>
      )}
    </GameView>
  );
}

export default memo(Game);
