// ---------- Bau-Helfer ----------
// Fester Zufall pro Koordinate, damit Verwitterung bei jedem Laden gleich aussieht
function hsh(x,y,z,s=0){let h=Math.imul(x|0,73856093)^Math.imul(y|0,19349663)^Math.imul(z|0,83492791)^Math.imul(s|0,40503);
  h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967296}
// Ersetzt Blöcke vom Typ base zufällig (aber fest) durch Varianten: vars = [[key, Anteil], …]
function weather(b,base,vars,seed=1,area){b.each((x,y,z,t,r)=>{if(t!==base)return;
  if(area&&!(x>=area[0]&&y>=area[1]&&z>=area[2]&&x<=area[3]&&y<=area[4]&&z<=area[5]))return;
  let u=hsh(x,y,z,seed);for(const [k,p] of vars){if(u<p){b.set(x,y,z,k,r);return}u-=p}})}
const door=(b,x,y,z,k,r=0)=>b.set(x,y,z,k,r).set(x,y+1,z,k+"top",r);
// Satteldach. Außenmaße der Wände x1..x2 / z1..z2, Traufe auf Höhe y, First entlang ax ("x" oder "z").
// t = Dachtreppe, edge = Ortgang (Giebelkante), top = Firstblock bei ungerader Breite, fill = Giebelwand, eave = Gesims unter der Traufe
function gable(b,o){const {x1,x2,z1,z2,y,ax="z",t,edge=t,top,fill,ov=1,eave,eaveOv=ov}=o;
  const W=ax==="z"?[x1,x2]:[z1,z2],L=ax==="z"?[z1-ov,z2+ov]:[x1-ov,x2+ov],E=ax==="z"?[z1,z2]:[x1,x2];
  const put=(u,yy,v,k,r)=>ax==="z"?b.set(u,yy,v,k,r):b.set(v,yy,u,k,r);
  const rl=ax==="z"?3:2,rr=ax==="z"?1:0;let k=0;
  for(;;k++){const a=W[0]-1+k,c=W[1]+1-k;if(a>c)break;
    for(let v=L[0];v<=L[1];v++){const tt=(v===L[0]||v===L[1])?edge:t;
      if(a===c)put(a,y+k,v,top||tt,0);else{put(a,y+k,v,tt,rl);put(c,y+k,v,tt,rr)}}
    if(fill)E.forEach(v=>{for(let u=a+1;u<=c-1;u++)put(u,y+k,v,fill,0)});}
  if(eave){const LL=ax==="z"?[z1-eaveOv,z2+eaveOv]:[x1-eaveOv,x2+eaveOv];
    for(let v=LL[0];v<=LL[1];v++){put(W[0]-1,y-1,v,eave,6+rl);put(W[1]+1,y-1,v,eave,6+rr)}}
  return y+k;}
// Walmdach / Pyramide über x1..x2, z1..z2 ab Höhe y (fill = Decke unter der untersten Lage)
function hip(b,o){const {x1,x2,z1,z2,y,t,cap=t,ov=1,fill}=o;let k=0;
  for(;;k++){const a=x1-ov+k,c=x2+ov-k,d=z1-ov+k,e=z2+ov-k;if(a>c||d>e)break;
    if(a===c||d===e){for(let x=a;x<=c;x++)for(let z=d;z<=e;z++)b.set(x,y+k,z,cap);k++;break}
    for(let x=a;x<=c;x++){b.set(x,y+k,d,t,2);b.set(x,y+k,e,t,0)}
    for(let z=d+1;z<=e-1;z++){b.set(a,y+k,z,t,3);b.set(c,y+k,z,t,1)}
    if(fill&&k===0)for(let x=a+1;x<=c-1;x++)for(let z=d+1;z<=e-1;z++)b.set(x,y+k,z,fill);}
  return y+k;}
// Runde Formen: Zellen einer Scheibe mit Radius r um (0,0)
function disc(r){const o=[],R=Math.ceil(r)+1;for(let x=-R;x<=R;x++)for(let z=-R;z<=R;z++)if(Math.hypot(x,z)<=r+.35)o.push([x,z]);return o}
function rim(r){const S=new Set(disc(r).map(c=>c+""));return disc(r).filter(([x,z])=>[[1,0],[-1,0],[0,1],[0,-1]].some(([a,c])=>!S.has((x+a)+","+(z+c))))}
const facing=(x,z)=>Math.abs(x)>=Math.abs(z)?(x>0?1:3):(z>0?0:2);
function roundWall(b,cx,cz,y1,y2,r,t){rim(r).forEach(([x,z])=>{for(let y=y1;y<=y2;y++)b.set(cx+x,y,cz+z,t)})}
function roundFloor(b,cx,cz,y,r,t){disc(r).forEach(([x,z])=>b.set(cx+x,y,cz+z,t))}
// Kegeldach aus Treppen, Radius r0 schrumpft um dr pro Lage
function cone(b,cx,cz,y,r0,t,fill,cap,dr=1){let k=0,r=r0;
  for(;r>=.5;k++,r-=dr){if(k===0)disc(r).forEach(([x,z])=>b.set(cx+x,y+k,cz+z,fill));rim(r).forEach(([x,z])=>b.set(cx+x,y+k,cz+z,t,facing(x,z)))}
  if(cap)b.set(cx,y+k,cz,cap);return y+k}
