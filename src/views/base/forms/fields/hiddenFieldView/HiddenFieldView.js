import React from 'react';
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";
import HiddenField from "../../../../../stores/base/form/fields/HiddenField";

class HiddenFieldView extends FieldView {
	static getField(props) {
		return HiddenField.map(props.id);
	}

	render() {
		let state = this.getState();
		return <input ref={this.props.fieldRef} type={'hidden'}
					  name={state.name}
					  value={state.value || ''}/>
	}

}

HiddenFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};

export default connect(HiddenFieldView);
