import React from "react";
import v0 from "../pics/ranks/0.png"
import v1 from "../pics/ranks/1.png"
import v2 from "../pics/ranks/2.png"
import v3 from "../pics/ranks/3.png"
import v4 from "../pics/ranks/4.png"
import flags from "./flags";

export function getPortrait(x, css) {
    if (css) {
      return (
        <img
          src={
            process.env.PUBLIC_URL +
            "/picsb/" +
            (x.Nationalite?1:0) + x.DeckID +
            ".png"
          }
          onError={
            ()=>global.throw("getPortrait error",x)
          }
          className={css}
          alt="unitPortrait"
        />
      );
    }
    return (
      <img
      src={
        process.env.PUBLIC_URL +
        "/picsb/" +
        (x.Nationalite?1:0) + x.DeckID +
        ".png"
      }
        className="img-sd-back"
        alt="unitPortrait"
      />
    );
}

export function VetIcon({ vet, css }) {
  switch (vet) {
    case -2:
    case -1:
    case 0:
      return <img className={css} src={v0} alt="-" />;
    case 1:
      return <img className={css} src={v1} alt="*" />;
    case 2:
      return <img className={css} src={v2} alt="^^" />;
    case 3:
      return <img className={css} src={v3} alt="^*^" />;
    case 4:
    case 5:
    case 6:
      return <img className={css} src={v4} alt="^**^" />;
    default:
      global.throw("VetIcon in unit panel", vet);
      return <div />;
  }
}