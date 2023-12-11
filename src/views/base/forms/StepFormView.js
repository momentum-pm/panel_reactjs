import FormView from "../../base/forms/FormView";
import React from "react";
import {connect} from "../../../stores/base/StoreManager";
import {withRouter} from "react-router";

class StepFormView extends FormView {
	static getForm(props) {
		return props.form.map();
	}

	render() {
		return <div>
			{this.getForm().getAdditionalView()}
			{this.getFieldsView()}
		</div>
	}
}

export default withRouter(connect(StepFormView));
