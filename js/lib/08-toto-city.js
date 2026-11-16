'use strict';
/* toto-city: functions (all lib files load before any run file) */
function totoModel(P,C,npax){const g=new T.Group(),wh=[],dk='#1b1d21',ch='#b9bec6',seat='#7a2e24';
 rb(1.32,.14,2.5,.05,C,0,.5,.25,g);
 [-1,1].forEach(s=>{rb(.06,.42,1.9,.03,P,s*.66,.78,.45,g);bx(.07,.06,1.9,'#f4f4f4',s*.665,.98,.45,g);});
 rb(1.32,.55,.08,.04,P,0,.82,1.47,g);
 const cowl=rb(.86,.95,.18,.07,P,0,1.0,-.98,g);cowl.rotation.x=-.18;rb(.7,.3,.5,.06,P,0,.62,-1.05,g);
 const hl=new T.Mesh(US,MB('#fff7c2'));hl.scale.set(.14,.14,.06);hl.position.set(0,1.28,-1.12);g.add(hl);
 [-1,1].forEach(s=>bx(.1,.07,.05,MB('#ff9d1f'),s*.3,1.32,-1.1,g));
 bx(.06,.6,.06,dk,0,.7,-1.3,g);const fw=wheel(.3,.14,0,.3,-1.32,g);wh.push(fw);bx(.22,.06,.46,P,0,.62,-1.32,g);
 bx(.84,.05,.05,'#9aa0a8',0,1.48,-.86,g);[-1,1].forEach(s=>{bx(.13,.08,.08,'#2a2a2a',s*.44,1.48,-.86,g);bx(.03,.3,.03,dk,s*.32,1.62,-.86,g);const mr=cy(.09,.03,'#c9ced6',s*.36,1.8,-.86,g);mr.rotation.x=Math.PI/2;});
 rb(.5,.14,.42,.05,'#2b2b2e',0,.96,-.48,g);
 [-1,1].forEach(s=>{wh.push(wheel(.3,.16,s*.62,.3,1.0,g));rb(.22,.08,.7,.03,C,s*.62,.66,1.0,g);});
 rb(1.18,.18,.5,.05,seat,0,.95,.2,g);rb(1.18,.5,.1,.04,seat,0,1.28,.48,g);
 rb(1.18,.18,.5,.05,seat,0,.95,1.12,g);rb(1.18,.5,.1,.04,seat,0,1.28,.84,g);
 bx(1.0,.3,.9,'#26282d',0,.7,.66,g);
 [[-.64,-.62],[.64,-.62],[-.64,1.44],[.64,1.44],[-.64,.66],[.64,.66]].forEach(p=>bx(.05,1.25,.05,ch,p[0],1.62,p[1],g));
 rb(1.5,.09,2.45,.05,P,0,2.26,.42,g);rb(1.36,.06,2.3,.03,'#f2f2f2',0,2.32,.42,g);
 [-1,1].forEach(s=>{bx(.03,.16,2.4,P,s*.75,2.14,.42,g);});bx(1.5,.16,.03,P,0,2.14,-.78,g);bx(1.5,.16,.03,P,0,2.14,1.63,g);
 const ws=bx(1.2,.7,.03,glassM,0,1.84,-.66,g);ws.rotation.x=-.12;
 [-1,1].forEach(s=>{bx(.16,.2,.05,MB('#ff3b30'),s*.5,.82,1.52,g);});
 const np=planeTex(tagTex(pick(['WB 11 E 4021','WB 26 E 1188','WB 02 E 7731','WB 19 E 3090']),'#f4f4f4','#111',22),.5,.18,true);np.position.set(0,.66,1.52);g.add(np);
 const d=sitPerson(pick(['#e8e0c8','#c9b27a','#6a8fb0']));d.position.set(0,.6,-.5);d.userData.arms.forEach(a=>a.rotation.x=-1.25);g.add(d);
 const ps=[];[[-.3,.2,0],[.3,.2,0],[-.3,1.12,1],[.3,1.12,1]].forEach((p,i)=>{const q=sitPerson(pick(PCOL));q.position.set(p[0],.6,p[1]);if(p[2])q.rotation.y=Math.PI;q.visible=i<(npax||0);g.add(q);ps.push(q);});
 blob(g,1.5,3.0);g.userData={wh,heads:ps,driver:d};return g;}
