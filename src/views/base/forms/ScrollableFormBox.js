import FormBox from "./FormBox";
import React from "react";
import Body from "../Body";
import Row from "../Row";

export default class ScrollableFormBox extends FormBox {


	getFormClass() {
		return 'scrollable-column box';
	}

	getFieldsClassName() {
		return 'scrollable';
	}

	getFieldsView() {
		let state = this.getState();
		return <div className={this.getFieldsClassName()}>
			<Body>

				<Row>
					{state.fields.map(this.mapFieldToView)}
				</Row>
			</Body>

		</div>;
	}


	getHeaderClass() {
		return `${super.getHeaderClass()} background border-bottom`
	}

	getButtonsClass() {
		return `${super.getButtonsClass()} background border-top`
	}
}
