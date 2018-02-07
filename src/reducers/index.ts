import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

import { IStoreState } from "../shared/types";
import appsReducer from "./apps";
import chartsReducer from "./charts";

const rootReducer = combineReducers<IStoreState>({
  apps: appsReducer,
  charts: chartsReducer,
  router: routerReducer,
});

export default rootReducer;