function buildToto(){const g=totoModel(paintMat,chassisMat,0);stickerMesh=planeTex(tagTex('টোটো দাদা','#1d7f4a','#fff',34),1.1,.36,true);stickerMesh.position.set(0,1.0,1.52);g.add(stickerMesh);return g;}
function dome(g,r,x,y,z,mat){const m=new T.Mesh(domeG,mat||marbleM);m.scale.set(r,r*1.12,r);m.position.set(x,y,z);g.add(m);return m;}
function lmSign(g,txt,x,z,ry){const s=new T.Group();s.position.set(x,0,z);s.rotation.y=ry;g.add(s);bx(.15,2.4,.15,'#333',-1.6,1.2,0,s);bx(.15,2.4,.15,'#333',1.6,1.2,0,s);const p=planeTex(signTex(txt,'#0b4f8a','#fff'),3.6,1,false);p.position.set(0,2.3,.09);s.add(p);const p2=p.clone();p2.rotation.y=Math.PI;p2.position.z=-.09;s.add(p2);}
function landmark(g,kind,br,R,sol){const cx=(br[0]+br[1])/2,cz=(br[2]+br[3])/2,W=br[1]-br[0],D=br[3]-br[2];
 if(kind==='vm'){bx(46,1.2,30,marble2,cx,.6,cz-4,g);bx(40,9,22,marbleM,cx,5.6,cz-4,g);bx(44,.8,26,marble2,cx,10.4,cz-4,g);
  for(let k=-4;k<=4;k++){bx(.7,7,.7,marble2,cx+k*4.4,4.6,cz+7.3,g);}
  bx(12,12,4,marbleM,cx,7,cz+8.5,g);const pd=new T.Mesh(new T.CylinderGeometry(0,7.5,3,3,1),marbleM);pd.rotation.set(Math.PI/2,0,0);pd.scale.set(1,.5,1);pd.position.set(cx,14.2,cz+10.4);pd.rotation.z=0;g.add(pd);
  const dr=cy(6.5,6,marbleM,cx,14,cz-4,g);dome(g,7,cx,17,cz-4);cy(.9,3,marble2,cx,25.5,cz-4,g);dome(g,1.1,cx,27,cz-4);
  const an=person('#1b1b1b');an.scale.setScalar(.9);an.position.set(cx,27.6,cz-4);g.add(an);
  for(const [dx,dz] of[[-17,-12],[17,-12],[-17,4],[17,4]]){cy(2.2,6,marbleM,cx+dx,13.5,cz+dz,g);dome(g,2.4,cx+dx,16.5,cz+dz);cy(.25,1.6,marble2,cx+dx,19.6,cz+dz,g);}
  const q=QB();qTop(q,cx-4,cx+4,cz+14,br[3]-3,.32,4);qMesh(g,q,waterM);
  lmSign(g,'ভিক্টোরিয়া মেমোরিয়াল',cx+9,br[3]-1.5,0);sol.push([cx-24,cx+24,cz-20,cz+12,1]);}
 else if(kind==='wb'){const fw=W-4,fd=Math.min(D-6,20),fz=br[3]-2-fd/2,fh=17;const m=new T.MeshLambertMaterial({map:wbTex.clone()});m.map.needsUpdate=true;m.map.wrapS=T.RepeatWrapping;m.map.repeat.set(fw/32,1);
  const b=new T.Mesh(UB,[M('#9c3c27'),M('#9c3c27'),M('#7a2e20'),M('#7a2e20'),m,M('#9c3c27')]);b.scale.set(fw,fh,fd);b.position.set(cx,fh/2,fz);g.add(b);
  bx(fw+.6,.8,fd+.6,'#efe3c8',cx,fh+.4,fz,g);
  for(const px of[cx-fw*.33,cx,cx+fw*.33]){bx(10,fh+3,2.4,'#b04a31',px,(fh+3)/2,fz+fd/2+1.1,g);for(let k=-2;k<=2;k++)bx(.7,fh,.7,'#efe3c8',px+k*2.2,fh/2,fz+fd/2+2.4,g);
   const pd=new T.Mesh(new T.CylinderGeometry(0,6,2.6,3,1),M('#efe3c8'));pd.rotation.set(Math.PI/2,0,0);pd.scale.set(1,.3,1);pd.position.set(px,fh+3.6,fz+fd/2+1.4);g.add(pd);
   const st=person('#d9cfb8');st.scale.setScalar(1.3);st.position.set(px,fh+4.6,fz+fd/2+1.2);g.add(st);}
  lmSign(g,'মহাকরণ · রাইটার্স বিল্ডিং',cx+fw*.18,br[3]+.2,0);sol.push([cx-fw/2,cx+fw/2,fz-fd/2,fz+fd/2+3,1]);}
 else if(kind==='sm'){bx(9,2,9,'#d8d0bd',cx,1,cz,g);bx(6,4,6,'#e8e0cc',cx,4,cz,g);const sh=new T.Mesh(new T.CylinderGeometry(1.7,2.6,34,12),M('#efe8d6'));sh.position.set(cx,23,cz);g.add(sh);
  for(const y of[22,36]){cy(2.6,.4,'#d8d0bd',cx,y,cz,g);}cy(1.9,3,'#efe8d6',cx,41.5,cz,g);dome(g,1.9,cx,43,cz,M('#efe8d6'));cy(.15,2,'#333',cx,45.5,cz,g);
  lmSign(g,'শহিদ মিনার',cx+7,br[3]-1.5,0);sol.push([cx-5,cx+5,cz-5,cz+5,1]);}
 else if(kind==='hc'){// High Court style: red gothic block with spires
  const fw=W-10,fd=D-24,fz=cz;bx(fw,14,fd,'#b5523a',cx,7,fz,g);bx(fw+.4,.6,fd+.4,'#efe3c8',cx,14.3,fz,g);for(let k=0;k<Math.floor(fw/4);k++){const x=cx-fw/2+2+k*4;for(const f of[3.5,7.5,11.5]){bx(1.2,2.4,.1,'#2b2a2e',x,f,fz+fd/2+.06,g);}}
  bx(8,24,8,'#b5523a',cx,12,fz+fd/2-2,g);const sp=new T.Mesh(new T.ConeGeometry(4.2,8,4),M('#4f5b5a'));sp.rotation.y=Math.PI/4;sp.position.set(cx,28,fz+fd/2-2);g.add(sp);
  for(const s of[-1,1]){bx(3,18,3,'#b5523a',cx+s*fw/2,9,fz+fd/2,g);const c2=new T.Mesh(new T.ConeGeometry(2,4,4),M('#4f5b5a'));c2.rotation.y=Math.PI/4;c2.position.set(cx+s*fw/2,20,fz+fd/2);g.add(c2);}
  lmSign(g,'হাইকোর্ট',cx+12,br[3]-1.5,0);sol.push([cx-fw/2-2,cx+fw/2+2,fz-fd/2,fz+fd/2+2,1]);}
 else landmark2(g,kind,br,R,sol,cx,cz,W,D);
}
function beamMat(col){return new T.MeshBasicMaterial({map:beamTex,color:col,transparent:true,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide,fog:false});}
function mkMarker(e){const g=new T.Group(),isS=e.type==='stn',col=isS?'#ffd23f':'#5cffb0';
 const bm=new T.Mesh(beamG,beamMat(col));bm.scale.set(isS?1.6:.9,isS?16:13,isS?1.6:.9);bm.position.y=(isS?16:13)/2;g.add(bm);
 const pm=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({map:isS?padTex:ringTex,color:col,transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false}));pm.rotation.x=-Math.PI/2;pm.scale.setScalar(isS?4.6:2.6);pm.position.y=.06;g.add(pm);
 g.userData={bm,pm};scene.add(g);return g;}
