import {connect} from "../../stores/base/StoreManager";
import ScrollableFormBox from "./forms/ScrollableFormBox";
import ChoiceSelector from "../../stores/base/ChoiceSelector";

class ConfirmModal extends ScrollableFormBox {
	static getForm(props) {
		return ChoiceSelector.map();
	}

}

export default connect(ConfirmModal);
