import RemoteStore from "../../../../../stores/base/RemoteStore";
import Status from "../../../../../utils/requests/Status";
import Conversations from "./Threads";
import App from "../../../../../stores/app/App";

export default class InitialConversation extends RemoteStore {
  static storeName = "InitialConversation";

  getUrl() {
    return `messenger/members/${App.getMemberId()}/conversations/initial/`;
  }

  getParams() {
    return { username: this.state.username };
  }

  success(data, status) {
    Conversations.get().conversationCreated(data);
    this.redirect(
      `/dashboard/messenger/conversations/${data.id}/`,
      Status.FOUND_302
    );
  }

  failure(data, status) {
    if (status === Status.NOT_ACCEPTABLE_406) {
      this.redirect(`/dashboard/messenger/`, Status.FOUND_302);
    } else {
      super.failure(data, status);
    }
  }

  getMethod() {
    return "post";
  }
}
