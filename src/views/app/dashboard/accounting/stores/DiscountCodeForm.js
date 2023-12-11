import RemoteStore, {
  CACHE_POLICY,
} from "../../../../../stores/base/RemoteStore";
import BooleanField from "../../../../../stores/base/form/fields/BooleanField";
import Res from "../../../../../assets/Res";
import Wallet from "./Wallet";
import {
  getCurrency,
  getPercentageSimple,
} from "../../../../../utils/StringUtils";
import App from "../../../../../stores/app/App";
import Form from "../../../../../stores/base/form/Form";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Button from "../../../../../stores/base/form/buttons/Button";
import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import Invoice from "./Invoice";
import HiddenField from "../../../../../stores/base/form/fields/HiddenField";
export default class DiscountCodeForm extends Form {
  static storeName = "DiscountCodeForm";
  createFields(args) {
    return [
      HiddenField.create({
        name: "invoice_id",
        value: args.invoiceId,
      }),
      CharField.create({
        name: "code",
        placeholder: "کد تخفیف...",
      }),
    ];
  }
  createButtons() {
    return [
      Button.createSubmit({
        className: "raised secondary",
        title: "اعمال کد",
        icon: Res.icon.wallet,
        onClick: () => this.submit(),
      }),
    ];
  }
  submit() {
    this.touch();
    if (this.isValid()) {
      this.getButton("submit") && this.getButton("submit").set_loading(true);
      let values = this.getValues();
      Requester.request("get", this.getSubmitUrl(), values, (response) =>
        this.submitCallback(response)
      );
    } else {
      this.scrollToFirstErrorField();
    }
  }
  onSubmitCallback(response) {
    Invoice.get(this.state.invoiceId).load(CACHE_POLICY.UPDATE);
  }

  getSubmitUrl() {
    return "accounting/discount-types/find/";
  }
}
