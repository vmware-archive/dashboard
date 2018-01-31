import { connect } from "react-redux";
import { Dispatch } from "redux";

import actions from "../actions";
import { IServiceCatalogDispatch, ServiceCatalogView } from "../components/ServiceCatalog";
import { ServiceCatalog } from "../shared/ServiceCatalog";
import { IStoreState } from "../shared/types";

function mapStateToProps({ catalog }: IStoreState) {
  return {
    ...catalog,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>): IServiceCatalogDispatch {
  return {
    checkCatalogInstalled: async () => {
      const isInstalled = await ServiceCatalog.isCatalogInstalled();
      isInstalled
        ? dispatch(actions.catalog.installed())
        : dispatch(actions.catalog.notInstalled());
      return isInstalled;
    },
    getBindings: async () => {
      dispatch(actions.catalog.requestBindings());
      const bindings = await ServiceCatalog.getServiceBindings();
      console.log(bindings);
      dispatch(actions.catalog.receiveBindings(bindings));
      return bindings;
    },
    getBrokers: async () => {
      dispatch(actions.catalog.requestBrokers());
      const brokers = await ServiceCatalog.getServiceBrokers();
      dispatch(actions.catalog.receiveBrokers(brokers));
      return brokers;
    },
    getClasses: async () => {
      dispatch(actions.catalog.requestClasses());
      const classes = await ServiceCatalog.getServiceClasses();
      dispatch(actions.catalog.receiveClasses(classes));
      return classes;
    },
    getInstances: async () => {
      dispatch(actions.catalog.requestInstances());
      const instances = await ServiceCatalog.getServiceInstances();
      dispatch(actions.catalog.receiveInstances(instances));
      return instances;
    },
    getPlans: async () => {
      dispatch(actions.catalog.requestPlans());
      const plans = await ServiceCatalog.getServicePlans();
      dispatch(actions.catalog.receivePlans(plans));
      return plans;
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCatalogView);
