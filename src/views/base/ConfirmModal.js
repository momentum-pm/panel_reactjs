import React from "react";
import StoreView from "./StoreView";
import Confirm from "../../stores/base/Confirm";
import ButtonView from "./forms/button/ButtonView";
import {connect} from "../../stores/base/StoreManager";
import Body from "./Body";
import Row from "./Row";

class ConfirmModal extends StoreView {
	static mapPropsToStores(props) {
		return {confirm: Confirm.map()};
	}

	render() {
		let state = this.props.confirm.state;
		return <form className={'box'}>
			<Row className={'full-width'}>
				<div className={'padding-two-sides master-column'}>
					<h5 className={'center padding-two-before-after border-bottom'}>{state.title}</h5>
					<Body>
						<p className={'center  padding-two-before-after'}>{state.text}</p>
						<Row className={'reverse'}>
							<ButtonView id={state.confirm_button.id}/>
							<ButtonView id={state.cancel_button.id}/>
						</Row>
					</Body>
				</div>
			</Row>
		</form>
	}
}

export default connect(ConfirmModal);
