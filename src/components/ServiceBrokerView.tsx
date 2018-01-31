import * as React from "react";
import { IServiceBroker } from "../shared/ServiceCatalog";

interface IServiceBrokerViewProps {
  broker: IServiceBroker;
}

export const ServiceBrokerView = (props: IServiceBrokerViewProps) => {
  return (
    <div className="broker">
      <pre>
        <code>{JSON.stringify(props.broker, null, 2)}</code>
      </pre>
    </div>
  );
};
