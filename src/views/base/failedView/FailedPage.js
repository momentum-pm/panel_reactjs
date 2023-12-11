import React from "react";
import Res from "../../../assets/Res";
import FailedView from "./FailedView";
import HalfPageBox from "../HalfPageBox";

export default function FailedPage({message, reload}) {
	return (
		<HalfPageBox>
			<h4  className={'margin-two'}>{Res.string.attention}</h4>
			<FailedView message={message} reload={reload}/>
		</HalfPageBox>
	);
}