// Fenster aus Glasscheiben w×h. Wand verläuft entlang ax; out = Richtung nach außen (+1/-1).
// o.sh = Fensterläden (Falltüren), o.sill = Fensterbank (umgedrehte Treppe), o.box = Blumenkasten
function win(b,x,y,z,ax,out,w,h,o={}){const {pane="pane",sh,sill,box,flowers=["poppy","tulip","dandelion","cornflower"]}=o;
  const at=(i,j,d)=>ax==="x"?[x+i,y+j,z+d*out]:[x+d*out,y+j,z+i];
  const rIn=ax==="x"?(out>0?2:0):(out>0?3:1), rOut=ax==="x"?(out>0?0:2):(out>0?1:3);
  for(let i=0;i<w;i++)for(let j=0;j<h;j++)b.set(...at(i,j,0),pane,ax==="x"?0:1);
  if(sh)for(let j=0;j<h;j++){b.set(...at(-1,j,1),sh,rIn);b.set(...at(w,j,1),sh,rIn)}
  if(sill)for(let i=0;i<w;i++)b.set(...at(i,-1,1),sill,6+rOut);
  if(box)for(let i=0;i<w;i++){b.set(...at(i,-1,1),"dirt");b.set(...at(i,0,1),flowers[(i+x+z)%flowers.length]);b.set(...at(i,-1,2),box,rIn)}}
// Baum: Stamm + runde Krone
function tree(b,x,y,z,h=4,r=2.3,log="log",leaf="oakleaves"){for(let i=0;i<h;i++)b.set(x,y+i,z,log);
  for(let dy=-1;dy<=2;dy++){const rr=r-(dy>0?dy*.8:0)-(dy<0?.6:0);disc(rr).forEach(([a,c])=>{if(hsh(x+a,y+h+dy,z+c,7)<.88||Math.hypot(a,c)<rr-1)b.get(x+a,y+h+dy,z+c)||b.set(x+a,y+h+dy,z+c,leaf)})}
  b.set(x,y+h,z,log)}
const STONEWEATHER=[["mossbrick",.13],["crackbrick",.1],["stone",.04]];

