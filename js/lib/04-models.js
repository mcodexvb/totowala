'use strict';
/* models: functions (all lib files load before any run file) */
function rbGeo(w,h,d,r){const k=w+'|'+h+'|'+d+'|'+r;if(rbC[k])return rbC[k];r=Math.min(r,w/2-.001,h/2-.001);const x=-w/2,y=-h/2,s=new T.Shape();s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);const g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:false,curveSegments:3});g.translate(0,0,-d/2);return rbC[k]=g;}
function rb(w,h,d,r,c,x,y,z,par){const m=new T.Mesh(rbGeo(w,h,d,r),typeof c==='string'?M(c):c);m.position.set(x||0,y||0,z||0);if(par)par.add(m);return m;}
function blob(g,w,l){const m=new T.Mesh(blobG,blobM);m.rotation.x=-Math.PI/2;m.scale.set(w*.6,l*.55,1);m.position.y=.03;g.add(m);}
function wheel(r,wd,x,y,z,par){const g=new T.Group();g.position.set(x,y,z);cy(r,wd,'#16181b',0,0,0,g,true);cy(r*.55,wd+.03,'#b9bec6',0,0,0,g,true);par.add(g);return g;}
function ringWheel(r,x,y,z,par,col){const g=new T.Group();g.position.set(x,y,z);const t=new T.Mesh(torG,M(col||'#1d1d1f'));t.scale.set(r,r,r);t.rotation.y=Math.PI/2;g.add(t);for(let i=0;i<3;i++){const s=bx(.025,r*1.9,.025,'#b0b0b0',0,0,0,g);s.rotation.x=i*Math.PI/3;}par.add(g);return g;}
function sitPerson(shirt,sc){const p=person(shirt);p.userData.legs.forEach(l=>l.rotation.x=1.45);p.scale.setScalar(sc||.75);return p;}
function autoModel(P,C,npax){
 const g=new T.Group(),wh=[],dk='#1b1d21',ch='#b9bec6';
 rb(1.46,.6,2.3,.16,C,0,.72,.38,g);rb(1.5,.12,2.34,.06,P,0,1.0,.38,g);
 rb(1.12,.78,.86,.36,C,0,.98,-1.0,g);const ns=new T.Mesh(US,C);ns.scale.set(.56,.4,.34);ns.position.set(0,.98,-1.4);g.add(ns);rb(1.0,.1,.8,.05,P,0,1.39,-.98,g);
 const hr=cy(.17,.08,ch,0,1.02,-1.7,g);hr.rotation.x=Math.PI/2;const hl=new T.Mesh(US,MB('#fff7c2'));hl.scale.set(.13,.13,.06);hl.position.set(0,1.02,-1.74);g.add(hl);
 [-1,1].forEach(s=>bx(.12,.08,.06,MB('#ff9d1f'),s*.42,1.0,-1.5,g));
 rb(.3,.16,.9,.08,P,0,.74,-1.34,g);[-1,1].forEach(s=>bx(.05,.5,.07,dk,s*.14,.58,-1.3,g));wh.push(wheel(.34,.2,0,.34,-1.34,g));
 [-1,1].forEach(s=>{wh.push(wheel(.37,.26,s*.8,.37,.98,g));rb(.36,.14,1.0,.07,C,s*.8,.84,.98,g);});
 const wf=new T.Group();wf.position.set(0,1.42,-.6);wf.rotation.x=-.26;g.add(wf);bx(1.3,.86,.035,glassM,0,.45,0,wf);bx(1.38,.07,.07,dk,0,.9,0,wf);bx(1.38,.07,.07,dk,0,0,0,wf);[-1,1].forEach(s=>bx(.07,.94,.07,dk,s*.67,.45,0,wf));bx(.5,.03,.03,dk,-.15,.2,-.03,wf).rotation.z=.5;
 rb(1.66,.12,2.62,.06,P,0,2.2,.42,g);rb(1.4,.1,2.3,.05,P,0,2.29,.42,g);bx(1.56,.05,2.5,dk,0,2.12,.42,g);
 const vz=rb(1.66,.1,.34,.05,P,0,2.13,-.98,g);vz.rotation.x=.45;
 [[-.72,.1],[.72,.1],[-.72,1.5],[.72,1.5]].forEach(p=>bx(.06,1.12,.06,dk,p[0],1.6,p[1],g));
 [-1,1].forEach(s=>{bx(.05,.05,1.4,ch,s*.72,1.28,.8,g);bx(.04,.2,.1,dk,s*.84,1.78,-.5,g);bx(.14,.03,.03,dk,s*.76,1.7,-.5,g);});
 rb(1.5,.95,.07,.05,P,0,1.66,1.52,g);bx(.82,.36,.03,glassM,0,1.78,1.56,g);
 [-1,1].forEach(s=>{bx(.16,.2,.05,MB('#ff3b30'),s*.6,.72,1.55,g);bx(.16,.08,.05,MB('#ff9d1f'),s*.6,.86,1.55,g);});
 bx(1.5,.09,.12,ch,0,.42,1.58,g);const np=planeTex(tagTex(pick(['WB 04 1234','WB 06 4521','WB 02 7788','WB 19 3090']),'#f4f4f4','#111',22),.52,.2,true);np.position.set(0,.56,1.57);g.add(np);
 rb(1.3,.24,.62,.08,'#7a2e24',0,.98,1.05,g);rb(1.3,.55,.14,.06,'#7a2e24',0,1.32,1.4,g);rb(.5,.2,.46,.07,'#2b2b2e',0,1.0,-.02,g);rb(.5,.4,.1,.05,'#2b2b2e',0,1.25,.24,g);
 bx(.86,.05,.05,dk,0,1.42,-.5,g);[-1,1].forEach(s=>bx(.14,.07,.07,'#444',s*.45,1.42,-.5,g));bx(.05,.4,.05,dk,0,1.22,-.56,g);bx(.16,.2,.12,'#c0392b',.5,1.5,-.42,g);
 const d=sitPerson(pick(['#e8e0c8','#c9b27a','#6a8fb0']));d.position.set(0,.57,.02);d.userData.arms.forEach(a=>a.rotation.x=-1.2);g.add(d);
 const ps=[];[[-.32,1.1],[.32,1.1],[-.32,.6],[.32,.6]].forEach((p,i)=>{const q=sitPerson(pick(PCOL));q.position.set(p[0],.57,p[1]);q.visible=i<(npax||0);g.add(q);ps.push(q);});
 blob(g,1.7,3.3);g.userData={wh,heads:ps,driver:d};return g;}
