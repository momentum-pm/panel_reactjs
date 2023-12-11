import Row from "../../../../base/Row";
import SlaveColumn from "../../../../base/SlaveColumn";
import Res from "../../../../../assets/Res";
import "./FooterView.scss";
import React from "react";
import LinkIconTitleValueView from "../../../../base/linkIconTitleValueView/LinkIconTitleValueView";
import Settings from "../../../../../Settings";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import logo from "../../../../../assets/images/logo.png";
import enamaad from "../../../../../assets/images/enamaad.png";
import footer from "../../../../../assets/images/footer.png";
import watermark_dark from "../../../../../assets/images/watermark-dark.png";
import watermark_light from "../../../../../assets/images/watermark-light.png";

export default function FooterView() {
  return (
    <footer className={"home-footer"}>
      {/*<SlaveColumn className={'padding-two'}>*/}
      {/*	<h6 className={'home-footer-title'}>{Res.string.home.essential_links}</h6>*/}
      {/*	<Link className={'home-footer-link'}*/}
      {/*		  to={'/terms-and-conditions/'}>{Res.string.home.terms_and_conditions.short_title}</Link>*/}
      {/*	<Link className={'home-footer-link'}*/}
      {/*		  to={'/privacy-policy/'}>{Res.string.home.privacy_policy.short_title}</Link>*/}
      {/*	<Link className={'home-footer-link'}*/}
      {/*		  to={'/contact-us/'}>{Res.string.home.contact_us}</Link>*/}
      {/*</SlaveColumn>*/}
      <div className={"container"}>
        <Row className={"padding-two"}>
          <SlaveColumn className={"padding-two-sides"}>
            <div className={"home-footer-social-ink"}>
              <Row className={"centered padding-two-before-after"}>
                <img
                  className={"toolbar-logo-container"}
                  src={logo}
                  alt={"گرینولی"}
                />
                <img
                  className="toolbar-logo-watermark dark-only"
                  alt="Greenoly"
                  src={watermark_dark}
                />
                <img
                  className="toolbar-logo-watermark light-only"
                  alt="Greenoly"
                  src={watermark_light}
                />
              </Row>
              <p className="padding-two-before-after white">
                گرینولی ، ناشر آنلاین دوره های آموزشی باکیفیت استودیویی <br />
                المپیاد و برنامه نویسی با مدرسین برترین مدارس کشور
              </p>

              <Row className={"centered padding-two-before-after"}>
                <img
                  referrerPolicy="origin"
                  id="rgvjwlaofukzfukzrgvjfukz"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      "https://logo.samandehi.ir/Verify.aspx?id=346636&p=xlaoaodsgvkagvkaxlaogvka",
                      "Popup",
                      "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
                    )
                  }
                  alt="logo-samandehi"
                  src="https://logo.samandehi.ir/logo.aspx?id=346636&p=qftishwlwlbqwlbqqftiwlbq"
                />
                <a
                  referrerpolicy="origin"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=339895&amp;Code=YMW2GozPzD8FYIUCEPoG"
                >
                  <img
                    referrerPolicy="origin"
                    src={enamaad}
                    alt="Enamaad"
                    style={{ cursor: "pointer" }}
                    id="YMW2GozPzD8FYIUCEPoG"
                  />
                </a>
              </Row>
            </div>
          </SlaveColumn>
          <SlaveColumn className={"padding-two-before-after"}>

            <h6 className={"padding-two-sides home-footer-title"}>
              اطلاعات تماس
            </h6>
            <LinkIconTitleValueView
              href={`tel:${Settings.TELL}`}
              icon={Res.icon.call}
              title={""}
              value={Res.string.home.number_text}
              className={"white"}
            />

            <LinkIconTitleValueView
              href={"mailto:greenolyofficial@gmail.com"}
              icon={Res.icon.email}
              title={""}
              value={Res.string.home.email_text}
              className={"white"}
            />
            <LinkIconTitleValueView
              href={"https://maps.google.com/?q=35.729361, 51.425427"}
              icon={Res.icon.location}
              title={""}
              value={Res.string.home.address_text}
              className={"white"}
            />
            
          </SlaveColumn>
          <SlaveColumn className={"padding-two-before-after"}>
            <h6 className={"padding-two-sides home-footer-title"}>
              لینک های ضروری
            </h6>

            <LinkIconTitleValueView
              icon={Res.icon.nextArrow}
              className={"white"}
              value={"قوانین و مقررات"}
              href={
                "https://greenoly.org/blog/posts/%D9%82%D9%88%D8%A7%D9%86%DB%8C%D9%86-%D9%88-%D9%85%D9%82%D8%B1%D8%B1%D8%A7%D8%AA/"
              }
            />
            <LinkIconTitleValueView
              icon={Res.icon.nextArrow}
              className={"white"}
              value={"درباره ما"}
              href={"/about-us"}
            />
                        <h6 className={"padding-two-sides home-footer-title"}>
              {Res.string.home.in_social_media}
            </h6>
            <Row>
              <ButtonView
                link={"https://www.instagram.com/greenoly/"}
                type={BUTTON_TYPE.EXTERNAL_LINK}
                className={"white default"}
                icon={Res.icon.instagram}
              />
              <ButtonView
                link={"https://t.me/greenolympiad"}
                type={BUTTON_TYPE.EXTERNAL_LINK}
                className={"white default"}
                icon={Res.icon.telegram}
              />
              <ButtonView
                link={"https://www.linkedin.com/company/greenoly/"}
                type={BUTTON_TYPE.EXTERNAL_LINK}
                className={"white default"}
                icon={Res.icon.linkedin}
              />
              <ButtonView
                link={"https://www.youtube.com/@TheGreenOly"}
                type={BUTTON_TYPE.EXTERNAL_LINK}
                className={"white default"}
                icon={Res.icon.youtube}
              />
            </Row>
          </SlaveColumn>
        </Row>
      </div>
      <img src={footer} className="footer-image-bottom" />
      <p className={"all-rights-reserved center padding-one small"}>
        {Res.string.home.all_rights_reserved}
      </p>
    </footer>
  );
}
