import React from "react";
import RichText from "../../../../base/richText/RichText";
import Row from "../../../../base/Row";
import SlaveColumn from "../../../../base/SlaveColumn";
import Res from "../../../../../assets/Res";
import DownloadFileIconView from "../../../../base/downloadFileIconView/DownloadFileIconView";
import MasterColumn from "../../../../base/MasterColumn";
export default function ParagraphView({ part, className }) {
  let imageView;
  if (part.image) {
    imageView = (
      <div className={"inline-half-row-responsive"}>
        <div className=" padding-four-sides-desktop padding-two-before-after">
          <div className={"blog-part-image-container"}>
            <img
              className={"blog-part-image"}
              src={part.image}
              alt={part.image_alt}
            />
          </div>
        </div>
      </div>
    );
  } else {
    imageView = null;
  }
  return (
    <div
      className={`blog  ${part.padding_top.class_name}-top ${
        part.padding_bottom.class_name
      }-bottom ${
        part.background_color.class_name === "background"
          ? "white"
          : part.background_color.class_name
      }`}
      style={{
        background: `#${part.background_color.title_en}`,
      }}
    >
      <div className={className}>
        <Row className={"padding-four-sides-desktop centered"}>
          <Row className={"centered full-width"}>
            {part.image_location === "start" ? imageView : null}
            {imageView ? null : <SlaveColumn />}
            <div className={"inline-half-row-responsive"}>
              <div className={"paragraph-view-text"}>
                <div className={` ${imageView?'padding-two-before-after padding-four-sides-desktop':''}`}>
                  <RichText className={"blog"}>{part.content}</RichText>
                  {part.attachments.length > 0 ? (
                    <div>
                      <p className={"small padding-one"}>
                        {Res.string.blog.attachments_label}
                      </p>
                      <Row className={'full-width'}>
                        {part.attachments.map((file, index) => (
                          <DownloadFileIconView fileAddress={file} key={index} />
                        ))}
                      </Row>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {imageView ? null : <SlaveColumn />}

            {part.image_location === "end" ? imageView : null}
          </Row>
        </Row>
      </div>
    </div>
  );
}