function buildAuto(){const g=autoModel(paintMat,chassisMat,0);stickerMesh=planeTex(tagTex('টোটো দাদা','#1d7f4a','#fff',34),1.3,.42,true);stickerMesh.position.set(0,.9,1.56);g.add(stickerMesh);return g;}
function buildTrafficAuto(){const c=pick(['#f6c915','#f6c915','#f2b01e','#e8791a']),ch=pick(['#1d7f4a','#26282d','#1f5fa6']);return autoModel(M(c),M(ch),(Math.random()*4)|0);}
function setSticker(i){stickerMesh.material.map=tagTex(STICK[i],'#1d7f4a','#fff',34);stickerMesh.material.needsUpdate=true;}
function setPaint(id){const p=PAINTS.find(a=>a.id===id)||PAINTS[0];paintMat.color.set(p.c);chassisMat.color.set(id==='y'?'#1d7f4a':'#26282d');}
function taxiModel(col,isTaxi){const g=new T.Group();
 rb(1.8,.72,4.2,.22,col,0,.72,0,g);rb(1.6,.3,1.5,.12,col,0,1.14,-1.35,g);rb(1.6,.4,1.1,.12,col,0,1.04,1.55,g);
 rb(1.56,.7,2,.26,col,0,1.5,.2,g);rb(1.6,.46,1.84,.14,glassM,0,1.52,.2,g);rb(1.5,.07,1.92,.04,col,0,1.87,.2,g);
 if(isTaxi){bx(1.84,.09,4.22,'#101010',0,.88,0,g);bx(.5,.2,.3,MB('#fff6c0'),0,2,.2,g);}
 bx(1.9,.14,.2,'#c4c7cc',0,.48,-2.15,g);bx(1.9,.14,.2,'#c4c7cc',0,.48,2.15,g);bx(.9,.28,.05,'#3a3a3a',0,.8,-2.12,g);
 [-1,1].forEach(s=>{const h=new T.Mesh(US,MB('#fff7c2'));h.scale.setScalar(.16);h.position.set(s*.62,.86,-2.1);g.add(h);bx(.4,.14,.05,MB('#ff3b30'),s*.6,.86,2.12,g);bx(.04,.18,.14,'#222',s*.95,1.6,-.6,g);[-1.35,1.35].forEach(z=>wheel(.38,.26,s*.9,.38,z,g));});
 blob(g,1.9,4.4);return g;}
