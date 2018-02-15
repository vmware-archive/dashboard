import * as React from "react";
import { NavLink } from "react-router-dom";

// Expected props
export interface IHeaderLinkProps {
  to: string;
  exact?: boolean;
  external?: boolean;
  children?: React.ReactChildren | React.ReactNode | string;
}

class HeaderLink extends React.Component<IHeaderLinkProps> {
  public static defaultProps: Partial<IHeaderLinkProps> = {
    exact: false,
    external: false,
  };

  public renderInternalLink() {
    return (
      <NavLink
        to={this.props.to}
        activeClassName="header__nav__menu__item-active"
        className="header__nav__menu__item"
        exact={this.props.exact}
      >
        {this.props.children}
      </NavLink>
    );
  }

  public renderExternalLink() {
    return (
      <a href={this.props.to} className="header__nav__menu__item">
        {this.props.children}
      </a>
    );
  }

  public render() {
    return this.props.external ? this.renderExternalLink() : this.renderInternalLink();
  }
}

export default HeaderLink;
