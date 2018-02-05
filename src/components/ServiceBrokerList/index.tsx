import * as React from "react";
import { Link } from "react-router-dom";

import { IServiceBroker, ServiceCatalog } from "../../shared/ServiceCatalog";
import { Card } from "../Card";

interface IServiceBrokerListProps {
  brokers: IServiceBroker[];
}

export const ServiceBrokerList = (props: IServiceBrokerListProps) => {
  const { brokers } = props;
  return (
    <div className="service-broker-list">
      <h3>My Brokers</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {brokers.map(broker => {
          const card = (
            <Card
              key={broker.metadata.uid}
              header={broker.metadata.name}
              body={broker.spec.url}
              buttonText="View"
              linkTo={`/services/brokers/${broker.metadata.name}`}
            />
          );
          return card;
        })}
      </div>
    </div>
  );
};
