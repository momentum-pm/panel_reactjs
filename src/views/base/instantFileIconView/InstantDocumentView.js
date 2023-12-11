import React from "react";
import {ALL_FORMATS} from "../../../stores/base/form/fields/FileField";
import {getFormatColor, getFormatIcon} from "../fileIconView/FileIconView";

export default function ImageDocumentView({fileAddress, className}) {
	let file = fileAddress.substring(fileAddress.lastIndexOf("/") + 1);
	let format,fileName;

	if (file.indexOf('.') >= 0) {
		format = file.substring(file.lastIndexOf(".") + 1);
		fileName = file.substring(0, file.lastIndexOf("."));
	}
	if (ALL_FORMATS.indexOf(format) === -1) {
		format = '???';
	}

	let lowerCaseFormat = format.toLowerCase();
	let upperCaseFormat = format.toUpperCase();
	return (
		<a href={fileAddress} target={'_blank'} rel={'noreferrer noopener'}
		   className={`instant-document-view ${className}`}
		   style={{background: getFormatColor(lowerCaseFormat)}}>
			<div className={'instant-document-view-content'}>
				<p className={'instant-document-view-name'}>{fileName}</p>
				<div className={'instant-document-view-icon'}
					 style={{fill: 'white'}}>
					{getFormatIcon(lowerCaseFormat)}
				</div>
				<p className={'instant-document-view-title'}>{upperCaseFormat}</p>
			</div>
		</a>);
}

