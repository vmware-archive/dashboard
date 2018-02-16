import * as React from "react";

import "./Card.css";

export interface ICardProps {
  header?: string | JSX.Element | JSX.Element[];
  body?: string | JSX.Element | JSX.Element[];
  button?: JSX.Element;
  buttonText?: string | JSX.Element;
  className?: string;
  children?: React.ReactChildren | React.ReactNode | string;
  onClick?: () => (...args: any[]) => Promise<any>;
  linkTo?: string;
  notes?: string | JSX.Element;
  icon?: string;
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
