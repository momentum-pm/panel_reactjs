import React from "react";
import { normalizeNumber } from "../../../../../utils/StringUtils";
import logo from "../../../../../assets/images/logo.png";
import Link from "../../../../base/Link";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import Res from "../../../../../assets/Res";
import Thumbnail from "../../../../base/refactored/thumbnail/Thumbnail";

/**
 * @param {number} conversation.id
 * @param {string} conversation.title
 * @param {string} conversation.image
 * @param {object} conversation.latest_message
 * @param {number} conversation.unread_message_count
 * @returns {*}
 * @constructor
 */
export default function ThreadItemView({ thread }) {
  let badge_view;
  if (thread.new_messages) {
    badge_view = (
      <span className={"conversations-item-badge"}>
        {normalizeNumber(thread.new_messages)}
      </span>
    );
  }

  return (
    <li className={"bordered-box clickable"}>
      <Link to={`/dashboard/chats/chats/${thread.id}/`}>
        <Row className={"centered"}>
          <Thumbnail className={""} src={logo} alt={thread.assistant.name} />
          <MasterColumn
            className={"padding-two-sides conversations-item-content"}
          >
            <h6 className={"conversations-item-title"}>
              {thread.assistant.name}
            </h6>
            <p className={"conversations-item-subtitle"}>
              {thread.first_message
                ? thread.first_message.content
                : "No messages yet"}
            </p>
          </MasterColumn>
          {badge_view}
        </Row>
      </Link>
    </li>
  );
}
