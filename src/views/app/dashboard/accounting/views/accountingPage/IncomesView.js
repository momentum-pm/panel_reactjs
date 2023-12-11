import ListRemoteStoreView from "../../../../../base/ListRemoteStoreView";
import {connect} from "../../../../../../stores/base/StoreManager";
import React from "react";
import Incomes from "../../stores/Incomes";
import IncomeView from "./IncomeView";

class IncomesView extends ListRemoteStoreView {
	static getRemoteStore() {
		return Incomes.map();
	}

	mapItemToView(item, index) {
		return <IncomeView income={item} key={item.id}/>
	}
}

export default connect(IncomesView);
