import * as React from "react";

// import { IApp } from "../../shared/types";
import AppHeader from "./AppHeader";
import "./AppView.css";

interface IAppViewProps {
  name: string;
  isFetching: boolean;
}

class AppView extends React.Component<IAppViewProps> {
  public componentDidMount() {
    // const { name } = this.props;
    // fetchApp(name);
  }

  public componentWillReceiveProps(nextProps: IAppViewProps) {
    // const { name } = this.props;
  }

  public render() {
    const { name } = this.props;
    return (
      <section className="AppView padding-b-big">
        <AppHeader name={name} />
        <main>
          <div className="container container-fluid">
            <div className="row">
              <div className="col-9 AppView__readme-container" />
            </div>
          </div>
        </main>
      </section>
    );
  }
}

export default AppView;
