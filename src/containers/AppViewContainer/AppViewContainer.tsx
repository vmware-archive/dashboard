import { connect } from "react-redux";
import { Dispatch } from "redux";

import actions from "../../actions";
import AppView from "../../components/AppView";
import { IStoreState } from "../../shared/types";

interface IRouteProps {
  match: {
    params: {
      namespace: string;
      releasename: string;
      chartname: string;
    };
  };
}

function mapStateToProps({ deployment }: IStoreState, { match: { params } }: IRouteProps) {
  return {
    chartname: params.chartname,
    deployment,
    namespace: params.namespace,
    releasename: params.releasename,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
    getDeployment: (namespace: string, deployname: string) =>
      dispatch(actions.apps.getDeployment(namespace, deployname)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
