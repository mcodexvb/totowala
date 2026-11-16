'use strict';
/* world: functions (all lib files load before any run file) */
function roadMat(kind,bad){const k=kind+bad;if(!RM[k]){const t=mkRoadTex(kind,bad);t.wrapS=t.wrapT=T.RepeatWrapping;RM[k]=new T.MeshLambertMaterial({map:t,side:T.DoubleSide});}return RM[k];}
function swMat(z){return swM[z]||(swM[z]=new T.MeshLambertMaterial({map:brickTex,color:z===1?'#9aa0a8':z===3?'#d9b3a3':'#ffffff',side:T.DoubleSide}));}
function gMat(z){return gM[z]||(gM[z]=new T.MeshLambertMaterial({color:GC[z],map:groundTex}));}
function slab(g,mT,mS,o){
 const ux=o.uvx||1,uy=o.uvy||1,zN=o.zN,zF=o.zF;
 const A=[o.xl0,o.yt0,zN],B=[o.xr0,o.yt0,zN],C=[o.xr1,o.yt1,zF],D=[o.xl1,o.yt1,zF];
 const A2=[o.xl0,o.yb0,zN],B2=[o.xr0,o.yb0,zN],C2=[o.xr1,o.yb1,zF],D2=[o.xl1,o.yb1,zF];
 const mesh=(P,U,mat)=>{const ge=new T.BufferGeometry();ge.setAttribute('position',new T.BufferAttribute(new Float32Array(P),3));if(U)ge.setAttribute('uv',new T.BufferAttribute(new Float32Array(U),2));ge.computeVertexNormals();const m=new T.Mesh(ge,mat);m.userData.own=1;g.add(m);return m;};
 const top=mesh([...A,...B,...C,...A,...C,...D],[0,0,ux,0,ux,uy,0,0,ux,uy,0,uy],mT);
 if(mS)mesh([...A,...D,...D2,...A,...D2,...A2,...B,...B2,...C2,...B,...C2,...C],null,mS);
 return top;}
function sideStrip(g,mT,mS,sd,hw0,hw1,wd,yt,yb,zN,zF,ux,uy){const a0=sd*hw0,b0=sd*(hw0+wd),a1=sd*hw1,b1=sd*(hw1+wd);slab(g,mT,mS,{xl0:Math.min(a0,b0),xr0:Math.max(a0,b0),xl1:Math.min(a1,b1),xr1:Math.max(a1,b1),yt0:yt,yt1:yt,yb0:yb,yb1:yb,zN,zF,uvx:ux,uvy:uy});}
function crowd(g,RH,R,zN,zi,nar){const n0=(zi===0||zi===2||zi===4)?17:(zi>=6?7:12),N=Math.round(n0*(nar?1.5:1))*2;
 const mk=()=>{const m=new T.InstancedMesh(UB,crowdMat,N);m.frustumCulled=false;g.add(m);return m;},ML=mk(),MT=mk(),MH=mk();
 const m4=new T.Matrix4(),q=new T.Quaternion(),pos=new T.Vector3(),sc=new T.Vector3(),col=new T.Color(),ax=new T.Vector3(0,1,0);
 for(let i=0;i<N;i++){const sd=i%2?1:-1,x=sd*(RH+.7+R()*3.2),z=zN-R()*CH,h=.88+R()*.26;q.setFromAxisAngle(ax,R()*6.28);
  pos.set(x,JH(-z)?-80:.4*h,z);sc.set(.34,.8*h,.28);m4.compose(pos,q,sc);ML.setMatrixAt(i,m4);ML.setColorAt(i,col.set(CPT[(R()*CPT.length)|0]));
  pos.set(x,JH(-z)?-80:1.14*h,z);sc.set(.52,.68*h,.3);m4.compose(pos,q,sc);MT.setMatrixAt(i,m4);MT.setColorAt(i,col.set(CSH[(R()*CSH.length)|0]));
  pos.set(x,JH(-z)?-80:1.66*h,z);sc.set(.3,.3,.3);m4.compose(pos,q,sc);MH.setMatrixAt(i,m4);MH.setColorAt(i,col.set(CSK[(R()*CSK.length)|0]));}
 [ML,MT,MH].forEach(m=>{m.instanceMatrix.needsUpdate=true;m.instanceColor.needsUpdate=true;});}
function disposeChunk(g){g.traverse(o=>{if(o.userData&&o.userData.own)o.geometry.dispose();if(o.isInstancedMesh)o.dispose();});}
function lamp(g,x,z,sd){cy(.07,6.4,'#3a3d44',x,3.2,z,g);bx(1.3,.08,.08,'#3a3d44',x-sd*.6,6.4,z,g);bx(.5,.16,.35,lampMat,x-sd*1.2,6.3,z,g);}
function tree(g,x,z,s){cy(.22*s,2.2*s,trunkM,x,1.1*s,z,g);const l=new T.Mesh(UI,pick(leafM));l.scale.set(1.9*s,1.8*s,1.9*s);l.position.set(x,3.2*s,z);g.add(l);const l2=new T.Mesh(UI,pick(leafM));l2.scale.set(1.3*s,1.2*s,1.3*s);l2.position.set(x+.3,4.5*s,z-.2);g.add(l2);}
function steel(g,z0,z1,zi){ // Howrah bridge girders
 for(const sd of[-1,1]){bx(.5,.5,CH,'#5b6570',sd*7,9.2,-(z0+CH/2),g);bx(.35,.35,CH,'#6b7480',sd*7,.8,-(z0+CH/2),g);
  for(let c=0;c<CH;c+=10){bx(.4,9,.4,'#59636e',sd*7,4.6,-(z0+c+5),g);const dg=bx(.25,12.4,.25,'#6b7480',sd*7,4.6,-(z0+c+5),g);dg.rotation.x=sd*0.64;const dg2=bx(.25,12.4,.25,'#6b7480',sd*7,4.6,-(z0+c+5),g);dg2.rotation.x=-sd*0.64;}}
 for(let c=0;c<CH;c+=20)bx(14.6,.5,.5,'#5b6570',0,9.4,-(z0+c+10),g);}
function buildChunk(k){
 const g=new T.Group(),D0=k*CH,D1=D0+CH,zi=Math.floor((D0+CH/2)/SEG)%8,Z=ZN[zi];let s=(k*2654435761+7)>>>0;const R=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};
 const zc=-(D0+CH/2),zN=-D0,zF=-D1,hw0=hwAt(D0),hw1=hwAt(D1),RH=(hw0+hw1)/2,e0=elevAt(D0),e1=elevAt(D1),bad=ivl(BAD,D0+CH/2,0)>0?1:0,nar=RH<5.5,fly=Math.max(e0,e1)>.05,hwD=5.4;
 slab(g,roadMat(nar?'n':'w',bad),sideM,{xl0:-hw0,xr0:hw0,xl1:-hw1,xr1:hw1,yt0:0,yt1:0,yb0:-.12,yb1:-.12,zN,zF,uvx:1,uvy:CH/8});
 if(CITY===0&&zi>=3&&zi<=5&&!nar){bx(.14,.03,CH,'#7a7c84',-.8,.03,zc,g);bx(.14,.03,CH,'#7a7c84',.8,.03,zc,g);}
 for(const sd of[-1,1]){sideStrip(g,swMat(zi),swSideM,sd,hw0,hw1,4.2,.24,0,zN,zF,1.5,10);sideStrip(g,curbM,curbM,sd,hw0,hw1,.25,.32,0,zN,zF,1,1);}
 const gy=zi===1?-6:zi===7?-.35:-.15;const gm=new T.Mesh(groundGeo,gMat(zi));gm.rotation.x=-Math.PI/2;gm.position.set(0,gy,zc);g.add(gm);
 if(zi===7)for(const sd of[-1,1])bx(7,.3,CH,'#4f9a4e',sd*(RH+4.2+3.5),-.1,zc,g);
 if(fly){const under=Math.min(e0,e1)>2.5,yb0=under?e0-.9:-.25,yb1=under?e1-.9:-.25;
  slab(g,roadMat('w',bad),sideM,{xl0:-hwD,xr0:hwD,xl1:-hwD,xr1:hwD,yt0:e0+.12,yt1:e1+.12,yb0,yb1,zN,zF,uvx:1,uvy:CH/8});
  for(const sd of[-1,1]){const a=sd>0?hwD:-hwD-.45,b=sd>0?hwD+.45:-hwD;slab(g,parM,parM,{xl0:a,xr0:b,xl1:a,xr1:b,yt0:e0+1.25,yt1:e1+1.25,yb0:e0,yb1:e1,zN,zF});}
  for(const c of[10,30]){const ey=elevAt(D0+c);if(ey>2.2){const h=ey-.95;bx(1.6,h,1.6,'#8f8c84',0,h/2,-(D0+c),g);bx(10.8,.9,1.9,'#8f8c84',0,ey-1.4,-(D0+c),g);}}
  for(const sd of[-1,1])for(let c=8;c<CH;c+=20){const lg=new T.Group();lg.position.y=elevAt(D0+c)+.12;g.add(lg);lamp(lg,sd*(hwD+.3),-(D0+c),sd);}}
const bz=(c)=>-(D0+c);
 if(!fly){for(let c=0;c<CH;c+=4){const Dm=D0+c+2;if(divAt(Dm)){const zz=-Dm;bx(.56,.34,4,'#e2c037',0,.17,zz,g);bx(.58,.35,1,'#1a1a1d',0,.17,zz-1,g);bx(.58,.35,1,'#1a1a1d',0,.17,zz+1,g);if(((Dm/4)|0)%3===0){const b=new T.Mesh(UI,M('#3f8f3a'));b.scale.set(.24,.3,.24);b.position.set(0,.5,zz);g.add(b);}}}
  const jl=JN[zi]||[],sb=Math.floor(D0/SEG)*SEG;for(const j of jl){const Jd=sb+j;if(Jd>=D0&&Jd<D1){const zj=-Jd,hj=hwAt(Jd);for(const sd of[-1,1]){const L=70;bx(L,.5,14,'#3b3d43',sd*(hj+L/2),.09,zj,g);for(let x=hj+7;x<hj+L;x+=6)bx(2.6,.02,.22,'#e8e8e8',sd*x,.35,zj,g);bx(L,.02,.18,'#d8d8d8',sd*(hj+L/2),.35,zj-6.6,g);bx(L,.02,.18,'#d8d8d8',sd*(hj+L/2),.35,zj+6.6,g);}}}}
 if(zi===1)steel(g,D0,D0+CH,zi);
 else if(zi!==6&&zi!==7){
  for(const sd of[-1,1]){let c=R()*4;while(c<CH-6){const w=8+((R()*6)|0),f=3+((R()*(zi===4?9:6))|0),d=10;
    if(R()>.13&&!(JH(D0+c)||JH(D0+c+w)||JH(D0+c+w/2))){const col=pick(Z.pal),lit=(zi===5?R()<.85:R()<.4)?1:0;
     const m=new T.Mesh(bldGeo(w,f,d),bldMat(col,lit));m.position.set(sd*(RH+4.2+d/2),f*1.6,bz(c+w/2));m.castShadow=true;g.add(m);bldDetail(g,sd,sd*(RH+4.2),bz(c+w/2),w,f,R);
     if(R()<.85){const st=Z.shops[(R()*Z.shops.length)|0],bgc=pick(['#c0392b','#1b6b4a','#2c5fbb','#8e3b8f','#d98324','#222']);const sg=planeTex(signTex(st,bgc,'#fff'),Math.min(w-1.5,6.5),1.3);sg.position.set(sd*(RH+4.2-.04),3.3,bz(c+w/2));sg.rotation.y=-sd*Math.PI/2;g.add(sg);}
     if(zi===3){bx(.5,f*3.2,.5,'#f3e3c0',sd*(RH+4.2-.2),f*1.6,bz(c+1),g);bx(.5,f*3.2,.5,'#f3e3c0',sd*(RH+4.2-.2),f*1.6,bz(c+w-1),g);}
     if(zi===4&&R()<.5){const nc=pick(['#ff4f7b','#33d6ff','#ffd23f','#7dff6b']);bx(.15,2.4,1.2,MB(nc),sd*(RH+4.2-.2),7+R()*5,bz(c+w/2),g);}
     if(zi===2||zi===0){}}
    c+=w+(R()<.15?5:.4);}}
 }
 for(let c=10;c<CH;c+=20)if(!JH(D0+c))for(const sd of[-1,1])lamp(g,sd*(RH+.8),bz(c),sd);
 // zone decor
 if(zi===2)for(const sd of[-1,1])for(let c=4;c<CH;c+=8){if(R()<.8){const st=bx(2.4,.9,1.2,'#6b4b2a',sd*(RH+3),.7,bz(c),g);const c1=pick(['#d6452d','#2c7be5','#f2b01e','#16a085']);for(let i=0;i<4;i++)bx(.65,.08,1.6,i%2?c1:'#fff',sd*(RH+3),2.2,bz(c)+(-.9+i*.6)*0,g).position.x=sd*(RH+3)+(-0.9+i*.6)*0;
   for(let i=0;i<4;i++){const a=bx(.7,.08,1.6,i%2?c1:'#fff',sd*(RH+3),2.1,bz(c),g);a.position.z=bz(c)-.9+i*.6;a.scale.set(1.7,.08,.6);a.visible=true;}
   for(let i=0;i<6;i++)bx(.3,.4,.3,pick(['#d6452d','#f2b01e','#2c7be5','#16a085','#8e44ad']),sd*(RH+3)+(-.5+R()),1.35,bz(c)-.9+i*.3,g);
   [-1,1].forEach(q=>[-1,1].forEach(r=>bx(.07,2,.07,'#4a3a2a',sd*(RH+3)+q*1.1,1,bz(c)+r*.6,g)));}}
 if(zi===5)for(let c=6;c<CH;c+=13)for(let i=0;i<9;i++){const t=i/8,x=-RH-.5+t*(2*RH+1),y=7.4-Math.sin(t*Math.PI)*1.1;const b=new T.Mesh(US,MB(strColors[i%3]));b.scale.setScalar(.2);b.position.set(x,y,bz(c));g.add(b);}
 if(zi===6)for(const sd of[-1,1]){for(let c=3;c<CH;c+=R()*6+6)tree(g,sd*(RH+4.2+3+R()*14),bz(c),.9+R()*.6);bx(.4,.9,CH,'#efe9dc',sd*(RH+4.4),.5,zc,g);}
 if(zi===7)for(const sd of[-1,1])for(let c=3;c<CH;c+=R()*5+5)if(!JH(D0+c))tree(g,sd*(RH+4.2+1.5+R()*3),bz(c),.9+R()*.5);
 if(zi===0&&(D0%(8*SEG))<CH)tower(g,-1,bz(14));
 const cyB=Math.floor(D0/(8*SEG))*8*SEG,memD=cyB+6*SEG+140;if(CITY===0&&memD>=D0&&memD<D0+CH)memorial(g,bz(memD-D0));
 for(let z2=0;z2<8;z2++){const gd=cyB+z2*SEG;if(gd>=D0&&gd<D0+CH)gate(g,z2,-gd);}
 if(zi!==1)crowd(g,RH,R,zN,zi,nar);
 if(!fly&&zi!==1&&zi!==6)wires(g,RH,D0,R);
 if(!fly&&(zi===0||zi===2||zi===4||zi===5)&&R()<.45)bunting(g,RH,bz(4+R()*30),R);
 mergeChunk(g);recvAll(g);
 g.userData.k=k;return g;
}
function tower(g,sd,z){bx(10,22,10,'#a8462f',sd*(RH+4.2+8),11,z,g);bx(8,8,8,'#8b3a2b',sd*(RH+4.2+8),26,z,g);const cl=new T.Mesh(new T.CircleGeometry(2.6,20),MB('#f6f0e0'));cl.position.set(sd*(RH+4.2+8)+4.1,26,z);cl.rotation.y=-sd*Math.PI/2;g.add(cl);bx(9,2,9,'#6a2a1f',sd*(RH+4.2+8),31,z,g);}
function memorial(g,z){const X=44;bx(26,10,50,'#f2eee2',X,5,z,g);bx(24,6,46,'#e6e1d2',X,13,z,g);
 for(let i=0;i<8;i++)bx(.5,6,3,'#2b3a4a',X-12.9,4,z-20+i*5.7,g);
 const dr=cy(6.5,6,'#f2eee2',X,19,z,g);const d=new T.Mesh(US,M('#f6f3ea'));d.scale.set(7.5,7.5,7.5);d.position.set(X,22,z);g.add(d);bx(.4,4,.4,'#c9a227',X,30.5,z,g);
 [[-9,-20],[-9,20],[9,-20],[9,20]].forEach(p=>{cy(2.2,6,'#f2eee2',X+p[0],19,z+p[1],g);const s=new T.Mesh(US,M('#f6f3ea'));s.scale.setScalar(2.4);s.position.set(X+p[0],22.5,z+p[1]);g.add(s);});
 bx(3,.6,50,'#d8d2c0',X-14,.3,z,g);}