// ---------- Bauten ----------
const BAUTEN=[
{ id:"starterhaus", name:"Starterhaus", cat:"Häuser", diff:"Leicht",
  desc:"Gemütliches Holzhaus für die ersten Tage: Bruchsteinsockel, Eichenrahmen, Satteldach aus Schwarzeiche mit Gesims, Fensterläden und Blumenkästen. Vorne ein kleines Vordach mit Laterne, an der Seite ein Kamin. Drinnen Bett, Werkbank, Ofen, Truhe und Bücherregale.",
  tips:["Bau zuerst Sockel und Eckpfosten, dann siehst du sofort die Form des Hauses.","Die umgedrehten Treppen unter der Dachkante (Gesims) machen viel aus, das Dach wirkt dadurch dicker.","Falltüren als Fensterläden: an die Wand neben das Fenster setzen und hochklappen.","Der Kamin ist reine Deko. Mit einem Lagerfeuer oben drin raucht er sogar."],
  note:"Reiner Deko-Build, alles in Survival gut erreichbar. Schwarzeiche gibt es in dunklen Wäldern, Fichte in der Taiga.",
  q:"minecraft bedrock starter house tutorial",
  make(){const b=B();
    b.box(-3,0,-3,12,0,13,"lawn"); b.box(-1,0,-1,9,0,7,"stone"); b.box(1,0,1,7,0,5,"spruce");
    b.walls(0,1,0,8,1,6,"stone"); b.walls(0,2,0,8,4,6,"planks"); b.walls(0,5,0,8,5,6,"spruce");
    [[0,0],[8,0],[0,6],[8,6],[4,0]].forEach(([x,z])=>b.box(x,1,z,x,5,z,"log"));
    b.box(1,6,1,7,6,5,"spruce");
    gable(b,{x1:0,x2:8,z1:0,z2:6,y:6,ax:"x",t:"darkstairs",edge:"sprucestairs",top:"darkslab",fill:"planks",eave:"darkstairs"});
    door(b,4,1,6,"oakdoor"); b.set(4,3,6,"spruce"); b.set(3,4,6,"oaktrap",0); b.set(5,4,6,"oaktrap",0);
    win(b,1,2,6,"x",1,2,2,{sh:"sprucetrap"}); win(b,6,2,6,"x",1,2,2,{sh:"sprucetrap"});
    [1,2,6,7].forEach((x,i)=>{b.set(x,1,7,"dirt").set(x,2,7,["poppy","dandelion","cornflower","tulip"][i]).set(x,1,8,"sprucetrap",2)});
    win(b,2,2,0,"x",-1,1,2,{sh:"sprucetrap"}); win(b,6,2,0,"x",-1,1,2,{sh:"sprucetrap"});
    win(b,0,2,2,"z",-1,3,2,{sh:"sprucetrap"});
    win(b,0,7,3,"z",-1,1,1); win(b,8,7,2,"z",1,1,1); win(b,8,7,4,"z",1,1,1);
    // Vordach auf Zaunpfosten
    [3,5].forEach(x=>b.box(x,1,8,x,3,8,"sprucefence")); for(let x=3;x<=5;x++){b.set(x,4,8,"darkstairs",0);b.set(x,4,7,"darkslab")}
    b.set(4,3,7,"lanternh"); b.set(3,5,6,"log"); b.set(5,5,6,"log"); b.set(4,0,8,"cobstairs",0);
    for(let z=9;z<=12;z++){b.set(4,0,z,"path");b.set(3,0,z,z%2?"gravel":"path");b.set(5,0,z,"lawn")}
    // Kamin
    b.box(9,0,3,9,11,3,"stone"); b.set(9,12,3,"cobwall"); b.set(10,0,3,"stone").set(10,1,3,"cobstairs",1);
    // Laterne am Weg, Holzstapel
    b.box(1,1,11,1,2,11,"sprucefence"); b.set(1,3,11,"lantern");
    tree(b,11,1,-1,5,2.6);
    // Einrichtung
    b.set(1,1,1,"bedhead").set(1,1,2,"bedfoot"); b.set(2,1,1,"bookshelf").set(5,1,1,"bookshelf").set(5,2,1,"bookshelf");
    b.set(7,1,1,"crafting").set(6,1,1,"furnace").set(7,1,3,"chest",3).set(7,1,4,"barrel");
    for(let x=3;x<=5;x++)b.set(x,1,3,"carpet_r"); b.set(4,5,3,"lanternh"); b.set(1,1,5,"pot");
    weather(b,"stone",[["mossy",.22]],3);
    return b.list();}},

{ id:"landhaus", name:"Landhaus am See", cat:"Häuser", diff:"Mittel",
  desc:"Weißes Landhaus mit zwei Etagen: links der hohe Hauptteil mit Giebel nach vorne, rechts ein niedrigerer Seitenflügel mit Balkon. Mangrovenholz-Dach mit Fichtenholz-Kanten und Gesims, Fensterläden aus Falltüren, Laternen, Ranken, eine Laubhecke über der Haustür, Blumenkästen und ein Kamin. Drinnen Bett, Truhen, Werkbank und Ofen, nach oben geht es per Leiter.",
  tips:["Weißer Beton entsteht, wenn Betonpulver Wasser berührt. Pulver setzen und mit einem Wassereimer drübergehen, oder direkt an einem Fluss craften und umwandeln.","Statt Beton gehen auch Kalzit oder glatter Quarz, die wirken etwas wärmer.","Die Steinziegel in den weißen Wänden sollen wie abgeplatzter Putz aussehen, setz sie ruhig unregelmäßig.","Wenn neben den Blumenkästen Grasblöcke liegen, wird die Erde darin mit der Zeit von selbst grün.","Der Bau sieht direkt am Wasser am besten aus, z. B. am Fluss- oder Seeufer."],
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
        // Gesims unter der Traufe, Kamin
    for(let z=-1;z<=11;z++)b.set(-1,8,z,"sprucestairs",9);
    for(let x=8;x<=15;x++)b.set(x,7,0,"sprucestairs",8);
    b.box(1,10,2,1,14,2,"redbrick"); b.set(1,15,2,"cobwall");
    weather(b,"stone",[["mossy",.18]],5);
    return b.list();}},
{ id:"windmuehle", name:"Windmühle", cat:"Häuser", diff:"Mittel",
  desc:"Runde Turmwindmühle: Sockel aus verwitterten Steinziegeln, darüber ein Holzturm mit Stammrippen, umlaufender Balkon auf Konsolen und eine Kegelkappe aus Schwarzeiche. Vorne drehen sich (gedanklich) vier große Flügel aus Wolle mit Zaun-Rahmen. Rundherum Heuballen, Fässer und ein Weg zur Tür.",
  tips:["Runde Türme gehen am leichtesten, wenn du erst den Grundriss auf dem Boden legst und dann Schicht für Schicht hochziehst. Die Schichtansicht hilft dabei.","Die Flügel stehen eine Blockreihe vor dem Turm, damit sie den Balkon nicht berühren.","Statt weißer Wolle passen auch hellgraue oder braune Segel.","Bau die Mühle auf einen kleinen Hügel neben ein Weizenfeld, dann wirkt sie noch größer."],
  note:"Reiner Deko-Build, keine versionsabhängige Technik.",
  q:"minecraft bedrock windmill tutorial",
  make(){const b=B();
    roundFloor(b,0,0,0,8,"lawn"); roundFloor(b,0,0,0,5,"stone");
    roundWall(b,0,0,1,6,4,"brick");
    rim(5).forEach(([x,z])=>b.set(x,6,z,"sprucestairs",6+facing(x,z)));
    roundFloor(b,0,0,7,5.5,"spruce"); rim(5.5).forEach(([x,z])=>b.set(x,8,z,"sprucefence"));
    roundWall(b,0,0,7,11,3.5,"spruce"); roundWall(b,0,0,12,15,3,"spruce");
    b.each((x,y,z,t)=>{if(t==="spruce"&&y>=7&&(x===0||z===0)&&Math.hypot(x,z)>2.4)b.set(x,y,z,"sprucelog")});
    rim(3.6).forEach(([x,z])=>b.set(x,12,z,"sprucestairs",6+facing(x,z)));
    cone(b,0,0,16,4.2,"darkstairs","dark","darklog"); 
    roundFloor(b,0,0,12,2.6,"spruce");
    // Welle und Flügel
    b.set(0,13,4,"darklog").set(0,13,5,"darklog").set(0,13,6,"log");
    const arm=(dx,dy,sx,sy)=>{for(let d=1;d<=8;d++){const x=dx*d,y=13+dy*d;b.set(x,y,6,"darklog");
      if(d>=2&&d<=8){const cross=d===2||d===5||d===8;b.set(x+sx,y+sy,6,cross?"spruce":"wool");b.set(x+2*sx,y+2*sy,6,cross?"spruce":"wool")}}};
    arm(0,1,1,0);arm(1,0,0,-1);arm(0,-1,-1,0);arm(-1,0,0,1);
    // Tür, Fenster
    door(b,0,1,4,"sprucedoor"); b.set(-1,3,4,"brickstairs",7).set(1,3,4,"brickstairs",9);
    b.set(-1,1,5,"lantern").set(1,1,5,"lantern");
    [[4,0,1],[-4,0,1],[0,-4,0]].forEach(([x,z,r])=>{b.set(x,3,z,"ironbars",r).set(x,4,z,"ironbars",r)});
    [[3,0,1],[-3,0,1],[0,-3,0]].forEach(([x,z,r])=>{b.set(x,9,z,"pane",r).set(x,10,z,"pane",r)});
    b.set(0,9,3,"pane").set(0,10,3,"pane");
    // Umgebung
    for(let z=5;z<=8;z++)b.set(0,0,z,"path"); b.set(1,0,6,"path").set(-1,0,7,"gravel");
    [[3,1,4],[4,1,3],[3,2,4],[-4,1,-3],[-3,1,-4],[-4,1,-4],[-4,2,-4]].forEach(p=>b.set(...p,"hay"));
    b.set(-3,1,4,"barrel").set(-4,1,3,"barrel").set(4,1,-3,"barrel",4);
    // Innen
    b.set(2,1,2,"chest",3).set(-2,1,2,"barrel").set(2,1,-2,"crafting").set(0,5,0,"lanternh");
    for(let y=1;y<=7;y++)b.set(0,y,-3,"ladder",2);
    weather(b,"brick",STONEWEATHER,21); weather(b,"stone",[["mossy",.2]],22);
    return b.list();}},

