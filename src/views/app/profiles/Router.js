import React from "react";
import { withRouter } from "react-router";
import Profile from "./stores/Profile";
import { connect } from "../../../stores/base/StoreManager";
import ForbiddenPage from "../../base/forbidden/ForbiddenPage";
import Row from "../../base/Row";
import Res from "../../../assets/Res";
import ButtonView from "../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../stores/base/form/buttons/Button";
import UserProfileEditPage from "./views/profileEdit/userProfileEdit/UserProfileEditPage";
import UserProfileVisitPage from "./views/profileVisit/userProfileVisit/UserProfileVisitPage";
import MasterColumn from "../../base/MasterColumn";
import RemoteStorePage from "../../base/RemoteStorePage";
import Box from "../../base/refactored/box/Box";
import Body from "../../base/Body";
import Scrollable from "../../base/refactored/scrollable/Scrollable";
import ScrollableColumn from "../../base/refactored/scrollable/ScrollableColumn";
import RemoteStoreView from "../../base/RemoteStoreView";

class Router extends RemoteStoreView {
  static getRemoteStore(props) {
    return Profile.map(props.match.params.username);
  }

  getOkView() {
    if (this.isEditMode()) {
      if (!this.getData().has_edit_permission) {
        return <ForbiddenPage />;
      }
    }
    return (
      <ScrollableColumn className={"full-height"}>
        <Scrollable className={""}>
          <div className={"container"}>
            {this.getHeaderView()}
            {this.getBodyView()}
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }

  getBodyView() {
    if (this.isEditMode()) {
      return <UserProfileEditPage profileId={this.getData().id} />;
    } else {
      return (
        <UserProfileVisitPage
          profileId={this.getData().id}
          username={this.props.match.params.username}
          hasChatButton={!this.getData().has_edit_permission}
        />
      );
    }
  }

  isEditMode() {
    return (
      new URLSearchParams(this.props.location.search).get("edit") === "true"
    );
  }

  getHeaderView() {
    if (this.getData().has_edit_permission) {
      let hint, buttonTitle, buttonLink, buttonIcon;
      if (this.isEditMode()) {
        hint = Res.string.profiles.switch_to_view_hint;
        buttonTitle = Res.string.profiles.switch_to_view_title;
        buttonLink = `/@${this.props.match.params.username}/`;
        buttonIcon = Res.icon.eye;
      } else {
        hint = Res.string.profiles.switch_to_edit_hint;
        buttonTitle = Res.string.profiles.switch_to_edit_title;
        buttonLink = `/@${this.props.match.params.username}/?edit=true`;
        buttonIcon = Res.icon.edit;
      }
      return (
        <Row className={""}>
          <Box>
            <Body>
              <Row className={"centered"}>
                <MasterColumn>
                  <p>{hint}</p>
                </MasterColumn>
                <ButtonView
                  type={BUTTON_TYPE.LINK}
                  title={buttonTitle}
                  link={buttonLink}
                  className={"raised primary"}
                  icon={buttonIcon}
                />
              </Row>
            </Body>
          </Box>
        </Row>
      );
    }
  }
}

export default withRouter(connect(Router));
