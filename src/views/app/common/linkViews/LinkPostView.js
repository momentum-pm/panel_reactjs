import React from "react";
import { secondsToFormalTime } from "../../../../utils/DateUtils";
import MasterColumn from "../../../base/MasterColumn";
import Res from "../../../../assets/Res";
import ItemInfo from "../../../base/refactored/itemInfo/ItemInfo";
import ItemTitle from "../../../base/refactored/itemTitle/ItemTitle";
import Row from "../../../base/Row";
import Link from "../../../base/Link";
export default function LinkPostView({ post, className }) {
  return (
    <Link to={`/blog/posts/${post.slug}/`} className={`bordered-box hidden-overflow inline-half-row-responsive ${className}`}>
      <Row className={"centered"}>
        <img
          className="thumbnail-image"
          src={post.thumbnail_image}
          alt={post.title}
        />
        <MasterColumn className={"padding-one"}>
          <ItemTitle>{post.title}</ItemTitle>
          <ItemInfo>{`${
            Res.string.blog.time_to_read_label
          }: ${secondsToFormalTime(post.time_to_read)}`}</ItemInfo>
        </MasterColumn>
      </Row>
    </Link>
  );
}
