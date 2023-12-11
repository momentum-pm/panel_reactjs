import PropTypes from "prop-types";
import FieldView from "../FieldView";
import React from "react";
import "./TagSearcherFieldView.scss";
import ripple_loading from "../../../../../assets/images/ripple_loading.svg";
import Res from "../../../../../assets/Res";
import {connect} from "../../../../../stores/base/StoreManager";
import TagSearcherField from "../../../../../stores/base/form/fields/TagSearcherField";
import SelectedItemView from "./SelectedItemView";
import ToSelectItemView from "./ToSelectItemView";
import Row from "../../../Row";

class TagSearcherFieldView extends FieldView {
	static getField(props) {
		return TagSearcherField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.loadingView = this.loadingView.bind(this);
		this.itemsView = this.itemsView.bind(this);
		this.selectedItemToView = this.selectedItemToView.bind(this);
		this.choiceItemToView = this.choiceItemToView.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	getInputView() {
		let state = this.getState();
		return (
			<div className={'tag-searcher-field-view'}>
				<input name={state.name}
					   value={state.query}
					   className={'tag-searcher-field-view-input'}
					   autoComplete={'off'}
					   type={'text'}
					   placeholder={state.placeholder}
					   onChange={this.onChange}/>
				{this.loadingView()}
				{this.itemsView()}
			</div>
		);
	}


	onChange(event) {
		let value = event.target.value;
		this.getField().setQuery(value);
		event.preventDefault();
	}


	loadingView() {
		let state = this.getState();
		if (state.loading) {
			return <img className={'tag-searcher-field-view-loading'}
						src={ripple_loading}
						alt={Res.string.loading}/>
		}else {
			return <div className={'tag-searcher-field-view-loading'}>
				{Res.icon.search}
			</div> ;
		}
	}

	itemsView() {
		let state = this.getState();
		let selectedItems = state.valueItems;
		let choiceItems;
		if ((state.items !== undefined) && (state.items.length > 0)) {
			choiceItems = state.items;
		} else {
			choiceItems = state.suggestionItems;
		}
		choiceItems = choiceItems.filter((choiceItem) => {
			let choiceItemValue = this.getState().itemToValue(choiceItem);
			let choiceIsSelected = false;
			selectedItems.forEach((selected_item) => {
				let selectedItemValue = this.getState().itemToValue(selected_item);
				if (selectedItemValue === choiceItemValue) {
					choiceIsSelected = true;
				}
			});
			return !choiceIsSelected;
		});
		return <Row className={'padding-one'}>
			{selectedItems.map(this.selectedItemToView)}
			{choiceItems.map(this.choiceItemToView)}
		</Row>
	}


	selectedItemToView(item) {
		let title = this.getState().itemToTitle(item);
		let value = this.getState().itemToValue(item);
		let onClick = () => this.getField().deselect(item);
		return <SelectedItemView key={value} tag={title} onClick={onClick}/>

	}

	choiceItemToView(item) {
		let title = this.getState().itemToTitle(item);
		let value = this.getState().itemToValue(item);
		let onClick = () => this.getField().select(item);
		return <ToSelectItemView key={value} tag={title} onClick={onClick}/>
	}


}


TagSearcherFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(TagSearcherFieldView);
