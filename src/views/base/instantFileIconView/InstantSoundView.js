import React from "react";
import History from "../../../History";

export default function InstantSoundView({fileAddress, className}) {
	return (
		<div className={`instant-audio-view ${className}`}
			 onClick={() => History.pushFreeModal(`/instant-image/`, {url: fileAddress})}>
			<audio controls={true}>
				<source src={fileAddress}/>
			</audio>
		</div>);
}

