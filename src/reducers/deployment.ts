import { getType } from "typesafe-actions";

import actions from "../actions";
import { AppsAction } from "../actions/apps";
import { IDeployment } from "../shared/types";

const initialState: IDeployment = {
  metadata: {
    name: "",
    namespace: "",
  },
};

const deploymentReducer = (state: IDeployment = initialState, action: AppsAction): IDeployment => {
  switch (action.type) {
    case getType(actions.apps.requestDeployment):
      return { ...state };
    case getType(actions.apps.receiveDeployment):
      return { ...state, metadata: action.deployment.metadata };
    default:
  }
  return state;
};

export default deploymentReducer;
