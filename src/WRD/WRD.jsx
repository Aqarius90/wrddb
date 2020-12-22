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
  const [DB,setDB] = useState(null);
  //const deckAPI = {};//function holder. I don't have the energy to rewrite it into a reducer
  const deckAPI ={};
  deckAPI.setCode = API.setCode;
  let params = useParams();
  const [deck, setDeck] = useState(null);
  const [hide, setHide] = useState(false); //hides the header, not important
  //deck setters
  deckAPI.decode = code => {
    //set deck via deck code
    try {
      let newdeck = new DeckAssembly(DB);
      setDeck(newdeck.loadFromCode(code));
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
      setDeck(newdeck.loadFromDB(x));
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

  useEffect(() => {
    let DatB =  _.cloneDeep(Honey.DB); //format DB for builder
    DatB.units.forEach(u=>{ //load transports into unit card
        u.Transporters = u.Transporters.map(e=>DatB.units.find(ek=> ek.ID === e));
      }
    );    
    setDB(DatB);
    if (params.code) {  
      try {
        let newdeck = new DeckAssembly(DatB);
        setDeck(newdeck.loadFromCode(params.code));
        API.setCode(newdeck.DeckCode);
      } catch (error) {
        global.throw("deck decode error", 0, error);
      }
    } else {
      setDeck(new DeckAssembly(DatB))
    }
  }, []);
  if (!DB) {
    return (
      <div className="card">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  } 
  switch (params.Page) {
    case "DeckBuilder":     
        return (
            <>
                <div className="card">
                  <Header API={deckAPI} hide={()=>setHide(!hide)}/>
                </div>
                <div className={hide?"d-none":""}>
                  <DeckSelector DB={DB} Deck={deck} API={deckAPI}/>
                  <DecodeHeader Deck={deck} API ={ deckAPI}/>
                </div>
                <DeckBuilder DB={DB} Deck={deck} API={deckAPI} />
            </>
        );
    case "Database":
        return (
          <>
            <div className="card">
              <Header API={deckAPI} hide={()=>setHide(!hide)}/>
            </div>
            <Database DB={Honey.DB}/>
          </>
        );
    default:
        <Redirect to="/DeckBuilder" />
    }
}
export default WRD;
