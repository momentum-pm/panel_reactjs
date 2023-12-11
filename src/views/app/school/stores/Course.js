import RemoteStore, { CACHE_POLICY } from "../../../../stores/base/RemoteStore";
import Button from "../../../../stores/base/form/buttons/Button";
import Res from "../../../../assets/Res";
import Requester from "../../../../utils/requests/Requester";
import App from "../../../../stores/app/App";
import Auth from "../../../auth/stores/Auth";
import Status from "../../../../utils/requests/Status";
import Analytics from "../../../../utils/Analytics";
import History from "../../../../History";
import Episode from "./Episode";
import MetaTags from "../../../../stores/base/MetaTags";
export default class Course extends RemoteStore {
  static storeName = "Course";

  static getActions() {
    return [...super.getActions(), "getFirst", "setOpenIndex"];
  }

  getFirst() {
    let firstEpisode = null;
    this.state.data.sections.forEach((section) => {
      section.episodes.forEach((episode) => {
        if (firstEpisode === null) {
          firstEpisode = episode;
        }
      });
    });
    return firstEpisode;
  }

  setActive(data) {
    if (data !== this.state.active) {
      this.state.active = data;
      this.state.data.last_watched = data;
      this.save();
    }
  }

  getUrl() {
    return `school/courses/${this.state.courseSlug}/`;
  }

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      purchaseButton: Button.create_button({
        name: "purchase",
        onClick: () => this.purchase(),
        title: Res.string.school.add_to_basket,
        className: "raised success ",
        icon: Res.icon.shop,
      }),
      salesButton: Button.create_button({
        name: "sales",
        onClick: () => this.purchase(),
        title: "ثبت نام در این دوره",
        className: "raised main-flex large success",
        icon: Res.icon.profile,
      }),
    };
  }
  setOpenIndex(index) {
    this.state.openIndex = index;
    this.save();
  }

  purchase() {
    if (App.get().state.data.is_authenticated) {
      this.sendRequest();
    } else {
      Auth.open(
        () => this.sendRequest(),
        `/c/${this.state.data.slug}/`,
        true,
        Res.string.school.register_to_continue
      );
    }
  }

  purchasePackage(p) {
    if (App.get().state.data.is_authenticated) {
      this.sendPackageRequest(p);
    } else {
      Auth.open(
        () => this.sendPackageRequest(p),
        `/c/${this.state.data.slug}/`,
        true,
        Res.string.school.register_to_continue
      );
    }
  }

  success(data, status) {
    super.success(data, status);

    data.packages = data.packages?.map((p) => ({
      ...p,
      onClick: () => this.purchasePackage(p),
    }));
    data.sections = data.sections.map((section) => {
      section.containsFree = this.containsFree(section);
      section.subsection = section.subsections?.map((subsection) => {
        subsection.containsFree = this.containsFree(subsection);
        return subsection;
      });
      return section;
    });
    this.state.showButton = data.can_purchase;

    this.save();

    MetaTags.get().setTitle(data.title);
    MetaTags.get().setImage(data.cover);
    MetaTags.get().setDescription(data.about);
  }
  containsFree(section) {
    if (section.episodes?.some((episode) => episode.public)) {
      return true;
    } else {
      if (
        section.subsections?.some((subsection) => this.containsFree(subsection))
      ) {
        return true;
      }
    }
    return false;
  }
  sendPackageRequest(p) {
    this.state.data.packages = this.state.data.packages?.map((p2) =>
      p2.id === p.id
        ? {
            ...p2,
            loading: true,
          }
        : p2
    );
    this.save();
    Requester.request(
      "post",
      `school/packages/${p.id}/purchase/`,
      {},
      (response) => this.requestPackageCallback(response, p)
    );
  }
  sendRequest() {
    this.state.purchaseButton.set_loading(true);
    Requester.request(
      "post",
      `school/courses/${this.state.data.id}/purchase/`,
      {},
      (response) => this.requestCallback(response)
    );
  }

  requestCallback(response) {
    this.state.purchaseButton.set_loading(false);
    if (Status.isOk(response.status)) {
      Analytics.logEvent("school", "course-purchase");
      if (response.data.paid) {
        History.push_url(`/c/${this.state.data.slug}/`);
      } else {
        let invoiceId = response.data.invoice_id;
        History.push_url(`/dashboard/accounting/invoices/${invoiceId}`);
      }
    }
    App.get().load(CACHE_POLICY.UPDATE);
    this.load(CACHE_POLICY.UPDATE);
    this.state.data.sections.forEach((section) => {
      section.episodes.forEach((episode) => {
        if (Episode.exists(episode.slug)) {
          Episode.get(episode.slug, {
            courseSlug: this.state.courseSlug,
            episodeSlug: episode.slug,
            episodeId: episode.id,
          }).load(CACHE_POLICY.IGNORE);
        }
      });
    });
  }
  requestPackageCallback(response, p) {
    this.state.data.packages = this.state.data.packages?.map((p2) =>
      p2.id === p.id
        ? {
            ...p2,
            loading: false,
          }
        : p2
    );
    this.save();
    if (Status.isOk(response.status)) {
      Analytics.logEvent("school", "package-purchase");
      if (response.data.paid) {
        History.push_url(`/c/${this.state.data.slug}/`);
      } else {
        let invoiceId = response.data.invoice_id;
        History.push_url(`/dashboard/accounting/invoices/${invoiceId}`);
      }
    }
    App.get().load(CACHE_POLICY.UPDATE);
    this.load(CACHE_POLICY.UPDATE);
    this.state.data.sections.forEach((section) => {
      section.episodes.forEach((episode) => {
        if (Episode.exists(episode.slug)) {
          Episode.get(episode.slug, {
            courseSlug: this.state.courseSlug,
            episodeSlug: episode.slug,
            episodeId: episode.id,
          }).load(CACHE_POLICY.IGNORE);
        }
      });
    });
  }
}
