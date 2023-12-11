import React from "react";
import "./ToolbarView.scss";
import { connect } from "../../../../stores/base/StoreManager";
import GeneralSerachForm from "../../../../stores/app/toolbar/GeneralSearchForm";
import FormView from "../../../base/forms/FormView";
import GeneralSearchResultView from "./GeneralSearchResultView";
class GeneralSearchView extends FormView {
  static getForm() {
    return GeneralSerachForm.map();
  }
  render() {
		return <form className="desktop-only" onSubmit={(e)=>{e.preventDefault()}}>
      
			{this.getFieldsView()}
      <GeneralSearchResultView />

		</form>
	}
  getButtonsClass(){
    return "";
  }
  
}

export default connect(GeneralSearchView);
