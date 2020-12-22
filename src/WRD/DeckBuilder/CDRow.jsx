import React from "react";
import { getPortrait, VetIcon,NatIcon} from "../../js/GUIparsers";
import flags from "../../js/flags";

function CDRow({ Deck, Parsed, show, API }) {
  global.log("render CDRow");
  let showCard = (x, i) => {
    let css = "col-lg col-md-2 col-sm-3 col-4 px-1 py-1 d-flex flex-column";
    try {
      //if not an object (AKA, a card), return a number
      if (x === "X") {
        return (
          <div className="col-lg col-1 px-1 py-1 d-flex flex-column" key={i}>
            <h3 className="text-center" key={i}> {x} </h3>
          </div>
        );
      }
      if (x.unit) {
        return (
          <div className={css} key={i}>
          <UnitIconDisplay
              x={x}
              d={Deck}
              show={show}
              API={API}
              key={i}
            />
          </div>
        );
      }
      return (
        <div className="col-lg col-sm-2 col-1 px-1 py-1 d-flex flex-column" key={i}>
          <h3 className="text-center" key={i}> {x} </h3>
        </div>
      );
    } catch (error) {
      global.throw("non-unit in unit display", x, error);
    }
  };
  return(
    <div className="card-text row no-gutters">
          {showCard(Parsed[0])}
          {showCard(Parsed[1])}
          {showCard(Parsed[2])}
          {showCard(Parsed[3])}
          {showCard(Parsed[4])}
          {showCard(Parsed[5])}
          {showCard(Parsed[6])}
          {showCard(Parsed[7])}
          {showCard(Parsed[8])}
      {/*
      <div className="col-lg-4 col-md-6 com-sm-8 col-12">
        <div className="row no-gutters">
          {showCard(Parsed[0])}
          {showCard(Parsed[1])}
          {showCard(Parsed[2])}
        </div>
      </div>
      <div className="col-lg-4 col-md-6 com-sm-8 col-12">
        <div className="row no-gutters">
          {showCard(Parsed[3])}
          {showCard(Parsed[4])}
          {showCard(Parsed[5])}
        </div>
      </div>
      <div className="col-lg-4 col-md-6 com-sm-8 col-12">
        <div className="row no-gutters">
          {showCard(Parsed[6])}
          {showCard(Parsed[7])}
          {showCard(Parsed[8])}
        </div>
      </div>*/}
    </div>
  );
  /*return (
    <div className="card-text row">{Parsed.map((e, i) => showCard(e, i))}</div>
  );*/
}

function UnitIconDisplay({ x, d, show, API }) {
  if (!show) {
    //for non-interactive display, show is undefined
    return unitIcon(x, d, show);
  } else {
    return (
      <>
        {unitIcon(x, d, show)}
        <button className="btn btn-block btn-outline-secondary mt-auto" onClick={() => API.deleteUnit(x)}>
          Delete
        </button>
      </>
    );
  }
}

function unitIcon(x, d, show) {
  let vBon = d.Spec.bonus[x.unit.Tab]?d.Spec.bonus[x.unit.Tab]:0;
  let textColor = d.cardIsValid(x) ? "text-dark txt-cdrow" : "text-danger txt-cdrow";
  return (
    <React.Fragment>
      <div className="position-relative"  onClick={() => show(x)}>
        {getPortrait(x.unit, "img-responsive w-100")}
        <img src={flags[x.unit.MotherCountry]} className="nat-flag" alt="flag" />
        <h5 className="txt-price font-weight-bold">
          {x.unit.Price + (x.transport ? x.transport.Price : 0) + (x.boat ? x.boat.Price : 0)  }
        </h5>
        <h5 className="txt-avail">{x.avail[x.vet]}</h5>
        <VetIcon vet={x.vet+vBon} css="xp-raise" />
      </div>
      <p className={textColor}>
        {x.unit.Name +
          " " +
          d.unitCount(x.unit) +
          "/" +
          x.unit.MaxPacks}
      </p>
      <p className={textColor}>
        {x.transport
          ? x.transport.Name + " " + d.transportCount(x.transport) + "/" + x.transport.MaxPacks
          : "  "}
      </p>
    </React.Fragment>
  );
}

export default CDRow;
