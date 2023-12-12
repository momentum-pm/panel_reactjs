import "./Styles.scss";
import React from "react";
import { Switch, withRouter } from "react-router";
import ThreadsView from "./views/ThreadsView";
import { Route } from "react-router-dom";
import ThreadView from "./views/ThreadView";
import SelectConversationView from "./views/SelectConversationView";
import RemoteStoreView from "../../../base/RemoteStoreView";
import Threads from "./stores/Threads";
import { connect } from "../../../../stores/base/StoreManager";
import Row from "../../../base/Row";
import MasterScrollableColumn from "../../../base/refactored/scrollable/MasterScrollableColumn";
import SlaveColumn from "../../../base/SlaveColumn";
import MasterColumn from "../../../base/MasterColumn";

class Router extends RemoteStoreView {
  static getRemoteStore(props) {
    return Threads.map();
  }

  getOkView() {
    let path = this.props.match.path;
    return (
      <div className={"container full-height"}>
        <Row className={"padding-one full-height"}>
          <SlaveColumn className={"threads-box full-height"}>
            <ThreadsView />
          </SlaveColumn>
          <MasterColumn className={" full-height"}>
            <MasterScrollableColumn>
              <Switch>
                <Route path={path + "chats/:thread/"} component={ThreadView} />
                <Route path={path} component={SelectConversationView} />
              </Switch>
            </MasterScrollableColumn>
          </MasterColumn>
        </Row>
      </div>
    );
  }
}

export default withRouter(connect(Router));
