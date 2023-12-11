import RemoteStore from "../../../../../stores/base/RemoteStore";


export default class ParticipantSections extends RemoteStore {
	static storeName = 'ParticipantSections';

	getUrl() {
		return `/school/participants/${this.state.participantId}/courses/${this.state.courseId}/sections/`
	}
}
