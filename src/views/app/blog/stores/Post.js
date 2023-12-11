import RemoteStore from "../../../../stores/base/RemoteStore";
import Status from "../../../../utils/requests/Status";
import MetaTags from "../../../../stores/base/MetaTags";

export default class Post extends RemoteStore {
  static storeName = "Post";

  getUrl() {
    return `blog/posts/${this.state.slug}/`;
  }

  success(data, status) {
    if (data.redirect) {
      this.redirect(`/blog/posts/${data.slug}/`, Status.FOUND_302);
    }
    MetaTags.get().setTitle(data.meta_title);
    MetaTags.get().setImage(data.meta_image);
    MetaTags.get().setDescription(data.meta_description);
    super.success(data, status);
  }
}
