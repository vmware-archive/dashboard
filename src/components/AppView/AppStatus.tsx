import * as React from "react";

import Check from "../../icons/Check";
import Compass from "../../icons/Compass";
import { IResource } from "../../shared/types";
import "./AppStatus.css";

interface IAppStatusProps {
  deployments: Map<string, IResource>;
}

class AppStatus extends React.Component<IAppStatusProps> {
  public render() {
    let status = (
      <span className="AppStatus AppStatus--success">
        <Check className="icon padding-t-tiny" /> Deployed
      </span>
    );
    const { deployments } = this.props;
    if (Object.keys(deployments).length > 0) {
      const allPodsReady = Object.keys(deployments).every(k => {
        const d = deployments[k];
        return d.status.availableReplicas === d.status.replicas;
      });
      status = allPodsReady ? (
        status
      ) : (
        <span className="AppStatus AppStatus--pending">
          <Compass className="icon padding-t-tiny" /> Deploying
        </span>
      );
    }
    return status;
  }
}

export default AppStatus;
