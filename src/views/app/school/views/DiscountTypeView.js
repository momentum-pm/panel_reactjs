import React from "react";
import { Link } from "react-router-dom";
import ItemTitle from "../../../base/refactored/itemTitle/ItemTitle";
import Thumbnail from "../../../base/refactored/thumbnail/Thumbnail";
import Row from "../../../base/Row";
import user from "../../../../assets/images/user.svg";
import MasterColumn from "../../../base/MasterColumn";
import ButtonView from "../../../base/forms/button/ButtonView";
import Res from "../../../../assets/Res";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import { getCurrency, normalizeNumber } from "../../../../utils/StringUtils";
import IconTitleValueView from "../../../base/iconTitleValueView/IconTitleValueView";
import TagView from "../../../base/tag/TagView";
import {
  getDateFromDateTime,
  getFormalDateTime,
} from "../../../../utils/DateUtils";
export default function DiscountTypeView({ discountType }) {
  return (
    <div className="bordered-box">
      <div className="padding-two">
        <Row className={""}>
          <MasterColumn>
            <ItemTitle className="">
              {Res.get_attribute(discountType, "title")}
            </ItemTitle>
            <h2 className="padding-one-before-after success">
              {discountType.code}
            </h2>
          </MasterColumn>
          <TagView
            icon={discountType.active ? Res.icon.check : Res.icon.cross}
            title={discountType.active ? "فعال" : "غیرفعال"}
            className={discountType.active ? "primary" : "danger"}
          />
          <ButtonView
            type={BUTTON_TYPE.BUTTON}
            icon={Res.icon.edit}
            onClick={() => {}}
            className={"flat small primary"}
          />
        </Row>

        <IconTitleValueView
          icon={Res.icon.list}
          title={"نوع"}
          className={"expanded"}
          value={
            {
              percentage: "درصدی",
              "fixed-discount": "تخفیف ثابت",
              "fixed-price": "مبلغ ثابت",
            }[discountType.pricing_method]
          }
        />
        <IconTitleValueView
          icon={Res.icon.discount}
          className={"expanded"}
          title={
            {
              percentage: "درصد",
              "fixed-discount": "مقدار تخفیف",
              "fixed-price": "مبلغ فاکتور",
            }[discountType.pricing_method]
          }
          value={
            {
              percentage: normalizeNumber(discountType.percentage * 100) + "%",
              "fixed-discount": getCurrency(discountType.fixed_discount),
              "fixed-price": getCurrency(discountType.fixed_price),
            }[discountType.pricing_method]
          }
        />
        <IconTitleValueView
          icon={Res.icon.profile}
          title={"تعداد استفاده "}
          className={"expanded"}
          value={normalizeNumber(discountType.discount_count) + " نفر"}
        />
        <IconTitleValueView
          icon={Res.icon.profile}
          title={"تعداد باقی مانده"}
          className={"expanded"}
          value={
            discountType.max_count <= -1
              ? "بینهایت"
              : normalizeNumber(discountType.max_count) + " نفر"
          }
        />

        <IconTitleValueView
          icon={Res.icon.clock}
          title={"تاریخ انقضا"}
          className={"expanded"}
          value={
            discountType.expire_date
              ? getFormalDateTime(discountType.expire_date)
              : "ندارد"
          }
        />
        <IconTitleValueView
          icon={Res.icon.profile}
          title={"معرف (درصد)"}
          className={"expanded"}
          value={
            discountType.commissioner_wallet
              ? discountType.commissioner_wallet.profile.title +
                " (" +
                normalizeNumber(
                  Math.floor(discountType.commission_percentage * 100)
                ) +
                "%)"
              : "ندارد"
          }
        />
      </div>
    </div>
  );
}
