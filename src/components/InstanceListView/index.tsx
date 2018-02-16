import * as React from "react";

import { Link } from "react-router-dom";
import { IClusterServiceClass } from "../../shared/ClusterServiceClass";
import { IServiceBroker, IServicePlan } from "../../shared/ServiceCatalog";
import { IServiceInstance } from "../../shared/ServiceInstance";
import Card, { CardContent, CardFooter, CardGrid, CardIcon } from "../Card";

export interface InstanceListViewProps {
  brokers: IServiceBroker[];
  classes: IClusterServiceClass[];
  getCatalog: () => Promise<any>;
  instances: IServiceInstance[];
  plans: IServicePlan[];
}

export class InstanceListView extends React.PureComponent<InstanceListViewProps> {
  public async componentDidMount() {
    this.props.getCatalog();
  }

  public render() {
    const { brokers, instances, classes } = this.props;

    return (
      <div className="InstanceList">
        {brokers && (
          <div>
            <div className="row align-center">
              <div className="col-8">
                <h1 className="margin-b-reset">Service Instances</h1>
              </div>
              <div className="col-4 text-r">
                <Link to={`/services/classes`}>
                  <button className="button button-accent">Provision New Service</button>
                </Link>
              </div>
            </div>
            <p>Service instances from your brokers:</p>
            <section>
              <CardGrid>
                {instances.length > 0 &&
                  instances.map(instance => {
                    const conditions = [...instance.status.conditions];
                    const status = conditions.shift(); // first in list is most recent
                    const message = status ? status.message : "";
                    const svcClass = classes.find(
                      potential =>
                        potential.metadata.name === instance.spec.clusterServiceClassRef.name,
                    );
                    const broker = svcClass && svcClass.spec.clusterServiceBrokerName;
                    const icon =
                      svcClass &&
                      svcClass.spec.externalMetadata &&
                      svcClass.spec.externalMetadata.imageUrl;
                    const link = `/services/brokers/${broker}/instances/${
                      instance.metadata.namespace
                    }/${instance.metadata.name}/`;

                    const card = (
                      <Card key={instance.metadata.uid} responsive={true} responsiveColumns={3}>
                        <CardIcon icon={icon} />
                        <CardContent>
                          <h5>
                            {instance.metadata.namespace}/{instance.metadata.name}
                          </h5>
                          <p className="type-small margin-reset margin-b-big type-color-light-blue">
                            {instance.spec.clusterServicePlanExternalName}
                          </p>
                          <p className="margin-b-reset">{message}</p>
                        </CardContent>
                        <CardFooter className="text-c">
                          <Link className="button button-accent" to={link}>
                            Details
                          </Link>
                        </CardFooter>
                      </Card>
                    );
                    return card;
                  })}
              </CardGrid>
            </section>
          </div>
        )}
      </div>
    );
  }
}
