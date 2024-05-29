import { all, fork } from "redux-saga/effects";
import { watchForSearchData, watchForFilterData } from "./saga";

export default function* watcherSaga() {
  yield all([fork(watchForSearchData), fork(watchForFilterData)]);
}
