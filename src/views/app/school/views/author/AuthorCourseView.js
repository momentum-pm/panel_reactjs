import Box from "../../../../base/refactored/box/Box";
import Body from "../../../../base/Body";
import React from "react";
import Link from "../../../../base/Link";

export default function AuthorCourseView({course}) {
	return (
		<Link to={`/school/authors/${course.author}/courses/${course.id}/`}>
			<Box>
				<Body>
					<p>
						{course.title}
					</p>
				</Body>
			</Box>
		</Link>

	)
}