function gate(g,zi,z){const Z=ZN[zi],pm=planeTex(gateTex(zi),15,3.75,true);pm.position.set(0,8.2,z);pm.material.side=T.DoubleSide;g.add(pm);bx(.6,9,.6,'#2a2d33',-7.4,4.5,z,g);bx(.6,9,.6,'#2a2d33',7.4,4.5,z,g);bx(15.4,.5,.6,Z.c,0,10.3,z,g);}
function syncChunks(D){const k0=Math.floor(D/CH)-1,k1=k0+AHEAD+1;for(const [k,g] of chunks)if(k<k0||k>k1){world.remove(g);disposeChunk(g);chunks.delete(k);}for(let k=Math.max(0,k0);k<=k1;k++)if(!chunks.has(k)){const g=buildChunk(k);world.add(g);chunks.set(k,g);}}
function tempoModel(){const g=new T.Group(),c=pick(['#e9e4d6','#3b7dd8','#f2b01e','#2f9e5e','#d6452d']);
 rb(1.75,1.35,1.5,.22,c,0,1.25,-1.55,g);bx(1.5,.62,.06,glassM,0,1.55,-2.31,g);bx(1.6,.18,.08,'#222',0,.62,-2.32,g);
 [-1,1].forEach(s=>{const h=new T.Mesh(US,MB('#fff7c2'));h.scale.setScalar(.13);h.position.set(s*.62,.85,-2.32);g.add(h);bx(.05,.3,.22,'#222',s*.95,1.6,-2.1,g);});
 bx(1.85,.18,2.9,'#3a3d44',0,.62,.75,g);[-1,1].forEach(s=>bx(.06,.55,2.9,c,s*.92,.98,.75,g));bx(1.85,.55,.06,c,0,.98,2.18,g);
 const load=pick([0,1,2]);
 if(load===0)for(let i=0;i<6;i++)rb(.7,.42,.55,.18,pick(['#d9c79a','#c9b483','#e6d8b0']),(i%2?.38:-.38),.98+Math.floor(i/4)*.4,-.1+(i%3)*.75,g);
 else if(load===1){for(let i=0;i<4;i++)cy(.32,.85,pick(['#2c7be5','#d6452d','#16a085']),(i%2?.42:-.42),1.15,.15+Math.floor(i/2)*1.1,g);}
 else{const t=new T.Mesh(US,M('#2f6e3a'));t.scale.set(.85,.55,1.35);t.position.set(0,1.25,.8);g.add(t);}
 bx(1.75,.12,.05,MB('#ff3b30'),0,.8,2.22,g);bx(1.2,.22,.04,MB('#ffffff'),0,1.32,2.21,g);
 g.userData.wh=[wheel(.36,.28,-.82,.36,-1.5,g),wheel(.36,.28,.82,.36,-1.5,g),wheel(.36,.28,-.82,.36,1.2,g),wheel(.36,.28,.82,.36,1.2,g)];
 const p=sitPerson('#e8e0c8',.7);p.position.set(-.35,.75,-1.6);g.add(p);
 blob(g,1.9,4.6);return g;}
function sigHead(par,x,y,z,arr,arm){const p=new T.Group();p.position.set(x,0,z);par.add(p);cy(.09,y,'#4a5058',0,y/2,0,p);
 const ax=arm||0;if(ax){const b=bx(Math.abs(ax),.12,.12,'#4a5058',ax/2,y-.1,0,p);}
 bx(.5,1.25,.4,'#15171b',ax,y-.75,0,p);bx(.62,1.4,.05,'#f2c230',ax,y-.75,-.2,p);
 const mk=(yy)=>{const l=new T.Mesh(US,SIGO);l.scale.set(.17,.17,.07);l.position.set(ax,y-.75+yy,.21);p.add(l);return l;};arr.push([mk(.38),mk(0),mk(-.38)]);return p;}
function xingModel(hw){const g=new T.Group(),arr=[];
 for(let x=-hw+.5;x<hw-.3;x+=1.05){const s=bx(.6,.03,3.6,MB('#f4f4f0'),x,.035,0,g);}
 bx(2*hw,.03,.3,MB('#f4f4f0'),0,.035,2.6,g);
 sigHead(g,-(hw+.5),4.6,2.4,arr,2.4);sigHead(g,hw+.5,4.6,2.4,arr,-2.4);
 const md=hw>5.4;if(md){bx(.9,.25,1.2,'#d9d4c4',0,.13,-3,g);sigHead(g,0,3,-3,arr);}
 // traffic cop with umbrella podium
 const cop=new T.Group();cop.position.set(md?0:hw-1.1,0,-3.2);g.add(cop);cy(.55,.4,'#e9e4d6',0,.2,0,cop);
 const um=new T.Mesh(new T.ConeGeometry(1.1,.5,8),M('#e64a2e'));um.position.y=3.1;cop.add(um);cy(.04,2.8,'#777',0,1.7,0,cop);
 const p=person('#f4f4f0',{pants:'#f4f4f0'});p.position.y=.4;p.rotation.y=Math.PI;cop.add(p);bx(.34,.12,.34,'#f4f4f0',0,2.2,0,p);
 g.userData={lamps:arr,cop:p};return g;}
function setSig(e,ph){e.mesh.userData.lamps.forEach(l=>{l[0].material=ph==='r'?SIGR:SIGO;l[1].material=ph==='y'?SIGY:SIGO;l[2].material=ph==='g'?SIGG:SIGO;});const a=e.mesh.userData.cop.userData.arms;a[0].rotation.x=ph==='r'?-1.6:0;a[0].rotation.z=0;a[1].rotation.z=ph==='g'?-1.4:0;}
function dogModel(){const g=new T.Group(),c=pick(['#b88a52','#d8b27a','#3a2f28','#e8dcc8']);bx(.32,.32,.8,c,0,.5,0,g);bx(.26,.26,.32,c,0,.72,-.48,g);bx(.12,.1,.16,'#2a2420',0,.68,-.68,g);
 [-1,1].forEach(s=>{bx(.06,.14,.06,c,s*.09,.9,-.44,g);[-.28,.28].forEach(z=>bx(.08,.36,.08,c,s*.11,.18,z,g));});const tl=bx(.06,.06,.35,c,0,.7,.5,g);tl.rotation.x=-.7;g.userData.tail=tl;return g;}
function placeOnc(t,x,z){const e=place(t,x,z),inner=e.mesh;scene.remove(inner);const w=new T.Group();inner.position.set(0,0,0);inner.rotation.y=Math.PI;w.add(inner);w.userData=inner.userData;w.position.set(x,elevAt(-z),z);scene.add(w);e.mesh=w;e.onc=1;e.v=-rnd(6.5,10)*(t==='bus'?.8:1);e.vb=e.v;e.tx=x;return e;}
function pickOnc(nar){const w={taxi:3,car:2.5,bus:nar?0:2.6,lorry:nar?.4:2,tempo:2,auto:2.5,bike:1.6};let t=0;for(const k in w)t+=w[k];let r=Math.random()*t;for(const k in w){r-=w[k];if(r<=0)return k;}return 'car';}
function oncAI(e,dt,REDS,XP){const pz=-G.D,rel=pz-e.z,sp=-e.vb;let cap=sp;
 if(roadKind(-e.z)===0&&rel>8){e.gone=true;return;}
 for(const r of REDS){const gp=r.z-e.z-e.l/2-3;if(gp>-.6&&gp<32)cap=Math.min(cap,Math.max(0,gp*.55));}
 for(const p of XP){if(Math.abs(p.x-e.x)<(e.w+.8)/2+.4){const gp=p.z-e.z-e.l/2;if(gp>-.3&&gp<14)cap=Math.min(cap,Math.max(0,(gp-2)*.6));}}
 for(const o of ents){if(o===e||!o.onc||o.vic||o.fly)continue;if(Math.abs(o.x-e.x)<(o.w+e.w)/2+.2){const gp=o.z-e.z-(o.l+e.l)/2;if(gp>-1&&gp<10)cap=Math.min(cap,Math.max(0,-o.v+(gp-3)*.5));}}
 if(Math.abs(G.x-e.x)<(e.w+1.7)/2+.4&&rel>2&&rel<55){
  if(!e.dodged){e.dodged=1;const L=oncSet(-e.z),hw=hwP(-e.z),alt=L.filter(x=>Math.abs(x-G.x)>(e.w+1.7)/2+.4);
   e.tx=alt.length&&Math.random()<.8?alt.reduce((a,b)=>Math.abs(b-e.x)<Math.abs(a-e.x)?b:a):clamp(e.x+(e.x>=G.x?1.6:-1.6),.9+e.w/2,hw-e.w/2-.1);
   if(rel<48){if(e.type==='bus')A.airhorn(.9);else if(e.type==='tempo')A.mhorn();else A.horn();yell(e);}}
  if(rel<22)cap=Math.min(cap,sp*.45);const gp=rel-e.l/2-1.6;if(gp>-.5&&gp<16)cap=Math.min(cap,Math.max(0,-G.sp*G.ct+(gp-2.5)*.7));}
 e.v+=clamp(-cap-e.v,-3.5*dt,9*dt);
 const dxm=e.tx-e.x,mx=3*dt,st=Math.abs(dxm)<mx?dxm:Math.sign(dxm)*mx;e.x+=st+e.vx*dt;e.lv=lerp(e.lv,st/Math.max(dt,.001),.2);e.mesh.rotation.y=clamp(e.lv*.07,-.3,.3);}
function yell(e,kind){const n=performance.now();if(n-(G.yellT||0)<1600)return;G.yellT=n;let line,lang='bn';if(kind==='ped')line=pick(YP);else if(Math.random()<.3){line=pick(YH);lang='hi';}else line=pick(YB);G.spk=e&&e.mesh?e:null;Vx.speak(line,lang);}
function reqTurn(d){if(G.state!=='play'||G.turning)return;const r=G.jRel;if(r===undefined||r<-6||r>80||!G.jOK)return;if(r<=6){startTurn(d<0?'L':'R');return;}G.turnQ=G.turnQ===d?0:d;A.pax();say(G.turnQ?(d<0?'↰ পরের মোড়ে বাঁয়ে':'↱ পরের মোড়ে ডাইনে'):'সোজা চলো',1);}
function reqU(){if(G.state!=='play'||G.turning||!G.canU)return;if(G.sp>11){say('আগে আস্তে করো, তারপর ঘোরো!',1);A.warn();return;}startTurn('U');}
function startTurn(k,drv){const zi=Math.floor(G.D/SEG)%8,J=JMAP[zi]||[(zi+1)%8,(zi+2)%8];const t=k==='L'?J[0]:k==='R'?J[1]:(G.mode==='fare'?Math.max(0,zi-1):(zi+7)%8);
 G.turning={k,t:0,done:0,tz:t,drv};G.turnQ=0;A.screech();$('wipeA').textContent=k==='L'?'↰':k==='R'?'↱':'⟲';$('wipeT').textContent=ZN[t].bn+'-র পথে';['bTL','bTR','bU','wrong'].forEach(i=>$(i).style.display='none');}
