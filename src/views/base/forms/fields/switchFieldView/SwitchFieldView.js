import "./SwitchFieldView.scss";
import React from "react";
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import { connect } from "../../../../../stores/base/StoreManager";
import SwitchField from "../../../../../stores/base/form/fields/SwitchField";
import Res from "../../../../../assets/Res";
import Row from "../../../Row";
import MasterColumn from "../../../MasterColumn";

class SwitchFieldView extends FieldView {
  static getField(props) {
    return SwitchField.map(props.id);
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  getInputView() {
    let state = this.getState();
    return (
      <Row className={`centered ${state.offClassName}`}>
         {state.question ? (
          <MasterColumn>
            <p className={"padding-two-sides switch-field-view-label"}>
              {state.question}
            </p>
          </MasterColumn>
        ) : null}
        <div className={"switch-field-view"}>
          <p
            className={`switch-field-view-title ${
              state.value ? "checked" : ""
            }`}
          >
            {state.value ? state.on_title : state.off_title}
          </p>
          {state.loading ? (
            Res.icon.ripple_loading
          ) : (
            <label className={"switch-field-view-field-container"}>
              <input
                onChange={this.onChange}
                name={state.name}
                className={"switch-field-view-input"}
                type={"checkbox"}
                checked={state.value}
              />
			  
              <span className={"switch-field-view-slider"} >
			  {state.value && state.onIcon ? (
            <div className="switch-field-view-icon on">{state.onIcon}</div>
          ) : null}
          {!state.value && state.offIcon ? (
            <div className="switch-field-view-icon off">{state.offIcon}</div>
          ) : null}
				</span>
            </label>
          )}
          
        </div>
       
      </Row>
    );
  }

  onChange() {
    this.getField().toggle();
  }
}

SwitchFieldView.propTypes = {
  id: PropTypes.number.isRequired,
};
export default connect(SwitchFieldView);
