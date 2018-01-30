import * as React from "react";

interface IAppHeaderProps {
  name: string;
}

class AppHeader extends React.Component<IAppHeaderProps> {
  public render() {
    const { name } = this.props;
    return (
      <header>
        <div className="AppView__heading margin-normal">
          <div className="title margin-l-small">
            <h5 className="subtitle margin-b-reset">{name}</h5>
          </div>
        </div>
        <hr />
      </header>
    );
  }
}

export default AppHeader;
