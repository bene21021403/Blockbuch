// ---------- Thumbnails ----------
let glOK=true;
function makeThumbs(){
  try{
    const r=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});r.setSize(480,360);r.setPixelRatio(1);
    BUILDS.forEach(b=>{const sc=new THREE.Scene();addLights(sc);sc.add(buildGroup(b,999,false));
      const cam=new THREE.PerspectiveCamera(40,4/3,.1,500);const R=frame(b),th=.8,ph=1.0;
      cam.position.set(R*Math.sin(ph)*Math.cos(th),b.size[1]/2+R*Math.cos(ph),R*Math.sin(ph)*Math.sin(th));cam.lookAt(0,b.size[1]/2,0);
      r.render(sc,cam);b.thumb=r.domElement.toDataURL("image/png");});
    r.dispose();
  }catch(e){glOK=false}
}

// ---------- Liste ----------
const $=id=>document.getElementById(id);
function renderChips(){$("chips").innerHTML="";CATS.forEach(c=>{const bt=document.createElement("button");bt.className="chip";bt.textContent=c;bt.setAttribute("aria-pressed",c===cat);bt.onclick=()=>{cat=c;renderChips();renderGrid()};$("chips").appendChild(bt)})}
const NEW=["bambus","kaktus","goldfarm","handelshalle","burg","windmuehle","leuchtfeuer","netherportal"];
const DIFF={Leicht:0,Mittel:1,Schwer:2};
let sortBy="neu";
const rateVal=r=>!r||r.unknown||r.manual?-1:r.max!=null?r.max:Array.isArray(r.h)?r.h[1]:r.h;
function sorted(list){const idx=b=>{const n=NEW.indexOf(b.id);return n<0?100+BUILDS.indexOf(b):n};
  const f={neu:(a,b)=>idx(a)-idx(b),diff:(a,b)=>DIFF[a.diff]-DIFF[b.diff]||idx(a)-idx(b),size:(a,b)=>b.nBlocks-a.nBlocks,rate:(a,b)=>rateVal(effRate(b))-rateVal(effRate(a))||idx(a)-idx(b)}[sortBy];
  return [...list].sort(f)}
function renderGrid(){
  const q=query.trim().toLowerCase();
  const list=sorted(BUILDS.filter(b=>(cat==="Alle"||b.cat===cat)&&(!q||(b.name+" "+b.cat+" "+b.desc).toLowerCase().includes(q))));
  $("count").textContent=list.length+(list.length===1?" Build":" Builds");
  $("grid").innerHTML="";
  list.forEach(b=>{const a=document.createElement("a");a.className="card bevel";a.href="#b-"+b.id;
    const er=effRate(b);const rc=er&&!er.unknown&&!er.manual?`<span class="tchip">${rateShort(er)}</span>`:"";
    a.innerHTML=`<div class="thumb">${b.thumb?`<img alt="3D-Vorschau ${b.name}" src="${b.thumb}">`:`<span class="ph">${b.name}</span>`}<span class="badge d-${b.diff}">${b.diff}</span>${rc}</div>
      <div class="cbody"><p class="cname">${b.name}</p><p class="meta">${b.cat} · ${b.nBlocks} Blöcke</p></div>`;
    $("grid").appendChild(a)});
  if(!list.length)$("grid").innerHTML=`<p class="empty">Nichts gefunden. Probier einen anderen Begriff oder eine andere Kategorie.</p>`;
}
$("sort").addEventListener("change",e=>{sortBy=e.target.value;renderGrid()});
$("q").addEventListener("input",e=>{query=e.target.value;renderGrid()});

// ---------- Ertrag ----------
const fmt=n=>n>=100?Math.round(n).toLocaleString("de-DE"):n>=10?Math.round(n).toString():n.toLocaleString("de-DE",{maximumFractionDigits:1});
const span=(r,f)=>r.max!=null?"bis "+fmt(r.max*f):Array.isArray(r.h)?fmt(r.h[0]*f)+"–"+fmt(r.h[1]*f):"≈ "+fmt(r.h*f);
function rateShort(r){if(r.unknown)return "Ertrag: selbst messen";if(r.manual)return "Ertrag: Abbautempo";return span(r,1)+"/h "+r.item}
function renderRate(r){
  $("tab-rate").hidden=!r;if(!r)return;
  $("rateitem").textContent=r.item;
  if(r.unknown||r.manual){$("rategrid").hidden=true}
  else{$("rategrid").hidden=false;$("rmin").textContent=span(r,1/60);$("rh").textContent=span(r,1);$("rday").textContent=span(r,1/3);$("r10").textContent=span(r,10);}
  $("ratebasis").textContent=r.basis;
}

