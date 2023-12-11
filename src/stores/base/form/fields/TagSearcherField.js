import Field, { FIELD_TYPE } from "./Field";
import Requester from "../../../../utils/requests/Requester";
import Status from "../../../../utils/requests/Status";
import { LOADING_STATE } from "../../RemoteStore";

export default class TagSearcherField extends Field {
  static storeName = FIELD_TYPE.TAG_SEARCHER;
  timer = undefined;

  /**
   * @param {string} args.name - The name of the field
   * @param {string} args.url - the query url
   * @param {function} args.itemToTitle - Maps item to title
   * @param {function} args.itemToValue - Maps item to value
   * @param {function} args.suggestionToDefaultSelected - Maps suggestion to defaultSelected
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
      items: undefined,
      suggestionLoading: LOADING_STATE.LOADED,
      suggestionItems: [],
      query: "",
      valueItems: [],
    });
  }

  static getActions() {
    return [
      ...super.getActions(),
      "reloadSuggestions",
      "setQuery",
      "select",
      "deselect",
    ];
  }

  onCreate() {
    super.onCreate();
    if (this.state.suggestionUrl) {
      this.reloadSuggestions(this.state.suggestionUrl);
    }
  }

  reloadSuggestions(suggestionUrl) {
    this.state.suggestionUrl = suggestionUrl;
    if (this.state.suggestionUrl) {
      this.state.suggestionLoading = true;
      this.state.suggestionItems = [];
      this.save();
      Requester.request("get", this.state.suggestionUrl, {}, (response) =>
        this.suggestionCallback(response)
      );
    }
  }

  suggestionCallback(response) {
    if (Status.isOk(response.status)) {
      this.state.suggestionItems = [...response.data];
    } else {
      this.state.suggestionItems = [];
    }
    this.state.suggestionLoading = false;
    this.save();
    this.state.suggestionItems.forEach((item) => {
      if (this.state.suggestionToDefaultSelected(item)) {
        this.select(item);
      }
    });
  }

  setQuery(query) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = undefined;
    this.state.query = query;
    if (query.length >= this.state.minLength ? this.state.minLength : 3) {
      this.state.loading = true;
      this.timer = setTimeout(() => this.search(query), 700);
    } else {
      this.state.loading = false;
      this.state.items = undefined;
    }
    this.save();
  }

  search(query) {
    let callback = (response) => {
      if (Status.isOk(response.status)) {
        this.search_result(query, response.data);
      } else {
        this.search_result(query, []);
      }
    };
    Requester.request("get", this.state.url, { query }, callback);
  }

  search_result(query, items) {
    if (query === this.state.query) {
      this.state.loading = false;
      this.state.items = items;
      this.save();
    }
  }

  select(item) {
    let isSelected = false;
    this.state.valueItems.forEach((selectedItem) => {
      if (
        this.state.itemToValue(selectedItem) === this.state.itemToValue(item)
      ) {
        isSelected = true;
      }
    });
    if (!isSelected) {
      let newValue = [...this.state.value, this.state.itemToValue(item)];
      this.state.valueItems = [...this.state.valueItems, item];
      this.setValue(newValue);
    }
  }

  resetValue(value) {
    if (value === undefined) {
      value = [];
    } else {
      value = [...value];
    }
    if (value) {
      if (Array.isArray(value)) {
        let valueArray = [];
        value.forEach((item) => {
          valueArray.push(this.state.itemToValue(item));
        });
        this.state.valueItems = value;
        super.resetValue(valueArray);
      }
    } else {
      super.resetValue(value);
    }
  }
  getSelectedItems() {
    return this.state.valueItems;
  }

  deselect(item) {
    let newValue = [...this.state.value];
    let newValueItems = [...this.state.valueItems];
    newValueItems = newValueItems.filter(
      (other_item) =>
        this.state.itemToValue(other_item) !== this.state.itemToValue(item)
    );
    this.state.valueItems = newValueItems;
    newValue = newValue.filter(
      (other_item) => other_item !== this.state.itemToValue(item)
    );
    this.setValue(newValue);
  }
}
