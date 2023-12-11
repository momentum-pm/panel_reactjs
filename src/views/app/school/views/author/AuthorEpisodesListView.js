import {withRouter} from "react-router";
import {connect} from "../../../../../stores/base/StoreManager";
import Body from "../../../../base/Body";
import ButtonView from "../../../../base/forms/button/ButtonView";
import React from "react";
import AuthorEpisodes from "../../stores/author/AuthorEpisodes";
import AuthorEpisodeView from "./AuthorEpisodeView";
import ListRemoteStoreView from "../../../../base/ListRemoteStoreView";

class AuthorEpisodesListView extends ListRemoteStoreView {
	static getRemoteStore(props) {
		let {authorId, courseId} = props.match.params;
		let sectionId = props.sectionId;
		return AuthorEpisodes.map(sectionId, {authorId, courseId, sectionId});
	}

	componentDidMount() {
	}
	getOkView() {
		return (
			<Body>
				{super.getOkView()}
			</Body>
		)
	}

	mapItemToView(item, index) {
		return <AuthorEpisodeView episode={item} key={item.id} index={index}/>
	}

	getEmptyView() {
		return null;
	}
}

export default withRouter(connect(AuthorEpisodesListView))
