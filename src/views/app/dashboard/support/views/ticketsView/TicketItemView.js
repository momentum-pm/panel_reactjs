import React from "react";
import Link from "../../../../../base/Link";
import Res from "../../../../../../assets/Res";
import TagView from "../../../../../base/tag/TagView";
import Row from "../../../../../base/Row";
import MasterColumn from "../../../../../base/MasterColumn";
import ItemTitle from "../../../../../base/refactored/itemTitle/ItemTitle";
import ItemDescription from "../../../../../base/refactored/itemDescription/ItemDescription";
import {getDatetimeDistanceString} from "../../../../../../utils/DateUtils";

/**
 * @param {number} ticket.id
 * @param {string} ticket.title
 * @param {Object} ticket.category
 * @param {Object} ticket.state
 * @returns {*}
 */
export default function TicketItemView({ticket}) {
	return <li className={'clickable item-box'}>
		<Link to={`/dashboard/support/tickets/${ticket.id}/`}>
			<div className={'padding-two'}>
				<Row className={'centered'}>
					<MasterColumn>
						<ItemTitle>{ticket.title}</ItemTitle>
						<ItemDescription>{getDatetimeDistanceString(ticket.updated)}</ItemDescription>
					</MasterColumn>
					<TagView title={Res.get_attribute(ticket.state, 'title')}
							 className={'primary '}/>

				</Row>

			</div>

		</Link>
	</li>
}
