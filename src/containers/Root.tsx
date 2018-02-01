import createHistory from "history/createBrowserHistory";
import * as React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import { AppRepoForm } from "../components/AppRepoForm";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";
import { ServiceBrokerList } from "../components/ServiceBrokerList";
import configureStore from "../store";
import ChartList from "./ChartListContainer";
import ChartView from "./ChartViewContainer";

import BrokerView from "./BrokerView";
import ClassView from "./ClassView";
import RepoFormContainer from "./RepoFormContainer";
import RepoListContainer from "./RepoListContainer";
import ServiceCatalogContainer from "./ServiceCatalogContainer";

const history = createHistory();
const store = configureStore(history);

class Root extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>
            <section className="routes">
              <Route exact={true} path="/" component={Dashboard} />
              <Route exact={true} path="/charts" component={ChartList} />
              <Route exact={true} path="/charts/:repo" component={ChartList} />
              <Route exact={true} path="/charts/:repo/:id" component={ChartView} />
              <Route exact={true} path="/services" component={ServiceCatalogContainer} />
              <Route exact={true} path="/services/brokers/:name" component={BrokerView} />
              <Route exact={true} path="/repos" component={RepoListContainer} />
              <Route exact={true} path="/repos/add" component={RepoFormContainer} />
              {/* <Route exact={true} path="/brokers" render={() => <ServiceBrokerList brokers={[]} />} />  */}
              <Route
                exact={true}
                path="/charts/:repo/:id/versions/:version"
                component={ChartView}
              />
              {/* <Route exact={true} path="/services" component={ServiceCatalogContainer} /> */}
              {/* <Route exact={true} path="/services/brokers/:brokerName" component={BrokerView} /> */}
              <Route
                exact={true}
                path="/services/brokers/:brokerName/:className"
                component={ClassView}
              />
              <Route exact={true} path="/repos" component={RepoListContainer} />
              <Route exact={true} path="/repos/add" component={RepoFormContainer} />
              <Route
                exact={true}
                path="/brokers"
                render={() => <ServiceBrokerList brokers={[]} />}
              />
            </section>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
