// ---------- Landhaus am See: eigene Blöcke, Texturen und Build ----------
// Rotation r: 0–3 wie in data.js, 6–9 = wie 0–3 kopfüber (umgedrehte Treppen).
// Treppe: Vorderseite = niedrige Stufe. Tür, Falltür und Ranken liegen an der Vorderseite der Zelle.
Object.assign(T,{
  // Hausbau (Landhaus)
  concrete_w:{n:"Weißer Beton"},
  spruce:    {n:"Fichtenholzbretter"},
  sprucelog: {n:"Fichtenstamm"},
  sprucestairs:{n:"Fichtenholztreppe", s:"stair"},
  sprucefence:{n:"Fichtenzaun", s:"fence"},
  sprucetrap:{n:"Fichtenfalltür", s:"wall", cut:true},
  sprucedoor:{n:"Fichtentür", s:"door"},
  sprucedoortop:{n:"Fichtentür", s:"door", cut:true, part:true},
  mangstairs:{n:"Mangrovenholztreppe", s:"stair"},
  pane:      {n:"Glasscheibe", s:"pane", cut:true},
  leaves:    {n:"Azaleenlaub", cut:true},
  vines:     {n:"Ranken", s:"wall", cut:true},
  poppy:     {n:"Mohn", s:"plant", cut:true},
  tulip:     {n:"Orange Tulpe", s:"plant", cut:true},
});
Object.assign(TEX,{
  concrete_w(){return {all:tile("whiteconc",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,"#e4e6e6",.97+R()*.05)})}},
  spruce(){return TEX.planks("spruceplanks","#735536")},
  sprucestairs(){return TEX.spruce()},
  sprucefence(){return TEX.spruce()},
  sprucelog(){const side=tile("sprlogside",(p,R,q)=>{const ct=[];for(let x=0;x<16;x++)ct.push([.72,.86,1,.92][R()*4|0]);
      for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,"#3e2b19",ct[x]*(R()<.08?.8:1));});
    const top=tile("sprlogtop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const d=Math.max(Math.abs(x-7.5),Math.abs(y-7.5));
      if(d>=7)p(x,y,"#3e2b19",q());else p(x,y,(Math.floor(d)%2)?"#7a5a38":"#68492b",q()*.06+.97)}});
    return {side,top,bottom:top}},
  mangstairs(){return TEX.planks("mangplanks","#8a4332")},
  sprucetrap(){return {all:tile("sprtrap",(p,R,q,g)=>{
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){const edge=x<2||x>13||y<2||y>13;p(x,y,"#6a4c2e",edge?.78:q()*.98)}
    for(let y=2;y<14;y++){p(5,y,"#4e3720");p(10,y,"#4e3720")}
    [[3,4],[4,4],[11,4],[12,4],[3,11],[4,11],[11,11],[12,11]].forEach(([x,y])=>g.clearRect(x,y,1,1));})}},
  sprucedoor(){const front=tile("sprdoor",(p,R,q)=>{
      for(let y=0;y<16;y++)for(let x=0;x<16;x++){const edge=x<1||x>14||y>14;p(x,y,"#6a4c2e",edge?.75:q()*.98)}
      for(let i=1;i<15;i++){p(i,i,"#4e3720");p(15-i,i,"#4e3720")}
      for(let y=0;y<15;y++)p(7,y,"#5a4027");p(12,8,"#c9b27a");});
    return {side:front,front,back:front,top:front,bottom:front}},
  sprucedoortop(){const front=tile("sprdoortop",(p,R,q,g)=>{
      for(let y=0;y<16;y++)for(let x=0;x<16;x++){const edge=x<1||x>14||y<1;p(x,y,"#6a4c2e",edge?.75:q()*.98)}
      for(let y=0;y<16;y++)p(7,y,"#5a4027");
      [[2,3,5,8],[9,3,12,8]].forEach(([x1,y1,x2,y2])=>{for(let y=y1;y<=y2;y++)for(let x=x1;x<=x2;x++)g.clearRect(x,y,1,1)});});
    return {side:front,front,back:front,top:front,bottom:front}},
  pane(){return TEX.glass()},
  leaves(){return {all:tile("azalea",(p,R,q,g)=>{
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){const r=R();p(x,y,r<.18?"#7aa23a":r>.85?"#45651f":"#5b812b",q())}
    for(let i=0;i<22;i++)g.clearRect(R()*16|0,R()*16|0,1,1);})}},
  vines(){return {all:tile("vines",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    [1,5,9,13].forEach(x0=>{let x=x0;for(let y=0;y<16;y++){if(R()<.3)x+=R()<.5?-1:1;p(x,y,"#4c7a22",q());if(R()<.35)p(x+1,y,"#63962e",q())}});})}},
  poppy(){return {all:tile("poppy",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    for(let y=8;y<16;y++)p(7,y,"#4d8a2a");p(6,11,"#5fa03a");p(8,12,"#5fa03a");
    for(let y=3;y<8;y++)for(let x=5;x<10;x++)if(!((x==5||x==9)&&(y==3||y==7)))p(x,y,"#d22a1e",q());p(7,5,"#2a1a12");})}},
  tulip(){return {all:tile("tulip",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    for(let y=8;y<16;y++)p(7,y,"#4d8a2a");p(6,10,"#5fa03a");p(5,11,"#5fa03a");p(8,12,"#5fa03a");p(9,11,"#5fa03a");
    for(let y=3;y<8;y++)for(let x=6;x<9;x++)p(x,y,"#ef7d1f",q());p(5,3,"#ef7d1f");p(9,3,"#ef7d1f");p(5,4,"#e06a14");p(9,4,"#e06a14");})}},
});

