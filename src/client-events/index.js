import io from "socket.io-client";
// import { BASE_URL } from "../config";
import { EventTypes } from "./event-types";
import _ from "lodash";
import { API_URL } from "../config";
import store from "../store";
import { UPDATE_PODIUM } from "../action-types";


let socket = io(API_URL, {
  extraHeaders: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
});
let listeners = [];

function registerNotifyListener(componentId, callback) {
  // console.log("Register", componentId);
  listeners[componentId] = callback;
}

function onReceiveNotify(data) {
  // console.log("[DB] receive noti ", data);
  // console.log(listeners);
  Object.keys(listeners).map((key) => {
    listeners[key](data);
  });
}

function onDisconnect() {
  // console.log("[DB]", "Disconnected from server");
}

function disconnect() {
  // console.log("Dissssssss");
  socket.disconnect();
}

function createNewGame() {
  socket.emit(EventTypes.CREATE_NEW_GAME)
}

function getNewGameSession() {
  socket.on(EventTypes.RECEIVE_NEW_GAME_SESSION, (gameSession) => {console.log(gameSession)});
}

function connectToServer(token) {
  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      // console.log("Connect to server", token);

      socket.on(EventTypes.NOTIFY, onReceiveNotify);

      socket.on(EventTypes.MATH_QUIZ_RANKING, (res) => store.dispatch({type: UPDATE_PODIUM, payload: res}));

      socket.on(EventTypes.AUTHENTICATE, () => console.log("Authen Success"));

      socket.on("disconnect", onDisconnect);
    });
  });
}

function receiveGamePiece() {
  socket.on(EventTypes.GIC_REWARD, (res) => {console.log('token test', res.data.payload)});
}

// ClientEventSystem.connectToServer();

export const ClientEventSystem = {
  connectToServer,
  registerNotifyListener,
  disconnect,
  createNewGame,
  receiveGamePiece,
  socket,
  EventTypes
};
