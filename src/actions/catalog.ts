import axios from "axios";
import { disconnect } from "cluster";
import { Dispatch } from "redux";
import { createAction, getReturnOfExpression } from "typesafe-actions";
import {
  IServiceBinding,
  IServiceBroker,
  IServiceClass,
  IServiceInstance,
  IServicePlan,
  ServiceCatalog,
} from "../shared/ServiceCatalog";
import { IStoreState } from "../shared/types";
import * as url from "../shared/url";

export const checkCatalogInstall = createAction("CHECK_INSTALL");
export const installed = createAction("INSTALLED");
export const notInstalled = createAction("_NOT_INSTALLED");
export const requestBrokers = createAction("REQUEST_BROKERS");
export const receiveBrokers = createAction("RECEIVE_BROKERS", (brokers: IServiceBroker[]) => ({
  brokers,
  type: "RECEIVE_BROKERS",
}));
export const requestPlans = createAction("REQUEST_PLANS");
export const receivePlans = createAction("RECEIVE_PLANS", (plans: IServicePlan[]) => ({
  plans,
  type: "RECEIVE_PLANS",
}));
export const requestInstances = createAction("REQUEST_INSTANCES");
export const receiveInstances = createAction(
  "RECEIVE_INSTANCES",
  (instances: IServiceInstance[]) => ({ type: "RECEIVE_INSTANCES", instances }),
);
export const requestBindings = createAction("REQUEST_BINDINGS");
export const receiveBindings = createAction("RECEIVE_BINDINGS", (bindings: IServiceBinding[]) => ({
  bindings,
  type: "RECEIVE_BINDINGS",
}));
export const requestClasses = createAction("REQUEST_PLANS");
export const receiveClasses = createAction("RECEIVE_CLASSES", (classes: IServiceClass[]) => ({
  classes,
  type: "RECEIVE_CLASSES",
}));

const actions = [
  checkCatalogInstall,
  installed,
  notInstalled,
  requestBrokers,
  receiveBrokers,
  requestPlans,
  receivePlans,
  requestInstances,
  receiveInstances,
  requestBindings,
  receiveBindings,
  requestClasses,
  receiveClasses,
].map(getReturnOfExpression);

export function provision(
  releaseName: string,
  namespace: string,
  className: string,
  planName: string,
) {
  return (dispatch: Dispatch<IStoreState>): Promise<{}> => {
    return fetch(url.api.serviceinstances.create(namespace), {
      headers: { "Content-Type": "application/json" },
      method: "POST",

      body: JSON.stringify({
        apiVersion: "servicecatalog.k8s.io/v1beta1",
        kind: "ServiceInstance",
        metadata: {
          name: releaseName,
        },
        spec: {
          // clusterServiceClassExternalName: "azure-mysqldb",
          // clusterServicePlanExternalName: "standard100",

          clusterServiceClassExternalName: className,
          clusterServicePlanExternalName: planName,
          parameters: {},
        },
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.status === "Failure") {
          throw new Error(json.message);
        }
        return json;
      });
  };
}

export type ServiceCatalogAction = typeof actions[number];

export function getBindings() {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(requestBindings());
    const bindings = await ServiceCatalog.getServiceBindings();
    dispatch(receiveBindings(bindings));
    return bindings;
  };
}

export function getBrokers() {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(requestBrokers());
    const brokers = await ServiceCatalog.getServiceBrokers();
    dispatch(receiveBrokers(brokers));
    return brokers;
  };
}

export function getClasses() {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(requestClasses());
    const classes = await ServiceCatalog.getServiceClasses();
    dispatch(receiveClasses(classes));
    return classes;
  };
}

export function getInstances() {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(requestInstances());
    const instances = await ServiceCatalog.getServiceInstances();
    dispatch(receiveInstances(instances));
    return instances;
  };
}

export function getPlans() {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(requestPlans());
    const plans = await ServiceCatalog.getServicePlans();
    dispatch(receivePlans(plans));
    return plans;
  };
}

export function getCatalog() {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(getBindings());
    dispatch(getBrokers());
    dispatch(getClasses());
    dispatch(getInstances());
    dispatch(getPlans());
  };
}
