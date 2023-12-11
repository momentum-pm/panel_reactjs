import "./SearchFieldView.scss";
import React from "react";
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import { connect } from "../../../../../stores/base/StoreManager";
import { normalizeNumber } from "../../../../../utils/StringUtils";
import SearchField, {
  SEARCH_STATE,
} from "../../../../../stores/base/form/fields/SearchField";
import Res from "../../../../../assets/Res";
export class SearchFieldView extends FieldView {
  static getField(props) {
    return SearchField.map(props.id);
  }

  render() {
    let state = this.getState();
    return (
      <div ref={this.reff}>
        {this.getFieldDetailsView()}
        {this.getInputView()}
      </div>
    );
  }

  getInputView() {
    return (
      <div className={"search-field-view"}>
        {Res.icon.search}
        <input
          name={this.getState().name}
          value={this.getState().value}
          type={"search"}
          placeholder={this.getState().placeholder}
          onChange={(event) => {
            this.getField().setValue(event.target.value);
            event.preventDefault();
          }}
        />
        {this.getState().searchState === SEARCH_STATE.SEARCHING
          ? Res.icon.ripple_loading
          : null}
      </div>
    );
  }
}

SearchFieldView.propTypes = {
  id: PropTypes.number.isRequired,
};

export default connect(SearchFieldView);