function turnUpd(dt){const q=G.turning;q.t+=dt;const s=q.k==='R'?-1:1,amp=q.k==='U'?Math.PI:Math.PI/2;G.sp=Math.max(q.k==='U'?2:5,G.sp-14*dt);
 if(q.t<.55){if(q.drv){G.tyaw=0;G.x+=G.sp*Math.sin(G.th)*dt;}else{G.tyaw=s*amp*smt(0,.55,q.t);if(q.k!=='U')G.x-=s*2.5*dt;G.D+=G.sp*dt*.4;}$('wipe').style.opacity=smt(.25,.55,q.t);}
 else{if(!q.done){q.done=1;doJump(q.tz,q.k);}G.tyaw=(q.drv?0:s*(q.k==='U'?0:.5))*(1-smt(.55,1.05,q.t));$('wipe').style.opacity=1-smt(.6,1.05,q.t);G.D+=G.sp*dt;G.odo+=G.sp*dt;}
 if(q.t>=1.05){G.turning=null;G.tyaw=0;$('wipe').style.opacity=0;}}
function doJump(t,k){const trR=G.trip?G.trip.dst-G.D:0;if(G.chaseN>0){chaseClear(false);say('গলি দিয়ে কেটে পড়লি! 😎',1);}G.police=null;G.vipOn=false;const cyc=Math.floor(G.D/(8*SEG));const za=cyc*8+t;const nd=za*SEG+30;
 for(const e of ents)rmEnt(e);ents=[];
 G.D=nd;G.nextRow=nd+18;G.nextJ=nextJ(nd+30);G.nextStn=nd+rnd(120,260);G.lastBarr=nd;G.x=G.tx=-1.6;G.side=-1;G.vx=0;G.ev=elevAt(nd);G.hw=hwP(nd);G.mobD=95;G.anger*=.4;G.mobAct=false;G.camSnap=1;G.th=0;G.cth=0;G.steer=0;G.rowLo=nd;
 if(G.trip){G.trip.dst=G.D+Math.max(90,trR);G.trip.dropE=null;}if(G.mode==='fare'&&za>G.zone)arrive(za);else{G.zone=za;banner('<span>'+(k==='U'?'ইউ-টার্ন':'নতুন রাস্তা')+'</span><b>'+ZN[t].bn+'</b><span>'+ZN[t].en+'</span>');}}
function setCity(i){CITY=i;const c=CITIES[i];ZN.forEach((z,k)=>{if(c.z){z.bn=c.z[k][0];z.en=c.z[k][1];z.shops=GSH[k];}else Object.assign(z,ZK[k]);});for(const k in gateC)delete gateC[k];
 $('logo').innerHTML=c.en+'<br>Auto Rush';$('maph').textContent=c.bn+' — কোথা থেকে শুরু?';if(G.startZone===undefined)G.startZone=0;resetGame();G.sp=0;drawMap();}
function tiltEv(e){if(e.gamma==null)return;tiltSeen=true;let v=e.gamma;const o=(screen.orientation&&screen.orientation.angle)||0;if(o===90)v=e.beta;else if(o===270||o===-90)v=-e.beta;tiltG=clamp(v/22,-1,1);}
async function setTilt(on){if(on){try{if(window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission){const r=await DeviceOrientationEvent.requestPermission();if(r!=='granted')on=false;}}catch(e){on=false;}if(!window.DeviceOrientationEvent)on=false;}
 tiltOn=on;tiltG=0;removeEventListener('deviceorientation',tiltEv);if(on){tiltSeen=false;addEventListener('deviceorientation',tiltEv);setTimeout(()=>{if(tiltOn&&!tiltSeen){setTilt(false);$('bTilt').textContent='📱 টিল্ট সেন্সর পাওয়া গেল না';}},1800);}
 $('bTilt').textContent='📱 টিল্ট স্টিয়ারিং: '+(on?'চালু':'বন্ধ');$('bTilt').classList.toggle('sel',on);}
function playClip(text){const b64=VCLIP[text];if(!b64||!A.ctx)return false;const go=buf=>{try{if(vcur){try{vcur.stop();}catch(e){}}const s=A.ctx.createBufferSource(),g=A.ctx.createGain();s.buffer=buf;g.gain.value=1.5;s.connect(g);g.connect(A.master);s.start();vcur=s;}catch(e){}};
 if(vbuf[text]){go(vbuf[text]);return true;}try{const bin=atob(b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);A.ctx.decodeAudioData(u.buffer,buf=>{vbuf[text]=buf;go(buf);},()=>{});}catch(e){return false;}return true;}
function mk(type,col,w,sd){switch(type){case 'taxi':return taxiModel('#f4c20d',1);case 'wrong':{const m=taxiModel('#f4c20d',1);m.rotation.y=Math.PI;const w2=new T.Group();w2.add(m);return w2;}
 case 'car':return taxiModel(pick(['#e8e8ea','#c0392b','#2c6fbb','#3a3d44','#6c8d5a']),0);case 'bus':{const c=pick([['#1d5fa8','#e8eef5'],['#c63d2f','#ffd23f'],['#2f9e5e','#f3f3f3'],['#e8791a','#fff1c9']]);return busModel(c[0],c[1]);}
 case 'tram':return tramModel();case 'rick':return rickModel();case 'bike':return bikeModel();case 'cycle':return cycleModel();case 'auto':return buildTrafficAuto();case 'cart':return cartModel();
 case 'cow':return buildCow(Math.random()<.4);case 'stall':return buildStall();case 'shelter':return shelterModel();case 'bin':return buildBin();
 case 'pot':return buildPot();case 'pud':return buildPud();case 'pax':return buildPax(col);case 'note':return buildNote();case 'cng':return buildCNG();case 'sweet':return buildSweet();
 case 'barr':return barrModel(w,sd);case 'lorry':return lorryModel();case 'vip':return vipModel();case 'pbike':return pbikeModel();case 'mama':return mamaModel(sd);case 'drop':return dropModel(sd);case 'sbk':return sbkModel(w);case 'tempo':return tempoModel();case 'xing':return xingModel(w);case 'dog':return dogModel();case 'stn':return stnModel(sd);
 case 'ped':return person(pick(PCOL));case 'walker':return crowdPerson(pick(PCOL));}}
function place(type,x,z,w,sd){const d=DEFS[type],e={type,d,x,z,w:w||d.w,l:d.l,v:d.v[0]+Math.random()*(d.v[1]-d.v[0]),vx:0,t:Math.random()*6,hit:false,tx:x,lcT:rnd(.5,3),chk:rnd(0,.3),lv:0,yo:0,h:0,sd:sd||0,col:pick(['#d6452d','#2c7be5','#f2b01e','#8e44ad','#16a085'])};
 e.mesh=mk(type,e.col,e.w,sd);e.mesh.position.set(x,elevAt(-z),z);scene.add(e.mesh);
 if(type==='ped'){const dir=x<0?1:-1;e.vx=dir*rnd(1.6,2.6);e.mesh.rotation.y=dir*Math.PI/2;e.hand=Math.random()<.4;e.dith=Math.random()<.35?rnd(.25,.75):0;}
 if(type==='cow'){e.vx=pick([-1,1])*rnd(0,.5);}
 if(d.lethal){const r=new T.Mesh(RINGG,ringM);r.rotation.x=-Math.PI/2;r.scale.set(e.w*.95,e.l*.66,1);r.position.y=.07;e.mesh.add(r);}
 if(d.b&&renderer.shadowMap.enabled)castAll(e.mesh);
 e.vb=e.v;ents.push(e);return e;}
function rmEnt(e){scene.remove(e.mesh);}
function weights(zi,fly,nar,bad){const ch=G.mode==='chaos',f=G.fuel<35?3:1;const w=ch?{lorry:2.4,pax:1.2,taxi:4,car:3,bus:3.8,tempo:2.6,auto:4,bike:3,cycle:3,rick:3,cart:1.5,cow:.8,ped:2.6,stall:3,shelter:2.5,bin:2,pot:1,pud:1,cng:.4*f,tram:(CITY===0&&zi>=3&&zi<=5)?2:0}
 :{lorry:2,taxi:3.5,car:2.5,bus:3.8,tempo:2.6,auto:2.5,bike:1.8,cycle:2,rick:1.8,cart:1,cow:[0,2,3].includes(zi)?1.8:.8,ped:3.4,pot:1.3,pud:(zi===3?2.6:.9),pax:2.2,note:1.4,sweet:.3,cng:.4*f,tram:(CITY===0&&zi>=3&&zi<=5)?2:0};
 if(zi===1){w.cow=0;w.stall=0;w.shelter=0;}
 if(fly){['cow','stall','shelter','bin','ped','pax','cart','sweet','pud','rick','cycle'].forEach(k=>{if(w[k])w[k]=0;});}
 if(nar){w.bus=0;w.tram=0;w.lorry*=.3;if(w.tempo)w.tempo*=1.2;if(w.cart)w.cart*=1.8;if(w.rick)w.rick*=1.6;if(w.cycle)w.cycle*=1.5;if(w.stall)w.stall*=1.4;}
 if(bad){w.pot=(w.pot||0)*2.8;if(w.pud)w.pud*=1.8;}
 return w;}
function pickType(zi,fly,nar,bad){const w=weights(zi,fly,nar,bad);let t=0;for(const k in w)t+=w[k];let r=Math.random()*t;for(const k in w){r-=w[k];if(r<=0)return k;}return 'taxi';}
function spawnRow(dd,bk){
 const m=G.odo+200,zi=Math.floor(dd/SEG)%8,z=-dd,ch=G.mode==='chaos',RK=roadKind(dd),L=fwdSet(dd),nL=L.length,hw=hwP(dd),fly=elevAt(dd)>.6||elevAt(dd+25)>.6,nar=hw<5.1&&!fly,bad=ivl(BAD,dd,0)>0;
 let k=1+(Math.random()<Math.min(.7,m/1800)?1:0);if(m>2000&&Math.random()<.25)k=3;if(ch&&Math.random()<.3)k=Math.min(3,k+1);if(nar)k=Math.min(k,2);
 const lanes=[...Array(nL).keys()].sort(()=>Math.random()-.5);let used=0;const taken=[];
 if(!bk&&!fly&&zi!==1&&m>180&&dd-G.lastBarr>110&&Math.random()<(.05+(nar?.04:0)+(bad?.02:0)+(ch?.02:0))){const sd=RK?-1:(Math.random()<.5?-1:1),kk=!RK&&nL>3&&Math.random()<.5?2:1,span=kk*2*hw/laneSet(dd).length,cx=sd*(hw-span/2);place('barr',cx,z,span-.2,sd);G.lastBarr=dd;for(let i=0;i<nL;i++)if(Math.abs(L[i]-cx)<span/2+.4)taken.push(i);}
 if(!bk&&!fly&&ch&&zi!==1&&dd>=(G.nextMama||0)){const sd=RK?-1:(Math.random()<.5?-1:1);place('mama',sd*(hw-.35),z-3,3.2,sd);G.nextMama=dd+rnd(260,400);}
 if(!fly&&dd-(G.lastSbk||0)>130&&Math.random()<.09&&nearJ(dd)>20){place('sbk',0,z,hw);G.lastSbk=dd;}
 if(!fly&&Math.random()<.18){const sd=Math.random()<.5?-1:1;const d=place('dog',sd*(hw+rnd(.6,1.6)),z-rnd(0,20));d.mesh.rotation.y=sd*Math.PI/2;}
 if(!bk&&!fly&&zi!==1&&dd>=G.nextStn){G.stnSide=RK?-1:-G.stnSide;place('stn',G.stnSide*(hw+2.3),z-4,4.2,G.stnSide);G.nextStn=dd+(G.fuel<35?rnd(230,330):rnd(420,620));}
 for(let i=0;i<nL&&used<k;i++){const ln=lanes[i];let t=pickType(zi,fly,nar,bad);
  if(t==='tram'&&RK){if(taken.includes(nL-1))continue;place('tram',L[nL-1],z);taken.push(nL-1);used++;A.bell();continue;}
  if(t==='tram'){if(taken.length||nL<4)continue;place('tram',0,z);used+=2;taken.push(1,2);A.bell();continue;}
  if(DEFS[t].side){if(fly)continue;const sd=Math.random()<.5?-1:1;place(t,sd*(hw+(t==='shelter'?2.2:1.8)-(nar&&t==='stall'&&Math.random()<.4?2.3:0)),z);continue;}
  if(taken.includes(ln))continue;
  if(t==='pax'){place('pax',(RK||Math.random()<.5?-1:1)*(hw+.6),z);continue;}
  if(t==='ped'){const sd=Math.random()<.5?-1:1,n=1+((Math.random()*2.3)|0);for(let q=0;q<n;q++)place('ped',sd*(hw+2.6+q*.5),z-q*1.4);used++;continue;}
  place(t,L[ln]+rnd(-.3,.3),z);taken.push(ln);if(t==='cycle'&&Math.random()<.5)A.tring();if(DEFS[t].b)used++;}
 if(!fly){const nw=ch?3+((Math.random()*5)|0):2+((Math.random()*4)|0);for(let i=0;i<nw;i++){const sd=Math.random()<.5?-1:1,onRoad=nar&&Math.random()<.4,e=place('walker',sd*(onRoad?hw-rnd(.1,.9):hw+rnd(.8,3.8)),z-rnd(0,24));if(Math.random()<.5)e.v=-e.v;}}
 if(RK&&!fly){const O=oncSet(dd);for(const x of O)if(Math.random()<Math.min(.95,(O.length<2?(ch?.8:.7):(ch?.6:.5))*(TRAF===0?.6:TRAF===2?1.3:1)))placeOnc(pickOnc(nar),x+rnd(-.2,.2),z-rnd(0,10));}
 if(!bk&&!RK&&m>250&&Math.random()<Math.min(.16,.05+m/20000)){const free=[...Array(nL).keys()].filter(l=>!taken.includes(l));if(free.length>1){const e=place('wrong',L[pick(free)],z-90);e.warn=true;}}
}
function laneFree(e,x){const chk=(o)=>{if(Math.abs(o.x-x)>=(o.w+e.w)/2+.35)return true;const dz=e.z-o.z,sl=(e.l+o.l)/2;if(o.type==='wrong'||o.onc)return!(dz>-6&&dz<75);return!(dz>-(sl+5)&&dz<sl+11);};
 for(const o of ents){if(o===e||o.fly||o.gone||!o.d.b||(o.d.side&&o.type!=='stall'))continue;if(!chk(o))return false;}
 return chk({x:G.x,z:-G.D,w:1.7,l:3.4,type:'player'});}
