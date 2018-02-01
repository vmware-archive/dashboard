import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Dispatch } from "redux";
<<<<<<< HEAD
import ProvisionButton from "./../components/ProvisionButton";
=======
>>>>>>> wip

import { Link } from "react-router-dom";
import { getType } from "typesafe-actions";
import actions from "../actions";
import { Card } from "../components/Card";
import {
  IServiceBinding,
  IServiceBroker,
  IServiceClass,
  IServiceInstance,
  IServicePlan,
  ServiceCatalog,
} from "../shared/ServiceCatalog";
import { IStoreState } from "../shared/types";

interface IRouteProps {
  match: {
    params: {
      brokerName: string;
    };
  };
}

interface IBrokerViewProps {
  bindings: IServiceBinding[];
  broker: IServiceBroker | null;
  classes: IServiceClass[];
  instances: IServiceInstance[];
  plans: IServicePlan[];
}

function mapStateToProps(
  { catalog }: IStoreState,
  { match: { params } }: IRouteProps,
): IBrokerViewProps {
  const broker =
    catalog.brokers.find(
      potental => !!potental.metadata.name.match(new RegExp(params.brokerName, "i")),
    ) || null;
  const plans = broker
    ? catalog.plans.filter(
        plan => !!plan.spec.clusterServiceBrokerName.match(new RegExp(broker.metadata.name, "i")),
      )
    : [];
  const classes = broker
    ? catalog.classes.filter(
        serviceClass =>
          !!serviceClass.spec.clusterServiceBrokerName.match(new RegExp(broker.metadata.name, "i")),
      )
    : [];
  const instances = broker ? catalog.instances : [];
  const bindings = broker ? catalog.bindings : [];
  return {
    bindings,
    broker,
    classes,
    instances,
    plans,
  };
}

interface IBrokerViewDispatch {
  getCatalog: () => Promise<any>;
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>): IBrokerViewDispatch {
  return {
    getCatalog: async () => {
      dispatch(actions.catalog.getCatalog());
    },
    // provision: (releaseName: string, namespace: string) =>
    // dispatch(actions.catalog.provision(releaseName, namespace)),
  };
}

class BrokerView extends React.PureComponent<IBrokerViewProps & IBrokerViewDispatch> {
  public async componentDidMount() {
    this.props.getCatalog();
  }

  public render() {
    const { bindings, broker, plans, classes, instances, provision, push } = this.props;
    const classesIndexedByName = classes.reduce<{ [key: string]: IServiceClass }>(
      (carry, serviceClass) => {
        const { name } = serviceClass.metadata;
        carry[name] = serviceClass;
        return carry;
      },
      {},
    );

    const plansIndexedByClassName = plans.reduce<{ [key: string]: IServicePlan[] }>(
      (carry, plan) => {
        const className = plan.spec.clusterServiceClassRef.name;
        const svcClass = classes.find(cls => cls.metadata.name === className);

        // ServiceClasses may not have been retreived yet
        if (svcClass) {
          const svcClassExternalName = svcClass.spec.externalName;
          if (!carry[svcClassExternalName]) {
            carry[svcClassExternalName] = [];
          }
          carry[svcClassExternalName].push(plan);
        }
        return carry;
      },
      {},
    );

    return (
      <div className="broker">
        {broker && (
          <div>
            <h1>{broker.metadata.name}</h1>
            <h3>Bindings</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {bindings.length > 0 &&
                bindings.map(binding => {
                  const body = (
                    <dl>
                      <dt>Instance: </dt>
                      <dd>{binding.spec.instanceRef.name}</dd>
                      <dt>Secret: </dt>
                      <dd>{binding.spec.secretName}</dd>
                      <dt>Database:</dt>
                      <dd>{binding.spec.secretDatabase}</dd>
                      <dt>Host</dt>
                      <dd>{binding.spec.secretHost}</dd>
                      <dt>Password</dt>
                      <dd>{binding.spec.secretPassword}</dd>
                      <dt>Port</dt>
                      <dd>{binding.spec.secretPort}</dd>
                      <dt>Username</dt>
                      <dd>{binding.spec.secretUsername}</dd>
                    </dl>
                  );
                  const card = (
                    <Card
                      key={binding.metadata.name}
                      header={binding.metadata.name}
                      body={body}
                      buttonText={"View"}
                    />
                  );
                  return card;
                })}
            </div>
            <h3>Classes</h3>
            <p>Classes of services available from this broker</p>
            <div className="classes" style={{ display: "flex", flexWrap: "wrap" }}>
              {classes.map(svcClass => {
                const card = (
                  <Card
                    key={svcClass.metadata.uid}
                    header={svcClass.spec.externalName}
                    body={svcClass.spec.description}
                    buttonText="View Plans"
                    linkTo={`${window.location.pathname}/${svcClass.spec.externalName}`}
                  />
                );
                return card;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrokerView);
