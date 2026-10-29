// ---------- Blöcke ----------
// s = Form, cut = Ausschnitt-Textur (Transparenz), alpha = halbtransparent, mob/grow/part = nicht in Materialliste
const T = {
  stone:     {n:"Bruchstein"},
  brick:     {n:"Steinziegel"},
  planks:    {n:"Eichenholzbretter"},
  dark:      {n:"Schwarzeichenbretter"},
  log:       {n:"Eichenstamm"},
  glass:     {n:"Glas", cut:true},
  dirt:      {n:"Erde"},
  farmland:  {n:"Ackerboden"},
  grass:     {n:"Grasblock"},
  sand:      {n:"Sand"},
  water:     {n:"Wassereimer", alpha:.62},
  lava:      {n:"Lavaeimer", glow:.55},
  hopper:    {n:"Trichter", cut:true},
  chest:     {n:"Truhe", s:"chest"},
  observer:  {n:"Beobachter"},
  piston:    {n:"Kolben"},
  redstone:  {n:"Redstone-Staub", s:"flat", cut:true},
  sugarcane: {n:"Zuckerrohr", s:"plant"},
  bamboo:    {n:"Bambus", s:"bamboo"},
  stem:      {n:"Kürbis-/Melonenkerne", s:"plant"},
  pumpkin:   {n:"Kürbis (wächst)", grow:true},
  melon:     {n:"Melone (wächst)", grow:true},
  cactus:    {n:"Kaktus", s:"cactus", cut:true},
  bedhead:   {n:"Bett", s:"bed"},
  bedfoot:   {n:"Bett", s:"bed", part:true},
  composter: {n:"Komposter", cut:true},
  torch:     {n:"Fackel", s:"torch", cut:true, glow:.6},
  lantern:   {n:"Laterne", s:"lantern", cut:true, glow:.5},
  crafting:  {n:"Werkbank"},
  furnace:   {n:"Ofen"},
  ladder:    {n:"Leiter", s:"wall", cut:true},
  slab:      {n:"Steinstufe", s:"half"},
  sign:      {n:"Schild", s:"sign"},
  villager:  {n:"Dorfbewohner", mob:true, body:true},
  villagerhead:{n:"Dorfbewohner", mob:true},
  zombie:    {n:"Zombie (Namensschild!)", mob:true, body:true},
  zombiehead:{n:"Zombie (Namensschild!)", mob:true},
  golem:     {n:"Eisengolem (spawnt)", mob:true, grow:true, body:true},
  golemhead: {n:"Eisengolem (spawnt)", mob:true, grow:true},
  chicken:   {n:"Huhn", s:"small", mob:true},
  piglin:    {n:"Zombifizierter Piglin (spawnt)", mob:true, grow:true, body:true},
  piglinhead:{n:"Zombifizierter Piglin (spawnt)", mob:true, grow:true},
  obsidian:  {n:"Obsidian"},
  portal:    {n:"Netherportal (anzünden)", alpha:.7, glow:.7, part:true},
  ironblock: {n:"Eisenblock"},
  beacon:    {n:"Leuchtfeuer", glow:.6},
  netherrack:{n:"Netherrack"},
  turtleegg: {n:"Schildkrötenei", s:"egg"},
  wool:      {n:"Weiße Wolle"},
  fence:     {n:"Eichenzaun", s:"fence"},
  lectern:   {n:"Lesepult"},
  barrel:    {n:"Fass"},
  smoker:    {n:"Räucherofen"},
  dispenser: {n:"Werfer"},
  hoppercart:{n:"Trichterlore + Schiene", s:"cart"},
  flow:      {n:"Wasser (fließt)", alpha:.5, part:true, s:"flow"},
  carrot:    {n:"Karotten", s:"plant", cut:true},
  lever:     {n:"Hebel", s:"torch"},
  button:    {n:"Knopf", s:"button"},
  armadillo: {n:"Gürteltier", s:"small", mob:true},
  // ---------- Bauen & Deko ----------
  // as = zählt in der Materialliste wie dieser Block (z. B. obere Stufe = Stufe)
  concrete_w:{n:"Weißer Beton"},
  concrete_r:{n:"Roter Beton"},
  spruce:    {n:"Fichtenholzbretter"},
  sprucelog: {n:"Fichtenstamm"},
  sprucestairs:{n:"Fichtenholztreppe", s:"stair"},
  spruceslab:{n:"Fichtenholzstufe", s:"half"},
  spruceslabtop:{n:"Fichtenholzstufe", s:"halftop", as:"spruceslab"},
  sprucefence:{n:"Fichtenzaun", s:"fence"},
  sprucetrap:{n:"Fichtenfalltür", s:"wall", cut:true},
  sprucedoor:{n:"Fichtentür", s:"door"},
  sprucedoortop:{n:"Fichtentür", s:"door", cut:true, part:true},
  mangplanks:{n:"Mangrovenholzbretter"},
  mangstairs:{n:"Mangrovenholztreppe", s:"stair"},
  oakstairs: {n:"Eichenholztreppe", s:"stair"},
  oakslab:   {n:"Eichenholzstufe", s:"half"},
  oakslabtop:{n:"Eichenholzstufe", s:"halftop", as:"oakslab"},
  oaktrap:   {n:"Eichenfalltür", s:"wall", cut:true},
  oakdoor:   {n:"Eichentür", s:"door"},
  oakdoortop:{n:"Eichentür", s:"door", cut:true, part:true},
  darklog:   {n:"Schwarzeichenstamm"},
  darkstairs:{n:"Schwarzeichenholztreppe", s:"stair"},
  darkslab:  {n:"Schwarzeichenholzstufe", s:"half"},
  darkslabtop:{n:"Schwarzeichenholzstufe", s:"halftop", as:"darkslab"},
  darkfence: {n:"Schwarzeichenzaun", s:"fence"},
  brickstairs:{n:"Steinziegeltreppe", s:"stair"},
  brickslab: {n:"Steinziegelstufe", s:"half"},
  brickslabtop:{n:"Steinziegelstufe", s:"halftop", as:"brickslab"},
  brickwall: {n:"Steinziegelmauer", s:"post"},
  mossbrick: {n:"Bemooste Steinziegel"},
  crackbrick:{n:"Rissige Steinziegel"},
  mossy:     {n:"Bemooster Bruchstein"},
  cobstairs: {n:"Bruchsteintreppe", s:"stair"},
  cobwall:   {n:"Bruchsteinmauer", s:"post"},
  smooth:    {n:"Glatter Stein"},
  andesite:  {n:"Polierter Andesit"},
  deeptile:  {n:"Tiefenschieferfliesen"},
  deepstairs:{n:"Tiefenschieferfliesentreppe", s:"stair"},
  deepslab:  {n:"Tiefenschieferfliesenstufe", s:"half"},
  redbrick:  {n:"Ziegelsteine"},
  pane:      {n:"Glasscheibe", s:"pane", cut:true},
  glass_b:   {n:"Blaues Glas", alpha:.6},
  ironbars:  {n:"Eisengitter", s:"pane", cut:true},
  chain:     {n:"Kette", s:"chain", cut:true},
  lanternh:  {n:"Laterne", s:"hlantern", cut:true, glow:.5, as:"lantern"},
  sealantern:{n:"Seelaterne", glow:.45},
  leaves:    {n:"Azaleenlaub", cut:true},
  oakleaves: {n:"Eichenlaub", cut:true},
  vines:     {n:"Ranken", s:"wall", cut:true},
  poppy:     {n:"Mohn", s:"plant", cut:true},
  tulip:     {n:"Orange Tulpe", s:"plant", cut:true},
  dandelion: {n:"Löwenzahn", s:"plant", cut:true},
  cornflower:{n:"Kornblume", s:"plant", cut:true},
  bookshelf: {n:"Bücherregal"},
  hay:       {n:"Heuballen"},
  pot:       {n:"Blumentopf mit Farn", s:"pot"},
  carpet_r:  {n:"Roter Teppich", s:"carpet"},
  path:      {n:"Trampelpfad"},
  gravel:    {n:"Kies"},
  air:       {n:"Luft", part:true},
  // Kulisse: wird angezeigt, zählt aber nicht zum Material
  lawn:      {n:"Wiese", ground:true},
  cliff:     {n:"Fels", ground:true},
  cliffmoss: {n:"Fels mit Moos", ground:true},
  sea:       {n:"Wasser", s:"flow", alpha:.6, ground:true},
  goldblock: {n:"Goldblock"},
  emeraldblock:{n:"Smaragdblock"},
  diamondblock:{n:"Diamantblock"},
};
// Schafe in allen 16 Wollfarben
const SHEEP=[["weiss","Weiß","#e9ecec"],["orange","Orange","#f07613"],["magenta","Magenta","#bd44b3"],["hellblau","Hellblau","#3aafd9"],
  ["gelb","Gelb","#f8c627"],["hellgruen","Hellgrün","#70b919"],["rosa","Rosa","#ed8dac"],["grau","Grau","#3e4447"],
  ["hellgrau","Hellgrau","#8e8e86"],["tuerkis","Türkis","#158991"],["violett","Violett","#792aac"],["blau","Blau","#35399d"],
  ["braun","Braun","#724728"],["gruen","Grün","#546d1b"],["rot","Rot","#a12722"],["schwarz","Schwarz","#141519"]];
