

import { SET_SYMBOL, SET_MATCH, CLEAR_ALL, FETCH_SCORES, RECORD_SCORES,
         SAVE_SCORES  } from "../constants/action-types";

export function setSymbol( payload ) {
   return { type: SET_SYMBOL, payload };
}

export function setHightlight( payload ) {
   return { type: SET_MATCH, payload };
}

export function clearAll() {
    return { type: CLEAR_ALL }
}

export function fetchScores() {
    return { type: FETCH_SCORES }
}

export function saveScores() {
    return { type: SAVE_SCORES }
}

export function recordScores( payload ) {
    return { type: RECORD_SCORES, payload }
}
