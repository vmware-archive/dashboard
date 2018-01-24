import axios from "axios";

export class ServiceCatalog {
  public static async getServiceClasses() {
    return ServiceCatalog.getItems<IServiceClass>("/clusterserviceplans");
  }

  public static async getServiceBrokers() {
    return ServiceCatalog.getItems<IServiceBroker>("/clusterservicebrokers");
  }

  public static async getServicePlans() {
    return ServiceCatalog.getItems<IServicePlan>("/clusterserviceplans");
  }

  private static endpoint: string = "/api/kube/apis/servicecatalog.k8s.io/v1beta1";

  private static async getItems<T>(endpoint: string): Promise<T[]> {
    // const response = await fetch(ServiceCatalog.endpoint + endpoint);
    // const json: IK8sApiListResponse = await response.json();
    const response = await axios.get<IK8sApiListResponse>(ServiceCatalog.endpoint + endpoint);
    const json = response.data;
    return json.items;
  }
}

interface IK8sApiListResponse {
  kind: string;
  apiVersion: string;
  metadata: {
    selfLink: string;
    resourceVersion: string;
  };
  items: any[];
}

export interface IServiceBrokerList extends IK8sApiListResponse {
  items: IServiceBroker[];
}

export interface IServiceClass {
  metadata: {
    creationTimestamp: string;
    name: string;
    resourceVersion: string;
    selfLink: string;
    uid: string;
  };
  spec: {
    bindable: boolean;
    binding_retrievable: boolean;
    clusterServiceBrokerName: string;
    description: string;
    externalID: string;
    externalName: string;
    planUpdatable: boolean;
    tags: string[];
  };
  status: {
    removedFromBrokerCatalog: boolean;
  };
}

export interface IServiceClassList extends IK8sApiListResponse {
  items: IServiceClass[];
}

interface ICondition {
  type: string;
  status: string;
  lastTransitionTime: string;
  reason: string;
  message: string;
}

export interface IServiceBroker {
  metadata: {
    name: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    generation: number;
    creationTimestamp: string;
    finalizers: string[];
  };
  spec: {
    url: string;
    authInfo: any; // Look into
    relistBehavior: string;
    relistDuration: string;
    relistRequests: number;
  };
  status: {
    conditions: ICondition[];
    reconciledGeneration: number;
    lastCatalogRetrievalTime: string;
  };
}

export interface IServicePlanList extends IK8sApiListResponse {
  items: IServicePlan[];
}

export interface IServicePlan {
  metadata: {
    name: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
  };
  spec: {
    clusterServiceBrokerName: string;
    externalName: string;
    externalID: string;
    description: string;
    free: boolean;
    clusterServiceClassRef: {
      name: string;
    };
  };
  status: {
    removedFromBrokerCatalog: boolean;
  };
}
