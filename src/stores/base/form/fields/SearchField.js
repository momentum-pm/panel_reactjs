import Field, { FIELD_TYPE } from "./Field";
import Requester from "../../../../utils/requests/Requester";
export const SEARCH_STATE = {
  IDLE: 0,
  SEARCHING: 1,
  DONE: 2,
};

export default class SearchField extends Field {
  static storeName = FIELD_TYPE.SEARCH;

  getInitialState(args) {
    return {
      searchState: SEARCH_STATE.IDLE,
      currentQuery: "",
      minimumSearchLength: 3,
      waitForQueryTime: 500,
      ...args,
      required: false,
    };
  }

  setValue(query) {
    super.setValue(query);

    if (this.waitForQueryTimeout) {
      clearTimeout(this.waitForQueryTimeout);
      this.waitForQueryTimeout = null;
    }

    if (this.state.value?.length >= this.state.minimumSearchLength) {
      this.state.searchState = SEARCH_STATE.SEARCHING;
      this.waitForQueryTimeout = setTimeout(
        () => this.onWaitForQueryComplete(),
        this.state.waitForQueryTime
      );
    } else {
      this.state.searchState = SEARCH_STATE.IDLE;
      this.state.data = null;
      this.state.status = null;
    }
    this.save();
  }
  onWaitForQueryComplete() {
    this.state.searchState = SEARCH_STATE.SEARCHING;
    this.save();
    let query = this.state.value;
    Requester.request("get", this.state.url, { query }, (response) =>
      this.searchCallback(query, response)
    );
  }
  searchCallback(query, response) {
    if (this.state.value === query) {
      this.state.data = response.data;
      this.state.status = response.status;
      this.state.searchState = SEARCH_STATE.DONE;
      this.save();
    }
  }
}
