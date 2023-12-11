import React from "react";
import Column from "../../../../base/Column";
import MasterColumn from "../../../../base/MasterColumn";
import Row from "../../../../base/Row";
import SlaveColumn from "../../../../base/SlaveColumn";

export default function ImagePartView({ part, className }) {
  return (
    <div
      className={`blog ${part.padding_top.class_name}-top ${part.padding_bottom.class_name}-bottom ${part.background_color.class_name}`}
      style={{
        background: `#${part.background_color.title_en}`,
      }}
    >
      <div className={` ${className}`}>
        <Row>
          {className === "container" ? <SlaveColumn /> : null}
          <MasterColumn>
            <Column className={"centered  padding-four-sides"}>
              <img
                className={"blog-part-image"}
                src={part.image}
                alt={part.alt}
              />
              <p className={"blog-image-caption padding-one"}>{part.caption}</p>
            </Column>
          </MasterColumn>

          {className === "container" ? <SlaveColumn /> : null}
        </Row>
      </div>
    </div>
  );
}
