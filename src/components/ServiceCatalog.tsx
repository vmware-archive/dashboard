import * as React from "react";
import { Link } from "react-router-dom";
import { AppRepoForm } from "../components/AppRepoForm";
import { AppRepository } from "../shared/AppRepository";
import { HelmRelease } from "../shared/HelmRelease";
import {
  IServiceBinding,
  IServiceBroker,
  IServiceClass,
  IServiceInstance,
  IServicePlan,
  ServiceCatalog,
} from "../shared/ServiceCatalog";

import { ServiceBrokerList } from "../components/ServiceBrokerList";
import { IServiceCatalogState } from "../reducers/catalog";

export interface IServiceCatalogDispatch {
  checkCatalogInstalled: () => Promise<boolean>;
  getBindings: () => Promise<IServiceBinding[]>;
  getBrokers: () => Promise<IServiceBroker[]>;
  getClasses: () => Promise<IServiceClass[]>;
  getInstances: () => Promise<IServiceInstance[]>;
  getPlans: () => Promise<IServicePlan[]>;
}

export class ServiceCatalogView extends React.Component<
  IServiceCatalogDispatch & IServiceCatalogState
> {
  public async componentDidMount() {
    this.props.checkCatalogInstalled();
    this.props.getBindings();
    this.props.getBrokers();
    this.props.getClasses();
    this.props.getInstances();
    this.props.getPlans();
  }

  public render() {
    const { bindings, brokers, classes, instances, plans, isInstalled } = this.props;
    return (
      <div className="service-list-container">
        <h1>Service Catalog</h1>
        {!isInstalled ? (
          <div>
            <p>Service Catalog not installed.</p>
            <div className="padding-normal">
              <Link className="button button-primary" to={`/charts`}>
                Install Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <ServiceBrokerList brokers={this.props.brokers} />
          </div>
        )}
        <h2>Bindings</h2>
        <dl>
          {bindings.length > 0 &&
            bindings.map(binding => {
              return [
                <dt key={binding.metadata.name}>{binding.metadata.name}</dt>,
                <dd key={binding.spec.instanceRef.name}>
                  Instance: {binding.spec.instanceRef.name}
                </dd>,
                <dd key={binding.spec.secretName}>Secret: {binding.spec.secretName}</dd>,
                <dd key={binding.spec.secretDatabase}>Database: {binding.spec.secretDatabase}</dd>,
                <dd key={binding.spec.secretHost}>Host: {binding.spec.secretHost}</dd>,
                <dd key={binding.spec.secretPassword}>Password: {binding.spec.secretPassword}</dd>,
                <dd key={binding.spec.secretPort}>Port: {binding.spec.secretPort}</dd>,
                <dd key={binding.spec.secretUsername}>Username: {binding.spec.secretUsername}</dd>,
              ];
            })}
        </dl>
      </div>
    );
  }
}
