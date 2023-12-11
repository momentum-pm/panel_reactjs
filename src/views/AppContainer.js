import React, { lazy, Suspense } from "react";
import "./Font.scss";
import "./App.scss";

import { Route, Switch, withRouter } from "react-router";
import LoadingView from "./base/refactored/loadingView/LoadingView";
import ModalRouter from "./modal/ModalRouter";
import LinkMetaTagsHelmet from "./base/LinkMetaTagsHelmet";
import MetaTagsHelmet from "./base/MetaTagsHelmet";
import MessageQueueView from "./base/messageQueueView/MessageQueueView";
import RemoteStoreView from "./base/RemoteStoreView";
import App from "../stores/app/App";
import { connect } from "../stores/base/StoreManager";

const AppRouter = lazy(() => import("./app/MainRouter"));

class AppContainer extends RemoteStoreView {
  static getRemoteStore() {
    return App.map();
  }
  render() {
    let path = this.props.match.path;
    let theme = this.getState().currentTheme;
	let location = this.props.location.pathname;
    theme = "dark";
    if (location.indexOf("blog")>-1 && location.indexOf("blog")<4) {
      theme = "light";
    }

    return (
      <div className={`${theme}`}>
        <Suspense fallback={<LoadingView />}>
          <LinkMetaTagsHelmet />
          <MetaTagsHelmet />
          <Switch>
            <Route path={path} render={() => <AppRouter />} />
          </Switch>
          <ModalRouter />
          <MessageQueueView />
        </Suspense>
        {this.getState().changingTheme ? (
          <div
            className={`changing-theme ${
              this.getState().showingTheme ? "showing-theme" : ""
            }`}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(connect(AppContainer));
