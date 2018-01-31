import { hapi } from "./hapi/release";

export interface IRepo {
  name: string;
  url: string;
}

export interface IChartVersion {
  id: string;
  attributes: IChartVersionAttributes;
  relationships: {
    chart: {
      data: IChartAttributes;
    };
  };
}

export interface IChartVersionAttributes {
  version: string;
  app_version: string;
  created: string;
}

export interface IChart {
  id: string;
  attributes: IChartAttributes;
  relationships: {
    latestChartVersion: {
      data: IChartVersionAttributes;
    };
  };
}

export interface IChartAttributes {
  name: string;
  description: string;
  home?: string;
  icon?: string;
  keywords: string[];
  maintainers: Array<{
    name: string;
    email?: string;
  }>;
  repo: IRepo;
  sources: string[];
}

export interface IChartState {
  isFetching: boolean;
  selected: {
    version?: IChartVersion;
    versions: IChartVersion[];
    readme?: string;
    values?: string;
  };
  items: IChart[];
}

export interface IDeployment {
  metadata: {
    name: string;
    namespace: string;
  };
}

export interface IApp {
  type: string;
  data: hapi.release.Release;
  repo?: IRepo;
}

export interface IAppState {
  isFetching: boolean;
  // currently items are always Helm releases
  items: IApp[];
}

export interface IStoreState {
  apps: IAppState;
  charts: IChartState;
  deployment: IDeployment;
}

// Representation of the HelmRelease CRD
export interface IHelmRelease {
  metadata: {
    annotations: {
      "apprepositories.kubeapps.com/repo-name"?: string;
    };
    name: string;
    namespace: string;
  };
  spec: {
    repoUrl: string;
  };
}

// Representation of the ConfigMaps Helm uses to store releases
export interface IHelmReleaseConfigMap {
  metadata: {
    labels: {
      NAME: string;
      VERSION: string;
    };
  };
  data: {
    release: string;
  };
}
