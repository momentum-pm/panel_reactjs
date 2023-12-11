import React from "react";
import Column from "../../../../base/Column";
import Res from "../../../../../assets/Res";
import { secondsToFormalTime } from "../../../../../utils/DateUtils";
import Box from "../../../../base/refactored/box/Box";
import Row from "../../../../base/Row";
import SlaveColumn from "../../../../base/SlaveColumn";

export default function PostHeaderView({ post }) {
  return (
    <div className={"blog-post-header"}>
      <img
        className="blog-post-header-image desktop-only"
        src={post.desktop_header_image}
        alt={post.title}
      />
       <img
        className="blog-post-header-image responsive-only"
        src={post.mobile_header_image}
        alt={post.title}
      />
      <div className="blog-post-header-content">
        <div className="container full-height">
          <Row className={"full-height centered"}>
            <Column className={"inline-half-row-responsive"}>
              <h1 className={"margin-two blog-header-title"}>{post.title}</h1>
              <p className={"margin-two blog-header-text"}>{post.description}</p>
              {post.time_to_read ? (
                <p className={"margin-two"}>{`${
                  Res.string.blog.time_to_read_label
                }: ${secondsToFormalTime(post.time_to_read)}`}</p>
              ) : null}
            </Column>
            <div className="inline-half-row-responsive" />
          </Row>
        </div>
      </div>
    </div>
  );
  return (
    <div
      className={`blog padding-four-sides spacing-four-top spacing-four-bottom part-sides-padding ${post.background_color.class_name}`}
    >
      <div className={""}>
        <Column className={"centered"}>
          {post.image ? (
            <img
              className={"blog-post-image"}
              src={post.image}
              alt={post.title}
            />
          ) : null}
        </Column>
      </div>
    </div>
  );
}
