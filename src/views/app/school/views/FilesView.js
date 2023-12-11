import React from "react";
import {withRouter} from "react-router";
import Row from "../../../base/Row";
import InstantFileIconView from "../../../base/instantFileIconView/InstantFileIconView";
import Res from "../../../../assets/Res";

class FilesView extends React.Component {
	render() {
		return (
			<div className={'padding-two'} id={'files'}>
				<h4 className={'padding-two-sides'}>{Res.string.school.files}</h4>
				<Row>
					<InstantFileIconView fileAddress={'https://google.com/lecture1.pdf'}/>
					<InstantFileIconView
						fileAddress={'https://google.com/homework-template.docx'}/>
				</Row>
			</div>

		)
	}
}

export default withRouter(FilesView);
