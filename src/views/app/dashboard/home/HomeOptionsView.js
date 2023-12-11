import Box from "../../../base/refactored/box/Box";
import React from "react";
import Res from "../../../../assets/Res";
import Row from "../../../base/Row";

export default function HomeOptionsView() {
	let items = [
		{
			link: '/school/',
			icon: Res.icon.education,
			title: 'دوره های آموزشی',
		},
	
	];
	return <Box>
		<Row>
			{items.map(item => (
				<a href={item.link} className={'dashboard-home-item-container'}>
					{item.icon}
					<p>{item.title}</p>
				</a>
			))}
		</Row>
	</Box>
}
