import { connect } from "../../../../../../../stores/base/StoreManager";
import Experiences from "../../../../stores/experiences/Experiences";
import Res from "../../../../../../../assets/Res";
import React from "react";
import HeaderRow from "../../../../../../base/refactored/headerRow/HeaderRow";
import BoxListRemoteStoreView from "../../../../../../base/BoxListRemoteStoreView";
import ExperienceView from "./ExperienceView";
import { normalizeNumber } from "../../../../../../../utils/StringUtils";
import Body from "../../../../../../base/Body";
import ListRemoteStoreView from "../../../../../../base/ListRemoteStoreView";

class ExperiencesView extends ListRemoteStoreView {
  static getRemoteStore(props) {
    let profileId = props.profileId;
    return Experiences.map(profileId, { profileId });
  }

  render() {
    if (!this.props.count) {
      return null;
    } else {
      return (
          <Body>
            {this.getHeaderView()}
            {super.render()}
          </Body>
      );
    }
  }
  getItemsClass() {
    return "padding-one";
  }

  getHeaderView() {
    return (
      <HeaderRow>
        <h2>
          {Res.string.profiles.experiences.experiences_title} (
          {normalizeNumber(
            Math.floor(
              this.getState().totalDuration / (60 * 60 * 24 * 365 * 1000)
            ) + 1
          )}{" "}
          {Res.string.years})
        </h2>
      </HeaderRow>
    );
  }

  mapItemToView(item, index) {
    return (
      <ExperienceView
        experience={item}
        profileId={this.props.profileId}
        key={item.id}
      />
    );
  }
}

export default connect(ExperiencesView);
