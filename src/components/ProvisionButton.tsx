import * as React from "react";
import AceEditor from "react-ace";
import * as Modal from "react-modal";
import { RouterAction } from "react-router-redux";
import { IServiceClass, IServicePlan } from "../shared/ServiceCatalog";

import "brace/mode/json";
import "brace/theme/xcode";

interface IProvisionButtonProps {
  plans: IServicePlan[];
  classes: IServiceClass[];
  selectedClass?: IServiceClass;
  selectedPlan?: IServicePlan;
  provision: (
    releaseName: string,
    namespace: string,
    className: string,
    planName: string,
  ) => Promise<{}>; // , svcPlan: IServicePlan, svcClass: IServiceClass, parameters: string
  push: (location: string) => RouterAction;
}

interface IProvisionButtonState {
  isProvisioning: boolean;
  modalIsOpen: boolean;
  // deployment options
  releaseName: string;
  namespace: string;
  selectedPlan: IServicePlan | null;
  selectedClass: IServiceClass | null;
  parameters: string;
  error: string | null;
}

class ProvisionButton extends React.Component<IProvisionButtonProps, IProvisionButtonState> {
  public state: IProvisionButtonState = {
    error: null,
    isProvisioning: false,
    modalIsOpen: false,
    namespace: "default",
    parameters: "",
    releaseName: "",
    selectedClass: this.props.selectedClass || null,
    selectedPlan: this.props.selectedPlan || null,
  };

  public render() {
    const { plans, classes } = this.props;
    const { selectedClass, selectedPlan } = this.state;
    return (
      <div className="ProvisionButton">
        {this.state.isProvisioning && <div>Provisioning...</div>}
        <button
          className="button button-primary"
          onClick={this.openModel}
          disabled={this.state.isProvisioning}
        >
          Provision
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
        >
          {this.state.error && (
            <div className="container padding-v-bigger bg-action">{this.state.error}</div>
          )}
          <form onSubmit={this.handleProvision}>
            <div>
              <label htmlFor="releaseName">Name</label>
              <input
                id="releaseName"
                onChange={this.handleReleaseNameChange}
                value={this.state.releaseName}
                required={true}
              />
            </div>
            <div>
              <label htmlFor="namespace">Namespace</label>
              <input
                name="namespace"
                onChange={this.handleNamespaceChange}
                value={this.state.namespace}
              />
            </div>
            <div>
              <label htmlFor="classes">Classes</label>
              <select onChange={this.onClassChange}>
                {classes.map(c => (
                  <option
                    key={c.spec.externalName}
                    selected={c.metadata.name === (selectedClass && selectedClass.metadata.name)}
                    value={c.spec.externalName}
                  >
                    {c.spec.externalName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="plans">Plans</label>
              <select onChange={this.onPlanChange}>
                {plans
                  .filter(
                    plan =>
                      plan.spec.clusterServiceClassRef.name ===
                      (selectedClass && selectedClass.metadata.name),
                  )
                  .map(p => (
                    <option
                      key={p.spec.externalName}
                      value={p.spec.externalName}
                      selected={p.metadata.name === (selectedPlan && selectedPlan.metadata.name)}
                    >
                      {p.spec.externalName}
                    </option>
                  ))}
              </select>
            </div>
            <div style={{ marginBottom: "1em" }}>
              <label htmlFor="values">Parameters</label>
              <AceEditor
                mode="json"
                theme="xcode"
                name="values"
                width="100%"
                height="200px"
                onChange={this.handleParametersChange}
                setOptions={{ showPrintMargin: false }}
                value={this.state.parameters}
              />
            </div>
            <div>
              <button className="button button-primary" type="submit">
                Submit
              </button>
              <button className="button" onClick={this.closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  public openModel = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  public closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  public handleProvision = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { provision, push } = this.props;
    this.setState({ isProvisioning: true });
    const { releaseName, namespace, selectedClass, selectedPlan } = this.state;
    if (selectedClass && selectedPlan) {
      console.log("PROVISON");
      provision(
        releaseName,
        namespace,
        selectedClass.spec.externalName,
        selectedPlan.spec.externalName,
      )
        .then(() => push(`/services`))
        .catch(err => this.setState({ isProvisioning: false, error: err.toString() }));
    }
  };

  public handleReleaseNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ releaseName: e.currentTarget.value });
  };
  public handleNamespaceChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ namespace: e.currentTarget.value });
  };
  public handleParametersChange = (parameter: string) => {
    this.setState({ parameters: parameter });
  };

  public onClassChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({
      selectedClass:
        this.props.classes.find(svcClass => svcClass.spec.externalName === e.target.value) || null,
    });
  public onPlanChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({
      selectedPlan:
        this.props.plans.find(plan => plan.spec.externalName === e.target.value) || null,
    });
}

export default ProvisionButton;
