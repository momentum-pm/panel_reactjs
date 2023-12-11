import ListRemoteStoreView from "../../../../../base/ListRemoteStoreView";
import {connect} from "../../../../../../stores/base/StoreManager";
import React from "react";
import WithdrawView from "./WithdrawView";
import Withdraws from "../../stores/Withdraws";

class WithdrawsView extends ListRemoteStoreView {
	static getRemoteStore() {
		return Withdraws.map();
	}

	mapItemToView(item, index) {

		return <WithdrawView withdraw={item} key={item.id}/>
	}
}

export default connect(WithdrawsView);
