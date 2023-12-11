import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";
import {DateFieldView} from "../dateField/DateFieldView";
import FixedDayDateField from "../../../../../stores/base/form/fields/FixedDayDateField";

export class FixedDayDateFieldView extends DateFieldView {
	static getField(props) {
		return FixedDayDateField.map(props.id);
	}

}

FixedDayDateFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(FixedDayDateFieldView);

