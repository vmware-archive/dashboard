import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

import { IStoreState } from "../shared/types";
import appsReducer from "./apps";
import chartsReducer from "./charts";
import deploymentReducer from "./deployment";

const rootReducer = combineReducers<IStoreState>({
  apps: appsReducer,
  charts: chartsReducer,
  deployment: deploymentReducer,
  router: routerReducer,
});

export default rootReducer;
