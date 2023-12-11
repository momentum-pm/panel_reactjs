import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import React from "react";
import Res from "../../../../../assets/Res";
import Box from "../../../../base/refactored/box/Box";
import IconTitleValueView from "../../../../base/iconTitleValueView/IconTitleValueView";
import Link from "../../../../base/Link";
import { getDurationTextLong } from "../../../../../utils/DateUtils";
import { normalizeNumber, splitDigits } from "../../../../../utils/StringUtils";
import Column from "../../../../base/Column";
import { getCurrency } from "../../../../../utils/StringUtils";
import Body from "../../../../base/Body";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import ItemTitle from "../../../../base/refactored/itemTitle/ItemTitle";

export default function HomeCourseView({ course, isLast }) {
  return (
    <Link to={`/c/${course.slug}`} className="bordered-box hidden-overflow">
      <Row>
        <img
          src={course.cover}
          className={"home-course-image desktop-only"}
          alt={course.title}
        />
         <img
          src={course.thumbnail_image}
          className={"home-course-image responsive-only"}
          alt={course.title}
        />
        <MasterColumn className={"padding-one"}>
			<ItemTitle>{course.title}</ItemTitle>
          <Row>
			
            <IconTitleValueView
              icon={Res.icon.clock}
              title={"طول دوره"}
              className={" primary"}
              value={getDurationTextLong(course.duration)}
            />
            <IconTitleValueView
              icon={Res.icon.note}
              className={" primary"}
              title={Res.string.school.episodes}
              value={`${normalizeNumber(course.episode_count)} ${
                Res.string.school.episode
              }`}
            />
          </Row>

          <Row className={"reverse desktop-only"}>
            <ButtonView
              type={BUTTON_TYPE.FAKE}
              className={"bordered primary large"}
              icon={Res.icon.play}
              title={"مشاهده دوره"}
            />
          </Row>
        </MasterColumn>
      </Row>
    </Link>
  );
}
