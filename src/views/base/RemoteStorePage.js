import React from "react";
import LoadingView from "./refactored/loadingView/LoadingView";
import Scrollable from "./refactored/scrollable/Scrollable";
import RemoteStoreView from "./RemoteStoreView";
import Row from "./Row";
import MasterScrollableColumn from "./refactored/scrollable/MasterScrollableColumn";
import ScrollableColumn from "./refactored/scrollable/ScrollableColumn";

export default class RemoteStorePage extends RemoteStoreView {
  getLoadingView() {
    return <LoadingView />;
  }

  getOkView() {
    return (
      <ScrollableColumn className={"full-height"}>
        <Scrollable className={"padding-one-desktop"}>
          <div className={"container"}>
            {this.getHeaderView()}
            {this.getBodyView()}
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }

  getHeaderView() {}

  getBodyView() {}
}
