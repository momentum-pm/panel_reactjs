import "./LoadingView.scss";
import React from "react"
import Row from "../../Row";
import Column from "../../Column";

export default function LoadingView({className}) {
	return (
		<Row className={`centered full-height ${className} loading-view`}>
			<Column className={'centered main-flex'}>
				<Row className={'loading-view-loading-container'}>
					<div className={'loading-view-loading-bullet-container'}>
						<div className={'loading-view-loading-bullet-col'}>
							<div className={'loading-view-loading-bullet'}/>
						</div>
					</div>
					<div className={'loading-view-loading-bullet-container'}>
						<div className={'loading-view-loading-bullet-col'}>
							<div className={'loading-view-loading-bullet'}/>
						</div>
					</div>
					<div className={'loading-view-loading-bullet-container'}>
						<div className={'loading-view-loading-bullet-col'}>
							<div className={'loading-view-loading-bullet'}/>
						</div>
					</div>
				</Row>
				{/*<p className={'loading-view-text'}>{R.string.app}</p>*/}
			</Column>
		</Row>
	)
}
