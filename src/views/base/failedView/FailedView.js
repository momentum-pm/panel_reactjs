import React from "react";
import Res from "../../../assets/Res";
import Body from "../Body";
import ButtonView from "../forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../stores/base/form/buttons/Button";
import Row from "../Row";

export default function FailedView({message, reload}) {
	return (
		<Body>
			<p className="center text">{message ? Res.get_attribute(message, 'text') : ''}</p>
			<Row>
				<ButtonView
					type={BUTTON_TYPE.BUTTON}
					title={Res.string.try_again}
					onClick={reload}
					icon={Res.icon.refresh}
					className={`center large raised ${message && message.color ? message.color : 'danger'}`}/>

			</Row>
		</Body>
	);
}
