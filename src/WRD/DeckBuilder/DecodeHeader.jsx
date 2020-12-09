import React, { useState } from "react";
import { useParams } from "react-router-dom";

function DecodeHeader({ Deck, API }) {  
    /*lets you type into the input without polluting the Deck object with false data*/
    const [code, setCode] = useState("");
    const [realCode, setRealCode] = useState(Deck.DeckCode);
    if (realCode !== Deck.DeckCode) {
      /*realCode is the actual deck code. code is just the shown one
       *when deckcode disagrees with realcode, the deck was changed, everything syncs*/
      setCode(Deck.DeckCode);
      setRealCode(Deck.DeckCode);
    }
    
    const [isFirst, setIsFirst] = useState(true);
    //let params = useParams();
    //if (isFirst && params.code) {
    //  API.decode(params.code);
    //  setIsFirst(false);
    //}
  
    let handleChange = event => {
      setCode(event.target.value);
    };
    return (
        <div className="card">
            <div className="row">
                <div className="col-xl-8 col-md-8 order-md-1 order-sm-3">
                  <input
                    className="form-control"
                    value={code}
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-xl-2 col-md-2 order-md-2 col-sm-6 order-sm-1">
                  <button className="btn btn-block btn-outline-primary" onClick={() => API.decode(code)}>
                    Decode
                  </button>
                </div>
                <div className="col-xl-2 col-md-2 order-md-3 col-sm-6  order-sm-2">
                  <button className="btn btn-block btn-outline-primary" onClick={() => API.clear()}>
                    Clear
                  </button>
                </div>
            </div>
        </div>
    );
  }
 export default DecodeHeader;  