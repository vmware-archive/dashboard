import { connect } from "react-redux";
import { Dispatch } from "redux";

import actions from "../actions";
import { AppRepoList } from "../components/AppRepoList";
import { AppRepository } from "../shared/AppRepository";
import { IStoreState } from "../shared/types";

interface IRouteProps {
  match: {
    params: {
      repo: string;
    };
  };
}

function mapStateToProps({ repos }: IStoreState, { match: { params } }: IRouteProps) {
  return {
    repos: repos.repos,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
    deleteRepo: async (name: string, namespace: string = "kubeapps") => {
      await AppRepository.delete(name, namespace);
      dispatch(actions.repos.requestRepos());
      const repos = await AppRepository.list();
      return dispatch(actions.repos.receiveRepos(repos.items));
    },
    fetchRepos: async () => {
      dispatch(actions.repos.requestRepos());
      const repos = await AppRepository.list();
      return dispatch(actions.repos.receiveRepos(repos.items));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRepoList);
