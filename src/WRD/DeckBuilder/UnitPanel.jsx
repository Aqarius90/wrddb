import React, { useState } from "react";
import { getPortrait} from "../../js/GUIparsers";
import CDRow from "./CDRow";
import UnitDisplay from "./UnitDisplay";
import flags from "../../js/flags";

function UnitPanel({ Deck, API, tab, sideShow, setShow }) {
  return (
    <div className="card-body pb-0">
      <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix[tab]} show={setShow} API={API} />
      <div className="row vh-100">
        <UnitList UnitPairs={Deck.Pairs[tab]} show={setShow} />
        <UnitDisplay Deck={Deck} Pack={sideShow} vetBonus={Deck.Spec.bonus[tab]} show={setShow} add={API.addUnit} />
      </div>
    </div>
  );
}

function UnitList({ UnitPairs, show }) {
  let makeUnitEntry = (x, index) => {
    if (x.transport) {
      return (
        <tr key={index} onClick={() => show(x)}>
          <td><img className="table-flag" src={flags[x.unit.MotherCountry]} alt="table-flag" /></td>
          <td>{getPortrait(x.unit, "table-unit")}</td>
          <td className="txt-cdrow">{x.unit.Name}</td>
          <td className="txt-cdrow text-center">{x.unit.Price}</td>
          <td className="txt-cdrow text-center">{x.unit.MaxPacks}</td>
          <td>{getPortrait(x.transport, "table-unit")}</td>
          <td className="txt-cdrow">{x.transport.Name}</td>
          <td className="txt-cdrow text-center">{x.transport.Price}</td>
          <td className="txt-cdrow text-center">{x.transport.MaxPacks}</td>
        </tr>
      );
    }
    return (
      <tr key={index} onClick={() => show(x)}>
        <td><img className="table-flag" src={flags[x.unit.MotherCountry]} alt="table-flag" /></td>
        <td>{getPortrait(x.unit, "table-unit")}</td>
        <td className="txt-cdrow">{x.unit.Name}</td>
        <td className="txt-cdrow text-center">{x.unit.Price}</td>
        <td className="txt-cdrow text-center">{x.unit.MaxPacks}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  };
  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState(true);
  function compare(a, b) {
    if (order) {
      return a > b ? 1 : a < b ? -1 : 0;
    }
    return a > b ? -1 : a < b ? 1 : 0;
  }
  function setSortValue(x) {
    if (sort === x) {
      setOrder(!order);
    } else {
      setSort(x);
    }
  }

  console.log("test")
  switch (sort) {
    case null:
      break;
    case "Unit":
      UnitPairs.sort((a, b) => compare(a.unit.Name, b.unit.Name));
      break;
    case "Points":
      UnitPairs.sort((a, b) =>  compare(a.unit.Price, b.unit.Price));
      break;
    case "Cards":
      UnitPairs.sort((a, b) => compare(a.unit.MaxPacks, b.unit.MaxPacks));
      break;
    case "Trans":
      UnitPairs.sort((a, b) =>
        compare(a.transport ? a.transport.Name : 0, b.transport ? b.transport.Name : 0)
      );
      break;
    case "tPoints":
      UnitPairs.sort((a, b) =>compare(a.transport ? a.transport.Price : 0,b.transport ? b.transport.Price : 0));
      break;
    case "tCards":
      UnitPairs.sort((a, b) => compare(a.transport ? a.transport.MaxPacks: 0,b.transport ?  b.transport.MaxPacks:0));
      break;
    default:
      global.throw("sortError", sort);
      break;
  }
  return (
    <div className="card popup-unit-panel overflow-auto vh-100">
      <div className="card-body">
        <table className="sortable table-sm p-0 m-0">
          <tbody>
            <tr>
              <th>Nation⇓</th>
              <th></th>
              <th onClick={() => setSortValue("Unit")}> Unit⇓</th>
              <th onClick={() => setSortValue("Points")}>Points⇓</th>
              <th onClick={() => setSortValue("Cards")}>Cards⇓</th>
              <th></th>
              <th onClick={() => setSortValue("Trans")}>Transport⇓</th>
              <th onClick={() => setSortValue("tPoints")}>Points⇓</th>
              <th onClick={() => setSortValue("tCards")}>Cards⇓</th>
            </tr>
            {UnitPairs.map(makeUnitEntry)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnitPanel;