function busModel(c1,c2){const g=new T.Group();
 rb(2.5,2.3,10.4,.28,c1,0,1.75,0,g);rb(2.52,.3,10.42,.1,c2,0,1.0,0,g);rb(2.54,.85,9.6,.14,'#1c2733',0,2.35,0,g);rb(2.3,.1,10.2,.05,c2,0,3,0,g);
 bx(2,.1,5,'#4a4a4a',0,3.12,.8,g);bx(1,.5,1.2,'#7a5a3a',-.4,3.45,1.4,g);bx(.8,.4,1,'#3a6a8a',.5,3.4,-.6,g);
 bx(2.2,1,.06,glassM,0,2.3,-5.22,g);bx(1.6,.3,.05,MB('#ffd23f'),0,3,-5.23,g);
 bx(2.5,.2,.2,'#a0a4aa',0,.55,-5.3,g);bx(2.5,.2,.2,'#a0a4aa',0,.55,5.3,g);
 [-1,1].forEach(s=>{const h=new T.Mesh(US,MB('#fff7c2'));h.scale.setScalar(.2);h.position.set(s*.85,1,-5.25);g.add(h);bx(.3,.2,.05,MB('#ff3b30'),s*.85,1,5.22,g);bx(.06,.5,.3,'#222',s*1.4,2.2,-4.8,g);[-3.3,3.3].forEach(z=>wheel(.5,.4,s*1.2,.5,z,g));});
 const p=person('#e8e0c8');p.scale.setScalar(.85);p.position.set(1.35,.55,-3.9);p.userData.arms[1].rotation.z=-1.6;g.add(p);
 blob(g,2.7,10.8);return g;}
function tramModel(){const g=new T.Group();
 rb(2.6,3,12.4,.3,'#1f5fa6',0,2.1,0,g);rb(2.62,1.4,12.42,.25,'#f3efe1',0,3.1,0,g);rb(2.64,.7,11.8,.1,'#1c2733',0,3.1,0,g);bx(2.64,.12,12.42,'#f2b01e',0,1.9,0,g);
 bx(.08,1.8,.08,'#222',0,4.9,-1,g);const a=bx(.06,2.2,.06,'#222',0,5.3,.3,g);a.rotation.x=.9;bx(2,.08,.08,'#222',0,6.1,1.2,g);
 bx(1.2,.3,.05,MB('#ffd23f'),0,3.8,-6.22,g);[-1,1].forEach(s=>{const h=new T.Mesh(US,MB('#fff7c2'));h.scale.setScalar(.2);h.position.set(s*.8,1.2,-6.25);g.add(h);[-4.5,4.5].forEach(z=>wheel(.45,.3,s*1.1,.45,z,g));});
 bx(2.4,.25,.3,'#555',0,.55,-6.3,g);blob(g,2.8,12.8);return g;}
function rickModel(){const g=new T.Group(),wh=[];
 wh.push(ringWheel(.62,-.82,.65,.9,g),ringWheel(.62,.82,.65,.9,g));
 rb(1.1,.4,1,.1,'#8a2f1c',0,.85,.8,g);rb(1.1,.7,.14,.06,'#8a2f1c',0,1.25,1.3,g);
 const cn=rb(1.3,.1,1.7,.05,'#d5683f',0,1.95,.95,g);cn.rotation.x=.08;bx(.05,1.1,.05,'#6b4b2a',-.6,1.4,.2,g);bx(.05,1.1,.05,'#6b4b2a',.6,1.4,.2,g);
 rb(.06,.5,1.2,.03,'#b84a2e',-.58,1.05,.8,g);rb(.06,.5,1.2,.03,'#b84a2e',.58,1.05,.8,g);
 const sh1=bx(.07,.07,2.4,'#6b4b2a',-.42,.85,-.5,g),sh2=bx(.07,.07,2.4,'#6b4b2a',.42,.85,-.5,g);
 const p=person('#d8d0b8',{skin:'#7a4a2a',pants:'#e8e8e8'});p.position.set(0,0,-1.7);p.rotation.x=.25;g.add(p);
 const q=sitPerson(pick(PCOL));q.position.set(0,.65,.82);q.visible=Math.random()<.6;g.add(q);
 blob(g,2,4.2);g.userData={puller:p,wh};return g;}
