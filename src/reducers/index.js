import { combineReducers } from 'redux';

import audio from './audio';
import auth from './auth';
import game from './game';
import leaderboard from './leaderboard';
import marketplace from './marketplace';


export default combineReducers({
  audio,
  auth,
  game,
  leaderboard,
  marketplace
});
