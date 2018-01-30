import * as React from "react";
import { Link } from "react-router-dom";

import { IApp } from "../../shared/types";
import ChartIcon from "../ChartIcon";
import "./AppListItem.css";

interface IAppListItemProps {
  app: IApp;
}

class AppListItem extends React.Component<IAppListItemProps> {
  public render() {
    const { app } = this.props;
    const release = app.data;
    let iconSrc: string | undefined;
    if (app.repo && app.data.chart && app.data.chart.metadata) {
      iconSrc = `assets/${app.repo.name}/${app.data.chart.metadata.name}`;
    }
    return (
      <div className="AppListItem padding-normal margin-big elevation-5">
        <Link to={`/apps/` + release.name}>
          <div className="AppListList__details">
            <ChartIcon icon={iconSrc} />
            <h6>{release.name}</h6>
          </div>
        </Link>
      </div>
    );
  }
}

export default AppListItem;