{ id:"wachturm", name:"Wachturm", cat:"Häuser", diff:"Mittel",
  desc:"Massiver Steinturm mit schrägem Sockel, Strebepfeilern an den Ecken und Schießscharten aus Eisengittern. Oben kragt die Plattform auf einer Konsole aus umgedrehten Treppen aus, mit Zinnen ringsum und einem Walmdach aus Tiefenschiefer auf Stammpfosten. Innen führt eine Leiter über einen Zwischenboden nach oben, ganz oben weht eine Fahne.",
  tips:["Die Konsole unter der Plattform sind umgedrehte Treppen. Die setzt du, indem du an die obere Hälfte der Wand klickst.","Zinnen: eine Reihe Steinziegel rundum, darauf jeden zweiten Block noch einen.","Ein paar bemooste und rissige Steinziegel lassen den Turm alt aussehen. Nicht zu viele, etwa jeder fünfte Block.","Laternen unter dem Dach sieht man nachts von weit weg."],
  note:"Reiner Deko-Build, keine versionsabhängige Technik.",
  q:"minecraft bedrock medieval watchtower tutorial",
  make(){const b=B();
    b.box(-3,0,-3,9,0,9,"lawn"); b.box(-1,0,-1,7,0,7,"stone");
    b.walls(0,1,0,6,15,6,"brick");
    for(let i=-1;i<=7;i++){b.set(i,1,-1,"brickstairs",2);b.set(i,1,7,"brickstairs",0);b.set(-1,1,i,"brickstairs",3);b.set(7,1,i,"brickstairs",1)}
    [[0,0,-1,-1],[6,0,1,-1],[0,6,-1,1],[6,6,1,1]].forEach(([x,z,dx,dz])=>{for(let y=1;y<=6;y++){b.set(x+dx,y,z,"brick");b.set(x,y,z+dz,"brick")}
      b.set(x+dx,7,z,"brickstairs",dx>0?1:3);b.set(x,7,z+dz,"brickstairs",dz>0?0:2);b.set(x+dx,1,z+dz,"brick").set(x+dx,2,z+dz,"brickstairs",dx>0?1:3)});
    b.box(1,8,1,5,8,5,"spruce"); for(let y=1;y<=16;y++)b.set(3,y,1,"ladder",2);
    door(b,3,1,6,"sprucedoor"); b.set(3,3,6,"crackbrick");
    for(let x=2;x<=4;x++)b.set(x,4,7,"brickstairs",0);
    [2,4].forEach(x=>{b.set(x,3,7,"sprucefence").set(x,2,7,"lanternh")});
    [[3,0,0],[3,6,0],[0,3,1],[6,3,1]].forEach(([x,z,r])=>{[[5,6],[11,12]].forEach(([a,c])=>{if(!(z===6&&a===5)){b.set(x,a,z,"ironbars",r).set(x,c,z,"ironbars",r)}})});
    for(let i=-1;i<=7;i++){b.set(i,15,-1,"brickstairs",8);b.set(i,15,7,"brickstairs",6);b.set(-1,15,i,"brickstairs",9);b.set(7,15,i,"brickstairs",7)}
    b.box(-1,16,-1,7,16,7,"brick"); b.box(0,16,0,6,16,6,"spruce"); b.set(3,16,1,"ladder",2);
    for(let i=-1;i<=7;i++)[[i,-1],[i,7],[-1,i],[7,i]].forEach(([x,z])=>{b.set(x,17,z,"brick");if((x+z)%2===0)b.set(x,18,z,"brick")});
    [[0,0],[6,0],[0,6],[6,6]].forEach(([x,z])=>b.box(x,17,z,x,19,z,"darklog"));
    const top=hip(b,{x1:0,x2:6,z1:0,z2:6,y:20,t:"deepstairs",cap:"deeptile",fill:"dark"});
    b.set(3,19,3,"lanternh"); b.box(3,top,3,3,top+2,3,"darkfence"); b.set(4,top+2,3,"concrete_r").set(5,top+2,3,"concrete_r").set(4,top+1,3,"concrete_r");
    b.set(5,1,5,"chest",3).set(1,1,5,"barrel").set(5,1,1,"barrel").set(1,9,5,"lantern").set(5,9,5,"chest",3);
    weather(b,"brick",STONEWEATHER,31); weather(b,"stone",[["mossy",.2]],32);
    return b.list();}},

