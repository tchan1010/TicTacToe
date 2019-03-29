// src/js/reducers/index.js

import { SET_SYMBOL, SET_MATCH, CLEAR_ALL, RECORD_SCORES } from '../constants/action-types';

const initialState  = {
   tileStates: [
      {  highLight: false, displaySymbol: null },
      {  highLight: false, displaySymbol: null },
      {  highLight: false, displaySymbol: null },
      {  highLight: false, displaySymbol: null },
      {  highLight: false, displaySymbol: null },
      {  highLight: false, displaySymbol: null },
      {  highLight: false, displaySymbol: null },
      {  highLight: false, displaySymbol: null },
      {  highLight: false, displaySymbol: null },
   ], 
   oScore : 0,
   xScore : 0
};

function rootReducer( state = initialState, action) {

    switch(action.type) {
      case SET_SYMBOL: 
           var newStates = state.tileStates.slice();
           newStates[action.payload.index].displaySymbol = action.payload.symbol;
           return Object.assign({}, state, {
              tileStates: newStates
           });
       case SET_MATCH:
           var newStates = state.tileStates.slice();
           newStates[action.payload.index0].highLight = true;
           newStates[action.payload.index1].highLight = true;
           newStates[action.payload.index2].highLight = true;
           var player = newStates[action.payload.index0].displaySymbol;
           var oScore = state.oScore;
           var xScore = state.xScore;
           if (player == 'X') {
                ++xScore;
           }
           else {
                ++oScore;
           }
           return Object.assign({}, state, {
              tileStates: newStates,
              oScore : oScore,
              xScore : xScore
           });
       case RECORD_SCORES:
           var data = action.payload.values.split(",");
           return Object.assign({}, state, {
                xScore : parseInt(data[0]),
                oScore : parseInt(data[1]) 
           });
       case CLEAR_ALL:
           var cleanStates = state.tileStates.slice();
           for (let i=0; i < cleanStates.length; ++i) {
                cleanStates[i].highLight = false;
                cleanStates[i].displaySymbol = null;
           }
           return Object.assign({}, state, {
                tileStates: cleanStates } );
       default:
           break;
    }
    return state;
}

export default rootReducer;
