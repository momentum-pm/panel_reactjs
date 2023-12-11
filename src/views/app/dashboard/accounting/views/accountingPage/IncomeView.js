import React from "react";
import Item from "../../../../../base/refactored/item/Item";
import TitleValueView from "../../../../../base/titleValueView/TitleValueView";
import Res from "../../../../../../assets/Res";
import {getCredit} from "../../../../../../utils/StringUtils";
import {getFormalDateTime} from "../../../../../../utils/DateUtils";

export default function IncomeView({income}) {
	return (
		<Item>
			<div className={'padding-one'}>
				<TitleValueView title={Res.string.dashboard.accounting.amount}
								className={'expanded success'}
								value={getCredit(income.amount)}/>
				<TitleValueView title={Res.string.dashboard.accounting.creation_date}
								className={'expanded'}
								value={getFormalDateTime(income.creation)}/>
				<TitleValueView title={Res.string.dashboard.accounting.description}
								className={'expanded'}
								value={Res.get_attribute(income, 'description')}/>
			</div>
		</Item>
	)
}
