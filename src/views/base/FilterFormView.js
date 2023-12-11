import React from "react";
import FormView from "./forms/FormView";
import Row from "./Row";
import MasterColumn from "./MasterColumn";
import ButtonView from "./forms/button/ButtonView";

export default class FilterFormView extends FormView {
	getFormClass() {
		return `compact-form white-background box full-height scrollable-column filter-form ${this.getState().isOpen ? 'filter-form-open' : 'filter-form-closed'}`;
	}

	render() {
		return <form className={this.getFormClass()}>
			{this.getTitleView()}
			<div className={`filter-form-body  scrollable padding-one `}>
				{this.getHintView()}
				{this.getFieldsView()}
			</div>
		</form>
	}


	getHeaderClass() {
		return 'centered filter-form-header'
	}

	getFieldsClassName() {
		return 'row';
	}

	getButtonsClass() {
		return 'reverse row';
	}

	getTitleView() {
		let state = this.getState();
		if (state.title) {
			return <Row className={this.getHeaderClass()}>
				<MasterColumn className={'desktop-only'}>
					<p className={'bold margin-two'}>{state.title}</p>
				</MasterColumn>
				<ButtonView id={this.getState().cascadeButton.id}/>
			</Row>;
		}
	}
}
