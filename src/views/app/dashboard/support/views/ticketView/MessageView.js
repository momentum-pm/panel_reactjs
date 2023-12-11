import React from "react";
import Res from "../../../../../../assets/Res";
import {
  getDatetimeDistanceObject,
  getDatetimeDistanceString,
  getFormalDateTime,
} from "../../../../../../utils/DateUtils";
import Row from "../../../../../base/Row";
import InstantFileIconView from "../../../../../base/instantFileIconView/InstantFileIconView";
import RichText from "../../../../../base/richText/RichText";
import Thumbnail from "../../../../../base/refactored/thumbnail/Thumbnail";
import MasterColumn from "../../../../../base/MasterColumn";
import CallView from "../CallView";
import LinkView from "../LinkView";

export default function MessageView({ message, ticket }) {
  let title = message.sender && message.sender.title;
  let isAnswer = !message.sender || message.sender.id !== ticket.profile.id;
  if (!title && isAnswer) {
    title = Res.string.dashboard.support.robot;
  }
  return (
    <div
      key={message.id}
      id={`message-${message.id}`}
      className={`row messenger-message ${
        isAnswer ? "messenger-message-self" : "messenger-message-other"
      } `}
    >
      <div>
        <Row className={`${isAnswer ? "reverse" : ""}`}>
          {message.sender ? (
            <Thumbnail src={message.sender.picture} />
          ) : (
            <Thumbnail className={"primary"} />
          )}
          <div>
            <div
              className={`messenger-message-content ${isAnswer ? "dark" : ""}`}
            >
              <Row>
                <MasterColumn className={"padding-one-before-afte"}>
                  <p className={"bold title"}>{title}</p>
                  {message.call ? <CallView call={message.call} /> : null}
                  <RichText className="messenger-message-message">
                    {message.content}
                  </RichText>
                  <Row>
                    {message.files.map((file) => (
                      <InstantFileIconView key={file} fileAddress={file} />
                    ))}
                  </Row>
                  {message.link ? <LinkView link={message.link} /> : null}
                </MasterColumn>
              </Row>
            </div>
            <Row className={"centered"}>
              <div className={"messenger-message-date-icon"}>
                {Res.icon.clock}
              </div>
              <p className="messenger-message-date">
                {getDatetimeDistanceObject(message.creation).d > 1
                  ? getFormalDateTime(message.creation)
                  : getDatetimeDistanceString(message.creation)}
              </p>
            </Row>
          </div>
        </Row>
      </div>
    </div>
  );
}
