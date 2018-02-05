import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Link } from "react-router-dom";
import { push, RouterAction } from "react-router-redux";
import { Dispatch } from "redux";

import actions from "../actions";
import { Card, CardContainer } from "../components/Card";
import { ClassView } from "../components/ClassView";
import ProvisionButton from "../components/ProvisionButton";
import { IServiceClass, IServicePlan, ServiceCatalog } from "../shared/ServiceCatalog";
import { IStoreState } from "../shared/types";

interface IRouteProps {
  match: {
    params: {
      brokerName: string;
      className: string;
    };
  };
}

function mapStateToProps({ catalog }: IStoreState, { match: { params } }: IRouteProps) {
  const svcClass =
    catalog.classes.find(
      potential => !!potential.spec.externalName.match(new RegExp(params.className, "i")),
    ) || null;
  return {
    classes: catalog.classes,
    classname: params.className,
    plans: catalog.plans,
    svcClass,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
    getCatalog: async () => {
      dispatch(actions.catalog.getCatalog());
    },
    provision: async (
      instanceName: string,
      namespace: string,
      className: string,
      planName: string,
      parameters: {},
    ) => {
      dispatch(actions.catalog.provision(instanceName, namespace, className, planName, parameters));
    },
    push: (location: string) => dispatch(push(location)),
  };
}

export const ClassViewContainer = connect(mapStateToProps, mapDispatchToProps)(ClassView);
