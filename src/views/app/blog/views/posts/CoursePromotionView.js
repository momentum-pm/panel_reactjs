import React from "react";
import Row from "../../../../base/Row";
import RichText from "../../../../base/richText/RichText";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import IconTitleValueView from "../../../../base/iconTitleValueView/IconTitleValueView";
import { getDurationText } from "../../../../../utils/DateUtils";
import Link from "../../../../base/Link";
import SchoolCourseView from "../../../school/views/SchoolCourseView";
import SlaveColumn from "../../../../base/SlaveColumn";
import MasterColumn from "../../../../base/MasterColumn";
export default function CoursePromotionView({ part, className }) {
  let course = part.course;
  return (
    <div
      className={` ${part.padding_top.class_name}-top ${part.padding_bottom.class_name}-bottom ${part.background_color.class_name}`}
      style={{
        background: `#${part.background_color.title_en}`,
      }}
    >
      <div className={` ${className}`}>
        <Row className={"padding-four-sides-desktop centered padding-two-desktop"}>
          <div className="full-responsive master-column">
            <div className="padding-four-sides-desktop padding-two">
              <RichText>{part.content}</RichText>
            </div>
          </div>
          <div className={"full-responsive master-column"}>
            <div className=" padding-four-sides-desktop">
              <SchoolCourseView course={course} />
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}