function aiLane(e,rnd1){const L=fwdSet(-e.z),hw=hwP(-e.z);let ci=0,bd=99;L.forEach((x,i)=>{const d=Math.abs(x-e.tx);if(d<bd){bd=d;ci=i;}});
 let need=0;const pz=-G.D;
 for(const o of ents){if(o===e||o.fly||o.gone||!o.d.b||(o.d.side&&o.type!=='stall'))continue;if(Math.abs(o.x-e.tx)>=(o.w+e.w)/2+.4)continue;const g=e.z-o.z-(o.l+e.l)/2;if(g>-.5&&g<(o.bar||o.d.solid?28:15)&&(o.bar||o.d.solid||o.v<e.v-.4)){need=1;break;}}
 if(!need){const gp=pz-e.z-(e.l+3.4)/2;if(gp>-1&&gp<13&&Math.abs(e.x-G.x)<(e.w+1.7)/2+.3&&G.sp*G.ct>e.v+1.5)need=2;}
 if(!need){const lat=Math.abs(e.x-G.x)<(e.w+1.7)/2+.3,gq=e.z-pz-(e.l+3.4)/2;if(lat&&gq>-.5&&gq<(G.ct<0?50:15)&&G.sp*G.ct<e.v-.4)need=G.ct<-.3?2:1;}
 if(need||rnd1){const opts=[ci-1,ci+1].filter(i=>i>=0&&i<L.length&&laneFree(e,L[i]));if(opts.length){e.tx=L[pick(opts)];e.cool=rnd(e.d.lr[0],e.d.lr[1]);if(need===2&&-e.z-G.D<45&&Math.random()<.5){if(e.type==='bus')A.airhorn(.8);else if(e.type==='tempo')A.mhorn();else A.pom();if(Math.random()<.45)yell(e);}return;}}
 if(Math.abs(e.tx-L[ci])>.05)e.tx=L[ci];e.tx=clamp(e.tx,-(hw-e.w/2-.2),roadKind(-e.z)?-(.2+e.w/2):hw-e.w/2-.2);}
function burst(x,y,z,n,sp){for(let i=0;i<n;i++){const j=pI++%NP;pp[j*3]=x;pp[j*3+1]=y+elevAt(-z);pp[j*3+2]=z;pv[j*3]=rnd(-1,1)*sp;pv[j*3+1]=rnd(.3,1.4)*sp;pv[j*3+2]=rnd(-1,1)*sp;pl[j]=rnd(.4,.9);}}
function updPts(dt){for(let j=0;j<NP;j++){if(pl[j]>0){pl[j]-=dt;pp[j*3]+=pv[j*3]*dt;pp[j*3+1]+=pv[j*3+1]*dt;pp[j*3+2]+=pv[j*3+2]*dt;pv[j*3+1]-=18*dt;if(pl[j]<=0)pp[j*3+1]=-999;}}pg.attributes.position.needsUpdate=true;}
function resetGame(){for(const e of ents)rmEnt(e);ents=[];for(const [k,g] of chunks){world.remove(g);disposeChunk(g);}chunks.clear();
 Object.assign(G,{D:BASE+G.startZone*SEG+8,x:-1.6,tx:-1.6,turning:null,tyaw:0,th:0,cth:0,steer:0,yr:0,ct:1,rowLo:0,turnQ:0,side:-1,odo:0,nextJ:0,vx:0,sp:0,fuel:100,lives:3,inv:0,shield:0,score:0,pax:0,carried:0,stops:0,zone:32+G.startZone,t:0,shake:0,anger:0,mobD:90,mobAct:false,combo:0,comboT:0,bombCd:0,slow:0,won:false,gotWin:false,smashN:0,over:false,reason:'',pocketGain:0,lowSaid:false,vicN:0,rough:0,hw:6.4,ev:0,lastBarr:-999,atStn:false,fillT:0,fillCost:0,fullSaid:0,roughSay:0,roughT:0,nextX:G.startZone*SEG+150,ambT:2,fines:0});
 G.nextStn=G.D+rnd(160,260);G.stnSide=Math.random()<.5?-1:1;G.nextRow=G.D+55;player.userData.heads.forEach(h=>h.visible=false);
 Object.assign(G,{trip:null,cling:0,heat:0,chaseOn:false,chaseN:0,chaseT:0,beatT:0,bribes:0,vipOn:false,nextVip:450,nextMama:G.D+120,lastSbk:G.D,jy:0,jv:0,maxCombo:0,police:null,runT:0,escapes:0,lethalE:null,flT:0});
 for(const c of CHP){c.on=false;c.m.visible=false;}clearBubs();['pubchip','shakechip','mamachip','vipchip','polchip','tripchip'].forEach(i=>{const el=$(i);if(el)el.style.display='none';});}
function say(txt,pri){const n=performance.now();if(n-lastSay<(pri?1200:3500))return;lastSay=n;const t=$('toast');t.textContent=txt;t.classList.add('show');clearTimeout(toastTO);toastTO=setTimeout(()=>t.classList.remove('show'),1500);}
function pop(txt){const p=$('pop');p.textContent=txt;p.classList.remove('go');void p.offsetWidth;p.classList.add('go');}
function banner(h){const s=$('stop');s.innerHTML=h;s.classList.add('show');clearTimeout(stopTO);stopTO=setTimeout(()=>s.classList.remove('show'),1500);}
function setT(id,v,html){if(cache[id]!==v){cache[id]=v;html?$(id).innerHTML=v:$(id).textContent=v;}}
function hud(){const ch=G.mode==='chaos';setT('score','₹'+bn(G.score));setT('pocket','পকেট ₹'+bn(SAVE.pocket));
 setT('slab',ch?'জাতীয় ক্ষতি':'আজকের ভাড়া');
 setT('combo',ch&&G.combo>=2?'×'+(1+Math.floor(G.combo/2))+' কম্বো!':'');
 setT('hearts','♥'.repeat(Math.max(0,G.lives))+'<span style="opacity:.25">'+'♥'.repeat(3-Math.max(0,G.lives))+'</span>'+(ch?'':' <span style="font-size:16px;color:#fff">'+'🧑'.repeat(G.pax)+'</span>'),1);
 $('fuel').firstChild.style.width=clamp(G.fuel,0,100)+'%';setT('fuelt','⚡'+bn(G.fuel)+'%');
 
 const nz=(G.zone+1)*SEG-G.D;setT('nxt',(G.zone>=7&&G.mode==='fare'?'':'📍 ')+ZN[(G.zone+1)%8].bn+' · '+bn(Math.max(0,nz))+' মি');}
function drawMini(){const c=mini,S=232;c.clearRect(0,0,S,S);c.save();c.beginPath();c.arc(S/2,S/2,S/2,0,7);c.clip();c.fillStyle='#14171e';c.fillRect(0,0,S,S);
 const px=S/2,py=S*.68,k=2.9,fx=18,ahead=75; // metres->px
 const X=x=>px+(x-G.x)*fx*.55*1.0,Zy=z=>py-((-z)-G.D)*k;
 const hw=G.hw;c.fillStyle='#3a3d46';c.fillRect(X(-hw),0,2*hw*fx*.55,S);c.fillStyle=G.ev>.5?'#262930':'#55584f';c.fillRect(X(-hw-4.2),0,4.2*fx*.55,S);c.fillRect(X(hw),0,4.2*fx*.55,S);
 c.strokeStyle='#ffd23f';c.lineWidth=2;c.setLineDash([8,8]);c.beginPath();c.moveTo(X(0),0);c.lineTo(X(0),S);c.stroke();c.setLineDash([]);
 const dot=(e,col,r)=>{const y=Zy(e.z);if(y<-10||y>S+10)return;c.fillStyle=col;c.beginPath();c.arc(X(e.x),y,r,0,7);c.fill();};
 for(const e of ents){const t=e.type;if(t==='stn'){const y=Zy(e.z);c.fillStyle='#16c26a';c.fillRect(X(e.x)-9,y-16,18,32);c.fillStyle='#fff';c.font='700 14px sans-serif';c.fillText('⛽',X(e.x)-8,y+5);continue;}if(t==='mama'){const y=Zy(e.z);c.fillStyle='#ff4fa0';c.fillRect(X(e.x)-10,y-20,20,40);continue;}if(t==='drop'){const y=Zy(e.z);c.fillStyle='#20d46a';c.fillRect(X(e.x)-10,y-18,20,36);continue;}if(t==='vip'){dot(e,Math.floor(G.t*6)%2?'#ff2020':'#2255ff',11);continue;}if(e.d.deco)continue;if(t==='pax')dot(e,'#5cf29a',8);else if(t==='cng'||t==='sweet'||t==='note')dot(e,'#ffd23f',6);else if(e.d.b&&!e.fly){c.fillStyle=t==='wrong'?'#ff3b30':'#ff9a3c';const y=Zy(e.z);if(y>-20&&y<S+20)c.fillRect(X(e.x)-e.w*3.6,y-e.l*1.3,e.w*7.2,e.l*2.6);}}
 for(const q of CHP)if(q.on&&q.st==='run'){c.fillStyle='#ff3b30';c.beginPath();c.arc(X(q.x),Zy(-q.D),5,0,7);c.fill();}
 if(G.mode==='chaos'&&G.mobAct){const y=py+G.mobD*k;c.fillStyle='#ff3b30';c.beginPath();c.arc(px,Math.min(y,S-6),10,0,7);c.fill();}
 c.fillStyle='#ff6fa8';c.beginPath();c.moveTo(px,py-14);c.lineTo(px+9,py+9);c.lineTo(px,py+4);c.lineTo(px-9,py+9);c.closePath();c.fill();c.restore();}
function honk(){if(G.state!=='play'||hornCd>0)return;hornCd=.32;A.init();A.horn();G.hornT=.3;let any=false;
 for(const e of ents){if((e.type==='ped'||e.type==='cow'||e.type==='bike'||e.type==='rick'||e.type==='walker')&&!e.fly&&e.z<-(G.D-0)+0&&Math.abs(-e.z-G.D)<45&&-e.z>G.D&&Math.abs(e.x-G.x)<5){e.vx=(e.x<G.x?-1:1)*(e.type==='ped'?4:3);if(e.d.lc){e.tx=clamp(e.x+Math.sign(e.vx)*2.2,-G.hw+.8,G.hw-.8);e.vx=0;}any=true;if(e.type==='cow'&&!e.mooed){e.mooed=1;A.moo();say(pick(COWL));}}}
 if(any&&Math.random()<.35)setTimeout(()=>yell(),700);
 if(!any&&Math.random()<.3)say(pick(['পাঁ পাঁ!','সাইড দিন দাদা!','ও দাদা, সরুন!']));}
function bomb(){if(G.state!=='play'||G.mode!=='chaos'||G.bombCd>0)return;G.bombCd=10;A.init();A.bomb();G.shake=1.2;pop('বুম!');spawnCh(1,G.D,G.x);
 for(const e of ents){if(e.fly||!e.d.b)continue;const rel=-e.z-G.D;if(rel<0||rel>34||Math.abs(e.x-G.x)>10)continue;if(e.d.heavy||e.d.solid||e.d.person){e.vx=(e.x<G.x?-1:1)*4;}else smashEnt(e,true);}}
function knock(e){if(Math.random()<.5)A.slide();const dir=e.x>=G.x?1:-1;e.fly=true;e.h=0;e.ft=2.2;e.vel={x:dir*rnd(3,9),y:rnd(7,13),z:-(G.sp*.7+rnd(5,12))};e.spin={x:rnd(-6,6),y:rnd(-4,4),z:rnd(-6,6)};A.whistle();}
function smashEnt(e,viaBomb){const d=e.d;knock(e);G.comboT=2.5;G.combo++;const mult=1+Math.floor(G.combo/2),val=Math.round(d.val*mult*(.7+clamp(G.sp,0,25)/25)/50)*50;G.score+=val;G.anger=Math.min(100,G.anger+d.val/200);G.smashN++;
 burst(e.x,1.2,e.z,18,9);A.smash();A.clip(.3);G.maxCombo=Math.max(G.maxCombo||0,G.combo);G.smashLast=e.type;
 if(!viaBomb){G.sp*=d.sl;G.shake=Math.max(G.shake,5+d.val/1500);A.boing();pop('+₹'+bn(val)+' '+(LBL[e.type]||pick(SMASH)));if(Math.random()<.4)vox('smash');tripBump();}
 if(G.mode==='chaos'){taskInc('hit',1);spawnCh(e.type==='stall'||e.type==='shelter'||e.type==='pbike'?2:(Math.random()<.6?1:0),-e.z,e.x);if(e.type==='stall')flash('stall');if(e.type==='pbike')policeChase();}}
function hurt(e){tripBump();if(G.shield>0){A.bump();burst(e.x,1,e.z,10,6);e.hit=true;G.sp*=.85;return;}
 if(G.inv>0){e.hit=true;return;}e.hit=true;G.lives--;G.inv=1.8;G.shake=8;G.sp*=.4;G.tx=clamp(G.tx+(G.x>=e.x?1:-1)*2.4,-6,6);A.crash();A.dhoom();burst(G.x,1,-G.D,16,8);vox('hit',1);
 if(G.mode==='chaos')G.anger=Math.min(100,G.anger+6);e.vx=(e.x>G.x?1:-1)*(e.d.heavy?1.5:4);if(G.lives<=0)endGame('crash');}
function puff(x,y,z){const p=puffs.find(p=>p.t<=0);if(!p)return;p.t=1.2;p.m.visible=true;p.m.position.set(x+rnd(-.5,.5),y,z+rnd(-.5,.5));p.m.scale.setScalar(.35);}
function updPuffs(dt){for(const p of puffs){if(p.t<=0)continue;p.t-=dt;p.m.position.y+=1.3*dt;p.m.scale.addScalar(dt*1.1);p.m.material.opacity=Math.max(0,.55*p.t/1.2);if(p.t<=0)p.m.visible=false;}}
function victimPerson(e){const dir=e.x>=G.x?1:-1;e.hit=true;e.down=true;e.dT=0;e.v=0;e.vx=dir*rnd(3,5);e.vz=-G.sp*.25;G.vicN++;A.bump();A.tone(170,.28,'square',.16,70);burst(e.x,1,e.z,8,4);{const ln=pick(OW);G.spk=e;Vx.speak(ln,'bn');}
 tripBump();if(G.mode==='chaos'){const mult=1+Math.floor(G.combo/2);G.combo++;G.comboT=2.5;G.score+=800*mult;G.sp*=.88;G.shake=Math.max(G.shake,4);pop('+₹'+bn(800*mult)+' পথচারী কুপোকাত!');spawnCh(3,-e.z,e.x);flash('ped');taskInc('hit',1);}else{G.score=Math.max(0,G.score-100);G.sp*=.8;G.shake=Math.max(G.shake,4);A.police();yell(e,'ped');setTimeout(()=>say('পথচারী আহত! জরিমানা −₹১০০',1),1300);}}
