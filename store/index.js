// src/js/store/index.js

import { createStore, applyMiddleware, compose /*, combineReducers*/ } from "redux";
import rootReducer from "../reducers/index";
import { AsyncFetchScores, AsyncSaveScores } from "../middleWare/index";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	/*
const topReducer = combineReducers( {
     rootReducer
});
	*/

const store = createStore(rootReducer, /*topReducer,*/
        storeEnhancers(applyMiddleware(AsyncFetchScores,AsyncSaveScores))
            );

export default store;

