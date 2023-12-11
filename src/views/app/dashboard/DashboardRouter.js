import React, { lazy, Suspense } from "react";
import { Route, Switch, withRouter } from "react-router";
import LoadingView from "../../base/refactored/loadingView/LoadingView";
import "./Dashboard.scss";

const ChatsRouter = lazy(() => import("./chats/Router"));
const NotificationsPage = lazy(() =>
  import("./notifications/views/NotificationsPage")
);
const DashboardHomePage = lazy(() => import("./home/DashboardHomePage"));

class DashboardRouter extends React.Component {
  render() {
    let path = this.props.match.path;
    return (
      <Suspense fallback={<LoadingView />}>
        <Switch>
          <Route path={path + "chats/"} render={() => <ChatsRouter />} />
          {/* <Route
            path={path + "notifications/"}
            render={() => <NotificationsPage />}
          /> */}
          <Route path={path} render={() => <ChatsRouter />} />
        </Switch>
      </Suspense>
    );
  }
}

export default withRouter(DashboardRouter);