// ---------- Viewer ----------
let renderer,scene,camera,group,cur=null,layer=1,only=false,spin=true;
let th=.8,ph=1.0,dist=20,target=new THREE.Vector3();
function initViewer(){
  if(renderer||!glOK)return;
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true})}catch(e){glOK=false;$("viewer").insertAdjacentHTML("beforeend",`<p style="padding:16px">3D wird auf diesem Gerät nicht unterstützt.</p>`);return}
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  $("viewer").prepend(renderer.domElement);
  scene=new THREE.Scene();addLights(scene);camera=new THREE.PerspectiveCamera(40,4/3,.1,800);
  new ResizeObserver(resize).observe($("viewer"));resize();
  const c=renderer.domElement,pts=new Map();let pinch=0;
  let down=null;
  c.addEventListener("pointerdown",e=>{c.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);if(pts.size===1)down={x:e.clientX,y:e.clientY,t:performance.now()};else down=null;setSpin(false)});
  c.addEventListener("pointerup",e=>{if(down&&pts.size===1&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<8&&performance.now()-down.t<500)pick(e);down=null});
  c.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId))return;const p=pts.get(e.pointerId);
    if(pts.size===1){th+=(e.clientX-p[0])*.01;ph=Math.min(1.5,Math.max(.12,ph-(e.clientY-p[1])*.01))}
    pts.set(e.pointerId,[e.clientX,e.clientY]);
    if(pts.size===2){const [a,b2]=[...pts.values()];const dd=Math.hypot(a[0]-b2[0],a[1]-b2[1]);if(pinch)zoom(pinch/dd);pinch=dd}});
  const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=0};
  c.addEventListener("pointerup",up);c.addEventListener("pointercancel",up);
  c.addEventListener("wheel",e=>{e.preventDefault();zoom(e.deltaY>0?1.1:.9)},{passive:false});
  (function loop(){requestAnimationFrame(loop);if(!cur||$("detail").hidden)return;
    if(spin)th+=.004;camera.position.set(target.x+dist*Math.sin(ph)*Math.cos(th),target.y+dist*Math.cos(ph),target.z+dist*Math.sin(ph)*Math.sin(th));
    camera.lookAt(target);renderer.render(scene,camera)})();
}
const ray=new THREE.Raycaster(),ndc=new THREE.Vector2();let marker=null;
function clearPick(){if(marker){scene.remove(marker);marker=null}$("pick").hidden=true}
function pick(e){
  if(!group)return;const r=renderer.domElement.getBoundingClientRect();
  ndc.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ndc,camera);
  const hit=ray.intersectObjects(group.children.filter(m=>!m.userData.dim),false).find(h=>h.instanceId!=null);
  if(!hit){clearPick();return}
  const {key,arr}=hit.object.userData,bl=arr[hit.instanceId],d=T[key];
  if(marker)scene.remove(marker);
  marker=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.06,1.06,1.06)),new THREE.LineBasicMaterial({color:0xffd23f,depthTest:false}));
  marker.renderOrder=9;marker.position.set(bl[0]-(cur.size[0]/2-.5),bl[1]+.5,bl[2]-(cur.size[2]/2-.5));scene.add(marker);
  const total=cur.blocks.filter(b=>b[3]===key).length;
  const what=d.mob?"Mob":d.grow?"entsteht von selbst":d.part?"Teil eines Blocks":"Baublock";
  $("pickimg").src=swatch(key);$("pickname").textContent=d.n;
  $("pickinfo").textContent=`${what} · Schicht ${bl[1]+1}`+(counts(key)?` · ${total}× im Build`:"");
  $("pick").hidden=false;
  document.querySelectorAll("#mats li").forEach(li=>li.classList.toggle("picked",li.dataset.k===key));
}
function zoom(f){if(!cur)return;const R=frame(cur);dist=Math.min(R*2.5,Math.max(3,dist*f))}
function resize(){if(!renderer)return;const r=$("viewer").getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix()}
function setSpin(v){spin=v;$("spin").setAttribute("aria-pressed",v)}
function redraw(){
  if(group){scene.remove(group);group.children.forEach(m=>m.dispose&&m.dispose())}
  clearPick();document.querySelectorAll("#mats li.picked").forEach(li=>li.classList.remove("picked"));
  group=buildGroup(cur,layer-1,only);scene.add(group);
  $("layer").value=layer;$("lnum").textContent=layer+" / "+cur.H;
  renderMats();
}
function renderMats(){
  const all={},here={};
  cur.blocks.forEach(b=>{const k=b[3];all[k]=(all[k]||0)+1;if(b[1]===layer-1)here[k]=(here[k]||0)+1});
  const keys=Object.keys(all).filter(counts).sort((a,b)=>all[b]-all[a]);
  $("mats").innerHTML=keys.map(k=>`<li data-k="${k}" class="${here[k]?"here":""}"><img class="sw" alt="" src="${swatch(k)}"><span>${T[k].n}</span><span class="lay">${here[k]?"+"+here[k]+" hier":""}</span><span class="n">${all[k]}</span></li>`).join("");
  const total=keys.reduce((s,k)=>s+all[k],0);
  $("stacks").textContent=`Gesamt ${total} Blöcke, rund ${Math.ceil(total/64)} Stacks. „hier“ = in der aktuellen Schicht.`;
  const mobs=Object.keys(all).filter(k=>(T[k].mob||T[k].grow)&&!T[k].body);
  const mobTxt=mobs.map(k=>`${all[k]}× ${T[k].n}`);
  $("mobpanel").hidden=!mobTxt.length;$("mobs").textContent=mobTxt.join(" · ")+(mobs.some(k=>T[k].grow)?" (halbtransparent = entsteht von selbst)":"");
}
function openBuild(b){
  if(b.scale&&b.n!==b.scale.def){b.n=b.scale.def;regen(b)}
  renderScale(b);
  cur=b;$("list").hidden=true;$("detail").hidden=false;$("barList").hidden=true;$("barDetail").hidden=false;selectTab("p-build");
  $("dname").textContent=b.name;
  $("dmeta").innerHTML=`<span class="d-${b.diff}">${b.diff}</span><span>${b.cat}</span><span>${b.size.join("×")}</span>`;
  $("ddesc").textContent=b.desc;$("tips").innerHTML=b.tips.map(t=>`<li>${t}</li>`).join("");
  renderRate(effRate(b));
  $("dnote").textContent=b.note;$("tlink").href=yt(b.q);
  $("layer").max=b.H;layer=b.H;only=false;$("only").setAttribute("aria-pressed",false);
  initViewer();
  if(renderer){dist=frame(b);th=.8;ph=1.0;target.set(0,b.size[1]/2,0);setSpin(true);resize();redraw()}else renderMats();
  window.scrollTo(0,0);
}
function renderScale(b){$("scaleRow").hidden=!b.scale;if(!b.scale)return;
  $("scaleLab").textContent=b.scale.label;$("sval").textContent=b.n;
  $("sminus").disabled=b.n<=b.scale.min;$("splus").disabled=b.n>=b.scale.max;}
