import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import flags from "./js/flags";

function Header({API, hide}) {
  let params = useParams();
  let history = useHistory();
  const [showUploadPanel, setUploadPanel] = useState(false);
  const [parsed, setParsed] = useState(null);

  function loadFile() {
    global.log("do loadfile");
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.onchange = handleFileSelect;
    fileSelector.setAttribute("multiple", "multiple");
    fileSelector.click();
  }
  function handleFileSelect(evt) {
    global.log("do handleFileSelect");
    let replayFile = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      let enc = new TextDecoder("utf-8");
      let blob = reader.result;
      let data = enc.decode(blob);
      data = parseReplay(data);
      //setParsed({ meta: data, blob: blob });
      setParsed(data);
      setUploadPanel(true);
    };
    reader.readAsArrayBuffer(replayFile);
  }
  function parseReplay(x) {
    global.log("do parseReplay");
    let HeaderStart = x.indexOf('"game"');
    let HeaderEnd = x.indexOf("}star");
    let header = x.slice(HeaderStart, HeaderEnd);
    header = JSON.parse("{" + header + "}"); //to valid JSON

    let headerArr = []; //[game, ...player]
    global.log("header", header)
    for (var key in header) {
      if (header.hasOwnProperty(key)) {
        headerArr.push(header[key]);
      }
    }
    let Game = [];
    let Players = [];
    for (let i = 0; i < headerArr.length; i++) {
      if (i === 0) {
        Game = headerArr[i];
      } else {
        if (headerArr[i].PlayerDeckContent) {
          Players.push(headerArr[i]);
        }
      }
    }
    return { h: Game, p: Players};
  }

  let setDeck=(x)=>{
    API.decode(x.PlayerDeckContent);
    setUploadPanel(false);
  }

  let makePlayer = (x, i)=>{
    return (
      <div className="row" key={i}>
        <div className="col-2">
          {x.PlayerName}
        </div>
        <div className="col">
          {x.PlayerDeckName}
        </div>
        <div className="col-2">
          <img
            className="table-flag"
            src={parseNation(x.PlayerDeckContent)}
            alt="flag"
          />
        </div>
        <div className="col-3">
          <button className="btn btn-primary btn-block" onClick={()=>setDeck(x)}>Decode</button>
        </div>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-xl-2 col-md-3">
        <div className="row">
          <div className="col-md-12 col-6">
            <button
              className="btn btn-primary btn-block"
              onClick={() =>
                history.push(
                    "/DeckBuilder" +
                    (params.code ? "/" + params.code : "")
                )
              }
              disabled={params.Page !== "DeckBuilder" ? false : true}
            >
              DeckBuilder
            </button>
          </div>
          <div className="col-md-12 col-6">
            <button
            className="btn btn-primary btn-block"
            onClick={() =>
              history.push(
                  "/Database" +
                  (params.code ? "/" + params.code : "")
              )
            }
            disabled={params.Page !== "Database" ? false : true}
          >
            Database
          </button>
          </div>
        </div>
      </div>
      <div className="col-xl-8 col-md-6 panel">
        <h1 align="center">
          Wargame Red Dragon Database
        </h1>
      </div>
      <div className="col-xl-2 col-md-3">
        <div className="row">
          <div className="col-md-12 col-6">
            <button className="btn btn-primary btn-block" onClick={()=>loadFile()}>Parse replay</button>
          </div>
          <div className="col-md-12 col-6">
          <button className="btn btn-outline-secondary btn-block d-md-none" onClick={hide}>Hide header</button>
          </div>
        </div>
      </div>
      <div className={showUploadPanel?"col-12":"d-none"}>
        {parsed && 
        <>
        <div className="row">
          <div className="col">{parsed.h.Map}</div>
          <div className="col">Starting income:{parsed.h.InitMoney}</div>
          <div className="col">Time limit:{parsed.h.TimeLimit}</div>
          <div className="col">Score limit:{parsed.h.ScoreLimit}</div>
          <div className="col">Income:{parsed.h.IncomeRate}</div>
        </div>
        {parsed.p.map((e, i)=>makePlayer(e, i))}
        </>
        }
      </div>
    </div>
  );
}

function parseNation(code){
  global.log("do parseNation");
  switch (code.slice(0,3)) {    
    case "@AM": return flags.USA;
    case "@As": return flags.UK;
    case "@BM": return flags.FRA;
    case "@Bs": return flags.BRD;
    case "@CM": return flags.CAN;
    case "@Cs": return flags.DEN;
    case "@DM": return flags.SWE;
    case "@Ds": return flags.NOR;
    case "@EM": return flags.ANZAC;
    case "@Es": return flags.JAP;
    case "@FM": return flags.ROK;
    case "@Fs": return flags.NED;
    case "@GM": return flags.ISR;
    case "@Hg": return flags.EU;
    case "@Hh": return flags.SCA;
    case "@Hi": return flags.COM;
    case "@Hj": return flags.BD;
    case "@Hm": return flags.LJ;
    case "@Ho": return flags.NORAD;
    case "@Hp": return flags.BRDNL;
    case "@Hs": return flags.NATO;
    case "@QM": return flags.DDR;
    case "@Qs": return flags.USSR;
    case "@RM": return flags.POL;
    case "@Rs": return flags.CZS;
    case "@SM": return flags.PRC;
    case "@Ss": return flags.DPRK;
    case "@TM": return flags.FIN;
    case "@Ts": return flags.YU;
    case "@Uk": return flags.RD;
    case "@Ul": return flags.NSWP;
    case "@Uq": return flags.FINPL;
    case "@Ur": return flags.YUCZE;
    case "@Us": return flags.REDFOR;
  }
}

export default Header;
