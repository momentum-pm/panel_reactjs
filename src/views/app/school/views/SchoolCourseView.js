import Box from "../../../base/refactored/box/Box";
import React from "react";
import IconTitleValueView from "../../../base/iconTitleValueView/IconTitleValueView";
import Res from "../../../../assets/Res";
import { getDurationTextShort } from "../../../../utils/DateUtils";
import { normalizeNumber, splitDigits } from "../../../../utils/StringUtils";
import Link from "../../../base/Link";
import Body from "../../../base/Body";
import { getCurrency } from "../../../../utils/StringUtils";
import Row from "../../../base/Row";
import MasterColumn from "../../../base/MasterColumn";
import ButtonView from "../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import Column from "../../../base/Column";

export default function SchoolCourseView({ course, showPrice }) {
  return (
    <Link to={`/c/${course.slug}`}>
      <Box className={"course-view dark"}>
        <img src={course.cover} className={"course-image"} alt={course.title} />
        <div className="course-view-content row bottomed padding-one">
          <h2 className="center title  full-width">{course.title}</h2>
          {showPrice ? (
            <div className="column centered full-width">
              <div className="centered row">
                <p className="line-through">
                  {splitDigits(course.actual_price)}
                </p>
                <p className="bold success padding-one-sides">
                  {getCurrency(course.price)}
                </p>
              </div>
            </div>
          ) : null}
          <Row className={" full-width padding-one"}>
            <div className=" master-column">
              <IconTitleValueView
                icon={Res.icon.clock}
                title={"طول دوره"}
                className={"vertical"}
                value={getDurationTextShort(course.duration)}
              />
            </div>
            <div className=" master-column">
              <IconTitleValueView
                icon={Res.icon.note}
                className={"vertical"}
                title={Res.string.school.episodes}
                value={`${splitDigits(course.episode_count)} ${
                  Res.string.school.episode
                }`}
              />
            </div>

            <div className=" master-column">
              <IconTitleValueView
                icon={Res.icon.eye}
                className={"vertical"}
                title={Res.string.school.access_count}
                value={
                  splitDigits(course.access_count) + " " + Res.string.people
                }
              />
            </div>
          </Row>
        </div>
      </Box>
    </Link>
  );
}
