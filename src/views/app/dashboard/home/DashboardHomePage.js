import { connect } from "../../../../stores/base/StoreManager";
import React from "react";
import MasterColumn from "../../../base/MasterColumn";
import Row from "../../../base/Row";
import HomeNotificationsView from "./common/HomeNotificationsView";
import NumberVerifyView from "./common/NumberVerifyView";
import ProfileWalletView from "./common/ProfileWalletView";
import App from "../../../../stores/app/App";
import RemoteStoreView from "../../../base/RemoteStoreView";
import ScrollableColumn from "../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../base/refactored/scrollable/Scrollable";
import SlaveColumn from "../../../base/SlaveColumn";
import Box from "../../../base/refactored/box/Box";
import Body from "../../../base/Body";

class DashboardHomePage extends RemoteStoreView {
  static getRemoteStore() {
    return App.map();
  }

  getOkView() {
    return (
      <ScrollableColumn>
        <Scrollable className={"padding-one-desktop"}>
          <div className="container full-height">
            <Row>
              <MasterColumn>
                <Box>
                  <Body>
                    <h1 className="header-style">Title1 </h1>
                  </Body>
                </Box>
              </MasterColumn>
              <SlaveColumn className={"dominant"}>
                <Box>
                  <Body>
                    <h1 className="header-style">Title1 </h1>
                  </Body>
                </Box>
              </SlaveColumn>
            </Row>
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }
}

export default connect(DashboardHomePage);
