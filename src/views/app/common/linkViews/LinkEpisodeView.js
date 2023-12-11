
import React from "react";
import { secondsToFormalTime } from "../../../../utils/DateUtils";
import MasterColumn from "../../../base/MasterColumn";
import Res from "../../../../assets/Res";
import ItemInfo from "../../../base/refactored/itemInfo/ItemInfo";
import ItemTitle from "../../../base/refactored/itemTitle/ItemTitle";
import Row from "../../../base/Row";
import Link from "../../../base/Link";
import ItemDescription from "../../../base/refactored/itemDescription/ItemDescription";

export default function LinkEpisodeView({ episode, className }) {
  return (
    <Link
      to={`/c/${episode.course_slug}/e/${episode.id}/${episode.slug}`}
      className={`bordered-box hidden-overflow inline-half-row-responsive ${className}`}
    >
      <Row className={"centered"}>
        <img
          className="thumbnail-image"
          src={episode.course_thumbnail_image}
          alt={episode.title}
        />
        <MasterColumn className={"padding-one"}>
          <ItemInfo>{episode.title}</ItemInfo>
          <ItemDescription>{`از دوره: ${episode.course_title}`}</ItemDescription>
        </MasterColumn>
      </Row>
    </Link>
  );
}