function fxUpdate(){const seen=new Set();const px=PX(),pz=PZ(),nf=G.night||0;
 for(const e of ents){if(e.gone||(e.type!=='pax'&&e.type!=='stn'))continue;if(e.type==='pax'&&(e.picked||e.onboard||!e.mesh||!e.mesh.visible))continue;
  const x=e.type==='stn'?e.zx:e.x+(e.nx||0)*-.9,z=e.type==='stn'?e.zz:e.z+(e.nz||0)*-.9;if(Math.hypot(x-px,z-pz)>150)continue;
  let m=FXM.get(e);if(!m){m=mkMarker(e);FXM.set(e,m);}seen.add(e);m.visible=G.state!=='menu';m.position.set(x,0,z);
  const pul=.75+.25*Math.sin((G.t||0)*4),near=Math.hypot(x-px,z-pz);m.userData.bm.material.opacity=(.35+.3*nf)*pul*Math.min(1,near/12+.25);m.userData.pm.material.opacity=.55+.4*pul;m.userData.pm.rotation.z=(G.t||0)*.6;}
 for(const [e,m] of FXM)if(!seen.has(e)){scene.remove(m);m.traverse(o=>{if(o.material)o.material.dispose();});FXM.delete(e);}}
function clockTower(g,x,z,col){bx(4,1,4,'#d8d0bd',x,.5,z,g);bx(3,14,3,col||'#c96f4a',x,8,z,g);for(const [ax,az,ry] of[[0,1.52,0],[0,-1.52,Math.PI],[1.52,0,Math.PI/2],[-1.52,0,-Math.PI/2]]){const c=new T.Mesh(new T.CircleGeometry(1,20),M('#fbf7ea'));c.position.set(x+ax,12.5,z+az);c.rotation.y=ry;g.add(c);bx(.08,.75,.05,'#111',x+ax*1.03,12.75,z+az*1.03,g).rotation.y=ry;bx(.5,.08,.05,'#111',x+ax*1.03+(az?.22:0),12.5,z+az*1.03+(ax?.22:0),g).rotation.y=ry;}
 const r=new T.Mesh(new T.ConeGeometry(2.4,3.5,4),M('#5a3d2b'));r.rotation.y=Math.PI/4;r.position.set(x,16.8,z);g.add(r);}