function victimCar(e){A.vboom();const dir=e.x>=G.x?1:-1;e.vic=1;e.vx=dir*rnd(3,6);e.rot=dir*rnd(1.5,3.2);e.v*=.4;e.smoke=3;G.vicN++;burst(e.x,1.2,e.z,14,7);A.smash();e.mesh.scale.set(1,.9,1);
 if(G.mode==='chaos'){const mult=1+Math.floor(G.combo/2);G.combo++;G.comboT=2.5;}}
function collect(e){e.gone=true;
 if(e.type==='pax'){if(G.trip){e.gone=false;if(!e.fullS){e.fullS=1;say('আগে এঁকে নামাও, তারপর নতুন যাত্রী',1);}return;}if(Math.abs(G.sp)>6.5){e.gone=false;if(!e.slowS){e.slowS=1;say('আস্তে হও, যাত্রী উঠবে ✋',1);}return;}startTrip(e);}
 else if(e.type==='note'){G.score+=20;A.coin();burst(G.x,1.5,-G.D,8,5);}
 else if(e.type==='cng'){G.fuel=Math.min(100,G.fuel+35);A.sweet();say('চার্জ হল! ⚡');}
 else if(e.type==='sweet'){G.shield=6;A.sweet();say('রসগোল্লা! শিল্ড চালু 🍮',1);}}
function arrive(z){G.zone=z;G.stops++;const info=ZN[z%8];let fare=0;
 A.stop();banner('<span>'+(G.mode==='fare'?'স্টপ '+bn(G.stops):'রাশ আওয়ার')+'</span><b>'+info.bn+'</b><span>'+info.en+'</span>'+(fare?'<i>ভাড়া +₹'+bn(fare)+'</i>':''));if(fare)vox('drop',1);
}
function endGame(reason){if(G.state!=='play')return;G.reason=reason;G.state='over';G.snap=true;for(const k in keys)keys[k]=0;A.eng(0,false);if(reason==='crash'||reason==='caught'||reason==='fuel'||reason==='bus'||reason==='police')A.sad();else A.stop();
 const key=G.mode==='chaos'?'dmg':'fare';if(G.score>SAVE.best[key])SAVE.best[key]=Math.floor(G.score);G.pocketGain=Math.floor(G.mode==='chaos'?G.score*.02:G.score*.5);SAVE.pocket+=G.pocketGain;persist();
 $('hud').style.display='none';$('ctl').style.display='none';$('ticker').style.display='none';$('toast').classList.remove('show');['pubchip','shakechip','mamachip','vipchip','polchip','tripchip'].forEach(i=>$(i).style.display='none');persist();}
function showNews(snapUrl){const ch=G.mode==='chaos',r=G.reason,cups=Math.floor(G.score/10);
 const HL={bus:'বাসের সঙ্গে “হালকা ঘষা”, অটো এখন পাঁপড়',police:'প্রোটোকল ভেঙে ভিআইপি কনভয়ে ধাক্কা, অটোচালক পুলিশের জিম্মায়',caught:ZN[G.zone%8].bn+'-এ তুলকালাম: উত্তেজিত জনতার হাতে অটো ধোলাই, ভিডিও ভাইরাল',crash:'ধাক্কার পর ধাক্কা: অটোদাদা আজ ছুটিতে',fuel:'মাঝরাস্তায় ব্যাটারি শেষ, টোটো ঠেলে নিয়ে গেলেন যাত্রীরাই',win:'হাওড়া থেকে সরোবর: নির্বিঘ্নে পৌঁছলেন অটোদাদা'}[r];
 $('ndate').textContent=new Date().toLocaleDateString('bn-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});$('nhl').textContent=(ch&&G.score<1&&r!=='win')?'অটো নামল, কিছুই ভাঙল না, পাঠকরা হতাশ':HL;$('nimg').src=snapUrl||'';
 $('nbur').textContent=r==='win'?'জয়!':r==='fuel'?'ফুস!':pick(SMASH);$('ntag').innerHTML=(ch?'জাতীয় ক্ষতি':'আজকের ভাড়া')+'<b>₹'+bn(G.score)+'</b>';
 {const IT=[['ভাঁড় চা',10],['মেট্রোর টোকেন',20],['কাঠি রোল',60],['মোগলাই পরোটা',90],['কলেজ স্ট্রিটের পুরনো বই',150],['বিরিয়ানির প্লেট',250],['ময়দানে ফুটবল ম্যাচের টিকিট',400],['হলুদ ট্যাক্সির নতুন হর্ন',900]].filter(i=>G.score/i[1]>=1);const it=IT.length?pick(IT.slice(-4)):['ভাঁড় চা',10];
 $('ncmp').innerHTML='<b>এই টাকায় হতো</b> '+bn(Math.floor(Math.max(G.score,10)/it[1]))+'টা '+it[0];
 const area=ZN[G.zone%8].bn;const Q={caught:[['কে প্রথম মেরেছে, সেটা নিয়ে এখনও তর্ক চলছে।','এক প্রত্যক্ষদর্শী'],['আমি মারিনি, শুধু ভিডিও করছিলাম।','এক পথচারী']],bus:[['ব্রেক? সেটা আবার কী জিনিস?','বাসচালক'],['দাদা, পেছনে চলুন, পেছন ফাঁকা!','বাসের কন্ডাক্টর']],police:[['প্রোটোকল ঠিকই ছিল, অটোটাই প্রোটোকল মানেনি।','প্রোটোকল আধিকারিক']],fuel:[['চার্জ নেই, তবে জ্ঞান দেওয়ার লোক অনেক।','চার্জিং স্টেশনের কর্মী']],crash:[['ওস্তাদ, বাঁয়ে চাপুন… মানে ডাইনে।','বাসের হেল্পার']],win:[['এমন অটো আগে দেখিনি, ভাড়াও কম নিল!','খুশি যাত্রী']]};
 const zero=ch&&G.score<1;const q=zero?['অটো নামল, কিছুই ভাঙল না।','হতাশ পাঠক']:pick(Q[r]||Q.crash);$('nq').innerHTML='“'+q[0]+'”<small>— '+q[1]+'</small>';
 const D0={caught:'শেষে উত্তেজিত জনতা অটোটিকে ঘিরে ধরে। চালক গামছা মাথায় দিয়ে ভিড়ের মধ্যেই মিলিয়ে যান। পুলিশ আসে সব শেষ হওয়ার পর, এবং জানতে চায়, “কী হয়েছে এখানে?”',bus:'শেষে একটি বড় গাড়ির সঙ্গে “হালকা ঘষা” লাগে। অটোটি এখন পাঁপড়ের মতো পাতলা। বাসটি যথারীতি থামেনি, সামনে যাত্রী ছিল।',police:'ভিআইপি কনভয়ের পুলিশ অটোটিকে পাকড়াও করে। চালককে থানায় নিয়ে গিয়ে চা খাওয়ানো হয়, বিলটা চালককেই দিতে হয়।',fuel:'মাঝরাস্তায় টোটোর ব্যাটারি ফুরিয়ে যায়। যাত্রীরাই শেষমেশ টোটো ঠেলে চার্জিং পয়েন্টে নিয়ে যান।',crash:'পরপর ধাক্কার পর অটোটি আর চলতে রাজি হয়নি।',win:'নিরাপদে গন্তব্যে পৌঁছেছে অটো। শহরে চাঞ্চল্য।'};
 const J=['ঘটনার তদন্তে তিন সদস্যের কমিটি গঠিত হয়েছে। আগের ৪১টি কমিটির রিপোর্ট এখনও জমা পড়েনি।','পুরসভা জানিয়েছে, অটো তাদের এক্তিয়ারে পড়ে না। কার এক্তিয়ারে, তা তারাও জানে না।','ক্ষতিগ্রস্তদের জন্য বিশেষ অনুদান ঘোষণা হয়েছে। অনুদানের বড় অংশ খরচ হবে ঘোষণার অনুষ্ঠানে।','ঘটনাস্থলের ম্যানহোলের ঢাকনা অবশ্য আগেই চুরি হয়ে গিয়েছিল।','রাস্তাটি গত মাসেই সারানো হয়েছিল — কাগজে-কলমে।'];
 $('nbody').innerHTML='<b>'+area+', নিজস্ব সংবাদদাতা:</b> '+(D0[r]||D0.crash)+((G.maxCombo||0)>=2?' একবার টানা '+bn(G.maxCombo)+'টা ধাক্কা দেন চালক। দেখে এক বাসচালক মুগ্ধ হয়ে নিজের ফোন নম্বর দিয়ে যান।':'')+(G.bribes?' রাস্তায় '+bn(G.bribes)+' বার “চা-পানি” দেওয়া হয়েছে বলে সূত্রের খবর।':'')+' '+pick(J);}
 $('nstat').textContent=bn(Math.round(G.odo))+' মিটার · '+bn(G.stops)+' স্টপ'+(ch?' · '+bn(G.smashN)+' ভাঙচুর · '+bn(G.vicN)+' জন/গাড়ি ক্ষতিগ্রস্ত':' · '+bn(G.carried)+' যাত্রী')+' · পকেটে +₹'+bn(G.pocketGain)+' · সেরা ₹'+bn(SAVE.best[ch?'dmg':'fare']);
 $('nCont').classList.toggle('hidden',r!=='win');$('news').classList.remove('hidden');}
function startGame(){A.init();Mus.start();resetGame();G.rowLo=G.D;setSticker(SAVE.sticker);setPaint(SAVE.paint);G.state='play';G.cam='play';
 ['menu','garage','news','pause'].forEach(i=>$(i).classList.add('hidden'));$('hud').style.display='block';$('ctl').style.display='block';$('ticker').style.display='block';$('bB').style.display=G.mode==='chaos'?'flex':'none';
 cache.score=null;Object.keys(cache).forEach(k=>cache[k]=null);
 say(G.mode==='chaos'?'ডানদিকের ▶▶ চলো-বোতাম ধরে রাখো!':'▶▶ চলো-বোতাম ধরে রাখলে অটো চলবে!',1);const z=ZN[G.zone%8];banner('<span>'+(G.mode==='fare'?'স্টপ '+bn(G.zone):'শুরু')+'</span><b>'+z.bn+'</b><span>'+z.en+'</span>');}
function toMenu(){drawTasks();clearBubs();G.state='menu';G.cam='menu';resetGame();G.sp=0;['garage','news','pause'].forEach(i=>$(i).classList.add('hidden'));$('menu').classList.remove('hidden');$('hud').style.display='none';$('ctl').style.display='none';$('ticker').style.display='none';A.eng(0,false);}
function flash(k){if(G.state!=='play'||!TKN[k])return;const n=performance.now();if(n-(G.flT||0)<2600)return;G.flT=n;const t=pick(TKN[k]).replace('{a}',ZN[G.zone%8].bn);const el=$('tk');el.innerHTML='<b class="brk">সর্বশেষ</b> '+t+'   ◆   '+TICK.slice(0,5).join('   ◆   ');el.style.animation='none';void el.offsetWidth;el.style.animation='';}
function bubble(txt,e){const el=document.createElement('div');el.className='bub';el.textContent=txt;$('stage').appendChild(el);bubs.push({el,e,t:2.6});while(bubs.length>1){const o=bubs.shift();o.el.remove();}}
function updBubs(dt){for(let i=bubs.length-1;i>=0;i--){const b=bubs[i];b.t-=dt;let x,y,z;
 if(b.e&&b.e.pos){[x,y,z]=b.e.pos();}else if(b.e&&b.e.mesh){x=b.e.x;y=elevAt(-b.e.z)+(b.e.l>6?4:2.5)+(b.e.h||0);z=b.e.z;}else{x=G.x;y=G.ev+2.7+(G.jy||0);z=-G.D;}
 _bv.set(x,y,z).project(camera);const vis=_bv.z<1&&b.t>0&&G.state!=='menu';const sx=(_bv.x*.5+.5)*W,sy=(-_bv.y*.5+.5)*H;
 b.el.style.transform='translate('+clamp(sx,90,W-90).toFixed(0)+'px,'+clamp(sy,70,H-190).toFixed(0)+'px) translate(-50%,-100%)';b.el.style.opacity=vis?Math.min(1,b.t*3):0;if(b.t<=0){b.el.remove();bubs.splice(i,1);}}}
function clearBubs(){bubs.forEach(b=>b.el.remove());bubs.length=0;}
function vpCats(){return[['অন্য চালকদের গালাগালি',YB],['ভিন রাজ্যের ড্রাইভার',YH],['পথচারী',[...new Set(YP.concat(OW,JAY))]],['উত্তেজিত পাবলিক',MOBL],['যাত্রী',PT.flatMap(p=>[p.line,p.bumpL,p.late])],['বাস কন্ডাক্টর',CONDUCT],['ট্রাফিক পুলিশ / মামা',COP.concat(MAMA)],['ভিআইপি',VIPL.concat(VIPW)],['তুমি — অটোদাদা',[...new Set(MEL8.concat(...Object.values(BG)))]],['হিন্দি/ভোজপুরি লাইন',[...new Set(Object.values(BH).flat())]]];}
function vpCount(){const n=VP.map.size;const el=$('vpSt');if(el)el.textContent=n?'🎙 '+bn(n)+'টা লাইনে তোমার গলা আছে':'নিজের/বন্ধুদের গলা রেকর্ড করো — আসল কলকাতার মজা';}
function vpCap(ln,r){const m=$('vpMsg');m.innerHTML='এই পাতায় মাইক বন্ধ — ফোনের রেকর্ডার খুলছি… না খুললে <a href="'+location.href+'" target="_blank" style="color:#ffd84a">নতুন ট্যাবে গেম খোলো</a> বা ⬆ দিয়ে অডিও ফাইল দাও।';
 const i=document.createElement('input');i.type='file';i.accept='audio/*';i.setAttribute('capture','');i.onchange=()=>{const f=i.files[0];if(f){VP.save(ln,f);r.classList.add('has');m.textContent='✅ রেকর্ডিং সেভ হল';}};try{i.click();}catch(e){}}
function drawVP(){const el=$('vpList');el.innerHTML='';for(const [cat,lines] of vpCats()){const h=document.createElement('h4');h.textContent=cat;el.appendChild(h);
 for(const ln of lines){const r=document.createElement('div');r.className='vr'+(VP.map.has(ln)?' has':'');r.innerHTML='<span></span><button class="vb rec" title="রেকর্ড">🎙</button><button class="vb pl" title="শোনো">▶</button><label class="vb" title="ফাইল">⬆<input type="file" accept="audio/*"></label><button class="vb dl" title="মোছো">✕</button>';r.firstChild.textContent=ln;el.appendChild(r);
  r.querySelector('.pl').onclick=()=>{if(!VP.play(ln))r.firstChild.animate([{color:'#ff6b6b'},{color:''}],600);};
  r.querySelector('.dl').onclick=()=>{VP.del(ln);r.classList.remove('has');};
  r.querySelector('input').onchange=ev=>{const f=ev.target.files[0];if(f){VP.save(ln,f);r.classList.add('has');}};
  const rb=r.querySelector('.rec');rb.onclick=async()=>{if(vpRec&&vpRec.btn===rb){vpRec.mr.stop();return;}if(vpRec){vpRec.mr.stop();}
   try{const st=await navigator.mediaDevices.getUserMedia({audio:true});const mr=new MediaRecorder(st),ch=[];mr.ondataavailable=e=>ch.push(e.data);
    mr.onstop=()=>{st.getTracks().forEach(t=>t.stop());rb.classList.remove('on');rb.textContent='🎙';const b=new Blob(ch,{type:mr.mimeType||'audio/webm'});if(b.size>800){VP.save(ln,b);r.classList.add('has');}vpRec=null;};
    mr.start();rb.classList.add('on');rb.textContent='■';vpRec={mr,btn:rb};setTimeout(()=>{if(vpRec&&vpRec.mr===mr)mr.stop();},6000);}
   catch(e){vpCap(ln,r);}};}}}
function today(){const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function dayTasks(){let h=7;for(const c of today())h=(h*131+c.charCodeAt(0))>>>0;const out=[];TPOOL.forEach((p,i)=>{let j=(h>>>(i*5))%p.length;for(let k=0;k<p.length;k++){const t=p[(j+k)%p.length];if(!out.some(o=>(o.al||o.id)===(t.al||t.id))){out.push(t);return;}}out.push(p[j]);});return out;}
function tState(){if(!SAVE.tasks||SAVE.tasks.day!==today())SAVE.tasks={day:today(),p:{},done:{}};return SAVE.tasks;}
function taskInc(id,v,mx){const S=tState();let ch=false;for(const tk of dayTasks()){if((tk.al||tk.id)!==id||S.done[tk.id])continue;const cur=S.p[tk.id]||0;S.p[tk.id]=tk.mx?Math.max(cur,v):cur+v;ch=true;
 if(S.p[tk.id]>=tk.n){S.done[tk.id]=1;SAVE.pocket+=tk.r;setTimeout(()=>{say('✅ আজকের কাজ শেষ! +₹'+bn(tk.r)+' পকেটে',1);A.coin();},400);}}if(ch&&!mx)persist();}
function drawTasks(){const el=$('tasks');if(!el)return;const S=tState();el.innerHTML=dayTasks().map((tk,i)=>{const p=Math.min(tk.n,S.p[tk.id]||0),d=S.done[tk.id];return '<div class="tk'+(d?' dn':'')+'"><span class="lv lv'+i+'">'+['সহজ','মাঝারি','কঠিন'][i]+'</span><b>'+tk.t+'</b><i>'+(d?'✓ ':'')+'+₹'+bn(tk.r)+'</i><div class="pb"><div style="width:'+(p/tk.n*100).toFixed(0)+'%"></div></div><small>'+bn(Math.floor(p))+'/'+bn(tk.n)+(tk.mx?' সে':'')+'</small></div>';}).join('');}
function taskTick(dt){G.runT=(G.runT||0)+dt;G.tkT=(G.tkT||0)-dt;if(G.tkT<=0){G.tkT=1;taskInc('survive',G.runT,1);
 if(Math.abs(G.x)>G.hw+.4&&G.sp>4&&G.ev<.3)flash('foot');else if(roadKind(G.D)>0&&(G.ct>=0?G.x>.6:G.x<-.6)&&G.sp>4)flash('wrong');}}
function lorryModel(){const g=new T.Group(),c=pick(['#e8791a','#d6452d','#2f9e5e','#1d5fa8','#f2b01e']),c2=pick(['#ffd23f','#ffffff','#e63946']);
 rb(2.3,1.9,2.2,.25,c,0,1.75,-2.7,g);bx(1.95,.8,.06,glassM,0,2.25,-3.81,g);bx(2.32,.22,.14,c2,0,2.88,-3.78,g);bx(2.25,.3,.24,'#c4c7cc',0,.72,-3.86,g);bx(1.3,.5,.05,'#2a2a2a',0,1.25,-3.82,g);
 [-1,1].forEach(s=>{const h=new T.Mesh(US,MB('#fff7c2'));h.scale.setScalar(.17);h.position.set(s*.82,1.05,-3.83);g.add(h);bx(.06,.45,.3,'#222',s*1.22,2.3,-3.45,g);bx(.22,.14,.05,MB('#ff3b30'),s*.95,.95,3.93,g);});
 bx(2.36,.26,5.7,'#3a2f26',0,1.02,1.15,g);
 for(const s of[-1,1]){bx(.08,1.45,5.5,c,s*1.16,1.92,1.15,g);for(let i=0;i<4;i++)bx(.1,.1,5.52,c2,s*1.17,1.35+i*.38,1.15,g);}
 bx(2.36,1.45,.08,c,0,1.92,3.9,g);const tb=planeTex(tagTex('HORN OK PLEASE',c,'#fff',19),1.9,.48,true);tb.position.set(0,1.95,3.95);g.add(tb);
 const ld=new T.Mesh(US,M(pick(['#2f6e3a','#7a5a3a','#c9b483','#4a5a7a'])));ld.scale.set(1.08,.75,2.6);ld.position.set(0,2.55,1.15);g.add(ld);
 const fp=planeTex(tagTex(pick(['মা তারা','জয় বাবা','মায়ের আশীর্বাদ']),c2,'#b02020',30),1.4,.3,true);fp.position.set(0,2.9,-3.87);fp.rotation.y=Math.PI;g.add(fp);
 g.userData.wh=[wheel(.5,.42,-1.05,.5,-2.65,g),wheel(.5,.42,1.05,.5,-2.65,g),wheel(.5,.42,-1.05,.5,2.05,g),wheel(.5,.42,1.05,.5,2.05,g),wheel(.5,.42,-1.05,.5,3.15,g),wheel(.5,.42,1.05,.5,3.15,g)];
 blob(g,2.6,7.9);return g;}
function vipModel(){const g=taxiModel('#121316',0);const bc=new T.Mesh(US,MB('#ff2020'));bc.scale.set(.17,.13,.17);bc.position.set(0,1.98,.1);g.add(bc);g.userData.bc=bc;
 cy(.02,.75,'#ddd',.78,1.25,-2.0,g);bx(.42,.27,.02,MB('#f4f4f4'),1.0,1.5,-2.0,g);bx(.42,.06,.025,MB('#2c7be5'),1.0,1.47,-2.0,g);
 const vp=planeTex(tagTex('VIP','#c0392b','#fff',40),.7,.26,true);vp.position.set(0,.84,-2.17);vp.rotation.y=Math.PI;g.add(vp);return g;}
function pbikeModel(){const g=bikeModel();const a=bx(.2,.12,.12,MB('#2255ff'),-.14,1.25,.95,g),b=bx(.2,.12,.12,MB('#ff2020'),.14,1.25,.95,g);g.userData.lb=[a,b];const st=bx(.75,.3,.5,'#f4f4f4',0,.85,.85,g);return g;}
function mamaModel(sd){const g=new T.Group();
 const pm=new T.Mesh(new T.PlaneGeometry(3.2,7),new T.MeshBasicMaterial({color:'#ff4fa0',transparent:true,opacity:.55,depthWrite:false}));pm.rotation.x=-Math.PI/2;pm.position.y=.29;g.add(pm);
 const bd=new T.Mesh(new T.PlaneGeometry(3.5,7.3),new T.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.7,depthWrite:false}));bd.rotation.x=-Math.PI/2;bd.position.y=.28;g.add(bd);
 const tx=planeTex(tagTex('☕ চা-পানি','#ff4fa0','#fff',30),2.6,1.1,true);tx.material.transparent=true;tx.rotation.x=-Math.PI/2;tx.rotation.z=sd>0?Math.PI/2:-Math.PI/2;tx.position.y=.3;g.add(tx);
 const k=new T.Group();k.position.set(sd*2.9,0,-1.6);g.add(k);bx(1.5,2.3,1.5,'#f2f0e8',0,1.15,0,k);bx(1.8,.22,1.8,'#c0392b',0,2.4,0,k);bx(.05,.8,1.1,glassM,-sd*.76,1.55,0,k);
 const sg=planeTex(signTex('ট্রাফিক গার্ড','#1b4f8a','#fff'),1.5,.45);sg.position.set(-sd*.77,2.05,0);sg.rotation.y=-sd*Math.PI/2;k.add(sg);
 const p=person('#f4f4f0',{pants:'#f4f4f0'});p.position.set(sd*1.6,.25,1.2);p.rotation.y=-sd*Math.PI/2;g.add(p);bx(.36,.12,.36,'#f4f4f0',0,2.15,0,p);bx(.4,.03,.4,'#1b2a4a',0,2.1,0,p);
 const um=new T.Mesh(new T.ConeGeometry(1.15,.5,8),M('#e64a2e'));um.position.set(sd*2.9,3.1,1.6);g.add(um);cy(.04,2.9,'#777',sd*2.9,1.55,1.6,g);
 g.userData.cop=p;return g;}
