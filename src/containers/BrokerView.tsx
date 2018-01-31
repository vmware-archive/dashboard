import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Dispatch } from "redux";

import { Link } from "react-router-dom";
import { getType } from "typesafe-actions";
import actions from "../actions";
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
      broker: string;
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
      potental => !!potental.metadata.name.match(new RegExp(params.broker, "i")),
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
  getBindings: () => Promise<IServiceBinding[]>;
  getBrokers: () => Promise<IServiceBroker[]>;
  getClasses: () => Promise<IServiceClass[]>;
  getInstances: () => Promise<IServiceInstance[]>;
  getPlans: () => Promise<IServicePlan[]>;
}
function mapDispatchToProps(dispatch: Dispatch<IStoreState>): IBrokerViewDispatch {
  return {
    getBindings: async () => {
      dispatch(actions.catalog.requestBindings());
      const bindings = await ServiceCatalog.getServiceBindings();
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

class BrokerView extends React.PureComponent<IBrokerViewProps & IBrokerViewDispatch> {
  public async componentDidMount() {
    this.props.getBindings();
    this.props.getBrokers();
    this.props.getInstances();
    this.props.getPlans();
  }

  public render() {
    const { bindings, broker, plans, instances } = this.props;
    return (
      <div className="broker">
        {broker && (
          <div>
            <h1>{broker.metadata.name}</h1>
            <h3>Bindings</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Namespace</th>
                  <th>Instance</th>
                </tr>
              </thead>
              <tbody>
                {bindings.map(binding => (
                  <tr key={binding.metadata.uid}>
                    <td>{binding.metadata.name}</td>
                    <td>{binding.metadata.namespace}</td>
                    <td>{binding.spec.instanceRef.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Instances</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Plan</th>
                </tr>
              </thead>
              <tbody>
                {instances.map(instance => (
                  <tr key={instance.metadata.uid}>
                    <td>{instance.metadata.name}</td>
                    <td>
                      {instance.spec.clusterServiceClassRef.name} |{" "}
                      {instance.spec.clusterServiceClassExternalName}
                    </td>
                    <td>
                      {instance.spec.clusterServicePlanRef.name} |{" "}
                      {instance.spec.clusterServicePlanExternalName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>Plans</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Free</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {plans.map(plan => {
                  return (
                    <tr key={plan.spec.externalID}>
                      <td>{plan.spec.externalName}</td>
                      <td>{plan.spec.description}</td>
                      <td>{plan.spec.free && <span style={{ color: "green" }}>✓</span>}</td>
                      <td>
                        <button>Provision</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrokerView);
