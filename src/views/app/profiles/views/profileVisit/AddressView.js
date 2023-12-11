import React from "react";
import IconTitleValueView from "../../../../base/iconTitleValueView/IconTitleValueView";
import Res from "../../../../../assets/Res";

export default function AddressView({address}) {
	let addressText = getAddress(address);
	if (addressText) {
		return (
			<IconTitleValueView
				icon={Res.icon.location}
				title={addressText}/>
		);
	} else {
		return null;
	}

}

export function getAddress(address) {
	let addressText = '';
	if (address.province) {
		addressText += Res.get_attribute(address.province, 'title');
		addressText += Res.string.camma;
	}
	if (address.city) {
		addressText += Res.get_attribute(address.city, 'title');
		addressText += Res.string.camma;
	}
	if (address.text) {
		addressText += address.text;
		addressText += Res.string.camma;
	}
	if (address.address_text) {
		addressText += address.address_text;
		addressText += Res.string.camma;
	}
	if (addressText) {
		addressText = addressText.substring(0, addressText.length - 2);
	}
	return addressText;
}
