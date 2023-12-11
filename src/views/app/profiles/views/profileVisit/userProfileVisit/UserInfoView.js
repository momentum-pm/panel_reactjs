import Box from "../../../../../base/refactored/box/Box";
import Body from "../../../../../base/Body";
import React from "react";
import AbstractUserInfoView from "./AbstractUserInfoView";
import Row from "../../../../../base/Row";

export default function UserInfoView({profile, hasChatButton, chatButtonId}) {
	return <Box>
		<Body>
			<AbstractUserInfoView profile={profile} visit={true}/>
			<Row>
			</Row>

		</Body>
	</Box>
}