function setScale(d){const b=cur;if(!b||!b.scale)return;const n=Math.min(b.scale.max,Math.max(b.scale.min,b.n+d));if(n===b.n)return;
  b.n=n;regen(b);renderScale(b);renderRate(effRate(b));
  $("dmeta").innerHTML=`<span class="d-${b.diff}">${b.diff}</span><span>${b.cat}</span><span>${b.size.join("×")}</span>`;
  $("layer").max=b.H;layer=b.H;
  if(renderer){dist=Math.max(dist,frame(b)*.9);target.set(0,b.size[1]/2,0);redraw()}else renderMats();}
$("sminus").onclick=()=>setScale(-1);$("splus").onclick=()=>setScale(1);
function showList(){if(cur&&cur.scale&&cur.n!==cur.scale.def){cur.n=cur.scale.def;regen(cur)}cur=null;$("detail").hidden=true;$("list").hidden=false;$("barList").hidden=false;$("barDetail").hidden=true}
function selectTab(id){document.querySelectorAll(".tab").forEach(t=>{const on=t.dataset.p===id;t.setAttribute("aria-selected",on);$(t.dataset.p).hidden=!on})}
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>selectTab(t.dataset.p));
(function(){const c=$("mark").getContext("2d");for(let y=0;y<8;y++)for(let x=0;x<8;x++){const top=y<2||(y===2&&(x*5)%3===0);c.fillStyle=top?(x%3?"#64a23a":"#4f8a2a"):((x+y*3)%4?"#866043":"#5b3d27");c.fillRect(x,y,1,1)}})();
$("back").onclick=()=>{location.hash=""};
$("layer").oninput=e=>{layer=+e.target.value;redraw()};
$("prev").onclick=()=>{if(layer>1){layer--;redraw()}};
$("next").onclick=()=>{if(layer<cur.H){layer++;redraw()}};
$("all").onclick=()=>{layer=cur.H;only=false;$("only").setAttribute("aria-pressed",false);redraw()};
$("only").onclick=()=>{only=!only;$("only").setAttribute("aria-pressed",only);redraw()};
$("spin").onclick=()=>setSpin(!spin);
$("pickclose").onclick=()=>{clearPick();document.querySelectorAll("#mats li.picked").forEach(li=>li.classList.remove("picked"))};
function route(){const h=location.hash.replace("#b-","");const b=BUILDS.find(x=>x.id===h);b?openBuild(b):showList()}
window.addEventListener("hashchange",route);

if(typeof THREE==="undefined"){glOK=false}else makeThumbs();
renderChips();renderGrid();route();
