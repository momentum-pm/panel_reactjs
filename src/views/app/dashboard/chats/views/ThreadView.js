import React from "react";
import StoreView from "../../../../base/StoreView";
import Thread, { LOADING_TYPE } from "../stores/Thread";
import { connect } from "../../../../../stores/base/StoreManager";
import Threads from "../stores/Threads";
import Res from "../../../../../assets/Res";
import MessageView from "./MessageView";
import { LOADING_STATE } from "../../../../../stores/base/RemoteStore";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";

class ThreadView extends StoreView {
  /**
   * @param {string} props.match.params.thread
   * @returns {*}
   */
  static mapPropsToStores(props) {
    let thread = props.match.params.thread;
    return {
      thread: Thread.map(thread, { thread }),
      threads: Threads.map(),
    };
  }

  constructor(props) {
    super(props);
    this.getHeaderView = this.getHeaderView.bind(this);
    this.getMessagesView = this.getMessagesView.bind(this);
    this.getMessageView = this.getMessageView.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setFile = this.setFile.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.threads.state.loadingState === LOADING_STATE.LOADED) {
      let conversationFromConversations = null;
      this.props.threads.state.data.forEach((thread) => {
        if (
          thread.id.toString() === this.props.match.params.thread.toString()
        ) {
          conversationFromConversations = thread;
        }
      });
      if (conversationFromConversations) {
        if (
          conversationFromConversations.new_messages > 0 &&
          this.props.thread.state.loadingState[LOADING_TYPE.NEWER] !==
            LOADING_STATE.LOADING
        ) {
          this.props.thread.loadNewer();
        }
      }
    }
  }

  render() {
    return (
      <div className={"box conversation"}>
        {this.getHeaderView()}
        {this.getMessagesView()}
        {this.getMessageView()}
      </div>
    );
  }

  getHeaderView() {
    let threadId = this.props.match.params.thread;
    let thread = undefined;
    this.props.threads.state.data.forEach((c) => {
      if (c.id.toString() === threadId) {
        thread = c;
      }
    });
    return (
      <div className={"padding-two"}>
        <p className={"conversation-header-title"}>
          {Res.string.dashboard.messenger.talking_to}
        </p>
        <h3 className={"conversation-header-profile"}>
          {thread ? thread.assistant.name : ""}
        </h3>
      </div>
    );
  }

  getMessagesView() {
    let first_message = this.props.thread.state.messages.length
      ? this.props.thread.state.messages[0]
      : null;
    let response_template = first_message && !first_message.is_response;
    console.log("HEREEEEEEEEEEEEEEEEEEEE------------------------");
    console.log(response_template);
    return (
      <Scrollable className={"conversation-messages"}>
        {response_template ? (
          <MessageView
            key={"template"}
            message={{
              id: "template",
              isNewMessage: true,
              is_response: true,
              content: "...",
            }}
          />
        ) : null}
        {this.props.thread.state.messages.map(this.mapMessageToView)}
      </Scrollable>
    );
  }

  mapMessageToView(message) {
    return <MessageView key={message.id} message={message} />;
  }

  getMessageView() {
    let state = this.props.thread.state;
    let submitButtonClass = "conversation-message-button",
      submitButtonIcon = Res.icon.send;
    if (state.submitActive) {
      submitButtonClass += " conversation-message-button-active";
      submitButtonIcon = Res.icon.sendFilled;
    }
    if (state.submitLoading) {
      submitButtonClass += " conversation-message-button-loading";
      submitButtonIcon = Res.icon.ripple_loading;
    }

    let fileButtonClass = "conversation-message-button";
    if (state.fileActive) {
      fileButtonClass += " conversation-message-button-active";
    }
    return (
      <form className={"conversation-message"}>
        <input
          className="conversation-message-text"
          value={state.message}
          rows={2}
          placeholder={Res.string.dashboard.messenger.message_placeholder}
          onChange={this.setMessage}
        />
        <div className={"conversation-message-buttons"}>
          <div className={fileButtonClass}>
            {Res.icon.attach}
            <input
              className="conversation-message-button-input"
              type="file"
              onChange={this.setFile}
            />
          </div>
          <div className={submitButtonClass} onClick={this.submit}>
            {submitButtonIcon}
            <input
              className="conversation-message-button-input"
              type="submit"
              onClick={this.submit}
            />
          </div>
        </div>
      </form>
    );
  }

  setMessage(event) {
    this.props.thread.setMessage(event.target.value);
    event.preventDefault();
  }

  setFile(event) {
    let file;
    if (event.target.files && event.target.files.length > 0) {
      file = event.target.files[0];
    }
    this.props.thread.setFile(file);
  }

  submit(event) {
    this.props.thread.submit();
    event.preventDefault();
  }
}

export default connect(ThreadView);
