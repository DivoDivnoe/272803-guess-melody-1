import {combineReducers} from 'redux';
import {reducer as game} from './game/game';
import {reducer as data} from './data/data';
import NameSpace from '../name-spaces';

export default combineReducers({
  [NameSpace.GAME]: game,
  [NameSpace.DATA]: data,
});
