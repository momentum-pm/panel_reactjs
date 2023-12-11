import { connect } from "../../../../../../stores/base/StoreManager";
import React from "react";
import AccountLinkView from "./AccountLinkView";
import AccountLinks from "../../../stores/accountLinks/AccountLinks";
import ListRemoteStoreView from "../../../../../base/ListRemoteStoreView";
import Row from "../../../../../base/Row";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import Res from "../../../../../../assets/Res";
import { BUTTON_TYPE } from "../../../../../../stores/base/form/buttons/Button";

class AccountLinksView extends ListRemoteStoreView {
  static getRemoteStore(props) {
    let profileId = props.profile.id;
    return AccountLinks.map(profileId, { profileId });
  }

  getOkView() {
    return <Row>{this.getData().map(this.mapItemToView)}</Row>;
  }

  mapItemToView(item, index) {
    return (
      <AccountLinkView
        accountLink={item}
        profileId={this.props.profileId}
        key={item.id}
      />
    );
  }
}

export default connect(AccountLinksView);