SHEEP.forEach(([k,n])=>T["sheep_"+k]={n:"Schaf ("+n+")", s:"sheep", mob:true});

// ---------- Builder ----------
// r: 0 = Vorderseite nach +z, 1 = +x, 2 = -z, 3 = -x, 4 = nach oben, 5 = nach unten, 6–9 = wie 0–3 kopfüber
// Treppe: Vorderseite = niedrige Stufe. Tür, Falltür, Ranken liegen an der Vorderseite der Zelle.
function B(){
  const m=new Map();
  const a={
    set(x,y,z,t,r=0){m.set(x+","+y+","+z,[x,y,z,t,r]);return a},
    del(x,y,z){m.delete(x+","+y+","+z);return a},
    get(x,y,z){const v=m.get(x+","+y+","+z);return v?v[3]:null},
    each(fn){[...m.values()].forEach(v=>fn(...v));return a},
    box(x1,y1,z1,x2,y2,z2,t,r=0){for(let x=x1;x<=x2;x++)for(let y=y1;y<=y2;y++)for(let z=z1;z<=z2;z++)a.set(x,y,z,t,r);return a},
    walls(x1,y1,z1,x2,y2,z2,t){for(let x=x1;x<=x2;x++)for(let y=y1;y<=y2;y++)for(let z=z1;z<=z2;z++)if(x==x1||x==x2||z==z1||z==z2)a.set(x,y,z,t);return a},
    list(){const v=[...m.values()];const mn=[0,1,2].map(i=>Math.min(...v.map(b=>b[i])));return v.map(b=>[b[0]-mn[0],b[1]-mn[1],b[2]-mn[2],b[3],b[4]])}
  };return a;
}
const yt=q=>"https://www.youtube.com/results?search_query="+encodeURIComponent(q);

// ---------- Farm-Bausteine ----------
// Ein Modul: Schaf auf Gras, Beobachter sieht das Gras, Werfer mit Scheren schert, Trichterlore unter dem Gras sammelt.
// m = gespiegelt (zweite Reihe, Blick nach -z)
function woolMod(b,x,col,m){const Z=z=>m?10-z:z,r=m?2:0;
  b.set(x,0,Z(2),"hopper"); b.set(x,0,Z(3),"chest",r); b.set(x,0,Z(0),"brick").set(x,0,Z(1),"brick");
  b.set(x,1,Z(2),"hoppercart"); b.set(x,1,Z(0),"brick").set(x,1,Z(1),"brick").set(x,1,Z(3),"glass");
  b.set(x,2,Z(2),"grass"); b.set(x,2,Z(3),"grass"); b.set(x,2,Z(1),"observer",r); b.set(x,2,Z(0),"brick");
  b.set(x,3,Z(2),"sheep_"+col,r); b.set(x,3,Z(1),"dispenser",r); b.set(x,3,Z(0),"redstone");
  b.set(x,3,Z(3),"glass").set(x,4,Z(3),"glass").set(x,4,Z(1),"glass");
  b.set(x,5,Z(2),"glass").set(x,5,Z(3),"glass");}
function woolSep(b,x,m){const Z=z=>m?10-z:z;
  [0,1,2,3].forEach(z=>{b.set(x,0,Z(z),"brick");b.set(x,1,Z(z),"brick")});
  b.set(x,2,Z(0),"brick").set(x,2,Z(1),"brick").set(x,3,Z(1),"brick"); b.set(x,2,Z(2),"grass").set(x,2,Z(3),"grass");
  [2,3].forEach(z=>{b.set(x,3,Z(z),"glass");b.set(x,4,Z(z),"glass");b.set(x,5,Z(z),"glass")}); b.set(x,4,Z(1),"glass");}
const WOOL_TIPS=["Nur Werfer funktionieren, ein Spender schert nicht.","Bis zu 9 Scheren pro Werfer, mit Haltbarkeit halten sie viel länger.","Das Gras neben dem Schaf muss Licht bekommen, sonst wächst es nicht nach. Deshalb ist alles aus Glas.","Schaf mit Weizen in die Zelle locken und danach mit Farbstoff färben."];
const WOOL_RATE="Pro Schaf rechnen Wollfarm-Guides mit etwa 60 Wolle pro Stunde. Das ist ein Wert von Java-Servern, Bedrock kann abweichen. Bei {n} Schafen wären das rund {h} pro Stunde, am besten selbst nachmessen.";

