import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import TitleValueView from "../../../../base/titleValueView/TitleValueView";
import Res from "../../../../../assets/Res";
import { getFormalDateTime } from "../../../../../utils/DateUtils";
import Box from "../../../../base/refactored/box/Box";
import React from "react";
import ButtonView from "../../../../base/forms/button/ButtonView";
import ItemTitle from "../../../../base/refactored/itemTitle/ItemTitle";
import ItemDescription from "../../../../base/refactored/itemDescription/ItemDescription";
import ItemInfo from "../../../../base/refactored/itemInfo/ItemInfo";

export default function NotificationView({ notification }) {
  return (
    <div className={"bordered-box"}>
      <div className={"padding-two"}>
        <Row className={"centered padding-two"}>
          <MasterColumn>
            <ItemTitle>{Res.get_attribute(notification, "title")}</ItemTitle>
          </MasterColumn>
          <ItemDescription>
            {getFormalDateTime(notification.creation)}
          </ItemDescription>
        </Row>
        <ItemInfo className={"padding-two"}>
          {Res.get_attribute(notification, "text")}
        </ItemInfo>
      </div>
      {notification.actionButton ? (
        <div className={" padding-two"}>
          <Row className={"reverse"}>
            <ButtonView id={notification.actionButton.id} />
          </Row>
        </div>
      ) : null}
    </div>
  );
}
