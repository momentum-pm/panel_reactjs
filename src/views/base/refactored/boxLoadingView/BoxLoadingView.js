import "./LoadingView.scss";
import React from "react"
import R from "../../../assets/R";
import Row from "../Row";
import Column from "../Column";

export default function BoxLoadingView({additionalClass}) {
	let rootClass = "loading ";
	if (additionalClass) {
		rootClass += additionalClass;
	}
	return (
		<B className={rootClass}>
			<Column className={'centered'}>
				<Row className={'loading-view-loading-container'}>
					<div className={'loading-view-loading-bullet-container'}>
						<div className={'loading-view-loading-bullet'}/>
					</div>
					<div className={'loading-view-loading-bullet-container'}>
						<div className={'loading-view-loading-bullet'}/>
					</div>
					<div className={'loading-view-loading-bullet-container'}>
						<div className={'loading-view-loading-bullet'}/>
					</div>
				</Row>
			</Column>
			<p className={'loading-view-text'}>{R.string.loading}</p>
		</B>
	)
}
