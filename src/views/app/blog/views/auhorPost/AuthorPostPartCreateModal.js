import React from "react";
import {withRouter} from "react-router";
import {connect} from "../../../../../stores/base/StoreManager";
import NoLoadRemoteStoreView from "../../../../base/NoLoadRemoteStoreView";
import AuthorPostParts from "../../stores/AuthorPostParts";
import Box from "../../../../base/refactored/box/Box";
import Body from "../../../../base/Body";
import ButtonView from "../../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import MasterColumn from "../../../../base/MasterColumn";
import Row from "../../../../base/Row";
import Header from "../../../../base/refactored/header/Header";
import History from "../../../../../History";

class AuthorPostPartCreateModal extends NoLoadRemoteStoreView {
	static getRemoteStore(props) {
		let authorId = props.match.params.authorId;
		let postId = props.match.params.postId;
		return AuthorPostParts.map(postId, {postId, authorId});
	}

	getOkView() {
		return <Box>
			<Row className={'full-item'}>
				<Header>{Res.string.blog.part_subtype}</Header>
				<MasterColumn>
					<Body>
						<Row>
							<ButtonView id={this.getState().createParagraphButton.id}/>
						</Row>
						<Row>
							<ButtonView id={this.getState().createImagePartButton.id}/>
						</Row>
						<Row>
							<ButtonView id={this.getState().createCoursePromotionButton.id}/>
						</Row>
						<Row>
							<ButtonView type={BUTTON_TYPE.BUTTON}
										title={Res.string.back}
										icon={Res.icon.backArrow}
										className={'main-flex flat primary'}
										onClick={() => History.goBack()}/>
						</Row>

					</Body>
				</MasterColumn>
			</Row>

		</Box>
	}
}

export default withRouter(connect(AuthorPostPartCreateModal));