function bikeModel(){const g=new T.Group(),wh=[];
 wh.push(ringWheel(.34,0,.38,-.72,g),ringWheel(.34,0,.38,.72,g));
 rb(.3,.35,1,.1,'#c0392b',0,.75,.1,g);rb(.34,.25,.5,.1,'#a82a1e',0,.98,-.2,g);bx(.28,.1,.6,'#222',0,.93,.45,g);bx(.06,.6,.06,'#999',0,.6,-.68,g);bx(.7,.05,.05,'#222',0,1.12,-.55,g);
 const h=new T.Mesh(US,MB('#fff7c2'));h.scale.setScalar(.11);h.position.set(0,1.05,-.82);g.add(h);bx(.08,.08,.5,'#777',.2,.45,.7,g);
 const p=person(pick(PCOL));p.scale.setScalar(.8);p.position.set(0,.4,.2);p.userData.legs.forEach(l=>l.rotation.x=1.1);p.userData.arms.forEach(a=>a.rotation.x=-1.2);
 const hm=new T.Mesh(US,M(pick(['#222','#c0392b','#2c6fbb'])));hm.scale.setScalar(.22);hm.position.set(0,1.62,0);p.add(hm);g.add(p);
 blob(g,.9,2.1);g.userData={wh};return g;}
function cycleModel(){const g=new T.Group(),wh=[];
 wh.push(ringWheel(.36,0,.38,-.62,g,'#222'),ringWheel(.36,0,.38,.62,g,'#222'));
 bx(.04,.04,.9,'#2a2a2a',0,.72,0,g);const d=bx(.04,.04,.9,'#2a2a2a',0,.55,-.1,g);d.rotation.x=.5;bx(.04,.45,.04,'#2a2a2a',0,.6,.3,g);bx(.6,.04,.04,'#222',0,.98,-.55,g);bx(.04,.5,.04,'#222',0,.75,-.55,g);bx(.3,.04,.4,'#444',0,.7,.8,g);
 const p=person(pick(PCOL));p.scale.setScalar(.82);p.position.set(0,.32,.25);p.userData.arms.forEach(a=>a.rotation.x=-1.0);g.add(p);
 if(Math.random()<.4){cy(.14,.5,'#c9ccd2',-.24,.95,.8,g);cy(.14,.5,'#c9ccd2',.24,.95,.8,g);}
 blob(g,.8,2);g.userData={rider:p,wh};return g;}
function cartModel(){const g=new T.Group(),wh=[];
 wh.push(ringWheel(.45,-.85,.5,.3,g,'#3a2a1a'),ringWheel(.45,.85,.5,.3,g,'#3a2a1a'));
 bx(1.5,.15,2.3,'#7a5a3a',0,.8,.2,g);bx(.06,.3,2.3,'#6a4a2a',-.72,1,.2,g);bx(.06,.3,2.3,'#6a4a2a',.72,1,.2,g);
 const cols=pick([['#f2c230','#f7d84a'],['#d6452d','#c0392b'],['#6cbf4a','#4aa564']]);for(let i=0;i<6;i++)bx(.5,.35,.5,cols[i%2],-.5+(i%2)*1,1.05,-.5+((i/2)|0)*.7,g);
 bx(.07,.07,1.8,'#6b4b2a',-.4,.85,-1.4,g);bx(.07,.07,1.8,'#6b4b2a',.4,.85,-1.4,g);
 const p=person(pick(PCOL),{pants:'#e8e8e8'});p.position.set(0,0,-2.2);p.rotation.x=.2;g.add(p);blob(g,1.8,4.4);g.userData={puller:p,wh};return g;}
function buildCow(brown){const g=new T.Group(),c=brown?'#8a5a36':'#f4efe6';rb(.9,.85,1.7,.2,c,0,1,0,g);rb(.45,.5,.55,.12,c,0,1.25,-1.05,g);bx(.3,.2,.1,'#e9a0a0',0,1.1,-1.35,g);bx(.08,.2,.08,'#e8d9c4',-.22,1.6,-1.05,g);bx(.08,.2,.08,'#e8d9c4',.22,1.6,-1.05,g);
 [[-.3,-.6],[.3,-.6],[-.3,.6],[.3,.6]].forEach(p=>bx(.18,.7,.18,c,p[0],.35,p[1],g));if(!brown)bx(.5,.3,.6,'#7a5a40',-.2,1.3,.2,g);bx(.07,.6,.07,c,0,.9,.9,g);blob(g,1,2.4);return g;}
