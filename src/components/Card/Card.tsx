import * as React from "react";

import "./Card.css";

export interface ICardProps {
  className?: string;
  children?: React.ReactChildren | React.ReactNode | string;
  responsive?: boolean;
  responsiveColumns?: number;
}

const Card = (props: ICardProps) => {
  let cssClass = `Card ${props.className}`;

  if (props.responsive && props.responsiveColumns) {
    cssClass = `${cssClass} Card-responsive-${props.responsiveColumns}`;
  } else if (props.responsive) {
    cssClass = `${cssClass} Card-responsive`;
  }

  return (
    <article className={cssClass}>
      <div className="Card__inner bg-white elevation-1">{props.children}</div>
    </article>
  );
};

export default Card;
