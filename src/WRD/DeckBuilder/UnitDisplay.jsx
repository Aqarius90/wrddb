import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UnitHeader from "./UnitHeader";
import UnitModules from "./UnitModules";

function UnitDisplay({Deck, Pack, vetBonus, show, add }) {
  if (Pack === null || Pack === undefined) {
    return <div />;
  } else {
    if (Pack.transport) {
      return (
        <Tabs className="card popup-unit">
          <TabList>
            <Tab>Unit</Tab>
            <Tab>Transport</Tab>
          </TabList>
          <TabPanel>
            <UnitHeader Deck={Deck} Unit={Pack.unit} Pack={Pack} show={show} add={add} vetBonus={vetBonus}/>
            <UnitModules x={Pack.unit} />
          </TabPanel>
          <TabPanel>
            <UnitHeader Deck={Deck} Unit={Pack.transport} Pack={Pack} show={show} add={add} vetBonus={vetBonus}/>
            <UnitModules x={Pack.transport} />
          </TabPanel>
        </Tabs>
      );
    }
    return (
      <div className="card popup-unit">
        <UnitHeader Deck={Deck} Unit={Pack.unit} Pack={Pack} show={show} add={add} />
        <UnitModules x={Pack.unit} />
      </div>
    );
  }
}
export default UnitDisplay;
