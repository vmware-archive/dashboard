import * as React from "react";
import { Link } from "react-router-dom";

import { IAppRepository } from "../../shared/types";

export interface IAppRepoListProps {
  repos: IAppRepository[];
  fetchRepos: () => Promise<any>;
  deleteRepo: (name: string) => Promise<any>;
}

export class AppRepoList extends React.Component<IAppRepoListProps> {
  public componentDidMount() {
    this.props.fetchRepos();
  }

  public render() {
    const { deleteRepo, repos } = this.props;
    return (
      <div className="app-repo-list">
        <h1>App Repositories</h1>
        <table>
          <thead>
            <tr>
              <th>Repo</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {repos.map(repo => {
              return (
                <tr key={repo.metadata.name}>
                  <td>{repo.metadata.name}</td>
                  <td>{repo.spec && repo.spec.url}</td>
                  <td>
                    <button
                      className="button button-secondary"
                      onClick={this.handleDeleteClick(repo.metadata.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to={"repos/add"}>
          <button className="button button-primary">Add Repository</button>
        </Link>
      </div>
    );
  }

  private handleDeleteClick = (repoName: string) => () => this.props.deleteRepo(repoName);
}
