import React from "react";
import { connect } from "../../../../../stores/base/StoreManager";
import ButtonView from "../../../../base/forms/button/ButtonView";
import Column from "../../../../base/Column";
import user from "../../../../../assets/images/user.svg";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import Body from "../../../../base/Body";
import RemoteStoreView from "../../../../base/RemoteStoreView";
import App from "../../../../../stores/app/App";
import Thumbnail from "../../../../base/refactored/thumbnail/Thumbnail";

class HomeProfileView extends RemoteStoreView {
  static getRemoteStore() {
    return App.map();
  }

  getOkView() {
    let profile = this.getData().profile;
    return profile ? (
      <div className={""}>
        <Body>
          <Column className={"centered responsive-row"}>
            <Thumbnail
              src={profile.picture}
              alt={profile.title}
              placeholder={user}
              className={"center background large round"}
            />
            <MasterColumn className={"column desktop-centered"}>
              <h3 className={"desktop-center title padding-two-sides"}>
                {profile.title}
              </h3>
            </MasterColumn>
          </Column>
          <Row>
            <ButtonView
              type={BUTTON_TYPE.LINK}
              link={`/@${profile.username}/?edit=true`}
              icon={Res.icon.edit}
              title={Res.string.toolbar.edit_profile_button_title}
              className={"full bordered primary"}
            />
          </Row>
        </Body>
      </div>
    ) : null;
  }
}

export default connect(HomeProfileView);