{ id:"burg", name:"Burg", cat:"Burgen", diff:"Schwer",
  desc:"Große Burganlage: doppelt dicke Ringmauer mit Wehrgang und Zinnen, vier Ecktürme mit Konsolen, Zinnenkranz und Pyramidendach, ein Torhaus mit Rundbogen und halb hochgezogenem Fallgitter. Im Hof steht der Bergfried mit Satteldach und Fenstern auf drei Ebenen, dazu ein Brunnen, ein Baum, Heu und Fässer und eine Treppe hinauf auf den Wehrgang.",
  tips:["Bau in dieser Reihenfolge: Ecktürme, Mauern, Torhaus, Bergfried, Hof. So kannst du jederzeit aufhören und es sieht fertig aus.","Für die Steinoptik etwa jeden achten Block durch bemooste oder rissige Steinziegel ersetzen.","Das Fallgitter sind Eisengitter. Wer es hochfahrbar will, nimmt Kolben, das ist aber deutlich aufwendiger.","Material vorher sammeln: allein die Mauern brauchen viele Stacks Steinziegel. Ein Bruchsteingenerator und ein Ofen helfen."],
  note:"Reiner Deko-Build, keine versionsabhängige Technik. Sehr groß, plane mehrere Spielabende ein.",
  q:"minecraft bedrock castle tutorial",
  make(){const b=B(),S=26,G=13;
    b.box(-5,0,-5,S+5,0,S+7,"lawn");
    b.walls(0,1,0,S,9,S,"brick"); b.walls(1,1,1,S-1,9,S-1,"brick");
    for(let i=-1;i<=S+1;i++){b.set(i,1,-1,"brickstairs",2);b.set(i,1,S+1,"brickstairs",0);b.set(-1,1,i,"brickstairs",3);b.set(S+1,1,i,"brickstairs",1)}
    for(let i=0;i<=S;i++)[[i,0],[i,S],[0,i],[S,i]].forEach(([x,z])=>{b.set(x,10,z,"brick");if((x+z)%2===0)b.set(x,11,z,"brick")});
    // Ecktürme
    [[0,0],[S,0],[0,S],[S,S]].forEach(([cx,cz])=>{
      b.box(cx-3,1,cz-3,cx+3,14,cz+3,"brick");b.box(cx-2,1,cz-2,cx+2,13,cz+2,"spruce");b.box(cx-2,2,cz-2,cx+2,13,cz+2,"air");
      for(let i=-4;i<=4;i++){b.set(cx+i,13,cz-4,"brickstairs",8);b.set(cx+i,13,cz+4,"brickstairs",6);b.set(cx-4,13,cz+i,"brickstairs",9);b.set(cx+4,13,cz+i,"brickstairs",7)}
      b.box(cx-4,14,cz-4,cx+4,14,cz+4,"brick");
      for(let i=-4;i<=4;i++)[[i,-4],[i,4],[-4,i],[4,i]].forEach(([a,c])=>{b.set(cx+a,15,cz+c,"brick");if((a+c)%2===0)b.set(cx+a,16,cz+c,"brick")});
      const t=hip(b,{x1:cx-3,x2:cx+3,z1:cz-3,z2:cz+3,y:16,t:"deepstairs",cap:"deeptile",fill:"dark",ov:0});
      b.box(cx,t,cz,cx,t+1,cz,"darkfence");
      [[0,-3,0],[0,3,0],[-3,0,1],[3,0,1]].forEach(([a,c,r])=>[5,6,10,11].forEach(y=>b.set(cx+a,y,cz+c,"ironbars",r)));
      b.set(cx,15,cz,"lanternh");});
    // Torhaus vorne (+z)
    b.box(G-4,1,S-2,G+4,13,S+3,"brick");
    for(let x=G-2;x<=G+2;x++)for(let y=1;y<=5;y++)for(let z=S-3;z<=S+3;z++)b.del(x,y,z);
    for(let z=S-2;z<=S+3;z++){b.set(G-2,5,z,"brickstairs",7);b.set(G+2,5,z,"brickstairs",9)}
    for(let x=G-1;x<=G+1;x++){b.set(x,5,S+3,"ironbars");b.set(x,4,S+3,"ironbars")}
    for(let i=G-5;i<=G+5;i++){b.set(i,13,S+4,"brickstairs",6);b.set(i,13,S-3,"brickstairs",8)} for(let z=S-3;z<=S+4;z++){b.set(G-5,13,z,"brickstairs",9);b.set(G+5,13,z,"brickstairs",7)}
    b.box(G-5,14,S-3,G+5,14,S+4,"brick");
    for(let x=G-5;x<=G+5;x++)[S-3,S+4].forEach(z=>{b.set(x,15,z,"brick");if((x+z)%2===0)b.set(x,16,z,"brick")});
    for(let z=S-3;z<=S+4;z++)[G-5,G+5].forEach(x=>{b.set(x,15,z,"brick");if((x+z)%2===0)b.set(x,16,z,"brick")});
    [G-3,G+3].forEach(x=>{win(b,x,8,S+3,"x",1,1,2);b.set(x,7,S+4,"sprucefence").set(x,6,S+4,"lanternh")});
    win(b,G,9,S+3,"x",1,1,2);
    // Bergfried
    const K1=8,K2=18,Z1=6,Z2=14;
    b.box(K1,1,Z1,K2,17,Z2,"brick"); b.box(K1+1,1,Z1+1,K2-1,17,Z2-1,"air");
    [6,11].forEach(y=>b.box(K1+1,y,Z1+1,K2-1,y,Z2-1,"spruce"));
    gable(b,{x1:K1,x2:K2,z1:Z1,z2:Z2,y:18,ax:"x",t:"deepstairs",top:"deepslab",fill:"brick",eave:"brickstairs"});
    [K1+2,K1+5,K2-5,K2-2].forEach(x=>[2,7,12].forEach(y=>{if(!(x===13&&y===2)){win(b,x,y,Z2,"x",1,1,2);win(b,x,y,Z1,"x",-1,1,2)}}));
    door(b,13,1,Z2,"sprucedoor"); b.set(12,1,Z2+1,"lantern").set(14,1,Z2+1,"lantern");
    [10,16].forEach(x=>{b.box(x,18,Z1+4,x,23,Z1+4,"brick");b.set(x,24,Z1+4,"cobwall")});
    // Hof
    for(let z=Z2+1;z<=S+4;z++)for(let x=G-1;x<=G+1;x++)b.set(x,0,z,hsh(x,0,z,5)<.3?"gravel":"path");
    b.box(4,0,17,6,1,19,"stone"); b.set(5,1,18,"water"); [[4,17],[6,17],[4,19],[6,19]].forEach(([x,z])=>b.box(x,2,z,x,3,z,"sprucefence"));
    b.box(4,4,17,6,4,19,"spruceslab"); b.set(5,3,18,"lanternh");
    tree(b,21,1,19,4,2.2);
    [[3,1,9],[3,1,10],[3,2,9],[22,1,8],[23,1,8]].forEach(p=>b.set(...p,"hay"));
    [[3,1,12],[4,1,12],[23,1,11],[22,1,22],[23,1,22]].forEach(p=>b.set(...p,"barrel"));
    for(let k=0;k<=8;k++){b.set(2,1+k,20-k,"brickstairs",0);for(let y=1;y<1+k;y++)b.set(2,y,20-k,"brick")}
    [[6,6],[20,6],[6,22],[20,22]].forEach(([x,z])=>{b.box(x,1,z,x,2,z,"brickwall");b.set(x,3,z,"lantern")});
    weather(b,"brick",STONEWEATHER,41); weather(b,"stone",[["mossy",.25]],42);
    b.each((x,y,z,t)=>{if(t==="air")b.del(x,y,z)});
    return b.list();}},

