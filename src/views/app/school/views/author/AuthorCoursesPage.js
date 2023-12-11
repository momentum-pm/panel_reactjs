import PaginatedRemoteStorePage from "../../../../base/PaginatedRemoteStorePage";
import {connect} from "../../../../../stores/base/StoreManager";
import {withRouter} from "react-router";
import AuthorCourses from "../../stores/author/AuthorCourses";
import AuthorCourseView from "./AuthorCourseView";
import React from "react";
import Box from "../../../../base/refactored/box/Box";
import Body from "../../../../base/Body";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import ButtonView from "../../../../base/forms/button/ButtonView";
import Res from "../../../../../assets/Res";


class AuthorCoursesPage extends PaginatedRemoteStorePage {
	static getRemoteStore(props) {
		let {authorId} = props.match.params;
		return AuthorCourses.map(authorId, {authorId});
	}

	mapItemToView(item, index) {
		return <AuthorCourseView course={item} key={item.id}/>
	}

	getHeaderView() {
		return <Box>
			<Body>
				<Row className={'centered'}>
					<MasterColumn>
						<h4 className={'title'}>{Res.string.school.admin_courses_title}</h4>
					</MasterColumn>
					<ButtonView id={this.getState().createButton.id}/>
				</Row>
			</Body>
		</Box>
	}
}

export default withRouter(connect(AuthorCoursesPage));
