import {withRouter} from "react-router";
import {connect} from "../../../../../../stores/base/StoreManager";
import UserInfoEditForm from "../../../stores/userProfileEdit/UserInfoEditForm";
import CollapsedFormView from "../../../../../base/forms/CollapsedFormView";
import React from "react";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import AbstractUserInfoView from "../../profileVisit/userProfileVisit/AbstractUserInfoView";

class UserInfoEditView extends CollapsedFormView {
	static getForm(props) {
		let profileId = props.profileId;
		return UserInfoEditForm.map(profileId, {profileId});
	}

	getClosedView() {
		let profile = this.getState().context;
		return (
			<AbstractUserInfoView profile={profile}/>
		)
	}

	getTitleView() {
		return <div className={'padding-one-before-after padding-two-sides'}>
			{this.getState().isOpen ? null : <div className={''}>{this.getClosedView()}</div>}
			{this.getState().isOpen ? null : <ButtonView id={this.getState().toggleButton.id}/>}
		</div>;
	}
	getFormClass() {
		return '';
	}

	getFieldsClassName() {
		return 'padding-one-sides';
	}


}

export default withRouter(connect(UserInfoEditView));