function buildStall(){const g=new T.Group(),cols=[pick(['#d6452d','#2c7be5','#f2b01e','#16a085']),'#fff'];bx(2.4,.9,1.4,'#6b4b2a',0,.45,0,g);
 for(let i=0;i<6;i++)bx(.42,.08,1.9,cols[i%2],-1.05+i*.42,2.1,0,g).rotation.x=.12;
 [[-1.1,-.6],[1.1,-.6],[-1.1,.6],[1.1,.6]].forEach(p=>bx(.08,2.1,.08,'#4a3a2a',p[0],1.05,p[1],g));
 for(let i=0;i<5;i++)bx(.35,.3,.35,pick(['#d6452d','#f2b01e','#2c7be5','#16a085','#8e44ad']),-.9+i*.45,1.05,0,g);
 const v=person(pick(['#e8e0c8','#d6452d','#2c7be5']));v.position.set(0,0,.9);v.rotation.y=Math.PI;g.add(v);blob(g,2.6,2);return g;}
function shelterModel(){const g=new T.Group(),col=pick(['#2c6fbb','#e8791a','#3a8f5a','#7a8a9a']);
 const l=bx(1.95,.05,2.8,col,-.62,.85,0,g);l.rotation.z=.876;const r=bx(1.95,.05,2.8,pick([col,'#cfcfcf']),.62,.85,0,g);r.rotation.z=-.876;bx(.06,.06,3,'#6b4b2a',0,1.6,0,g);
 [-1.3,1.3].forEach(x=>[-1.4,1.4].forEach(z=>cy(.04,1.7,'#6b4b2a',x,.85,z,g)));
 bx(1,.15,1.4,pick(['#c0392b','#8e44ad','#f2b01e']),0,.12,.3,g);bx(.5,.5,.5,'#8a6a3a',-.4,.4,.2,g);bx(.5,.35,.4,'#b8a07a',.5,.3,.5,g);cy(.2,.25,'#555',.5,.15,-.9,g);
 const p=sitPerson(pick(PCOL));p.position.set(0,.3,-1.7);g.add(p);bx(.5,.3,.7,'#8a6a3a',0,.15,-1.7,g);
 blob(g,3,3.2);g.userData={person:p};return g;}
