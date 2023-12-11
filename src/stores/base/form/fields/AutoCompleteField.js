import { FIELD_TYPE } from "./Field";
import Requester from "../../../../utils/requests/Requester";
import Status from "../../../../utils/requests/Status";
import CharField from "./CharField";

export default class AutoCompleteField extends CharField {
  static storeName = FIELD_TYPE.AUTO_COMPLETE;

  /**
   * @param {string} args.name - The name of the field
   * @param {string} args.url - the query url
   * @param {function} args.itemToTitle - Maps item to title
   * @param {function} args.itemToValue - Maps item to value
   * @param {string} [args.label = undefined] - The label of the field
   * @param {boolean} [args.required = true] - If the field is required, default is true
   * @param {string} [args.hint = undefined] - Hint for the field
   * @param {string} [args.className = undefined] - The root class of field_view
   * @param {function[]} [args.validators = [] ] - The array of field validators
   * @param {string} [args.auto_complete = "on"] - If the field is required, default is true
   * @param {string} [args.input_type = INPUT_TYPES.TEXT] - The input type of the field
   * @param {string} args.placeholder - The placeholder of the field
   * @returns {Store} the created store
   */
  static create(args) {
    return super.create({
      ...args,
      auto_complete: false,
      loading: false,
      selected: false,
      items: undefined,
      item: undefined,
    });
  }

  static getActions() {
    return [...super.getActions(), "selectValue"];
  }

  timer = undefined;

  resetValue(value) {
    this.state.item = value;
    if (value) {
      this.state.selected = true;
      super.resetValue(this.state.itemToValue(value));
    } else {
      this.state.selected = false;
      super.resetValue(value);
    }
  }

  setValue(value) {
    let item = undefined;
    if (this.state.items) {
      this.state.items.forEach((i) => {
        if (this.state.itemToValue(i) === value) {
          item = i;
        }
      });
    }
    this.state.loading = false;
    this.state.selected = false;
    this.state.items = undefined;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = undefined;
    if (value.length >= 3) {
      this.state.loading = true;
      this.timer = setTimeout(() => this.search(value), 700);
    }
    this.state.item = item;
    super.setValue(value);
  }

  selectValue(item, value) {
    this.state.item = item;
    this.state.selected = true;
    super.setValue(value);
  }

  search(value) {
    let callback = (response) => {
      if (Status.isOk(response.status)) {
        this.searchCallback(value, response.data);
      } else {
        this.searchCallback(value, []);
      }
    };
    Requester.request("get", this.state.url, { query: value }, callback);
  }

  searchCallback(value, items) {
    if (value === this.state.value) {
      this.state.loading = false;
      this.state.items = items;
      this.save();
      if (items.length === 1 && this.state.itemToValue(items[0]) === value) {
        this.selectValue(items[0], value);
      }
    }
  }
}
