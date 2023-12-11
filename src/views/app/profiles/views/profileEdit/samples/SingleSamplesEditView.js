import { connect } from "../../../../../../stores/base/StoreManager";
import React from "react";
import SampleEditView from "./SampleEditView";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import Row from "../../../../../base/Row";
import SingleSamples from "../../../stores/samples/SingleSamples";
import RemoteStoreView from "../../../../../base/RemoteStoreView";

class SingleSamplesEditView extends RemoteStoreView {
  static getRemoteStore(props) {
    let profileId = props.profileId;
    return SingleSamples.map(profileId, { profileId });
  }
  constructor(props) {
    super(props);
    this.mapItemToView = this.mapItemToView.bind(this);
  }

  getOkView() {
    return (
      <div>
        <Row>
          <ButtonView id={this.getState().newSampleButton.id} />
          <Row className={"centered samples-view"}>
            {this.getData().map(this.mapItemToView)}
          </Row>
        </Row>
      </div>
    );
  }

  mapItemToView(item, index) {
    return (
      <SampleEditView
        sample={item}
        profileId={this.props.profileId}
        key={item.id}
      />
    );
  }
}

export default connect(SingleSamplesEditView);
