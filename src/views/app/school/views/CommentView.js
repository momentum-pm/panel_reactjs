import RemoteStoreView from "../../../base/RemoteStoreView";
import Row from "../../../base/Row";
import ButtonView from "../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import Res from "../../../../assets/Res";
import Box from "../../../base/refactored/box/Box";
import NotesView from "./NotesView";
import React from "react";
import Episode from "../stores/Episode";
import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import { get_lang_free_url } from "../../../../History";
import TabsContainerView from "../../../base/tabView/TabsContainerView";
import Body from "../../../base/Body";
import LoadingView from "../../../base/refactored/loadingView/LoadingView";
import Column from "../../../base/Column";
import MasterColumn from "../../../base/MasterColumn";
import ItemInfo from "../../../base/refactored/itemInfo/ItemInfo";
import Thumbnail from "../../../base/refactored/thumbnail/Thumbnail";
import { getDatetimeDistanceString } from "../../../../utils/DateUtils";
import ItemDescription from "../../../base/refactored/itemDescription/ItemDescription";
import ItemTitle from "../../../base/refactored/itemTitle/ItemTitle";
import user from "../../../../assets/images/user.svg";
import anonymous_user from "../../../../assets/images/anonymous_user.jpg";
import CourseCommentCreateView from "./CourseCommentCreateView";
import BlogCommentCreateView from "../../blog/views/CommentCreateView";
import EpisodeCommentCreateView from "./CommentCreateView";
import CourseCommentDeleteView from "./CourseCommentDeleteView";
import EpisodeCommentDeleteView from "./EpisodeCommentDeleteView";
import BlogCommentDeleteView from "./BlogCommentDeleteView";

export default function CommentView({
  comment,
  isChild,
  commentType,
  isAdmin,
}) {
  let profile = comment.participant?.profile || comment.profile;
  let replyView = null;
  if (!isChild) {
    if (commentType === "course") {
      replyView = (
        <CourseCommentCreateView
          parent={comment.id}
          courseSlug={comment.course_slug}
        />
      );
    } else if (commentType === "blog") {
      replyView = (
        <BlogCommentCreateView parent={comment.id} slug={comment.post_slug} />
      );
    } else if (commentType === "episode") {
      replyView = (
        <EpisodeCommentCreateView
          parent={comment.id}
          episodeId={comment.episode_id}
        />
      );
    }
  }
  let deleteView;
  let linkView;
  if (isAdmin && !isChild) {
    if (commentType === "course") {
      linkView = (
        <ButtonView
          type={BUTTON_TYPE.EXTERNAL_LINK}
          link={`/c/${comment.course_slug}`}
          about={comment.course_title}
          title={"صفحه دوره"}
          icon={Res.icon.hyperlink}
          className={"hyperlink link flat"}
        />
      );
    } else if (commentType === "episode") {
      linkView = (
        <ButtonView
        type={BUTTON_TYPE.EXTERNAL_LINK}
        link={`/c/${comment.course_slug}/e/${comment.episode_id}/${comment.episode_slug}/`}
          icon={Res.icon.hyperlink}
          title={"صفحه قسمت"}
          about={`${comment.episode_title} از ${comment.course_title}`}
          className={"hyperlink link flat"}
        />
      );
    } else if (commentType === "blog") {
      linkView = (
        <ButtonView
        type={BUTTON_TYPE.EXTERNAL_LINK}
        link={`/blog/posts/${comment.post_slug}`}
          icon={Res.icon.hyperlink}
          title={"صفحه مقاله"}
          about={comment.post_title}
          className={"hyperlink link flat"}
        />
      );
    }
  }
  if (isAdmin) {
    if (commentType === "course") {
      deleteView = <CourseCommentDeleteView id={comment.id} />;
    } else if (commentType === "blog") {
      deleteView = <BlogCommentDeleteView id={comment.id} />;
    } else if (commentType === "episode") {
      deleteView = <EpisodeCommentDeleteView id={comment.id} />;
    }
  }
  console.log(isChild, isAdmin, deleteView);

  return (
    <div className="bordered-box">
      <div className="padding-one">
        <Row className={"centered"}>
          <Thumbnail
            src={profile ? profile.picture : anonymous_user}
            alt={profile ? profile.title : "کاربر ناشناس"}
            placeholder={user}
            className={"center background round"}
          />
          <MasterColumn className={"margin-one"}>
            <ItemTitle>{profile ? profile.title : "کاربر ناشناس"}</ItemTitle>
            <ItemInfo>{comment.text}</ItemInfo>
          </MasterColumn>
          <ItemDescription className={"margin-one"}>
            {getDatetimeDistanceString(comment.creation)}
          </ItemDescription>
          {deleteView}
          {linkView}
        </Row>

        {comment.children?.length ? (
          <div>
            {comment.children.map((comment) => (
              <CommentView
                comment={comment}
                isChild={true}
                commentType={commentType}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : null}
      </div>
      {replyView}
    </div>
  );
}
