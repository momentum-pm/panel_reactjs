import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import RemoteStoreView from "../../../base/RemoteStoreView";
import Post from "../stores/Post";
import ScrollableColumn from "../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../base/refactored/scrollable/Scrollable";
import PostHeaderView from "./posts/PostHeaderView";
import PostPartView from "./posts/PostPartView";
import React from "react";
import FooterView from "../../home/views/footerView/FooterView";
import Res from "../../../../assets/Res";
import CommentCreateView from "./CommentCreateView";
import CommentView from "../../school/views/CommentView";
import Row from "../../../base/Row";
class PostPage extends RemoteStoreView {
  static getRemoteStore(props) {
    let slug = props.match.params.slug;
    return Post.map(slug, { slug });
  }
  //
  // render() {
  // 	return (
  // 		<div className={'full-height'}>
  // 			<CategoriesTabContainerView/>
  // 			{super.render()}
  // 		</div>
  // 	);
  // }

  getOkView() {
    return (
      <ScrollableColumn>
        <Scrollable className={"scrollable-responsive"}>
          <div className={`full-height large-fonts-desktop`}>
            <PostHeaderView post={this.getData()} />
            {this.getData().parts.map((part) => (
              <PostPartView part={part} key={part.id} className={"container"} />
            ))}
            <div className={"container"} id={"comments"}>

              <div className="header-row">
                <h2>{Res.string.school.comments}</h2>
              </div>
              <CommentCreateView />
              <Row>
                {this.getData().comments?.map((comment) => (
                  <CommentView comment={comment} commentType={"blog"}/>
                ))}
              </Row>
            </div>
            <FooterView />
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }
}

export default withRouter(connect(PostPage));
