// ---------- Geometrien ----------
const geo={};
function crossGeo(){const g=new THREE.BufferGeometry(),s=.42;
  const P=[-s,-.5,-s, s,-.5,s, s,.5,s, -s,.5,-s,  -s,-.5,s, s,-.5,-s, s,.5,-s, -s,.5,s];
  const U=[0,0,1,0,1,1,0,1, 0,0,1,0,1,1,0,1];
  g.setAttribute("position",new THREE.Float32BufferAttribute(P,3));g.setAttribute("uv",new THREE.Float32BufferAttribute(U,2));
  g.setIndex([0,1,2,0,2,3,4,5,6,4,6,7]);g.computeVertexNormals();return g}
function geom(s){
  if(geo[s])return geo[s];let g;
  switch(s){
    case "flat":g=new THREE.BoxGeometry(1,.06,1);g.translate(0,-.47,0);break;
    case "half":g=new THREE.BoxGeometry(1,.5,1);g.translate(0,-.25,0);break;
    case "bed":g=new THREE.BoxGeometry(1,.5625,1);g.translate(0,-.22,0);break;
    case "chest":g=new THREE.BoxGeometry(.875,.875,.875);g.translate(0,-.0625,0);break;
    case "cactus":g=new THREE.BoxGeometry(.875,1,.875);break;
    case "plant":g=crossGeo();break;
    case "small":g=new THREE.BoxGeometry(.5,.5,.5);g.translate(0,-.25,0);break;
    case "torch":g=new THREE.BoxGeometry(.13,.62,.13);g.translate(0,-.19,0);break;
    case "lantern":g=new THREE.BoxGeometry(.38,.5,.38);g.translate(0,-.25,0);break;
    case "wall":g=new THREE.BoxGeometry(1,1,.06);g.translate(0,0,.47);break;
    case "bamboo":g=new THREE.BoxGeometry(.2,1,.2);break;
    case "fence":g=new THREE.BoxGeometry(.25,1,.25);break;
    case "egg":g=new THREE.BoxGeometry(.45,.5,.45);g.translate(0,-.25,0);break;
    case "cart":g=new THREE.BoxGeometry(.9,.62,.9);g.translate(0,-.19,0);break;
    case "flow":g=new THREE.BoxGeometry(1,.75,1);g.translate(0,-.125,0);break;
    case "button":g=new THREE.BoxGeometry(.38,.14,.26);g.translate(0,-.43,0);break;
    case "sheep":g=new THREE.BoxGeometry(.8,.95,.95);g.translate(0,-.025,0);break;
    case "sign":g=new THREE.BoxGeometry(.9,.5,.08);g.translate(0,.1,.46);break;
    default:g=new THREE.BoxGeometry(1,1,1);
  }
  return geo[s]=g;
}
const mats={};
function mat(key,dim){
  const k=key+(dim?"_d":"");if(mats[k])return mats[k];const d=T[key],f=faces(key);
  const mk=cv=>{const o={map:tex(cv)};
    if(d.cut)o.alphaTest=.5;
    if(d.alpha){o.transparent=true;o.opacity=d.alpha;o.depthWrite=false}
    if(d.grow){o.transparent=true;o.opacity=.72}
    if(dim){o.transparent=true;o.opacity=.16;o.depthWrite=false;o.alphaTest=d.cut?.5:0}
    if(d.glow){o.emissive=new THREE.Color(0xffb040).multiplyScalar(d.glow);o.emissiveMap=o.map}
    if(d.s==="plant")o.side=THREE.DoubleSide;
    return new THREE.MeshLambertMaterial(o)};
  if(d.s==="plant")return mats[k]=mk(f.side);
  // Reihenfolge BoxGeometry: +x, -x, +y, -y, +z (vorne), -z (hinten)
  return mats[k]=[mk(f.side),mk(f.side),mk(f.top),mk(f.bottom),mk(f.front),mk(f.back)];
}
const ROT=[0,1,2,3].map(i=>new THREE.Matrix4().makeRotationY(i*Math.PI/2));
ROT[4]=new THREE.Matrix4().makeRotationX(-Math.PI/2);ROT[5]=new THREE.Matrix4().makeRotationX(Math.PI/2);
function buildGroup(build,maxY,only){
  const grp=new THREE.Group(),by={};
  build.blocks.forEach(b=>{if(b[1]>maxY)return;const dim=only&&b[1]!==maxY;const k=b[3]+(dim?"|d":"");(by[k]=by[k]||[]).push(b)});
  const cx=build.size[0]/2-.5,cz=build.size[2]/2-.5,m4=new THREE.Matrix4();
  for(const k in by){const [key,d]=k.split("|");const arr=by[k];
    const im=new THREE.InstancedMesh(geom(T[key].s||"full"),mat(key,!!d),arr.length);
    arr.forEach((b,i)=>{m4.makeTranslation(b[0]-cx,b[1]+.5,b[2]-cz).multiply(ROT[b[4]||0]);im.setMatrixAt(i,m4)});
    im.userData={key,arr,dim:!!d};
    if(T[key].alpha||T[key].grow||d)im.renderOrder=2;grp.add(im);}
  return grp;
}
function addLights(scene){scene.add(new THREE.AmbientLight(0xffffff,.6));const l=new THREE.DirectionalLight(0xffffff,.72);l.position.set(6,12,8);scene.add(l);const l2=new THREE.DirectionalLight(0xffffff,.28);l2.position.set(-8,4,-6);scene.add(l2)}
function frame(build){const [w,h,d]=build.size;return Math.max(w,h,d)*1.55+4}
