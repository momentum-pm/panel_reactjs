import RemoteStore from "../../../../../stores/base/RemoteStore";
import BooleanField from "../../../../../stores/base/form/fields/BooleanField";
import Res from "../../../../../assets/Res";
import Wallet from "./Wallet";
import {
  getCurrency,
  getPercentageSimple,
} from "../../../../../utils/StringUtils";
import App from "../../../../../stores/app/App";
import Button from "../../../../../stores/base/form/buttons/Button";
import Analytics from "../../../../../utils/Analytics";
import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import Status from "../../../../../utils/requests/Status";
import History from "../../../../../History";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";

export default class Invoice extends RemoteStore {
  static storeName = "Invoice";

  getUrl() {
    return `accounting/profiles/${App.getId()}/invoices/${
      this.state.invoiceId
    }/`;
  }

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      button: Button.createSubmit({
        title: "پرداخت رایگان",
        onClick: () => this.submit(),
        icon: Res.icon.wallet,
        className: "large raised centered success",
      }),
    };
  }

  success(data, status) {
    super.success(data, status);
    if (data.credit_shortage) {
      this.state.button.set_title("پرداخت از طریق درگاه بانک");
    } else {
      if (data.discounted_price) {
        this.state.button.set_title("پرداخت با اعتبار");
      } else {
        this.state.button.set_title("دریافت رایگان");
      }
    }
  }
  submit() {
    this.state.button.set_loading(true);
    let { credit_shortage: amount, id: invoice } = this.state.data;
    if (amount) {
      this.state.button.set_title(
        Res.string.dashboard.accounting.connecting_to_bank
      );
      Requester.request(
        "post",
        `accounting/profiles/${App.getId()}/charges/`,
        { amount, invoice },
        (response) => this.submitCallback(response)
      );
    } else {
      Requester.request(
        "post",
        `accounting/profiles/${App.getId()}/invoices/${invoice}/pay/`,
        {},
        (response) => this.paymentCallback(response)
      );
    }
  }

  submitCallback(response) {
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      this.state.button.set_title(
        Res.string.dashboard.accounting.redirecting_to_merchant
      );
      window.location = response.data.merchant_url;
    } else {
      this.state.button.set_title(
        Res.string.dashboard.accounting.connecting_to_bank
      );
      this.state.button.set_loading(false);
    }
  }

  paymentCallback(response) {
    this.state.button.set_loading(false);
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      Wallet.get().load(CACHE_POLICY.IGNORE);
      App.get().load(CACHE_POLICY.UPDATE);
      App.get().setShouldLog(true);
      History.replace_url(this.state.data.redirect_url);
    }
  }
}
