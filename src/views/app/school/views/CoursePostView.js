import {connect} from "../../../../stores/base/StoreManager";
import RemoteStoreView from "../../../base/RemoteStoreView";
import React from "react";
import PostPartView from "../../blog/views/posts/PostPartView";
import CoursePost from "../stores/CoursePost";
import Column from "../../../base/Column";
import ButtonView from "../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../stores/base/form/buttons/Button";
import Res from "../../../../assets/Res";
import Box from "../../../base/refactored/box/Box";
import Row from "../../../base/Row";
import MasterColumn from "../../../base/MasterColumn";
import IconTitleValueView from "../../../base/iconTitleValueView/IconTitleValueView";
import {getDurationTextLong} from "../../../../utils/DateUtils";
import {normalizeNumber, splitDigits} from "../../../../utils/StringUtils";

class CoursePostView extends RemoteStoreView {
	static getRemoteStore(props) {
		let postId = props.postId;
		return CoursePost.map(postId, {postId});
	}


	getOkView() {
		let post = this.getData();
		return (<Box className={'hidden-overflow'}>
			<div className={'course-post-image-container'}>
				{post.image ? <img className={'course-post-image'} src={post.image} alt={post.title}/> :
					<div className={'course-post-image'}/>}
				<div
					className={'course-post-content'}>
					<div>
						<h1 className={'center'}>{post.title}</h1>
						<p className={'center'}>{post.description}</p>
						<Column className={'centered'}>
							<ButtonView title={'شروع یادگیری'}
										type={BUTTON_TYPE.LINK}
										icon={Res.icon.nextArrow}
										className={'raised large primary'}
										link={`/c/${this.props.courseSlug}/e/${this.props.firstEpisodeId}/${this.props.firstEpisodeSlug}/`}/>
						</Column>
					</div>

				</div>
			</div>
			<div className={'padding-one responsive-only'}>
				<Row className={'responsive-only'}>
					<MasterColumn>
						<IconTitleValueView
							icon={Res.icon.clock}
							title={'طول دوره'}
							className={'vertical primary'}
							value={getDurationTextLong(this.props.course.duration)}/>
					</MasterColumn>
					<MasterColumn>
						<IconTitleValueView
							icon={Res.icon.note}
							className={'vertical primary'}
							title={Res.string.school.episodes}
							value={`${normalizeNumber(this.props.course.episode_count)} ${Res.string.school.episode}`}/>
					</MasterColumn>
					<MasterColumn>
						<IconTitleValueView
							icon={Res.icon.eye}
							className={'vertical primary bold'}
							title={Res.string.school.views}
							value={splitDigits(this.props.course.views)}/>
					</MasterColumn>
				</Row>
			</div>

			{this.getData().parts.map(part => <PostPartView part={part} key={part.id}/>)}
		</Box>)
	}
}

export default connect(CoursePostView);
