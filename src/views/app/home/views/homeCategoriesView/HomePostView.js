import React from "react";
import Link from "../../../../base/Link";
import post_image_dark from "../../../../../assets/images/logo.png";
import "../../../blog/Blog.scss";
import MasterColumn from "../../../../base/MasterColumn";

export default function HomePostView({ post }) {
  return (
    <Link
      to={`/blog/posts/${post.slug}/`}
      className={"box inline-half-row-responsive hidden-overflow"}
    >
      <div className={"row full-width centered"}>
        <img
          className={`home-blog-post-image`}
          src={post.thumbnail_image ? post.thumbnail_image : post_image_dark}
          alt={post.title}
        />
        <MasterColumn className="padding-one full-height">
          <h4 className={"small margin-two"}>{post.title}</h4>
          <p className={"small margin-two desktop-only"}>{post.description}</p>
        </MasterColumn>
      </div>
    </Link>
  );
}