{const b={ id:"landhaus", name:"Landhaus am See", cat:"Häuser", diff:"Mittel",
  desc:"Weißes Landhaus mit zwei Etagen: links der hohe Hauptteil mit Giebel nach vorne, rechts ein niedrigerer Seitenflügel mit Balkon. Mangrovenholz-Dach mit Fichtenholz-Kanten, Fensterläden aus Falltüren, Laternen, Ranken, eine Laubhecke über der Haustür und Blumenkästen. Drinnen Bett, Truhen, Werkbank und Ofen, nach oben geht es per Leiter.",
  tips:["Weißer Beton entsteht, wenn Betonpulver Wasser berührt. Pulver setzen und mit einem Wassereimer drübergehen, oder direkt an einem Fluss craften und umwandeln.","Statt Beton gehen auch Kalzit oder glatter Quarz, die wirken etwas wärmer.","Die Steinziegel in den weißen Wänden sollen wie abgeplatzter Putz aussehen, setz sie ruhig unregelmäßig.","Falltüren als Fensterläden setzt du, indem du an die Wand neben dem Fenster klickst und sie dann hochklappst.","Wenn neben den Blumenkästen Grasblöcke liegen, wird die Erde darin mit der Zeit von selbst grün.","Der Bau sieht direkt am Wasser am besten aus, z. B. am Fluss- oder Seeufer."],
  note:"Reiner Deko-Build, keine versionsabhängige Technik. Laub verschwindet nicht, solange es von Hand gesetzt wurde.",
  q:"minecraft bedrock white cottage house tutorial",
  make(){const b=B(),W="concrete_w";
    // Fundament aus Bruchstein, Böden aus Fichte
    b.box(0,-1,0,14,-1,11,"stone"); b.box(0,0,0,14,0,11,"stone");
    b.box(1,0,1,6,0,9,"spruce"); b.box(8,0,2,13,0,7,"spruce");
    // Wände: Hauptteil (8x11, 8 hoch) und Seitenflügel (8x8, 7 hoch)
    b.walls(0,1,0,7,8,10,W); b.walls(7,1,1,14,7,8,W);
    for(let k=0;k<=3;k++){b.box(k,9+k,0,7-k,9+k,0,W);b.box(k,9+k,10,7-k,9+k,10,W);b.box(14,8+k,1+k,14,8+k,8-k,W);}
    for(let k=2;k<=3;k++)b.box(8,8+k,1+k,8,8+k,8-k,W);
    // Dach Seitenflügel (First quer), danach Hauptdach (Giebel nach vorne)
    for(let x=8;x<=15;x++)for(let k=0;k<=4;k++){const t=x===15?"sprucestairs":"mangstairs";b.set(x,8+k,9-k,t,0);b.set(x,8+k,k,t,2);}
    for(let z=-1;z<=11;z++)for(let k=0;k<=4;k++){const t=(z===-1||z===11)?"sprucestairs":"mangstairs";b.set(-1+k,9+k,z,t,3);b.set(8-k,9+k,z,t,1);}
    // Zwischendecken, Leiter, Durchgänge
    b.box(1,5,1,6,5,9,"spruce"); b.box(8,5,2,13,5,7,"spruce");
    for(let y=1;y<=5;y++)b.set(6,y,1,"ladder",2);
    b.del(7,1,4).del(7,2,4).del(7,6,4).del(7,7,4);
    // Vorderseite Hauptteil: Tür, Sturz, Fenster, Konsole mit Laubhecke, Fensterläden, Ranken
    [3,4].forEach(x=>{b.set(x,1,10,"sprucedoor").set(x,2,10,"sprucedoortop").set(x,3,10,"spruce")});
    [1,6].forEach(x=>{b.set(x,2,10,"pane").set(x,3,10,"pane")});
    for(let x=0;x<=7;x++){b.set(x,4,11,"sprucestairs",6);b.set(x,5,11,"leaves");}
    b.set(2,3,11,"lantern").set(5,3,11,"lantern");
    [3,4].forEach(x=>{b.set(x,6,10,"pane").set(x,7,10,"pane").set(x,10,10,"pane")});
    [2,5].forEach(x=>{b.set(x,6,11,"sprucetrap",2).set(x,7,11,"sprucetrap",2).set(x,10,11,"sprucetrap",2)});
    for(let y=6;y<=10;y++)b.set(1,y,11,"vines",2);
    for(let y=3;y<=8;y++)b.set(-1,y,8,"vines",1);
    // Linke Seite und Rückseite Hauptteil
    [2,3,6,7].forEach(y=>{b.set(0,y,4,"pane",1).set(0,y,5,"pane",1);b.set(-1,y,3,"sprucetrap",1).set(-1,y,6,"sprucetrap",1);
      b.set(3,y,0,"pane").set(4,y,0,"pane");b.set(2,y,-1,"sprucetrap").set(5,y,-1,"sprucetrap");});
    // Seitenflügel vorne: Doppeltür, Fenster, Balkon auf Stämmen
    [10,11].forEach(x=>{b.set(x,1,8,"sprucedoor").set(x,2,8,"sprucedoortop")});
    b.set(13,2,8,"pane").set(13,3,8,"pane");
    [8,13].forEach(x=>b.box(x,1,10,x,4,10,"sprucelog"));
    for(let x=9;x<=12;x++)b.set(x,4,10,"sprucestairs",6);
    b.box(8,5,9,13,5,10,"spruce");
    for(let x=8;x<=13;x++)b.set(x,6,10,"sprucefence");
    b.set(9,4,9,"lantern").set(12,4,9,"lantern");
    b.set(11,6,8,"sprucedoor").set(11,7,8,"sprucedoortop");
    [9,13].forEach(x=>{b.set(x,6,8,"pane").set(x,7,8,"pane");[x-1,x+1].forEach(s=>{b.set(s,6,9,"sprucetrap",2).set(s,7,9,"sprucetrap",2)})});
    // Blumenkästen links und rechts vom Weg
    [8,9,12,13].forEach((x,i)=>{b.set(x,1,11,"dirt").set(x,2,11,i%2?"tulip":"poppy").set(x,1,12,"sprucetrap",2)});
    for(let y=1;y<=4;y++)b.set(15,y,7,"vines",3);
    // Rechte Seite und Rückseite Seitenflügel
    [2,3,6,7].forEach(y=>{b.set(14,y,4,"pane",1).set(14,y,5,"pane",1);b.set(15,y,3,"sprucetrap",3).set(15,y,6,"sprucetrap",3)});
    [2,3].forEach(y=>{b.set(10,y,1,"pane").set(11,y,1,"pane");b.set(9,y,0,"sprucetrap").set(12,y,0,"sprucetrap")});
    // Abgeplatzter Putz
    [[0,1,10],[0,2,10],[0,1,9],[7,1,10],[14,1,8],[14,2,8],[14,1,7],[0,7,1],[0,8,2],[0,7,2],[14,6,1],[7,8,10],[6,8,10],[0,1,1],[14,1,1]].forEach(p=>b.set(...p,"brick"));
    // Einrichtung
    b.set(1,1,1,"furnace").set(2,1,1,"crafting").set(1,1,3,"chest",1).set(1,1,4,"chest",1).set(5,1,7,"lantern");
    b.set(8,1,2,"chest").set(9,1,2,"chest").set(12,1,2,"barrel").set(13,1,2,"barrel").set(11,1,5,"lantern");
    b.set(2,6,1,"bedhead").set(2,6,2,"bedfoot").set(4,6,1,"chest").set(1,6,8,"lantern");
    b.set(13,6,2,"barrel").set(9,6,3,"lantern");
    return b.list();}};
  BUILDS.splice(BUILDS.findIndex(x=>x.id==="windmuehle"),0,b);regen(b);}
