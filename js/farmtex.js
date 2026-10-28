// ---------- Texturen für die Farm-Blöcke (Wolle, Essen, XP) ----------
Object.assign(TEX,{
  dispenser(){const st="#7a7a7a";const f=TEX.furnace();
    const front=tile("dispfront",(p,R,q,g)=>{g.drawImage(f.side,0,0);rect(p,5,5,10,10,"#1b1b1b");rect(p,6,4,9,4,"#1b1b1b");rect(p,6,11,9,11,"#1b1b1b");rect(p,4,6,4,9,"#1b1b1b");rect(p,11,6,11,9,"#1b1b1b");rect(p,6,6,9,9,"#2c2c2c")});
    return {side:f.side,front,top:f.top,bottom:f.top}},
  hoppercart(){const ir="#5d6064";
    const side=tile("cartside",(p,R,q)=>{noiseFill(p,q,ir,.5);for(let i=0;i<16;i++){p(i,0,"#7d8085");p(i,15,"#3e4044")}rect(p,2,12,4,15,"#2a2a2a");rect(p,11,12,13,15,"#2a2a2a")});
    const top=tile("carttop",(p,R,q)=>{noiseFill(p,q,"#4a4b4e",.5);rect(p,3,3,12,12,"#1e1e20");rect(p,6,6,9,9,"#111111")});
    return {side,top,bottom:side}},
  flow(){return TEX.water()},
  carrot(){return {all:tile("carrot",(p,R,q,g)=>{g.clearRect(0,0,16,16);
    [[3,0],[8,2],[12,1]].forEach(([x,o])=>{for(let y=4+o;y<12;y++){p(x,y,"#5fa83a",q());if(y%3===0)p(x-1,y-1,"#7cc24c")}rect(p,x-1,12,x+1,14,"#e8822a");p(x,15,"#c9661c")});})}},
  lever(){return {all:tile("lever",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,y<3?"#8a8a8a":"#6b4a22",y<3?1:(x<8?1.05:.85))})}},
  button(){return {all:tile("button",(p,R,q)=>noiseFill(p,q,"#9a9a9a",.4))}},
  armadillo(){const sh="#a26a5b";
    const side=tile("armside",(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,sh,(y%4===0?.75:1)*q());for(let x=0;x<16;x++)p(x,15,"#6b3f35")});
    const front=tile("armfront",(p,R,q,g)=>{g.drawImage(side,0,0);rect(p,5,6,10,12,"#d9a69a");p(6,8,"#1a1a1a");p(9,8,"#1a1a1a");rect(p,4,2,5,5,"#d9a69a");rect(p,10,2,11,5,"#d9a69a")});
    return {side,front,top:side,bottom:side}},
});
// Schaf-Texturen pro Wollfarbe
SHEEP.forEach(([k,n,c])=>{TEX["sheep_"+k]=()=>{
  const side=tile("sh"+k,(p,R,q)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)p(x,y,c,((x+y*3)%5===0?.9:1)*(.97+R()*.06))});
  const front=tile("shf"+k,(p,R,q,g)=>{g.drawImage(side,0,0);rect(p,4,3,11,12,"#d9c3a8");rect(p,4,3,11,4,c);p(5,6,"#1a1a1a");p(10,6,"#1a1a1a");p(5,7,"#ffffff");p(10,7,"#ffffff");rect(p,6,9,9,11,"#e9a8a0")});
  return {side,front,top:side,bottom:side}}});
