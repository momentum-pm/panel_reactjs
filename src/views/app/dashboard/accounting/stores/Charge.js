import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import Status from "../../../../../utils/requests/Status";
import Analytics from "../../../../../utils/Analytics";
import App from "../../../../../stores/app/App";

export default class Charge extends RemoteStore {
  static storeName = "Charge";

  getUrl() {
    return `accounting/profiles/${App.getId()}/charges/${this.state.chargeId}/`;
  }

  success(data, status) {
    super.success(data, status);
    if (Status.isOk(status)) {
      Analytics.logEvent(
        "accounting",
        "charge_callback",
        data.final_amount / 1000
      );
    }
    if (this.state.data.invoice) {
      this.state.redirectButton = Button.create_link({
        name: "redirect",
        title: Res.string.dashboard.accounting.charge_redirect_button,
        className: "center large raised success",
        link: this.state.data.invoice.redirect_url,
      });
    } else {
      this.state.redirectButton = undefined;
    }
    this.save();
  }
}