{ id:"netherportal", name:"Netherportal-Tor", cat:"Portale", diff:"Mittel",
  desc:"Das Netherportal als steinernes Tor: erhöhte Plattform aus Tiefenschieferfliesen mit Stufen, mächtige Pfeiler aus Steinziegeln, ein gestufter Giebel obendrauf und Laternen an Ketten. Der Rahmen selbst bleibt das normale 4×5-Portal aus 10 Obsidian.",
  tips:["Bau zuerst das Portal mit 10 Obsidian und zünde es testweise an, erst dann den Steinrahmen drumherum.","Die vier Ecken des Portalrahmens brauchen kein Obsidian, dort sitzen hier Tiefenschieferfliesen.","Notier dir die Koordinaten. Im Nether teilst du X und Z durch 8, damit beide Portale verbunden bleiben."],
  note:"Portalgröße 4×5 ist die kleinste mögliche und funktioniert in Bedrock genauso.",
  q:"minecraft bedrock nether portal design",
  make(){const b=B();
    b.box(-6,0,-4,9,0,5,"lawn"); b.box(-4,1,-2,7,1,3,"deeptile");
    for(let x=-4;x<=7;x++){b.set(x,1,4,"brickstairs",0);b.set(x,1,-3,"brickstairs",2)} for(let z=-2;z<=3;z++){b.set(-5,1,z,"brickstairs",3);b.set(8,1,z,"brickstairs",1)}
    b.set(-5,1,4,"brick").set(8,1,4,"brick").set(-5,1,-3,"brick").set(8,1,-3,"brick");
    for(let x=1;x<=2;x++){b.set(x,2,0,"obsidian");b.set(x,6,0,"obsidian")}
    for(let y=3;y<=5;y++){b.set(0,y,0,"obsidian");b.set(3,y,0,"obsidian");b.set(1,y,0,"portal");b.set(2,y,0,"portal")}
    [[0,2],[3,2],[0,6],[3,6]].forEach(([x,y])=>b.set(x,y,0,"deeptile"));
    [-2,5].forEach(x=>{b.box(x,2,-1,x,8,1,"brick");b.set(x,2,2,"brickstairs",0).set(x,2,-2,"brickstairs",2)});
    [-1,4].forEach(x=>{b.box(x,2,0,x,7,0,"brick")});
    b.box(-2,8,-1,5,8,1,"brick"); b.box(0,7,0,3,7,0,"brick");
    b.set(-1,6,0,"brickstairs",7).set(4,6,0,"brickstairs",9);
    for(let x=-3;x<=6;x++){b.set(x,8,2,"brickstairs",6);b.set(x,8,-2,"brickstairs",8)}
    b.set(-3,8,0,"brickstairs",9).set(6,8,0,"brickstairs",7).set(-3,8,1,"brickstairs",9).set(6,8,1,"brickstairs",7).set(-3,8,-1,"brickstairs",9).set(6,8,-1,"brickstairs",7);
    for(let z=-1;z<=1;z++){b.set(-2,9,z,"brickstairs",3);b.set(5,9,z,"brickstairs",1);b.box(-1,9,z,4,9,z,"brick");b.set(-1,10,z,"brickstairs",3);b.set(4,10,z,"brickstairs",1);b.box(0,10,z,3,10,z,"brick");b.set(0,11,z,"brickstairs",3);b.set(3,11,z,"brickstairs",1);b.box(1,11,z,2,11,z,"brickslab")}
    [-1,4].forEach(x=>{b.set(x,7,2,"chain").set(x,6,2,"lanternh")});
    [-4,7].forEach(x=>{b.box(x,2,3,x,3,3,"brickwall");b.set(x,4,3,"lantern")});
    b.set(-2,3,2,"vines",0).set(-2,4,2,"vines",0).set(5,2,2,"vines",0);
    weather(b,"brick",STONEWEATHER,51);
    return b.list();}},