// Mob-Turm: Spawn-Etagen mit Wasserkanälen zum Mittelloch (Schilder halten das Wasser vom Loch fern),
// 4 Blöcke Fall in einen Wasserkanal, der die Mobs zum zweiten Schacht schiebt, dann 22 Blöcke Fall auf den Trichter.
// So liegt die unterste Etage 26 Blöcke über dem Killraum (Bedrock: Mobs spawnen erst ab 24 Blöcken Abstand).
function mobTower(b,n,R){const c=R,k=c+4,S=23,P0=26;
  b.box(k-2,-1,c-1,k+2,0,c+4,"brick"); b.set(k,0,c,"hopper"); b.set(k,-1,c,"chest").set(k+1,-1,c,"chest");
  b.set(k-1,1,c,"brick").set(k+1,1,c,"brick").set(k,1,c-1,"brick").set(k-1,2,c,"brick").set(k+1,2,c,"brick").set(k,2,c-1,"brick");
  b.set(k,1,c+1,"slab").set(k,2,c+1,"glass");
  b.box(k-1,1,c+2,k-1,2,c+3,"brick"); b.box(k+1,1,c+2,k+1,2,c+3,"brick"); b.box(k-1,3,c+1,k+1,3,c+3,"brick"); b.set(k+1,1,c+1,"brick").set(k-1,1,c+1,"brick");
  for(let y=3;y<=S+1;y++){b.set(k-1,y,c,"brick");b.set(k+1,y,c,"brick");b.set(k,y,c-1,"brick");b.set(k,y,c+1,"brick");}
  b.set(k,S,c,"sign");
  for(let x=c-1;x<=k+1;x++){b.set(x,S-1,c,"brick");for(let y=S;y<=S+1;y++){b.set(x,y,c-1,"brick");b.set(x,y,c+1,"brick")}}
  b.del(k,S-1,c); b.set(c-1,S,c,"brick").set(c-1,S+1,c,"brick").set(k+1,S,c,"brick").set(k+1,S+1,c,"brick");
  b.set(c,S,c,"water"); for(let x=c+1;x<k;x++)b.set(x,S,c,"flow");
  for(let x=c+1;x<=k+1;x++)b.set(x,S+2,c,"brick");
  b.set(c-1,S+2,c,"brick").set(c+1,S+2,c,"brick").set(c,S+2,c-1,"brick").set(c,S+2,c+1,"brick");
  for(let i=0;i<n;i++){const f=P0+3*i;
    b.box(0,f,0,2*c,f,2*c,"brick"); b.del(c,f,c); b.walls(0,f+1,0,2*c,f+2,2*c,"brick");
    [[c,1,0,1],[c,2*c-1,0,-1],[1,c,1,0],[2*c-1,c,-1,0]].forEach(([x,z,dx,dz])=>{
      b.set(x,f+1,z,"water"); let px=x+dx,pz=z+dz; while(Math.abs(px-c)+Math.abs(pz-c)>1){b.set(px,f+1,pz,"flow");px+=dx;pz+=dz;} b.set(px,f+1,pz,"sign");});}
  b.box(0,P0+3*n,0,2*c,P0+3*n,2*c,"brick");}


