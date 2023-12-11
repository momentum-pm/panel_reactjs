import React from "react";
import ButtonView from "../forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../stores/base/form/buttons/Button";
import Body from "../Body";
import Res from "../../../assets/Res"
import empty from "../../../assets/images/empty.svg"
import Column from "../Column";
import "./EmptyView.scss";


export default function EmptyView({title = undefined, text = undefined, icon = undefined, redirectTitle = undefined, redirectPath = undefined, redirectIcon = undefined}) {
	let redirectView;
	if (redirectTitle && redirectPath) {
		redirectView = <ButtonView
			type={BUTTON_TYPE.LINK}
			link={redirectPath}
			title={redirectTitle}
			icon={redirectIcon}
			className={'raised accent'}/>
	}
	let textView;
	if (text) {
		textView = (<p className="empty-view-text center">{text}</p>);
	}
	if (title === undefined) {
		title = Res.string.nothingToShow;
	}
	if (icon === undefined) {
		icon = empty;
	}
	return (
		<Body className={'empty-view'}>
			<Column className={'centered'}>
				<img className={'empty-view-image'} src={icon} alt={Res.string.nothingToShow}/>
				<h6 className={'empty-view-title'}>{title}</h6>
				{textView}
				{redirectView}
			</Column>
		</Body>
	);
}
