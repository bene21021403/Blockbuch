// ---------- Pixel-Texturen (eigene Nachbauten im Blockspiel-Stil) ----------
function rng(seed){let s=seed>>>0||1;return()=>{s=Math.imul(s^s>>>15,1|s);s^=s+Math.imul(s^s>>>7,61|s);return((s^s>>>14)>>>0)/4294967296}}
function hash(str){let h=2166136261;for(const ch of str)h=Math.imul(h^ch.charCodeAt(0),16777619);return h>>>0}
function hex(c){return [1,3,5].map(i=>parseInt(c.slice(i,i+2),16))}
const cl=v=>Math.max(0,Math.min(255,v|0));
function col(h,f=1){const [r,g,b]=hex(h);return `rgb(${cl(r*f)},${cl(g*f)},${cl(b*f)})`}
const Q=[.84,.92,1,1.07];
function tile(seedKey,fn){const c=document.createElement("canvas");c.width=c.height=16;const g=c.getContext("2d");const R=rng(hash(seedKey));
  const p=(x,y,h,f=1)=>{if(x<0||y<0||x>15||y>15)return;g.clearRect(x,y,1,1);g.fillStyle=col(h,f);g.fillRect(x,y,1,1)};
  const q=()=>Q[R()*4|0];
  fn(p,R,q,g);return c;}
const noiseFill=(p,q,h,amp=1)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,h,1+(q()-1)*amp)};
const rect=(p,x1,y1,x2,y2,h,f=1)=>{for(let y=y1;y<=y2;y++)for(let x=x1;x<=x2;x++)p(x,y,h,f)};

