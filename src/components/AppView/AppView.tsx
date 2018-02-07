import * as React from "react";
import encoding from "text-encoding";
import { IResource, IResourceState } from "../../shared/types";
import AppHeader from "./AppHeader";
import "./AppView.css";

interface IAppViewProps {
  namespace: string;
  releasename: string;
}

class AppView extends React.Component<IAppViewProps> {
  public state = {
    resourcebuffer: "",
    resourceevents: {
      items: [],
    },
  };

  public componentDidMount() {
    const { namespace, releasename } = this.props;

    this.appendChunks = this.appendChunks.bind(this);
    this.readChunk = this.readChunk.bind(this);

    this.watchEvent(namespace, releasename);
  }

  public watchEvent(namespace: string, releasename: string) {
    const host =
      location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");

    const deploymentsUrl = `${host}/api/kube/apis/apps/v1beta1/namespaces/${namespace}/deployments?labelSelector=release=${releasename}&watch=true`;

    fetch(deploymentsUrl).then(response => {
      if (response != null && response.body != null) {
        const reader = response.body.getReader();
        this.readChunk(reader);
      }
    });

    const podsUrl = `${host}/api/kube/api/v1/namespaces/${namespace}/pods?labelSelector=release=${releasename}&watch=true`;

    fetch(podsUrl).then(response => {
      if (response != null && response.body != null) {
        const reader = response.body.getReader();
        this.readChunk(reader);
      }
    });

    const secretsUrl = `${host}/api/kube/api/v1/namespaces/${namespace}/secrets?labelSelector=release=${releasename}&watch=true`;

    fetch(secretsUrl).then(response => {
      if (response != null && response.body != null) {
        const reader = response.body.getReader();
        this.readChunk(reader);
      }
    });

    const servicesUrl = `${host}/api/kube/api/v1/namespaces/${namespace}/services?labelSelector=release=${releasename}&watch=true`;

    fetch(servicesUrl).then(response => {
      if (response != null && response.body != null) {
        const reader = response.body.getReader();
        this.readChunk(reader);
      }
    });

    const pvcsUrl = `${host}/api/kube/api/v1/namespaces/${namespace}/persistentvolumeclaims?labelSelector=release=${releasename}&watch=true`;

    fetch(pvcsUrl).then(response => {
      if (response != null && response.body != null) {
        const reader = response.body.getReader();
        this.readChunk(reader);
      }
    });
  }

  public readChunk(reader: any) {
    return reader.read().then((text: any) => this.appendChunks(text, reader));
  }

  public appendChunks(result: any, reader: any) {
    const decoder = new encoding.TextDecoder();
    const chunk = decoder.decode(result.value, { stream: !result.done });
    const text = chunk;
    if (!result.done) {
      try {
        // console.log("raw");
        // console.log(text);
        const textJson = JSON.parse(text);
        const resourceDetail = {
          metadata: textJson.object.metadata,
          resourceType: this.getResourceType(textJson.object.metadata.selfLink),
          spec: textJson.object.spec,
          type: textJson.type,
        };
        const stateText = this.state.resourceevents as IResourceState;
        stateText.items.push(resourceDetail);
        this.setState({ resourceevents: stateText });
      } catch (exception) {
        let bufferText = this.state.resourcebuffer;
        if (bufferText === "") {
          bufferText += text;
          this.setState({ resourcebuffer: bufferText });
        } else {
          // concat and process all

          bufferText += text;
          // console.log("combined text");
          // console.log(bufferText);
          if (bufferText.includes('}\n{"type"')) {
            let bufferTextArray = "[" + bufferText + "]";
            bufferTextArray = bufferTextArray.replace('}\n{"type"', '},{"type"');
            bufferTextArray = bufferTextArray.replace("\n", "");
            // console.log("modified bufferTextArray")
            // console.log(bufferTextArray);
            try {
              const bufferTextJson = JSON.parse(bufferTextArray);
              this.setState({ resourcebuffer: "" });
              // console.log(bufferTextJson.length);
              bufferTextJson.map((r: any) => {
                const resourceDetail = {
                  metadata: r.object.metadata,
                  resourceType: this.getResourceType(r.object.metadata.selfLink),
                  spec: r.object.spec,
                  type: r.type,
                };

                const stateText = this.state.resourceevents as IResourceState;
                stateText.items.push(resourceDetail);
                this.setState({ resourceevents: stateText });
              });
            } catch (exception) {
              this.setState({ resourcebuffer: bufferText });
            }
          } else {
            try {
              const bufferTextJson = JSON.parse(bufferText);
              this.setState({ resourcebuffer: "" });

              const resourceDetail = {
                metadata: bufferTextJson.object.metadata,
                resourceType: this.getResourceType(bufferTextJson.object.metadata.selfLink),
                spec: bufferTextJson.object.spec,
                type: bufferTextJson.type,
              };
              const stateText = this.state.resourceevents as IResourceState;
              stateText.items.push(resourceDetail);
              this.setState({ resourceevents: stateText });
            } catch (exception) {
              this.setState({ resourcebuffer: bufferText });
            }
          }
        }
      }

      return this.readChunk(reader);
    }
  }

  public getResourceType(selflink: string) {
    if (selflink.includes("/deployments/")) {
      return "deployment";
    } else if (selflink.includes("/pods/")) {
      return "pod";
    } else if (selflink.includes("/services/")) {
      return "service";
    } else if (selflink.includes("/deployments/")) {
      return "deployment";
    } else if (selflink.includes("/secrets/")) {
      return "secret";
    } else if (selflink.includes("/persistentvolumeclaims/")) {
      return "persistentvolumeclaim";
    } else {
      return "other";
    }
  }

  public render() {
    const { releasename } = this.props;
    // console.log(this.state.resourceevents);

    if (!this.state.resourceevents) {
      return <div>Loading</div>;
    }
    let index = 0;
    return (
      <section className="AppView padding-b-big">
        <AppHeader releasename={releasename} />
        <main>
          <div className="container container-fluid">
            <h6>Resources</h6>
            {this.state.resourceevents.items.length > 0 &&
              this.state.resourceevents.items.map((r: IResource) => {
                const key = `${index}_${r.metadata.name}`;
                index++;
                return (
                  <div key={key}>
                    Resource Type: {r.resourceType} | Resource Name: {r.metadata.name}| Event Type:{" "}
                    {r.type} | CreationTimestamp: {r.metadata.creationTimestamp}{" "}
                  </div>
                );
              })}
          </div>
        </main>
      </section>
    );
  }
}

export default AppView;
