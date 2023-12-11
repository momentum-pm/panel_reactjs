import React from "react";
import Res from "../../../../../assets/Res";
import StepView from "../../../../base/forms/fields/stepView/StepView";
import "./PrivacyPolicy.scss";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import FooterView from "../footerView/FooterView";

export default function PrivacyPolicyPage() {
	return (
		<ScrollableColumn>
			<Scrollable>
				<div className={'privacy-policy'}>
					<h2 className={'privacy-policy-title'}>{Res.string.home.privacy_policy.title}</h2>
					<p className={'privacy-policy-text'}>{Res.string.home.privacy_policy.text}</p>
					<ul>
						{Res.string.home.privacy_policy.items.map((item, index) => {
							return (
								<li key={index} className={'privacy-policy-item'}>
									<StepView index={index + 1} label={item.title}/>
									<p className={'privacy-policy-item-text'}>{item.text}</p>
								</li>
							)
						})}
					</ul>
				</div>
				<FooterView/>
			</Scrollable>
		</ScrollableColumn>
	)
}
