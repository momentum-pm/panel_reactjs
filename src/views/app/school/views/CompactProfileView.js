import React from "react";
import { Link } from "react-router-dom";
import ItemTitle from "../../../base/refactored/itemTitle/ItemTitle";
import Thumbnail from "../../../base/refactored/thumbnail/Thumbnail";
import Row from "../../../base/Row";
import user from "../../../../assets/images/user.svg";
import MasterColumn from "../../../base/MasterColumn";
import ButtonView from "../../../base/forms/button/ButtonView";
import Res from "../../../../assets/Res";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import { normalizeNumber } from "../../../../utils/StringUtils";
export default function CompactProfileView({ student, onEdit, onDelete }) {
  let profile = student.participant.profile;
  return (
    <div className="bordered-box">
      <div className="padding-one">
        <Row className={"centered"}>
          <Link className={"centered row"} to={`/@${profile.username}`}>
            <Thumbnail
              alt={profile.title}
              className="round"
              src={profile.picture}
              placeholder={user}
            />
            <ItemTitle>{profile.title}</ItemTitle>
          </Link>
          <MasterColumn className="row reverse">
            <ButtonView
              type={BUTTON_TYPE.BUTTON}
              icon={Res.icon.cross}
              about={"حذف دسترسی"}
              className={"flat white"}
              onClick={onDelete}
            />
            <ButtonView
              icon={Res.icon.call}
              title={normalizeNumber(profile.phone_number)}
              type={BUTTON_TYPE.EXTERNAL_LINK}
              className={"flat background primary"}
              link={`tel:${profile.phone_number}`}
            />
          </MasterColumn>
        </Row>
      </div>
    </div>
  );
}
