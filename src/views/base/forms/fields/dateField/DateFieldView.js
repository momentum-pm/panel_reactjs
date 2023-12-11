import "./DateFieldView.scss";
import React from 'react';
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";
import DateField from "../../../../../stores/base/form/fields/DateField";
import Res from "../../../../../assets/Res";
import CalendarView from "./CalendarView";

export class DateFieldView extends FieldView {
	static getField(props) {
		return DateField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.state = {open: false};
	}

	getInputView() {
		return (
			<div className={`date-field-view ${this.getState().value ? 'filled' : ''}`}>
				<div className={'date-field-view-value'}>
					<div className={'row centered'}>
						{Res.icon.calendarEdit}
						{this.getState().value ?
							<p className={'date-field-view-value-active'}>{this.getState().showCalendar.getFormalString(this.getState().valuesCalendar.toCalendar(this.getState().value, this.getState().showCalendar))}</p>
							:
							<p className={'date-field-view-value-active'}>{Res.string.select_date_placeholder}</p>
						}
					</div>
				</div>
				<input type={'button'} className={'date-field-view-input'}
					   onClick={(event) => this.openCalendar(event)}/>
				{this.state.open ? this.getCalendarView() : null}
			</div>
		)
	}

	getCalendarView() {
		return (
			<div className={'date-field-calendar-container'}>
				<div className={'date-field-calendar-mask'} onClick={() => this.closeCalendar()}/>
				<div className={'date-field-calendar'}>
					<CalendarView maxValue={this.getState().maxValue}
								  minValue={this.getState().minValue}
								  showCalendar={this.getState().showCalendar}
								  valuesCalendar={this.getState().valuesCalendar}
								  defaultValue={this.getState().defaultValue}
								  value={this.getState().value}
								  onChange={(value) => {
									  this.closeCalendar();
									  this.getField().setValue(value)
								  }}/>
				</div>
			</div>
		)
	}

	openCalendar(event) {
		this.setState({open: true});
	}

	closeCalendar(event) {
		this.setState({open: false});

	}

}

DateFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(DateFieldView);

