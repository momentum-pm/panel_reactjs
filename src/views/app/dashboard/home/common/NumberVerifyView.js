import Body from "../../../../base/Body";
import Row from "../../../../base/Row";
import Res from "../../../../../assets/Res";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import PhoneNumberVerification from "../../../profiles/stores/PhoneNumberVerification";
import Box from "../../../../base/refactored/box/Box";
import React from "react";
import MasterColumn from "../../../../base/MasterColumn";

export default function NumberVerifyView() {
  return (
    <Box className={""}>
      <Row className={"centered padding-one"}>
        <MasterColumn>
          <p className={"padding-two-sides"}>
            {Res.string.profiles.phone_number_not_verified}
          </p>
        </MasterColumn>
        <ButtonView
          type={BUTTON_TYPE.BUTTON}
          onClick={() => PhoneNumberVerification.open()}
          title={Res.string.profiles.phone_number_verification}
          icon={Res.icon.check}
          className={"flat large secondary"}
        />
      </Row>
    </Box>
  );
}
