import React from "react";
import RichText from "../../../base/richText/RichText";

export default function NotesView({notes}) {
	return (
		<div className={'padding-two'} id={'notes'}>
			{/*<h4 className={'padding-two-sides'}>{Res.string.school.notes}</h4>*/}
			<RichText className={'text padding-two-sides blog'}>
				{notes}
			</RichText>
		</div>

	)
}
