import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import ItemTitle from "../../../../base/refactored/itemTitle/ItemTitle";
import Res from "../../../../../assets/Res";
import { getFormalDateTime } from "../../../../../utils/DateUtils";
import ItemDescription from "../../../../base/refactored/itemDescription/ItemDescription";
import React from "react";
import ItemInfo from "../../../../base/refactored/itemInfo/ItemInfo";
import Line from "../../../../base/Line";
import { normalizeNumber } from "../../../../../utils/StringUtils";
import Link from "../../../../base/Link";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";

export default function HomeNotificationView({ notification, isLast }) {
  return (
    <div className={"box"}>
      <div className={"padding-one"}>
        <Row className={"centered"}>
          <MasterColumn className={"padding-one"}>
            <ItemTitle>{Res.get_attribute(notification, "title")}</ItemTitle>
          </MasterColumn>
          {notification.action_link ? (
            <ButtonView
              type={BUTTON_TYPE.LINK}
              link={notification.action_link}
              icon={Res.icon.nextArrow}
              className={"flat primary low-margin"}
              title={Res.get_attribute(notification, "action_title")}
            />
          ) : null}
        </Row>
        <ItemInfo className={"padding-one"}>
          {normalizeNumber(Res.get_attribute(notification, "text"))}
        </ItemInfo>
      </div>
    </div>
  );
}
