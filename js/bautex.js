// ---------- Texturen für Bau- und Deko-Blöcke ----------
// Helfer: Steinziegel-Muster, Stamm, Tür, Falltür, Mauerwerk
function brickTile(key,base,dark,light,extra){return tile(key,(p,R,q)=>{noiseFill(p,q,base,.6);
  for(let x=0;x<16;x++){p(x,7,dark);p(x,15,dark);p(x,0,light);p(x,8,light)}
  for(let y=0;y<7;y++){p(15,y,dark);p(0,y,light)}
  for(let y=8;y<15;y++){p(7,y,dark);p(8,y,light)}
  if(extra)extra(p,R,q);})}
function logTex(key,bark,ringA,ringB){
  const side=tile(key+"s",(p,R,q)=>{const ct=[];for(let x=0;x<16;x++)ct.push([.72,.86,1,.92][R()*4|0]);
    for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,bark,ct[x]*(R()<.08?.8:1));});
  const top=tile(key+"t",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const d=Math.max(Math.abs(x-7.5),Math.abs(y-7.5));
    if(d>=7)p(x,y,bark,q());else p(x,y,(Math.floor(d)%2)?ringA:ringB,q()*.06+.97)}});
  return {side,top,bottom:top}}
function doorTex(key,c,dk,top){const front=tile(key,(p,R,q,g)=>{
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){const edge=x<1||x>14||(top?y<1:y>14);p(x,y,c,edge?.75:q()*.98)}
    for(let y=0;y<16;y++)p(7,y,dk);
    if(top)[[2,3,5,8],[9,3,12,8]].forEach(([x1,y1,x2,y2])=>{for(let y=y1;y<=y2;y++)for(let x=x1;x<=x2;x++)g.clearRect(x,y,1,1)});
    else{for(let i=1;i<15;i++){p(i,i,dk);p(15-i,i,dk)}p(12,4,"#c9b27a");p(12,5,"#a08850");}});
  return {side:front,front,back:front,top:front,bottom:front}}
function trapTex(key,c,dk){return {all:tile(key,(p,R,q,g)=>{
  for(let y=0;y<16;y++)for(let x=0;x<16;x++){const edge=x<2||x>13||y<2||y>13;p(x,y,c,edge?.78:q()*.98)}
  for(let y=2;y<14;y++){p(5,y,dk);p(10,y,dk)}
  [[3,4],[4,4],[11,4],[12,4],[3,11],[4,11],[11,11],[12,11]].forEach(([x,y])=>g.clearRect(x,y,1,1));})}}
function moss(p,R,dens){for(let y=0;y<16;y++)for(let x=0;x<16;x++){const k=Math.sin(x*.9+y*.4)+Math.cos(y*.7-x*.3);if(k>1.1-dens&&R()<.75)p(x,y,R()<.5?"#5d7a35":"#4c672b")}}
function flowerTex(key,head,core){return {all:tile(key,(p,R,q,g)=>{g.clearRect(0,0,16,16);
  for(let y=8;y<16;y++)p(7,y,"#4d8a2a");p(6,11,"#5fa03a");p(5,10,"#5fa03a");p(8,12,"#5fa03a");p(9,11,"#5fa03a");
  for(let y=4;y<8;y++)for(let x=5;x<10;x++)if(!((x==5||x==9)&&(y==4||y==7)))p(x,y,head,q());p(7,5,core);p(7,6,core);})}}

