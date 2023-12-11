import ScrollableFormBox from "../../../base/forms/ScrollableFormBox";
import EmailVerification from "../stores/EmailVerification";
import {connect} from "../../../../stores/base/StoreManager";
import {LOADING_STATE} from "../../../../stores/base/RemoteStore";
import LoadingView from "../../../base/refactored/loadingView/LoadingView";
import Body from "../../../base/Body";
import React from "react";

class EmailVerificationFormView extends ScrollableFormBox {
	static getForm() {
		return EmailVerification.map();
	}

	render() {
		if (this.getState().loadingState === LOADING_STATE.LOADED) {
			return <form className={this.getFormClass()}>
				{this.getTitleView()}
				{this.getHintView()}
				{this.getFieldsView()}
				{this.getButtonsView()}
			</form>
		} else {
			return <div className={this.getFormClass()}>
				<Body>
					<LoadingView/>
				</Body>
			</div>
		}

	}
}

export default connect(EmailVerificationFormView);
