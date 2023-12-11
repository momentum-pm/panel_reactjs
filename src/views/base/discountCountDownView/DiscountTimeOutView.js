import StoreView from "../StoreView";
import EventCountDown from "../../../stores/base/EventCountDown";
import {connect} from "../../../stores/base/StoreManager";
import TimerView from "../timerView/TimerView";
import Res from "../../../assets/Res";
import React from "react";

class DiscountTimeOutView extends StoreView {
	static mapPropsToStores() {
		return {countDown: EventCountDown.map()};
	}

	getTimer() {
		return this.props.countDown.state.timer;
	}


	render() {
		return (
			<TimerView timer={this.getTimer()} title={Res.string.to_end_of_discount} className={'white'}/>
		)
	}
}

export default connect(DiscountTimeOutView);
