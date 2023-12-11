import React from "react";
import MasterColumn from "../../../base/MasterColumn";
import ItemInfo from "../../../base/refactored/itemInfo/ItemInfo";
import Row from "../../../base/Row";
import ItemDescription from "../../../base/refactored/itemDescription/ItemDescription";
import Link from "../../../base/Link";

export default function LinkSectionView({ section, className }) {
  return (
    <Link
      to={`/c/${section.course_slug}/`}
      className={`bordered-box hidden-overflow inline-half-row-responsive ${className}`}
    >
      <Row className={"centered"}>
        <img
          className="thumbnail-image"
          src={section.course_thumbnail_image}
          alt={section.title}
        />
        <MasterColumn className={"padding-one"}>
          <ItemInfo>{section.title}</ItemInfo>
          <ItemDescription>{`از دوره: ${section.course_title}`}</ItemDescription>
        </MasterColumn>
      </Row>
    </Link>
  );
}
