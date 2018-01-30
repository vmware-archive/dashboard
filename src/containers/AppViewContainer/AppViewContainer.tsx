import { connect } from "react-redux";
import { Dispatch } from "redux";

// import actions from "../../actions";
import AppView from "../../components/AppView";
import { IStoreState } from "../../shared/types";

interface IRouteProps {
  match: {
    params: {
      name: string;
    };
  };
}

function mapStateToProps({ apps }: IStoreState, { match: { params } }: IRouteProps) {
  return {
    name: params.name,
    isFetching: apps.isFetching,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
