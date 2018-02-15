import * as React from "react";

import { IClusterServiceClass } from "../../shared/ClusterServiceClass";
import { IServiceBroker, IServicePlan } from "../../shared/ServiceCatalog";
import { IServiceInstance } from "../../shared/ServiceInstance";
import { Card, CardContainer } from "../Card";

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
    const { brokers, instances } = this.props;

    return (
      <div className="broker">
        {brokers && (
          <div>
            <h3>Service Instances</h3>
            <p>Service instances from your brokers:</p>
            <table>
              <tbody>
                <CardContainer>
                  {instances.length > 0 &&
                    instances.map(instance => {
                      const conditions = [...instance.status.conditions];
                      const status = conditions.shift(); // first in list is most recent
                      const message = status ? status.message : "";

                      const card = (
                        <Card
                          key={instance.metadata.uid}
                          header={
                            <span>
                              {instance.metadata.namespace}/{instance.metadata.name}
                            </span>
                          }
                          // icon={instance}
                          body={message}
                          buttonText="Details"
                          linkTo={`/`}
                          notes={<span>{instance.spec.clusterServicePlanExternalName}</span>}
                        />
                      );
                      return card;
                    })}
                </CardContainer>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
