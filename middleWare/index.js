// src/js/middleware/index.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_SCORES, SAVE_SCORES, OLD_SCORES } from "../constants/action-types";
import { recordScores } from "../actions/index";

// check forbidden word in user's input string
export function AsyncFetchScores({ dispatch }) {
  return function(next) {
    return function(action) {

      if (action.type === FETCH_SCORES) {

        AsyncStorage.getItem(OLD_SCORES)
            .then( values  => {
                if (values != null) {
		    dispatch( recordScores({values:values}) );
                }
            })
            .catch( error => {
               alert("Fetch old scores failed: " + error.message);
            })
            .done();
      }
      return next(action);
    };
  };
}

// asynchronous call to fetch remote articles
export function AsyncSaveScores( { dispatch, getState }) {
  return function(next) {
     return function(action) {
        if (action.type === SAVE_SCORES) {

                var state = getState();
                var newScores = state.xScore + ',' + state.oScore;

                //alert("AsyncSaveScore: newScore: " + newScores + ", payload: " + action.payload.values);

                AsyncStorage.setItem(OLD_SCORES,newScores)
                    .then( status => {
			console.log("Save scores done");
                    })
                    .catch( error => {
                         alert("Save scores failed: " + error.message);
                     })
                    .done();
        }
        return next(action);
     }
   }
}
