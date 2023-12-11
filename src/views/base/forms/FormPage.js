import FormView from "./FormView";
import React from "react";
import Body from "../Body";
import Page from "../Page";
import ScrollableColumn from "../refactored/scrollable/ScrollableColumn";
import Scrollable from "../refactored/scrollable/Scrollable";
import Row from "../Row";

export default class FormPage extends FormView {
	getFormClass() {
		return 'box';
	}

	render() {
		return <Page>
			<ScrollableColumn>
				<Scrollable className={'padding-one'}>
					<Row>
						<form className={this.getFormClass()}>
							{this.getTitleView()}
							<Body>
								{this.getHintView()}
								{this.getFieldsView()}
								{this.getButtonsView()}
							</Body>
						</form>
					</Row>
				</Scrollable>
			</ScrollableColumn>
		</Page>
	}
}
