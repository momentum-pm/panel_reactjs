import React from "react";
import {withRouter} from "react-router";
import ButtonView from "../forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../stores/base/form/buttons/Button";
import History from "../../../History";
import Res from "../../../assets/Res";
import Column from "../Column";
import Row from "../Row";
import Box from "../refactored/box/Box";

class InstantVideoModal extends React.Component {
	render() {
		let fileAddress = this.props.location.state.url;
		return (
			<div className={`instant-image-modal`}>
				<Column className={'centered full-height'}>
					<Row className={''}>
						<ButtonView className={'filled flat large danger round-shape'}
									type={BUTTON_TYPE.BUTTON}
									onClick={() => History.goBack()}
									icon={Res.icon.cross}/>
					</Row>
					<Row className={'centered'}>
						{/*<ButtonView className={'filled flat large round-shape primary'}*/}
						{/*			type={BUTTON_TYPE.BUTTON}*/}
						{/*			onClick={() => History.goBack()}*/}
						{/*			icon={Res.icon.backArrow}/>*/}
						<Box>
							<video controls={true} className={'instant-image-modal-image'}>
								<source src={fileAddress}/>
							</video>
						</Box>
						{/*<ButtonView className={'filled flat large round-shape primary'}*/}
						{/*			type={BUTTON_TYPE.BUTTON}*/}
						{/*			onClick={() => History.goBack()}*/}
						{/*			icon={Res.icon.nextArrow}/>*/}
					</Row>
				</Column>

			</div>);
	}
}

export default withRouter(InstantVideoModal);
