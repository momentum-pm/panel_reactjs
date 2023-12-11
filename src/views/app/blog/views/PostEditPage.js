import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import PostEditForm from "../stores/PostEditForm";
import RemoteFormView from "../../../base/forms/RemoteFormView";
import ScrollableColumn from "../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../base/refactored/scrollable/Scrollable";
import Box from "../../../base/refactored/box/Box";
import React from "react";
import Body from "../../../base/Body";
import AuthorPostPartsView from "./auhorPost/parts/AuthorPostPartsView";
import MasterColumn from "../../../base/MasterColumn";
import Res from "../../../../assets/Res";
import ButtonView from "../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import HeaderRow from "../../../base/refactored/headerRow/HeaderRow";
import IconTitleValueView from "../../../base/iconTitleValueView/IconTitleValueView";
import Row from "../../../base/Row";
import SlaveColumn from "../../../base/SlaveColumn";

class PostEditPage extends RemoteFormView {
  static getForm(props) {
    let authorId = props.match.params.authorId;
    let postId = props.match.params.postId;
    return PostEditForm.map(postId, { authorId, postId });
  }

  render() {
    return (
      <ScrollableColumn>
        <HeaderRow className={"padding-one"}>
          <MasterColumn>
            <IconTitleValueView
              icon={Res.icon.check}
              title={Res.string.blog.state_label}
              value={
                this.getState().context
                  ? Res.string.blog.state_to_title[
                      this.getState().context.state
                    ]
                  : null
              }
            />
          </MasterColumn>
          <ButtonView
            type={BUTTON_TYPE.LINK}
            className={"flat primary"}
            icon={Res.icon.eye}
            title={Res.string.blog.view_post_button}
            link={`/blog/authors/${this.getState().authorId}/posts/${
              this.getState().postId
            }/`}
          />
          <ButtonView
            type={BUTTON_TYPE.LINK}
            className={"flat primary"}
            icon={Res.icon.eye}
            title={"از دید کاربران"}
            link={`/blog/posts/${this.getState().remoteStore?.state?.data?.slug}/`}
          />
          {this.getState().buttons.map(this.map_button_to_view)}
        </HeaderRow>
        <Scrollable>
          <div className="container">
            <Row>
              <SlaveColumn className={"dominant"}>
                <Box>
                  <Body>{super.render()}</Body>
                </Box>
              </SlaveColumn>
              <MasterColumn>
                <AuthorPostPartsView />
              </MasterColumn>
            </Row>
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }

  getButtonsView() {
    return null;
  }
}

export default withRouter(connect(PostEditPage));
