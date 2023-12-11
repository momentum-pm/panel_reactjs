import React from "react";
import { Link } from "react-router-dom";
import Body from "../../../base/Body";
import Box from "../../../base/refactored/box/Box";
import ItemInfo from "../../../base/refactored/itemInfo/ItemInfo";
import ItemTitle from "../../../base/refactored/itemTitle/ItemTitle";
import Thumbnail from "../../../base/refactored/thumbnail/Thumbnail";
import Row from "../../../base/Row";
import user from "../../../../assets/images/user.svg";
import CompactEducationView from "../../profiles/views/profileVisit/userProfileVisit/educations/CompactEducationView";
import CompactExperienceView from "../../profiles/views/profileVisit/userProfileVisit/experiences/CompactExperienceView";
import CompactCertificateView from "../../profiles/views/profileVisit/userProfileVisit/certificates/CompactCertificateView";
import MasterColumn from "../../../base/MasterColumn";
import ButtonView from "../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import Res from "../../../../assets/Res";
import Confirm from "../../../../stores/base/Confirm";
import IconTitleValueView from "../../../base/iconTitleValueView/IconTitleValueView";
import { getPercentage } from "../../../../utils/StringUtils";
export default function CompacTeacherView({
  access,
  editable = false,
  onDelete,
  onEdit,
}) {
  let profile = access.participant.profile;
  let { education, certificate, experience } = access;
  return (
    <Link to={`/@${profile.username}`} className="bordered-box">
      <div className="padding-one">
        <Row className={"centered"}>
          <MasterColumn className="full-heightc">
            <Row className={"centered"}>
              <Thumbnail
                alt={profile.title}
                className="round"
                src={profile.picture}
                placeholder={user}
              />
              <MasterColumn>
                <ItemTitle>{profile.title}</ItemTitle>
                <ItemInfo>
                  {profile.about ? profile.about : "مدرس دوره"}
                </ItemInfo>
                {editable ? (
                  <IconTitleValueView
                    title={"درصد کمیسیون"}
                     className={access.commission_rate>0?'success':''}
                    value={getPercentage(access.commission_rate)}
                  />
                ) : null}
              </MasterColumn>
            </Row>
          </MasterColumn>
          <MasterColumn className="full-heightc">
            {education ? <CompactEducationView education={education} /> : null}
            {certificate ? (
              <CompactCertificateView certificate={certificate} />
            ) : null}
            {experience ? (
              <CompactExperienceView experience={experience} />
            ) : null}
          </MasterColumn>
          {editable ? (
            <Row>
              <ButtonView
                type={BUTTON_TYPE.BUTTON}
                icon={Res.icon.cross}
                about={"حذف دبیر"}
                className={"flat white small"}
                onClick={onDelete}
              />
              <ButtonView
                type={BUTTON_TYPE.BUTTON}
                icon={Res.icon.edit}
                about={"ویرایش دسترسی"}
                className={"flat white small "}
                onClick={onEdit}
              />
            </Row>
          ) : null}
        </Row>
      </div>
    </Link>
  );
}
