import * as React from "react";

export interface ICardContentProps {
  className?: string;
  children?: React.ReactChildren | React.ReactNode | string;
}

class CardContent extends React.PureComponent<ICardContentProps> {
  public render() {
    return <div className="Card__content padding-normal">{this.props.children}</div>;
  }
}

export default CardContent;