function chimney(g,x,z,h){for(let k=0;k<6;k++)cy(1.3-k*.06,h/6,k%2?'#f2f2f2':'#c0392b',x,h/12+k*h/6,z,g);const sm=new T.MeshLambertMaterial({color:'#9aa0a6',transparent:true,opacity:.55,depthWrite:false});for(let k=0;k<5;k++){const p=new T.Mesh(US,sm);p.userData.keep=1;p.scale.setScalar(1.6+k*.9);p.position.set(x+k*1.6,h+1.5+k*1.8,z+k*.6);g.add(p);}}
function landmark2(g,kind,br,R,sol,cx,cz,W,D){
 if(kind==='tea'){for(let r=0;r<10;r++){const z=br[2]+6+r*(D-12)/9;for(let c=0;c<14;c++){const x=br[0]+5+c*(W-10)/13;const b=new T.Mesh(US,M(r%2?'#2f7d32':'#38883a'));b.scale.set(1.5,.7,1.3);b.position.set(x,.6,z);g.add(b);}}
  for(let k=0;k<6;k++)tree(g,br[0]+6+R()*(W-12),br[2]+6+R()*(D-12),1.3);lmSign(g,'চা বাগান · Tea Estate',cx+8,br[3]-1.5,0);}
 else if(kind==='ct'){clockTower(g,cx,cz);lmSign(g,pick(['ঘড়ি মোড়','টাওয়ার মোড়']),cx+7,br[3]-1.5,0);sol.push([cx-2.5,cx+2.5,cz-2.5,cz+2.5,1]);}
 else if(kind==='cg'){const z=br[3]-6,cr='#d9c7a0',rd='#b5523a';for(const s of[-1,1]){bx(5,12,5,cr,cx+s*6,6,z,g);dome(g,1.6,cx+s*6,12,z,M(rd));cy(.12,1.5,'#333',cx+s*6,14.2,z,g);}
  bx(7.2,3,5,cr,cx,10.5,z,g);bx(7.4,.5,5.2,rd,cx,12.2,z,g);bx(3,2,3,cr,cx,13.3,z,g);dome(g,1.4,cx,14.3,z,M(rd));
  lmSign(g,'কার্জন গেট',cx+11,br[3]-1.5,0);sol.push([cx-8.6,cx-3.4,z-2.6,z+2.6,1],[cx+3.4,cx+8.6,z-2.6,z+2.6,1]);}
 else if(kind==='chim'){bx(W-14,10,D-30,'#6d6f73',cx,5,cz-6,g);bx(W-14,.6,D-30,'#4a4c50',cx,10.3,cz-6,g);for(let k=0;k<3;k++)chimney(g,cx-14+k*14,cz-6,26+k*4);
  cy(4,8,'#8a8d91',cx+20,4,cz+12,g);lmSign(g,'ইস্পাত কারখানা',cx+8,br[3]-1.5,0);sol.push([cx-(W-14)/2,cx+(W-14)/2,cz-6-(D-30)/2,cz-6+(D-30)/2,1]);}
 else if(kind==='coal'){for(let k=0;k<5;k++){const c=new T.Mesh(new T.ConeGeometry(5+R()*3,4+R()*3,7),M('#1e1e22'));c.position.set(br[0]+10+R()*(W-20),2.5,br[2]+10+R()*(D-20));g.add(c);}
  bx(.4,9,.4,'#444',cx,4.5,cz,g);bx(6,.4,.4,'#444',cx,9,cz,g);lmSign(g,'কয়লা ডিপো',cx+8,br[3]-1.5,0);}
 else if(kind==='mango'){for(let k=0;k<18;k++){const x=br[0]+5+R()*(W-10),z=br[2]+5+R()*(D-10);tree(g,x,z,1.2);for(let f=0;f<5;f++){const m=new T.Mesh(US,M('#d4c22a'));m.scale.setScalar(.22);m.position.set(x+rnd(-1.4,1.4),3+R()*1.8,z+rnd(-1.4,1.4));g.add(m);}}
  lmSign(g,'আমবাগান',cx+8,br[3]-1.5,0);}
 else if(kind==='adn'){for(let k=0;k<9;k++){const x=cx-20+k*5;bx(1.2,7,2,'#9c4a2f',x,3.5,cz,g);if(k<8){const a=new T.Mesh(new T.TorusGeometry(1.9,.55,6,12,Math.PI),M('#9c4a2f'));a.position.set(x+2.5,7,cz);g.add(a);}}
  bx(42,1,3,'#8a3f27',cx,9.3,cz,g);lmSign(g,'আদিনা মসজিদ (ধ্বংসাবশেষ)',cx+8,br[3]-1.5,0);sol.push([cx-21,cx+21,cz-1.2,cz+1.2,1]);}
 else if(kind==='hz'){const fw=Math.min(W-8,56),z=cz-2;const y='#f2d58a';bx(fw,3,22,'#e8d3a0',cx,1.5,z,g);bx(fw-4,14,16,y,cx,10,z,g);bx(fw-2,1,18,'#fff4d6',cx,17.3,z,g);
  for(let k=-6;k<=6;k++)bx(.9,12,.9,'#fff8e6',cx+k*2.3,9,z+9.2,g);const pd=new T.Mesh(new T.CylinderGeometry(0,9,3.2,3,1),M('#fff4d6'));pd.rotation.set(Math.PI/2,0,0);pd.scale.set(1,.35,1);pd.position.set(cx,18.4,z+9.4);g.add(pd);
  for(let k=0;k<8;k++)bx(30-k*1.6,.4,1,'#efe3c8',cx,.2+k*.4,z+11+(7-k)*1,g);
  lmSign(g,'হাজারদুয়ারি প্রাসাদ',cx+18,br[3]-1.5,0);sol.push([cx-fw/2,cx+fw/2,z-11,z+11,1]);}
}
function policeBooth(g,x,z,ry){const s=new T.Group();s.position.set(x,0,z);s.rotation.y=ry;g.add(s);bx(1.8,.15,1.8,'#cfcfcf',0,.25,0,s);bx(1.6,2.1,1.6,'#f4f4f4',0,1.35,0,s);bx(1.62,.25,1.62,'#1d3f8f',0,1.9,0,s);bx(1.62,.12,1.62,'#c0261d',0,1.7,0,s);
 bx(1.2,.8,.05,glassM,0,1.45,.81,s);const r=new T.Mesh(new T.ConeGeometry(1.5,.8,4),M('#1d3f8f'));r.rotation.y=Math.PI/4;r.position.set(0,2.85,0);s.add(r);quadM(s,boothSign,0,2.2,.82,1.5,.38,0);
 const cop=person('#f4f4f4');cop.position.set(1.3,.22,.6);cop.rotation.y=.4;s.add(cop);const cap=new T.Mesh(US,M('#f4f4f4'));cap.scale.set(.24,.1,.24);cap.position.set(0,1.82,0);cop.add(cap);}
