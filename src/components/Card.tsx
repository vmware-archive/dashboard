import * as React from "react";
import { Link } from "react-router-dom";

interface ICardProps {
  header: string | JSX.Element | JSX.Element[];
  body: string | JSX.Element | JSX.Element[];
  button?: JSX.Element;
  buttonText?: string | JSX.Element;
  onClick?: () => (...args: any[]) => Promise<any>;
  linkTo?: string;
  notes?: JSX.Element | null;
  icon?: string;
}

const margin = "0.5em";

export const CardContainer = (props: any) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: `-${margin}` }}>{props.children}</div>
  );
};

export const Card = (props: ICardProps) => {
  const { header, body, buttonText, onClick, linkTo, notes, icon } = props;
  let button = props.button ? (
    props.button
  ) : (
    <button onClick={onClick} className="button button-primary" style={{ width: "fit-content" }}>
      {buttonText}
    </button>
  );
  if (linkTo) {
    button = <Link to={linkTo}>{button}</Link>;
  }
  return (
    <div
      style={{
        borderBottom: "1px solid #f2f2f0",
        borderRadius: "2px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        display: "grid",
        flex: "0 1 0",
        gridTemplateAreas: `
          "title title title icon"
          "body body body body"
          "notes button button button"`,
        gridTemplateColumns: "5fr 1fr 2fr 1fr",
        gridTemplateRows: "auto auto auto",
        margin,
        minWidth: "25em",
        padding: "1em",
      }}
    >
      <h5 style={{ gridArea: "title", color: "#333", margin: 0 }}>{header}</h5>
      <div style={{ gridArea: "body", color: "#666", margin: "1em 0" }}>{body}</div>
      <div style={{ gridArea: "notes" }}>{notes}</div>
      <div style={{ gridArea: "button", justifySelf: "flex-end", alignSelf: "flex-end" }}>
        {button}
      </div>
      <div style={{ gridArea: "icon" }}>
        <img src={icon} style={{ maxWidth: "100%" }} />
      </div>
    </div>
  );
};
