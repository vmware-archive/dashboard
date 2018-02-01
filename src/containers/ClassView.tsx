import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { Card } from "../components/Card";
import { IServiceClass, IServicePlan, ServiceCatalog } from "../shared/ServiceCatalog";
import { IStoreState } from "../shared/types";

import actions from "../actions";

interface IRouteProps {
  match: {
    params: {
      brokerName: string;
      className: string;
    };
  };
}

interface IClassViewProps {
  brokerName: string;
  className: string;
  classes: IServiceClass[];
  plans: IServicePlan[];
  svcClass?: IServiceClass;
}

interface IClassViewDispatch {
  getCatalog: () => Promise<any>;
}

class ClassView extends React.Component<IClassViewProps & IClassViewDispatch> {
  public componentDidMount() {
    this.props.getCatalog();
  }

  public render() {
    const { classes, className, plans } = this.props;

    return (
      <div className="class-view">
        <h3>Plans: {className}</h3>
        <p>Service Plans available for provisioning under {className}</p>
        <div className="plans-list" style={{ display: "flex", flexWrap: "wrap" }}>
          {plans.map(plan => {
            const serviceClass = classes.find(
              potential => potential.metadata.name === plan.spec.clusterServiceClassRef.name,
            );
            const card = (
              <Card
                key={plan.spec.externalID}
                header={plan.spec.externalName}
                body={plan.spec.description}
                buttonText="Provision"
                linkTo={`${window.location.pathname}/${plan.spec.externalName}`}
              />
            );
            return card;
          })}
        </div>
      </div>
    );
  }
}
export default connect(
  ({ catalog }: IStoreState, { match: { params } }: IRouteProps): IClassViewProps => {
    const svcClass = catalog.classes.find(
      potential => !!potential.spec.externalName.match(new RegExp(params.className, "i")),
    );
    const plans = svcClass
      ? catalog.plans.filter(
          plan => plan.spec.clusterServiceClassRef.name === svcClass.metadata.name,
        )
      : [];
    return {
      brokerName: params.brokerName,
      className: params.className,
      classes: catalog.classes,
      plans,
      svcClass,
    };
  },
  (dispatch: Dispatch<IStoreState>): IClassViewDispatch => {
    return {
      getCatalog: () => dispatch(actions.catalog.getCatalog()),
    };
  },
)(ClassView);
