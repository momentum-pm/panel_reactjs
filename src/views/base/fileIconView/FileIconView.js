import {COLOR, LIGHT_COLORS} from "../../../assets/color";
import Res from "../../../assets/Res";
import {
	ALL_FORMATS,
	AUDIO_FORMATS,
	COMPRESSED_FORMATS,
	DOCUMENT_FORMATS,
	IMAGE_FORMATS,
	VIDEO_FORMATS
} from "../../../stores/base/form/fields/FileField";
import React from "react";
import "./FileIconView.scss";

export const getFormatIcon = (format) => {
	if (AUDIO_FORMATS.indexOf(format) >= 0) {
		return Res.icon.audioFile;

	}
	if (DOCUMENT_FORMATS.indexOf(format) >= 0) {
		return Res.icon.documentFile;

	}
	if (VIDEO_FORMATS.indexOf(format) >= 0) {
		return Res.icon.videoFile;

	}
	if (COMPRESSED_FORMATS.indexOf(format) >= 0) {
		return Res.icon.compressedFile;
	}
	if (IMAGE_FORMATS.indexOf(format) >= 0) {
		return Res.icon.imageFile;
	}
	return Res.icon.unknownFile;
};
export const getFormatColor = (format) => {
	switch (format) {
		case 'pdf':
		case 'html':
		case 'htm':
			return COLOR.RED;
		case 'doc':
		case 'docx':
		case 'odt':
		case 'ods':
		case 'txt':
			return COLOR.BLUE;
		case 'xls':
		case 'xlsx':
			return COLOR.GREEN;
		case 'ppt':
		case 'pptx':
			return COLOR.ORANGE;
		case 'mp3':
		case 'ogg':
		case 'wav':
			return COLOR.PINK;
		case 'mp4':
		case 'webm':
		case 'mpg':
		case 'm4p':
		case 'm4v':
		case 'avi':
		case 'wmv':
		case 'mov':
		case 'flv':
		case 'swf':
			return COLOR.PURPLE;
		case 'zip':
		case 'tar':
		case 'gz':
		case 'rar':
		case '7z':
			return COLOR.YELLOW;
		case 'bmp':
		case 'jpg':
		case 'jpeg':
		case 'gif':
		case 'png':
		case 'svg':
			return COLOR.TEAL;
		default:
			return COLOR.GRAY;
	}
};
export const getFormatBackgroundColor = (format) => {
	switch (format) {
		case 'pdf':
		case 'html':
		case 'htm':
			return LIGHT_COLORS.RED;
		case 'doc':
		case 'docx':
		case 'odt':
		case 'ods':
		case 'txt':
			return LIGHT_COLORS.BLUE;
		case 'xls':
		case 'xlsx':
			return LIGHT_COLORS.GREEN;
		case 'ppt':
		case 'pptx':
			return LIGHT_COLORS.ORANGE;
		case 'mp3':
		case 'ogg':
		case 'wav':
			return LIGHT_COLORS.PINK;
		case 'mp4':
		case 'webm':
		case 'mpg':
		case 'm4p':
		case 'm4v':
		case 'avi':
		case 'wmv':
		case 'mov':
		case 'flv':
		case 'swf':
			return LIGHT_COLORS.PURPLE;
		case 'zip':
		case 'tar':
		case 'gz':
		case 'rar':
		case '7z':
			return LIGHT_COLORS.YELLOW;
		case 'bmp':
		case 'jpg':
		case 'jpeg':
		case 'gif':
		case 'png':
		case 'svg':
			return LIGHT_COLORS.TEAL;
		default:
			return LIGHT_COLORS.GRAY;
	}
};

export default function FileIconView({fileAddress, className}) {
	let file = fileAddress.substring(fileAddress.lastIndexOf("/") + 1);
	let format, fileName;

	if (file.indexOf('.') >= 0) {
		format = file.substring(file.lastIndexOf(".") + 1);
		fileName = file.substring(0, file.lastIndexOf("."));
	}
	if (ALL_FORMATS.indexOf(format) === -1) {
		format = '???';
		fileName = file;
	}

	let lowerCaseFormat = format.toLowerCase();
	let upperCaseFormat = format.toUpperCase();
	return (
		<div className={`column centered file-icon-view ${className || ''}`} title={file}>
			<div className={'file-icon-view-icon-container'}>

				<svg className={'file-icon-view-background'}
					 viewBox="0 0 56 56">
					<path className={'file-icon-view-background-icon'}
						  style={{fill: getFormatBackgroundColor(lowerCaseFormat)}} d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074
		c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"/>
					<polygon style={{fill: getFormatColor(lowerCaseFormat)}}
							 points="37.5,0.151 37.5,12 49.349,12 	"/>
					<path style={{fill: getFormatColor(lowerCaseFormat)}}
						  d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"/>
				</svg>
				<div className={'file-icon-view-content'}>
					<div className={'file-icon-view-icon'}
						 style={{fill: getFormatColor(lowerCaseFormat)}}>
						{getFormatIcon(lowerCaseFormat)}
					</div>
					<p className={'file-icon-view-title'}
					>{upperCaseFormat}</p>
				</div>
			</div>
			<p className={'file-icon-view-name'}>{fileName}</p>
		</div>
	)
}

