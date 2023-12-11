import AuthorPostParts from "../../../stores/AuthorPostParts";
import AuthorParagraphView from "./AuthorParagraphView";
import React from "react";
import AuthorImagePartView from "./AuthorImagePartView";
import AuthorCoursePromotionView from "./AuthorCoursePromotionView";

export default function AuthorPostPartView({part}) {
	switch (part.subtype) {
		case AuthorPostParts.SUBTYPES.PARAGRAPH:
			return <AuthorParagraphView part={part}/>;
		case AuthorPostParts.SUBTYPES.IMAGE:
			return <AuthorImagePartView part={part}/>;
		case AuthorPostParts.SUBTYPES.COURSE_PROMOtION:
			return <AuthorCoursePromotionView part={part}/>;
		default:
			break;
	}
}
