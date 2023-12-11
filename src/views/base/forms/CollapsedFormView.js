import React from "react";
import FormBox from "./FormBox";
import Row from "../Row";
import MasterColumn from "../MasterColumn";
import ButtonView from "./button/ButtonView";

export default class CollapsedFormView extends FormBox {

	getTitleView() {
		let state = this.getState();
		return <div className={'padding-one-before-after'}>
			<Row className={`centered padding-one-sides`}>
				<MasterColumn className={'padding-one-sides'}>
					<h3>{state.title}</h3>
				</MasterColumn>
				<ButtonView id={this.getState().toggleButton.id}/>
			</Row>
			{this.getState().isOpen ? null : <div className={'padding-two-sides'}>{this.getClosedView()}</div>}
		</div>;
	}

	getClosedView() {

	}

	getHeaderClass() {
		return `${super.getHeaderClass()} background border-bottom`
	}

	getButtonsClass() {
		return `${super.getButtonsClass()} background border-top`
	}

	getFieldsClassName() {
		return 'padding-one-sides padding-two-after';
	}

	getFieldsView() {
		if (this.getState().isOpen) {
			return super.getFieldsView();
		}
	}

	getButtonsView() {
		if (this.getState().isOpen) {
			return super.getButtonsView();
		}
	}
}
