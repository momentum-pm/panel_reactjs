import Res from "../../../../../assets/Res";
import React from "react";
import "./CalendarView.scss";
import PropTypes from "prop-types";
import {normalizeNumber} from "../../../../../utils/StringUtils";

class CalendarView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {...this.props};
		let frameValue;
		if (this.state.value) {
			frameValue = this.state.value;
		} else if (this.state.defaultValue) {
			frameValue = this.state.defaultValue;
		}
		let frameShow = this.state.valuesCalendar.toCalendar(frameValue, this.state.showCalendar);
		let {month, year} = this.state.showCalendar.split(frameShow);
		this.state.frameShowStart = this.state.showCalendar.formatDate(`${year}-${month}-01`);
		this.state.weekdays = this.state.showCalendar.weekdaysShort;
		let states = this.calculateStates(this.state.frameShowStart);
		this.state = {...this.state, ...states};
		this.goToNextYear = this.goToNextYear.bind(this);
		this.goToNextMonth = this.goToNextMonth.bind(this);
		this.goToPreviousYear = this.goToPreviousYear.bind(this);
		this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
		this.goToToday = this.goToToday.bind(this);
	}


	render() {
		return (<div className={'calendar-view'}>
			<div className={'calendar-header-row'}>
				<div
					onClick={this.goToPreviousMonth}
					className={`calendar-header-jump-month  ${this.state.hasPreviousMonth ? 'valid-month' : 'invalid-month'}`}>
					{Res.icon.backArrow}
				</div>
				<h3 className={'calendar-header-current-month'}>
					{this.state.title}
				</h3>
				<div
					onClick={this.goToNextMonth}
					className={`calendar-header-jump-month ${this.state.hasNextMonth ? 'valid-month' : 'invalid-month'}`}>
					{Res.icon.nextArrow}
				</div>
			</div>
			<div className={'calendar-body'}>
				<div className={'calendar-weekdays-row'}>
					{
						this.state.weekdays.map((weekday, index) =>
							<p className={'calendar-weekday'} key={index}>{weekday}</p>)
					}
				</div>
				<div className={'calendar-days'}>
					{this.state.days.map((date, index) =>
						<p className={`calendar-day ${date.enable ? 'calendar-day-enable' : 'calendar-day-disable'} ${date.today ? 'calendar-day-today' : ''} ${date.active ? 'calendar-day-active' : ''}`}
						   key={date.value}
						   onClick={() => this.state.onChange(date.value)}>{normalizeNumber(date.day)}</p>)
					}
				</div>
			</div>
			<div className={'calendar-footer-row'}>
				<div className={`calendar-footer-jump-year ${this.state.previousYear ? 'valid-year' : 'invalid-year'}`}
					 onClick={this.goToPreviousYear}>
					{Res.icon.backArrow}
					<p>{normalizeNumber(this.state.previousYear)}</p>
				</div>

				<div className={'calendar-footer-center'}/>
				<div className={`calendar-footer-jump-year ${this.state.nextYear ? 'valid-year' : 'invalid-year'}`}
					 onClick={this.goToNextYear}>
					{Res.icon.nextArrow}
					<p>{normalizeNumber(this.state.nextYear)}</p>
				</div>

			</div>
		</div>);
	}

	setFrameStart(frameShowStart) {
		let states = this.calculateStates(frameShowStart);
		this.setState({frameShowStart, ...states})
	}

	calculateStates(frameShowStart) {
		let {year, month} = this.state.showCalendar.split(frameShowStart);
		let {year: minYear, month: minMonth} = this.state.showCalendar.split(this.state.valuesCalendar.toCalendar(this.state.minValue, this.state.showCalendar));
		let {year: maxYear, month: maxMonth} = this.state.showCalendar.split(this.state.valuesCalendar.toCalendar(this.state.maxValue, this.state.showCalendar));
		let hasNextMonth, hasPreviousMonth, nextYear, previousYear, title, days;
		if ((maxYear > year) || (maxYear === year && maxMonth > month)) {
			hasNextMonth = true;
		}
		if ((minYear < year) || (minYear === year && minMonth < month)) {
			hasPreviousMonth = true;
		}
		if ((maxYear > year + 1) || (maxYear > year && maxMonth >= month)) {
			nextYear = year + 1;
		}
		if ((minYear < year - 1) || (minYear < year && minMonth <= month)) {
			previousYear = year - 1;
		}
		title = this.state.showCalendar.getYearMonthString(frameShowStart);
		days = [];
		let daysOfMonth = this.state.showCalendar.getDaysOfMonth(year, month);
		let lYear = year, lMonth = month, nYear = year, nMonth = month;
		lMonth -= 1;
		if (lMonth === 0) {
			lMonth = 12;
			lYear -= 1;
		}
		nMonth += 1;
		if (nMonth === 13) {
			nMonth = 1;
			nYear += 1;
		}
		let activeValue = this.state.value;
		let daysOfLastMonth = this.state.showCalendar.getDaysOfMonth(lYear, lMonth);
		let weekdayStart = this.state.showCalendar.getWeekday(frameShowStart);
		for (let i = 0; i < weekdayStart; i++) {
			let day = daysOfLastMonth + 1 + i - weekdayStart;
			let showDate = this.state.showCalendar.formatDate(`${lYear}-${lMonth}-${day}`);
			let value = this.state.showCalendar.toCalendar(showDate, this.state.valuesCalendar);
			days.push({
				day,
				enable: false,
				value,
				active: value === activeValue,
			})
		}
		for (let i = 0; i < daysOfMonth; i++) {
			let day = i + 1;
			let showDate = this.state.showCalendar.formatDate(`${year}-${month}-${day}`);
			let value = this.state.showCalendar.toCalendar(showDate, this.state.valuesCalendar);
			days.push({
				day,
				enable: true,
				value,
				active: value === activeValue,
			})
		}
		let totalDays = days.length - days.length % 7;
		if (totalDays < days.length) {
			totalDays += 7;
		}
		let toAddDays = totalDays - days.length;
		for (let i = 0; i < toAddDays; i++) {
			let day = i + 1;
			let showDate = this.state.showCalendar.formatDate(`${nYear}-${nMonth}-${day}`);
			let value = this.state.showCalendar.toCalendar(showDate, this.state.valuesCalendar);
			days.push({
				day,
				enable: false,
				value,
				active: value === activeValue,
			})
		}
		return {hasNextMonth, hasPreviousMonth, nextYear, previousYear, title, days};

	}

	goToNextYear() {
		if (this.state.nextYear) {
			let {year, month} = this.state.showCalendar.split(this.state.frameShowStart);
			year += 1;
			let frameShowStart = this.state.showCalendar.formatDate(`${year}-${month}-01`);
			this.setFrameStart(frameShowStart);
		}
	}

	goToNextMonth() {
		if (this.state.hasNextMonth) {
			let {year, month} = this.state.showCalendar.split(this.state.frameShowStart);
			month += 1;
			if (month > 12) {
				month = 1;
				year++;
			}
			let frameShowStart = this.state.showCalendar.formatDate(`${year}-${month}-01`);
			this.setFrameStart(frameShowStart);
		}
	}

	goToPreviousYear() {
		if (this.state.previousYear) {
			let {year, month} = this.state.showCalendar.split(this.state.frameShowStart);
			year -= 1;
			let frameShowStart = this.state.showCalendar.formatDate(`${year}-${month}-01`);
			this.setFrameStart(frameShowStart);
		}
	}

	goToPreviousMonth() {
		if (this.state.hasPreviousMonth) {
			let {year, month} = this.state.showCalendar.split(this.state.frameShowStart);
			month -= 1;
			if (month < 1) {
				month = 12;
				year--;
			}
			let frameShowStart = this.state.showCalendar.formatDate(`${year}-${month}-01`);
			this.setFrameStart(frameShowStart);
		}
	}

	goToToday() {
		let {year, month} = this.state.showCalendar.split(this.state.showCalendar.getToday());
		let frameShowStart = this.state.showCalendar.formatDate(`${year}-${month}-01`);
		this.setFrameStart(frameShowStart);
	}

}

CalendarView.propTypes = {
	valuesCalendar: PropTypes.object,
	showCalendar: PropTypes.object,
	value: PropTypes.string,
	minValue: PropTypes.string.isRequired,
	defaultValue: PropTypes.string.isRequired,
	maxValue: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default CalendarView;