Object.assign(TEX,{
  concrete_w(){return {all:tile("whiteconc",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,"#e4e6e6",.97+R()*.05)})}},
  concrete_r(){return {all:tile("redconc",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,"#8e2622",.96+R()*.06)})}},
  spruce(){return TEX.planks("spruceplanks","#735536")},
  sprucestairs(){return TEX.spruce()}, spruceslab(){return TEX.spruce()}, spruceslabtop(){return TEX.spruce()}, sprucefence(){return TEX.spruce()},
  sprucelog(){return logTex("sprlog","#3e2b19","#7a5a38","#68492b")},
  sprucetrap(){return trapTex("sprtrap","#6a4c2e","#4e3720")},
  sprucedoor(){return doorTex("sprdoor","#6a4c2e","#4e3720",false)},
  sprucedoortop(){return doorTex("sprdoortop","#6a4c2e","#4e3720",true)},
  mangplanks(){return TEX.planks("mangplanks","#8a4332")}, mangstairs(){return TEX.mangplanks()},
  oakstairs(){return TEX.planks()}, oakslab(){return TEX.planks()}, oakslabtop(){return TEX.planks()},
  oaktrap(){return trapTex("oaktrap","#a5814a","#7c5f33")},
  oakdoor(){return doorTex("oakdoor","#a5814a","#7c5f33",false)},
  oakdoortop(){return doorTex("oakdoortop","#a5814a","#7c5f33",true)},
  darklog(){return logTex("dklog","#3a2a18","#5a4026","#4a341e")},
  darkstairs(){return TEX.dark()}, darkslab(){return TEX.dark()}, darkslabtop(){return TEX.dark()}, darkfence(){return TEX.dark()},
  brickstairs(){return TEX.brick()}, brickslab(){return TEX.brick()}, brickslabtop(){return TEX.brick()}, brickwall(){return TEX.brick()},
  mossbrick(){return {all:brickTile("mossbrick","#7d7d7d","#555555","#959595",(p,R)=>moss(p,R,.9))}},
  crackbrick(){return {all:brickTile("crackbrick","#7a7a7a","#555555","#929292",(p,R)=>{
    [[3,1],[4,2],[4,3],[5,4],[5,5],[6,6],[11,9],[10,10],[10,11],[9,12],[9,13],[12,2],[13,3]].forEach(([x,y])=>p(x,y,"#4a4a4a"))})}},
  mossy(){const s=TEX.stone().all;return {all:tile("mossycob",(p,R,q,g)=>{g.drawImage(s,0,0);moss(p,R,1.1)})}},
  cobstairs(){return TEX.stone()}, cobwall(){return TEX.stone()},
  smooth(){return {all:tile("smooth",(p,R,q)=>{noiseFill(p,q,"#a3a3a3",.25);for(let i=0;i<16;i++){p(i,0,"#b4b4b4");p(0,i,"#b4b4b4");p(i,15,"#8a8a8a");p(15,i,"#8a8a8a")}})}},
  andesite(){return {all:tile("pandesite",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,R()<.15?"#7c7f7f":"#8f9291",q()*.03+.98);
    for(let i=0;i<16;i++){p(i,0,"#a0a3a2");p(0,i,"#a0a3a2");p(i,15,"#6d706f");p(15,i,"#6d706f")}})}},
  deeptile(){return {all:tile("deeptile",(p,R,q)=>{noiseFill(p,q,"#3c3c42",.5);
    for(let i=0;i<16;i++){p(i,7,"#232327");p(i,15,"#232327");p(7,i,"#232327");p(15,i,"#232327");p(i,0,"#4a4a51");p(i,8,"#4a4a51");p(0,i,"#4a4a51");p(8,i,"#4a4a51")}})}},
  deepstairs(){return TEX.deeptile()}, deepslab(){return TEX.deeptile()},
  redbrick(){return {all:tile("redbrick",(p,R,q)=>{
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){const row=y>>2,off=row%2?4:0;const mort=(y%4===3)||((x+off)%8===7);
      p(x,y,mort?"#b9ada3":"#965040",mort?(.95+R()*.08):q()*.97)}})}},
  pane(){return TEX.glass()},
  glass_b(){return {all:tile("glassb",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const e=x==0||y==0||x==15||y==15;p(x,y,e?"#5b7fd0":"#3c5fb0",e?1:.95+R()*.08)}})}},
  ironbars(){return {all:tile("ironbars",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    [1,5,10,14].forEach(x=>{for(let y=0;y<16;y++){p(x,y,"#6e6f72");p(x+1,y,"#9a9b9e")}});for(let x=0;x<16;x++){p(x,0,"#8a8b8e");p(x,15,"#5c5d60")}})}},
  chain(){return {all:tile("chain",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    for(let y=0;y<16;y++){if(y%6<3){p(7,y,"#3b3f4a");p(8,y,"#59606e")}else{p(6,y,"#3b3f4a");p(9,y,"#59606e")}}})}},
  lanternh(){return TEX.lantern()},
  sealantern(){return {all:tile("sealant",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const c=(x%5===2||y%5===2)?"#e8f6f0":"#a9d8cf";p(x,y,c,.95+R()*.08)}
    for(let i=0;i<16;i++){p(i,0,"#86b8ad");p(0,i,"#86b8ad");p(i,15,"#86b8ad");p(15,i,"#86b8ad")}})}},
  leaves(){return {all:tile("azalea",(p,R,q,g)=>{
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){const r=R();p(x,y,r<.18?"#7aa23a":r>.85?"#45651f":"#5b812b",q())}
    for(let i=0;i<22;i++)g.clearRect(R()*16|0,R()*16|0,1,1);})}},
  oakleaves(){return {all:tile("oakleaves",(p,R,q,g)=>{
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){const r=R();p(x,y,r<.2?"#5a8f2e":r>.8?"#2f5a17":"#477a24",q())}
    for(let i=0;i<26;i++)g.clearRect(R()*16|0,R()*16|0,1,1);})}},
  vines(){return {all:tile("vines",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    [1,5,9,13].forEach(x0=>{let x=x0;for(let y=0;y<16;y++){if(R()<.3)x+=R()<.5?-1:1;p(x,y,"#4c7a22",q());if(R()<.35)p(x+1,y,"#63962e",q())}});})}},
  poppy(){return flowerTex("poppy","#d22a1e","#2a1a12")},
  tulip(){return flowerTex("tulip","#ef7d1f","#e06a14")},
  dandelion(){return flowerTex("dandel","#f4d123","#d9a514")},
  cornflower(){return flowerTex("cornfl","#4d6fd6","#2f4aa8")},
  bookshelf(){const pl=TEX.planks().all;const cols=["#7a2a22","#2a4a7a","#3a6a2a","#8a6a2a","#5a2a6a","#2a6a6a"];
    const side=tile("bookshelf",(p,R,q,g)=>{g.drawImage(pl,0,0);
      [[1,6],[9,14]].forEach(([y1,y2])=>{for(let x=1;x<15;x++){const c=cols[R()*cols.length|0];const h=y1+(R()<.3?1:0);for(let y=h;y<=y2;y++)p(x,y,c,q());p(x,h,c,1.25)}});
      for(let x=0;x<16;x++){p(x,0,"#7c5f33");p(x,7,"#7c5f33");p(x,8,"#a2804a");p(x,15,"#6c522c")}});
    return {side,top:pl,bottom:pl}},
  hay(){const side=tile("hayside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,x%3===0?"#b38f1f":"#c9a227",q());
      for(let x=0;x<16;x++){p(x,3,"#7a5a14");p(x,4,"#8a6a1a");p(x,11,"#7a5a14");p(x,12,"#8a6a1a")}});
    const top=tile("haytop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const d=Math.max(Math.abs(x-7.5),Math.abs(y-7.5));p(x,y,(Math.floor(d)%3)?"#c9a227":"#a8851c",q())}});
    return {side,top,bottom:top}},
  pot(){const side=tile("potside",(p,R,q)=>{noiseFill(p,q,"#8d4b32",.4);for(let x=0;x<16;x++){p(x,0,"#a55a3c");p(x,1,"#a55a3c");p(x,15,"#6a3824")}});
    const top=tile("pottop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const e=x<2||y<2||x>13||y>13;p(x,y,e?"#a55a3c":(R()<.5?"#3f7a24":"#2e5d1a"),q())}});
    return {side,top,bottom:side}},
  carpet_r(){return {all:tile("carpetr",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,"#a12722",((x+y*3)%5===0?.9:1)*(.97+R()*.05))})}},
  path(){const d=TEX.dirt().all;const top=tile("pathtop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,R()<.15?"#7f6236":"#9c7a46",q())});
    const side=tile("pathside",(p,R,q,g)=>{g.drawImage(d,0,0);for(let x=0;x<16;x++){p(x,0,"#9c7a46");p(x,1,"#8a6a3c",q())}});
    return {side,top,bottom:d}},
  gravel(){return {all:tile("gravel",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const r=R();p(x,y,r<.2?"#6a625e":r<.45?"#9a918b":r<.55?"#7c6a5a":"#86807b",q())}})}},
  goldblock(){return {all:tile("goldb",(p,R,q)=>{noiseFill(p,q,"#f2cf3a",.35);for(let i=0;i<16;i++){p(i,0,"#fff2a0");p(0,i,"#fff2a0");p(i,15,"#c49a12");p(15,i,"#c49a12")}})}},
  emeraldblock(){return {all:tile("emeraldb",(p,R,q)=>{noiseFill(p,q,"#2fb35a",.35);for(let i=0;i<16;i++){p(i,0,"#7cf0a0");p(0,i,"#7cf0a0");p(i,15,"#1a7a3a");p(15,i,"#1a7a3a")}
    for(let y=3;y<13;y+=4)for(let x=2;x<14;x+=4){p(x,y,"#9ff7bd");p(x+1,y+1,"#1f8f45")}})}},
  diamondblock(){return {all:tile("diamondb",(p,R,q)=>{noiseFill(p,q,"#6fe0d8",.3);for(let i=0;i<16;i++){p(i,0,"#c8fbf6");p(0,i,"#c8fbf6");p(i,15,"#3aa29c");p(15,i,"#3aa29c")}
    for(let y=2;y<14;y+=4)for(let x=2;x<14;x+=4){p(x,y,"#e6fffc");p(x+1,y,"#bdf5f0")}})}},
  lawn(){return TEX.grass()}, cliff(){return TEX.stone()}, cliffmoss(){return TEX.mossy()}, sea(){return TEX.water()},
});
