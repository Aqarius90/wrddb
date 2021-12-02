import _ from "lodash";
import pako from "pako";
import data from '../final_data.json';
import firebase from "./Firestore";
import { v4 } from 'uuid';

export default function UpdateDB() {
    console.log("wait for compile");

    //debloat(data);
    var dat = pako.deflate(JSON.stringify(debloat(data)), { to: "string" });
    firebase
      .firestore()
      .collection("zip")
      .doc("WRD")
      .set({ dat })
      .catch(function(error) {
        console.error("Set error: ", error);
      })
      .then(() => {
        console.log("WRD update");
      });
}

function debloat(x){
  x.forEach(
    e=>{
      e.uuid = v4();
      e.avail = [
        e.RookieDeployableAmount,
        e.TrainedDeployableAmount,
        e.HardenedDeployableAmount,
        e.VeteranDeployableAmount,
        e.EliteDeployableAmount
      ];
      delete e.RookieDeployableAmount;
      delete e.TrainedDeployableAmount;
      delete e.HardenedDeployableAmount;
      delete e.VeteranDeployableAmount;
      delete e.EliteDeployableAmount;

      e.ArmorFront = e.ArmorFrontSplashResistant? "FRAG" : e.ArmorFront;
      e.ArmorSides = e.ArmorSidesSplashResistant? "FRAG" : e.ArmorSides;
      e.ArmorRear = e.ArmorRearSplashResistant? "FRAG" : e.ArmorRear;
      e.ArmorTop = e.ArmorTopSplashResistant? "FRAG" : e.ArmorTop;
      delete e.ArmorFrontSplashResistant;
      delete e.ArmorSidesSplashResistant;
      delete e.ArmorRearSplashResistant;
      delete e.ArmorTopSplashResistant;
      e.Transporters = e.Transporters.split("|").map(el=>parseInt(el));
      //e.Transporters = e.Transporters.map(el=>x.find(ek=>ek.ID === el));
      //e.Name = e.IsCommandUnit? "⍟ " + e.Name: e.Name; //nope, all wrong
      e.Name = e.Tab ==="LOG" && !e.SupplyCapacity? "⍟ " + e.Name: e.Name;
      e.IsCommandUnit = e.Tab ==="LOG" && !e.SupplyCapacity;
      e.Name = e.Optics ==="Good"? e.Name+" ⚯" :e.Name;
      e.Name = e.Optics ==="Very Good"? e.Name+" [⚯]":e.Name;
      e.Name = e.Optics ==="Exceptional"? e.Name+" [|⚯|]":e.Name;
      delete e.Salves;
      delete e.SalvoIsMainSalvo;
    }
  )
  x.forEach(
    e=>{
      e.Weapons = [{},{},{},{},{},{},{},{},{},{},{}]
      Object.keys(e).forEach( key =>{
        if (key.includes("Weapon11")){
          e.Weapons[10][key.slice(8)] = e[key];
          delete e[key];
        } else if (key.includes("Weapon10")){
          e.Weapons[9][key.slice(8)] = e[key];
          delete e[key];
        } else if (key.includes("Weapon9")){
          e.Weapons[8][key.slice(7)] = e[key];
          delete e[key];
        } else if (key.includes("Weapon8")){
          e.Weapons[7][key.slice(7)] = e[key];
          delete e[key];
        } else if (key.includes("Weapon7")){
          e.Weapons[6][key.slice(7)] = e[key];
          delete e[key];
        } else if (key.includes("Weapon6")){
          e.Weapons[5][key.slice(7)] = e[key];
          delete e[key];
        } else if (key.includes("Weapon5")){
          e.Weapons[4][key.slice(7)] = e[key];
          delete e[key];
        } else if (key.includes("Weapon4")){
          e.Weapons[3][key.slice(7)] = e[key];
          delete e[key];
        } else if (key.includes("Weapon3")){
          e.Weapons[2][key.slice(7)] = e[key];
          delete e[key];
        } else if (key.includes("Weapon2")){
          e.Weapons[1][key.slice(7)] = e[key];
          delete e[key];
        } else if (key.includes("Weapon1")){
          e.Weapons[0][key.slice(7)] = e[key];
          delete e[key];
        }
      })
      e.Weapons= e.Weapons.filter(x => x.Name);// if has name, exists
      e.Weapons.forEach(w=>{
        w.unitClassNameForDebug = e.ClassNameForDebug;
        w.unitName = e.Name;
      })
    }
  )
  x.forEach(
    e=>{
      delete e["FIELD1"];
      e.Nationalite = e.Nationalite? 1 : 0; //blame residentmario
      Object.keys(e).forEach( key => {
        if(e[key] === ''){ delete e[key]}
      })
      switch(e.MotherCountry){
        case "ANZAC":
          e.MotherCountry = "ANZAC";
          break;
        case "West Germany":
          e.MotherCountry = "BRD";
          break;
        case "Canada":
          e.MotherCountry = "CAN";
          break;
        case "Czechoslavakia":
          e.MotherCountry = "CZS";
          break;
        case "East Germany":
          e.MotherCountry = "DDR";
          break;
        case "Denmark":
          e.MotherCountry = "DEN";
          break;
        case "North Korea":
          e.MotherCountry = "DPRK";
          break;
        case "Finland":
          e.MotherCountry = "FIN";
          break;
        case "France":
          e.MotherCountry = "FRA";
          break;
        case "Israel":
          e.MotherCountry = "ISR";
          break;
        case "Japan":
          e.MotherCountry = "JAP";
          break;
        case "The Netherlands":
          e.MotherCountry = "NED";
          break;
        case "Norway":
          e.MotherCountry = "NOR";
          break;
        case "Poland":
          e.MotherCountry = "POL";
          break;
        case "China":
          e.MotherCountry = "PRC";
          break;
        case "South Korea":
          e.MotherCountry = "ROK";
          break;
        case "Sweden":
          e.MotherCountry = "SWE";
          break;
        case "United Kingdom":
          e.MotherCountry = "UK";
          break;
        case "United States":
          e.MotherCountry = "USA";
          break;
        case "Soviet Union":
          e.MotherCountry = "USSR";
          break;
        case "Yugoslavia":
          e.MotherCountry = "YU";
          break;
      }
    }
  ) 
  //deprec
  x = x.filter(e=>!(["PETIT BATO", "Trabant01", "SoldatUSLe", "ldatUSLege", "SoldatUSLo", "AH-1 COBRA", "AH-1 COBRA SIDEWINDER", "HN-5C Truck","SoldatAlle","Mi-24"].includes(e.Name)));
  let decks = [
    {code:12, Side:0, Points:15, bonus:1.10, Nation: "USA", nations:["USA"]},
    {code:44, Side:0, Points:15, bonus:1.20, Nation: "UK", nations:["UK"]},
    {code:76, Side:0, Points:15, bonus:1.20, Nation: "FRA", nations:["FRA"]},
    {code:108, Side:0, Points:15, bonus:1.20, Nation: "BRD", nations:["BRD"]},
    {code:140, Side:0, Points:15, bonus:1.40, Nation: "CAN", nations:["CAN"]},
    {code:172, Side:0, Points:15, bonus:1.40, Nation: "DEN", nations:["DEN"]},
    {code:204, Side:0, Points:15, bonus:1.30, Nation: "SWE", nations:["SWE"]},
    {code:236, Side:0, Points:15, bonus:1.40, Nation: "NOR", nations:["NOR"]},
    {code:268, Side:0, Points:15, bonus:1.30, Nation: "ANZAC", nations:["ANZAC"]},
    {code:300, Side:0, Points:15, bonus:1.30, Nation: "JAP", nations:["JAP"]},
    {code:332, Side:0, Points:15, bonus:1.30, Nation: "ROK", nations:["ROK"]},
    {code:364, Side:0, Points:15, bonus:1.30, Nation: "NED", nations:["NED"]},
    {code:396, Side:0, Points:15, bonus:1.20, Nation: "ISR", nations:["ISR"]},
    {code:480, Side:0, Points:10, bonus:1.0, Nation: "Eurocorps", nations:["FRA", "BRD"]},
    {code:481, Side:0, Points:10, bonus:1.15, Nation: "Scandinavia", nations:["DEN", "SWE","NOR"]},
    {code:482, Side:0, Points:10, bonus:1.0, Nation: "Commonwealth", nations:["UK", "CAN", "ANZAC"]},
    {code:483, Side:0, Points:10, bonus:1.20, Nation: "Blue Dragons", nations:["JAP","ROK"]},
    {code:486, Side:0, Points:10, bonus:1.15, Nation: "Landjut", nations:["BRD", "DEN"]},
    {code:488, Side:0, Points:10, bonus:1.0, Nation: "NORAD", nations:["USA", "CAN"]},
    {code:489, Side:0, Points:10, bonus:1.10, Nation: "BRDNL", nations:["BRD", "NED"]},
    {code:492, Side:0, Points:0, bonus:1.0, Nation: "NATO", nations:[]},
    {code:12, Side:1, Points:15, bonus:1.20, Nation: "DDR", nations:["DDR"]},
    {code:44, Side:1, Points:15, bonus:1.10, Nation: "USSR", nations:["USSR"]},
    {code:76, Side:1, Points:15, bonus:1.20, Nation: "POL", nations:["POL"]},
    {code:108, Side:1, Points:15, bonus:1.30, Nation: "CZS", nations:["CZS"]},
    {code:140, Side:1, Points:15, bonus:1.30, Nation: "PRC", nations:["PRC"]},
    {code:172, Side:1, Points:15, bonus:1.40, Nation: "DPRK", nations:["DPRK"]},
    {code:204, Side:1, Points:15, bonus:1.20, Nation: "FIN", nations:["FIN"]},
    {code:236, Side:1, Points:15, bonus:1.15, Nation: "YU", nations:["YU"]},
    {code:292, Side:1, Points:10, bonus:1.20, Nation: "Red Dragons", nations:["PRC","DPRK"]},
    {code:293, Side:1, Points:10, bonus:1.0, Nation: "NSWP", nations:["DDR","POL","CZS"]},
    {code:298, Side:1, Points:10, bonus:1.10, Nation: "FINPOL", nations:["POL","FIN"]},
    {code:299, Side:1, Points:10, bonus:1.0, Nation: "Entente", nations:["CZS","YU"]},
    {code:300, Side:1, Points:0, bonus:1.0, Nation: "REDFOR", nations:[]}
  ];
  let spec = [
    {
      code:0,str:"Motorized",bonus:{INF:1,REC:1,VHC:1},BTN:"MOT",
      matrix:{
        LOG:[1,2,2,2,3],
        INF:[1,1,1,1,2,1,1],
        SUP:[1,2,2,2,3],
        TNK:[1,2,2,2,3],
        REC:[1,1,1,1,2,1,1],
        VHC:[1,1,1,1,2,1,1],
        HEL:[1,2,2,3,3],
        PLA:[1,2,3,4,5],
        SHP:[0,0,0,0,0]}
      },
      {
        code:1,str:"Armored",bonus:{TNK:2},BTN:"ARM",
        matrix:{
          LOG:[1,2,2,2,3],
          INF:[1,2,2,2,3],
          SUP:[1,2,2,2,3],
          TNK:[1,1,1,1,2,1,1,1,1],
          REC:[1,2,2,2,3],
          VHC:[1,2,2,2,3],
          HEL:[1,2,2,3,3],
          PLA:[1,2,3,4,5],
          SHP:[0,0,0,0,0]
        }
      },
      {
        code:2,str:"Support",bonus:{LOG:1,SUP:1},BTN:"SUP",
        matrix:{
          LOG:[1,1,1,1,2,1,1,1,1],
          INF:[1,2,2,2,3],
          SUP:[1,1,1,1,2,1,1,1,1],
          TNK:[1,2,2,2,3],
          REC:[1,2,2,2,3],
          VHC:[1,2,2,2,3],
          HEL:[1,2,2,3,3],
          PLA:[1,2,3,4,5],
          SHP:[0,0,0,0,0]
        }
      },
      {
        code:3,str:"Marine",bonus:{INF:1,PLA:1},BTN:"MAR",
        matrix:{
          LOG:[1,2,2,2,3],
          INF:[1,1,1,1,2,1,1],
          SUP:[1,2,2,2,3],
          TNK:[1,2,2,2,3],
          REC:[1,2,2,2,3],
          VHC:[1,2,2,2,3],
          HEL:[1,2,2,3,3],
          PLA:[1,1,2,3,4,1,1],
          SHP:[0,0,0,0,0,0,0,0]
        }
      },
      {
        code:4,str:"Mechanized",bonus:{INF:1,VHC:1},BTN:"MECH",
        matrix:{
          LOG:[1,2,2,2,3],
          INF:[1,1,1,1,2,1,1,1,1],
          SUP:[1,2,2,2,3],
          TNK:[1,2,2,2,3],
          REC:[1,2,2,2,3],
          VHC:[1,1,1,1,2,1,1,1,1],
          HEL:[1,2,2,3,3],
          PLA:[1,2,3,4,5],
          SHP:[0,0,0,0,0]
        }
      },
      {
        code:5,str:"Airborne",bonus:{INF:1,HEL:1,PLA:1},BTN:"AIR",
        matrix:{
          LOG:[1,2,2,2,3],
          INF:[1,1,1,1,2,1,1,1,1],
          SUP:[1,2,2,2,3],
          TNK:[1,2,2,2,3],
          REC:[1,2,2,2,3],
          VHC:[1,2,2,2,3],
          HEL:[1,1,1,2,2,1,1,1,1],
          PLA:[1,1,2,3,4,1,1,1,1],
          SHP:[0,0,0,0,0]
        }
      },
      {
        code:6,str:"Naval",bonus:{},BTN:"NAV",
        matrix:{
          LOG:[],
          INF:[],
          SUP:[],
          TNK:[],
          REC:[],
          VHC:[],
          HEL:[],
          PLA:[],
          SHP:[0,0,0,0,0,0,0,0,0]
        }
      },
      {
        code:7,str:"General",bonus:{},BTN:"GEN",
        matrix:{
          LOG:[1,2,2,2,3],
          INF:[1,2,2,2,3],
          SUP:[1,2,2,2,3],
          TNK:[1,2,2,2,3],
          REC:[1,2,2,2,3],
          VHC:[1,2,2,2,3],
          HEL:[1,2,2,3,3],
          PLA:[1,2,3,4,5],
          SHP:[0,0,0,0,0]
        }
      }
  ];
  let era = [
    {code:0, str:"C", bonus:10, year:1980},
    {code:1, str:"B", bonus:5, year:1985},
    {code:2, str:"A", bonus:0, year:9001}
  ];

  /*add FOBs*/
  [
    ["USA",791,0],
    ["UK",794,0],
    ["FRA",789,0],
    ["BRD",792,0],
    ["CAN",787,0],
    ["DEN",788,0],
    ["SWE",793,0],
    ["NOR",790,0],
    ["ANZAC",834,0],
    ["JAP",835,0],
    ["ROK",836,0],
    ["NED",1015,0],
    ["ISR",1113,0],
    ["DDR",617,1],
    ["USSR",618,1],
    ["POL",616,1],
    ["CZS",615,1],
    ["PRC",637,1],
    ["DPRK",638,1],
    ["FIN",976,1],
    ["YU",977,1]
  ].forEach(e=> x.push({
    ArmorFront: "FRAG",
    ArmorRear: "FRAG",
    ArmorSides: "FRAG",
    ArmorTop: "FRAG",
    ClassNameForDebug: "Unit_FOB",
    DeckID: e[1],
    MaxPacks: 2,
    MotherCountry: e[0],
    Name: "FOB",
    Nationalite: e[2],
    Price: 70,
    Strength: 20,
    SupplyCapacity: 16000,
    Tab: "LOG",
    Year: 1975,
    Transporters: [],
    Decks: "Mechanized|Motorized|Armored|Marine|Airborne|Support",
    avail: [1,0,0,0,0],
    Weapons: [],
    uuid : v4()
  }));
  
  console.log({decks:decks, units: x, spec:spec, era:era})
  return {decks:decks, units: x, spec:spec, era:era};
}
