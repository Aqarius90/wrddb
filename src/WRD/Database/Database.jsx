import React, { useState } from "react";
import UnitDB from "./UnitDB";
import WeaponDB from "./WeaponDB";


function Database({ DB }) {
    const [thisDB, setThisDB] = useState("u");
    const [allUnits, setAllUnits] = useState(DB.units);
    let guns = [];
    DB.units.forEach( e=>e.Weapons.forEach(w=>guns.push(w)));
    const [allWeapons, setAllWeapons] = useState(guns);
  
    function getDB() {
      switch (thisDB) {
        case "u":
          if (allUnits) {
            return <UnitDB allUnits={allUnits} />;
          }
          break;
        case "w":
          if (allWeapons) {
            return <WeaponDB allWeapons={allWeapons} />;
          }
          break;
        default:
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
    }  
    return (
      <React.Fragment>
        <div className="card">
          <div className="row">
            <div className="col">
              <button className="btn btn-block btn-outline-dark" onClick={() => setThisDB("u")}>
                Units
              </button>
            </div>
            <div className="col">
              <button className="btn btn-block btn-outline-dark" onClick={() => setThisDB("w")}>
                Weapons
              </button>
            </div>
          </div>
        </div>
        {getDB()}
      </React.Fragment>
    );
    //<DeckSelector DB={DB} Deck={deck} API={{}}/>
  }
  
  export function FilterField({ items, set }) {
    const [str, setstr] = useState("");
    let handleChange = (event) => {
      setstr(event.target.value);
    };
  
    function searchObj(obj, query) {
        return(query.split(" ").every(e=>JSON.stringify(obj).toLowerCase().includes(e.toLowerCase())));
    }
  
    let lookup = (str) => {
      let u = [];
      items.forEach((e) => {
        if (searchObj(e, str)) {
          u.push(e);
        }
      });
      set(u);
    };
    return (
      <div className="row">
        <div className="col-10">
          <input className="form-control" value={str} type="text" onChange={handleChange} />
        </div>
        <div className="col-2">
          <button className="btn btn-block" onClick={() => lookup(str)}>
            Filter
          </button>
        </div>
      </div>
    );
  }
  
  export default Database;
  