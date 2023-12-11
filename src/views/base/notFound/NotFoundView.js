import React from "react";
import notFoundImage from "../../../assets/images/404.svg";
import Res from "../../../assets/Res";
import "./NotFoundView.scss";
import ButtonView from "../forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../stores/base/form/buttons/Button";
import Row from "../Row";

export default function NotFoundView() {
	return (
		<div>
			<img className="not-found-image" src={notFoundImage} alt="Not Found"/>
			<p className="center text">{Res.string.notFound}</p>
			<Row>
				<ButtonView
					type={BUTTON_TYPE.LINK}
					link={'/dashboard/'}
					title={Res.string.go_to_home}
					icon={Res.icon.home}
					className={'center large primary raised'}/>
			</Row>

		</div>
	);
}