{ id:"lager", name:"Lagerhalle", cat:"Lager", diff:"Mittel",
  desc:"Lagerhalle mit 32 Truhen als Doppeltruhen-Paare zwischen Fichtenpfosten, dazu Fass-Regale an den Stirnseiten. Oben Lichtband-Fenster, eine Balkendecke mit zwei Kronleuchtern an Ketten und ein Satteldach. In der Mitte Arbeitsplatz mit Werkbank, Ofen und Amboss-freier Sortierfläche.",
  tips:["Die Fichtenstämme zwischen den Truhenpaaren verhindern, dass Truhen versehentlich zu falschen Doppeltruhen verschmelzen.","Beschrifte Truhen mit Schildern oder Rahmen mit dem Item darin, das spart viel Suchen.","Fässer kannst du auch unter Blöcken öffnen, deshalb eignen sie sich gut für Regale.","Später lässt sich an die Rückwand eine Sortieranlage mit Trichtern anbauen."],
  note:"Reiner Deko-Build, keine versionsabhängige Technik.",
  q:"minecraft bedrock storage room design",
  make(){const b=B();
    b.box(-2,0,-2,16,0,15,"lawn"); b.box(0,0,0,14,0,10,"stone"); b.box(1,0,1,13,0,9,"spruce");
    b.walls(0,1,0,14,1,10,"brick"); b.walls(0,2,0,14,5,10,"spruce");
    [0,3,6,8,11,14].forEach(x=>[0,10].forEach(z=>b.box(x,1,z,x,5,z,"sprucelog"))); [0,14].forEach(x=>[5].forEach(z=>b.box(x,1,z,x,5,z,"sprucelog")));
    b.box(1,6,1,13,6,9,"dark"); [3,6,8,11].forEach(x=>b.box(x,5,1,x,5,9,"darklog"));
    gable(b,{x1:0,x2:14,z1:0,z2:10,y:6,ax:"x",t:"darkstairs",edge:"sprucestairs",top:"darkslab",fill:"spruce",eave:"darkstairs"});
    [[1,2],[4,5],[9,10],[12,13]].forEach(([a,c])=>{[1,9].forEach(z=>{const r=z===1?0:2;[a,c].forEach(x=>{b.set(x,1,z,"chest",r).set(x,2,z,"chest",r)});
      [a,c].forEach(x=>b.set(x,4,z===1?0:10,"pane"))});
      [a,c].forEach(x=>b.set(x,3,1,"sprucetrap",0))});
    [3,6,8,11].forEach(x=>[1,9].forEach(z=>b.box(x,1,z,x,3,z,"sprucelog")));
    for(let z=2;z<=8;z++)[1,13].forEach(x=>{for(let y=1;y<=3;y++)b.set(x,y,z,"barrel",x===1?1:3)});
    b.set(1,1,5,"air").set(1,2,5,"air"); 
    [6,8].forEach(x=>b.set(x,1,9,"air").set(x,2,9,"air").set(x,3,9,"air")); b.box(7,1,10,7,3,10,"air");
    b.walls(5,1,10,9,1,13,"brick"); b.walls(5,2,10,9,5,13,"spruce"); [[5,13],[9,13]].forEach(([x,z])=>b.box(x,1,z,x,5,z,"sprucelog"));
    b.box(6,1,10,8,5,12,"air"); b.box(6,0,11,8,0,12,"spruce");
    gable(b,{x1:5,x2:9,z1:10,z2:13,y:6,ax:"z",t:"darkstairs",edge:"sprucestairs",top:"darkslab",fill:"spruce",eave:"darkstairs",ov:1});
    b.box(6,6,9,8,7,10,"spruce"); door(b,7,1,13,"sprucedoor"); b.set(7,3,13,"spruce"); win(b,7,7,13,"x",1,1,1);
    [6,8].forEach(x=>{b.set(x,3,14,"sprucefence").set(x,2,14,"lanternh")});
    win(b,2,2,10,"x",1,2,2,{sh:"sprucetrap"}); win(b,11,2,10,"x",1,2,2,{sh:"sprucetrap"});
    for(let z=2;z<=8;z++)b.set(7,1,z,"carpet_r");
    b.set(6,1,2,"crafting").set(7,1,2,"furnace").set(8,1,2,"smoker");
    [[4,5],[10,5]].forEach(([x,z])=>{b.set(x,5,z,"chain").set(x,4,z,"lanternh")});
    for(let z=14;z<=15;z++)b.set(7,0,z,"path"); b.box(-2,0,14,16,0,15,"lawn"); b.set(7,0,14,"path").set(7,0,15,"path");
    weather(b,"brick",STONEWEATHER,61); weather(b,"stone",[["mossy",.2]],62);
    b.each((x,y,z,t)=>{if(t==="air")b.del(x,y,z)});
    return b.list();}},

