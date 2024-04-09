import React, { useEffect } from "react";  
import Shuffle from "../components/shuffle/Shuffle";
import { useSelector } from "react-redux";
import { compareData } from "../components/shuffle/CompareData";
import { ClientEventSystem } from "../client-events";
import { useDispatch } from "react-redux";
import { UPDATE_PODIUM } from "../action-types";
import _ from "lodash";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const {podium} = useSelector((state) => state.leaderboard);
  // const {user} = useSelector((state) => state.auth);
  // const rankingData = compareData(podium, oldData);
  // console.log(user);
  useEffect(() => {
    // console.log('on MATH_QUIZ_RANKING')
    ClientEventSystem.socket.on(ClientEventSystem.EventTypes.MATH_QUIZ_RANKING, (res) => {
      // console.log('compareData', compareData(res, podium));
      dispatch({type: UPDATE_PODIUM, payload: compareData(res, podium)})
    });
  }, [])

  // const test = () => {
  //   const newPodium = _.shuffle(podium);
  //   dispatch({type: UPDATE_PODIUM, payload: compareData(newPodium, podium)});
  // }

  
  return (
    <>
        <Shuffle
          articles = {podium}
        />
        {/* <button onClick={test}>Test</button> */}
    </>
  );
};

export default Leaderboard;
