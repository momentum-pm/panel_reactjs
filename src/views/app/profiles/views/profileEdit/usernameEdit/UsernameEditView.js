import RemoteStoreView from "../../../../../base/RemoteStoreView";
import {connect} from "../../../../../../stores/base/StoreManager";
import ProfileUsername from "../../../stores/ProfileUsername";
import React from "react";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import Box from "../../../../../base/refactored/box/Box";
import Body from "../../../../../base/Body";
import Row from "../../../../../base/Row";
import Res from "../../../../../../assets/Res";
import {BUTTON_TYPE} from "../../../../../../stores/base/form/buttons/Button";
import MasterColumn from "../../../../../base/MasterColumn";
import Settings from "../../../../../../Settings";


class UsernameEditView extends RemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return ProfileUsername.map(profileId, {profileId});
	}

	getOkView() {
		return <Box>
			<Body>
				<h3 className={'center title'}>{Res.string.username}</h3>
				<p className={'center subtitle'}>{Res.string.username_hint}</p>
				<Row className={'centered light-box'}>

					<ButtonView className={'flat primary'}
								icon={Res.icon.copy}
								about={Res.string.copy}
								onClick={() => navigator.clipboard.writeText(`${Settings.CLIENT_URL}/@${this.getData().username}`)}
								type={BUTTON_TYPE.BUTTON}/>
					<MasterColumn className={'en-box margin-one'}>
						<p className={'text'}>{`greenoly.org/@${this.getData().username}`}</p>
					</MasterColumn>
				</Row>
				{this.getData().username_set ? null : <p className={'padding-one-before-after center subtitle'}>{Res.string.no_username}</p>}
				{this.getState().open ?
					<div className={'padding-one-before-after'}>
						{this.getData().candidates.length > 0 ?
							<div>
								<h3 className={'center title'}>{Res.string.username_candidates}</h3>

								<p>{this.getData().candidates.toString()}</p>
							</div>
							: null}
						<ButtonView id={this.getState().closeButton.id}/>
					</div>
					:
					<div>
						<ButtonView id={this.getState().openButton.id}/>
					</div>
				}
			</Body>
		</Box>
	}
}

export default connect(UsernameEditView);
