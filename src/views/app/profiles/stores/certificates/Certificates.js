import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import CertificateEditForm from "./CertificateEditForm";
import History from "../../../../../History";


export default class Certificates extends RemoteStore {
	static storeName = 'Certificates';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			createButton: Button.create_button({
				name: 'create-certificate',
				icon: Res.icon.add,
				className: 'flat primary',
				onClick: () => History.pushLargeModal(`/profiles/profiles/${args.profileId}/certificates/create/`)
			})
		}
	}

	getUrl() {
		return `profiles/profiles/${this.state.profileId}/certificates/`;
	}

	success(data, status) {
		data = data.map(certificate => {
				let certificateId = certificate.id;
				let profileId = this.state.profileId;
				return {
					...certificate,
					editButton: Button.create_button({
						name: `edit-certificate-${certificateId}`,
						icon: Res.icon.edit,
						onClick: () => {
							CertificateEditForm.get(certificateId, {certificateId, profileId}).setContext(certificate);
							History.pushLargeModal(`/profiles/profiles/${profileId}/certificates/${certificate.id}/edit/`)
						},
						className: 'flat primary',
					})
				}
			}
		);
		super.success(data, status);
	}
}
