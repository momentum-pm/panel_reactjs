import React from "react";
import Box from "../../../../../base/refactored/box/Box";
import Res from "../../../../../../assets/Res";
import Row from "../../../../../base/Row";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../../../stores/base/form/buttons/Button";
import CoursePromotionView from "../../posts/CoursePromotionView";
import CoursePromotionEditFormView from "./CoursePromotionEditFormView";

export default function AuthorCoursePromotionView({part}) {
	if (part.isOpen) {
		return <CoursePromotionEditFormView partId={part.id}/>
	} else {
		return (
			<Box>
				<CoursePromotionView part={part}/>
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
