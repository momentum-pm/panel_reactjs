import Store from "../../../../../stores/base/Store";
import { LOADING_STATE } from "../../../../../stores/base/RemoteStore";
import Status from "../../../../../utils/requests/Status";
import Requester from "../../../../../utils/requests/Requester";
import Validators, { ValidationError } from "../../../../../utils/Validators";
import {
  ALL_FORMATS,
  SIZE,
} from "../../../../../stores/base/form/fields/FileField";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import Threads from "./Threads";
import App from "../../../../../stores/app/App";

export const LOADING_TYPE = {
  INITIAL: "initial",
  NEWER: "newer",
  OLDER: "older",
};
export default class Thread extends Store {
  static storeName = "Thread";

  getInitialState(args) {
    return {
      messages: [],
      hasMore: true,
      loadingState: {
        initial: LOADING_STATE.NOT_LOADED,
        newer: LOADING_STATE.NOT_LOADED,
        older: LOADING_STATE.NOT_LOADED,
      },

      file: undefined,
      message: "",
      fileActive: false,
      submitActive: false,
      submitLoading: false,
      ...args,
    };
  }

  static getActions() {
    return ["loadNewer", "setMessage", "setFile", "submit"];
  }

  onCreate() {
    this.loadInitial();
  }

  loadInitial() {
    this.load({}, LOADING_TYPE.INITIAL);
  }

  loadNewer() {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    if (this.state.messages.length > 0) {
      let newest_message = this.state.messages[0];
      this.load(
        { created_at__gt: newest_message.created_at },
        LOADING_TYPE.NEWER
      );
    } else {
      this.load({}, LOADING_TYPE.INITIAL);
    }
  }

  load(params, loading_type) {
    if (this.state.loadingState[loading_type] !== LOADING_STATE.LOADING) {
      this.state.loadingState[loading_type] = LOADING_STATE.LOADING;
      this.save();
      let callback = (response) => {
        if (Status.isOk(response.status)) {
          this.success(response.data, loading_type);
        } else {
          this.failure(response.data, loading_type);
        }
      };
      Requester.request(
        "get",
        `assistants/threads/${this.state.thread}/messages/`,
        params,
        callback
      );
    }
  }

  success(data, loading_type) {
    this.state.loadingState[loading_type] = LOADING_STATE.LOADED;
    if (
      loading_type === LOADING_TYPE.OLDER ||
      loading_type === LOADING_TYPE.INITIAL
    ) {
      if (data.length === 0) {
        this.state.hasMore = false;
      }
    }
    if (loading_type === LOADING_TYPE.NEWER) {
      data = data.map((item) => {
        return {
          ...item,
          isNewMessage: true,
        };
      });
    }
    let new_messages = [...this.state.messages, ...data];
    new_messages.sort(function (a, b) {
      if (a.created_at > b.created_at) return -1;
      if (a.created_at < b.created_at) return 1;
      return 0;
    });
    if (new_messages.length > 0) {
      Threads.get().setLatestMessage(this.state.thread, new_messages[0]);
    }
    this.state.messages = new_messages;
    setTimeout(() => this.setNewMessagesToFalse(), 300);
    this.save();
    this.timer = setTimeout(() => this.loadNewer(), 10000);
  }

  setNewMessagesToFalse() {
    this.state.messages = this.state.messages.map((message) => {
      return { ...message, isNewMessage: false };
    });
    this.save();
  }

  failure(data, loading_type) {
    this.state.loadingState[loading_type] = LOADING_STATE.FAILED;
    this.save();
  }

  setMessage(message) {
    if (!this.state.submitLoading) {
      if (message.length > 1000) {
        message = message.substring(0, 1000);
      }
      this.state.message = message;
      this.state.submitActive =
        this.state.message.length > 0 || this.state.file !== undefined;
      this.state.fileActive = this.state.file !== undefined;
      this.save();
    }
  }

  setFile(file) {
    if (!this.state.submitLoading) {
      if (file !== undefined) {
        try {
          Validators.file_format(ALL_FORMATS)(file);
          Validators.file_max_size(SIZE.MB(50))(file);
        } catch (e) {
          if (e instanceof ValidationError) {
            MessageQueue.show(e.error, "danger");
            file = undefined;
          } else {
            throw e;
          }
        }
      }
      this.state.file = file;
      this.state.submitActive =
        this.state.message.length > 0 || this.state.file !== undefined;
      this.state.fileActive = this.state.file !== undefined;
      this.save();
    }
  }

  submit() {
    if (!this.state.submitLoading && this.state.submitActive) {
      this.state.submitLoading = true;
      this.save();
      let data, contentType;
      if (this.state.file) {
        data = new FormData();
        data.append("file", this.state.file);
        data.append("content", this.state.message);
        contentType = "multipart/form-data";
      } else {
        data = {
          content: this.state.message,
        };
        contentType = "application/json";
      }
      let callback = (response) => {
        if (Status.isOk(response.status)) {
          this.state.file = undefined;
          this.state.message = "";
          this.state.fileActive = false;
          this.state.submitActive = false;
          this.state.submitLoading = false;
          this.save();
          this.loadNewer();
        } else {
          this.state.submitLoading = false;
          this.save();
          MessageQueue.showObject(response.data);
        }
      };
      Requester.request(
        "post",
        `assistants/messages/`,
        {
          ...data,
          thread: this.state.thread,
        },
        callback,
        contentType
      );
    }
  }
}
