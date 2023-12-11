import React from "react";
import {IMAGE_FORMATS, VIDEO_FORMATS} from "../../../stores/base/form/fields/FileField";
import "./FileIconView.scss";
import ImageInstantView from "./InstantImageView";
import InstantVideoView from "./InstantVideoView";
import InstantDocumentView from "./InstantDocumentView";

export default function InstantFileIconView({fileAddress, className}) {
	let file = fileAddress.substring(fileAddress.lastIndexOf("/") + 1);
	let format;

	if (file.indexOf('.') >= 0) {
		format = file.substring(file.lastIndexOf(".") + 1).toLowerCase();
	}
	if (IMAGE_FORMATS.indexOf(format) !== -1) {
		return <ImageInstantView fileAddress={fileAddress} className={className}/>
	}
	if (VIDEO_FORMATS.indexOf(format) !== -1) {
		return <InstantVideoView fileAddress={fileAddress} className={className}/>
	}
	return <InstantDocumentView fileAddress={fileAddress} className={className}/>
}

