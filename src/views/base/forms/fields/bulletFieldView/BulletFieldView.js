import "./BulletFieldView.scss";
import React from "react";
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import { connect } from "../../../../../stores/base/StoreManager";
import BulletField from "../../../../../stores/base/form/fields/BulletField";
import Res from "../../../../../assets/Res";
import Row from "../../../Row";
import MasterColumn from "../../../MasterColumn";
import ButtonView from "../../button/ButtonView";

export class BulletFieldView extends FieldView {
  static getField(props) {
    return BulletField.map(props.id);
  }

  constructor(props) {
    super(props);
    this.mapItemToView = this.mapItemToView.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getFieldDetailsView() {
    if (this.hasFieldDetailsView()) {
      return (
        <Row className={"padding-one centered"}>
          {this.getFieldIconView()}
          <MasterColumn>{this.getLabelView()}</MasterColumn>
          {this.hasError() ? this.getErrorView() : this.getHintView()}
          {this.getCascadeView()}
        </Row>
      );
    }
  }

  getCascadeView() {
    if (this.getState().cascadeButton) {
      return <ButtonView id={this.getState().cascadeButton.id} />;
    }
  }

  getInputView() {
    return (
      <div className={`checkbox-field ${this.getState().inputClassName}`}>
        {!this.getState().cascadeButton || this.getState().open
          ? this.getItemsView()
          : null}
      </div>
    );
  }

  getItemsView() {
    let state = this.getState();
    return (
      <div className={`bullet-field-items ${this.getState().itemsClassName}`}>
        {this.getState().showDeselect ? this.getDeselectView() : null}
        {state.items.map(this.mapItemToView)}
      </div>
    );
  }

  getDeselectView() {
    let state = this.getState();
    let itemValue = null;
    let checked = !state.value;
    let title = this.getState().deselectLabel;
    return (
      <div
        className={`checkbox-field-item row centered ${state.itemClassName} ${
          checked ? "checked" : ""
        }`}
        key={itemValue}
      >
        <input
          className={"checkbox-field-item-input"}
          type="checkbox"
          checked={checked}
          value={itemValue}
          onChange={(event) => this.onChange(event, itemValue)}
        />
        <div className="checkbox-field-item-check-container">
          <div className="checkbox-field-item-check">{Res.icon.check}</div>
        </div>
        <p className={"small"}>{title}</p>
      </div>
    );
  }

  mapItemToView(item, index) {
    let state = this.getState();
    let itemValue = this.getValue(item);
    let value = state.value;
    let checked = value === itemValue;
    let title = this.getTitle(item);
    return state.itemToView ? (
      <div onClick={() => this.onChange(null, itemValue)}>
        {state.itemToView(item, index)}
      </div>
    ) : (
      <div
        className={`checkbox-field-item row centered ${state.itemClassName} ${
          checked ? "checked" : ""
        }`}
        key={itemValue}
      >
        <input
          className={"checkbox-field-item-input"}
          type="checkbox"
          checked={checked}
          value={itemValue}
          onChange={(event) => this.onChange(event, itemValue)}
        />
        <div className="checkbox-field-item-check-container">
          <div className="checkbox-field-item-check">{Res.icon.check}</div>
        </div>
        <p className={"small"}>{title}</p>
      </div>
    );
  }

  getValue(item) {
    return item ? this.getState().itemToValue(item) : 0;
  }

  getTitle(item) {
    return item
      ? this.getState().itemToTitle(item)
      : this.getState().placeholder;
  }

  onChange(event, item_value) {
    this.getField().setValue(item_value);
  }
}

BulletFieldView.propTypes = {
  id: PropTypes.number.isRequired,
};
export default connect(BulletFieldView);
