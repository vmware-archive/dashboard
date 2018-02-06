import { connect } from "react-redux";
import { Dispatch } from "redux";

import actions from "../actions";
import { AppRepoForm } from "../components/AppRepoForm";
import { AppRepository } from "../shared/AppRepository";
import { IStoreState } from "../shared/types";

function mapStateToProps({ repos }: IStoreState, props: any) {
  const { form, redirectTo } = repos;
  return {
    ...form,
    redirectTo,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
    install: async (name: string, url: string, namespace: string = "kubeapps") => {
      dispatch(actions.repos.addRepo());
      const added = await AppRepository.create(name, url, namespace);
      dispatch(actions.repos.addedRepo(added));
      dispatch(actions.repos.redirect("/repos"));
      dispatch(actions.repos.redirected());
    },
    update: (values: { name?: string; url?: string; namespace?: string }) => {
      dispatch(actions.repos.updateForm(values));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRepoForm);
