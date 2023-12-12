import React from "react";
import chatting from "../../../../../assets/images/chatting.svg";
import Body from "../../../../base/Body";

export default function SelectConversationView() {
  return (
    <div className={"box"}>
      <Body>
        <h1 className="header-style">No Conversations</h1>
        <div className="padding-two-before-after">
          <p>You can start a conversation with an assistant</p>
        </div>
      </Body>
    </div>
  );
}