function bannerMat(t){return new T.MeshLambertMaterial({side:T.DoubleSide,map:cTex(512,96,(x,w,h)=>{x.fillStyle='#fff';x.fillRect(0,0,w,h);x.fillStyle='#c0261d';x.fillRect(0,0,w,14);x.fillRect(0,h-14,w,14);x.textAlign='center';x.font='800 44px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText(t,w/2,66,w-20);})});}
function procModel(){const g=new T.Group(),ppl=[];const sl=pick(PROC_SL);
 const bn=new T.Mesh(new T.PlaneGeometry(5,1.1),bannerMat(sl));bn.position.set(0,2.35,4.2);g.add(bn);bn.rotation.y=Math.PI;[-2.5,2.5].forEach(s=>bx(.07,2.9,.07,'#6b4a2b',s,1.45,4.2,g));
 for(let r=0;r<6;r++)for(let c=0;c<4;c++){if(r>0&&Math.random()<.18)continue;const p=person(pick(['#fff','#e8e0c8','#c9b27a','#d6452d','#2c7be5','#f2b01e','#16a085']));p.position.set(-1.9+c*1.27+rnd(-.2,.2),.22,3.9-r*1.45+rnd(-.2,.2));p.userData.ph=Math.random()*6;g.add(p);ppl.push(p);
  if(r>0&&Math.random()<.3){const fl=new T.Group();fl.position.set(.3,1.5,0);p.add(fl);bx(.03,1.3,.03,'#6b4a2b',0,.5,0,fl);bx(.5,.32,.02,pick(['#c0261d','#16a34a','#1d4ed8','#fff']),.26,1.0,0,fl);}
  else if(r>0&&Math.random()<.25){const pl=new T.Mesh(new T.PlaneGeometry(.7,.45),bannerMat(pick(PROC_SL)));pl.position.set(0,1.95,-.05);pl.rotation.y=Math.PI;p.add(pl);}}
 const cop=person('#f4f4f4');cop.position.set(2.9,.22,0);g.add(cop);ppl.push(cop);g.userData.ppl=ppl;return g;}
function procUpdate(dt){if(G.state!=='play'){return;}
 if(procE&&(procE.gone||Math.hypot(procE.x-PX(),procE.z-PZ())>190)){procE.gone=true;scene.remove(procE.mesh);procE=null;procT=rnd(35,60);}
 if(!procE){procT-=dt;if(procT>0)return;procT=6;for(let t=0;t<12;t++){const s=randomRoadSpot([55,125]);if(!s||s.ri.kind==="gali")continue;const ls=s.ri.lanes,a={ax:s.ax,k:s.k,dir:s.dir,off:ls[ls.length-1]};const [x,z]=laneXZ(a,s.along),d=Math.hypot(x-PX(),z-PZ());if(d<55||d>130||!offScreen(x,-z))continue;
   const m=procModel();const [x2,z2]=laneXZ(a,s.along+1);const fx=x2-x,fz=z2-z,fl=Math.hypot(fx,fz)||1;const dir=Math.random()<.5?1:-1;const ry=Math.atan2(fx/fl*dir,fz/fl*dir);m.position.set(x,0,z);m.rotation.y=ry;scene.add(m);
   procE={type:'proc',d:DEFS_PROC,x,z,w:DEFS_PROC.w,l:DEFS_PROC.l,v:0,vx:0,t:0,hit:false,h:0,yo:0,ry,col:'#fff',mesh:m,parked:1,dyn:1,keep:1,pa:a,along:s.along,pdir:dir};ents.push(procE);say('📢 সামনে মিছিল! অন্য রাস্তা ধরো',1);break;}return;}
 const e=procE;e.t+=dt;e.along+=e.pdir*1.1*dt;const [x,z]=laneXZ(e.pa,e.along);e.x=x;e.z=z;e.mesh.position.set(x,0,z);
 for(const p of e.mesh.userData.ppl){walk(p,e.t*5+p.userData.ph,.6);if(p.userData.arms&&Math.sin(e.t*2+p.userData.ph)>.6)p.userData.arms[0].rotation.x=-2.6;}
 if(obbHit(e,PX(),PZ(),1.3)&&Math.abs(G.sp)>2.5&&!(G.beatT>0)&&(e.hitT||0)<e.t){e.hitT=e.t+4;G.sp*=.25;G.vx*=.25;G.vz*=.25;A.mob();say('মিছিলে টোটো ঢুকিয়ে দিলি?!',1);spawnCh(5,G.D,G.x);}}
function rotOff(x,z,ry,ox,oz){const c=Math.cos(ry),s=Math.sin(ry);return[x+ox*c+oz*s,z-ox*s+oz*c];}
function vegStall(g,x,z,ry){const s=new T.Group();s.position.set(x,.22,z);s.rotation.y=ry;g.add(s);bx(1.8,.03,1.2,'#1e88e5',0,.02,0,s);
 const V=['#43a047','#e53935','#7b1fa2','#fb8c00','#c0ca33','#8d6e63','#fdd835'];for(let k=0;k<6;k++){const px=-.6+(k%3)*.6,pz=-.25+(k/3|0)*.5,c=pick(V);for(let q=0;q<5;q++)bx(.12,.1,.12,c,px+rnd(-.15,.15),.08+q*.03,pz+rnd(-.12,.12),s);}
 const p=person('#fafafa',{plain:1});p.position.set(0,0,.85);p.rotation.y=Math.PI;p.scale.set(1,.72,1);s.add(p);bx(.6,.25,.04,'#5d4037',.6,.4,.5,s);}
function fishStall(g,x,z,ry){const s=new T.Group();s.position.set(x,.22,z);s.rotation.y=ry;g.add(s);bx(1.6,.5,.9,'#6d4c41',0,.25,0,s);bx(1.5,.06,.8,'#b0bec5',0,.52,0,s);
 for(let k=0;k<9;k++){const f=bx(.32,.05,.1,pick(['#cfd8dc','#b0bec5','#90a4ae','#ffccbc']),-.5+(k%3)*.5,.58,-.25+(k/3|0)*.25,s);f.rotation.y=rnd(-.4,.4);}
 const b=cy(.28,.25,'#9e9e9e',.95,.12,.2,s);const p=person('#e3f2fd',{plain:1});p.position.set(0,0,.85);p.rotation.y=Math.PI;s.add(p);bx(.5,.04,.12,'#bdbdbd',-.3,.6,.4,s);}
function fruitStall(g,x,z,ry){const s=new T.Group();s.position.set(x,.22,z);s.rotation.y=ry;g.add(s);bx(1.9,.08,1.1,'#8d6e63',0,.85,0,s);[[-.85,-.45],[.85,-.45],[-.85,.45],[.85,.45]].forEach(p=>bx(.08,.85,.08,'#5d4037',p[0],.42,p[1],s));
 [[-.7,.2],[.7,.2]].forEach(p=>{const w=cy(.32,.08,'#3e2723',p[0],.32,p[1]+.45,s);w.rotation.x=Math.PI/2;});
 const F=[['#fdd835',.22,.1],['#e53935',.13,.13],['#fb8c00',.13,.13],['#7cb342',.14,.14],['#6a1b9a',.08,.08]];for(let r=0;r<3;r++)for(let c=0;c<5;c++){const f=F[c];for(let q=0;q<3-r;q++)bx(f[1],f[2],f[1],f[0],-.75+c*.37+rnd(-.05,.05),.95+r*.12,-.25+q*.22+r*.1,s);}
 const um=new T.Mesh(new T.ConeGeometry(1.3,.5,8),M(pick(['#e53935','#1e88e5','#fbc02d'])));um.position.set(0,2.3,0);s.add(um);bx(.05,1.4,.05,'#444',0,1.6,0,s);
 const p=person(pick(CSH),{plain:1});p.position.set(0,0,.85);p.rotation.y=Math.PI;s.add(p);}
function muriHawker(g,x,z,ry){const s=new T.Group();s.position.set(x,.22,z);s.rotation.y=ry;g.add(s);cy(.3,.35,'#d7ccc8',0,.85,0,s);bx(.06,.8,.06,'#5d4037',0,.4,0,s);for(let k=0;k<6;k++)bx(.08,.12,.08,pick(['#ffcc80','#ef9a9a','#a5d6a7']),rnd(-.2,.2),1.08,rnd(-.2,.2),s);const p=person('#fff59d',{plain:1});p.position.set(.5,0,.1);p.rotation.y=-Math.PI/2;s.add(p);}
function fireMesh(){const g=new T.Group();const t=new T.Mesh(new T.TorusGeometry(.38,.16,6,12),M('#111'));t.rotation.x=Math.PI/2;t.position.y=.18;g.add(t);
 const fm=new T.MeshBasicMaterial({color:'#ff7a00',transparent:true,opacity:.9,depthWrite:false,blending:T.AdditiveBlending,fog:false});const f2=new T.MeshBasicMaterial({color:'#ffd23f',transparent:true,opacity:.8,depthWrite:false,blending:T.AdditiveBlending,fog:false});
 const a=new T.Mesh(new T.ConeGeometry(.35,1.1,7),fm);a.position.y=.75;g.add(a);const b=new T.Mesh(new T.ConeGeometry(.2,.7,7),f2);b.position.y=.6;g.add(b);
 const sm=new T.Mesh(US,new T.MeshLambertMaterial({color:'#333',transparent:true,opacity:.35,depthWrite:false}));sm.scale.setScalar(.8);sm.position.y=2.4;g.add(sm);g.userData={a,b,sm};return g;}
function obrModel(w){const g=new T.Group(),ppl=[],fires=[];const bn=new T.Mesh(new T.PlaneGeometry(Math.min(w-1,9),1.3),bannerMat(pick(OBR_SL)));bn.position.set(0,2.6,-1.6);g.add(bn);const bn2=bn.clone();bn2.rotation.y=Math.PI;bn2.position.z=-1.62;g.add(bn2);
 [-1,1].forEach(s=>bx(.08,3.3,.08,'#6b4a2b',s*Math.min(w-1,9)/2,1.65,-1.6,g));
 for(let k=0;k<Math.floor(w/1.1);k++)for(let r=0;r<2;r++){if(Math.random()<.15)continue;const p=person(pick(['#fff','#e8e0c8','#d6452d','#2c7be5','#f2b01e']));p.position.set(-w/2+.6+k*1.1+rnd(-.2,.2),.22,r*1.1-.3);p.userData.ph=Math.random()*6;
  if(Math.random()<.6){p.scale.y=.62;}g.add(p);ppl.push(p);}
 for(const fx of[-w/2+1.4,w/2-1.4]){const f=fireMesh();f.position.set(fx,0,1.6);g.add(f);fires.push(f);}
 for(let k=0;k<5;k++){const bb=bx(.9,.12,.12,'#a1887f',-w/2+1+k*(w-2)/4,.3,2.3,g);bb.rotation.y=rnd(-.4,.4);}
 const cop=person('#f4f4f4',{plain:1});cop.position.set(w/2+1.2,.22,3.5);g.add(cop);g.userData={ppl,fires};return g;}
function obrUpdate(dt){if(G.state!=='play')return;
 if(obrE&&(obrE.gone||Math.hypot(obrE.x-PX(),obrE.z-PZ())>200||obrE.t>120)){obrE.gone=true;scene.remove(obrE.mesh);obrE=null;obrT=rnd(50,90);}
 if(!obrE){obrT-=dt;if(obrT>0)return;obrT=8;for(let t=0;t<14;t++){const s=randomRoadSpot([60,135]);if(!s||s.ri.kind==="gali")continue;const ls=s.ri.lanes;const a0={ax:s.ax,k:s.k,dir:s.dir,off:0};const [x,z]=laneXZ(a0,s.along),d=Math.hypot(x-PX(),z-PZ());if(d<60||d>140||!offScreen(x,-z))continue;
   const [x2,z2]=laneXZ(a0,s.along+1);const fx=x2-x,fz=z2-z,fl=Math.hypot(fx,fz)||1;const ry=Math.atan2(fx/fl,fz/fl);const w=s.ri.hw*2-.4;
   const m=obrModel(w);m.position.set(x,0,z);m.rotation.y=ry;scene.add(m);
   obrE={type:'proc',d:{w,l:3.2,v:[0,0],b:0,solid:1},x,z,w,l:3.2,v:0,vx:0,t:0,hit:false,h:0,yo:0,ry,col:'#fff',mesh:m,parked:1,dyn:1,keep:1};ents.push(obrE);say('🚧 সামনে পথ অবরোধ! ঘুরপথ ধরো',1);break;}return;}
 const e=obrE;e.t+=dt;for(const f of e.mesh.userData.fires){const u=f.userData,k=1+.25*Math.sin(e.t*13+f.position.x);u.a.scale.set(1,k,1);u.b.scale.set(1,2-k,1);u.sm.position.y=2.4+((e.t*.8)%1.5);u.sm.material.opacity=.35*(1-((e.t*.8)%1.5)/1.5);}
 for(const p of e.mesh.userData.ppl){if(p.scale.y>.9&&p.userData.arms)p.userData.arms[0].rotation.x=-2.4-Math.sin(e.t*4+p.userData.ph)*.5;}
 e.ch=(e.ch||0)-dt;const d=Math.hypot(e.x-PX(),e.z-PZ());if(e.ch<=0&&d<50){e.ch=rnd(3,5);bubble(pick(CHANT),{pos:()=>[e.x,3.6,e.z]});}
 if(obbHit(e,PX(),PZ(),1.3)&&Math.abs(G.sp)>2.5&&!(G.beatT>0)&&(e.hitT||0)<e.t){e.hitT=e.t+4;G.sp*=.2;G.vx*=.2;G.vz*=.2;A.mob();say('অবরোধে ঢুকে পড়লি?!',1);spawnCh(6,G.D,G.x);}}
function aheadOK(x,z,d){camera.getWorldDirection(_cd);const dx=x-PX(),dz=z-PZ();return (dx*_cd.x+dz*_cd.z)/(d||1)>.55;}
function curRoad(){const r=onRoad(PX(),PZ());return r;}
function paxOnMyRoad(e){const r=curRoad();if(!r.inV&&!r.inH)return Math.hypot(e.x-PX(),e.z-PZ())<25;
 let ok=false;if(r.inV){const hw=rinfo(r.i,0).hw;if(Math.abs(e.x-r.i*B)<hw+SWW+2)ok=true;}if(r.inH){const hw=rinfo(r.j,1).hw;if(Math.abs(e.z-r.j*B)<hw+SWW+2)ok=true;}return ok;}
function paxUpdate(dt){const px=PX(),pz=PZ();for(const e of ents){if(e.type!=='pax'||e.gone||!e.mesh)continue;
  const d=Math.hypot(e.x-px,e.z-pz),show=d<130&&(paxOnMyRoad(e)||d<14||e.jump);e.mesh.visible=show;e.hid=!show;
  if(e.jump){e.jump=(performance.now()-e.jt0)/1000+.001;const k=Math.min(1,e.jump/.45),tx=px,tz=pz;e.mesh.position.set(e.jx+(tx-e.jx)*k,.22+Math.sin(k*Math.PI)*1.3,e.jz+(tz-e.jz)*k);if(k>=1){e.jump=0;e.mesh.position.set(e.jx,.22,e.jz);if(!G.trip)startTrip(e);}continue;}
  if(show&&!G.trip&&d<6.5&&Math.abs(G.sp)<8.5&&G.state==='play'&&!(G.beatT>0)){e.jump=.001;e.jt0=performance.now();e.jx=e.mesh.position.x;e.jz=e.mesh.position.z;try{A.ps&&A.ps('bell',.3,1.2);}catch(_){}}}}
function crowdKnock(){if(G.state!=='play'||Math.abs(G.sp)<1.6)return;const px=PX(),pz=PZ();
 for(const m of CROWDM){if(!m.parent){CROWDM.delete(m);continue;}const bs=m.geometry.boundingSphere;if(bs&&Math.hypot(bs.center.x-px,bs.center.z-pz)>bs.radius+3)continue;
  for(const p of m.userData.pp){if(p.gone||Math.abs(p.x-px)>1.6||Math.abs(p.z-pz)>1.6)continue;if(Math.hypot(p.x-px,p.z-pz)>1.25)continue;
   p.gone=1;const pa=m.geometry.attributes.position;for(let k=p.v0;k<p.v1;k++)pa.setY(k,-60);pa.needsUpdate=true;
   const e=place2('walker',p.x,p.z,{ry:Math.random()*6});if(e){e.keep=0;e.dyn=1;try{victimPerson(e);}catch(_){}}}}}
function tractorModel(){const g=new T.Group(),wh=[];const R0='#c62828';bx(1.2,.7,2,R0,0,1.0,-1.9,g);bx(1.0,.5,1.1,R0,0,1.35,-2.3,g);bx(.25,.25,.05,MB('#fff5c0'),.3,1.1,-2.92,g);bx(.25,.25,.05,MB('#fff5c0'),-.3,1.1,-2.92,g);
 cy(.08,1.2,'#333',.35,2.0,-2.4,g);bx(.5,.12,.5,'#222',0,1.45,-1.05,g);const dr=person('#e8e0c8',{plain:1});dr.position.set(0,.95,-1.0);dr.scale.setScalar(.95);g.add(dr);
 for(const s of[-1,1]){wh.push(wheel(.72,.45,s*.85,.72,-.95,g));wh.push(wheel(.38,.22,s*.62,.38,-2.55,g));}
 bx(.15,.15,.8,'#333',0,.6,-.2,g);bx(2.0,.8,3.0,'#2e7d32',0,1.1,1.5,g);bx(2.0,.08,3.0,'#1b5e20',0,.7,1.5,g);for(const s of[-1,1])wh.push(wheel(.45,.3,s*1.0,.45,1.5,g));
 for(let k=0;k<6;k++)bx(.5,.3,.4,pick(['#a1887f','#8d6e63','#d7ccc8']),rnd(-.6,.6),1.6,.6+k*.35,g);g.userData={wh,heads:[]};blob(g,2.1,6.2);return g;}
function jcbModel(){const g=new T.Group(),Y='#f9a825';bx(2.2,1.1,3.6,Y,0,1.1,0,g);bx(1.6,1.4,1.5,Y,0,2.3,.4,g);bx(1.4,1.0,1.3,glassM,0,2.4,.4,g);
 for(const s of[-1,1]){wheel(.75,.5,s*1.15,.75,1.1,g);wheel(.55,.4,s*1.15,.55,-1.2,g);}bx(2.4,.5,.6,'#555',0,.9,-2.1,g);
 const arm=new T.Group();arm.position.set(0,1.6,1.9);g.add(arm);bx(.3,.3,2.6,Y,0,.6,1.2,arm).rotation.x=-.45;const fo=new T.Group();fo.position.set(0,1.2,2.4);arm.add(fo);bx(.25,.25,1.8,Y,0,-.6,.2,fo).rotation.x=.9;const bk=bx(.8,.45,.5,'#555',0,-1.3,.9,fo);
 const dr=person('#ff7043',{plain:1});dr.position.set(0,1.55,.4);dr.scale.setScalar(.9);g.add(dr);g.userData={arm,fo};return g;}
function rwModel(w,full){const g=new T.Group(),L=10;const tr=new T.Mesh(new T.PlaneGeometry(full?w-1:w*.48,L-3),new T.MeshLambertMaterial({color:'#2b1d14'}));tr.rotation.x=-Math.PI/2;tr.position.set(full?0:-w*.25,.035,0);g.add(tr);
 for(let k=0;k<5;k++){const c=new T.Mesh(new T.ConeGeometry(1.1+Math.random()*.6,1+Math.random()*.6,6),M(pick(['#7a5534','#8d6a45','#6d4c2f'])));c.position.set((full?0:-w*.25)+rnd(-w*.2,w*.2),.5,-L/2+1+k*2);g.add(c);}
 for(let k=0;k<3;k++){const p=cy(.45,6,pick(['#1565c0','#9e9e9e']),(full?w*.3:w*.05)+k*.0,.45+k*.9*0,0,g);p.rotation.x=Math.PI/2;p.position.set((full?-w*.3:-w*.05)+k*.95,.45,0);}
 const bw=full?w-.6:w*.52;for(const zz of[-L/2,L/2]){const b=new T.Mesh(UB,stripeM);b.scale.set(bw,.35,.12);b.position.set(full?0:-w*.24,.9,zz);g.add(b);for(const s of[-1,1])bx(.1,.9,.3,'#333',(full?0:-w*.24)+s*bw/2,.45,zz,g);}
 const sg=new T.Mesh(new T.PlaneGeometry(2.6,1),RW_SIGN);sg.position.set(full?0:-w*.24,1.75,L/2+.05);g.add(sg);const sg2=sg.clone();sg2.position.z=-L/2-.05;sg2.rotation.y=Math.PI;g.add(sg2);
 const j=jcbModel();j.position.set(full?w*.2:-w*.24+.2,0,-2.6);j.rotation.y=.2;g.add(j);
 const wk=[];for(let k=0;k<3;k++){const p=person(pick(['#ff9800','#fdd835']),{plain:1});p.position.set((full?0:-w*.25)+rnd(-1.5,1.5),.0,rnd(-3,3));const hat=bx(.34,.14,.34,'#fdd835',0,1.82,0,p);g.add(p);wk.push(p);}
 g.userData={jcb:j,wk};return g;}
function rwUpdate(dt){if(G.state!=='play')return;const px=PX(),pz=PZ();
 if(rwE&&(rwE.gone||Math.hypot(rwE.x-px,rwE.z-pz)>210)){rwE.gone=true;scene.remove(rwE.mesh);rwE=null;rwT=rnd(45,80);}
 if(!rwE){rwT-=dt;if(rwT>0)return;rwT=6;for(let t=0;t<16;t++){const s=randomRoadSpot([70,140]);if(!s)continue;const a0={ax:s.ax,k:s.k,dir:s.dir,off:0};const [x,z]=laneXZ(a0,s.along),d=Math.hypot(x-px,z-pz);if(!(offScreen(x,-z)||(aheadOK(x,z,d)&&d>105)))continue;
   const full=s.ri.kind==='gali'||Math.random()<.35;const [x2,z2]=laneXZ(a0,s.along+1);const fx=x2-x,fz=z2-z,fl=Math.hypot(fx,fz)||1;const ry=Math.atan2(fx/fl,fz/fl);const w=s.ri.hw*2;
   const m=rwModel(w,full);m.position.set(x,0,z);m.rotation.y=ry;scene.add(m);castAll&&castAll(m);
   const ww=full?w-.4:w*.52,ox=full?0:-w*.24,c=Math.cos(ry),sn=Math.sin(ry);
   rwE={type:'proc',d:{w:ww,l:10,v:[0,0],b:0,solid:1},x:x+ox*c,z:z-ox*sn,w:ww,l:10,v:0,vx:0,t:0,hit:false,h:0,yo:0,ry,col:'#fff',mesh:m,parked:1,dyn:1,keep:1};ents.push(rwE);
   if(aheadOK(x,z,d))say(full?'🚧 সামনে রাস্তা খোঁড়া, পুরো বন্ধ! ঘুরপথ ধরো':'🚧 সামনে রাস্তা খোঁড়া — এক পাশ বন্ধ',1);break;}return;}
 const e=rwE;e.t+=dt;const u=e.mesh.userData.jcb.userData;u.arm.rotation.x=-.25+Math.sin(e.t*.9)*.25;u.fo.rotation.x=.2+Math.sin(e.t*.9+1)*.5;
 for(const p of e.mesh.userData.wk)walk(p,e.t*3+p.position.x,.25);
 const h=obbHit(e,px,pz,1.2);if(h&&h.pen>0&&Math.abs(G.sp)>3&&(e.hitT||0)<e.t){e.hitT=e.t+3;G.sp*=.2;G.vx*=.2;G.vz*=.2;try{A.bump();}catch(_){}say('খাদে পড়বি নাকি? রাস্তা বন্ধ!',1);}}
function banterUpd(dt){if(G.state!=='play')return;banT-=dt;if(banT>0)return;banT=4;const px=PX(),pz=PZ();
 const near=ents.filter(e=>e.type==='walker'&&!e.gone&&!e.down&&Math.hypot(e.x-px,e.z-pz)<26);const fem=near.find(e=>e.mesh&&e.mesh.userData.fem);if(!fem)return;
 const busy=near.filter(e=>Math.hypot(e.x-fem.x,e.z-fem.z)<8).length;if(busy>3)return;
 const guy=near.find(e=>e!==fem&&!(e.mesh&&e.mesh.userData.fem));const src=guy||{pos:()=>[fem.x+2.5,2.6,fem.z+1.5]};
 bubble(pick(ROMEO),guy?{pos:()=>[guy.x,2.6,guy.z]}:src);setTimeout(()=>{if(!fem.gone)bubble(pick(RETORT),{pos:()=>[fem.x,2.6,fem.z]});},1700);banT=rnd(45,90);}
