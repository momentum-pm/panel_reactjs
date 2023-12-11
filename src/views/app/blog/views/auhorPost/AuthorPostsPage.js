import {withRouter} from "react-router";
import {connect} from "../../../../../stores/base/StoreManager";
import AuthorPosts from "../../stores/AuthorPosts";
import React from "react";
import AuthorPostView from "./AuthorPostView";
import MasterColumn from "../../../../base/MasterColumn";
import ButtonView from "../../../../base/forms/button/ButtonView";
import Res from "../../../../../assets/Res";
import Box from "../../../../base/refactored/box/Box";
import EmptyView from "../../../../base/emptyListView/EmptyView";
import Column from "../../../../base/Column";
import Body from "../../../../base/Body";
import PaginatedRemoteStoreView from "../../../../base/PaginatedRemoteStoreView";
import Row from "../../../../base/Row";


class AuthorPostsPage extends PaginatedRemoteStoreView {
	static getRemoteStore(props) {
		let authorId = props.match.params.authorId;
		return AuthorPosts.map(authorId, {authorId});
	}


	getHeaderView() {
		return <Box>
			<Body>
				<Row className={'centered'}>
					<MasterColumn>
						<h2 className={'title'}>{Res.string.blog.author_posts}</h2>
					</MasterColumn>
					<ButtonView id={this.getState().createButton.id}/>

				</Row>
			</Body>

		</Box>;
	}

	getEmptyView() {
		return <Box>
			<Body>
				<EmptyView/>
				<Column className={'centered'}>
					<ButtonView id={this.getState().createButton.id}/>
				</Column>
			</Body>
		</Box>
	}

	mapItemToView(item, index) {
		return <AuthorPostView post={item} key={item.id}/>
	}
}

export default withRouter(connect(AuthorPostsPage))
