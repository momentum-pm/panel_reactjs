import Button from "../../../../stores/base/form/buttons/Button";
import Res from "../../../../assets/Res";
import Requester from "../../../../utils/requests/Requester";
import MessageQueue from "../../../../stores/base/MessageQueue";
import Status from "../../../../utils/requests/Status";
import History from "../../../../History";
import PaginatedRemoteStore from "../../../../stores/base/PaginatedRemoteStore";

export default class AuthorPosts extends PaginatedRemoteStore {
  static storeName = "AuthorPosts";

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      createButton: Button.create_button({
        name: "createButton",
        icon: Res.icon.add,
        onClick: () => this.createPost(),
        title: Res.string.blog.create_post_button,
        className: "raised primary",
      }),
    };
  }

  getUrl() {
    return `blog/authors/${this.state.authorId}/posts/`;
  }

  success(data, status) {
    data.results = data.results.map((item) => {
      return {
        ...item,
        viewButton: Button.create_link({
          name: "viewButton",
          title: Res.string.blog.view_post_button,
          link: `/blog/authors/${this.state.authorId}/posts/${item.id}/`,
          icon: Res.icon.eye,
          className: "flat primary",
        }),
        viewClientButton: Button.create_link({
          name: "viewButton",
          title: "از دید کاربر",
          link: `/blog/posts/${item.slug}/`,
          icon: Res.icon.eye,
          className: "flat primary",
        }),
        editButton: Button.create_link({
          name: "editButton",
          title: Res.string.blog.edit_post_button,
          link: `/blog/authors/${this.state.authorId}/posts/${item.id}/edit/`,
          icon: Res.icon.edit,
          className: "raised primary",
        }),
      };
    });
    super.success(data, status);
  }

  createPost() {
    this.state.createButton.set_loading(true);
    Requester.request("post", this.getUrl(), {}, (response) =>
      this.createPostCallback(response)
    );
  }

  createPostCallback(response) {
    this.state.createButton.set_loading(false);
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      History.push_url(
        `/blog/authors/${this.state.authorId}/posts/${response.data.id}/edit/`
      );
    }
  }
}
