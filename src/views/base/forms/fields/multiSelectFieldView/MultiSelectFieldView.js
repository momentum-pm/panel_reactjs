import React from 'react';
import PropTypes from "prop-types";
import Res from "../../../../../assets/Res";
import {connect} from "../../../../../stores/base/StoreManager";
import MultiSelectField from "../../../../../stores/base/form/fields/MultiSelectField";
import {BulletFieldView} from "../bulletFieldView/BulletFieldView";

export class MultiSelectFieldView extends BulletFieldView {
	static getField(props) {
		return MultiSelectField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.onSelectAllChange = this.onSelectAllChange.bind(this);
	}

	mapItemToView(item) {
		let state = this.getState();
		let disabled = false;
		if (this.getState().maxCount) {
			if ((this.getField().isCheckedItem(item) === false) && state.value.length === this.getState().maxCount) {
				disabled = true;
			}
		}
		return this.renderItem(
			this.getTitle(item),
			this.getField().isCheckedItem(item),
			this.getValue(item),
			disabled
		);
	}

	getSelectAllView() {
		return this.renderItem(
			this.getState().placeholder,
			this.getField().selectAllChecked(),
			'select-all',
			false,
		)
	}

	renderItem(title, checked, value, disabled) {
		return (
			<div
				className={`checkbox-field-item row centered ${this.getState().itemClassName} ${disabled ? 'disabled' : ''}`}
				key={value}>
				<input className={'checkbox-field-item-input'} disabled={disabled} type="checkbox" checked={checked}
					   value={value}
					   onChange={(event) => this.onChange(event, value)}/>

				<div className='checkbox-field-item-check-container'>
					<div className='checkbox-field-item-check'>
						{Res.icon.check}
					</div>
				</div>
				<p className={'small'}>{title}</p>
			</div>
		);
	}


	getItemsView() {
		let state = this.getState();
		return (
			<div className={`bullet-field-items ${this.getState().itemsClassName}`}>
				{state.hasSelectAll ? this.getSelectAllView() : null}
				{state.items.map(this.mapItemToView)}
			</div>
		);
	}

	getValue(item) {
		return item ? this.getState().itemToValue(item) : 0;
	}

	getTitle(item) {
		return item ? this.getState().itemToTitle(item) : this.getState().placeholder;
	}

	onChange(event, itemValue) {
		if (itemValue === 'select-all') {
			this.onSelectAllChange();
		} else {
			this.getField().toggleItem(itemValue);
		}
	}

	onSelectAllChange() {
		this.getField().selectAllToggle();
	}

}

MultiSelectFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(MultiSelectFieldView);
