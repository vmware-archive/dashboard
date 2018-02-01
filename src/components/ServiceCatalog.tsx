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
import { Card } from "./Card";

export interface IServiceCatalogDispatch {
  checkCatalogInstalled: () => Promise<boolean>;
  getCatalog: () => Promise<any>;
}

export class ServiceCatalogView extends React.Component<
  IServiceCatalogDispatch & IServiceCatalogState
> {
  public async componentDidMount() {
    this.props.checkCatalogInstalled();
    this.props.getCatalog();
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
      </div>
    );
  }
}