const TEX={
  stone(){return {all:tile("cobble",(p,R,q)=>{
    const pts=[];for(let i=0;i<10;i++)pts.push([R()*16,R()*16]);
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){let d1=99,d2=99;
      for(const [px,py] of pts)for(const ox of[-16,0,16])for(const oy of[-16,0,16]){const d=Math.hypot(x+.5-px-ox,y+.5-py-oy);if(d<d1){d2=d1;d1=d}else if(d<d2)d2=d}
      if(d2-d1<.7)p(x,y,"#5a5a5a",q()*.95);else p(x,y,"#8c8c8c",(1.1-d1*.035)*q());}})}},
  brick(){return {all:tile("sbrick",(p,R,q)=>{noiseFill(p,q,"#7d7d7d",.6);
    for(let x=0;x<16;x++){p(x,7,"#555555");p(x,15,"#555555");p(x,0,"#959595");p(x,8,"#959595")}
    for(let y=0;y<7;y++){p(15,y,"#555555");p(0,y,"#8f8f8f")}
    for(let y=8;y<15;y++){p(7,y,"#555555");p(8,y,"#8f8f8f")}
    p(3,3,"#6a6a6a");p(4,4,"#6a6a6a");p(11,11,"#6a6a6a");p(12,12,"#666666");p(12,13,"#666666");})}},
  planks(key="planks",base="#a2804a"){return {all:tile(key,(p,R,q)=>{
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){const row=y>>2;let f=q()*.98+.04*Math.sin(x*1.3+row*2);
      if(y%4===3)f=.62; p(x,y,base,f);}
    [[3,0],[11,1],[6,2],[13,3]].forEach(([x,row])=>{for(let y=row*4;y<row*4+3;y++)p(x,y,base,.66)});
    [[1,1],[14,5],[8,9],[2,13]].forEach(([x,y])=>p(x,y,base,.78));})}},
  dark(){return TEX.planks("darkplanks","#4e3520")},
  log(){const side=tile("logside",(p,R,q)=>{const ct=[];for(let x=0;x<16;x++)ct.push([.7,.86,1,.92][R()*4|0]);
      for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,"#6b5232",ct[x]*(R()<.08?.8:1));});
    const top=tile("logtop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const d=Math.max(Math.abs(x-7.5),Math.abs(y-7.5));
      if(d>=7)p(x,y,"#6b5232",q());else p(x,y,(Math.floor(d)%2)?"#b28d55":"#987440",q()*.06+.97)}});
    return {side,top,bottom:top}},
  glass(){return {all:tile("glass",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    for(let i=0;i<16;i++){p(i,0,"#e4f3f7");p(i,15,"#a9c9d1");p(0,i,"#e4f3f7");p(15,i,"#a9c9d1")}
    [[3,5],[4,4],[5,3],[4,6],[6,4],[10,12],[11,11],[12,10]].forEach(([x,y])=>p(x,y,"#ffffff"));})}},
  dirt(){return {all:tile("dirt",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const r=R();p(x,y,r<.12?"#5b3d27":r>.9?"#a07955":"#866043",q()*.97)}})}},
  grass(){const dirt=TEX.dirt().all;const top=tile("grasstop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,R()<.1?"#4f8a2a":"#64a23a",q())});
    const side=tile("grassside",(p,R,q,g)=>{g.drawImage(dirt,0,0);for(let x=0;x<16;x++){const h=3+(R()<.4?1:0)+(R()<.15?1:0);for(let y=0;y<h;y++)p(x,y,"#64a23a",q())}});
    return {top,side,bottom:dirt}},
  farmland(){const top=tile("farmtop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const r=y%4;p(x,y,r===0?"#2e1c0f":r===1?"#5a3c22":"#45301b",q())}});
    return {top,side:TEX.dirt().all,bottom:TEX.dirt().all}},
  sand(){return {all:tile("sand",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,R()<.1?"#c7bb85":"#ddd4a2",q()*.4+.62)})}},
  water(){return {all:tile("water",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const w=(x+2*y+((y>>2)%2)*3)%9;p(x,y,"#3a6fd8",w===0?1.25:w===1?1.1:.95+R()*.06)}})}},
  lava(){return {all:tile("lava",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const v=Math.sin(x*.9+y*.3)+Math.cos(y*.8-x*.4)+R()*.5;
    p(x,y,v>1.2?"#ffcf4a":v>0?"#f27a1c":v>-1?"#d4521a":"#a5321a")}})}},
  hopper(){const rim="#4a4b4e";
    const top=tile("hoptop",(p,R,q,g)=>{noiseFill(p,q,rim,.5);rect(p,2,2,13,13,"#3a3b3d");rect(p,3,3,12,12,"#1e1e20");for(let i=0;i<16;i++){p(i,0,"#66686b");p(0,i,"#66686b")}});
    const side=tile("hopside",(p,R,q,g)=>{g.clearRect(0,0,16,16);rect(p,0,0,15,5,rim);for(let x=0;x<16;x++)p(x,0,"#66686b");rect(p,4,6,11,11,rim,.9);rect(p,6,12,9,15,rim,.8);for(let y=6;y<12;y++)p(4,y,"#5c5e61");});
    const bottom=tile("hopbot",(p,R,q,g)=>{g.clearRect(0,0,16,16);rect(p,6,6,9,9,rim,.8);rect(p,7,7,8,8,"#151515")});
    return {top,side,bottom}},
  chest(){const w="#a26b28",d="#2f1e0b";
    const body=(p,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,w,(y<5?1.06:.96)*q()*.98+.02);
      for(let i=0;i<16;i++){p(i,0,d);p(i,15,d);p(0,i,d);p(15,i,d);p(i,5,d);p(i,6,"#6e4615")}};
    const side=tile("chestside",(p,R,q)=>body(p,q));
    const front=tile("chestfront",(p,R,q)=>{body(p,q);rect(p,6,3,9,8,d);rect(p,7,4,8,7,"#c9c9c9");p(7,4,"#efefef");p(8,7,"#8a8a8a")});
    const top=tile("chesttop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,w,q()*1.04);for(let i=0;i<16;i++){p(i,0,d);p(i,15,d);p(0,i,d);p(15,i,d)}});
    return {side,front,top,bottom:top}},
  observer(){const g0="#6b6c6e";
    const side=tile("obsside",(p,R,q)=>{noiseFill(p,q,g0,.5);for(let y=0;y<16;y++){p(4,y,"#4a4b4d");p(11,y,"#4a4b4d")}for(let x=5;x<11;x++){p(x,7,"#4a4b4d");p(x,8,"#4a4b4d")}});
    const front=tile("obsfront",(p,R,q)=>{rect(p,0,0,15,15,"#3b3c3e");for(let i=0;i<16;i++){p(i,0,"#565759");p(0,i,"#565759")}
      rect(p,2,4,6,6,"#8d8e90");rect(p,9,4,13,6,"#8d8e90");rect(p,3,5,4,5,"#202122");rect(p,10,5,11,5,"#202122");rect(p,3,10,12,11,"#8d8e90");for(let x=4;x<12;x+=2)p(x,11,"#202122")});
    const back=tile("obsback",(p,R,q)=>{noiseFill(p,q,g0,.5);rect(p,5,5,10,10,"#2f3031");rect(p,7,7,8,8,"#e02a24");p(7,7,"#ff6a5a")});
    const top=tile("obstop",(p,R,q)=>{noiseFill(p,q,g0,.5);for(let y=2;y<14;y++){p(7,y,"#4a4b4d");p(8,y,"#4a4b4d")}for(let i=0;i<4;i++){p(7-i,11-i,"#4a4b4d");p(8+i,11-i,"#4a4b4d")}});
    return {side,front,back,top,bottom:top}},
  piston(){const st="#868686",wd="#b08e57";
    const front=tile("pisfront",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,wd,(y%4===3?.75:1)*q());for(let i=0;i<16;i++){p(i,0,"#6f5531");p(i,15,"#6f5531");p(0,i,"#6f5531");p(15,i,"#6f5531")}rect(p,6,6,9,9,"#7a7a7a")});
    const side=tile("pisside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,y<4?wd:st,q());for(let x=0;x<16;x++){p(x,3,"#6f5531");p(x,4,"#5a5a5a")}for(let y=5;y<16;y++){p(0,y,"#5a5a5a");p(15,y,"#5a5a5a")}rect(p,6,4,9,11,"#6a5636");rect(p,7,4,8,10,"#8f7448")});
    const back=tile("pisback",(p,R,q)=>{noiseFill(p,q,st,.6);rect(p,4,4,11,11,"#5a5a5a");rect(p,5,5,10,10,"#6e6e6e");for(let i=0;i<16;i++){p(i,0,"#5a5a5a");p(i,15,"#5a5a5a");p(0,i,"#5a5a5a");p(15,i,"#5a5a5a")}});
    return {side,front,back}},
  redstone(){return {all:tile("dust",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    for(let i=0;i<16;i++){if(R()<.85)p(i,7,"#e8231f",q());if(R()<.85)p(i,8,"#a3120f",q());if(R()<.85)p(7,i,"#e8231f",q());if(R()<.85)p(8,i,"#a3120f",q())}
    rect(p,6,6,9,9,"#ff3a2a");p(7,7,"#ff8a7a");})}},
  sugarcane(){return {all:tile("cane",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    [[2,0],[7,3],[12,1]].forEach(([x,off])=>{for(let y=0;y<16;y++){const joint=(y+off)%8===0;p(x,y,joint?"#5f8f3c":"#93c95f",q());p(x+1,y,joint?"#4f7a31":"#7cb24c",q())}});
    [[4,5],[5,4],[10,10],[9,11],[14,6]].forEach(([x,y])=>p(x,y,"#9fd06a"));})}},
  bamboo(){const side=tile("bamboo",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const j=y%8===0;p(x,y,j?"#3f6b1c":x<5?"#7fb83a":x>11?"#4f8a22":"#64a02c",j?1:.97+R()*.06)}});
    const top=tile("bambootop",(p,R,q)=>{rect(p,0,0,15,15,"#4f8a22");rect(p,4,4,11,11,"#9ccf5a")});return {side,top,bottom:top}},
  stem(){return {all:tile("stem",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    [[7,15],[7,14],[8,13],[8,12],[8,11],[7,10],[7,9],[6,8],[6,7],[7,6],[8,5],[9,4],[10,4],[11,3]].forEach(([x,y])=>{p(x,y,"#86a83f",q());p(x+1,y,"#6c8c30")});
    [[5,11],[4,10],[10,9],[11,8],[4,6]].forEach(([x,y])=>p(x,y,"#7fb84a"));})}},
  pumpkin(){const side=tile("pumpside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const m=x%4;p(x,y,"#d6801c",(m===0?.72:m===2?1.12:1)*(.97+R()*.06))}for(let x=0;x<16;x++){p(x,0,"#b9681a");p(x,15,"#a75c16")}});
    const top=tile("pumptop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const d=Math.max(Math.abs(x-7.5),Math.abs(y-7.5));p(x,y,"#d6801c",(Math.floor(d)%3===0?.82:1)*q()*.99)}rect(p,6,6,9,9,"#6b4b1d");rect(p,7,7,8,8,"#8a6427")});
    return {side,top,bottom:top}},
  melon(){const side=tile("melside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const m=(x+((y>>2)%2))%4;p(x,y,m===1?"#b4d65a":m===2?"#8cbc3a":"#5e9428",.96+R()*.08)}});
    const top=tile("meltop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const d=Math.max(Math.abs(x-7.5),Math.abs(y-7.5));p(x,y,Math.floor(d)%3===1?"#a6cf54":"#6aa130",q())}});
    return {side,top,bottom:top}},
  cactus(){const g1="#5a8f2d";
    const side=tile("cacside",(p,R,q,g)=>{g.clearRect(0,0,16,16);
      for(let y=0;y<16;y++)for(let x=1;x<15;x++){const st=(x===3||x===8||x===12);p(x,y,g1,(st?.78:1)*(.96+R()*.08))}
      for(let y=0;y<16;y++){p(1,y,"#3f6b1f");p(14,y,"#3f6b1f")}
      [[2,2],[6,5],[10,3],[13,8],[5,11],[9,13],[2,9],[12,14]].forEach(([x,y])=>{p(x,y,"#e8e8d8");p(x,y+1,"#1d2a12")});});
    const top=tile("cactop",(p,R,q,g)=>{g.clearRect(0,0,16,16);rect(p,1,1,14,14,"#3f6b1f");rect(p,2,2,13,13,"#6ea436");rect(p,4,4,11,11,"#7fb547");rect(p,6,6,9,9,"#94c95a");
      [[3,3],[12,3],[3,12],[12,12]].forEach(([x,y])=>p(x,y,"#e8e8d8"));});
    return {side,top,bottom:top}},
  bedfoot(){const red="#b5292b";
    const top=tile("bedfoot",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,red,q()*.98);for(let i=0;i<16;i++){p(0,i,"#8a1d1f");p(15,i,"#8a1d1f");p(i,15,"#8a1d1f")}for(let x=1;x<15;x++)p(x,1,"#d24446")});
    const side=tile("bedside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,y<9?red:"#8d6a3a",q()*.98);for(let x=0;x<16;x++)p(x,8,"#7a1a1c")});
    return {top,side,bottom:tile("bedbot",(p,R,q)=>noiseFill(p,q,"#8d6a3a",.6))}},
  bedhead(){const f=TEX.bedfoot();
    const top=tile("bedhead",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,"#b5292b",q()*.98);rect(p,1,1,14,6,"#e9e9e6");rect(p,2,5,13,6,"#c9c9c5");for(let x=2;x<14;x++)p(x,1,"#ffffff");for(let x=1;x<15;x++)p(x,7,"#d24446")});
    return {top,side:f.side,bottom:f.bottom}},
  composter(){const w="#8c5b27";
    const side=tile("compside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,w,(x%4===3?.55:1)*q());for(let x=0;x<16;x++){p(x,0,w,.75);p(x,1,w,1.1);p(x,14,w,.75);p(x,15,w,.7)}});
    const top=tile("comptop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,w,q());rect(p,2,2,13,13,"#3d2a12");for(let i=0;i<14;i++)if(R()<.5)p(2+(R()*12|0),2+(R()*12|0),"#5c4120")});
    return {side,top,bottom:top}},
  torch(){return {all:tile("torch",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,y<4?(y<2?"#fff2a0":"#ffb02e"):"#6b4a22",y<4?1:(x<8?1.05:.85))})}},
  lantern(){const side=tile("lantside",(p,R,q,g)=>{rect(p,0,0,15,15,"#2c2c33");rect(p,3,3,12,12,"#ffcf5c");rect(p,6,5,9,10,"#fff0a8");for(let y=3;y<13;y++){p(7,y,"#2c2c33")}for(let x=0;x<16;x++){p(x,1,"#45454f");p(x,14,"#45454f")}});
    return {side,top:tile("lanttop",(p,R,q)=>{rect(p,0,0,15,15,"#2c2c33");rect(p,6,6,9,9,"#45454f")})}},
  crafting(){const pl=TEX.planks().all;
    const top=tile("crafttop",(p,R,q,g)=>{g.drawImage(pl,0,0);for(let i=0;i<16;i++){p(i,0,"#5a3d1c");p(i,15,"#5a3d1c");p(0,i,"#5a3d1c");p(15,i,"#5a3d1c");p(i,5,"#6e4c22");p(i,10,"#6e4c22");p(5,i,"#6e4c22");p(10,i,"#6e4c22")}});
    const side=tile("craftside",(p,R,q,g)=>{g.drawImage(pl,0,0);rect(p,0,0,15,4,"#5a3d1c");for(let x=0;x<16;x++)p(x,4,"#3e2a12");
      for(let i=0;i<5;i++)p(2+i,10-i,"#b7b7b7");rect(p,8,6,12,7,"#9a9a9a");p(10,8,"#7a5a2e");p(10,9,"#7a5a2e");p(10,10,"#7a5a2e")});
    return {top,side,bottom:pl}},
  furnace(){const st="#7a7a7a";
    const side=tile("furnside",(p,R,q)=>{noiseFill(p,q,st,.7);for(let i=0;i<16;i++){p(i,0,"#5c5c5c");p(i,15,"#5c5c5c");p(0,i,"#5c5c5c");p(15,i,"#5c5c5c")}});
    const front=tile("furnfront",(p,R,q,g)=>{g.drawImage(side,0,0);rect(p,3,8,12,13,"#1b1b1b");for(let x=4;x<12;x+=2)p(x,9,"#3a3a3a");rect(p,3,3,12,4,"#5c5c5c")});
    const top=tile("furntop",(p,R,q)=>{noiseFill(p,q,"#8a8a8a",.4);for(let i=0;i<16;i++){p(i,0,"#6a6a6a");p(i,15,"#6a6a6a");p(0,i,"#6a6a6a");p(15,i,"#6a6a6a")}});
    return {side,front,top,bottom:top}},
  ladder(){return {all:tile("ladder",(p,R,q,g)=>{g.clearRect(0,0,16,16);for(let y=0;y<16;y++){p(1,y,"#7a5a2a",q());p(2,y,"#5e431e");p(13,y,"#7a5a2a",q());p(14,y,"#5e431e")}
    [1,5,9,13].forEach(y=>{for(let x=3;x<13;x++){p(x,y,"#9a7642",q());p(x,y+1,"#6e5128")}});})}},
  slab(){return {all:tile("slab",(p,R,q)=>{noiseFill(p,q,"#a2a2a2",.4);for(let x=0;x<16;x++){p(x,0,"#bcbcbc");p(x,15,"#7a7a7a")}})}},
  sign(){return {all:tile("sign",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,"#b8935a",(y%4===3?.85:1)*q());for(let i=0;i<16;i++){p(i,0,"#7a5a2e");p(i,15,"#7a5a2e");p(0,i,"#7a5a2e");p(15,i,"#7a5a2e")}
    [4,7,10].forEach(y=>{for(let x=3;x<13;x++)if(R()<.8)p(x,y,"#3a2a18")})})}},
  villager(){const robe="#6c4529";
    const side=tile("vilside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,robe,q());});
    const front=tile("vilfront",(p,R,q,g)=>{g.drawImage(side,0,0);rect(p,1,3,14,8,"#7d5434");rect(p,6,4,9,7,"#b78a68");for(let x=1;x<15;x++)p(x,8,"#4f321c");for(let y=9;y<16;y++)p(7,y,"#523420")});
    return {side,front,top:side,bottom:side}},
  villagerhead(){const sk="#b48565";
    const side=tile("vhside",(p,R,q)=>{noiseFill(p,q,sk,.4);rect(p,0,0,15,2,"#6c4529")});
    const front=tile("vhfront",(p,R,q)=>{noiseFill(p,q,sk,.3);rect(p,0,0,15,1,"#6c4529");rect(p,2,5,13,5,"#3d2b1f");rect(p,3,7,4,7,"#ffffff");rect(p,11,7,12,7,"#ffffff");p(4,7,"#2f8a3a");p(11,7,"#2f8a3a");rect(p,6,7,9,14,"#9c6e50");rect(p,7,8,8,13,"#a87a5a");rect(p,4,15,11,15,"#7a5038")});
    return {side,front,top:tile("vhtop",(p,R,q)=>noiseFill(p,q,"#6c4529",.5)),bottom:side}},
  zombie(){const side=tile("zside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,y<9?"#2b9aa6":"#3a3f9c",q()*.98);});
    const front=tile("zfront",(p,R,q,g)=>{g.drawImage(side,0,0);rect(p,0,0,3,7,"#5a8a3c");rect(p,12,0,15,7,"#5a8a3c");for(let y=9;y<16;y++)p(7,y,"#2a2d74")});
    return {side,front,top:side,bottom:side}},
  zombiehead(){const gr="#58893b";
    const side=tile("zhside",(p,R,q)=>{noiseFill(p,q,gr,.6);rect(p,0,0,15,2,"#3d6327")});
    const front=tile("zhfront",(p,R,q)=>{noiseFill(p,q,gr,.5);rect(p,0,0,15,1,"#3d6327");rect(p,3,7,5,8,"#1a1a1a");rect(p,10,7,12,8,"#1a1a1a");rect(p,7,9,8,10,"#46702e");rect(p,5,12,10,12,"#2c4a1b")});
    return {side,front,top:tile("zhtop",(p,R,q)=>noiseFill(p,q,"#3d6327",.6)),bottom:side}},
  golem(){const ir="#d7cdbd";
    const side=tile("gside",(p,R,q)=>{noiseFill(p,q,ir,.5);[[3,0],[3,1],[4,2],[4,3],[3,4],[12,5],[12,6],[11,7]].forEach(([x,y])=>p(x,y,"#4f8a2a"));p(8,10,"#9f9587");p(9,11,"#9f9587")});
    return {side,front:side,top:side,bottom:side}},
  golemhead(){const ir="#d7cdbd";
    const side=tile("ghside",(p,R,q)=>noiseFill(p,q,ir,.5));
    const front=tile("ghfront",(p,R,q)=>{noiseFill(p,q,ir,.4);rect(p,2,5,13,5,"#9f9587");rect(p,4,7,5,7,"#7a1f1f");rect(p,10,7,11,7,"#7a1f1f");rect(p,7,7,8,14,"#bdb2a1");rect(p,7,8,8,13,"#c9bfae")});
    return {side,front,top:side,bottom:side}},
  obsidian(){return {all:tile("obsidian",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const r=R();p(x,y,r<.12?"#3d2b63":r<.2?"#2a1d45":"#140f1f",q())}})}},
  portal(){return {all:tile("portal",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const v=Math.sin((x-7.5)*.7+Math.cos(y*.5)*2)+Math.cos((y-7.5)*.6);p(x,y,v>1?"#c28bff":v>0?"#8a3ff0":v>-1?"#6a22c9":"#4a138f")}})}},
  ironblock(){return {all:tile("iron",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,"#dadada",.97+R()*.04);
    for(let i=0;i<16;i++){p(i,0,"#f2f2f2");p(0,i,"#f2f2f2");p(i,15,"#a9a9a9");p(15,i,"#a9a9a9")}
    [4,8,12].forEach(y=>{for(let x=1;x<15;x++)p(x,y,"#c4c4c4")});})}},
  beacon(){return {all:tile("beacon",(p,R,q)=>{rect(p,0,0,15,15,"#cdeff3");for(let i=0;i<16;i++){p(i,0,"#f2fdff");p(0,i,"#f2fdff");p(i,15,"#9cc9cf");p(15,i,"#9cc9cf")}
    rect(p,3,3,12,12,"#5ce3e8");rect(p,5,5,10,10,"#b8fbff");rect(p,1,13,14,14,"#2a1d45")})}},
  netherrack(){return {all:tile("netherrack",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++){const r=R();p(x,y,r<.15?"#4f1c1a":r>.88?"#8d3b36":"#6e2a27",q())}})}},
  turtleegg(){const s=tile("egg",(p,R,q)=>{noiseFill(p,q,"#e8e4c8",.3);[[3,3],[10,2],[6,7],[12,9],[3,11],[9,13]].forEach(([x,y])=>{p(x,y,"#5f9c62");p(x+1,y,"#5f9c62")})});return {all:s}},
  wool(){return {all:tile("wool",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,"#ececea",((x+y*3)%5===0?.92:1)*(.98+R()*.04))})}},
  fence(){return TEX.planks()},
  lectern(){const pl=TEX.planks().all;
    const top=tile("lecttop",(p,R,q,g)=>{g.drawImage(pl,0,0);rect(p,2,3,13,12,"#5c3a1a");rect(p,3,4,7,11,"#f1e7c8");rect(p,8,4,12,11,"#e6dab6");for(let y=5;y<11;y+=2){for(let x=4;x<7;x++)p(x,y,"#9a8f78");for(let x=9;x<12;x++)p(x,y,"#9a8f78")}});
    const side=tile("lectside",(p,R,q,g)=>{g.drawImage(pl,0,0);rect(p,5,4,10,15,"#7a5428");for(let y=4;y<16;y++)p(5,y,"#5c3a1a");rect(p,1,0,14,3,"#8f6a35")});
    return {top,side,bottom:pl}},
  barrel(){const w="#7d5428";
    const side=tile("barrside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,w,(x%4===0?.72:1)*q());for(let x=0;x<16;x++){p(x,2,"#3c3c3c");p(x,13,"#3c3c3c");p(x,3,"#5a5a5a");p(x,12,"#5a5a5a")}});
    const top=tile("barrtop",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,w,q());for(let i=0;i<16;i++){p(i,0,"#3c3c3c");p(i,15,"#3c3c3c");p(0,i,"#3c3c3c");p(15,i,"#3c3c3c")}rect(p,6,6,9,9,"#2a1a0c")});
    return {side,top,bottom:top}},
  smoker(){const st="#5d5852";
    const side=tile("smokside",(p,R,q)=>{noiseFill(p,q,st,.6);rect(p,0,11,15,15,"#6e4a24");for(let x=0;x<16;x++)p(x,11,"#3e2a14");for(let i=0;i<16;i++){p(0,i,"#403c38");p(15,i,"#403c38")}});
    const front=tile("smokfront",(p,R,q,g)=>{g.drawImage(side,0,0);rect(p,3,4,12,9,"#1a1a1a");for(let x=4;x<12;x+=2)p(x,5,"#3a3a3a");p(7,8,"#e8661c");p(8,8,"#ffb23a")});
    const top=tile("smoktop",(p,R,q)=>{noiseFill(p,q,"#4a4642",.5);rect(p,4,4,11,11,"#2a2826");for(let x=5;x<11;x+=2)for(let y=5;y<11;y++)p(x,y,"#3c3936")});
    return {side,front,top,bottom:top}},
  piglin(){const sk="#e3a19c",rot="#6c9a52";
    const side=tile("pigside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,y<10?(R()<.25?rot:sk):"#6b4a2a",q());rect(p,3,3,6,6,"#e8e4d0")});
    const front=tile("pigfront",(p,R,q,g)=>{g.drawImage(side,0,0);rect(p,6,0,9,9,"#d8d2bc");for(let y=1;y<9;y+=2)p(7,y,"#9c9682");rect(p,0,10,15,11,"#c9a338")});
    return {side,front,top:side,bottom:side}},
  piglinhead(){const sk="#e3a19c";
    const side=tile("phside",(p,R,q)=>{noiseFill(p,q,sk,.4);rect(p,8,4,15,12,"#e8e4d0");rect(p,0,0,15,1,"#5f8c48")});
    const front=tile("phfront",(p,R,q)=>{noiseFill(p,q,sk,.3);rect(p,8,2,15,9,"#e8e4d0");rect(p,10,5,11,6,"#1a1a1a");rect(p,3,5,4,6,"#1a1a1a");rect(p,4,9,11,12,"#f0b4ae");p(6,10,"#7a3a36");p(9,10,"#7a3a36");rect(p,2,13,3,15,"#efe9d6");rect(p,12,13,13,15,"#efe9d6")});
    return {side,front,top:side,bottom:side}},
  chicken(){const wh="#f2f1ea";
    const side=tile("chside",(p,R,q)=>{noiseFill(p,q,wh,.3);rect(p,4,7,11,12,"#dcdbd3")});
    const front=tile("chfront",(p,R,q)=>{noiseFill(p,q,wh,.25);p(3,4,"#111111");p(12,4,"#111111");rect(p,5,6,10,8,"#e8a52a");rect(p,6,9,9,12,"#d41f1f")});
    const top=tile("chtop",(p,R,q)=>{noiseFill(p,q,wh,.25);rect(p,6,2,9,6,"#d41f1f")});
    return {side,front,top,bottom:side}},
};
const texCache={};
function faces(key){if(texCache[key])return texCache[key];const t=TEX[key]();const a=t.all;
  const side=t.side||a, f={side, front:t.front||side, back:t.back||side, top:t.top||a||side, bottom:t.bottom||a||side};
  return texCache[key]=f;}
function swatch(key){const f=faces(key);return (f.front||f.side).toDataURL()}
const tCache=new Map();
function tex(cv){if(!tCache.has(cv)){const t=new THREE.CanvasTexture(cv);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;tCache.set(cv,t)}return tCache.get(cv)}
