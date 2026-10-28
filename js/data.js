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
};
// Schafe in allen 16 Wollfarben
const SHEEP=[["weiss","Weiß","#e9ecec"],["orange","Orange","#f07613"],["magenta","Magenta","#bd44b3"],["hellblau","Hellblau","#3aafd9"],
  ["gelb","Gelb","#f8c627"],["hellgruen","Hellgrün","#70b919"],["rosa","Rosa","#ed8dac"],["grau","Grau","#3e4447"],
  ["hellgrau","Hellgrau","#8e8e86"],["tuerkis","Türkis","#158991"],["violett","Violett","#792aac"],["blau","Blau","#35399d"],
  ["braun","Braun","#724728"],["gruen","Grün","#546d1b"],["rot","Rot","#a12722"],["schwarz","Schwarz","#141519"]];
SHEEP.forEach(([k,n])=>T["sheep_"+k]={n:"Schaf ("+n+")", s:"sheep", mob:true});

// ---------- Builder ----------
// r: 0 = Vorderseite nach +z, 1 = +x, 2 = -z, 3 = -x, 4 = nach oben, 5 = nach unten
function B(){
  const m=new Map();
  const a={
    set(x,y,z,t,r=0){m.set(x+","+y+","+z,[x,y,z,t,r]);return a},
    del(x,y,z){m.delete(x+","+y+","+z);return a},
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

// Mob-Turm: Plattformen mit Wasserkanälen zum Mittelloch, Fallschacht, Killraum.
function mobTower(b,n,R){const c=R,top=22,F0=top-3*(n-1);
  b.box(c-1,0,c-1,c+1,0,c+1,"brick"); b.set(c,0,c,"hopper"); b.set(c,-1,c,"chest",2); b.set(c+1,-1,c,"chest",2);
  b.walls(c-1,1,c-1,c+1,2,c+1,"brick"); b.set(c,1,c-1,"glass"); b.set(c,2,c-1,"glass"); b.set(c,0,c-2,"slab"); b.set(c,1,c-2,"torch");
  b.walls(c-1,3,c-1,c+1,F0-1,c+1,"brick");
  for(let k=0;k<n;k++){const f=F0+3*k;
    b.box(0,f,0,2*c,f,2*c,"brick"); b.del(c,f,c);
    b.walls(0,f+1,0,2*c,f+2,2*c,"brick");
    [[c,1,0,1],[c,2*c-1,0,-1],[1,c,1,0],[2*c-1,c,-1,0]].forEach(([x,z,dx,dz])=>{
      b.set(x,f+1,z,"water"); let px=x+dx,pz=z+dz; while(px!==c||pz!==c){b.set(px,f+1,pz,"flow"); px+=dx; pz+=dz;}});}
  b.box(0,F0+3*n,0,2*c,F0+3*n,2*c,"brick");}


const BUILDS=[
{ id:"eisenfarm", name:"Eisenfarm", cat:"Farmen", diff:"Mittel",
  desc:"Bedrock-Eisenfarm nach Dorf-Mechanik: 10 Dorfbewohner, 20 Betten und Arbeitsplätze machen die Kapsel zu einem gültigen Dorf. Die Golems spawnen auf der Plattform darunter, Wasser schiebt sie ins Loch, die Lavaklinge erledigt sie und das Eisen landet über den Trichter in der Truhe.",
  tips:["In Bedrock brauchst du keinen Zombie, das ist eine Java-Mechanik.","Jeder Dorfbewohner muss mit einem Bett verbunden sein, sonst zählt das Dorf nicht.","Mindestens 75 % der Dorfbewohner müssen an ihren Arbeitsplatz kommen.","Bau weit weg von anderen Dörfern, Betten und Arbeitsplätzen."],
  note:"Die Spawn-Plattform muss im Spawnbereich um das Dorfzentrum liegen. Die genauen Abstände stehen im Tutorial für deine Version.",
  rate:{item:"Eisenbarren", max:400, basis:"Bedrock prüft etwa alle 35 Sekunden einen Golem-Spawn. Klappt jeder Versuch, sind das rund 100 Golems mit je 3 bis 5 Eisen pro Stunde. Echte Farmen liegen meist darunter, also lieber selbst mit Trichter-Zähler messen."},
  q:"minecraft bedrock iron farm 20 beds 10 villagers",
  make(){const b=B();
    b.box(4,0,5,6,0,5,"chest"); b.box(4,1,4,6,1,6,"brick"); b.set(5,1,5,"hopper");
    b.walls(4,2,4,6,4,6,"glass"); b.set(5,4,5,"lava"); b.set(5,3,4,"sign");
    b.box(0,5,0,10,5,10,"brick"); b.del(5,5,5);
    b.walls(0,6,0,10,6,10,"stone");
    for(let i=1;i<=9;i++){ if(i!==5){b.set(i,6,5,"water");b.set(5,6,i,"water");}}
    b.set(2,6,2,"golem").set(2,7,2,"golemhead");
    b.box(0,9,0,10,9,10,"brick");
    b.walls(0,10,0,10,11,10,"glass"); b.box(0,12,0,10,12,10,"glass");
    for(let x=1;x<=9;x++){b.set(x,10,1,"bedhead").set(x,10,2,"bedfoot");b.set(x,10,9,"bedhead",2).set(x,10,8,"bedfoot",2);}
    b.set(1,10,4,"bedhead").set(1,10,5,"bedfoot"); b.set(9,10,4,"bedhead").set(9,10,5,"bedfoot");
    const ws=["composter","lectern","barrel","smoker","composter"];
    for(let i=0;i<5;i++){const x=3+i;b.set(x,10,4,ws[i]);b.set(x,10,7,ws[4-i],2);
      b.set(x,10,5,"villager").set(x,11,5,"villagerhead");b.set(x,10,6,"villager",2).set(x,11,6,"villagerhead",2);}
    return b.list();}},
{ id:"kaktus", name:"Kaktusfarm", cat:"Farmen", diff:"Mittel",
  desc:"Etagen mit Kakteen auf Sand. Wächst ein Kaktus einen Block höher, berührt er den Zaun daneben und bricht ab. Die Kakteen fallen nach unten, der Wasserstrom bringt sie zu den Trichtern und in die Truhen. Komplett ohne Redstone, und jede Etage obendrauf erhöht den Ertrag.",
  tips:["Zäune sind besser als volle Blöcke, weil die Kakteen dann eher nach unten fallen statt wieder auf einem Kaktus zu landen.","Kakteen dürfen auf ihrer eigenen Höhe keinen Block direkt daneben haben.","Die Etagen versetzt bauen, so wie im Modell, damit die Kakteen frei nach unten fallen."],
  note:"Grundprinzip laut Minecraft Wiki. Wie viele Etagen und welcher Abstand bei dir passen, zeigt ein Bedrock-Tutorial.",
  scale:{label:"Etagen", min:1, max:8, def:3},
  rate:{item:"Kakteen", perPlant:1.11, plant:"cactus", div:1, basis:"Kakteen wachsen wie Zuckerrohr nach 16 Zufalls-Ticks. In Bedrock sind das im Schnitt etwa 54 Minuten pro Block. Bei {n} Kakteen ergibt das rund {h} pro Stunde."},
  q:"minecraft bedrock cactus farm",
  make(n=3){const b=B();
    b.box(-1,0,-1,5,0,5,"brick"); b.walls(-1,1,-1,5,1,5,"brick");
    b.box(0,1,0,4,1,4,"water"); b.del(0,1,0).set(0,1,0,"hopper"); b.set(-1,0,-1,"chest").set(-1,0,0,"chest");
    for(let L=0;L<n;L++){const y=2+L*4;
      for(let x=0;x<5;x++)for(let z=0;z<5;z++){
        if((x+z+L)%2===0){b.set(x,y,z,"brick");b.set(x,y+1,z,"sand");b.set(x,y+2,z,"cactus");}
        else b.set(x,y+3,z,"fence");}}
    return b.list();}},
{ id:"zuckerrohr", name:"Zuckerrohrfarm", cat:"Farmen", diff:"Leicht",
  desc:"Sobald ein Zuckerrohr auf die zweite Höhe wächst, merkt das der Beobachter und der Kolben bricht es ab. Der Wasserstrom spült alles zur Trichtersäule, die den Ertrag aller Etagen in die Truhen unten bringt.",
  tips:["Lass die unterste Stufe Zuckerrohr stehen, die wächst immer nach.","Zuckerrohr wächst auch im Dunkeln, Licht ist egal.","Statt höher kannst du auch länger bauen, das Prinzip bleibt gleich."],
  note:"Die genaue Ausrichtung von Beobachter und Kolben ist im Modell vereinfacht. Halte dich beim Bauen an ein Bedrock-Video.",
  scale:{label:"Etagen", min:1, max:6, def:1},
  rate:{item:"Zuckerrohr", perPlant:1.11, plant:"sugarcane", div:2, basis:"Zuckerrohr wächst in Bedrock im Schnitt etwa einen Block pro 54 Minuten, dreimal langsamer als in Java. {n} Pflanzen ergeben rund {h} pro Stunde."},
  q:"minecraft bedrock automatic sugar cane farm",
  make(n=1){const b=B();
    for(let k=0;k<n;k++){const o=k*5;
      b.box(0,o,0,15,o,3,"brick");
      for(let x=0;x<=15;x++){b.set(x,o+1,0,"brick");b.set(x,o+1,1,"sand");b.set(x,o+1,2,"water");b.set(x,o+1,3,"brick");
        b.set(x,o+2,1,"sugarcane");b.set(x,o+3,1,"sugarcane");b.set(x,o+2,0,"brick");b.set(x,o+3,0,"piston");b.set(x,o+4,0,"observer");b.set(x,o+4,1,"redstone");}}
    for(let y=0;y<=5*(n-1)+1;y++)b.set(16,y,2,"hopper");
    b.set(16,-1,1,"chest",1).set(16,-1,2,"chest",1);
    return b.list();}},
{ id:"bambus", name:"Bambusfarm", cat:"Farmen", diff:"Mittel",
  desc:"Vollautomatisch: Zwei Reihen Bambus auf Erde, dazwischen ein Wasserkanal. Wächst ein Bambus über die zweite Höhe, merkt das der Beobachter und der Kolben schlägt den Stängel ab. Alles darüber fällt mit runter, das Wasser spült es zu den Trichtern. Über die Trichtersäule an der Seite landet der Ertrag aller Etagen in denselben Truhen.",
  tips:["Bambus braucht oben Licht ab Stufe 9, deshalb hängen auf jeder Etage Laternen über den Reihen.","Bambus geht auf Erde, Gras, Sand, Kies, Moos und Schlamm.","Ideal als Brennstoff: Bambus direkt verbrennen oder zu Gerüsten verarbeiten.","Ab etwa 3 Etagen lohnen sich Doppeltruhen oder ein kleines Lager unten."],
  note:"Die genaue Ausrichtung von Beobachter und Kolben ist im Modell vereinfacht. Halte dich beim Bauen an ein Bedrock-Video.",
  scale:{label:"Etagen", min:1, max:5, def:1},
  rate:{item:"Bambus", perPlant:5.86, plant:"bamboo", div:2, basis:"Bambus wächst bei jedem Zufalls-Tick mit 1:3-Chance, in Java im Schnitt alle 3,4 Minuten. Bedrock vergibt Zufalls-Ticks etwa dreimal seltener (wie beim Zuckerrohr), also rund alle 10 Minuten pro Pflanze. Bei {n} Pflanzen ergibt das grob {h} pro Stunde. Schätzwert, am besten nachmessen."},
  q:"minecraft bedrock automatic bamboo farm",
  make(n=1){const b=B();const L=11;
    for(let k=0;k<n;k++){const o=k*6;
      b.box(0,o,0,L,o,4,"brick");
      for(let x=0;x<=L;x++){
        b.set(x,o+1,0,"brick");b.set(x,o+1,1,"dirt");b.set(x,o+1,2,"water");b.set(x,o+1,3,"dirt");b.set(x,o+1,4,"brick");
        [1,3].forEach(z=>{b.set(x,o+2,z,"bamboo");b.set(x,o+3,z,"bamboo");});
        b.set(x,o+2,0,"brick");b.set(x,o+3,0,"piston",0);b.set(x,o+4,0,"observer",0);
        b.set(x,o+2,4,"brick");b.set(x,o+3,4,"piston",2);b.set(x,o+4,4,"observer",2);
        b.set(x,o+5,0,"redstone");b.set(x,o+5,4,"redstone");
        if(x%3===1){b.set(x,o+5,2,"brick");b.set(x,o+4,2,"lantern");}}}
    for(let y=0;y<=6*(n-1)+1;y++)b.set(L+1,y,2,"hopper");
    b.set(L+1,-1,2,"chest",1).set(L+1,-1,1,"chest",1);
    return b.list();}},
{ id:"kuerbis", name:"Kürbis- & Melonenfarm", cat:"Farmen", diff:"Leicht",
  desc:"In der Mitte wachsen die Stängel, links Kürbisse, rechts Melonen. Beobachter darüber sehen die Frucht, der Kolben drückt sie ab und die Trichter im Boden sammeln alles ein. Weitere Etagen lassen sich direkt obendrauf setzen.",
  tips:["Der Ackerboden braucht Wasser im Umkreis von 4 Blöcken.","Lass die Frucht-Felder frei, sonst wächst nichts.","Stängel brauchen Licht, bei mehreren Etagen also Laternen oder Fackeln einplanen."],
  note:"Vereinfachtes Modell. Für die Redstone-Details lohnt sich ein Bedrock-Tutorial.",
  scale:{label:"Etagen", min:1, max:4, def:1},
  rate:{item:"Kürbisse & Melonen", unknown:true, basis:"Für Bedrock habe ich keine verlässliche Zahl gefunden. Mehr Etagen bringen aber in etwa entsprechend mehr. Häng einen Trichter-Zähler an die Truhe und miss eine Stunde lang."},
  q:"minecraft bedrock automatic pumpkin melon farm",
  make(n=1){const b=B();
    for(let k=0;k<n;k++){const o=k*5;
      b.box(0,o,0,8,o,4,"brick");
      for(let x=0;x<=8;x++){
        b.set(x,o+1,2,x===4?"water":"farmland"); if(x!==4)b.set(x,o+2,2,"stem");
        b.set(x,o+1,1,"dirt");b.set(x,o+1,3,"dirt");b.set(x,o,1,"hopper");b.set(x,o,3,"hopper");
        b.set(x,o+2,0,"piston",0);b.set(x,o+2,4,"piston",2);b.set(x,o+3,1,"observer",5);b.set(x,o+3,3,"observer",5);b.set(x,o+1,0,"brick");b.set(x,o+1,4,"brick");}
      [1,5,7].forEach(x=>b.set(x,o+2,1,"pumpkin")); [2,6].forEach(x=>b.set(x,o+2,3,"melon"));
      b.set(4,o+4,2,"lantern");}
    for(let y=0;y<=5*(n-1);y++){b.set(9,y,1,"hopper");b.set(9,y,3,"hopper");}
    b.set(9,-1,1,"chest",1).set(9,-1,3,"chest",1);
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
    b.set(0,1,1,"water"); b.set(5,1,1,"lava"); b.set(4,1,1,"stone");
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
  desc:"Halbautomatisch und sehr günstig: Legst du den Hebel um, setzen die Werfer am Feldrand Wasser. Das Wasser fließt übers Feld, erntet alle reifen Karotten und spült sie in die Trichter am anderen Ende. Hebel zurück, die Werfer holen das Wasser wieder ein. Danach nur neu pflanzen.",
  tips:["In die Werfer kommen Wassereimer, beim zweiten Auslösen nehmen sie das Wasser wieder auf.","Erst ernten, wenn fast alles reif ist, sonst spült das Wasser auch unreife Karotten weg.","Karotten sind ideal für den Anfang, später machst du daraus goldene Karotten.","Die Wasserrinne in der Mitte hält den Ackerboden feucht."],
  note:"Das Wasser fließt in Bedrock 7 Blöcke weit, deshalb ist das Feld genau 7 Blöcke lang.",
  rate:{item:"Karotten", unknown:true, basis:"Halbautomatisch: Pro Ernte bekommst du von 56 Pflanzen je 2 bis 5 Karotten, also grob 150. Wie oft du erntest, hängt vom Wachstum ab, in Bedrock wachsen Pflanzen eher langsam."},
  q:"minecraft bedrock water harvest crop farm dispenser",
  make(){const b=B();
    b.box(-1,-1,-1,10,-1,9,"brick");
    for(let x=0;x<=8;x++){
      b.set(x,1,0,"dispenser",0); b.set(x,0,0,"brick"); b.set(x,2,0,"redstone");
      for(let z=1;z<=7;z++){ if(x===4){b.set(x,0,z,"water");} else {b.set(x,0,z,"farmland");b.set(x,1,z,"carrot");} }
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
{ id:"mobfarm", name:"Mob-Turm klein", cat:"Farmen", diff:"Leicht",
  desc:"Der Klassiker ohne Spawner und ohne Redstone. Auf der dunklen Plattform spawnen Zombies, Skelette und Spinnen, die Wasserkanäle treiben sie ins Mittelloch. Nach 22 Blöcken Fall kommen sie mit fast keinem Leben unten an. Ein Schlag reicht, du bekommst die Erfahrung und die Drops landen in der Truhe.",
  tips:["Bau ihn hoch in der Luft oder über einem Ozean, damit die Mobs nur hier spawnen können.","Keine Fackeln auf der Plattform, sie muss komplett dunkel sein.","Stell dich zum Farmen in den Killraum. Die Plattform ist dann über 24 Blöcke entfernt, so weit weg müssen Mobs in Bedrock mindestens spawnen.","Die Stufe vor dem Fenster sorgt dafür, dass du die Mobs triffst, sie dich aber nicht."],
  note:"Fallhöhe und Abstände sind im Modell echt. Wie die Wasserkanäle auf deiner Plattform genau verlaufen, zeigt ein Bedrock-Tutorial.",
  rate:{item:"Mob-Drops & XP", unknown:true, basis:"Hängt stark von Höhe, Umgebung und Spawnflächen in der Nähe ab. Für Bedrock gibt es keine verlässliche Pauschalzahl."},
  q:"minecraft bedrock mob tower xp farm no spawner",
  make(){const b=B(); mobTower(b,1,5); return b.list();}},

{ id:"silberfisch", name:"Gürteltier-Silberfisch-Farm", cat:"Farmen", diff:"Mittel",
  desc:"Die neue XP-Farm: Gürteltiere bekommen per Werfer einen Wurftrank der Befallenheit. Jedes Mal, wenn sie Schaden nehmen, können Silberfische aus ihnen herauskommen. Der Kaktus in der Mitte piekst die Gürteltiere ständig. Der Zombie hinter Glas macht ihnen Angst, deshalb bleiben sie eingerollt und halten viel aus. Die Silberfische kommen zu dir ans Fenster und du erledigst sie für je 5 XP.",
  tips:["Trank der Befallenheit: Seltsamer Trank plus ein Steinblock (kein Bruchstein), mit Schwarzpulver wird ein Wurftrank daraus.","Der Zombie braucht ein Namensschild und ein Dach, sonst verschwindet er oder verbrennt.","Gürteltiere findest du in Savanne und Tafelbergen, mit Spinnenaugen vermehrst du sie.","Nachschub alle paar Minuten über den Knopf, die Wirkung hält nicht ewig. In Bedrock ist sie teils kürzer als angegeben."],
  note:"Funktioniert ab Version 1.21 auch in Bedrock. Die Mechanik steht im Minecraft Wiki, Details zum Aufbau zeigt ein Bedrock-Tutorial.",
  rate:{item:"Silberfische (je 5 XP)", unknown:true, basis:"Jeder Treffer auf ein befallenes Gürteltier hat eine Chance von 10 %, 1 bis 2 Silberfische freizusetzen. Wie viel das pro Stunde wird, hängt vom Kaktus-Schaden und der Trankdauer ab, also selbst ausprobieren."},
  q:"minecraft bedrock armadillo silverfish xp farm infestation",
  make(){const b=B();
    b.box(0,-1,0,6,-1,8,"brick"); b.box(1,0,1,5,0,5,"brick"); b.set(3,0,3,"sand"); b.set(3,1,3,"cactus");
    [[3,2],[3,4],[2,3],[4,3]].forEach(([x,z],i)=>b.set(x,1,z,"armadillo",i));
    b.walls(1,1,1,5,2,5,"glass"); b.box(1,3,1,5,3,5,"glass");
    b.set(3,3,3,"dispenser",5); b.set(3,4,3,"button");
    b.del(3,1,1).del(3,2,1); b.set(3,1,1,"slab"); b.set(3,0,0,"brick");
    b.box(2,0,6,4,0,8,"brick"); b.set(3,1,7,"zombie").set(3,2,7,"zombiehead");
    b.set(2,1,7,"glass").set(2,2,7,"glass").set(4,1,7,"glass").set(4,2,7,"glass").set(3,1,8,"glass").set(3,2,8,"glass");
    b.box(2,3,6,4,3,8,"brick");
    return b.list();}},

{ id:"mobturm", name:"Mob-Turm groß", cat:"Farmen", diff:"Schwer",
  desc:"Der große Bruder: mehrere Spawn-Etagen übereinander, alle mit Wasserkanälen zum selben Schacht. Jede Etage erhöht den Ertrag. Die oberste Etage fällt 22 Blöcke, die unteren etwas weniger, dort brauchen die Mobs eventuell einen zweiten Schlag.",
  tips:["Jede Etage ist genau 2 Blöcke hoch, so passen Endermen nicht rein.","Bau ihn hoch über einem Ozean, sonst spawnen die Mobs lieber in Höhlen unter dir.","Mit einem Schärfe-Schwert reicht meist ein Schlag pro Mob.","Fang mit einer Etage an und bau weitere drauf, wenn alles läuft."],
  note:"Die Fallhöhe ist auf die oberste Etage ausgelegt. Wasserverlauf und Kanäle für deine Version am besten nach einem Bedrock-Tutorial bauen.",
  scale:{label:"Etagen", min:1, max:4, def:3},
  rate:{item:"Mob-Drops & XP", unknown:true, basis:"Mehr Etagen bringen ungefähr entsprechend mehr Mobs. Eine verlässliche Bedrock-Zahl gibt es nicht, weil Höhe und Umgebung viel ausmachen."},
  q:"minecraft bedrock multi floor mob tower",
  make(n=3){const b=B(); mobTower(b,n,7); return b.list();}},

{ id:"handelshalle", name:"Handelshalle", cat:"Dorf", diff:"Mittel",
  desc:"Zwei Reihen mit je sieben Zellen. Jeder Dorfbewohner steht fest in seiner Zelle vor seinem Arbeitsplatz, du läufst durch den Mittelgang und handelst. Ideal für Smaragde, Bücher und Werkzeuge.",
  tips:["Bring die Dorfbewohner mit Loren oder Booten in die Zellen.","Bibliothekare per Lesepult so lange neu würfeln, bis das gewünschte Buch dabei ist.","Ein Zombie-Dorfbewohner heilen senkt die Preise deutlich."],
  note:"Reiner Aufbau ohne versionsabhängige Technik.",
  q:"minecraft bedrock villager trading hall",
  make(){const b=B();
    b.box(0,0,0,14,0,6,"brick");
    b.walls(0,1,0,14,3,6,"brick"); b.box(0,4,0,14,4,6,"dark");
    b.del(0,1,3).del(0,2,3);
    const ws=["lectern","composter","smoker","barrel","lectern","furnace","crafting"];
    for(let i=0;i<7;i++){const x=1+i*2;
      b.set(x,1,1,"villager").set(x,2,1,"villagerhead"); b.set(x,1,2,ws[i],2);
      b.set(x,1,5,"villager",2).set(x,2,5,"villagerhead",2); b.set(x,1,4,ws[6-i]);
      if(i<6){[1,2,4,5].forEach(z=>{b.set(x+1,1,z,"glass");b.set(x+1,2,z,"glass")});}
      b.set(x,3,3,"lantern");}
    return b.list();}},
{ id:"starterhaus", name:"Starterhaus", cat:"Häuser", diff:"Leicht",
  desc:"Kleines Holzhaus mit Satteldach für die ersten Nächte. Drinnen Bett, Werkbank, Ofen und Truhe, also alles, was du am Anfang brauchst.",
  tips:["Fackeln drinnen verhindern, dass Mobs im Haus spawnen.","Die Stämme an den Ecken geben dem Haus Struktur.","Später kannst du nach hinten einfach anbauen."],
  note:"Reiner Deko-Build, keine versionsabhängige Technik.",
  q:"minecraft bedrock starter house",
  make(){const b=B();
    b.box(0,0,0,6,0,4,"stone");
    b.walls(0,1,0,6,3,4,"planks");
    [[0,0],[6,0],[0,4],[6,4]].forEach(([x,z])=>b.box(x,1,z,x,3,z,"log"));
    b.del(3,1,0).del(3,2,0);
    [[1,2,0],[5,2,0],[0,2,2],[6,2,2],[3,2,4]].forEach(p=>b.set(...p,"glass"));
    for(let k=0;k<=2;k++){b.box(-1,4+k,-1+k,7,4+k,-1+k,"dark");b.box(-1,4+k,5-k,7,4+k,5-k,"dark");}
    b.box(-1,7,2,7,7,2,"dark");
    [0,6].forEach(x=>{b.box(x,4,0,x,4,4,"planks");b.box(x,5,1,x,5,3,"planks");b.set(x,6,2,"planks");});
    b.set(1,1,3,"bedhead",2).set(1,1,2,"bedfoot",2); b.set(5,1,3,"crafting",2); b.set(4,1,3,"furnace",2); b.set(5,1,1,"chest",3); b.set(1,2,1,"torch");
    return b.list();}},
{ id:"windmuehle", name:"Windmühle", cat:"Häuser", diff:"Mittel",
  desc:"Steinsockel, Holzturm, der nach oben schmaler wird, spitzes Dach und vier große Flügel aus Wolle an einer Stammnabe. Sieht neben Weizenfeldern richtig gut aus.",
  tips:["Bau sie auf einen kleinen Hügel, dann wirkt sie größer.","Die Flügel leicht schräg zu setzen geht mit Treppen und Stufen.","Drinnen passt ein Lager für Weizen und Brot."],
  note:"Reiner Deko-Build, keine versionsabhängige Technik.",
  q:"minecraft bedrock windmill tutorial",
  make(){const b=B();
    b.box(0,0,0,6,0,6,"stone"); b.walls(0,1,0,6,3,6,"stone"); b.del(3,1,0).del(3,2,0);
    b.walls(0,4,0,6,7,6,"planks"); [[0,0],[6,0],[0,6],[6,6]].forEach(([x,z])=>b.box(x,4,z,x,7,z,"log"));
    b.walls(1,8,1,5,11,5,"planks"); [[1,1],[5,1],[1,5],[5,5]].forEach(([x,z])=>b.box(x,8,z,x,11,z,"log"));
    b.set(3,6,0,"glass").set(0,6,3,"glass").set(6,6,3,"glass").set(3,9,1,"glass");
    b.box(0,12,0,6,12,6,"dark"); b.box(1,13,1,5,13,5,"dark"); b.box(2,14,2,4,14,4,"dark"); b.set(3,15,3,"dark");
    b.set(3,10,0,"log").set(3,10,-1,"log");
    for(let i=1;i<=6;i++){b.set(3,10+i,-1,"log");b.set(3,10-i,-1,"log");b.set(3+i,10,-1,"log");b.set(3-i,10,-1,"log");
      if(i>1){b.set(4,10+i,-1,"wool");b.set(2,10-i,-1,"wool");b.set(3+i,9,-1,"wool");b.set(3-i,11,-1,"wool");}}
    b.set(3,1,1,"lantern");
    return b.list();}},
{ id:"wachturm", name:"Wachturm", cat:"Häuser", diff:"Mittel",
  desc:"Steinturm mit Leiter und überdachter Aussichtsplattform. Gut als Orientierungspunkt und um die Umgebung im Blick zu haben.",
  tips:["Laternen auf der Plattform sieht man nachts von weit weg.","Mit Steinziegeln wirkt der Turm älter, mit Bruchstein rustikaler.","Eine Falltür oben an der Leiter verhindert Abstürze."],
  note:"Reiner Deko-Build, keine versionsabhängige Technik.",
  q:"minecraft bedrock watchtower tutorial",
  make(){const b=B();
    b.box(0,0,0,4,0,4,"stone");
    b.walls(0,1,0,4,10,4,"stone");
    [[0,0],[4,0],[0,4],[4,4]].forEach(([x,z])=>b.box(x,1,z,x,10,z,"log"));
    b.del(2,1,0).del(2,2,0); b.set(2,5,0,"glass").set(4,7,2,"glass").set(0,7,2,"glass");
    for(let y=1;y<=10;y++)b.set(2,y,3,"ladder");
    b.box(-1,11,-1,5,11,5,"planks"); b.set(2,11,3,"ladder");
    [[-1,-1],[5,-1],[-1,5],[5,5]].forEach(([x,z])=>b.box(x,12,z,x,13,z,"log"));
    for(let i=0;i<=4;i++){b.set(i,12,-1,"fence");b.set(i,12,5,"fence");b.set(-1,12,i,"fence");b.set(5,12,i,"fence");}
    b.box(-1,14,-1,5,14,5,"dark"); b.box(0,15,0,4,15,4,"dark"); b.box(1,16,1,3,16,3,"dark");
    b.set(1,12,1,"lantern").set(3,12,3,"lantern");
    return b.list();}},
{ id:"burg", name:"Burg", cat:"Burgen", diff:"Schwer",
  desc:"Quadratische Burg mit Ringmauer, vier Ecktürmen mit Zinnen, Torhaus und einem Bergfried in der Mitte. Ein Großprojekt, das sich gut in Etappen bauen lässt: erst Türme, dann Mauern, dann Innenhof.",
  tips:["Mische Steinziegel mit Bruchstein, dann wirkt die Mauer älter.","Die Zinnen sind einfach jeder zweite Block obendrauf.","Bau den Bergfried zuerst, dann passt du die Mauern an."],
  note:"Reiner Deko-Build, keine versionsabhängige Technik.",
  q:"minecraft bedrock castle tutorial",
  make(){const b=B();const S=20;
    b.box(0,0,0,S,0,S,"stone");
    b.walls(0,1,0,S,6,S,"brick");
    for(let i=0;i<=S;i+=2){b.set(i,7,0,"brick");b.set(i,7,S,"brick");b.set(0,7,i,"brick");b.set(S,7,i,"brick");}
    [[0,0],[S-4,0],[0,S-4],[S-4,S-4]].forEach(([x,z])=>{
      b.walls(x,1,z,x+4,10,z+4,"brick"); b.box(x,11,z,x+4,11,z+4,"brick");
      for(let i=0;i<=4;i+=2){b.set(x+i,12,z,"brick");b.set(x+i,12,z+4,"brick");b.set(x,12,z+i,"brick");b.set(x+4,12,z+i,"brick");}
      b.set(x+2,6,z,"glass").set(x+2,6,z+4,"glass").set(x,6,z+2,"glass").set(x+4,6,z+2,"glass");
      b.set(x+2,12,z+2,"lantern");});
    for(let y=1;y<=4;y++)for(let x=9;x<=11;x++)b.del(x,y,0);
    b.walls(8,1,-2,12,8,2,"brick"); for(let y=1;y<=4;y++)for(let x=9;x<=11;x++){b.del(x,y,-2);b.del(x,y,2);}
    for(let i=0;i<=4;i+=2){b.set(8+i,9,-2,"brick");b.set(8+i,9,2,"brick")}
    b.walls(7,1,8,13,14,13,"brick"); b.box(7,15,8,13,15,13,"brick");
    for(let i=0;i<=6;i+=2){b.set(7+i,16,8,"brick");b.set(7+i,16,13,"brick")} for(let i=0;i<=5;i+=2){b.set(7,16,8+i,"brick");b.set(13,16,8+i,"brick")}
    b.del(10,1,8).del(10,2,8); [5,9,12].forEach(y=>{b.set(10,y,8,"glass");b.set(7,y,10,"glass");b.set(13,y,10,"glass");});
    b.box(2,1,9,4,1,11,"grass"); b.set(16,1,10,"grass").set(17,1,10,"grass");
    return b.list();}},
{ id:"leuchtfeuer", name:"Leuchtfeuer-Pyramide", cat:"Deko", diff:"Mittel",
  desc:"Volle Leuchtfeuer-Pyramide mit vier Stufen aus Eisenblöcken. Damit schaltest du alle Effekte frei, inklusive Regeneration oder Stärke II. Der Strahl geht durch das farbige Glas.",
  tips:["Eisen, Gold, Smaragd, Diamant und Netherit kannst du beliebig mischen.","Die volle Pyramide braucht 164 Blöcke.","Für den Leuchtfeuer-Block brauchst du einen Netherstern vom Wither."],
  note:"Pyramidenstufen 9×9, 7×7, 5×5 und 3×3 sind fest vorgegeben und in Bedrock gleich.",
  q:"minecraft bedrock beacon pyramid",
  make(){const b=B();
    b.box(0,0,0,8,0,8,"ironblock"); b.box(1,1,1,7,1,7,"ironblock"); b.box(2,2,2,6,2,6,"ironblock"); b.box(3,3,3,5,3,5,"ironblock");
    b.set(4,4,4,"beacon");
    return b.list();}},
{ id:"netherportal", name:"Netherportal mit Rahmen", cat:"Portale", diff:"Leicht",
  desc:"Standard-Netherportal mit 10 Obsidian, eingefasst in einen Torbogen aus Steinziegeln mit Laternen. Macht aus dem schlichten Portal einen echten Blickfang.",
  tips:["Die vier Ecken brauchen kein Obsidian, deshalb reichen 10 Blöcke.","Anzünden mit Feuerzeug oder Feuerkugel.","Notiere dir die Koordinaten, im Nether teilst du durch 8."],
  note:"Portalgröße 4×5 ist die kleinste mögliche und funktioniert in Bedrock genauso.",
  q:"minecraft bedrock nether portal design",
  make(){const b=B();
    b.box(-2,0,0,5,0,2,"stone");
    for(let x=0;x<=3;x++){if(x>0&&x<3){b.set(x,1,1,"obsidian");b.set(x,5,1,"obsidian");}}
    for(let y=2;y<=4;y++){b.set(0,y,1,"obsidian");b.set(3,y,1,"obsidian");b.set(1,y,1,"portal");b.set(2,y,1,"portal");}
    b.set(0,1,1,"brick").set(3,1,1,"brick").set(0,5,1,"brick").set(3,5,1,"brick");
    for(let y=1;y<=6;y++){b.set(-1,y,1,"brick");b.set(4,y,1,"brick");}
    b.box(-1,7,1,4,7,1,"brick"); b.box(0,6,1,3,6,1,"brick"); b.box(1,8,1,2,8,1,"brick");
    b.set(-2,1,1,"brick").set(5,1,1,"brick").set(-2,2,1,"lantern").set(5,2,1,"lantern");
    return b.list();}},
{ id:"lager", name:"Lagerraum", cat:"Lager", diff:"Leicht",
  desc:"Halbunterirdischer Raum mit Truhenreihen an beiden Wänden. Platz für 28 Truhen, Laternen an der Decke.",
  tips:["Beschrifte Truhen mit Schildern oder Rahmen mit Item darin.","Ein Mittelgang von 3 Blöcken macht das Sortieren angenehm.","Lass vorne Platz für eine Sortieranlage später."],
  note:"Reiner Deko-Build, keine versionsabhängige Technik.",
  q:"minecraft bedrock storage room design",
  make(){const b=B();
    b.box(0,0,0,8,0,6,"brick");
    b.walls(0,1,0,8,4,6,"brick"); b.box(0,5,0,8,5,6,"dark");
    b.del(4,1,0).del(4,2,0);
    for(let x=1;x<=7;x++){b.box(x,1,1,x,2,1,"chest",0);b.box(x,1,5,x,2,5,"chest",2);}
    b.set(2,4,3,"lantern").set(6,4,3,"lantern");
    return b.list();}},
];

// ---------- State ----------
const CATS=["Alle",...new Set(BUILDS.map(b=>b.cat))];
let cat="Alle", query="";
const counts=k=>!T[k].mob&&!T[k].grow&&!T[k].part;
function regen(b){b.blocks=b.make(b.n);b.H=Math.max(...b.blocks.map(v=>v[1]))+1;
  b.size=[0,1,2].map(i=>Math.max(...b.blocks.map(v=>v[i]))+1);
  b.nBlocks=b.blocks.filter(v=>counts(v[3])).length;}
BUILDS.forEach(b=>{b.n=b.scale?b.scale.def:undefined;regen(b)});
function effRate(b){const r=b.rate;if(!r||!r.perPlant)return r;
  const hit=k=>r.plant.endsWith("*")?k.startsWith(r.plant.slice(0,-1)):k===r.plant;
  const n=Math.round(b.blocks.filter(v=>hit(v[3])).length/r.div),h=Math.round(n*r.perPlant);
  return {...r,h,basis:r.basis.replace("{n}",n).replace("{h}",h)}}
