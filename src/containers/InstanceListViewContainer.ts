import { connect } from "react-redux";
import { Dispatch } from "redux";

import actions from "../actions";
import { InstanceListView } from "../components/InstanceListView";
import { ServiceCatalog } from "../shared/ServiceCatalog";
import { IStoreState } from "../shared/types";

interface IRouteProps {
  match: {
    params: {
      brokerName: string;
    };
  };
}

function mapStateToProps({ catalog }: IStoreState, { match: { params } }: IRouteProps) {
  const brokers = catalog.brokers;
  const plans = catalog.plans;
  const classes = catalog.classes;
  const instances = catalog.instances;
  const isInstalled = catalog.isInstalled;
  return {
    brokers,
    classes,
    instances,
    isInstalled,
    plans,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
    checkCatalogInstalled: async () => {
      const isInstalled = await ServiceCatalog.isCatalogInstalled();
      isInstalled
        ? dispatch(actions.catalog.installed())
        : dispatch(actions.catalog.notInstalled());
      return isInstalled;
    },
    getCatalog: async () => {
      dispatch(actions.catalog.getCatalog());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceListView);
