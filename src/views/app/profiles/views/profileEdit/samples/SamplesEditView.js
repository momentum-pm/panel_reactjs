import Res from "../../../../../../assets/Res";
import React from "react";
import HeaderRow from "../../../../../base/refactored/headerRow/HeaderRow";
import Body from "../../../../../base/Body";
import SingleSamplesEditView from "./SingleSamplesEditView";
import Box from "../../../../../base/refactored/box/Box";

export default function SamplesEditView({profileId}) {
	return (
		<Box>
			<HeaderRow>
				<h2>{Res.string.profiles.samples.samples_title}</h2>
			</HeaderRow>
			<Body>
				<SingleSamplesEditView profileId={profileId}/>
			</Body>
		</Box>
	);
}
