import React from "react";
import {withRouter} from "react-router";
import ButtonView from "../forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../stores/base/form/buttons/Button";
import History from "../../../History";
import Res from "../../../assets/Res";
import Row from "../Row";
import Column from "../Column";
import Box from "../refactored/box/Box";

class ImageInstantView extends React.Component {
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
							<img className={'instant-image-modal-image'} src={fileAddress} alt={fileAddress}/>
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

export default withRouter(ImageInstantView);
