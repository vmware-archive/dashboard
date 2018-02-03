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
}

const margin = "0.5em";

export const CardContainer = (props: any) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: `-${margin}` }}>{props.children}</div>
  );
};

export const Card = (props: ICardProps) => {
  const { header, body, buttonText, onClick, linkTo, notes } = props;
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
        display: "flex",
        flex: "1 1 25em",
        flexDirection: "column",
        justifyContent: "space-between",
        margin,
        maxWidth: "30em",
        padding: "1em",
      }}
    >
      {typeof header === "string" ? (
        <h5 style={{ color: "#333", marginTop: 0 }}>{header}</h5>
      ) : (
        header
      )}
      <div
        style={{
          color: "#666",
        }}
      >
        {body}
      </div>
      <div
        style={{
          display: notes || button ? "flex" : "none",
          justifyContent: "space-between",
          marginTop: notes || button ? "0.5em" : 0,
        }}
      >
        <div>{notes && notes}</div>
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "flex-end" }}>{button && button}</div>
        </div>
      </div>
    </div>
  );
};
