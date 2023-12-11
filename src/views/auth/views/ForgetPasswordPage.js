import {connect} from "../../../../stores/base/StoreManager";
import ForgetPassword from "../../stores/ForgetPassword";
import FormView from "../../../base/forms/FormView";
import Res from "../../../../assets/Res";
import React from "react";

class ForgetPasswordPage extends FormView {
	static getForm(props) {
		return ForgetPassword.map();
	}
	render() {
		return (
			<div>
				<h4 className={'center primary text margin-two'}>{Res.string.auth.forget_password.hint}</h4>
				{super.render()}
			</div>
		)
	}
}

export default connect(ForgetPasswordPage);
