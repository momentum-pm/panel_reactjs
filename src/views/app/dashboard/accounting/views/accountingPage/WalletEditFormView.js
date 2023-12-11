import ScrollableFormBox from "../../../../../base/forms/ScrollableFormBox";
import {connect} from "../../../../../../stores/base/StoreManager";
import WalletEditForm from "../../stores/WalletEditForm";

class WalletEditFormView extends ScrollableFormBox {
	static getForm() {
		return WalletEditForm.map();
	}
}

export default connect(WalletEditFormView);
