import ScrollableFormBox from "../../../base/forms/ScrollableFormBox";
import {connect} from "../../../../stores/base/StoreManager";
import PhoneNumberUpdateForm from "../stores/PhoneNumberUpdateForm";


class PhoneNumberUpdateFormView extends ScrollableFormBox {
	static getForm() {
		return PhoneNumberUpdateForm.map();
	}
}

export default connect(PhoneNumberUpdateFormView);