function dropModel(sd){const g=new T.Group();
 const pm=new T.Mesh(new T.PlaneGeometry(3,6),new T.MeshBasicMaterial({color:'#20d46a',transparent:true,opacity:.5,depthWrite:false}));pm.rotation.x=-Math.PI/2;pm.position.y=.3;g.add(pm);
 for(let i=0;i<5;i++){const s=bx(2.6,.02,.18,MB('#ffffff'),0,.31,-2.4+i*1.2,g);}
 cy(.06,3.4,'#ddd',sd*1.9,1.7,0,g);const b=planeTex(tagTex('নামার জায়গা','#0b7a45','#fff',26),1.6,.6,true);b.position.set(sd*1.9,3.2,0);b.rotation.y=-sd*Math.PI/2;g.add(b);
 const ar=new T.Mesh(new T.ConeGeometry(.45,.9,4),MB('#20d46a'));ar.rotation.x=Math.PI;ar.position.set(0,2.6,0);g.add(ar);g.userData.ar=ar;return g;}
function sbkModel(hw){const g=new T.Group(),n=Math.ceil(2*hw/.7);for(let i=0;i<n;i++)bx(.7,.14,.75,i%2?'#ffd23f':'#1d1d1f',-hw+.35+i*.7,.07,0,g);
 const p=planeTex(tagTex('ধীরে চলুন','#ffd23f','#111',30),1.1,.5,true);p.position.set(-hw-1,1.6,1);g.add(p);cy(.04,1.4,'#666',-hw-1,.7,1,g);return g;}
function spawnCh(n,D,x){if(G.beatT>0||G.state!=='play')return;let k=0;
 for(const c of CHP){if(k>=n)break;if(c.on)continue;c.on=true;c.st='run';c.m.visible=true;c.m.rotation.set(0,0,0);c.m.scale.setScalar(1);const sd=Math.random()<.5?-1:1;c.x=clamp(x+sd*rnd(2.5,5),-(G.hw+3.6),G.hw+3.6);c.D=D+rnd(-6,4);c.sp=7.6+rnd(0,1.8)+Math.min(3,(G.heat||0)*.12);c.t=Math.random()*5;c.slot=-1;c.lt=undefined;k++;}
 if(k){G.heat=(G.heat||0)+k;G.chaseT=20;if(!G.chaseOn){G.chaseOn=true;A.mob();const c=CHP.find(c=>c.on&&c.st==='run');if(c){G.spk=chPos(c);Vx.speak(pick(MOBL),'bn');}setTimeout(()=>flash('chase'),1200);}}}
