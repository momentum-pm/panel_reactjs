import ListRemoteStoreView from "../../../../../base/ListRemoteStoreView";
import Invoices from "../../stores/Invoices";
import {connect} from "../../../../../../stores/base/StoreManager";
import InvoiceView from "./InvoiceView";
import React from "react";

class InvoicesView extends ListRemoteStoreView {
	static getRemoteStore() {
		return Invoices.map();
	}

	mapItemToView(item, index) {
		return <InvoiceView invoice={item} key={item.id}/>
	}
}

export default connect(InvoicesView);
