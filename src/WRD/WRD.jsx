import React, { useState,useEffect } from "react";
import DeckAssembly from "../js/Deck";
import DecodeHeader from "./DeckBuilder/DecodeHeader";
import DeckBuilder from "./DeckBuilder/DeckBuilder";
import DeckSelector from  "./DeckSelector";
import Database from "./Database/Database";
import _ from "lodash";
import { useParams, Redirect } from "react-router-dom"; 
import Header from "../Header";

function WRD({ Honey, API }) {

  let DB =  _.cloneDeep(Honey.DB); //honey DB is single units for DB, plain DB is loaded, for builder
                                //this will come back to bite me.
  DB.units.forEach(u=>{ //load transports into unit card
      u.Transporters = u.Transporters.map(e=>DB.units.find(ek=> ek.ID === e));
    }
  );
  let deckAPI = {}; //function holder. I don't have the energy to rewrite it into a reducer
  let params = useParams();
  deckAPI.setCode = API.setCode;
  //deck setters
  const [deck, setDeck] = useState(new DeckAssembly(DB));
  deckAPI.decode = code => {
    //set deck via deck code
    try {
      let newdeck = new DeckAssembly(DB);
      setDeck(newdeck.loadFromCode(code, DB));
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("deck decode error", 0, error);
    }
  };
  deckAPI.clear = () => {
    //set deck to empty
    let newdeck = new DeckAssembly(DB);
    setDeck(newdeck);
    deckAPI.setCode(newdeck.DeckCode);
  };
  deckAPI.setDeck = x => {
    try {
      let newdeck =  _.clone(deck);
      setDeck(newdeck.loadFromDB(x, DB));
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("deck set error", 0, error);
    }
  };
  deckAPI.randomFill = () => {
    try {
      let newdeck =  _.clone(deck).randomFill();
      setDeck(newdeck);
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("random fill error", 0, error);
    }
  };
  deckAPI.fullRandomFill = () => {
    try {
      let newdeck = new DeckAssembly(DB).fullRandomFill();
      setDeck(newdeck);
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("full random fill error", 0, error);
    }
  };
  deckAPI.setSpec = x => {
    try {
      let newdeck = _.clone(deck).setSpec(x);
      setDeck(newdeck);
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("income set error", 0, error);
    }
  };
  deckAPI.setEra = x => {
    try {
      let newdeck = _.clone(deck).setEra(x);
      setDeck(newdeck);
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("income set error", 0, error);
    }
  };

  useEffect(() => {
    if (params.code) {
      deckAPI.decode(params.code);
    }
  }, []);

  deckAPI.addUnit =( vet, unit, transport, boat)=> {
    try {
      let newdeck = _.clone(deck).addUnit( vet, unit, transport, boat);
      setDeck(newdeck);
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("addUnit error", 0, error);
    }
  };
  deckAPI.deleteUnit = x => {
    try {
      let newdeck = _.clone(deck).deleteUnit(x);
      setDeck(newdeck);
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("deleteUnit error", 0, error);
    }
  };    
  switch (params.Page) {
    case "DeckBuilder":     
        return (
            <>
                <div className="card">
                  <Header  DB={DB} API={deckAPI}/>
                </div>
                <DeckSelector DB={DB} Deck={deck} API={deckAPI}/>
                <DecodeHeader Deck={deck} API ={ deckAPI}/>
                <DeckBuilder DB={DB} Deck={deck} API={deckAPI} />
            </>
        );
    case "Database":
        return (
          <>
            <div className="card">
              <Header  DB={DB} decode={deckAPI.decode}/>
            </div>
            <Database DB={Honey.DB}/>
          </>
        );
    default:
        <Redirect to="/DeckBuilder" />
    }
}
export default WRD;
