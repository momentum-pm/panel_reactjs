import React from "react";
import ParagraphEditFormView from "./ParagraphEditFormView";
import Box from "../../../../../base/refactored/box/Box";
import Res from "../../../../../../assets/Res";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../../../stores/base/form/buttons/Button";
import Row from "../../../../../base/Row";
import ParagraphView from "../../posts/ParagraphView";

export default function AuthorParagraphView({part}) {
	if (part.isOpen) {
		return <ParagraphEditFormView partId={part.id}/>
	} else {
		return (
			<Box>
				<ParagraphView part={part} />
				<Row className={'reverse padding-one'}>
					<ButtonView type={BUTTON_TYPE.BUTTON}
								title={Res.string.blog.edit_part}
								icon={Res.icon.edit}
								onClick={part.open}
								className={'raised primary'}/>
				</Row>


			</Box>
		)
	}
}
