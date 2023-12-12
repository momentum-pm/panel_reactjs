import React from "react";
import user from "../../../../../assets/images/user.svg";
import assistant from "../../../../../assets/images/logo.png";
import Res from "../../../../../assets/Res";
import Link from "../../../../base/Link";
import {
  getDatetimeDistanceObject,
  getDatetimeDistanceString,
  getFormalDateTime,
} from "../../../../../utils/DateUtils";
import Row from "../../../../base/Row";
import InstantFileIconView from "../../../../base/instantFileIconView/InstantFileIconView";
import CallConfirmView from "./CallConfirmView";
export default function MessageView({ message }) {
  let file;
  let isSelf = message.type == "user";
  if (message.file && !message.blocked) {
    file = <InstantFileIconView fileAddress={message.file} />;
  }
  return (
    <div
      key={message.id}
      id={`message-${message.id}`}
      className={`row messenger-message ${
        isSelf ? "messenger-message-self" : "messenger-message-other"
      } ${message.isNewMessage ? "new-message" : ""}`}
    >
      <img
        className="messenger-message-image"
        alt={"logo"}
        src={message.type == "user" ? user : assistant}
      />
      <div>
        <div className={"messenger-message-content"}>
          {message.calls?.reverse().map((item) => (
            <CallConfirmView call={item} key={item.id} />
          ))}
          <p
            className={`messenger-message-message ${
              message.blocked ? "messenger-inactive-message" : ""
            }`}
          >
            {message.type === "call" &&
            message.call_answered &&
            !message.content
              ? "..."
              : message.content}
          </p>
          {file}
        </div>
        <Row className={"centered"}>
          <div className={"messenger-message-date-icon"}>{Res.icon.clock}</div>
          <p className="messenger-message-date">
            {getDatetimeDistanceObject(message.created_at).d > 1
              ? getFormalDateTime(message.created_at)
              : getDatetimeDistanceString(message.created_at)}
          </p>
        </Row>
      </div>
    </div>
  );
}
