import React from "react";
import RemoteStoreView from "../../../../base/RemoteStoreView";
import Res from "../../../../../assets/Res";
import { connect } from "../../../../../stores/base/StoreManager";
import Threads from "../stores/Threads";
import { withRouter } from "react-router";
import ThreadItemView from "./ThreadItemView";
import EmptyView from "../../../../base/emptyListView/EmptyView";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import ButtonView from "../../../../base/forms/button/ButtonView";

class ThreadsView extends RemoteStoreView {
  static getRemoteStore(props) {
    return Threads.map();
  }

  getOkView() {
    return (
      <ScrollableColumn className={"box"}>
        <h2 className={"conversations-header"}>Threads</h2>
        <Scrollable>{this.getListView()}</Scrollable>
      </ScrollableColumn>
    );
  }

  getListView() {
    let data = this.getData();
    return (
      <ol className={"no-style padding-one"}>
        <ButtonView id={this.getState().createButton.id} />

        {data.length > 0 ? (
          data.map((thread) => (
            <ThreadItemView key={thread.id} thread={thread} />
          ))
        ) : (
          <EmptyView />
        )}
      </ol>
    );
  }
}

export default withRouter(connect(ThreadsView));
