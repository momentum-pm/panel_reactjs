import React from "react";
import EmptyView from "./emptyListView/EmptyView";
import RemoteStoreView from "./RemoteStoreView";
import Row from "./Row";
import MasterScrollableColumn from "./refactored/scrollable/MasterScrollableColumn";
import Scrollable from "./refactored/scrollable/Scrollable";
import SlaveColumn from "./SlaveColumn";
import {LOADING_STATE} from "../../stores/base/RemoteStore";
import LoadingView from "./refactored/loadingView/LoadingView";
import LinkGroupView from "../../stores/base/form/buttons/LinkGroupView";

export default class ListRemoteStorePage extends RemoteStoreView {

	constructor(props) {
		super(props);
		this.getEmptyView = this.getEmptyView.bind(this);
		this.mapItemToView = this.mapItemToView.bind(this);
	}

	getLoadedView() {
		return (
			<div className={'container full-height'}>
				<Row className={'full-height'}>
					{this.getFilterFormView()}
					<MasterScrollableColumn className={'full-height'}>
						<Scrollable className={'padding-one'}>
							{this.getHeaderView()}
							{this.getBodyView()}
						</Scrollable>
					</MasterScrollableColumn>
				</Row>
			</div>
		);
	}

	getFilterFormView() {
		let filterForm = this.getFilterForm();
		if (filterForm) {
			return (
				<SlaveColumn className={'full-height'}>
					{this.getFilterForm()}
				</SlaveColumn>);
		}

	}

	getFilterForm() {

	}

	getHeaderView() {

	}

	getBodyView() {
		if (this.getData().length > 0) {
			return <div className={'with-responsive-pinned-bottom'}>
				{this.getPagesView(true)}
				{this.getListView()}
				{this.getPagesView(false)}
				{this.getLoadingState() === LOADING_STATE.UPDATING ? this.getMaskView() : null}
			</div>
		} else {
			return this.getEmptyView();
		}
	}

	getMaskView() {
		return <LoadingView className={'mask'}/>;
	}

	getListView() {
		return (
			<ol className={''}>
				{this.getData().map(this.mapItemToView)}
			</ol>
		);
	}

	getEmptyView() {
		return (
			<EmptyView/>
		);
	}

	getPagesView(top) {
		return (
			<div className={`${top ? ' desktop-only' : ''}`}>
				<LinkGroupView id={this.getState().linkGroup.id}/>
			</div>
		);
	}


	mapItemToView(item, index) {
		throw Error(`You should override mapItemToView in ${this.constructor.name} class`);
	}
}
