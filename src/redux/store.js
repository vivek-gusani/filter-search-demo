import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import allFiltersReducer from "./ducks/allFilters";
import watcherSaga from "./sagas/rootSaga";

const reducer = combineReducers({
    allFiltersReducer: allFiltersReducer,
 
});

const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const sagaMiddleWares = createSagaMiddleware();
const middleWares = [sagaMiddleWares];

if (process.env.NODE_ENV === "development") {
  middleWares.push(logger);
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleWares))
);

export const getStore = () => {
  return store;
};
// const store = createStore(reducer, applyMiddleware(...middleWares));

sagaMiddleWares.run(watcherSaga);

export default store;
