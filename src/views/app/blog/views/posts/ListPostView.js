import React from "react";
import Box from "../../../../base/refactored/box/Box";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import Body from "../../../../base/Body";
import IconTitleValueView from "../../../../base/iconTitleValueView/IconTitleValueView";
import Res from "../../../../../assets/Res";
import {
  getDateDistance,
  getDatetimeDistanceString,
  getFormalDateTime,
} from "../../../../../utils/DateUtils";
import Link from "../../../../base/Link";
import post_image_dark from "../../../../../assets/images/post_image_dark.svg";
import post_image_light from "../../../../../assets/images/post_image_light.svg";

export default function ListPostView({ post }) {
  let placeholder_image;
  switch (post.background_color.class_name) {
    case "background":
    case "background-light":
    case "white-background":
      placeholder_image = post_image_dark;
      break;
    default:
      placeholder_image = post_image_light;
  }
  return (
    <Link to={`/blog/posts/${post.slug}/`}>
      <Box className={"list-post-view"}>
        <Row className={"centered"}>
          <img
            className={`list-post-view-image ${post.background_color.class_name}`}
            src={post.thumbnail_image ? post.thumbnail_image : placeholder_image}
            alt={post.title}
          />
          <MasterColumn>
            <Body>
              <h3>{post.title}</h3>
			  <IconTitleValueView
                  icon={Res.icon.clock}
                  value={getDatetimeDistanceString(post.publish_date)}
                />
              <div className={"blog justify desktop-only"}>
                <p>{post.description}</p>
              </div>

            </Body>
          </MasterColumn>
        </Row>
      </Box>
    </Link>
  );
}
