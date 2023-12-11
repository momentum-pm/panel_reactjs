import React from "react";
import History from "../../../History";
import Res from "../../../assets/Res";

export default function InstantVideoView({fileAddress, className}) {
	return (
		<div className={`instant-video-view ${className}`}
			 onClick={() => History.pushFreeModal(`/instant-video/`, {url: fileAddress})}>
			<video controls={false}>
				<source src={fileAddress}/>
			</video>
			{Res.icon.videoFile}
		</div>);
}

