import React, {useState} from "react";
//import { GunNoiseParser, TurretHeader } from "./AuxModules";
import ReactTooltip from "react-tooltip";
import amphib from "../../pics/icons/spec_amphibie.tgv.png"
import proto from "../../pics/icons/spec_commandement.tgv.png"
import command from "../../pics/icons/spec_radio.tgv.png"

function UnitModules({ x }) {
  let makeWeapon = (x, i)=>{
    //x.SalvoIsMainSalvo;
    //x.Salves;
    return(
      <div  key={i}>
        <div className="card">
          <div className="card-header" onClick={()=>harmonica(i)}>
            <div className="row">
              <ReactTooltip />
              <div className="col-4" data-tip={x.Type}>
                <b>{x.Name}</b>
              </div>
              <div className="col-4" data-tip="x salvos of y shots">
                {x.Caliber}, {x.NumberOfSalvos} x {x.ShotsPerSalvo}
              </div>
              <div className="col-4">
                AP:{x.AP?x.AP:"0"}/HE:{x.HE?x.HE:"0"}
              </div>
              <div className="col-4" data-tip={ x.HitProbability?"Static/moving" :"at min range/at max range" }>
                {
                  x.HitProbability?
                  ("Acc:" + x.HitProbability*100+"/"+x.HitProbabilityWhileMoving*100):
                  ("Area:" + x.DispersionAtMinRange+"/"+x.DispersionAtMaxRange)
                }
              </div>
              <div className="col-4" data-tip="salvo/shot">
                Reload: {x.TimeBetweenSalvos}s, {x.TimeBetweenShots}s
              </div>
              <div className="col-4">
                Aim: {x.AimTime}s
              </div>
              <div className="col-4" data-tip="ground/helo/air">{
                x.RangeGround?x.RangeGround:0}m/{
                x.RangeHelicopters?x.RangeHelicopters:0}m/{
                x.RangePlanes?x.RangePlanes:0}m
              </div>
              <div className="col-4">
                |{x.Tags}|
              </div>
              <div className="col-4" data-tip="ground/helo/air">Supply:{x.SupplyCost}
              </div>
            </div>
          </div>
          <div className={show === i ? "card-body" : "d-none" }>
            <ul>
              <ReactTooltip />
              <li>AngleDispersion: {+Math.round(x.AngleDispersion*1000)/1000}</li>
              <li>CanSmoke: {x.CanSmoke/* //: true,*/}</li>
              <li data-tip="ground/helo/air">Range, min:{
                x.RangeGroundMinimum?x.RangeGroundMinimum:0}/{
                x.RangeHelicoptersMinimum?x.RangeHelicoptersMinimum:0}/{
                x.RangePlanesMinimum?x.RangePlanesMinimum:0}
              </li>
              <li>CorrectedShotDispersionMultiplier: {x.CorrectedShotDispersionMultiplier/* //: null,*/}</li>
              <li data-tip="physical/suppress">Splash Damage: {x.RadiusSplashPhysicalDamage+"/"+x.RadiusSplashSuppressDamage}</li>
              <li>FireTriggeringProbability: {x.FireTriggeringProbability/* //: null,*/}</li>
              <li>Crit chance: {x.MinimalCritProbability}</li>
              <li>MinimalHitProbability: {x.MinimalHitProbability/* 0.05,*/}</li>
              <li>Noise: {x.Noise/* //: 250,*/}</li>
              {
                x.MissileMaxSpeed?
                  <li data-tip="Max speed/Acceleration/correction interval">
                    Missile speed:{x.MissileMaxSpeed+"/"+x.MissileMaxAcceleration + "/"+x.MissileTimeBetweenCorrections}
                  </li>:""
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
  const [show, setShow] = useState(-1);
  const harmonica = (x)=>{
    x === show ? setShow(-1) : setShow(x);
  }
  
  if (x != null) {
    return (
      <React.Fragment>
        <ReactTooltip />
        <div className="card">
          <div className="card-header" onClick={()=>harmonica("head")}>
            <div className="row">
              <div className="col-2">
                HP: {x.Strength}
              </div>
              <div className={x.Amphibious?"col-1":"d-none"} data-tip="Amphibious">
                <img src={amphib}></img>
              </div>
              <div className={x.IsCommandUnit?"col-1":"d-none"} data-tip="Command">
                <img src={command}></img>
              </div>
              <div className={x.IsPrototype?"col-1":"d-none"} data-tip="Prototype">
                <img src={proto}></img>
              </div>
              <div className="col-sm col-12" data-tip="Front/side/back/top">
                {x.ArmorFront==="FRAG"?"⊗":x.ArmorFront}/
                {x.ArmorSides==="FRAG"?"⊗":x.ArmorSides}/
                {x.ArmorRear==="FRAG"?"⊗":x.ArmorRear}/
                {x.ArmorTop==="FRAG"?"⊗":x.ArmorTop}
              </div>
              <div className="col-sm-6 col-12">
                <div className="row">
                  <div className="col-2 p-0"><span className={"badge " + x.Decks.includes("Motorized")?"badge-success":"badge-secondary"}>Mot</span></div>
                  <div className="col-2 p-0"><span className={"badge " + x.Decks.includes("Armored")?"badge-success":"badge-secondary"}>Arm</span></div>
                  <div className="col-2 p-0"><span className={"badge " + x.Decks.includes("Support")?"badge-success":"badge-secondary"}>Sup</span></div>
                  <div className="col-2 p-0"><span className={"badge " + x.Decks.includes("Marine")?"badge-success":"badge-secondary"}>Mar</span></div>
                  <div className="col-2 p-0"><span className={"badge " + x.Decks.includes("Mechanized")?"badge-success":"badge-secondary"}>Mec</span></div>
                  <div className="col-2 p-0"><span className={"badge " + x.Decks.includes("Airborne")?"badge-success":"badge-secondary"}>Air</span></div>
                </div>
              </div>
            </div>
            <div className="row">
              <ReactTooltip />
              <div className="col" data-tip="Normal/Road">
                Speed:{x.MaxSpeed+ (x.MovementType==="Wheeled"?"/150":x.MovementType==="Tracked"?"/110":"")}
              </div>
              <div className="col" data-tip="Ground/Air">
                Optics:{x.OpticalStrengthGround + "/"+ x.OpticalStrengthAir}
              </div>
              <div className="col" data-tip="Size/Stealth">
                Bonuses:{x.SizeModifier+1 + "/"+ x.Stealth}
              </div>
            </div>
          </div>
          <div className={show === "head" ? "card-body" : "d-none" }>
            <ul>
              <li>Size/ECM/Stealth: {x.SizeModifier+1+"/"+ x.ECM+"/"+x.Stealth}</li>
              <li>Movement type: {x.MovementType}</li>
              <li data-tip="Normal/Road/Acceleration/Deceleration">Speeds: {
                x.MaxSpeed+"/"+
                (x.MovementType==="Wheeled"?"150":x.MovementType==="Tracked"?"110":x.MaxSpeed)+
                "/"+x.MaxAcceleration+"/"+Math.round(x.MaxDeceleration*100)/100}
              </li>
              <li data-tip="Ground/Air/Radar/Range/Identify chance/dice roll interval">
                Optics:{x.OpticalStrengthGround + "/"+ x.OpticalStrengthAir + "/" +
                 x.OpticalStrengthAntiradar+"/"+x.PorteeVision+"/"+
                 x.IdentifyBaseProbability+"/"+Math.round(x.TimeBetweenEachIdentifyRoll*100)/100}
                </li>
              <li>Detection: {x.HelicopterDetectionRadius+"/"+x.AirToAirHelicopterDetectionRadius}</li>
              <li data-tip="morale regen/suppression to stun/suppression ceiling/morale damage on transport kill">
                Stun/Suppression:{x.StunDamageRegen+"/"+x.StunDamageToGetStunned+"/"+x.SuppressionCeiling + "/" +
                x.SuppressDamageRatioIfTransporterKilled +"%"}
              </li>
              {
                x.AirplaneMinimalAltitude?
                  <li data-tip="min/regular">
                    Altitude:{x.AirplaneMinimalAltitude+"/"+x.AirplaneFlyingAltitude}
                  </li>:""
              }
              {
                x.HelicopterHoverAltitude?
                  <li data-tip="min/regular/Takeoff speed">
                    Altitude:{x.HelicopterHoverAltitude+"/"+x.HelicopterFlyingAltitude + "/"+x.UpwardSpeed}
                  </li>:""
              }
              {x.FuelCapacity?<li>Fuel/autonomy:{x.FuelCapacity+"/"+x.Autonomy}</li>:""}
              {x.SupplyCapacity?<li>Supply/Priority:{x.SupplyCapacity+"/"+x.SupplyPriority}</li>:""}
              <li>Year: {x.Year}</li>
            </ul>
          </div>
          {x.Weapons.map((e,i)=>makeWeapon(e, i))}
        </div>
      </React.Fragment>
    );
  }
  return <div />;
}

export default UnitModules;
