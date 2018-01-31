import * as React from "react";
import { Link } from "react-router-dom";
import { IServiceBroker, ServiceCatalog } from "../shared/ServiceCatalog";

interface IServiceBrokerListProps {
  brokers: IServiceBroker[];
}

export const ServiceBrokerList = (props: IServiceBrokerListProps) => {
  const { brokers } = props;
  return (
    <div className="service-broker-list">
      <h2>Service Brokers</h2>
      <h3>My Brokers</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {brokers.map(broker => (
            <tr className="broker" key={broker.metadata.uid}>
              <td>{broker.metadata.name}</td>
              <td>{broker.spec.url}</td>
              <td>
                <button>
                  <Link to={`/services/brokers/${broker.metadata.name}`}>View</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <h3>Available Broker Repositories</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            <tr className="broker">
              <td>Azure</td>
              <td>https://kubernetescharts.blob.core.windows.net/azure</td>
              <td>
                <button>Add Azure Repository</button>
                <button><Link to={'charts/azure/azure-service-broker'}>Install</Link></button>
              </td>
            </tr>
          </tbody>
        </table> */}
    </div>
  );
};

// export class ServiceBrokerList extends React.Component<
//   IServiceBrokerListProps,
//   IServiceBrokerListProps
// > {
//   constructor(props: IServiceBrokerListProps) {
//     super(props);
//   }

//   public render() {
//     // console.log(this.props);
//     return (
//       <div className="service-broker-list">
//         <h2>Service Brokers</h2>
//         <h3>My Brokers</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>URL</th>
//               <th>---</th>
//             </tr>
//           </thead>
//           {this.props.brokers.map(broker => (
//             <tr className="broker">
//               <td>{broker.metadata.name}</td>
//               <td>{broker.spec.url}</td>
//               <td>
//                 <button>Install</button>
//               </td>
//             </tr>
//           ))}
//         </table>
//         <h3>Available Broker Repositories</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>URL</th>
//               <th/>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="broker">
//               <td>Azure</td>
//               <td>https://kubernetescharts.blob.core.windows.net/azure</td>
//               <td>
//                 <button>Add Azure Repository</button>
//                 <button><Link to={'charts/azure/azure-service-broker'}>Install</Link></button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }
