import * as React from "react";
import { Link } from "react-router-dom";
import placeholder from "../../placeholder.png";
import "./Sidebar.css";

class Sidebar extends React.Component {
  public render() {
    return (
      <aside className="Sidebar bg-dark type-color-reverse-anchor-reset">
        <ul className="remove-style margin-reset padding-h-normal text-c">
          <li className="padding-v-normal">
            <img src={placeholder} height="48" />
            <div className="type-small">Apps</div>
          </li>
          <li className="padding-v-normal">
            <img src={placeholder} height="48" />
            <div className="type-small">Functions</div>
          </li>
          <li className="padding-v-normal">
            <img src={placeholder} height="48" />
            <div className="type-small">
              <Link to={"/charts"}>Charts</Link>
            </div>
          </li>
          <li className="padding-v-normal">
            <img src={placeholder} height="48" />
            <div className="type-small">
              <Link to={"/services"}>Service Catalog</Link>
            </div>
          </li>
          <li className="padding-v-normal">
            <img src={placeholder} height="48" />
            <div className="type-small">
              <Link to={"/repos"}>App Repositories</Link>
            </div>
          </li>
        </ul>
      </aside>
    );
  }
}

export default Sidebar;
