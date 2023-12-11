import {withRouter} from "react-router";
import {connect} from "../../../../../../stores/base/StoreManager";
import React from "react";
import ListRemoteStoreView from "../../../../../base/ListRemoteStoreView";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import AuthorPostParts from "../../../stores/AuthorPostParts";
import Res from "../../../../../../assets/Res";
import {BUTTON_TYPE} from "../../../../../../stores/base/form/buttons/Button";
import AuthorPostPartView from "./AuthorPostPartView";

class AuthorPostPartsView extends ListRemoteStoreView {
	static getRemoteStore(props) {
		let authorId = props.match.params.authorId;
		let postId = props.match.params.postId;
		return AuthorPostParts.map(postId, {postId, authorId});
	}



	getOkView() {
		return <div>
			<ButtonView
				type={BUTTON_TYPE.BUTTON}
				title={Res.string.blog.add_part}
				onClick={() => this.getStore().createPart(-1)}
				icon={Res.icon.add}
				className={'flat primary'}/>
			{this.getData().map(this.mapItemToView)}
		</div>
	}

	mapItemToView(item, index) {
		return (
			<div>
				<AuthorPostPartView part={item} key={item.id}/>
				<ButtonView
					type={BUTTON_TYPE.BUTTON}
					title={Res.string.blog.add_part}
					onClick={() => this.getStore().createPart(index)}
					icon={Res.icon.add}
					className={'flat full primary'}/>
			</div>
		)
	}
}

export default withRouter(connect(AuthorPostPartsView))
