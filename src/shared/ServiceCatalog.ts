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

  public static async getServiceBindings() {
    return ServiceCatalog.getBindingItems<IServiceBinding>("/servicebindings");
  }

  public static async getServiceInstances() {
    return ServiceCatalog.getItems<IServiceInstance>("/serviceinstances");
  }

  private static endpoint: string = "/api/kube/apis/servicecatalog.k8s.io/v1beta1";

  private static secretEndpoint: string = "/api/kube/api/v1/namespaces/default/secrets/";

  private static async getItems<T>(endpoint: string): Promise<T[]> {
    // const response = await fetch(ServiceCatalog.endpoint + endpoint);
    // const json: IK8sApiListResponse = await response.json();
    const response = await axios.get<IK8sApiListResponse>(ServiceCatalog.endpoint + endpoint);
    const json = response.data;
    return json.items;
  }

  private static async getBindingItems<T>(endpoint: string): Promise<T[]> {
    // const response = await fetch(ServiceCatalog.endpoint + endpoint);
    // const json: IK8sApiListResponse = await response.json();
    const response = await axios.get<IK8sApiListResponse>(ServiceCatalog.endpoint + endpoint);
    const json = response.data;
    let index = 0;
    for (const item of json.items) {
      const name = item.spec.secretName;
      const secretResp = await axios.get<IK8sApiSecretResponse>(
        ServiceCatalog.secretEndpoint + name,
      );
      const secretJson = secretResp.data;
      json.items[index].spec.secretDatabase = atob(secretJson.data.database);
      json.items[index].spec.secretHost = atob(secretJson.data.host);
      json.items[index].spec.secretPassword = atob(secretJson.data.password);
      json.items[index].spec.secretPort = atob(secretJson.data.port);
      json.items[index].spec.secretUsername = atob(secretJson.data.username);

      index++;
    }
    return json.items;
  }
}

interface IK8sApiSecretResponse {
  kind: string;
  apiVersion: string;
  metadata: {
    selfLink: string;
    resourceVersion: string;
  };
  data: {
    database: string;
    host: string;
    password: string;
    port: string;
    username: string;
  };
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

export interface IServiceInstanceList extends IK8sApiListResponse {
  items: IServiceInstance[];
}

export interface IServiceInstance {
  metadata: {
    name: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    finalizers: string[];
    generation: number;
  };
  spec: {
    clusterServiceClassExternalName: string;
    clusterServicePlanExternalName: string;
    externalID: string;
    clusterServicePlanRef: {
      name: string;
    };
    clusterServiceClassRef: {
      name: string;
    };
  };
}

export interface IServiceBindingList extends IK8sApiListResponse {
  items: IServiceBinding[];
}

export interface IServiceBinding {
  metadata: {
    name: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    finalizers: string[];
    generation: number;
  };
  spec: {
    externalID: string;
    instanceRef: {
      name: string;
    };
    secretName: string;
    secretDatabase: string;
    secretHost: string;
    secretPassword: string;
    secretPort: string;
    secretUsername: string;
  };
}
