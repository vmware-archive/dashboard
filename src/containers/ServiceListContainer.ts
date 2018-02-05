import { connect } from "react-redux";
import { Dispatch } from "redux";

import actions from "../actions";
import { AppRepoList } from "../components/AppRepoList";
import { ServiceList } from "../components/ServiceList";
import { AppRepository } from "../shared/AppRepository";
import { IStoreState } from "../shared/types";

function mapStateToProps({ catalog }: IStoreState) {
  const { brokers, classes, plans } = catalog;
  return {
    brokers,
    classes,
    plans,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
    getCatalog: async () => dispatch(actions.catalog.getCatalog()),
  };
}

export const ServiceListContainer = connect(mapStateToProps, mapDispatchToProps)(ServiceList);
