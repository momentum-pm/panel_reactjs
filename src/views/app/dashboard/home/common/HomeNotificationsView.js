import Box from "../../../../base/refactored/box/Box";
import React from "react";
import { connect } from "../../../../../stores/base/StoreManager";
import HeaderRow from "../../../../base/refactored/headerRow/HeaderRow";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import MasterColumn from "../../../../base/MasterColumn";
import HomeNotificationView from "./HomeNotificationView";
import EmptyView from "../../../../base/emptyListView/EmptyView";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import RemoteStoreView from "../../../../base/RemoteStoreView";
import App from "../../../../../stores/app/App";
import Row from "../../../../base/Row";

class HomeNotificationsView extends RemoteStoreView {
  static getRemoteStore() {
    return App.map();
  }

  constructor(props) {
    super(props);
    this.mapItemToView = this.mapItemToView.bind(this);
  }

  getOkView() {
    let notifications = this.getData().profile.notifications;
    if (notifications.length > 0) {
      return (
        <div className="master-column">
          <Row className={"centered"}>
            <h2 className="header-style margin-two">
              {Res.string.dashboard.notifications.last_notifications}
            </h2>
            <MasterColumn />
            <ButtonView
              type={BUTTON_TYPE.LINK}
              icon={Res.icon.nextArrow}
              title={Res.string.view_all}
              className={"flat primary"}
              link={"/dashboard/notifications/"}
            />
          </Row>
          <ScrollableColumn>
              {notifications.map(this.mapItemToView)}
          </ScrollableColumn>
        </div>
      );
    } else {
      return null;
    }
  }

  mapItemToView(item, index) {
    let isLast = this.getData().profile.notifications.length - 1 === index;
    return (
      <HomeNotificationView notification={item} key={item.id} isLast={isLast} />
    );
  }
}

export default connect(HomeNotificationsView);
