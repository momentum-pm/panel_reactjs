import React from "react";
import Item from "../../../../../base/refactored/item/Item";
import TitleValueView from "../../../../../base/titleValueView/TitleValueView";
import Res from "../../../../../../assets/Res";
import {getCredit} from "../../../../../../utils/StringUtils";
import {getFormalDateTime} from "../../../../../../utils/DateUtils";

export default function WithdrawView({withdraw}) {
	return (
		<Item>
			<div className={'padding-one'}>
				<TitleValueView title={Res.string.dashboard.accounting.amount}
								className={'expanded success'}
								value={getCredit(withdraw.amount)}/>
				<TitleValueView title={Res.string.dashboard.accounting.creation_date}
								className={'expanded'}
								value={getFormalDateTime(withdraw.creation)}/>
				<TitleValueView title={Res.string.dashboard.accounting.withdraw_payment_status}
								className={'expanded'}
								value={withdraw.paid ? Res.string.dashboard.accounting.withdraw_paid : Res.string.dashboard.accounting.withdraw_not_paid}/>
				{withdraw.paid?
					<TitleValueView title={Res.string.dashboard.accounting.paid_date}
									className={'expanded'}
									value={getFormalDateTime(withdraw.paid_time)}/>

					:null}
			</div>
		</Item>
	)
}
