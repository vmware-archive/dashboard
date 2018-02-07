import { connect } from "react-redux";
import { Dispatch } from "redux";

import AppView from "../../components/AppView";
import { IStoreState } from "../../shared/types";

interface IRouteProps {
  match: {
    params: {
      namespace: string;
      releasename: string;
    };
  };
}

function mapStateToProps({ deployment }: IStoreState, { match: { params } }: IRouteProps) {
  return {
    namespace: params.namespace,
    releasename: params.releasename,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
