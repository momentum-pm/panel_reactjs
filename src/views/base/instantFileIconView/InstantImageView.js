import React from "react";
import History from "../../../History";
import Res from "../../../assets/Res";

export default function ImageInstantView({fileAddress, className}) {
	return (
		<div className={`instant-image-view ${className}`}
			 onClick={() => History.pushFreeModal(`/instant-image/`, {url: fileAddress})}>
			<img className={'instant-image-view-image'} src={fileAddress} alt={fileAddress}/>
			{Res.icon.imageFile}
		</div>);
}

