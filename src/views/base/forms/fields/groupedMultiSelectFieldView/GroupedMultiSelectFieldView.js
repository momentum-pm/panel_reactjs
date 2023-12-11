import "./GroupedMultiSelectFieldView.scss";
import React from 'react';
import PropTypes from "prop-types";
import Res from "../../../../../assets/Res";
import {connect} from "../../../../../stores/base/StoreManager";
import {MultiSelectFieldView} from "../multiSelectFieldView/MultiSelectFieldView";
import GroupedMultiSelectField from "../../../../../stores/base/form/fields/GroupedMultiSelectField";

export class GroupedMultiSelectFieldView extends MultiSelectFieldView {
	static getField(props) {
		return GroupedMultiSelectField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.mapGroupToView = this.mapGroupToView.bind(this);
		this.getItemsView = this.getItemsView.bind(this);
		this.onGroupChange = this.onGroupChange.bind(this);
	}

	getInputView() {
		let state = this.getState();
		return (
			<div className={`checkbox-field ${state.groupsClassName}`}>
				<p className={'small'}>{state.question}</p>
				{!this.getState().cascadeButton || this.getState().open ?
					state.groups.map(this.mapGroupToView)
					: null}
			</div>
		)
	}


	mapGroupToView(group, index) {
		let state = this.getState();
		let groupValue = this.getState().groupToValue(group);
		let checked = this.getField().isCheckedGroup(group);
		let title = this.getState().groupToTitle(group);
		return (
			<div key={index} className={state.groupClassName || ''}>
				<div className={`checkbox-field-item row centered `}
					 key={groupValue}>
					<input className={'checkbox-field-item-input'} type="checkbox" checked={checked}
						   value={groupValue}
						   onChange={(event) => this.onGroupChange(event, groupValue)}/>
					<div className='checkbox-field-item-check-container'>
						<div className='checkbox-field-item-check'>
							{Res.icon.check}
						</div>
					</div>
					<p>{title}</p>
				</div>
				{this.getItemsView(group)}
			</div>

		);
	}

	getItemsView(group) {
		let checked = this.getField().isCheckedGroup(group);
		if (checked) {
			let items = this.getState().groupToItems(group);
			return (
				<div className={'group-multi-select-items'}>
					{items.map(this.mapItemToView)}
				</div>
			)
		}
	}

	onGroupChange(event, groupValue) {
		this.getField().toggleGroup(groupValue);
	}


}

GroupedMultiSelectFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(GroupedMultiSelectFieldView);
