import * as React from "react";

import { IServiceBroker } from "../../../shared/ServiceCatalog";
import Card, { CardContent, CardFooter, CardGrid } from "../../Card";
import SyncButton from "../../SyncButton";

import "./ServiceBrokerList.css";

interface IServiceBrokerListProps {
  brokers: IServiceBroker[];
  sync: (broker: IServiceBroker) => Promise<any>;
}

const ServiceBrokerList = (props: IServiceBrokerListProps) => {
  const { brokers, sync } = props;
  return (
    <div>
      <h1>Brokers</h1>
      <hr />
      <CardGrid className="BrokerList">
        {brokers.map(broker => (
          <Card key={broker.metadata.uid} responsive={true} responsiveColumns={3}>
            <CardContent>
              <h2 className="margin-reset">{broker.metadata.name}</h2>
              <p className="type-small margin-reset margin-b-big BrokerList__url">
                {broker.spec.url}
              </p>
              <p className="margin-b-reset">
                Last updated {broker.status.lastCatalogRetrievalTime}
              </p>
            </CardContent>
            <CardFooter className="text-c">
              <SyncButton sync={sync} broker={broker} />
            </CardFooter>
          </Card>
        ))}
      </CardGrid>
    </div>
  );
};

export default ServiceBrokerList;
