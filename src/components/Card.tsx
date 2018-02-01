import * as React from "react";
import { Link } from "react-router-dom";

interface ICardProps {
  header: string;
  body: string | JSX.Element;
  button?: JSX.Element;
  buttonText?: string | JSX.Element;
  onClick?: () => (...args: any[]) => Promise<any>;
  linkTo?: string;
}
export const Card = (props: ICardProps) => {
  const { header, body, buttonText, onClick, linkTo } = props;
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
        margin: "1em",
        maxWidth: "30em",
        padding: "1em",
      }}
    >
      <h5 style={{ color: "#333", marginTop: 0 }}>{header}</h5>
      <p style={{ color: "#666" }}>{body}</p>
      <div style={{ textAlign: "right" }}>{button}</div>
    </div>
  );
};
