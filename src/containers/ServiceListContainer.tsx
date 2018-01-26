import * as React from "react";
import {
  IServiceBinding,
  IServiceBroker,
  IServiceClass,
  IServiceInstance,
  IServicePlan,
  ServiceCatalog,
} from "../shared/ServiceCatalog";

interface IServiceListContainerState {
  brokers: IServiceBroker[];
  classes: IServiceClass[];
  plans: IServicePlan[];
  instances: IServiceInstance[];
  bindings: IServiceBinding[];
}

export class ServiceListContainer extends React.Component {
  public state: IServiceListContainerState = {
    bindings: [],
    brokers: [],
    classes: [],
    instances: [],
    plans: [],
  };

  public async componentDidMount() {
    ServiceCatalog.getServiceBindings()
      .then(bindings => this.setState({ bindings }))
      .catch(err => []);
    ServiceCatalog.getServiceBrokers()
      .then(brokers => this.setState({ brokers }))
      .catch(err => []);
    ServiceCatalog.getServiceClasses()
      .then(classes => this.setState({ classes }))
      .catch(err => []);
    ServiceCatalog.getServiceInstances()
      .then(instances => this.setState({ instances }))
      .catch(err => []);
    ServiceCatalog.getServicePlans()
      .then(plans => this.setState({ plans }))
      .catch(err => []);
  }

  public render() {
    const { bindings, brokers, classes, instances, plans } = this.state;
    return (
      <div className="service-list-container">
        <h2>Bindings</h2>
        <dl>
          {bindings.length > 0 &&
            bindings.map(binding => {
              return [
                <dt key={binding.metadata.name}>{binding.metadata.name}</dt>,
                <dd key={binding.spec.instanceRef.name}>{binding.spec.instanceRef.name}</dd>,
                <dd key={binding.spec.secretName}>{binding.spec.secretName}</dd>,
                <dd key={binding.spec.secretDatabase}>Database: {binding.spec.secretDatabase}</dd>,
                <dd key={binding.spec.secretHost}>Host: {binding.spec.secretHost}</dd>,
                <dd key={binding.spec.secretPassword}>Password: {binding.spec.secretPassword}</dd>,
                <dd key={binding.spec.secretPort}>Port: {binding.spec.secretPort}</dd>,
                <dd key={binding.spec.secretUsername}>Username: {binding.spec.secretUsername}</dd>,
              ];
            })}
        </dl>
        <h2>Brokers</h2>
        <dl>
          {brokers.length > 0 &&
            brokers.map(broker => {
              return [
                <dt key={broker.metadata.name}>{broker.metadata.name}</dt>,
                <dd key={broker.spec.url}>{broker.spec.url}</dd>,
              ];
            })}
        </dl>
        <h2>Classes</h2>
        <dl>
          {classes.length > 0 &&
            classes.map(serviceClass => {
              return [
                <dt key={serviceClass.spec.externalName}>{serviceClass.spec.externalName}</dt>,
                <dd key={serviceClass.spec.description}>{serviceClass.spec.description}</dd>,
              ];
            })}
        </dl>
        <h2>Instances</h2>
        <dl>
          {instances.length > 0 &&
            instances.map(instance => {
              return [
                <dt key={instance.metadata.name}>{instance.metadata.name}</dt>,
                <dd key={instance.spec.clusterServiceClassExternalName}>
                  {instance.spec.clusterServiceClassExternalName}
                </dd>,
                <dd key={instance.spec.clusterServicePlanExternalName}>
                  {instance.spec.clusterServicePlanExternalName}
                </dd>,
              ];
            })}
        </dl>
        <h2>Plans</h2>
        <dl>
          {plans.length > 0 &&
            plans.map(plan => {
              return [
                <dt key={plan.spec.externalName}>{plan.spec.externalName}</dt>,
                <dd key={plan.spec.description}>{plan.spec.description}</dd>,
              ];
            })}
        </dl>
      </div>
    );
  }
}
