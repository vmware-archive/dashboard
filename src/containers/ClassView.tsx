import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Dispatch } from "redux";

import { IServiceClass, IServicePlan } from "../shared/ServiceCatalog";
import { IStoreState } from "../shared/types";

interface IClassViewProps {
  class: IServiceClass | null;
  plans: IServicePlan[];
}

interface IClassViewDispatch {
  getPlans: () => Promise<IServicePlan[]>;
}

const template = (props: IClassViewProps & IClassViewDispatch) => {
  return (
    <div className="class-view">
      <h3>Classes</h3>
    </div>
  );
};

export default connect(
  ({ catalog }: IStoreState) => {
    return {
      classes: catalog.classes,
      plans: catalog.plans,
      svcClass: null,
    };
  },
  (dispatch: Dispatch<IStoreState>) => {
    return {
      getPlans: async () => {
        console.log("");
        return [];
      },
    };
  },
)(props => {
  const { svcClass, plans } = props;
  return (
    <div className="class-view">
      <h3>Classes</h3>
    </div>
  );
});
