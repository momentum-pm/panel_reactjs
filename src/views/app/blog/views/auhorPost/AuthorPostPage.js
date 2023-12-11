import {withRouter} from "react-router";
import {connect} from "../../../../../stores/base/StoreManager";
import RemoteStoreView from "../../../../base/RemoteStoreView";
import AuthorPost from "../../stores/AuthorPost";
import React from "react";
import PostPartView from "../posts/PostPartView";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import FooterView from "../../../home/views/footerView/FooterView";
import HeaderRow from "../../../../base/refactored/headerRow/HeaderRow";
import MasterColumn from "../../../../base/MasterColumn";
import ButtonView from "../../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import IconTitleValueView from "../../../../base/iconTitleValueView/IconTitleValueView";
import PostHeaderView from "../posts/PostHeaderView";

class AuthorPostPage extends RemoteStoreView {
	static getRemoteStore(props) {
		let authorId = props.match.params.authorId;
		let postId = props.match.params.postId;
		return AuthorPost.map(postId, {postId, authorId});
	}


	getOkView() {
		return <ScrollableColumn>
			<HeaderRow className={'padding-one'}>
				<MasterColumn>
					<IconTitleValueView
						icon={Res.icon.check}
						title={Res.string.blog.state_label}
						value={Res.string.blog.state_to_title[this.getData().state]}/>
				</MasterColumn>
				<ButtonView type={BUTTON_TYPE.LINK}
							className={'raised primary'}
							icon={Res.icon.edit}
							title={Res.string.blog.edit_post_button}
							link={`/blog/authors/${this.getState().authorId}/posts/${this.getState().postId}/edit/`}/>
			</HeaderRow>
			<Scrollable>
				
				<PostHeaderView post={this.getData()}/>
				{this.getData().parts.map(part => <PostPartView className={'container'}  part={part} key={part.id}/>)}
				<FooterView/>
			</Scrollable>
		</ScrollableColumn>
	}
}

export default withRouter(connect(AuthorPostPage))
