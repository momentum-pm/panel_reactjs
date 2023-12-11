import React from "react";
import "./EmptyView.scss";
import Box from "../refactored/box/Box";
import EmptyView from "./EmptyView";


export default function BoxEmptyView({text = undefined, title=undefined,redirectTitle = undefined, redirectPath = undefined}) {
	return <Box>
		<EmptyView text={text} title={title} redirectTitle={redirectTitle} redirectPath={redirectPath}/>
	</Box>
}