function chaseClear(paid){for(const c of CHP){if(!c.on)continue;if(c.st==='cling'){c.st='fall';c.ft=1;c.vx=rnd(-4,4);c.vD=0;}c.lt=1.6;c.st=c.st==='fall'?'fall':'leave';c.give=1;}G.chaseT=0;G.cling=0;G.chaseOn=false;G.chaseN=0;G.heat=0;$('pubchip').style.display='none';$('shakechip').style.display='none';}
function chaseUpd(dt){const L=CHP.filter(c=>c.on);if(!L.length&&!G.chaseOn){return;}let cl=0,act=0;const cs=Math.cos(G.th),sn=Math.sin(G.th);G.chaseT=(G.chaseT||0)-dt;
 const used=new Set(L.filter(c=>c.st==='cling').map(c=>c.slot));
 for(const c of L){c.t+=dt;const m=c.m;
  if(c.st==='cling'){cl++;act++;const s=CSLOT[c.slot];c.x=G.x+s[0]*cs-s[1]*sn;c.D=G.D-s[0]*sn-s[1]*cs;m.position.set(c.x,G.ev+(G.jy||0)+.12+Math.abs(Math.sin(c.t*9))*.07,-c.D);
   m.rotation.set(0,Math.atan2(G.x-c.x,-(G.D-c.D))+(s[1]>1.5?Math.PI:0),0);walk(m,c.t*17,.9);m.userData.arms[0].rotation.x=-2.8;m.userData.arms[1].rotation.x=-2.6;continue;}
  if(c.st==='fall'){c.ft-=dt;c.x+=c.vx*dt;c.D+=c.vD*dt;c.vx*=Math.pow(.15,dt);c.vD*=Math.pow(.15,dt);m.rotation.x=-1.45*Math.min(1,(1.3-c.ft)*6);m.position.set(c.x,elevAt(c.D)+.22,-c.D);if(c.ft<=0){m.rotation.x=0;c.st=(G.chaseT>0&&!c.give)?'run':'leave';}continue;}
  if(c.st==='leave'){c.lt=(c.lt===undefined?1.6:c.lt)-dt;const dx=c.x-G.x,dD=c.D-G.D,d=Math.hypot(dx,dD)||1;c.x+=dx/d*2.5*dt;c.D+=dD/d*2.5*dt;m.rotation.set(0,Math.atan2(dx/d,-dD/d),0);walk(m,c.t*6,.5);m.position.set(c.x,elevAt(c.D),-c.D);
   if(c.lt<=0){c.on=false;m.visible=false;c.lt=undefined;c.give=0;m.scale.setScalar(1);}else if(c.lt<.5)m.scale.setScalar(Math.max(.01,c.lt*2));continue;}
  if(c.st!=='run')continue;
  act++;const dx=G.x-c.x,dD=G.D-c.D,d=Math.hypot(dx,dD)||1;
  if(G.chaseT<=0||d>72){c.st='leave';continue;}
  const sp=c.sp*(d<7?1.06:1);c.x+=dx/d*sp*dt;c.D+=dD/d*sp*dt;c.x=clamp(c.x,-(G.hw+4),G.hw+4);{const pp=pushOut(c.x,-c.D,.35);if(pp){c.x+=pp[0];c.D-=pp[1];}}m.rotation.set(0,Math.atan2(dx/d,-dD/d),0);walk(m,c.t*13,1);
  m.userData.arms[0].rotation.x=-2.5+Math.sin(c.t*13)*.5;m.userData.arms[1].rotation.x=-2.5-Math.sin(c.t*13)*.5;m.position.set(c.x,elevAt(c.D)+Math.abs(Math.sin(c.t*13))*.1,-c.D);
  if(d<2.1&&Math.abs(G.sp)<c.sp+3.5){let sl=-1;for(let i=0;i<CSLOT.length;i++)if(!used.has(i)){sl=i;break;}
   if(sl>=0){used.add(sl);c.st='cling';c.slot=sl;A.bump();pop(pick(['ধরে ফেলেছে!','ঝুলে পড়েছে!']));G.spk=chPos(c);Vx.speak(pick(MOBL),'bn');}}
  else if(Math.random()<dt*.08){G.spk=chPos(c);Vx.speak(pick(MOBL),'bn');}}
 G.cling=cl;G.chaseN=act;
 if(cl){G.shk=(G.shk||0)+dt*((G.sp>13?1.15:0)+Math.min(2,Math.abs(G.yr||0)*1.9)+(keys.turbo&&G.sp>8?.45:0));
  if(G.shk>1){G.shk=0;const c=L.find(c=>c.st==='cling');if(c){const s=CSLOT[c.slot];c.st='fall';c.ft=1.3;c.vx=(s[0]||rnd(-1,1))*5*cs;c.vD=G.sp*.25-2;pop('ধপাস!');A.bump();G.cling--;}}
  if(G.cling>=3||(G.sp<2&&(G.slowT=(G.slowT||0)+dt)>1.2)){startBeat();return;}
  if(G.sp>=2)G.slowT=0;}else{G.shk=0;G.slowT=0;}
 if(G.chaseOn&&act===0){G.chaseOn=false;G.heat=0;G.escapes=(G.escapes||0)+1;pop('এই যাত্রায় বাঁচলি!');say('জনতার হাত ফসকে পালালি! 😅',1);flash('escape');taskInc('escape',1);}
 $('pubchip').style.display=act>0?'block':'none';if(act>0)setT('pubchip','🏃 পাবলিক পিছে: '+bn(act)+' জন'+(cl?' · ঝুলছে '+bn(cl):''));$('shakechip').style.display=cl?'block':'none';}
function startBeat(){if(G.beatT>0)return;G.beatT=2.8;G.sp=0;for(const k in keys)keys[k]=0;document.querySelectorAll('.cb.on').forEach(b=>b.classList.remove('on'));let i=0;
 for(const c of CHP){if(i>=8)break;if(!c.on){c.on=true;c.m.visible=true;}c.m.scale.setScalar(1);c.m.rotation.set(0,0,0);c.st='beat';c.ang=i/8*Math.PI*2+.3;c.t=Math.random();i++;}
 for(const c of CHP)if(c.on&&c.st!=='beat'){c.on=false;c.m.visible=false;}A.mob();['pubchip','shakechip','mamachip','vipchip','polchip','tripchip'].forEach(i=>$(i).style.display='none');G.spk=null;Vx.speak(pick(MOBL),'bn');}
function beatUpd(dt){G.beatT-=dt;for(const c of CHP){if(!c.on||c.st!=='beat')continue;c.t+=dt;const r=1.85+Math.sin(c.t*5+c.ang)*.15;c.x=G.x+Math.sin(c.ang)*r;c.D=G.D+Math.cos(c.ang)*r*1.35;
 c.m.position.set(c.x,G.ev+Math.abs(Math.sin(c.t*7))*.08,-c.D);c.m.rotation.set(0,Math.atan2(G.x-c.x,-(G.D-c.D)),0);walk(c.m,c.t*4,.3);c.m.userData.arms[0].rotation.x=-1.7+Math.sin(c.t*15)*1.2;c.m.userData.arms[1].rotation.x=-1.7-Math.sin(c.t*15)*1.2;}
 G.beatP=(G.beatP||0)-dt;if(G.beatP<=0){G.beatP=.26;A.punch();G.shake=5;burst(G.x+rnd(-.8,.8),1.4,-G.D+rnd(-.8,.8),5,3);if(Math.random()<.55)pop(pick(['ধপাস!','ঠাস!','দুম!','ধাঁই!']));}
 G.shake=Math.max(0,G.shake-dt*10);hud();A.eng(0,false);if(G.beatT<=0){G.beatT=0;endGame('caught');}}
function tripBump(){const tr=G.trip;if(!tr)return;tr.bumps++;if(G.t-(tr.bT||-9)>3){tr.bT=G.t;G.spk=null;Vx.speak(tr.p.bumpL,'bn');}}
function carSmash(e,cs){const mult=1+Math.floor(G.combo/2);G.combo++;G.comboT=2.5;G.maxCombo=Math.max(G.maxCombo||0,G.combo);const base=CARVAL[e.type]||1800,v=Math.max(e.type==='vip'?base*mult:0,Math.round(base*mult*(.6+Math.min(cs,20)/20)/50)*50);G.score+=v;victimCar(e);e.hit=true;
 G.sp*=.62;G.shake=Math.max(G.shake,6);A.crash();pop('+₹'+bn(v)+' '+(LBL[e.type]||'ধাক্কা!'));G.smashN++;taskInc('hit',1);tripBump();
 if(e.type==='vip'){spawnCh(4,G.D,G.x);policeChase();G.spk=e;Vx.speak(pick(VIPL),'bn');flash('vip');taskInc('vip',1);}else{spawnCh(1+(Math.random()<.5?1:0),G.D,G.x);if(Math.random()<.7){G.spk=e;yell(e);}flash('car');}}
function heavyHit(e,dx,dz,hw2,hl,CT,ST){if(G.mode!=='chaos')return false;const cs=Math.abs(G.sp*CT-e.v)+Math.abs(G.sp*ST)*.6,ox=hw2-dx,oz=hl-dz;
 if(ox<oz)G.x+=(G.x>=e.x?1:-1)*ox;else G.D+=(e.z<-G.D?-1:1)*oz;
 if(e.d.lethal){if(G.shield>0){G.sp*=.3;A.bump();return true;}G.lethalE=e;A.crash();A.vboom();burst(G.x,1,-G.D,22,9);G.shake=10;endGame('bus');return true;}
 if(e.vic||e.hit){if(G.t-(e.rpT||-9)>1.2){e.rpT=G.t;pop('+₹০ এক গাড়ি আর কত ভাঙবি?');A.bump();}G.sp*=ox<oz?.9:.3;return true;}
 if(cs>2.5)carSmash(e,cs);else{if(G.t-(e.bT||-9)>.8){e.bT=G.t;A.bump();G.spk=e;yell(e);}G.sp*=.3;}return true;}
function passBy(e,gap){const ch=G.mode==='chaos';if(e.hit||e.vic||e.d.side||e.d.solid||G.sp<6)return;const mult=1+Math.floor(G.combo/2);
 if(e.d.lethal&&gap<1.1){const v=ch?700*mult:20;G.score+=v;pop('+₹'+bn(v)+' এই যাত্রায় বাঁচলি!');A.slide();taskInc('near',1);flash('near');if(Math.random()<.45){G.spk=e;yell(e);}return;}
 if(ch&&(e.type==='car'||e.type==='taxi'||e.type==='vip')&&gap<.38){const v=500*mult;G.score+=v;G.combo++;G.comboT=2.5;pop('+₹'+bn(v)+' সাইড মিরর!');A.smash();taskInc('mirror',1);if(Math.random()<.5){G.spk=e;yell(e);}return;}
 if(!ch&&gap<.9){G.score+=5;if(e.d.heavy&&Math.random()<.4){G.spk=e;yell(e);}else vox('near');}}
function policeChase(){const bs=ents.filter(e=>e.type==='pbike'&&!e.fly&&!e.hit);if(!bs.length)return;G.police={t:18};bs.forEach(b=>b.chase=1);say('🚓 পুলিশ পিছু নিয়েছে! পালাও, নইলে মামার গুমটিতে যাও!',1);flash('police');}
function vipUpd(dt){const ch=G.mode==='chaos';
 if(!G.vipOn&&G.odo>(G.nextVip||450)&&G.ev<.3&&hwP(G.D+150)>5&&elevAt(G.D+150)<.3&&elevAt(G.D+170)<.3&&G.ct>.5&&!G.turning){const L=fwdSet(G.D+150);if(L.length){const x=L.reduce((a,b)=>Math.abs(b)<Math.abs(a)?b:a),z=-(G.D+150);
   const v=place('vip',x,z);v.esc=[place('pbike',x,z-7.5),place('pbike',x,z+7.5)];v.esc.forEach(b=>{b.v=b.vb=v.v;});G.vipOn=true;G.nextVip=G.odo+rnd(800,1150);
   say(ch?'🚨 ভিআইপি কনভয়! ধাক্কা দিলে ₹১০,০০০':'🚨 ভিআইপি কনভয় আসছে — রাস্তা ছাড়ো!',1);flash('vipc');A.siren();}}
 const v=ents.find(e=>e.type==='vip'&&!e.gone);
 if(v){const rel=-v.z-G.D,u=v.mesh.userData;if(u.bc)u.bc.visible=Math.floor(G.t*6)%2===0;
  if(!v.vic&&v.esc)v.esc.forEach((b,i)=>{if(!b.chase&&!b.fly&&!b.hit&&!b.gone){b.z=v.z+(i?7.5:-7.5);b.x+=(v.x-b.x)*Math.min(1,dt*2);}});
  if(Math.abs(rel)<90){G.sirT=(G.sirT||0)-dt;if(G.sirT<=0){G.sirT=1.6;A.siren();}}
  if(!v.vic&&!v.said&&rel<10&&rel>-3&&Math.abs(v.x-G.x)<5){v.said=1;G.spk=v;Vx.speak(pick(VIPW),'bn');}
  if(!v.vic)for(const o of ents){if(!o.d.lc||o===v||o.onc||o.vic)continue;const dz=o.z-v.z;if(dz<-3&&dz>-38&&Math.abs(o.x-v.x)<1.7){const L=fwdSet(-o.z);if(L.length>1){o.tx=L.reduce((a,b)=>Math.abs(b-v.x)>Math.abs(a-v.x)?b:a);o.cool=2.5;}}}
  const chip=rel>-12&&!v.vic;$('vipchip').style.display=chip?'block':'none';if(chip)setT('vipchip','🚨 ভিআইপি · '+bn(Math.max(0,Math.round(rel)))+' মি'+(ch?' · ₹১০,০০০':''));
  if(rel<-110||rel>320)v.gone=true;}
 else{G.vipOn=false;$('vipchip').style.display='none';}
 for(const b of ents)if(b.type==='pbike'){const lb=b.mesh.userData.lb;if(lb){const f=Math.floor(G.t*8)%2===0;lb[0].visible=f;lb[1].visible=!f;}}
 if(G.police){G.police.t-=dt;const bs=ents.filter(e=>e.type==='pbike'&&e.chase&&!e.fly&&!e.hit&&!e.gone);
  if(G.police.t<=0||!bs.length){G.police=null;bs.forEach(b=>{b.chase=0;b.v=b.vb=3;});say('পুলিশ হাল ছেড়ে দিল! 😮‍💨',1);$('polchip').style.display='none';}
  else{$('polchip').style.display='block';setT('polchip','🚓 পুলিশ পিছে! '+bn(Math.ceil(G.police.t))+' সে');G.sirT2=(G.sirT2||0)-dt;if(G.sirT2<=0){G.sirT2=1.3;A.siren();}
   for(const b of bs){const tz=-G.D+2.6,dzz=tz-b.z,spd=Math.max(14,Math.abs(G.sp)+2.2);b.v=0;b.vb=0;b.z+=clamp(dzz,-spd*dt,spd*dt);b.x+=clamp(G.x+(b.x>G.x?1.25:-1.25)-b.x,-7*dt,7*dt);b.mesh.rotation.y=0;
    if(Math.abs(b.z+G.D)<2.7&&Math.abs(b.x-G.x)<2&&Math.abs(G.sp)<7){endGame('police');return;}}}}
 else $('polchip').style.display='none';}
