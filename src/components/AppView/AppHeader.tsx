import * as React from "react";

interface IAppHeaderProps {
  releasename: string;
}

class AppHeader extends React.Component<IAppHeaderProps> {
  public render() {
    const { releasename } = this.props;
    return (
      <header>
        <div className="AppView__heading margin-normal">
          <div className="title margin-l-small">
            <h5 className="subtitle margin-b-reset">{releasename}</h5>
          </div>
        </div>
        <hr />
      </header>
    );
  }
}

export default AppHeader;