const BUILDS=[
{ id:"eisenfarm", name:"Eisenfarm", cat:"Farmen", diff:"Mittel",
  desc:"Bedrock-Eisenfarm nach Dorf-Mechanik: Oben wohnen 10 Dorfbewohner mit 20 Betten und 10 Arbeitsplätzen in einer Glaskapsel, das macht sie zu einem gültigen Dorf. Die Golems spawnen im 3 Blöcke hohen Raum darunter. Wasser von zwei Seiten schiebt sie in die Ecke, dort hängt Lava auf Kopfhöhe, gehalten von Schildern. Das Eisen fällt in den Trichter und landet in der Truhe.",
  tips:["In Bedrock brauchst du keinen Zombie, das ist eine Java-Mechanik.","Jeder Dorfbewohner muss ein Bett beanspruchen und erreichen können, sonst zählt das Dorf nicht.","Mindestens 75 % der Dorfbewohner müssen an ihrem Arbeitsplatz gewesen sein.","Die Lava sitzt in der Ecke über dem Trichter. Das Schild darunter und die zwei Schilder daneben halten sie fest, der Golem streift sie nur mit dem Kopf.","Bau weit weg von anderen Dörfern, Betten und Arbeitsplätzen und füll Höhlen in der Nähe auf, sonst spawnen Golems woanders."],
  note:"Aufbau nach dem Bedrock-Prinzip aus dem CurseForge-Guide: Golems spawnen nur im Umkreis von etwa 8 Blöcken um das Dorfzentrum, der Spawnraum liegt deshalb direkt unter den Dorfbewohnern. Du musst in Simulationsdistanz bleiben.",
  rate:{item:"Eisenbarren", max:400, basis:"Bedrock prüft etwa alle 35 Sekunden einen Golem-Spawn. Klappt jeder Versuch, sind das rund 100 Golems mit je 3 bis 5 Eisen pro Stunde. Echte Farmen liegen meist darunter, also lieber selbst mit Trichter-Zähler messen."},
  q:"minecraft bedrock iron farm 20 beds 10 villagers",
  make(){const b=B();
    // Spawnraum 9x9, 3 hoch
    b.box(0,0,0,10,0,10,"brick"); b.walls(0,1,0,10,3,10,"brick");
    b.set(1,0,1,"hopper"); b.set(1,-1,1,"chest",2).set(2,-1,1,"chest",2);
    for(let x=1;x<=9;x++)for(let z=1;z<=9;z++){if(x===1&&z===1)continue;b.set(x,1,z,(x===9||z===9)?"water":"flow");}
    b.set(1,2,1,"sign").set(1,3,1,"lava").set(2,3,1,"sign",1).set(1,3,2,"sign");
    b.set(5,1,5,"golem").set(5,2,5,"golemhead");
    // Dorfkapsel darüber
    b.box(0,4,0,10,4,10,"brick");
    b.walls(0,5,0,10,6,10,"glass"); b.box(0,7,0,10,7,10,"glass");
    for(let x=1;x<=9;x++){b.set(x,5,1,"bedhead").set(x,5,2,"bedfoot");b.set(x,5,9,"bedhead",2).set(x,5,8,"bedfoot",2);}
    b.set(1,5,4,"bedhead").set(1,5,5,"bedfoot"); b.set(9,5,4,"bedhead").set(9,5,5,"bedfoot");
    const ws=["composter","lectern","barrel","smoker","composter"];
    for(let i=0;i<5;i++){const x=3+i;b.set(x,5,4,ws[i]);b.set(x,5,7,ws[4-i],2);
      b.set(x,5,5,"villager").set(x,6,5,"villagerhead");b.set(x,5,6,"villager",2).set(x,6,6,"villagerhead",2);}
    return b.list();}},
{ id:"kaktus", name:"Kaktusfarm", cat:"Farmen", diff:"Mittel",
  desc:"Etagen mit Kakteen auf Sand, immer mit einem Feld Abstand. Wächst ein Kaktus einen Block höher, berührt er den Zaun daneben und bricht ab. Die Kakteen fallen durch die freien Spalten nach unten ins Wasser, das fließt zur Trichterreihe am Rand und von dort in die Truhe. Komplett ohne Redstone, jede Etage obendrauf erhöht den Ertrag.",
  tips:["Zäune sind besser als volle Blöcke, weil die Kakteen dann eher nach unten fallen statt wieder auf einem Kaktus zu landen.","Kakteen dürfen auf ihrer eigenen Höhe keinen Block direkt daneben haben, deshalb steht jeder Kaktus allein.","Ein paar Kakteen landen auf Zäunen oder anderen Kakteen und gehen verloren, das ist bei diesem Design normal.","Das Wasser fließt von der linken Kante 7 Blöcke weit, genau bis über die Trichterreihe."],
  note:"Grundprinzip laut Minecraft Wiki: dünne Blöcke wie Zäune neben der Wachstumshöhe, Wasserstrom am Boden zu den Trichtern.",
  scale:{label:"Etagen", min:1, max:8, def:3},
  rate:{item:"Kakteen", perPlant:1.11, plant:"cactus", div:1, basis:"Kakteen wachsen wie Zuckerrohr nach 16 Zufalls-Ticks. In Bedrock sind das im Schnitt etwa 54 Minuten pro Block. Bei {n} Kakteen ergibt das rund {h} pro Stunde."},
  q:"minecraft bedrock cactus farm",
  make(n=3){const b=B();
    b.box(-1,0,-1,8,0,7,"brick"); b.walls(-1,1,-1,8,1,7,"brick");
    for(let z=0;z<=6;z++){b.set(0,1,z,"water");for(let x=1;x<=7;x++)b.set(x,1,z,"flow");b.set(7,0,z,"hopper");}
    b.set(7,0,7,"chest",1).set(8,0,7,"chest",1);
    for(let L=0;L<n;L++){const y=2+L*4;
      for(let x=0;x<=6;x+=2)for(let z=0;z<=6;z+=2){b.set(x,y,z,"brick");b.set(x,y+1,z,"sand");b.set(x,y+2,z,"cactus");b.set(x+1,y+3,z,"fence");}}
    return b.list();}},
{ id:"zuckerrohr", name:"Zuckerrohrfarm", cat:"Farmen", diff:"Leicht",
  desc:"Klassischer Beobachter-Aufbau: Hinter jedem Zuckerrohr sitzt auf zweiter Höhe ein Kolben, darauf ein Beobachter mit Blick aufs Rohr. Wächst es auf die dritte Höhe, gibt der Beobachter nach hinten ein Signal an den Redstone auf dem Block hinter dem Kolben, der Kolben bricht das Rohr ab. Das Wasser vor dem Rohr fließt von links nach rechts zum Trichter, die Trichtersäule bringt alles in die Truhe.",
  tips:["Lass die unterste Stufe Zuckerrohr stehen, die wächst immer nach.","Der Beobachter muss mit dem Gesicht zum Zuckerrohr zeigen, die rote Rückseite zum Redstone.","Der Wasserstrom fließt 7 Blöcke weit, deshalb ist eine Reihe genau 8 Pflanzen lang.","Ein paar Rohre fallen auf den Sand statt ins Wasser. Die holst du ab und zu von Hand."],
  note:"Aufbau wie im verbreiteten Observer-Design: Kolben direkt hinter dem Rohr, Beobachter obendrauf, Redstone auf dem Block hinter dem Kolben. Funktioniert so auch in Bedrock.",
  scale:{label:"Etagen", min:1, max:6, def:1},
  rate:{item:"Zuckerrohr", perPlant:1.11, plant:"sugarcane", div:2, basis:"Zuckerrohr wächst in Bedrock im Schnitt etwa einen Block pro 54 Minuten, dreimal langsamer als in Java. {n} Pflanzen ergeben rund {h} pro Stunde."},
  q:"minecraft bedrock automatic sugar cane farm observer",
  make(n=1){const b=B();
    for(let k=0;k<n;k++){const o=k*6;
      b.box(-1,o,-1,8,o,3,"brick"); b.set(7,o,2,"hopper");
      b.set(-1,o+1,1,"brick").set(-1,o+1,2,"brick");
      for(let x=0;x<=7;x++){
        b.set(x,o+1,0,"brick");b.set(x,o+1,1,"sand");b.set(x,o+1,2,x===0?"water":"flow");b.set(x,o+1,3,"brick");
        b.set(x,o+2,1,"sugarcane");b.set(x,o+3,1,"sugarcane");
        b.set(x,o+2,0,"brick");b.set(x,o+3,0,"piston",0);b.set(x,o+4,0,"observer",0);
        b.set(x,o+3,-1,"brick");b.set(x,o+4,-1,"redstone");}}
    for(let y=0;y<=6*(n-1);y++)b.set(8,y,2,"hopper");
    b.set(8,-1,2,"chest",1).set(8,-1,1,"chest",1);
    return b.list();}},
{ id:"bambus", name:"Bambusfarm", cat:"Farmen", diff:"Mittel",
  desc:"Vollautomatisch: Zwei Reihen Bambus auf Erde, dazwischen ein Wasserkanal. Hinter jeder Pflanze sitzt auf zweiter Höhe ein Kolben mit einem Beobachter obendrauf. Wächst der Bambus auf die dritte Höhe, gibt der Beobachter ein Signal an den Redstone hinter dem Kolben und der Kolben schlägt den Stängel ab. Das Wasser spült alles zum Trichter, über die Trichtersäule landet der Ertrag aller Etagen in denselben Truhen.",
  tips:["Bambus braucht Licht, deshalb hängen auf jeder Etage Laternen über dem Kanal.","Bambus geht auf Erde, Gras, Sand, Kies, Moos und Schlamm.","Ideal als Brennstoff: Bambus direkt verbrennen oder zu Gerüsten verarbeiten.","Der Beobachter zeigt mit dem Gesicht zum Bambus, die Rückseite zum Redstone hinter dem Kolben."],
  note:"Gleiches Prinzip wie die Zuckerrohrfarm, nur auf beiden Seiten des Kanals. Funktioniert so auch in Bedrock.",
  scale:{label:"Etagen", min:1, max:5, def:1},
  rate:{item:"Bambus", perPlant:5.86, plant:"bamboo", div:2, basis:"Bambus wächst bei jedem Zufalls-Tick mit 1:3-Chance, in Java im Schnitt alle 3,4 Minuten. Bedrock vergibt Zufalls-Ticks etwa dreimal seltener (wie beim Zuckerrohr), also rund alle 10 Minuten pro Pflanze. Bei {n} Pflanzen ergibt das grob {h} pro Stunde. Schätzwert, am besten nachmessen."},
  q:"minecraft bedrock automatic bamboo farm",
  make(n=1){const b=B();
    for(let k=0;k<n;k++){const o=k*7;
      b.box(-1,o,-1,8,o,5,"brick"); b.set(7,o,2,"hopper"); b.set(-1,o+1,2,"brick");
      for(let x=0;x<=7;x++){
        b.set(x,o+1,0,"brick");b.set(x,o+1,1,"dirt");b.set(x,o+1,2,x===0?"water":"flow");b.set(x,o+1,3,"dirt");b.set(x,o+1,4,"brick");
        [1,3].forEach(z=>{b.set(x,o+2,z,"bamboo");b.set(x,o+3,z,"bamboo");});
        b.set(x,o+2,0,"brick");b.set(x,o+3,0,"piston",0);b.set(x,o+4,0,"observer",0);b.set(x,o+3,-1,"brick");b.set(x,o+4,-1,"redstone");
        b.set(x,o+2,4,"brick");b.set(x,o+3,4,"piston",2);b.set(x,o+4,4,"observer",2);b.set(x,o+3,5,"brick");b.set(x,o+4,5,"redstone");
        if(x%3===1){b.set(x,o+5,2,"brick");b.set(x,o+4,2,"lantern");}}}
    for(let y=0;y<=7*(n-1);y++)b.set(8,y,2,"hopper");
    b.set(8,-1,2,"chest",1).set(8,-1,1,"chest",1);
    return b.list();}},
{ id:"kuerbis", name:"Kürbis- & Melonenfarm", cat:"Farmen", diff:"Mittel",
  desc:"In der Mitte wachsen abwechselnd Kürbis- und Melonenstängel, die Früchte wachsen links und rechts davon auf Erde. Ein Beobachter auf Fruchthöhe sieht die neue Frucht und gibt ein Signal nach hinten. Über Redstone wird der Kolben über der Frucht ausgelöst und schlägt sie ab. Unter der Erde stehen Trichterloren, die die Früchte durch den Block hindurch einsammeln.",
  tips:["Der Ackerboden braucht Wasser im Umkreis von 4 Blöcken, dafür ist das Wasser in der Mitte.","Die Felder neben den Stängeln müssen frei bleiben, sonst wächst keine Frucht.","Stängel brauchen Licht, deshalb hängen über der Mitte Laternen.","Trichterloren sammeln in Bedrock Items durch einen vollen Block, deshalb liegen sie unter der Erde."],
  note:"Kolben zerstören Kürbisse und Melonen beim Ausfahren. Dass Trichterloren durch einen Block sammeln, ist eine Bedrock-Eigenheit, in Java bräuchtest du einen anderen Aufbau.",
  scale:{label:"Etagen", min:1, max:4, def:1},
  rate:{item:"Kürbisse & Melonen", unknown:true, basis:"Für Bedrock habe ich keine verlässliche Zahl gefunden. Mehr Etagen bringen aber in etwa entsprechend mehr. Häng einen Trichter-Zähler an die Truhe und miss eine Stunde lang."},
  q:"minecraft bedrock automatic pumpkin melon farm observer",
  make(n=1){const b=B();
    for(let k=0;k<n;k++){const o=k*7;
      b.box(-1,o,-1,9,o+1,5,"brick");
      for(let x=0;x<=8;x++){
        [1,3].forEach(z=>{b.set(x,o,z,"hopper");b.set(x,o+1,z,"hoppercart");b.set(x,o+2,z,"dirt");});
        b.set(x,o+2,2,x===4?"water":"farmland"); if(x!==4)b.set(x,o+3,2,"stem");
        [[0,-1,0],[4,5,2]].forEach(([zo,zs,r])=>{b.set(x,o+2,zo,"brick");b.set(x,o+3,zo,"observer",r);b.set(x,o+3,zs,"brick");b.set(x,o+4,zs,"redstone");b.set(x,o+4,zo,"brick");b.set(x,o+5,zo,"redstone");});
        [1,3].forEach(z=>{b.set(x,o+4,z,"piston",5);b.set(x,o+5,z,"redstone");});}
      [0,2,6,8].forEach(x=>b.set(x,o+3,1,x%4?"melon":"pumpkin")); [1,5,7].forEach(x=>b.set(x,o+3,3,x%4===1?"pumpkin":"melon"));
      [2,6].forEach(x=>{b.set(x,o+5,2,"brick");b.set(x,o+4,2,"lantern");});}
    for(let y=0;y<=7*(n-1);y++){b.set(9,y,1,"hopper");b.set(9,y,3,"hopper");}
    b.set(9,-1,1,"chest",1).set(10,-1,1,"chest",1).set(9,-1,3,"chest",1).set(10,-1,3,"chest",1);
    return b.list();}},
{ id:"huehner", name:"Hühner- & Eierfarm", cat:"Farmen", diff:"Leicht",
  desc:"Die Hühner stehen auf Trichtern, jedes gelegte Ei fällt direkt rein und wandert in die Truhe darunter. Keine Redstone-Teile nötig.",
  tips:["Mit Weizenkörnern lockst du Hühner in den Kasten.","Wirf Eier in den Kasten, um mehr Hühner zu bekommen.","Halte Füchse fern, Glas reicht als Schutz."],
  note:"Einfaches Prinzip, das in Bedrock genauso funktioniert.",
  rate:{item:"Eier", h:[30,60], basis:"Ein Huhn legt etwa alle 5 bis 10 Minuten ein Ei. Mit 5 Hühnern sind das 30 bis 60 Eier pro Stunde."},
  q:"minecraft bedrock egg farm",
  make(){const b=B();
    b.box(0,0,0,4,0,4,"brick"); b.box(2,0,2,3,0,2,"chest");
    b.box(0,1,0,4,1,4,"brick"); b.box(1,1,1,3,1,3,"hopper");
    b.walls(0,2,0,4,3,4,"glass"); b.box(0,4,0,4,4,4,"glass");
    [[1,1,0],[3,1,3],[2,2,1],[1,3,2],[3,3,0]].forEach(([x,z,r])=>b.set(x,2,z,"chicken",r));
    return b.list();}},
{ id:"goldfarm", name:"Goldfarm (Nether)", cat:"Farmen", diff:"Schwer",
  desc:"Gebaut im Nether: Auf der großen Netherrack-Plattform spawnen Zombifizierte Piglins. Sie wollen das Schildkrötenei in der Mitte zertreten, laufen dabei über die Lücken und fallen in den Schacht. Unten erledigt sie die Tötungsanlage, Gold und Fleisch landen über Trichter in den Truhen.",
  tips:["Bring Feuerresistenz-Tränke mit, im Nether kann viel schiefgehen.","Schütz das Schildkrötenei mit Glas, damit es nicht zertreten wird.","Plattformen ringsum frei von anderen Spawnflächen halten."],
  note:"Das Modell zeigt eine Plattform. Die Original-Designs nutzen vier Plattformen und eine Kolben-Tötungsanlage, die Redstone dazu zeigt das Tutorial.",
  rate:{item:"Goldblöcke", h:128, src:true, basis:"Laut Sportskeeda schafft die voll ausgebaute Version mit vier Plattformen etwa 2 Stacks Goldblöcke pro Stunde. Unser Modell mit einer Plattform liegt entsprechend darunter."},
  q:"minecraft bedrock gold farm nether turtle egg",
  make(){const b=B();
    b.box(3,0,3,9,0,9,"brick"); b.box(4,0,6,8,0,6,"chest"); b.box(3,1,3,9,1,9,"brick"); b.box(4,1,4,8,1,8,"hopper");
    b.walls(3,2,3,9,13,9,"brick"); b.set(6,3,3,"glass").set(6,4,3,"glass");
    b.box(0,14,0,12,14,12,"netherrack");
    for(let x=4;x<=8;x++)for(let z=4;z<=8;z++)if(x===4||x===8||z===4||z===8)b.del(x,14,z);
    b.box(5,14,5,7,14,7,"netherrack"); b.del(6,14,5).del(6,14,7).del(5,14,6).del(7,14,6);
    b.set(6,14,6,"brick").set(6,15,6,"turtleegg");
    b.walls(5,15,5,7,16,7,"glass"); b.del(6,15,5).del(6,15,7).del(5,15,6).del(7,15,6);
    [[2,2],[10,3],[3,10],[9,9]].forEach(([x,z],i)=>b.set(x,15,z,"piglin",i%4).set(x,16,z,"piglinhead",i%4));
    return b.list();}},
{ id:"bruchstein", name:"Bruchsteingenerator", cat:"Redstone", diff:"Leicht",
  desc:"Wasser fließt auf die Lava zu und erzeugt an der Kontaktstelle Bruchstein. Abbauen, kurz warten, neu abbauen. Unendlich Stein ohne Höhlen.",
  tips:["Zwischen Wasser und Lava muss genau eine Lücke sein.","Mit Effizienz-Spitzhacke geht es deutlich schneller.","Ein Loch unter der Lücke verhindert, dass Lava zu Obsidian wird."],
  note:"Klassischer Aufbau, funktioniert in Bedrock zuverlässig.",
  rate:{item:"Bruchstein", manual:true, basis:"Der Stein bildet sich sofort neu. Der Ertrag hängt nur davon ab, wie schnell du abbaust."},
  q:"minecraft bedrock cobblestone generator",
  make(){const b=B();
    b.box(0,0,0,5,0,2,"brick"); b.del(3,0,1);
    for(let x=0;x<=5;x++){b.set(x,1,0,"brick");b.set(x,1,2,"brick");}
    b.set(0,1,1,"water").set(1,1,1,"flow").set(2,1,1,"flow").set(3,1,1,"flow").set(3,0,1,"flow"); b.set(5,1,1,"lava"); b.set(4,1,1,"stone");
    return b.list();}},
// ===== Wollfarmen =====
{ id:"wolle-mini", name:"Wollfarm Mini", cat:"Farmen", diff:"Leicht",
  desc:"Ein Schaf, ein Werfer, ein Beobachter. Frisst das Schaf das Gras unter sich, wird der Block zu Erde. Das merkt der Beobachter und lässt den Werfer mit Scheren auslösen. Die Wolle fällt aufs Gras, die Trichterlore darunter sammelt sie durch den Block hindurch ein.",
  tips:WOOL_TIPS,
  note:"Funktioniert in Bedrock, die Trichterlore sammelt dort Items durch einen vollen Block. Die Ausrichtung von Beobachter und Werfer im Modell beachten: Beobachter schaut aufs Gras, Werfer auf das Schaf.",
  rate:{item:"Wolle", perPlant:60, plant:"sheep_*", div:1, basis:WOOL_RATE},
  q:"minecraft bedrock automatic wool farm observer dispenser",
  make(){const b=B(); b.box(-1,-1,0,1,-1,3,"brick"); woolSep(b,-1); woolMod(b,0,"weiss"); woolSep(b,1); return b.list();}},

{ id:"wolle-reihe", name:"Wollfarm Reihe", cat:"Farmen", diff:"Mittel",
  desc:"Mehrere Wollmodule nebeneinander, jedes Schaf in einer anderen Farbe und mit eigener Truhe. So hast du die Farben schon sortiert. Mit dem Regler unten kannst du die Reihe verlängern.",
  tips:WOOL_TIPS.concat(["Für jede Farbe ein Modul, dann landet jede Farbe in ihrer eigenen Truhe."]),
  note:"Funktioniert in Bedrock. Die Redstone-Staub-Punkte der Module dürfen sich nicht berühren, deshalb liegt zwischen den Modulen immer eine Trennspalte.",
  scale:{label:"Schafe", min:2, max:8, def:4},
  rate:{item:"Wolle", perPlant:60, plant:"sheep_*", div:1, basis:WOOL_RATE},
  q:"minecraft bedrock wool farm all colors",
  make(n=4){const b=B(); b.box(-1,-1,0,2*n-1,-1,3,"brick");
    for(let i=0;i<n;i++){woolSep(b,2*i-1); woolMod(b,2*i,SHEEP[i][0]);} woolSep(b,2*n-1); return b.list();}},

{ id:"wolle-16", name:"Wollfarm alle 16 Farben", cat:"Farmen", diff:"Schwer",
  desc:"Die große Version: 16 Module in zwei Reihen, jede Wollfarbe einmal. In der Mitte ist ein Gang, von dem aus du alle 16 Truhen erreichst. Damit hast du nie wieder zu wenig Wolle für Betten, Banner oder Deko.",
  tips:WOOL_TIPS.concat(["Färb die Schafe erst in der Zelle, dann verwechselst du nichts.","Für Farbstoffe wie Türkis oder Violett brauchst du Mischungen, also vorher genug Blumen sammeln."]),
  note:"Funktioniert in Bedrock. Die zweite Reihe ist gespiegelt aufgebaut, die Rückseiten mit dem Redstone zeigen nach außen.",
  rate:{item:"Wolle", perPlant:60, plant:"sheep_*", div:1, basis:WOOL_RATE},
  q:"minecraft bedrock wool farm 16 colors",
  make(){const b=B(); b.box(-1,-1,0,15,-1,10,"brick");
    for(let i=0;i<8;i++){woolSep(b,2*i-1); woolMod(b,2*i,SHEEP[i][0]); woolSep(b,2*i-1,true); woolMod(b,2*i,SHEEP[8+i][0],true);}
    woolSep(b,15); woolSep(b,15,true);
    [1,7,13].forEach(x=>b.set(x,2,5,"lantern"));
    return b.list();}},

// ===== Essensfarmen =====
{ id:"karotten", name:"Karottenfeld mit Wasserernte", cat:"Farmen", diff:"Leicht",
  desc:"Halbautomatisch und sehr günstig: Legst du den Hebel um, setzen die Werfer am Feldrand Wasser in die freie erste Reihe. Das Wasser fließt übers Feld, erntet alle Karotten und spült sie bis über die Trichter am anderen Ende. Hebel zurück, die Werfer holen das Wasser wieder ein. Danach nur neu pflanzen.",
  tips:["In die Werfer kommen Wassereimer, beim zweiten Auslösen nehmen sie das Wasser wieder auf.","Erst ernten, wenn fast alles reif ist, sonst spült das Wasser auch unreife Karotten weg.","Karotten sind ideal für den Anfang, später machst du daraus goldene Karotten.","Die Wasserrinne in der Mitte hält den Ackerboden feucht."],
  note:"Das Wasser fließt in Bedrock 7 Blöcke weit: 6 Reihen Feld plus die Trichterreihe. Vor den Werfern muss eine Reihe frei bleiben, in Pflanzen können Werfer kein Wasser setzen.",
  rate:{item:"Karotten", unknown:true, basis:"Halbautomatisch: Pro Ernte bekommst du von 56 Pflanzen je 2 bis 5 Karotten, also grob 150. Wie oft du erntest, hängt vom Wachstum ab, in Bedrock wachsen Pflanzen eher langsam."},
  q:"minecraft bedrock water harvest crop farm dispenser",
  make(){const b=B();
    b.box(-1,-1,-1,10,-1,9,"brick");
    for(let x=0;x<=8;x++){
      b.set(x,1,0,"dispenser",0); b.set(x,0,0,"brick"); b.set(x,2,0,"redstone");
      b.set(x,0,1,"brick");
      for(let z=2;z<=7;z++){ if(x===4){b.set(x,0,z,"water");} else {b.set(x,0,z,"farmland");b.set(x,1,z,"carrot");} }
      b.set(x,0,8,"hopper"); b.set(x,0,9,"brick").set(x,1,9,"brick"); }
    for(let z=0;z<=9;z++){b.set(-1,0,z,"brick");b.set(-1,1,z,"brick");b.set(9,0,z,"brick");b.set(9,1,z,"brick");}
    b.set(9,0,8,"hopper"); b.set(10,0,8,"chest",1);
    b.set(-1,2,0,"lever"); b.set(9,2,0,"brick");
    return b.list();}},

{ id:"huehnchengrill", name:"Hühnchen-Grill", cat:"Farmen", diff:"Mittel",
  desc:"Die beste Essensfarm für den Anfang: fertig gebratenes Hähnchen, ganz ohne Ofen. Die Hühner oben legen Eier in die Trichter, die bringen sie zum Werfer. Der schießt die Eier in die Grillzelle, dort schlüpfen Küken. Werden sie groß, stoßen sie mit dem Kopf an die Lava und lassen gebratenes Hähnchen und Federn fallen.",
  tips:["Gebratenes Hähnchen füllt 6 Hungerpunkte, das ist für den Anfang richtig gut.","In Bedrock gibt es kein Gedränge-Limit, du kannst also viele Hühner auf die Trichter setzen. Mehr Hühner, mehr Ertrag.","Die Küken stehen auf einer Stufe: Klein passen sie unter die Lava, ausgewachsen nicht mehr.","Die zwei Beobachter, die sich anschauen, sind der Taktgeber für den Werfer."],
  note:"Die Höhe ist entscheidend: Boden der Grillzelle ist eine untere Stufe, die Lava liegt direkt einen Block darüber. Halte dich beim Bauen genau an ein Bedrock-Tutorial.",
  rate:{item:"Gebratenes Hähnchen", h:[3,6], basis:"Ein Huhn legt etwa alle 5 bis 10 Minuten ein Ei, aus rund jedem achten Ei schlüpft ein Küken. Mit den 3 Hühnern im Modell sind das grob 3 bis 6 Hähnchen pro Stunde. Jedes zusätzliche Huhn bringt etwa 1 bis 2 pro Stunde mehr."},
  q:"minecraft bedrock chicken cooker farm",
  make(){const b=B();
    b.box(-1,0,-1,5,2,3,"brick");
    for(let x=0;x<=2;x++){b.set(x,3,0,"hopper"); b.set(x,4,0,"chicken",x%4);}
    b.set(3,3,0,"dispenser",1); b.set(3,3,1,"observer",0); b.set(3,3,2,"observer",2);
    b.walls(-1,4,-1,3,5,1,"glass"); b.box(-1,6,-1,3,6,1,"glass"); b.set(3,4,0,"glass").set(3,5,0,"glass");
    b.set(4,3,0,"slab"); b.set(4,2,0,"hoppercart"); b.set(4,1,0,"hopper"); b.del(5,1,0); b.set(5,1,0,"hopper"); b.set(5,0,0,"brick");
    b.set(6,1,0,"chest",1); b.set(6,0,0,"brick");
    b.set(4,4,0,"lava"); b.set(4,3,-1,"glass").set(4,3,1,"glass").set(5,3,0,"glass");
    b.set(4,4,-1,"glass").set(4,4,1,"glass").set(5,4,0,"glass").set(4,5,0,"glass");
    return b.list();}},

{ id:"dorfkarotten", name:"Dorfbewohner-Karottenfarm", cat:"Farmen", diff:"Schwer",
  desc:"Vollautomatisch: Ein Bauer erntet und pflanzt das ganze Feld selbst. Sieht er einen zweiten Dorfbewohner, wirft er ihm überschüssige Karotten zu. Die Glaswand fängt die Würfe ab, die Karotten fallen aufs Feld und die Trichterloren darunter sammeln sie ein, bevor der Bauer sie wieder aufhebt.",
  tips:["Der Bauer braucht einen Komposter als Arbeitsplatz, der steht am Feldrand.","Gib dem Bauern am Anfang ein paar Karotten, damit er pflanzen kann.","Kartoffeln funktionieren genauso, Weizen ist wegen der Samen schwieriger.","Dorfbewohner bekommst du mit einer Lore oder einem Boot zur Farm."],
  note:"Bauern-Farmen laufen auch in Bedrock. Ein Bedrock-Fehlerbericht bestätigt, dass Trichterloren unter dem Ackerboden die Karotten einsammeln. Die genaue Anordnung zeigt das Tutorial.",
  rate:{item:"Karotten", h:[200,500], src:true, basis:"Ein Guide für Server nennt 200 bis 500 Pflanzen pro Stunde und Bauer. Das ist ein Java-Wert, in Bedrock wachsen Pflanzen langsamer, rechne eher mit dem unteren Ende."},
  q:"minecraft bedrock villager carrot farm automatic",
  make(){const b=B();
    b.box(-4,-1,-1,9,-1,9,"brick"); b.box(-1,0,-1,9,0,9,"brick");
    for(let x=0;x<=8;x++)for(let z=0;z<=8;z++){
      if(x===4&&z===4){b.set(x,1,z,"water");b.set(x,2,z,"slab");continue;}
      b.set(x,1,z,"farmland"); b.set(x,2,z,"carrot");}
    [3,4,5].forEach(z=>{b.set(0,0,z,"hoppercart"); b.set(0,-1,z,"hopper");});
    b.set(-1,-1,4,"hopper"); b.set(-2,-1,4,"chest",3);
    for(let i=-1;i<=9;i++){b.set(i,1,-1,"brick");b.set(i,2,-1,"fence");b.set(i,1,9,"brick");b.set(i,2,9,"fence");b.set(-1,1,i,"brick");b.set(-1,2,i,"fence");b.set(9,1,i,"brick");b.set(9,2,i,"fence");}
    [3,4,5].forEach(z=>{b.set(-1,2,z,"glass");b.set(-1,3,z,"glass")});
    b.set(9,2,4,"composter",3);
    b.del(6,2,6); b.set(6,2,6,"villager",1).set(6,3,6,"villagerhead",1);
    b.box(-4,0,3,-2,0,5,"brick"); b.set(-3,1,4,"brick"); b.set(-3,2,4,"villager",1).set(-3,3,4,"villagerhead",1);
    [[-4,4],[-3,3],[-3,5],[-2,3],[-2,5],[-2,4]].forEach(([x,z])=>{b.set(x,1,z,"brick");b.set(x,2,z,"glass");b.set(x,3,z,"glass")});
    b.del(-2,2,4).del(-2,3,4).del(-2,1,4); b.set(-2,1,4,"brick"); b.set(-3,4,4,"glass");
    [[-1,-1],[9,-1],[-1,9],[9,9]].forEach(([x,z])=>b.set(x,3,z,"lantern"));
    return b.list();}},

// ===== Levelfarmen =====
{ id:"mobfarm", name:"Mob-Turm klein", cat:"Farmen", diff:"Mittel",
  desc:"XP- und Drop-Farm ohne Spawner und ohne Redstone. Auf der dunklen Plattform spawnen Zombies, Skelette und Creeper, die Wasserkanäle treiben sie zum Mittelloch. Sie fallen in einen Wasserkanal, der sie zum zweiten Schacht schiebt, und dann genau 22 Blöcke tief auf den Trichter. Unten kommen sie mit einem halben Herz an: ein Schlag durch den Spalt über der Stufe, Erfahrung für dich, Drops in die Truhe.",
  tips:["Bau ihn hoch in der Luft oder über einem Ozean, damit die Mobs nur hier spawnen können.","Keine Fackeln auf der Plattform, sie muss komplett dunkel sein.","Die Plattform liegt 26 Blöcke über dir. Näher als 24 Blöcke spawnen in Bedrock keine Mobs, deshalb der Umweg über den Wasserkanal.","Die Schilder neben dem Loch halten das Wasser auf, Mobs laufen einfach hindurch.","Spinnen passen nicht durch das 1×1-Loch und bleiben oben. Das ist bei diesem Design normal."],
  note:"Fallhöhe 22 Blöcke und Mindestabstand 24 Blöcke sind im Modell echt. Landen in Wasser setzt den Fallschaden zurück, deshalb zählt nur der zweite Schacht.",
  rate:{item:"Mob-Drops & XP", unknown:true, basis:"Hängt stark von Höhe, Umgebung und Spawnflächen in der Nähe ab. Für Bedrock gibt es keine verlässliche Pauschalzahl."},
  q:"minecraft bedrock mob tower xp farm no spawner",
  make(){const b=B(); mobTower(b,1,5); return b.list();}},

{ id:"silberfisch", name:"Gürteltier-Silberfisch-Farm", cat:"Farmen", diff:"Mittel",
  desc:"Die neue XP-Farm: Gürteltiere bekommen per Werfer einen Wurftrank der Befallenheit. Jedes Mal, wenn sie Schaden nehmen, können Silberfische aus ihnen herauskommen. Der Kaktus in der Mitte piekst die Gürteltiere ständig. Der Zombie hinter Glas macht ihnen Angst, deshalb bleiben sie eingerollt und halten viel aus. Vorne ist über einer Stufe ein halber Block frei: Silberfische krabbeln durch und kommen zu dir, die Gürteltiere passen nicht durch. Jeder Silberfisch bringt 5 XP.",
  tips:["Trank der Befallenheit: Seltsamer Trank plus ein Steinblock (kein Bruchstein), mit Schwarzpulver wird ein Wurftrank daraus.","Der Zombie braucht ein Namensschild und ein Dach, sonst verschwindet er oder verbrennt.","Gürteltiere findest du in Savanne und Tafelbergen, mit Spinnenaugen vermehrst du sie.","Nachschub alle paar Minuten über den Knopf, die Wirkung hält nicht ewig. In Bedrock ist sie teils kürzer als angegeben."],
  note:"Funktioniert ab Version 1.21 auch in Bedrock. Die Mechanik steht im Minecraft Wiki, Details zum Aufbau zeigt ein Bedrock-Tutorial.",
  rate:{item:"Silberfische (je 5 XP)", unknown:true, basis:"Jeder Treffer auf ein befallenes Gürteltier hat eine Chance von 10 %, 1 bis 2 Silberfische freizusetzen. Wie viel das pro Stunde wird, hängt vom Kaktus-Schaden und der Trankdauer ab, also selbst ausprobieren."},
  q:"minecraft bedrock armadillo silverfish xp farm infestation",
  make(){const b=B();
    b.box(0,-1,0,6,-1,8,"brick"); b.box(1,0,1,5,0,5,"brick"); b.set(3,0,3,"sand"); b.set(3,1,3,"cactus");
    [[3,2],[3,4],[2,3],[4,3]].forEach(([x,z],i)=>b.set(x,1,z,"armadillo",i));
    b.walls(1,1,1,5,2,5,"glass"); b.box(1,3,1,5,3,5,"glass");
    b.set(3,3,3,"dispenser",5); b.set(3,4,3,"button");
    b.set(3,1,1,"slab").set(3,2,1,"glass"); b.set(3,0,0,"brick");
    b.box(2,0,6,4,0,8,"brick"); b.set(3,1,7,"zombie").set(3,2,7,"zombiehead");
    b.set(2,1,7,"glass").set(2,2,7,"glass").set(4,1,7,"glass").set(4,2,7,"glass").set(3,1,8,"glass").set(3,2,8,"glass");
    b.box(2,3,6,4,3,8,"brick");
    return b.list();}},

{ id:"mobturm", name:"Mob-Turm groß", cat:"Farmen", diff:"Schwer",
  desc:"Der große Bruder: mehrere Spawn-Etagen übereinander, alle mit Wasserkanälen zum selben Loch. Darunter dasselbe Prinzip wie beim kleinen Turm: Wasserkanal zum zweiten Schacht, 22 Blöcke Fall, ein Schlag im Killraum. Jede Etage erhöht den Ertrag.",
  tips:["Jede Etage ist genau 2 Blöcke hoch, so passen Endermen nicht rein.","Bau ihn hoch über einem Ozean, sonst spawnen die Mobs lieber in Höhlen unter dir.","Mit einem Schärfe-Schwert reicht ein Schlag pro Mob.","In Bedrock spawnen Mobs nur bis etwa 44 Blöcke um dich herum. Mehr als 5 Etagen bringen deshalb nichts mehr.","Fang mit einer Etage an und bau weitere drauf, wenn alles läuft."],
  note:"Egal von welcher Etage die Mobs fallen, sie landen erst im Wasserkanal. Der Fallschaden kommt nur vom zweiten Schacht, deshalb überleben alle mit einem halben Herz.",
  scale:{label:"Etagen", min:1, max:5, def:3},
  rate:{item:"Mob-Drops & XP", unknown:true, basis:"Mehr Etagen bringen ungefähr entsprechend mehr Mobs. Eine verlässliche Bedrock-Zahl gibt es nicht, weil Höhe und Umgebung viel ausmachen."},
  q:"minecraft bedrock multi floor mob tower",
  make(n=3){const b=B(); mobTower(b,n,7); return b.list();}},

{ id:"handelshalle", name:"Handelshalle", cat:"Dorf", diff:"Mittel",
  desc:"Zwei Reihen mit je sieben Zellen unter einem Satteldach mit Fichtenfachwerk. Jeder Dorfbewohner steht fest in seiner Zelle vor seinem Arbeitsplatz, darüber sitzt ein Glasblock, damit er nicht auf den Arbeitsplatz springen kann. Du läufst durch den Mittelgang und handelst. Ideal für Smaragde, Bücher und Werkzeuge.",
  tips:["Bring die Dorfbewohner mit Loren oder Booten in die Zellen.","Über jedem Arbeitsplatz sitzt ein Glasblock. Sonst kann der Dorfbewohner auf den Arbeitsplatz springen und abhauen.","Bibliothekare per Lesepult so lange neu würfeln, bis das gewünschte Buch dabei ist.","Ein Zombie-Dorfbewohner heilen senkt die Preise deutlich."],
  note:"Reiner Aufbau ohne versionsabhängige Technik. Durch die Türen an beiden Enden kommst du rein, die Dorfbewohner nicht raus: sie sitzen fest in ihren 1×1-Zellen.",
  q:"minecraft bedrock villager trading hall",
  make(){const b=B();
    b.box(-3,0,-3,17,0,9,"lawn"); b.box(0,0,0,14,0,6,"brick"); for(let x=1;x<=13;x++)b.set(x,0,3,"spruce");
    b.walls(0,1,0,14,1,6,"brick"); b.walls(0,2,0,14,3,6,"spruce"); b.box(0,4,0,14,4,6,"dark");
    for(let x=0;x<=14;x+=2)[0,6].forEach(z=>b.box(x,1,z,x,4,z,"sprucelog")); [0,14].forEach(x=>[1,5].forEach(z=>b.box(x,1,z,x,4,z,"sprucelog")));
    gable(b,{x1:0,x2:14,z1:0,z2:6,y:5,ax:"x",t:"darkstairs",edge:"sprucestairs",top:"darkslab",fill:"spruce",eave:"darkstairs"});
    [0,14].forEach(x=>{door(b,x,1,3,"sprucedoor");b.set(x,3,3,"spruce");b.set(x,6,3,"pane",1);const o=x?1:-1;
      [2,4].forEach(z=>b.set(x+o,3,z,"sprucefence").set(x+o,2,z,"lanternh"));for(let z=2;z<=4;z++)b.set(x+o,4,z,"darkstairs",x?1:3);b.set(x+o,0,3,"path").set(x+2*o,0,3,"path")});
    const ws=["lectern","composter","smoker","barrel","lectern","furnace","crafting"];
    for(let i=0;i<7;i++){const x=1+i*2;
      b.set(x,1,1,"villager").set(x,2,1,"villagerhead"); b.set(x,1,2,ws[i],2);
      b.set(x,1,5,"villager",2).set(x,2,5,"villagerhead",2); b.set(x,1,4,ws[6-i]);
      if(i<6){[1,2,4,5].forEach(z=>{b.set(x+1,1,z,"glass");b.set(x+1,2,z,"glass")});}
      b.set(x,3,2,"glass").set(x,3,4,"glass"); b.set(x,3,3,"lanternh");}
    return b.list();}},
];
