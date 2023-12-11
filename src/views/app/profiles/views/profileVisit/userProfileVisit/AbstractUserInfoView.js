import React from "react";
import Res from "../../../../../../assets/Res";
import LinkIconTitleValueView from "../../../../../base/linkIconTitleValueView/LinkIconTitleValueView";
import { normalizeNumber } from "../../../../../../utils/StringUtils";
import user from "../../../../../../assets/images/user.svg";
import Row from "../../../../../base/Row";
import MasterColumn from "../../../../../base/MasterColumn";
import AddressView from "../AddressView";
import AccountLinksView from "../accountLinks/AccountLinksView";
import Thumbnail from "../../../../../base/refactored/thumbnail/Thumbnail";
export default function AbstractUserInfoView({ profile, visit }) {
  return (
    <div>
      <Row className={""}>
        <Thumbnail
          src={profile.picture}
          alt={profile.title}
          placeholder={user}
          className={"center background large round"}
        />
        <MasterColumn className={"padding-one-sides padding-two-top"}>
          <h3 >{profile.title}</h3>
          {profile.about ? <p>{profile.about}</p> : null}
          {visit ? <AddressView address={profile.address} /> : null}
		
        </MasterColumn>
      </Row>
	  {visit?<AccountLinksView profile={profile} />:null}

      <div className={`${!visit?'padding-one':''}`}>
        {!visit && profile.email ? (
          <LinkIconTitleValueView
            icon={Res.icon.email}
            title={Res.string.profiles.email_title}
            value={profile.email}
            href={`mailto:${profile.email}`}
            className={"expanded primary"}
          />
        ) : null}
        {!visit && profile.phone_number ? (
          <LinkIconTitleValueView
            icon={Res.icon.call}
            title={Res.string.profiles.phone_number_title}
            value={normalizeNumber(profile.phone_number)}
            href={`tel:${profile.phone_number}`}
            className={"expanded primary"}
          />
        ) : null}
      </div>
    </div>
  );
}
