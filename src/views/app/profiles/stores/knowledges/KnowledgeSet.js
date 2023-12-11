import RemoteStore from "../../../../../stores/base/RemoteStore";
import KnowledgeEditForm from "./KnowledgeEditForm";


export default class KnowledgeSet extends RemoteStore {
	static storeName = 'KnowledgeSet';


	getUrl() {
		return `profiles/profiles/${this.state.profileId}/knowledge-set/`;
	}
	load(){
		this.success([
			{
				'id':1,
				level:{title_en:'',title_fa:''}

			}
		]);
	}

}
