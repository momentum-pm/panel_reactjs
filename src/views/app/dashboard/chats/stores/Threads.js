import { STORE_TYPE } from "../../../../../stores/base/Store";
import App from "../../../../../stores/app/App";
import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";

export default class Threads extends RemoteStore {
  static storeName = "Threads";
  static type = STORE_TYPE.SINGLETON;
  getInitialState(args) {
    console.log("HERE-0----------------------------------------");
    console.log(App.person());
    return {
      ...super.getInitialState(args),
      createButton: Button.create_medium_modal_link({
        link: `/threads/create/${App.person().member}`,
        title: "Start New Chat",
        icon: Res.icon.add,
        className: "raised full primary",
      }),
    };
  }
  onCreate() {}

  getUrl() {
    return `assistants/threads/`;
  }
  getParams() {
    return { person: App.person().id };
  }

  conversationCreated(data) {
    let exists = false;
    if (this.state.data !== undefined) {
      this.state.data.forEach((conversation) => {
        if (conversation.id === data.id) {
          exists = true;
        }
      });
      if (!exists) {
        this.state.data = [data, ...this.state.data];
        this.save();
      }
    } else {
      this.state.data = [data];
      this.save();
    }
  }

  setLatestMessage(threadId, latest_message) {
    this.state.data = this.state.data.map((c) => {
      if (c.id.toString() === threadId.toString()) {
        c.first_message = latest_message;
        c.new_messages = 0;
      }
      return c;
    });
    this.save();
  }
}
