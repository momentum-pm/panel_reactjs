import AuthorPostParts from "../../stores/AuthorPostParts";
import ParagraphView from "./ParagraphView";
import React from "react";
import ImagePartView from "./ImagePartView";
import CoursePromotionView from "./CoursePromotionView";

export default function PostPartView({part,className}) {
	switch (part.subtype) {
		case AuthorPostParts.SUBTYPES.PARAGRAPH:
			return <ParagraphView part={part} className={className} />;
		case AuthorPostParts.SUBTYPES.IMAGE:
			return <ImagePartView part={part} className={className}/>;
		case AuthorPostParts.SUBTYPES.COURSE_PROMOtION:
			return <CoursePromotionView part={part} className={className}/>;
		default:
			break;
	}
}
