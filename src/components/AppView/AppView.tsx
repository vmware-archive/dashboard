import * as React from "react";

import { IDeployment } from "../../shared/types";
import AppHeader from "./AppHeader";
import "./AppView.css";

interface IAppViewProps {
  namespace: string;
  releasename: string;
  chartname: string;
  deployment: IDeployment;
  getDeployment: (namespace: string, deployname: string) => Promise<{}>;
}

class AppView extends React.Component<IAppViewProps> {
  public componentDidMount() {
    const { namespace, releasename, chartname, getDeployment } = this.props;
    const deployname = releasename + `-` + chartname;
    getDeployment(namespace, deployname);
  }

  public render() {
    const { releasename, deployment } = this.props;

    if (!deployment.metadata.name) {
      return <div>Loading</div>;
    }
    return (
      <section className="AppView padding-b-big">
        <AppHeader releasename={releasename} />
        <main>
          <div className="container container-fluid">
            <div className="row">
              <dl>
                <dt key={deployment.metadata.name}>Name: {deployment.metadata.name}</dt>
                <dd key={deployment.metadata.namespace}>
                  NameSpace: {deployment.metadata.namespace}
                </dd>
              </dl>
            </div>
          </div>
        </main>
      </section>
    );
  }
}

export default AppView;
