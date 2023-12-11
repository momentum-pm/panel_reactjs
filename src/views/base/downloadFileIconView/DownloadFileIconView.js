import FileIconView from "../fileIconView/FileIconView";
import React from "react";

export default function DownloadFileIconView({fileAddress, className}) {
	return <a href={fileAddress} target={'_blank'} rel={'noreferrer noopener'}>
		<FileIconView fileAddress={fileAddress} className={className}/>
	</a>
}

