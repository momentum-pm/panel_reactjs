import React from "react";
import "./StepView.scss";
import PropTypes from "prop-types";
import { connect } from "../../../../../stores/base/StoreManager";
import { normalizeNumber } from "../../../../../utils/StringUtils";
import Step from "../../../../../stores/base/form/fields/Step";
import StoreView from "../../../StoreView";
import MasterColumn from "../../../MasterColumn";
import Res from "../../../../../assets/Res";

class StepLinkView extends StoreView {
  static mapPropsToStores(props) {
    return {
      step: props.id ? Step.map(props.id) : { state: props.step },
      onClick: props.onClick,
    };
  }

  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={`row step-link-view centered ${
          this.props.step.state.valid ? "step-link-view-valid" : ""
        } ${this.props.step.state.ok ? "step-link-view-ok" : ""}`}
      >
        <h6 className={"step-link-view-index"}>
          {normalizeNumber(this.props.step.state.index)}
        </h6>
        <MasterColumn>
          <h6 className={"step-link-view-title"}>
            {this.props.step.state.label}
          </h6>
        </MasterColumn>
        <div className={"step-link-view-icon"}>{Res.icon.check}</div>
      </div>
    );
  }
}

StepLinkView.propTypes = {
  id: PropTypes.number,
  step: PropTypes.object,
  onClick: PropTypes.func,
};

export default connect(StepLinkView);
