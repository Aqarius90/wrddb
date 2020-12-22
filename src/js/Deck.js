import { parseToBin, parseFromBin } from "./binparsers";
import _ from "lodash";

class DeckAssembly{
    constructor(DB){
        this.Deck = {code:0, Side :0, Nation:"none", nations:[]};
        this.DB = DB;
        this.Spec = DB.spec[7];
        this.Era = DB.era[2];
        this.baseDeckPoints = 45;    
        this.fullUnits = [];//potential
        this.Units = []; //available, units and transports (.IsTransporter)
        this.Cards = []; //used
        this.Pairs = {LOG:[],INF:[],SUP:[],TNK:[],REC:[],VHC:[],HEL:[],PLA:[],SHP:[]};
    }

    get DeckCode(){
        let BinaryOut = "0";
        BinaryOut += this.Deck.Side;
        BinaryOut += this.Deck.code.toString(2).padStart(10, "0");
        BinaryOut += this.Spec.code.toString(2).padStart(3, "0");
        BinaryOut += this.Era.code.toString(2).padStart(2, "0");
        let s3c = this.Cards.filter(e=>e.boat);
        let s2c = this.Cards.filter(e=>e.transport);
        let s1c = this.Cards.filter(e=>!e.transport);
        BinaryOut += s3c.length.toString(2).padStart(4, "0");
        BinaryOut += s2c.length.toString(2).padStart(5, "0");
        s3c.forEach(e=>{
            BinaryOut+=this.deNormalizeVet(e,e.vet, this.Spec).toString(2).padStart(3, "0");
            BinaryOut+=e.unit.DeckID.toString(2).padStart(10, "0");
            BinaryOut+=e.transport.DeckID.toString(2).padStart(11, "0");
            BinaryOut+=e.boat.DeckID.toString(2).padStart(11, "0");
        })
        s2c.forEach(e=>{
            BinaryOut+=this.deNormalizeVet(e,e.vet, this.Spec).toString(2).padStart(3, "0");
            BinaryOut+=e.unit.DeckID.toString(2).padStart(11, "0");
            BinaryOut+=e.transport.DeckID.toString(2).padStart(11, "0");
        })
        s1c.forEach(e=>{
            BinaryOut+=this.deNormalizeVet(e,e.vet, this.Spec).toString(2).padStart(3, "0");
            BinaryOut+=e.unit.DeckID.toString(2).padStart(11, "0");
        })
        global.log("BinaryOut",BinaryOut);
        return "@"+parseFromBin(BinaryOut);
    }
    CardsJagged(Cards){
        let x = {LOG:[],INF:[],SUP:[],TNK:[],REC:[],VHC:[],HEL:[],PLA:[],SHP:[]};
        try {
            Cards.forEach(
                e=>{
                    if(e.boat || e.unit.Tab==="SHP" || (e.transport && e.transport.Tab === "SHP") ){
                       x.SHP.push(e);
                    } else {
                        x[e.unit.Tab].push(e);
                    }
                }
            )
        } catch (error) {
          global.throw("CardsJagged error", this.Cards, error);
        }
        return x; //returns nested array of units, by category
    }
    get PointPair(){
        let jagged =this.CardsJagged(this.Cards); 
        let used = 0;
        let max = this.baseDeckPoints + this.Era.bonus + this.Deck.Points;
        Object.keys(jagged).forEach(r =>
            jagged[r].forEach((c, y) => (used += this.Spec.matrix[r][y]))
        );
        return {used:used, max:max};
    }
    get DisplayMatrix(){
        let jagged =this.CardsJagged(this.Cards); 
        let x = {LOG:[],INF:[],SUP:[],TNK:[],REC:[],VHC:[],HEL:[],PLA:[],SHP:[]};
        Object.keys(this.Spec.matrix).forEach(r =>{
            jagged[r].forEach(e=> x[r].push(e));
            for (let i = 0; i < 9; i++) {
                if (x[r].length>i){//place taken, move on
                }else { 
                    x[r][i] = this.Spec.matrix[r].length >i ? this.Spec.matrix[r][i] : "X";
                }
            }
        })
        return x;
    }
    filterUnits(){
        this.Units = this.fullUnits;
        if (!(this.Spec.str === "General")){
            this.Units = this.Units.filter(e=>{
                return !e.Decks || e.Decks.includes(this.Spec.str) // some units are placeholders. :eugen:
            })
        }
        if (!(this.Era.str === "A")){
            this.Units = this.Units.filter(e=>this.Era.year > e.Year);
        }
        this.Pairs = {LOG:[],INF:[],SUP:[],TNK:[],REC:[],VHC:[],HEL:[],PLA:[],SHP:[]};
        this.Units.filter(e=>!e.IsTransporter).forEach(unit=>{
            if(!unit.Transporters[0]){ 
                this.Pairs[unit.Tab].push(new Card(0, unit));
            } else if (unit.Transporters[0].ID === 18064|| unit.Transporters[0].ID === 18043){
                this.Pairs[unit.Tab].push(new Card(0, unit));
                this.Pairs["SHP"].push(new Card(0, unit,unit.Transporters[0]));
            } else {
                unit.Transporters.forEach(tr=>{
                    this.Pairs[unit.Tab].push(new Card(0, unit, tr));
                    if(tr.Transporters[0]){
                        this.Pairs["SHP"].push(new Card(0, unit, tr, tr.Transporters[0]));
                    }
                })
            }
        })
    }
    loadFromDB(Deck) {
        //loads deck from DB, input is code
        if (Deck === undefined) return;
        this.Deck = Deck;
        if (this.Deck.Nation === "REDFOR") {
            this.fullUnits = this.DB.units.filter(e=>e.Nationalite).filter(e=>!e.IsPrototype);
        } else if (this.Deck.Nation === "NATO") {
            this.fullUnits = this.DB.units.filter(e=>!e.Nationalite).filter(e=>!e.IsPrototype);
        } else {
            this.fullUnits = this.DB.units.filter(e=>this.Deck.nations.includes(e.MotherCountry));
        }
        let ships = this.DB.units.filter(e=>(e.Tab==="SHP" && e.Nationalite===this.Deck.Side));
        this.fullUnits = this.fullUnits.concat(ships);
        this.filterUnits();
        return this;
    }
    loadFromCode(code){
        let DB = this.DB;
        let bin = parseToBin(code);
        let posc = 0;
        global.log("bin",bin);
        //side
        let Side = parseInt(bin.slice(posc + 0, posc + 2), 2);
        posc += 2;
        let Nation = parseInt(bin.slice(posc + 0, posc + 10), 2);
        posc += 10;

        this.loadFromDB(DB.decks.find(e=>(e.code===Nation) && (e.Side ===Side)), DB);

        this.Spec = DB.spec[parseInt(bin.slice(posc + 0, posc + 3), 2)];
        posc += 3;
        this.Era = DB.era[parseInt(bin.slice(posc + 0, posc + 2), 2)];
        posc += 2;
        let s3c = parseInt(bin.slice(posc + 0, posc + 4), 2);
        posc += 4;
        let s2c = parseInt(bin.slice(posc + 0, posc + 5), 2);
        posc += 5;

        let sideUnits  =DB.units.filter(e=>e.Nationalite === Side); //blame eugen
        for (let i = 0; i < s3c; i++){
            let vet = parseInt(bin.slice(posc + 0, posc + 3), 2);
            posc += 3;
            let unit = sideUnits.find(e => e.DeckID === parseInt(bin.slice(posc + 0, posc + 11), 2));
            posc += 11;
            let transport = sideUnits.find(e => e.DeckID === parseInt(bin.slice(posc + 0, posc + 11), 2));
            posc += 11;
            let boat = sideUnits.find(e => e.DeckID === parseInt(bin.slice(posc + 0, posc + 11), 2));
            posc += 11;
            this.Cards.push(new Card(this.normalizeVet(unit,vet, this.Spec), unit, transport, boat));
        }

        for (let i = 0; i < s2c; i++){
            let vet = parseInt(bin.slice(posc + 0, posc + 3), 2);
            posc += 3;
            let unit = sideUnits.find(e => e.DeckID === parseInt(bin.slice(posc + 0, posc + 11), 2));
            posc += 11;
            let transport = sideUnits.find(e => e.DeckID === parseInt(bin.slice(posc + 0, posc + 11), 2));
            posc += 11;
            this.Cards.push(new Card(this.normalizeVet(unit,vet, this.Spec), unit, transport));
        }
        while (bin.length > (posc + 14)){
            let vet = parseInt(bin.slice(posc + 0, posc + 3), 2);
            posc += 3;
            let unit = sideUnits.find(e => e.DeckID === parseInt(bin.slice(posc + 0, posc + 11), 2));
            posc += 11;
            this.Cards.push(new Card(this.normalizeVet(unit,vet, this.Spec), unit));
        }
        return this;
    } 
    addUnit( vet, unit, transport, boat) {
        this.Cards.push(new Card(vet, unit, transport, boat));
        return this;
    }
    deleteUnit(Unit) {
      this.Cards.splice(
        this.Cards.findIndex(e => {
          return Unit === e;
        }),
        1
      );
      return this;
    }
    normalizeVet(x, vet, spec){
        let foo = spec.bonus[x.Tab] ? vet - spec.bonus[x.Tab] : vet
        return foo>4? 4:(foo<0)?0:foo;
    }
    deNormalizeVet(x,vet,spec){
        let foo = spec.bonus[x.unit.Tab] ? vet + spec.bonus[x.unit.Tab] : vet
        return foo>4? 4:(foo<0)?0:foo;
    }
    setSpec(spec){
        this.Spec = spec;
        this.Units = this.fullUnits;
        this.filterUnits();
        return this;
    }
    setEra(era){
        this.Era = era;
        this.Units = this.fullUnits;
        this.filterUnits();
        return this;
    }
    unitCount(x){
        return this.Cards.filter(e=>e.unit.ID === x.ID).length
    }
    transportCount(x){
        return this.Cards.filter(e=>e.transport && e.transport.ID === x.ID).length;
    }
    cardIsValid(x){
        let vunit = this.Units.some(e=>e.ID===x.unit.ID);
        let uct = this.unitCount(x.unit) <= x.unit.MaxPacks;
        let vtr = !x.transport ||this.Units.some(e=>e.ID===x.transport.ID) ;
        let vct = !x.transport ||this.transportCount(x.transport) <= x.transport.MaxPacks;
        return vunit && uct && vtr && vct;
    }
    randomFill(){
        if(!this.Deck){return}
        let gettableCards = _.clone(this.Pairs);
        while (Object.keys(gettableCards).length > 0) {
            let keys = Object.keys(gettableCards);
            let tab = keys[ keys.length * Math.random() << 0];
            gettableCards[tab]=gettableCards[tab].filter(e=>this.cardIsValid(e));
            let card = gettableCards[tab][ gettableCards[tab].length* Math.random() << 0 ];
            while(!card.unit.avail[card.vet]){
                card.vet = Math.floor(Math.random() * (5));
            }
            this.Cards.push(card);
            if (isNaN(this.PointPair.used)){
                this.Cards.pop(card);
                delete gettableCards[tab];
            } else if ( this.PointPair.used > this.PointPair.max){
                this.Cards.pop(card);
                return this;
            } else if (!this.cardIsValid(card)){
                this.Cards.pop(card);
                gettableCards[tab]=gettableCards[tab].filter(e=>e!=card);
            }
            //let unitIndex = Math.floor(Math.random() * packsArray.length);
            //this.Pairs = {LOG:[],INF:[],SUP:[],TNK:[],REC:[],VHC:[],HEL:[],PLA:[],SHP:[]};

        }
    }
    fullRandomFill(){
        this.loadFromDB(this.DB.decks[this.DB.decks.length * Math.random() << 0]);
        this.setSpec(this.DB.spec[ Math.floor(Math.random() * (8))]);
        this.setEra(this.DB.era[ Math.floor(Math.random() * (3))]);
        this.randomFill();
        return this;
    }
}

export class Card {
    constructor(vet, unit, transport, boat){
        this.vet = vet;
        this.unit = unit;
        this.transport = transport;
        this.boat = boat;
        this.avail = [];
        if(transport){
           for (let i = 0; i < 5; i++) {
               this.avail[i] = Math.min(unit.avail[i],transport.avail[i]);
           }
        } else {
            this.avail = unit.avail;
        }
    }
}

export default DeckAssembly;