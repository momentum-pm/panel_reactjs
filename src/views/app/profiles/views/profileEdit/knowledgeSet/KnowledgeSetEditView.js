import {connect} from "../../../../../../stores/base/StoreManager";
import Res from "../../../../../../assets/Res";
import React from "react";
import KnowledgeEditView from "./KnowledgeEditView";
import KnowledgeSet from "../../../stores/knowledges/KnowledgeSet";
import Header from "../../../../../base/refactored/header/Header";
import SkillsSearchRemoteStore from "../../../stores/knowledges/SkillsSearchRemoteStore";
import SkillsSuggestionRemoteStore from "../../../stores/knowledges/SkillsSuggestionRemoteStore";
import KnowledgeCreateView from "./KnowledgeCreateView";
import ripple_loading from "../../../../../../assets/images/ripple_loading.svg";
import Box from "../../../../../base/refactored/box/Box";
import ListRemoteStoreView from "../../../../../base/ListRemoteStoreView";

class KnowledgeSetEditView extends ListRemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return KnowledgeSet.map(profileId, {profileId});
	}

	static mapPropsToStores(props) {
		let profileId = props.profileId;
		return {
			...super.mapPropsToStores(props),
			search: SkillsSearchRemoteStore.map(profileId, {profileId}),
			suggestion: SkillsSuggestionRemoteStore.map(profileId, {profileId}),
		}
	}


	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	getSearchState() {
		return this.getSearch().state;
	}

	getSearch() {
		return this.props.search;
	}

	getSuggestion() {
		return this.props.suggestion;
	}


	render() {
		return (
			<Box>
				{this.getHeaderView()}
				<div className={'knowledge-set-create-search-view'}>
					<div className={'knowledge-set-create-search-container'}>
						<input name={'query'}
							   value={this.getSearchState().query}
							   className={'knowledge-set-create-search-input'}
							   autoComplete={"off"}
							   maxLength={90}
							   placeholder={Res.string.profiles.knowledge_search_placeholder}
							   onChange={this.onChange}/>
						{this.getFieldLoadingView()}
					</div>
				</div>
				{super.render()}
			</Box>
		);
	}

	getHeaderView() {
		return (
			<Header>{Res.string.profiles.knowledgeSet.knowledge_set_title}</Header>
		);
	}

	getFieldLoadingView() {
		if (this.getSearchState().loading) {
			return (
				<img className={'knowledge-set-create-search-loading'}
					 src={ripple_loading}
					 alt={Res.string.loading}/>
			);
		}
	}

	getOkView() {
		return this.getListView();
	}

	getListView() {
		let data = this.getData();
		return (
			<ol className={`row no-style padding-one`}>
				{this.getSearchState().query ?
					this.getSearch().getToShow().map(this.mapCreateItemToView)
					:
					this.getSuggestion().getToShow().map(this.mapCreateItemToView)
				}
				{data.map(this.mapItemToView)}
			</ol>
		);
	}


	mapItemToView(item, index) {
		return <KnowledgeEditView knowledge={item} key={item.id}/>
	}


	onChange(event) {
		let value = event.target.value;
		this.getSearch().setQuery(value);
	}


	mapCreateItemToView(item, index) {
		return <KnowledgeCreateView store={item} key={item.skill}/>
	}
}

export default connect(KnowledgeSetEditView);
