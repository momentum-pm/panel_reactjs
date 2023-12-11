import Column from "../../base/Column";
import ButtonView from "../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../stores/base/form/buttons/Button";
import Res from "../../../assets/Res";
export default function LandingActionView({ action }) {
  return (
    <Column
      className={`landing-action-item active-item full-width centered margin-two`}
      key={action.id}
    >
      <div className="margin-two"></div>
      <h2 className={"center margin-two"}>{action.title}</h2>
      <p className={"center title margin-two-bottom"}>{action.text}</p>
      {action.link && action.link.startsWith("http") ? (
        <ButtonView
          className={"large raised success"}
          icon={Res.icon.nextArrow}
          title={action.button}
          type={BUTTON_TYPE.EXTERNAL_LINK}
          link={action.link}
        />
      ) : (
        <ButtonView
          className={"large raised success"}
          icon={Res.icon.nextArrow}
          title={action.button}
          type={BUTTON_TYPE.LINK}
          link={action.link}
        />
      )}
    </Column>
  );
}
