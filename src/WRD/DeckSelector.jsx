import React from "react";
import flags from "../js/flags";

function DeckSelector({DB, Deck, API}){
  let makeFlag=(x,pic) =>{
    let css = Deck.Deck.nations.includes(x.Nation) || Deck.Deck.Nation === x.Nation?"w-100" : "w-100 gray";
    css = Deck.Deck.Nation ==="NATO" && !x.Side ? "w-100":css
    css = Deck.Deck.Nation ==="REDFOR" && x.Side ? "w-100":css
    //horrible hacks to get the layout right
    let grid = "col-xl-3 col-lg-4 col-md-4 col-sm-6 col-10";
    return (
      <div className={grid} key={x.Nation}>
        <button className="btn btn-block  border-0" onClick={() => API.setDeck(x)}>
          <img
            className={css}
            src={pic}
            alt="flag"
          />
        </button>
      </div>
    );
  };
  let makeSpec=(x)=>{
    let css = x.code === Deck.Spec.code? "btn btn-block p-0 btn-success rounded-0" : "p-0 btn btn-block" 
    return (
      <div className="col-xl-3 col-lg-6 col-sm-3 col-3" key={x.str}>
        <button className={css}  onClick={()=>API.setSpec(x)}>{x.BTN}</button>
      </div>
    )
  }
  let makeEra=(x)=>{
    let css = x.code === Deck.Era.code? "btn btn-block btn-success rounded-0" : "btn btn-block" 
    return (
      <div className="col-4" key={x.str}>
        <button className={css} onClick={()=>API.setEra(x)}>{x.str}</button>
      </div>
    )
  }

  global.log("render DeckSelector");
  return (
    <React.Fragment>
      <div className="card">
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="row no-gutters">
              <div className="col-4">
                <div className="row  no-gutters">
                  {makeFlag(DB.decks[20],flags.NATO)}
                </div>
              </div>
              <div className="col-4">
                <div className="row  no-gutters">
                </div>
              </div>
              <div className="col-4">
                <div className="row justify-content-end no-gutters">
                  {makeFlag(DB.decks[33],flags.REDFOR)}
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-4">
                <div className="row  no-gutters">
                  {makeFlag(DB.decks[13],flags.EU)}
                  {makeFlag(DB.decks[14],flags.SCA)}
                  {makeFlag(DB.decks[15],flags.COM)}
                  {makeFlag(DB.decks[16],flags.BD)}
                </div>
              </div>
              <div className="col-4">
                <div className="row  no-gutters">
                  {makeFlag(DB.decks[17],flags.LJ)}
                  {makeFlag(DB.decks[18],flags.NORAD)}
                  {makeFlag(DB.decks[19],flags.BRDNL)}
                </div>
              </div>
              <div className="col-4">
                <div className="row justify-content-end no-gutters">
                  {makeFlag(DB.decks[29],flags.RD)}
                  {makeFlag(DB.decks[30],flags.NSWP)}
                  {makeFlag(DB.decks[31],flags.FINPL)}
                  {makeFlag(DB.decks[32],flags.YUCZE)}
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-4">
                <div className="row  no-gutters">
                  {makeFlag(DB.decks[0],flags.USA)}
                  {makeFlag(DB.decks[1],flags.UK)}
                  {makeFlag(DB.decks[2],flags.FRA)}
                  {makeFlag(DB.decks[3],flags.BRD)}
                </div>
              </div>
              <div className="col-4">
                <div className="row  no-gutters">
                  {makeFlag(DB.decks[4],flags.CAN)}
                  {makeFlag(DB.decks[5],flags.DEN)}
                  {makeFlag(DB.decks[6],flags.SWE)}
                </div>
              </div>
              <div className="col-4">
                <div className="row justify-content-end no-gutters">
                  {makeFlag(DB.decks[21],flags.DDR)}
                  {makeFlag(DB.decks[22],flags.USSR)}
                  {makeFlag(DB.decks[23],flags.POL)}
                  {makeFlag(DB.decks[24],flags.CZS)}
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-4">
                <div className="row  no-gutters">
                  {makeFlag(DB.decks[7],flags.NOR)}
                  {makeFlag(DB.decks[8],flags.ANZAC)}
                  {makeFlag(DB.decks[9],flags.JAP)}
                  {makeFlag(DB.decks[10],flags.ROK)}
                </div>
              </div>
              <div className="col-4">
                <div className="row  no-gutters">
                  {makeFlag(DB.decks[11],flags.NED)}
                  {makeFlag(DB.decks[12],flags.ISR)}
                </div>
              </div>
              <div className="col-4">
                <div className="row justify-content-end no-gutters">
                  {makeFlag(DB.decks[25],flags.PRC)}
                  {makeFlag(DB.decks[26],flags.DPRK)}
                  {makeFlag(DB.decks[27],flags.FIN)}
                  {makeFlag(DB.decks[28],flags.YU)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="row no-gutters">
              {DB.spec.map(makeSpec)}
            </div>
            <div className="row ">
              {DB.era.map(makeEra)}
            </div>
            <div className="row no-gutters">
              <div className="col-1">
            </div>
              <div className="col-8">
                {"+"+ Math.round((Deck.Deck.bonus-1) *100)  + "%, " + (Deck.Deck.Points + Deck.Era.bonus) + "AP"}
              </div>
              <div className="col-3">
                {Deck.PointPair.used + "/" + Deck.PointPair.max}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DeckSelector;