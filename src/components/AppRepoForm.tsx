import * as React from "react";
import { Redirect } from "react-router";

import { AppRepository } from "../shared/AppRepository";

interface IAppRepoFormProps {
  name: string;
  namespace: string;
  url: string;
  message?: string;
  redirectTo?: string | null;
  install: (name: string, url: string) => Promise<any>;
  update: (values: { name?: string; url?: string }) => void;
}

export const AppRepoForm = (props: IAppRepoFormProps) => {
  const { name, url, update, install } = props;
  return (
    <div className="app-repo-form">
      <h1>Add an App Repository</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={e => update({ name: e.target.value })} />
      </label>
      <label>
        URL:
        <input type="text" value={url} onChange={e => update({ url: e.target.value })} />
      </label>
      <button onClick={() => install(name, url)}>Install Repo</button>
      {props.redirectTo && <Redirect to={props.redirectTo} />}
    </div>
  );
};
