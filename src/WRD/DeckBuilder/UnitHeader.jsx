import React from "react";
import {getPortrait, VetIcon } from "../../js/GUIparsers";

function UnitHeader({Deck, Unit, Pack, show, add}) {
  global.log("render UnitHeader");
  let vBon = Deck.Spec.bonus[Unit.Tab]?Deck.Spec.bonus[Unit.Tab]:0;
  let makeButton = (vet,i) => {
    let count = Math.floor(Pack.avail[vet] * Deck.Deck.bonus)
    count = count?count:0;
    return (
      <div className="col p-0" key={i}>
        <button  disabled={!count} className="btn p-0" onClick={()=>add( vet, Unit, Pack.transport, Pack.boat)}>
          {count}
          <VetIcon vet={vet+vBon} css={"ml-0"}></VetIcon>
        </button>
      </div>
    );
  }
  return (
    <div className="card-header">
      <div className="row">
        <div className="col-5">
          {getPortrait(Unit, "img-responsive")}
        </div>
        <div className="col-7">
          <div className="row">
            <div className="col-10">
              <h4>{Unit.Name}</h4>
            </div>
            <div className="col-2">
              <button
                className="btn btn-danger"
                onClick={() => show(null)}
              >
                X
              </button>
            </div>
          </div>
          <div className="row no-gutters">
            {[0,1,2,3,4].map(makeButton)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitHeader;
