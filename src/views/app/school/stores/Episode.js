import RemoteStore, { CACHE_POLICY } from "../../../../stores/base/RemoteStore";
import Button from "../../../../stores/base/form/buttons/Button";
import Res from "../../../../assets/Res";
import App from "../../../../stores/app/App";
import Auth from "../../../auth/stores/Auth";
import Requester from "../../../../utils/requests/Requester";
import Status from "../../../../utils/requests/Status";
import Analytics from "../../../../utils/Analytics";
import History from "../../../../History";
import Course from "./Course";
import { isDigitalString } from "../../../../utils/StringUtils";
import SelectField from "../../../../stores/base/form/fields/SelectField";
export default class Episode extends RemoteStore {
  static storeName = "Episode";

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      purchaseButton: Button.create_button({
        name: "purchase",
        onClick: () => this.purchase(),
        title: Res.string.school.add_to_basket,
        className: "bordered large primary",
        icon: Res.icon.shop,
      }),
    };
  }
  success(data, status) {
    data.exercises.forEach((item) => {});
    data.exercises = data.exercises?.map((item) => {
      return {
        ...item,
      };
    });
    super.success(data, status);

    let courseSlug = this.state.courseSlug;
    Course.get(courseSlug, { courseSlug }).setActive(data, true);
  }

  purchase() {
    if (App.get().state.data.is_authenticated) {
      this.sendRequest();
    } else {
      Auth.open(
        () => this.sendRequest(),
        `/c/${this.state.courseSlug}/e/${this.state.episodeId}/${this.state.episodeSlug}/`,
        true,
        Res.string.school.register_to_continue
      );
    }
  }

  sendRequest() {
    this.state.purchaseButton.set_loading(true);
    let id;
    if (this.state.data) {
      id = this.state.data.id;
    } else {
      id = this.state.error.id;
    }
    Requester.request(
      "post",
      `school/episodes/${id}/purchase/`,
      {},
      (response) => this.requestCallback(response)
    );
  }

  requestCallback(response) {
    this.state.purchaseButton.set_loading(false);
    if (Status.isOk(response.status)) {
      Analytics.logEvent("school", "episode-purchase");
      if (response.data.paid) {
        History.push_url(
          `/c/${this.state.courseSlug}/e/${this.state.episodeId}/${this.state.episodeSlug}/`
        );
      } else {
        let invoiceId = response.data.invoice_id;
        History.push_url(`/dashboard/accounting/invoices/${invoiceId}`);
      }
    }
    App.get().load(CACHE_POLICY.UPDATE);
    this.load(CACHE_POLICY.UPDATE);
    Course.get(this.state.courseSlug, {
      courseSlug: this.state.courseSlug,
    }).load(CACHE_POLICY.IGNORE);
  }

  getUrl() {
    return `school/episodes/${this.state.episodeId}/`;
  }
}
