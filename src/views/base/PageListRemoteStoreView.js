import React from "react";
import ListRemoteStoreView from "./ListRemoteStoreView";
import Page from "./Page";
import BoxEmptyView from "./emptyListView/BoxEmptyView";
import ScrollableColumn from "./refactored/scrollable/ScrollableColumn";
import Scrollable from "./refactored/scrollable/Scrollable";

export default class PageListRemoteStoreView extends ListRemoteStoreView {
  constructor(props) {
    super(props);
    this.getEmptyView = this.getEmptyView.bind(this);
    this.mapItemToView = this.mapItemToView.bind(this);
  }

  getTitleView() {
    let state = this.getState();
    if (state.title) {
      return <h4 className={"margin-two"}>{state.title}</h4>;
    }
  }

  getListView() {
    return (
      <Page>
        <ScrollableColumn>
          <Scrollable>
            <div className={"padding-one-desktop"}>
              {this.getTitleView()}
              {super.getListView()}
            </div>
          </Scrollable>
        </ScrollableColumn>
      </Page>
    );
  }

  getEmptyView() {
    return (
      <Page>
        <BoxEmptyView />
      </Page>
    );
  }
}
