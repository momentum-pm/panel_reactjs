import ScrollableFormBox from "../../../../../base/forms/ScrollableFormBox";
import {connect} from "../../../../../../stores/base/StoreManager";
import WithdrawCreateForm from "../../stores/WithdrawCreateForm";

class WithdrawCreateFormView extends ScrollableFormBox {
	static getForm() {
		return WithdrawCreateForm.map();
	}
}

export default connect(WithdrawCreateFormView);
