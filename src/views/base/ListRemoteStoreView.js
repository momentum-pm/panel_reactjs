import React from "react";
import RemoteStoreView from "./RemoteStoreView";

export default class ListRemoteStoreView extends RemoteStoreView {

	constructor(props) {
		super(props);
		this.getEmptyView = this.getEmptyView.bind(this);
		this.mapItemToView = this.mapItemToView.bind(this);
	}

	getOkView() {
		let data = this.getData();
		if (data.length > 0) {
			return this.getListView()
		} else {
			return this.getEmptyView();
		}
	}

	getListView() {
		let data = this.getData();
		return (
			<ol className={`row no-style ${this.getItemsClass()}`}>
				{data.map(this.mapItemToView)}
			</ol>
		);
	}

	getItemsClass() {
		return '';
	}

	getEmptyView() {
		return null;
	}


	mapItemToView(item, index) {
		throw Error(`You should override mapItemToView in ${this.constructor.name} class`);
	}


}
