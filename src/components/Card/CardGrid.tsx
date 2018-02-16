import * as React from "react";

import "./CardGrid.css";

const CardGrid = (props: any) => {
  return <div className="CardGrid padding-v-big">{props.children}</div>;
};

export default CardGrid;