{ id:"leuchtfeuer", name:"Leuchtfeuer-Pyramide", cat:"Deko", diff:"Mittel",
  desc:"Volle vierstufige Leuchtfeuer-Pyramide mit allen Effekten, hier aus vier verschiedenen Erzblöcken: Eisen unten, dann Gold, Smaragd und Diamant. Eingefasst in einen Sockel aus glattem Stein mit Treppenkante, vier Laternensäulen an den Ecken. Der Strahl geht durch das blaue Glas und leuchtet blau.",
  tips:["Eisen, Gold, Smaragd, Diamant und Netherit kannst du beliebig mischen, das Leuchtfeuer funktioniert mit jeder Kombination.","Die volle Pyramide braucht 164 Blöcke: 81 + 49 + 25 + 9.","Für den Leuchtfeuer-Block brauchst du einen Netherstern vom Wither.","Gefärbtes Glas über dem Leuchtfeuer färbt den Strahl, ganz ohne Effekt auf die Wirkung."],
  note:"Pyramidenstufen 9×9, 7×7, 5×5 und 3×3 sind fest vorgegeben und in Bedrock gleich.",
  q:"minecraft bedrock beacon pyramid",
  make(){const b=B();
    b.box(-4,0,-4,12,0,12,"lawn"); b.box(-2,0,-2,10,0,10,"smooth");
    for(let i=-2;i<=10;i++){b.set(i,0,-3,"brickstairs",2);b.set(i,0,11,"brickstairs",0);b.set(-3,0,i,"brickstairs",3);b.set(11,0,i,"brickstairs",1)}
    b.box(0,1,0,8,1,8,"ironblock"); b.box(1,2,1,7,2,7,"goldblock"); b.box(2,3,2,6,3,6,"emeraldblock"); b.box(3,4,3,5,4,5,"diamondblock");
    b.set(4,5,4,"beacon").set(4,6,4,"glass_b");
    [[-2,-2],[10,-2],[-2,10],[10,10]].forEach(([x,z])=>{b.set(x,1,z,"smooth");b.box(x,2,z,x,3,z,"brickwall");b.set(x,4,z,"lantern")});
    return b.list();}},
];
BUILDS.push(...BAUTEN);
