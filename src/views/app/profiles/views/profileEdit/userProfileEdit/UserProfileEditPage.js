import RemoteStoreView from "../../../../../base/RemoteStoreView";
import { withRouter } from "react-router";
import { connect } from "../../../../../../stores/base/StoreManager";
import UserProfileEdit from "../../../stores/userProfileEdit/UserProfileEdit";
import React from "react";
import Row from "../../../../../base/Row";
import SlaveColumn from "../../../../../base/SlaveColumn";
import MasterColumn from "../../../../../base/MasterColumn";
import UserInfoEditView from "./UserInfoEditView";
import ExperiencesEditView from "./experiences/ExperiencesEditView";
import EducationsEditView from "./educations/EducationsEditView";
import CertificatesEditView from "./certificates/CertificatesEditView";
import AddressEditFormView from "../AddressEditFormView";
import AccountLinksEditView from "../accountLinks/AccountLinksEditView";
import SamplesEditView from "../samples/SamplesEditView";
import Box from "../../../../../base/refactored/box/Box";

class UserProfileEditPage extends RemoteStoreView {
  static getRemoteStore(props) {
    return UserProfileEdit.map(props.profileId, { profileId: props.profileId });
  }

  getOkView() {
    let profileId = this.props.profileId;
    return (
      <Row>
        <SlaveColumn className={"dominant"}>
          {/*<UsernameEditView profileId={profileId}/>*/}
          <Box>
            <UserInfoEditView profileId={profileId} />
          </Box>
          <SamplesEditView profileId={profileId}/>
          <AddressEditFormView profileId={profileId} />
          <AccountLinksEditView profileId={profileId} />
        </SlaveColumn>
        <MasterColumn>
          <CertificatesEditView profileId={profileId} />
          <EducationsEditView profileId={profileId} />
          <ExperiencesEditView profileId={profileId} />
        </MasterColumn>
      </Row>
    );
  }
}

export default withRouter(connect(UserProfileEditPage));