function bribePrice(){if(G.mode!=='chaos')return 50*(1+(G.bribes||0));return Math.max(500,Math.round(G.score*Math.min(.6,.2+.1*(G.bribes||0))/50)*50);}
function mamaUpd(dt){const ch=G.mode==='chaos',act=(G.chaseN||0)>0||!!G.police;let best=null,bd=1e9;
 for(const e of ents){if(e.type!=='mama')continue;const rel=-e.z-G.D,u=e.mesh.userData;if(u.cop){u.cop.userData.arms[1].rotation.x=act?-2.5+Math.sin(G.t*6)*.4:0;}if(Math.abs(rel)<Math.abs(bd)){bd=rel;best=e;}
  if(Math.abs(rel)<3.9&&Math.abs(G.x-e.x)<2.5&&act){if(Math.abs(G.sp)<4.5){if(G.score<500){if(!e.ref){e.ref=1;G.spk=e;Vx.speak(MAMA[1],'bn');}}
     else if(!e.paid){e.paid=1;const p=bribePrice();G.score-=p;G.bribes=(G.bribes||0)+1;chaseClear(true);if(G.police){G.police.t=0;}A.coin();pop('−₹'+bn(p)+' চা-পানি');G.spk=e;Vx.speak(MAMA[0],'bn');flash('bribe');taskInc('bribe',1);}}
   else if(!e.slow){e.slow=1;say('আস্তে ঢোকো! মামা থামতে বলছে ✋',1);}}}
 const show=ch&&act&&best&&Math.abs(bd)<450;$('mamachip').style.display=show?'block':'none';if(show)setT('mamachip','☕ মামার গুমটি '+bn(Math.abs(Math.round(bd)))+' মি '+(bd>=0?'সামনে ▲':'পিছনে ▼')+' · ₹'+bn(bribePrice()));}
function startTrip(e){const p=pick(PT),dist=rnd(330,560);G.trip={p,dst:G.D+dist,sd:roadKind(G.D)?-1:(e.x<0?-1:1),t:Math.round((dist/8.6+13)*(p.tf||1)),bumps:0};G.pax=1;
 player.userData.heads.forEach((h,i)=>h.visible=i<1);A.pax();say('🧑 '+p.n+' উঠলেন · ভাড়া ₹'+bn(p.fare),1);G.spk=null;setTimeout(()=>{if(G.trip)Vx.speak(p.line,'bn');},300);}
function endTrip(){const tr=G.trip;if(tr&&tr.dropE)tr.dropE.gone=true;G.trip=null;G.pax=0;player.userData.heads.forEach(h=>h.visible=false);$('tripchip').style.display='none';}
function tripUpd(dt){const tr=G.trip;
 if(!tr){let bd=1e9;for(const e of ents)if(e.type==='pax'){const r=-e.z-G.D;if(r>0&&r<bd)bd=r;}const s=bd<70;$('tripchip').style.display=s?'block':'none';if(s)setT('tripchip','✋ যাত্রী ডাকছে · '+bn(Math.round(bd))+' মি — আস্তে পাশে থামো');return;}
 tr.t-=dt;const rem=tr.dst-G.D;
 if(!tr.dropE&&rem<170&&rem>-40&&elevAt(tr.dst)<.3){tr.dropE=place('drop',tr.sd*(hwP(tr.dst)-.2),-tr.dst,3,tr.sd);}
 if(tr.dropE){const u=tr.dropE.mesh.userData;if(u.ar){u.ar.position.y=2.6+Math.sin(G.t*5)*.25;u.ar.rotation.y+=dt*3;}}
 $('tripchip').style.display='block';setT('tripchip','📍 '+tr.p.n+' · '+bn(Math.abs(Math.round(rem)))+' মি '+(rem>=0?'সামনে':'পিছনে')+' · '+bn(Math.max(0,Math.ceil(tr.t)))+' সে');
 $('tripchip').classList.toggle('hurry',tr.t<10);
 if(tr.t<10&&!tr.warn){tr.warn=1;G.spk=null;Vx.speak(tr.p.late,'bn');}
 if(tr.t<=0){say('⏰ সময় শেষ — '+tr.p.n+' নেমে গেলেন, ভাড়া পেলে না',1);flash('late');A.sad();endTrip();return;}
 if(tr.dropE&&Math.abs(-tr.dropE.z-G.D)<4.5&&Math.abs(G.x-tr.dropE.x)<2.8&&Math.abs(G.sp)<5){const p=tr.p;const fare=p.fixed?p.fare:p.noBump?(tr.bumps?0:p.fare):Math.max(0,p.fare-tr.bumps*(p.perBump||0));
  SAVE.pocket+=fare;if(G.mode==='fare')G.score+=fare;G.carried++;persist();A.coin();A.stop();pop('ভাড়া +₹'+bn(fare));say('✅ '+p.n+' নামলেন · পকেটে +₹'+bn(fare)+(tr.bumps&&!p.fixed?' (ধাক্কার জন্য কাটা গেল)':''),1);
  if(p.noBump&&tr.bumps){G.spk=null;Vx.speak('ভাড়া? জানো আমি কে?','bn');}taskInc('pax',1);flash('pax');endTrip();}}
function sbkUpd(dt){for(const e of ents){if(e.type!=='sbk'||e.done)continue;const rel=-e.z-G.D;if(rel<.3&&rel>-3&&Math.abs(G.x)<G.hw+.6&&G.ct>0){e.done=1;
  if(G.sp>9){G.jv=3+G.sp*.17;G.shake=6;G.spk=null;Vx.speak(MEL8[0],'bn');pop('উড়ে গেল!');A.boing();taskInc('jump',1);flash('jump');tripBump();}else{G.jv=1.2;A.bump();}}}
 if((G.jy||0)>0||G.jv){G.jy=(G.jy||0)+G.jv*dt;G.jv-=22*dt;if(G.jy<=0){G.jy=0;if(G.jv<-4){A.bump();G.shake=Math.max(G.shake,4);}G.jv=0;}}}
function cycleCam(){SAVE.cam=((SAVE.cam||0)+1)%3;persist();say('🎥 ক্যামেরা: '+CAMN[SAVE.cam],1);}
function wires(g,RH,D0,R){const P=[],poles=[];
 for(const sd of[-1,1])for(let c=3+R()*4;c<CH-1;c+=10+R()*5){if(JH(D0+c))continue;const x=sd*(RH+.55),z=-(D0+c);cy(.09,7.8,'#4b4f56',x,3.9,z,g);bx(1.2,.07,.07,'#4b4f56',x,7.3,z,g);
  if(R()<.22){bx(.75,.95,.55,'#5d6168',x+sd*.38,5.5,z,g);cy(.1,.4,'#8a8f96',x+sd*.38,6.2,z,g);}if(R()<.45)bx(.06,.55,.45,pick(['#c0392b','#1b6b4a','#f2b01e','#2c5fbb']),x-sd*.1,2.7,z,g);poles.push([x,z,sd]);}
 const sag=(a,b,s,n)=>{for(let i=0;i<n;i++){const t0=i/n,t1=(i+1)/n;P.push(a[0]+(b[0]-a[0])*t0,a[1]+(b[1]-a[1])*t0-Math.sin(t0*Math.PI)*s,a[2]+(b[2]-a[2])*t0,a[0]+(b[0]-a[0])*t1,a[1]+(b[1]-a[1])*t1-Math.sin(t1*Math.PI)*s,a[2]+(b[2]-a[2])*t1);}};
 for(const sd of[-1,1]){const ps=poles.filter(p=>p[2]===sd);for(let i=0;i+1<ps.length;i++){const a=ps[i],b=ps[i+1],n=3+((R()*4)|0);
   for(let k=0;k<n;k++){const o=(R()-.5)*.9;sag([a[0]+o*.4,6.1+R()*1.2,a[1]],[b[0]+o*.4,6.1+R()*1.2,b[1]],.3+R()*1.3,8);}
   if(R()<.65)sag([a[0],6.6,a[1]],[a[0]+sd*4.3,4.8+R()*3.5,a[1]-1.5+R()*3],.2+R()*.6,5);}}
 const Lp=poles.filter(p=>p[2]<0),Rp=poles.filter(p=>p[2]>0);for(let i=0;i<Math.min(Lp.length,Rp.length);i++)if(R()<.6){const a=Lp[i],b=Rp[i],n=1+((R()*3)|0);for(let k=0;k<n;k++)sag([a[0],6.5+R()*.8,a[1]],[b[0],6.5+R()*.8,b[1]+(R()-.5)*4],.7+R()*1.4,12);}
 if(P.length){const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(P,3));const ls=new T.LineSegments(geo,wireM);ls.userData.own=1;g.add(ls);}}
function bunting(g,RH,z,R){const pos=[],col=[],n=Math.round(RH*4.5),c=new T.Color();for(let i=0;i<n;i++){const t0=i/n,t1=(i+.75)/n,xa=-RH-.6+t0*(2*RH+1.2),xb=-RH-.6+t1*(2*RH+1.2),ya=7.2-Math.sin(t0*Math.PI)*1.4,yb=7.2-Math.sin(t1*Math.PI)*1.4;
  c.set(pick(['#e63946','#ffd23f','#2a9d8f','#f4f1de','#ff7b00','#3a86ff','#ff5fa2']));pos.push(xa,ya,z,xb,yb,z,(xa+xb)/2,(ya+yb)/2-.6,z);for(let k=0;k<3;k++)col.push(c.r,c.g,c.b);}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('color',new T.Float32BufferAttribute(col,3));const m=new T.Mesh(geo,buntM);m.userData.own=1;g.add(m);
 const P=[];for(let i=0;i<12;i++){const t0=i/12,t1=(i+1)/12;P.push(-RH-.6+t0*(2*RH+1.2),7.2-Math.sin(t0*Math.PI)*1.4,z,-RH-.6+t1*(2*RH+1.2),7.2-Math.sin(t1*Math.PI)*1.4,z);}const lg=new T.BufferGeometry();lg.setAttribute('position',new T.Float32BufferAttribute(P,3));const ls=new T.LineSegments(lg,wireM);ls.userData.own=1;g.add(ls);}
function bldDetail(g,sd,fx,zc,w,f,R){// fx = x of front face
 const nb=Math.min(f-1,2+((R()*3)|0));for(let i=0;i<nb;i++){const fl=1+((R()*(f-1))|0),bw=Math.min(w-1,2.2+R()*2.4),bzc=zc+(R()-.5)*(w-bw-.6),y=fl*3.2;
  bx(1.0,.14,bw,'#cfc6b4',fx-sd*.5,y,bzc,g);bx(.06,.75,bw,pick(RAILC),fx-sd*.98,y+.42,bzc,g);
  if(R()<.6)for(let k=0;k<3;k++)bx(.04,.55,.35,pick(CLOTH),fx-sd*(.9),y+.55,bzc-bw/2+.4+k*(bw-.8)/2,g);
  if(R()<.5){const p=new T.Mesh(UC,M('#b5543a'));p.scale.set(.18,.3,.18);p.position.set(fx-sd*.8,y+.95,bzc+bw/2-.3);g.add(p);const l=new T.Mesh(UI,pick(leafM));l.scale.setScalar(.32);l.position.set(fx-sd*.8,y+1.3,bzc+bw/2-.3);g.add(l);}}
 const na=(R()*3)|0;for(let i=0;i<na;i++)bx(.45,.55,.8,ACM,fx-sd*.25,(1+((R()*(f-1))|0))*3.2+1.6,zc+(R()-.5)*(w-1.2),g);
 const top=f*3.2;if(R()<.6){cy(.55,1,'#222428',fx+sd*(2+R()*4),top+.5,zc+(R()-.5)*(w-2),g);}
 if(R()<.3){const h=planeTex(signTex(pick(['মিষ্টি ভাণ্ডার','সোনার দোকান','কোচিং সেন্টার','বস্ত্রালয়','নার্সিং হোম','লটারি']),pick(['#c0392b','#1b6b4a','#2c5fbb','#8e3b8f','#d98324']),'#fff'),Math.min(w-1,7),2.2);h.position.set(fx+sd*1.5,top+1.6,zc);h.rotation.y=-sd*Math.PI/2;g.add(h);
  bx(.08,1.6,.08,'#333',fx+sd*1.55,top+.6,zc-2,g);bx(.08,1.6,.08,'#333',fx+sd*1.55,top+.6,zc+2,g);}
 bx(.18,.35,w-.2,pick(['#e8e0c8','#c9bfa8','#a89a80']),fx-sd*.09,top-.15,zc,g);}
function gfxSetup(){const hi=(SAVE.gfx||'hi')==='hi';renderer.shadowMap.enabled=hi;renderer.shadowMap.type=T.PCFSoftShadowMap;sun.castShadow=hi;
 const sc=sun.shadow.camera;sc.left=-30;sc.right=30;sc.top=30;sc.bottom=-30;sc.near=1;sc.far=130;sc.updateProjectionMatrix();const ms=MOB?1024:2048;sun.shadow.mapSize.set(ms,ms);sun.shadow.bias=-.0006;sun.shadow.normalBias=.03;
 if($('bGfx'))$('bGfx').textContent='✨ গ্রাফিক্স: '+(hi?'উচ্চ':'সাধারণ');}
function castAll(o){o.traverse(m=>{if(m.isMesh&&!m.material.transparent)m.castShadow=true;});}
function recvAll(g){g.traverse(m=>{if(m.isMesh||m.isInstancedMesh)m.receiveShadow=true;});}
function mergeChunk(g){g.updateMatrixWorld(true);const groups=new Map();
 g.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||!o.geometry||o.material.map||Array.isArray(o.material)||o.material.transparent||!o.visible)return;let a=groups.get(o.material);if(!a)groups.set(o.material,a=[]);a.push(o);});
 for(const [mat,arr] of groups){if(arr.length<2)continue;let n=0;const gs=arr.map(o=>{const q=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();q.applyMatrix4(o.matrixWorld);n+=q.attributes.position.count;return q;});
  const pos=new Float32Array(n*3),nor=new Float32Array(n*3);let off=0;for(const q of gs){pos.set(q.attributes.position.array,off*3);if(q.attributes.normal)nor.set(q.attributes.normal.array,off*3);off+=q.attributes.position.count;q.dispose();}
  const mg=new T.BufferGeometry();mg.setAttribute('position',new T.BufferAttribute(pos,3));mg.setAttribute('normal',new T.BufferAttribute(nor,3));mg.computeBoundingSphere();
  const mm=new T.Mesh(mg,mat);mm.userData.own=1;mm.castShadow=arr.some(o=>o.castShadow);for(const o of arr){if(o.userData.own&&o.geometry)o.geometry.dispose();o.parent.remove(o);}g.add(mm);}}
