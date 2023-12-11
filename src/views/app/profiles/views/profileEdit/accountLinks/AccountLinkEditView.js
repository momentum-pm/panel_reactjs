import React from "react";
import AccountLinkView from "../../profileVisit/accountLinks/AccountLinkView";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../../assets/Res";

export default class AccountLinkEditView extends AccountLinkView {
	render() {
		let onClick = this.props.accountLink.onClick;
		return (
			<ButtonView type={BUTTON_TYPE.BUTTON}
						onClick={()=>{onClick();}}
						icon={this.getIcon()}
						about={Res.get_attribute(this.props.accountLink.website, 'title')}
						className={'flat success background large'}/>
		)
	}
}
