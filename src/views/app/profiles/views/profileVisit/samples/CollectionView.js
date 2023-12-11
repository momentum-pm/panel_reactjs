import React from "react";
import Res from "../../../../../../assets/Res";
import {COLOR} from "../../../../../../assets/color";
import {normalizeNumber} from "../../../../../../utils/StringUtils";
import History from "../../../../../../History";

export default class CollectionView extends React.Component {
	render() {
		return (
			<div className={'sample-edit-view'}
				 onClick={() => History.pushLargeModal(`/profiles/profiles/${this.props.profileId}/collections/${this.props.collection.id}/`)}>
				<div className={`instant-document-view`}
					 style={{background: COLOR.GRAY}}>
					<div className={'instant-document-view-content'}>
						<p className={'instant-document-view-name'}>{this.props.collection.title}</p>
						<div className={'instant-document-view-icon'}
							 style={{fill: 'white'}}>
							{Res.icon.folder}
						</div>
						<p className={'instant-document-view-title'}>{`${normalizeNumber(this.props.collection.sample_count)} ${Res.string.profiles.samples.samples}`}</p>
					</div>
				</div>
			</div>
		)
	}
}
