import FormView from "../../../../base/forms/FormView";
import {connect} from "../../../../../stores/base/StoreManager";
import ContactUsForm from "../../stores/ContactUsForm";


class ContactUsFormView extends FormView {

	static getForm(props) {
		return ContactUsForm.map();
	}

	getFormClass() {
		return 'box contact-us-form';
	}

}

export default connect(ContactUsFormView);
