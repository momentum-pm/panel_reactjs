import { STORE_TYPE } from "../../base/Store";
import Form from "../../base/form/Form";
import SearchField from "../../base/form/fields/SearchField";

export default class GeneralSerachForm extends Form {
  static storeName = "GeneralSerachForm";
  static type = STORE_TYPE.SINGLETON;
  static getActions() {
    return [...super.getActions(), "getData", "resetForm"];
  }
  createFields(args) {
    return [
      SearchField.create({
        name: "query",
        url: "home/search/",
        placeholder: "جستجو در گرینولی...",
      }),
    ];
  }
  resetForm() {
    this.getField("query").setValue("");
  }
  onFieldChange() {
    this.state.data = this.getField("query").state.data;
    this.save();
  }
  getData() {
    return this.state.data;
  }
  createButtons() {
    return [];
  }
}
