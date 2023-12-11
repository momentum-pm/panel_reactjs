import React from "react";
import Box from "../../../../base/refactored/box/Box";
import Res from "../../../../../assets/Res";
import HeaderRow from "../../../../base/refactored/headerRow/HeaderRow";
import MasterColumn from "../../../../base/MasterColumn";
import ItemDescription from "../../../../base/refactored/itemDescription/ItemDescription";
import {getFormalDateTime} from "../../../../../utils/DateUtils";
import Body from "../../../../base/Body";
import ButtonView from "../../../../base/forms/button/ButtonView";
import Row from "../../../../base/Row";
import IconTitleValueView from "../../../../base/iconTitleValueView/IconTitleValueView";
import ItemInfo from "../../../../base/refactored/itemInfo/ItemInfo";

export default function AuthorPostView({post}) {
	return <Box>
		<HeaderRow>
			<MasterColumn>
				<h2>
					{`${Res.string.blog.post_title}: ${post.title || Res.string.blog.no_title}`}
				</h2>
			</MasterColumn>
			<ItemDescription>{getFormalDateTime(post.creation)}</ItemDescription>
		</HeaderRow>
		<Body>
			<IconTitleValueView
				icon={Res.icon.check}
				title={Res.string.blog.state_label}
				value={Res.string.blog.state_to_title[post.state]}/>
			{post.publish_date ?
				<IconTitleValueView
					icon={Res.icon.clock}
					title={Res.string.blog.publish_date_title}
					value={getFormalDateTime(post.publish_date)}/>
				: null
			}
			<ItemInfo>{post.description}</ItemInfo>
		</Body>
		<Row className={'reverse padding-one'}>
			<ButtonView id={post.editButton.id}/>
			<ButtonView id={post.viewButton.id}/>
			<ButtonView id={post.viewClientButton.id}/>
		</Row>
	</Box>
}
