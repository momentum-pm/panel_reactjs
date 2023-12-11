import React from "react";
import StoreView from "./StoreView";
import Row from "./Row";
import MasterColumn from "./MasterColumn";
import ButtonView from "./forms/button/ButtonView";

export default class CollapsedView extends StoreView {
	static mapPropsToStores(props) {
		return {collapsedStore: this.getCollapsedStore(props)};
	}

	static getCollapsedStore(props) {

	}

	render() {
		return <div className={this.getRootClass()}>
			{this.getTitleView()}
			{this.getBodyView()}
		</div>
	}


	getTitleView() {
		let state = this.getState();
		return <div className={this.getTitleClass()}>
			<Row className={`centered padding-one-sides`}>
				<MasterColumn className={'padding-one-sides'}>
					<h3>{state.title}</h3>
				</MasterColumn>
				<ButtonView id={this.getState().toggleButton.id}/>
			</Row>
		</div>;
	}


	getBodyView() {
		return <div className={this.getBodyClass()}>
			{this.getState().isOpen ? this.getOpenView() : this.getClosedView()}
		</div>

	}


	getOpenView() {

	}

	getClosedView() {

	}


	getRootClass() {
		return 'box';
	}

	getTitleClass() {
		return 'padding-one-before-after';
	}

	getBodyClass() {
		return 'body';
	}
}
