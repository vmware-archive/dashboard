import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Link } from "react-router-dom";
import { push, RouterAction } from "react-router-redux";
import { Dispatch } from "redux";

import { Card } from "../components/Card";
import { IServiceClass, IServicePlan, ServiceCatalog } from "../shared/ServiceCatalog";
import { IStoreState } from "../shared/types";

import actions from "../actions";
import ProvisionButton from "../components/ProvisionButton";

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
  provision: (
    instanceName: string,
    namespace: string,
    className: string,
    planName: string,
    parameters: {},
  ) => Promise<any>;
  push: (location: string) => RouterAction;
}

class ClassView extends React.Component<IClassViewProps & IClassViewDispatch> {
  public state = {
    instanceName: "",
    namespace: "",
  };

  public componentDidMount() {
    this.props.getCatalog();
  }

  public render() {
    const { classes, className, plans, svcClass } = this.props;
    const classPlans = svcClass
      ? plans.filter(plan => plan.spec.clusterServiceClassRef.name === svcClass.metadata.name)
      : [];

    return (
      <div className="class-view">
        <h3>Plans: {className}</h3>
        <p>Service Plans available for provisioning under {className}</p>
        <div className="plans-list" style={{ display: "flex", flexWrap: "wrap" }}>
          {svcClass &&
            classPlans.map(plan => {
              const serviceClass = classes.find(
                potential => potential.metadata.name === plan.spec.clusterServiceClassRef.name,
              );
              const card = (
                <Card
                  key={plan.spec.externalID}
                  header={plan.spec.externalName}
                  body={plan.spec.description}
                  button={
                    <ProvisionButton
                      selectedClass={serviceClass}
                      selectedPlan={plan}
                      plans={plans}
                      classes={classes}
                      provision={this.props.provision}
                      push={this.props.push}
                    />
                  }
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
    return {
      brokerName: params.brokerName,
      className: params.className,
      classes: catalog.classes,
      plans: catalog.plans,
      svcClass,
    };
  },
  (dispatch: Dispatch<IStoreState>) => {
    return {
      getCatalog: () => dispatch(actions.catalog.getCatalog()),
      provision: async (
        instanceName: string,
        namespace: string,
        className: string,
        planName: string,
        parameters: {},
      ) =>
        dispatch(
          actions.catalog.provision(instanceName, namespace, className, planName, parameters),
        ),
      push: (location: string) => dispatch(push(location)),
    };
  },
)(ClassView);
