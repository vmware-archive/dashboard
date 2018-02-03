import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Dispatch } from "redux";
import ProvisionButton from "./../components/ProvisionButton";

import { Link } from "react-router-dom";
import { getType } from "typesafe-actions";
import actions from "../actions";
import { installed } from "../actions/catalog";
import { Card, CardContainer } from "../components/Card";
import { ClassList } from "../components/ClassList";
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
  provision: () => any;
  push: () => any;
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
    provision: () => console.log("provision"),
    push: () => console.log("push"),
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
            <Link to={window.location.pathname + "/classes"}>
              <button className="button button-primary">Provision New Service</button>
            </Link>
            <h3>Service Instances</h3>
            <CardContainer>
              {instances.length > 0 &&
                instances.map(instance => {
                  const conditions = [...instance.status.conditions];
                  const status = conditions.shift(); // first in list is most recent
                  const statusMessage = status ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <strong>{status.type}: </strong>
                        <code>
                          <span style={{ color: status.status.match(/true/i) ? "green" : "red" }}>
                            {status.status}
                          </span>
                        </code>
                      </p>
                      <p>
                        <strong>{status.reason}: </strong>
                        <code>{status.message}</code>
                      </p>
                    </div>
                  ) : (
                    <div />
                  );

                  const card = (
                    <Card
                      key={`${instance.metadata.namespace}/${instance.metadata.name}`}
                      header={`${instance.metadata.namespace}/${instance.metadata.name}`}
                      button={<div />}
                      body={statusMessage}
                    />
                  );
                  return card;
                })}
            </CardContainer>
            <h3>Bindings</h3>
            <CardContainer>
              {bindings.length > 0 &&
                bindings.map(binding => {
                  const {
                    instanceRef,
                    secretName,
                    secretDatabase,
                    secretHost,
                    secretPassword,
                    secretPort,
                    secretUsername,
                  } = binding.spec;
                  const statuses: Array<[string, string]> = [
                    ["Instance", instanceRef.name],
                    ["Secret", secretName],
                    ["Database", secretDatabase],
                    ["Host", secretHost],
                    ["Password", secretPassword],
                    ["Port", secretPort],
                    ["Username", secretUsername],
                  ];
                  const body = (
                    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
                      {statuses.map(statusPair => {
                        const [key, value] = statusPair;
                        return (
                          <div key={key} style={{ display: "flex" }}>
                            <strong key={key} style={{ flex: "0 0 5em" }}>
                              {key}:
                            </strong>
                            <code key={value} style={{ flex: "1 1", wordBreak: "break-all" }}>
                              {value}
                            </code>
                          </div>
                        );
                      })}
                    </div>
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
            </CardContainer>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrokerView);
