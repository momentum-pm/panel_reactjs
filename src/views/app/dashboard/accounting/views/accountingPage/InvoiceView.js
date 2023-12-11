import React from "react";
import Item from "../../../../../base/refactored/item/Item";
import TitleValueView from "../../../../../base/titleValueView/TitleValueView";
import Res from "../../../../../../assets/Res";
import { getCurrency, normalizeNumber } from "../../../../../../utils/StringUtils";
import {
  getDatetimeDistanceString,
  getFormalDateTime,
} from "../../../../../../utils/DateUtils";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../../stores/base/form/buttons/Button";

export default function InvoiceView({ invoice }) {
  return (
    <div className="bordered-box">
      <div className={"padding-one"}>
        <div className="header-style row">
          <p className="master-column">
            {Res.get_attribute(invoice, "description")}
          </p>
          <p className={"x-small"}>
            {getDatetimeDistanceString(invoice.creation)}
          </p>
        </div>
        <div className="padding-one">
          <TitleValueView
            title={Res.string.dashboard.accounting.amount}
            className={`expanded ${invoice.paid ? "" : ""} tag`}
            value={getCurrency(invoice.price)}
          />

          <TitleValueView
            title={Res.string.dashboard.accounting.invoice_payment_status}
            className={`${
              invoice.paid
                ? "primary colored tag expanded"
                : "colored tag danger expanded"
            }`}
            value={
              invoice.paid
                ? Res.string.dashboard.accounting.invoice_paid
                : Res.string.dashboard.accounting.invoice_not_paid
            }
          />
        </div>
        {invoice.wallet?.profile ? (
          <div className="row centered padding-one">
            <p className="master-column">{invoice.wallet.profile.title}</p>
            <ButtonView
              type={BUTTON_TYPE.EXTERNAL_LINK}
              link={`tel:${invoice.wallet.profile.phone_number}`}
              title={normalizeNumber(invoice.wallet.profile.phone_number)}
              icon={Res.icon.call}
              className="small low-margin flat white"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
