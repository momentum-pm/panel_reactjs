import RemoteStore, { CACHE_POLICY, LOADING_STATE } from "./RemoteStore";
import History from "../../History";
import LinkGroup from "./form/buttons/LinkGroup";
import { isDigitalString, normalizeNumber } from "../../utils/StringUtils";
import Status from "../../utils/requests/Status";
import Requester from "../../utils/requests/Requester";

export default class PaginatedRemoteStore extends RemoteStore {
  static storeName = "PaginatedRemoteStore";

  static getActions() {
    return [...super.getActions(), "checkLoad"];
  }

  onCreate() {
    if (this.getInitialParams()) {
      this.feedbackToFilterForm(this.state.params);
    }
  }

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      params: this.getInitialParams(args) || { page: 1 },
      data: [],
      pages: 1,
      requestId: 0,
      lastLocation: null,
      linkGroup: LinkGroup.create({
        className: "raised responsive-pinned-bottom",
      }),
      filterForm: this.getFilterForm(args),
    };
  }

  getInitialParams() {
    return null;
  }

  getAllowedParams() {
    return [];
  }

  getFilterForm() {}

  getParams() {
    return this.state.params;
  }

  checkLoad() {
    let location = History.location.pathname + History.location.search;
    if (location !== this.state.lastLocation) {
      this.state.lastLocation = location;
      this.load(CACHE_POLICY.IGNORE);
    }
  }

  load(cache_policy = CACHE_POLICY.IGNORE) {
    this.state.params = this.getSearchValues();
    let shouldRequest, newLoadingState;
    let loadingState = this.state.loadingState;
    switch (loadingState) {
      case LOADING_STATE.NOT_LOADED:
      case LOADING_STATE.FAILED:
        shouldRequest = true;
        newLoadingState = LOADING_STATE.LOADING;
        break;
      case LOADING_STATE.LOADING:
        shouldRequest = true;
        newLoadingState = LOADING_STATE.LOADING;
        break;
      case LOADING_STATE.UPDATING:
        shouldRequest = true;
        switch (cache_policy) {
          case CACHE_POLICY.REUSE:
          case CACHE_POLICY.UPDATE:
            newLoadingState = LOADING_STATE.LOADING;
            break;
          case CACHE_POLICY.IGNORE:
            newLoadingState = LOADING_STATE.LOADING;
            break;
          default:
            return;
        }
        break;
      case LOADING_STATE.LOADED:
        switch (cache_policy) {
          case CACHE_POLICY.REUSE:
            shouldRequest = false;
            newLoadingState = LOADING_STATE.LOADED;
            break;
          case CACHE_POLICY.UPDATE:
            shouldRequest = true;
            newLoadingState = LOADING_STATE.UPDATING;
            break;
          case CACHE_POLICY.IGNORE:
            shouldRequest = true;
            newLoadingState = LOADING_STATE.LOADING;
            break;
          default:
            return;
        }
        break;
      default:
        return;
    }
    this.state.loadingState = newLoadingState;
    if (shouldRequest) {
      this.feedbackToFilterForm(this.state.params);
      this.state.requestId += 1;
      this.save();
      let requestId = this.state.requestId;
      let callback = (response, requestId) => {
        if (this.state.requestId === requestId) {
          if (Status.isOk(response.status)) {
            this.success(response.data, response.status);
          } else if (Status.isRedirect(response.status)) {
            this.redirect(response.location, response.status);
          } else {
            this.failure(response.data, response.status);
          }
        }
      };
      Requester.request(
        this.getMethod(),
        this.getUrl(),
        this.getParams(),
        (response) => callback(response, requestId),
        "application/json",
        this.getLoginRequired()
      );
    } else {
      this.save();
    }
  }

  success(data, status) {
    this.state.pages = data.pages;
    this.state.page = data.page;
    let searchUrl = this.getQueryWithoutPage();
    let pages = [];
    let pageCount = this.state.pages;
    let page = this.state.page;
    if (this.state.pages > 0) {
      pages.push(1);
      for (let i = page - 2; i <= page + 2; i++) {
        if (1 < i && i < pageCount) {
          let top = pages[pages.length - 1];
          if (i !== top + 1) {
            pages.push("...");
          }
          pages.push(i);
        }
      }
      if (1 !== pageCount) {
        let top = pages[pages.length - 1];
        if (pageCount !== top + 1) {
          pages.push("...");
        }
        pages.push(pageCount);
      }
    }
    pages = pages.map((page) => {
      if (page === "...") {
        return {
          url: null,
          title: normalizeNumber(page),
        };
      } else {
        return {
          url: History.location.pathname + "?page=" + page + searchUrl,
          title: normalizeNumber(page),
        };
      }
    });
    this.state.linkGroup.setItems(pages);
    super.success(data.results, status);
  }

  getQueryWithoutPage() {
    let search = "";
    let values = this.state.params;
    this.getAllowedParams().forEach((key) => {
      let value = values[key];
      if (key.endsWith("__in")) {
        if (value && value.length > 0) {
          value.forEach((v) => {
            search += "&" + key + "=" + v;
          });
        }
      } else {
        if (value) {
          search += "&" + key + "=" + value;
        }
      }
    });
    let orderBy = values.order_by;
    if (orderBy) {
      values.order_by = orderBy;
      search += "&order_by=" + orderBy;
    }
    return search;
  }

  feedbackToFilterForm(values) {
    let filterForm = this.getFilterForm(this.state);
    if (filterForm) {
      filterForm.resetValues(values);
    }
  }

  getSearchValues() {
    let searchParams = new URLSearchParams(History.location.search);
    let values = {};
    this.getAllowedParams().forEach((key) => {
      let value, revisedValue;
      if (key.endsWith("__in")) {
        value = searchParams.getAll(key);
        revisedValue = [];
        if (value && value.length > 0) {
          value.forEach((v) => {
            if (isDigitalString(v)) {
              revisedValue.push(parseInt(v));
            } else {
              revisedValue.push(v);
            }
          });
        }
      } else {
        value = searchParams.get(key);
        if (isDigitalString(value)) {
          revisedValue = parseInt(value);
        } else {
          revisedValue = value;
        }
      }
      values[key] = revisedValue;
    });
    let orderBy = searchParams.get("order_by");
    if (orderBy) {
      values.order_by = orderBy;
    }
    let page = searchParams.get("page");
    if (page && isDigitalString(page)) {
      values.page = parseInt(page);
    } else {
      values.page = 1;
    }
    return values;
  }
}