function buildBin(){const g=new T.Group();cy(.4,.95,'#3e7c4a',0,.48,0,g);cy(.43,.1,'#2f5f39',0,1,0,g);return g;}
function buildPax(col){const g=new T.Group(),p=person(col);g.add(p);const ring=new T.Mesh(new T.RingGeometry(.9,1.2,24),new T.MeshBasicMaterial({color:'#ffe36b',side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.3;g.add(ring);
 const bc=new T.Mesh(UC,MB('#ffe36b',.2));bc.scale.set(.6,10,.6);bc.position.y=5;g.add(bc);g.userData={p,ring};return g;}
function buildNote(){const g=new T.Group(),m=planeTex(tagTex('₹২০','#2f9e5e','#fff',46),1.2,.6,true);m.position.y=1.2;m.material.side=T.DoubleSide;g.add(m);const bc=new T.Mesh(UC,MB('#9cffb5',.18));bc.scale.set(.5,6,.5);bc.position.y=3;g.add(bc);g.userData.m=m;return g;}
function buildCNG(){const g=new T.Group();cy(.38,.95,'#2fa45a',0,1.1,0,g);cy(.4,.12,'#fff',0,1.2,0,g);const m=planeTex(tagTex('⚡','#2fa45a','#fff',46),1,.5,true);m.position.y=2.1;m.material.side=T.DoubleSide;g.add(m);const bc=new T.Mesh(UC,MB('#5cf29a',.2));bc.scale.set(.6,8,.6);bc.position.y=4;g.add(bc);g.userData.m=m;return g;}
function buildSweet(){const g=new T.Group();cy(.3,.2,'#c0392b',0,.9,0,g);const s=new T.Mesh(US,M('#fff8e7'));s.scale.setScalar(.34);s.position.y=1.15;g.add(s);const bc=new T.Mesh(UC,MB('#bfefff',.25));bc.scale.set(.6,8,.6);bc.position.y=4;g.add(bc);g.userData.m=s;return g;}
function buildPot(){const g=new T.Group();const m=new T.Mesh(UC,MB('#111317'));m.scale.set(.9,.03,.9);m.position.y=.03;g.add(m);return g;}
function buildPud(){const g=new T.Group();const m=new T.Mesh(UC,new T.MeshBasicMaterial({color:'#6fb7e8',transparent:true,opacity:.7}));m.scale.set(1.7,.03,1.7);m.position.y=.04;g.add(m);return g;}
function crowdPerson(shirt){const g=new T.Group(),sk=pick(CSK),pn=pick(CPT);bx(.3,.8,.26,pn,0,.4,0,g);bx(.5,.66,.3,shirt,0,1.12,0,g);bx(.28,.28,.28,sk,0,1.58,0,g);bx(.3,.08,.3,'#1c1410',0,1.74,0,g);return g;}
function barrModel(w,sd){const g=new T.Group(),n=Math.max(2,Math.round(w/1.5)),st=w/n;
 for(let i=0;i<n;i++){const x=-w/2+st*(i+.5);
  [-1,1].forEach(q=>{bx(.08,1.15,.08,'#4a4a4a',x+q*st*.4,.58,1.1,g);bx(.07,.06,.9,'#4a4a4a',x+q*st*.4,.04,1.1,g);});
  for(let j=0;j<6;j++){const sw=st*.84/6;bx(sw,.2,.07,j%2?'#ffffff':'#ff6a00',x-st*.42+sw*(j+.5),.95,1.1,g);bx(sw,.2,.07,j%2?'#ff6a00':'#ffffff',x-st*.42+sw*(j+.5),.62,1.1,g);}}
 const fx=-sd*w/2;bx(.05,1.9,.05,'#6b4a2f',fx,.95,1.1,g);bx(.5,.34,.04,'#d6201a',fx+sd*.28,1.7,1.1,g);
 bx(w*.8,.5,1.8,'#8b6b3f',0,.25,-.6,g);bx(w*.5,.12,1.2,'#1a1410',0,.52,-.6,g);bx(w*.3,.3,.8,'#b8a27a',w*.2,.65,-.9,g);
 const wk=person('#ff8a1f');wk.position.set(-sd*w*.15,0,-1.6);wk.rotation.y=.4;g.add(wk);
 for(let i=0;i<6;i++){const t=i/5,x=-sd*w/2+sd*w*.36*t,z=2.6+i*1.7;cy(.2,.14,'#ff6a00',x,.08,z,g);const c=new T.Mesh(UC,M('#ff6a00'));c.scale.set(.13,.55,.13);c.position.set(x,.38,z);g.add(c);bx(.3,.06,.3,'#fff',x,.22,z,g).scale.set(.2,.08,.2);}
 return g;}
function stnModel(sd){const g=new T.Group(),G1='#0a8a4a';
 bx(4.4,.18,10,'#b9b6ad',0,.09,0,g);bx(4.8,.3,10.4,'#f2f2f2',0,3.9,0,g);bx(4.9,.12,10.5,G1,0,4.1,0,g);bx(4.9,.4,.2,G1,0,3.85,5.2,g);
 [[-1.9,-4.2],[1.9,-4.2],[-1.9,4.2],[1.9,4.2]].forEach(p=>bx(.22,3.8,.22,'#d8d8d8',p[0],1.95,p[1],g));
 for(const pz of[-2.4,2.4]){const px=-sd*1.1;bx(.9,1.7,.7,'#f5f5f5',px,.98,pz,g);bx(.95,.3,.75,G1,px,1.9,pz,g);bx(.5,.3,.05,'#111',px-sd*.0,1.5,pz+.38,g);bx(.12,.12,.9,'#222',px+sd*.5,1,pz,g);}
 const at=person('#fff');at.position.set(-sd*.2,.18,0);at.rotation.y=sd*Math.PI/2;g.add(at);
 cy(.14,8.5,'#cfcfcf',0,4.25,6.4,g);const sg=planeTex(signTex('⚡ টোটো চার্জিং','#0a8a4a','#fff'),5.2,1.7,true);sg.position.set(0,8.4,6.4);g.add(sg);
 const s2=planeTex(signTex('⚡ চার্জ','#0a8a4a','#fff'),3.6,1.1,true);s2.position.set(-sd*2.45,4.1,0);s2.rotation.y=-sd*Math.PI/2;g.add(s2);
 return g;}
