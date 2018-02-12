import * as yaml from "js-yaml";
import * as React from "react";

import { IApp, IResource, IServiceSpec } from "../../shared/types";
import AppHeader from "./AppHeader";
import "./AppView.css";

interface IAppViewProps {
  namespace: string;
  releaseName: string;
  app: IApp | undefined;
  getApp: (releaseName: string) => Promise<IApp>;
}

interface IAppViewState {
  deployments: Map<string, IResource>;
  otherResources: Map<string, IResource>;
  services: Map<string, IResource>;
  sockets: WebSocket[];
}

class AppView extends React.Component<IAppViewProps, IAppViewState> {
  public state: IAppViewState = {
    deployments: new Map<string, IResource>(),
    otherResources: new Map<string, IResource>(),
    services: new Map<string, IResource>(),
    sockets: [],
  };

  public async componentDidMount() {
    const { releaseName, getApp } = this.props;
    const app = await getApp(releaseName);
    const manifest: IResource[] = yaml.safeLoadAll(app.data.manifest);
    const watchedKinds = ["Deployment", "Service"];
    const otherResources = manifest
      .filter(d => watchedKinds.indexOf(d.kind) < 0)
      .reduce((acc, r) => {
        acc[`${r.kind}/${r.metadata.name}`] = r;
        return acc;
      }, new Map<string, IResource>());
    this.setState({ otherResources });

    const deployments = manifest.filter(d => d.kind === "Deployment");
    const services = manifest.filter(d => d.kind === "Service");
    const apiBase = `ws://${window.location.host}/api/kube`;
    const sockets: WebSocket[] = [];
    for (const d of deployments) {
      const s = new WebSocket(
        `${apiBase}/apis/apps/v1/namespaces/${
          app.data.namespace
        }/deployments?watch=true&fieldSelector=metadata.name%3D${d.metadata.name}`,
      );
      s.addEventListener("message", e => this.handleEvent(e));
      sockets.push(s);
    }
    for (const svc of services) {
      const s = new WebSocket(
        `${apiBase}/api/v1/namespaces/${
          app.data.namespace
        }/services?watch=true&fieldSelector=metadata.name%3D${svc.metadata.name}`,
      );
      s.addEventListener("message", e => this.handleEvent(e));
      sockets.push(s);
    }
    this.setState({
      sockets,
    });
  }

  public componentWillUnmount() {
    const { sockets } = this.state;
    for (const s of sockets) {
      s.close();
    }
  }

  public handleEvent(e: MessageEvent) {
    const msg = JSON.parse(e.data);
    const resource: IResource = msg.object;
    const key = `${resource.kind}/${resource.metadata.name}`;
    switch (resource.kind) {
      case "Deployment":
        this.setState({ deployments: { ...this.state.deployments, [key]: resource } });
        break;
      case "Service":
        this.setState({ services: { ...this.state.services, [key]: resource } });
        break;
    }
  }

  public render() {
    const { releaseName } = this.props;

    if (!this.state.otherResources) {
      return <div>Loading</div>;
    }
    return (
      <section className="AppView padding-b-big">
        <AppHeader releasename={releaseName} />
        <main>
          <div className="container container-fluid">
            <h6>Deployments</h6>
            <table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>DESIRED</th>
                  <th>UP-TO-DATE</th>
                  <th>AVAILABLE</th>
                </tr>
              </thead>
              <tbody>
                {this.state.deployments &&
                  Object.keys(this.state.deployments).map((k: string) => {
                    const r: IResource = this.state.deployments[k];
                    return (
                      <tr key={k}>
                        <td>{r.metadata.name}</td>
                        <td>{r.status.replicas}</td>
                        <td>{r.status.updatedReplicas}</td>
                        <td>{r.status.availableReplicas || 0}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <h6>Services</h6>
            <table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>TYPE</th>
                  <th>CLUSTER-IP</th>
                  <th>PORT(S)</th>
                </tr>
              </thead>
              <tbody>
                {this.state.services &&
                  Object.keys(this.state.services).map((k: string) => {
                    const r: IResource = this.state.services[k];
                    const spec: IServiceSpec = r.spec;
                    return (
                      <tr key={k}>
                        <td>{r.metadata.name}</td>
                        <td>{spec.type}</td>
                        <td>{spec.clusterIP}</td>
                        <td>
                          {spec.ports
                            .map(
                              p => `${p.port}${p.nodePort ? `:${p.nodePort}` : ""}/${p.protocol}`,
                            )
                            .join(",")}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <h6>Other Resources</h6>
            <table>
              <tbody>
                {this.state.otherResources &&
                  Object.keys(this.state.otherResources).map((k: string) => {
                    const r = this.state.otherResources[k];
                    return (
                      <tr key={k}>
                        <td>{r.kind}</td>
                        <td>{r.metadata.namespace}</td>
                        <td>{r.metadata.name}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </main>
      </section>
    );
  }
}

export default AppView;
