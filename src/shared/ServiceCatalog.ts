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

  public static async getServiceBindings(): Promise<IServiceBinding[]> {
    const bindings = await ServiceCatalog.getItems<IServiceBinding>("/servicebindings");
    return Promise.all(
      bindings.map(binding => {
        const { secretName } = binding.spec;
        return axios
          .get<IK8sApiSecretResponse>(ServiceCatalog.secretEndpoint + secretName)
          .then(response => {
            const secretJson = response.data;
            const { database, host, password, port, username } = secretJson.data;
            binding.spec.secretDatabase = atob(database);
            binding.spec.secretHost = atob(host);
            binding.spec.secretPassword = atob(password);
            binding.spec.secretPort = atob(port);
            binding.spec.secretUsername = atob(username);
            return binding;
          });
      }),
    );
  }

  public static async getServiceInstances() {
    return ServiceCatalog.getItems<IServiceInstance>("/serviceinstances");
  }

  private static endpoint: string = "/api/kube/apis/servicecatalog.k8s.io/v1beta1";

  private static secretEndpoint: string = "/api/kube/api/v1/namespaces/default/secrets/";

  private static async getItems<T>(endpoint: string): Promise<T[]> {
    const response = await axios.get<IK8sApiListResponse<T>>(ServiceCatalog.endpoint + endpoint);
    const json = response.data;
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

interface IK8sApiListResponse<T> {
  kind: string;
  apiVersion: string;
  metadata: {
    selfLink: string;
    resourceVersion: string;
  };
  items: T[];
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
