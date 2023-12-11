
import React from "react";
import { secondsToFormalTime } from "../../../../utils/DateUtils";
import MasterColumn from "../../../base/MasterColumn";
import Res from "../../../../assets/Res";
import ItemInfo from "../../../base/refactored/itemInfo/ItemInfo";
import ItemTitle from "../../../base/refactored/itemTitle/ItemTitle";
import Row from "../../../base/Row";
import Link from "../../../base/Link";
export default function LinkCourseView({ course, className }) {
  return (
    <Link
      to={`/c/${course.slug}/`}
      className={`bordered-box hidden-overflow inline-half-row-responsive ${className}`}
    >
      <Row className={"centered"}>
        <img
          className="thumbnail-image"
          src={course.thumbnail_image}
          alt={course.title}
        />
        <MasterColumn className={"padding-one"}>
          <ItemTitle>{course.title}</ItemTitle>
        </MasterColumn>
      </Row>
    </Link>
  );
}
