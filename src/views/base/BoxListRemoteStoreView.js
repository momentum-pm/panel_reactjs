import React from "react";
import Body from "./Body";
import ListRemoteStoreView from "./ListRemoteStoreView";
import Box from "./refactored/box/Box";

export default class BoxListRemoteStoreView extends ListRemoteStoreView {
  render() {
    return (
      <Box>
        <Body>
          {this.getHeaderView()}
          {super.render()}
        </Body>
      </Box>
    );
  }

  getHeaderView() {}
}
