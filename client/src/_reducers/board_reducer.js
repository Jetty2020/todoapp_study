import {
  LOAD_BOARD,
  UPLOAD_BOARD,
  DELETE_BOARD
} from '../_actions/_types';
 
export default function boardReducer (state={},action){
  switch(action.type){
    case LOAD_BOARD:
      return {...state, register: action.payload };
    case UPLOAD_BOARD:
      return {...state, register: action.payload };
    case DELETE_BOARD:
      return {...state, register: action.payload };
    default:
      return state;
  };
};