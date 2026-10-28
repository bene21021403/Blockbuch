// ---------- App-Icon: 3D-B aus schwebenden Schichten (Stein, Holz, Gras) ----------
function drawIcon(g,S,round){
  const BM=["11110","10001","10001","11110","10001","10001","11110"];
  const M={
    grass:{top:["#9be86a","#6fbf3f"],front:["#5fae34","#3f7f22"],side:["#4a8f28","#2f5f18"]},
    wood:{top:["#e0b77a","#c0955a"],front:["#b4874c","#8a6234"],side:["#8f6838","#5e4220"]},
    stone:{top:["#c9ced3","#a4abb2"],front:["#8f979f","#6b737b"],side:["#6c747c","#4a5158"]}};
  const k=S/1024,u=90*k,gap=26*k,depth=2;
  const band=y=>y>=5?"grass":y>=2?"wood":"stone";
  g.save();
  if(round){const r=S*.225;g.beginPath();g.moveTo(r,0);g.arcTo(S,0,S,S,r);g.arcTo(S,S,0,S,r);g.arcTo(0,S,0,0,r);g.arcTo(0,0,S,0,r);g.closePath();g.clip()}
  let gr=g.createLinearGradient(0,0,S,S);gr.addColorStop(0,"#1f2c3a");gr.addColorStop(1,"#090d12");g.fillStyle=gr;g.fillRect(0,0,S,S);
  let rg=g.createRadialGradient(S*.5,S*.4,20*k,S*.5,S*.45,S*.6);rg.addColorStop(0,"rgba(120,200,90,.32)");rg.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=rg;g.fillRect(0,0,S,S);
  const vox=[];BM.forEach((r,row)=>[...r].forEach((c,x)=>{if(c==="1")for(let z=0;z<depth;z++)vox.push([x,6-row,z])}));
  const set=new Set(vox.map(v=>v.join(",")));const has=(x,y,z)=>set.has(x+","+y+","+z);
  const kx=u*.42,ky=u*.30,W=5*u+depth*kx,H=7*u+depth*ky+2*gap;
  const ox=(S-W)/2,oy=(S+H)/2+8*k;
  const yoff=y=>{const b=band(y);return (b==="wood"?1:b==="grass"?2:0)*gap};
  const P=(x,y,z,yo)=>[ox+x*u+z*kx,oy-y*u-z*ky-yo];
  const sx=ox+W*.45,sy=oy+u*.35;
  g.save();g.translate(sx,sy);g.scale(1,.18);const sg=g.createRadialGradient(0,0,10*k,0,0,W*.7);sg.addColorStop(0,"rgba(0,0,0,.6)");sg.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=sg;g.fillRect(-S,-S*6,2*S,S*12);g.restore();
  const quad=(pts,c1,c2,hl)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.closePath();
    const grd=g.createLinearGradient(pts[0][0],pts[0][1],pts[2][0],pts[2][1]);grd.addColorStop(0,c1);grd.addColorStop(1,c2);g.fillStyle=grd;g.fill();
    g.strokeStyle="rgba(0,0,0,.16)";g.lineWidth=Math.max(.5,2.5*k);g.stroke();
    if(hl){g.beginPath();g.moveTo(...pts[0]);g.lineTo(...pts[1]);g.strokeStyle=hl;g.lineWidth=Math.max(.5,4*k);g.stroke()}};
  vox.sort((a,b)=>(b[2]-a[2])||(a[0]-b[0])||(a[1]-b[1]));
  for(const [x,y,z] of vox){
    const m=M[band(y)],yo=yoff(y),same=yy=>band(yy)===band(y);
    if(!(has(x,y+1,z)&&same(y+1)))quad([P(x,y+1,z,yo),P(x+1,y+1,z,yo),P(x+1,y+1,z+1,yo),P(x,y+1,z+1,yo)],m.top[1],m.top[0],"rgba(255,255,255,.5)");
    if(!has(x+1,y,z))quad([P(x+1,y+1,z,yo),P(x+1,y+1,z+1,yo),P(x+1,y,z+1,yo),P(x+1,y,z,yo)],m.side[0],m.side[1],null);
    if(!has(x,y,z-1))quad([P(x,y+1,z,yo),P(x+1,y+1,z,yo),P(x+1,y,z,yo),P(x,y,z,yo)],m.front[0],m.front[1],"rgba(255,255,255,.28)");
  }
  let gl=g.createLinearGradient(0,0,0,S*.5);gl.addColorStop(0,"rgba(255,255,255,.09)");gl.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=gl;g.fillRect(0,0,S,S*.5);
  g.restore();
}
(function(){
  const url=(size,round)=>{const c=document.createElement("canvas");c.width=c.height=size;drawIcon(c.getContext("2d"),size,round);return c.toDataURL("image/png")};
  const link=(rel,href,sizes)=>{let l=document.querySelector(`link[rel="${rel}"]`);if(!l){l=document.createElement("link");l.rel=rel;document.head.appendChild(l)}l.href=href;if(sizes)l.sizes=sizes};
  try{
    link("icon",url(64,true),"64x64");
    link("apple-touch-icon",url(180,false),"180x180");
  }catch(e){}
  const m=document.getElementById("mark");
  if(m){const d=Math.round(28*(window.devicePixelRatio||1));m.width=m.height=d;m.style.imageRendering="auto";drawIcon(m.getContext("2d"),d,true)}
})();
