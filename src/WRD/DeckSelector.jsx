import React from "react";
import flags from "../js/flags";

function DeckSelector({DB, Deck, API}){
  let makeFlag=(wide,x,pic, thin) =>{
    let css = Deck.Deck.nations.includes(x.Nation) || Deck.Deck.Nation === x.Nation?"w-100" : "w-100 gray";
    css = Deck.Deck.Nation ==="NATO" && !x.Side ? "w-100":css
    css = Deck.Deck.Nation ==="REDFOR" && x.Side ? "w-100":css
    //horrible hacks to get the layout right
    let grid = wide?"col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-8":
      "col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12 ";
    grid = thin?"col-xl-1 col-lg-2 col-md-2 col-sm-3 col-xs-4": grid;
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
      <div className="col-xl-3 col-lg-6 col-sm-3" key={x.str}>
        <button className={css}  onClick={()=>API.setSpec(x)}>{x.BTN}</button>
      </div>
    )
  }
  let makeEra=(x)=>{
    let css = x.code === Deck.Era.code? "btn btn-block btn-success rounded-0" : "btn btn-block" 
    return (
      <div className="col-sm-4" key={x.str}>
        <button className={css} onClick={()=>API.setEra(x)}>{x.str}</button>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="card">
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="row no-gutters">
              {makeFlag(false, DB.decks[20],flags.NATO, true)}
              <div className="col-xl-10 col-lg-8 col-md-8 col-sm-6 col-xs-4">
                
              </div>
              {makeFlag(false, DB.decks[33],flags.REDFOR, true)}
            </div>
            <div className="row no-gutters">
              <div className="col-md-4 col-sm-3">
                <div className="row  no-gutters">
                  {makeFlag(false, DB.decks[13],flags.EU)}
                  {makeFlag(false, DB.decks[14],flags.SCA)}
                  {makeFlag(false, DB.decks[15],flags.COM)}
                  {makeFlag(false, DB.decks[16],flags.BD)}
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="row  no-gutters">
                  {makeFlag(false, DB.decks[17],flags.LJ)}
                  {makeFlag(false, DB.decks[18],flags.NORAD)}
                  {makeFlag(false, DB.decks[19],flags.BRDNL)}
                </div>
              </div>
              <div className="col-sm-3 d-md-none"></div>
              <div className="col-md-4 col-sm-3">
                <div className="row  no-gutters">
                  {makeFlag(false, DB.decks[29],flags.RD)}
                  {makeFlag(false, DB.decks[30],flags.NSWP)}
                  {makeFlag(false, DB.decks[31],flags.FINPL)}
                  {makeFlag(false, DB.decks[32],flags.YUCZE)}
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-md-4 col-sm-3">
                <div className="row  no-gutters">
                  {makeFlag(false, DB.decks[0],flags.USA)}
                  {makeFlag(false, DB.decks[1],flags.UK)}
                  {makeFlag(false, DB.decks[2],flags.FRA)}
                  {makeFlag(false, DB.decks[3],flags.BRD)}
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="row  no-gutters">
                  {makeFlag(false, DB.decks[4],flags.CAN)}
                  {makeFlag(false, DB.decks[5],flags.DEN)}
                  {makeFlag(false, DB.decks[6],flags.SWE)}
                </div>
              </div>
              <div className="col-sm-3 d-md-none"></div>
              <div className="col-md-4 col-sm-3">
                <div className="row  no-gutters">
                  {makeFlag(false,DB.decks[21],flags.DDR)}
                  {makeFlag(false,DB.decks[22],flags.USSR)}
                  {makeFlag(false,DB.decks[23],flags.POL)}
                  {makeFlag(false,DB.decks[24],flags.CZS)}
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-md-4 col-sm-3">
                <div className="row  no-gutters">
                  {makeFlag(false,DB.decks[7],flags.NOR)}
                  {makeFlag(false,DB.decks[8],flags.ANZAC)}
                  {makeFlag(false,DB.decks[9],flags.JAP)}
                  {makeFlag(false,DB.decks[10],flags.ROK)}
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="row  no-gutters">
                  {makeFlag(false,DB.decks[11],flags.NED)}
                  {makeFlag(false,DB.decks[12],flags.ISR)}
                </div>
              </div>
              <div className="col-sm-3 d-md-none"></div>
              <div className="col-md-4 col-sm-3">
                <div className="row  no-gutters">
                  {makeFlag(false,DB.decks[25],flags.PRC)}
                  {makeFlag(false,DB.decks[26],flags.DPRK)}
                  {makeFlag(false,DB.decks[27],flags.FIN)}
                  {makeFlag(false,DB.decks[28],flags.YU)}
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