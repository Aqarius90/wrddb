import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import CDRow from "./CDRow";
import UnitPanel from "./UnitPanel";
//import Randomizer from "./Randomizer";
import { useParams } from "react-router-dom";

function DeckBuilder({ DB, Deck, API }) {
  //the unit to show in right hand side
  const [sideShow, setSideShow] = useState(null);
  return (
    <div className="card">
      <Tabs className="card" defaultIndex={0}>
        <TabList>
          <Tab>Deck</Tab>
          <Tab>Logistics{Deck.Spec.bonus.LOG? ("+"+Deck.Spec.bonus.LOG):""}</Tab>
          <Tab>Infantry{Deck.Spec.bonus.INF?("+"+Deck.Spec.bonus.INF):""}</Tab>
          <Tab>Support{Deck.Spec.bonus.SUP?("+"+Deck.Spec.bonus.SUP):""}</Tab>
          <Tab>Tanks{Deck.Spec.bonus.TNK?("+"+Deck.Spec.bonus.TNK):""}</Tab>
          <Tab>Recon{Deck.Spec.bonus.REC?("+"+Deck.Spec.bonus.REC):""}</Tab>
          <Tab>Vehicles{Deck.Spec.bonus.VHC?("+"+Deck.Spec.bonus.VHC):""}</Tab>
          <Tab>Helicopters{Deck.Spec.bonus.HEL?("+"+Deck.Spec.bonus.HEL):""}</Tab>
          <Tab>Planes{Deck.Spec.bonus.PLA?("+"+Deck.Spec.bonus.PLA):""}</Tab>
          <Tab>Naval{Deck.Spec.bonus.NAV?("+"+Deck.Spec.bonus.NAV):""}</Tab>
          <Tab>Randomizer</Tab>
        </TabList>

        <TabPanel>
          <div className="card-body">
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.LOG} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.INF} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.SUP} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.TNK} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.REC} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.VHC} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.HEL} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.PLA} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.SHP} />
          </div>
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            tab={"LOG"}
            Index={0} //*for CardRow
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            tab={"INF"}
            Index={1}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            tab={"SUP"}
            Index={2}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            tab={"TNK"}
            Index={3}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            tab={"REC"}
            Index={4}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            tab={"VHC"}
            Index={5}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            tab={"HEL"}
            Index={6}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            tab={"PLA"}
            Index={7}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            tab={"SHP"}
            Index={8}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <div className="card-body">
            <div className="card-text row">
              <div className="col-2">
              </div>
              <div className="col-4">
                <button className="btn btn-primary btn-block" onClick={()=>API.randomFill()}>
                  Random fill
                </button>
              </div>
              <div className="col-4">
                <button className="btn btn-primary btn-block" onClick={()=>API.fullRandomFill()}>
                  Full random fill
                </button>
              </div>
              <div className="col-2">
              </div>
            </div>
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.LOG} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.INF} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.SUP} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.TNK} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.REC} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.VHC} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.HEL} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.PLA} />
            <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix.SHP} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
export default DeckBuilder;
