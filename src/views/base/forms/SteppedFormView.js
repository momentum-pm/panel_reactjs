import Row from "../../base/Row";
import FormView from "../../base/forms/FormView";
import Body from "../../base/Body";
import Res from "../../../assets/Res";
import React from "react";
import MasterColumn from "../../base/MasterColumn";
import HeaderRow from "../../base/refactored/headerRow/HeaderRow";
import History from "../../../History";
import StepFormView from "./StepFormView";
import "./SteppedFormView.scss"
import VLine from "../VLine";

export default class SteppedFormView extends FormView {


	render() {
		if (this.getForm().getTopNode()) {
			return <form>
				{this.getTitleView()}
				<Body>
					{this.getFormView()}
					{this.getButtonsView()}
					<div className={'padding-one-before'}/>
					{this.getHintView()}
				</Body>
			</form>
		} else {
			return null;
		}

	}


	getTitleView() {
		return <HeaderRow className={'padding-one'}>

			{this.getState().titles.map(({title, path}, index) =>
				<div className={'row'}>
					<div
						className={`row centered funnel-form-header ${(index === (this.getState().titles.length - 1)) ? 'funnel-form-header-active' : ''}`}
						onClick={() => {
							History.replace_url(path);
						}}
						key={index}>
						<h3>{title}</h3>
					</div>
					<VLine className={'margin-one'}/>
				</div>)}
		</HeaderRow>
	}

	getFormView() {
		return (
			<div>
				<div
					className={`funnel-page-fields ${this.getState().hiding ? 'funnel-page-fields-passive' : 'funnel-page-fields-active'}`}
					key={this.getForm().getTopNode().path}>
					<StepFormView form={this.getForm().getTopNode().form}/>
				</div>

			</div>
		);
	}

	getButtonsView() {
		return (
			<Row className={'padding-one-before-after'}>
				{this.map_button_to_view(this.getState().buttons[0])}
				<MasterColumn/>
				{this.map_button_to_view(this.getState().buttons[1])}
			</Row>
		)
	}

}
