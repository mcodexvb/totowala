'use strict';
/* kolkata: functions (all lib files load before any run file) */
function snapSun(){const c=sun.shadow.camera,ts=(c.right-c.left)/sun.shadow.mapSize.x,t=sun.target.position,dx=Math.round(t.x/ts)*ts-t.x,dz=Math.round(t.z/ts)*ts-t.z;t.x+=dx;t.z+=dz;sun.position.x+=dx;sun.position.z+=dz;}
function routeMat(r){return routeMats[r]||(routeMats[r]=new T.MeshBasicMaterial({map:tagTex(r,'#111','#ffd23f',26)}));}
function kolBus(){const g=new T.Group(),wh=[],L=10.4,W=2.45,lo=pick(['#1f4fa3','#1d6f42','#b3261e']),hi=pick(['#f2c230','#f4f1e6']);
 bx(W,1.1,L,lo,0,1.05,0,g);bx(W,1.05,L,hi,0,2.12,0,g);bx(W+.02,.12,L,'#fff',0,1.62,0,g);bx(W-.1,.18,L-.2,'#e8e8e8',0,2.72,0,g);
 for(const s of[-1,1]){for(let k=0;k<8;k++){if(s>0&&(k===0||k===6))continue;bx(.04,.62,.95,glassM,s*(W/2+.01),2.15,-L/2+1.2+k*1.18,g);}}
 bx(W-.3,.85,.05,glassM,0,2.1,-L/2-.02,g);bx(W-.3,.7,.05,glassM,0,2.2,L/2+.02,g);
 const rb=new T.Mesh(new T.PlaneGeometry(1.8,.36),routeMat(pick(ROUTES)));rb.position.set(0,2.62,-L/2-.04);rb.rotation.y=Math.PI;g.add(rb);
 [-.8,.8].forEach(x=>bx(.3,.18,.05,MB('#fff7c2'),x,1.0,-L/2-.03,g));[-.9,.9].forEach(x=>bx(.22,.2,.05,MB('#ff3b30'),x,1.0,L/2+.03,g));
 for(const z of[-L/2+1.5,L/2-2.5])for(let k=0;k<(Math.random()<.7?2:1);k++){const p=person(pick(['#e8e0c8','#6a8fb0','#fff','#c9b27a']),{plain:1});p.position.set(W/2+.18+k*.1,.55,z+k*.5);p.rotation.z=-.25;p.rotation.y=Math.PI/2;g.add(p);}
 for(const z of[-L/2+1.9,L/2-2.1])for(const s of[-1,1])wh.push(wheel(.55,.35,s*(W/2-.15),.55,z,g));
 g.userData={wh,heads:[]};blob(g,W+.2,L+.2);return g;}
function kolLorry(){const g=new T.Group(),wh=[],cab=pick(['#e8a33a','#d9462b','#2f6fb5','#e0c341']);
 bx(2.3,1.4,1.6,cab,0,1.5,-2.9,g);bx(2.32,.5,1.62,'#fff',0,2.45,-2.9,g);bx(2.0,.7,.05,glassM,0,2.0,-3.72,g);bx(2.34,.25,.3,'#b5261e',0,2.85,-3.55,g);
 [-.8,.8].forEach(x=>bx(.26,.2,.05,MB('#fff7c2'),x,1.15,-3.72,g));bx(2.0,.3,.1,'#333',0,.8,-3.75,g);
 bx(2.4,.2,5,'#3a2a1c',0,1.0,.6,g);for(const s of[-1,1])bx(.08,1.2,5,'#c98b3a',s*1.18,1.7,.6,g);bx(2.4,1.2,.08,truckBack,0,1.7,3.1,g);
 const tarp=new T.Mesh(UB,M(pick(['#1f4fa3','#2b6e3f','#c0392b'])));tarp.scale.set(2.3,.9,4.8);tarp.position.set(0,2.6,.6);g.add(tarp);
 const ba=new T.Mesh(new T.PlaneGeometry(2.2,1.2),truckBack);ba.position.set(0,1.7,3.15);g.add(ba);
 for(const z of[-2.8,1.2,2.3])for(const s of[-1,1])wh.push(wheel(.5,.32,s*1.05,.5,z,g));g.userData={wh,heads:[]};blob(g,2.5,7.6);return g;}
function tramModel(){const g=new T.Group(),wh=[],L=13,W=2.3;bx(W,1.0,L,'#1f4fa3',0,.95,0,g);bx(W,1.15,L,'#f4f1e6',0,2.0,0,g);bx(W+.02,.1,L,'#1f4fa3',0,2.62,0,g);bx(W-.2,.2,L-.4,'#d9d9d9',0,2.75,0,g);
 for(const s of[-1,1])for(let k=0;k<10;k++)bx(.04,.7,.95,glassM,s*(W/2+.01),2.05,-L/2+1+k*1.22,g);for(const z of[-L/2,L/2]){bx(W-.3,.8,.05,glassM,0,2.05,z+(z<0?-.02:.02),g);bx(.3,.2,.05,MB('#fff7c2'),0,.9,z+(z<0?-.03:.03),g);}
 const pole=bx(.06,.06,4.2,'#333',0,3.6,1.5,g);pole.rotation.x=.42;const tb=new T.Mesh(new T.PlaneGeometry(1.6,.34),routeMat(pick(['ট্রাম ২৫ · গড়িয়াহাট ⇄ এসপ্ল্যানেড','ট্রাম ৫ · শ্যামবাজার ⇄ এসপ্ল্যানেড'])));tb.position.set(0,2.5,-L/2-.06);tb.rotation.y=Math.PI;g.add(tb);
 for(const z of[-L/2+2,L/2-2])for(const s of[-1,1])wh.push(wheel(.38,.2,s*.72,.38,z,g));g.userData={wh,heads:[]};blob(g,W+.2,L+.2);return g;}
function tramUpdate(dt){if(G.state!=='play'||CITY!==0)return;const px=PX(),pz=PZ();
 if(tramE&&(tramE.gone||Math.hypot(tramE.x-px,tramE.z-pz)>200)){tramE.gone=true;scene.remove(tramE.mesh);tramE=null;tramT=rnd(25,50);}
 if(!tramE){tramT-=dt;if(tramT>0)return;tramT=5;for(let t=0;t<20;t++){const s=randomRoadSpot([60,140]);if(!s||s.ri.kind!=='main')continue;const a={ax:s.ax,k:s.k,dir:s.dir,off:s.ri.lanes[0]};const [x,z]=laneXZ(a,s.along),d=Math.hypot(x-px,z-pz);if(!offScreen(x,-z))continue;
   const m=tramModel();m.position.set(x,0,z);scene.add(m);tramE={type:'proc',d:{w:2.3,l:13,v:[0,0],b:0,solid:1},x,z,w:2.3,l:13,v:0,vx:0,t:0,hit:false,h:0,yo:0,ry:0,col:'#fff',mesh:m,parked:1,dyn:1,keep:1,a,along:s.along,sp:5.5};ents.push(tramE);break;}return;}
 const e=tramE;e.t+=dt;const [x1,z1]=laneXZ(e.a,e.along+e.a.dir),fx=x1-e.x,fz=z1-e.z;const ry=Math.atan2(fx,fz);
 const ax=PX()-e.x,az=PZ()-e.z,ahead=(ax*fx+az*fz)/(Math.hypot(fx,fz)||1),side=Math.abs(ax*fz-az*fx)/(Math.hypot(fx,fz)||1);
 const blocked=ahead>0&&ahead<12&&side<2;let tgt=blocked?0:5.5;e.sp+=(tgt-e.sp)*Math.min(1,dt*1.5);if(blocked&&(e.bell||0)<e.t){e.bell=e.t+2.5;try{A.ps('bell',.5,.8);A.ps('bell',.5,.8,.18);}catch(_){}}
 e.along+=e.a.dir*e.sp*dt;const [nx,nz]=laneXZ(e.a,e.along);e.x=nx;e.z=nz;e.ry=ry;e.mesh.position.set(nx,0,nz);e.mesh.rotation.y=ry;for(const w of e.mesh.userData.wh)w.rotation.x+=e.sp*dt/.38;}
function roadName(k,ax){const L=CITY===0?(ax?ROADS_H:ROADS_V):(ROADS_X[CITY-1]||ROADS_V);return L[((k%L.length)+L.length)%L.length];}
function rnMat(n){const k=n[0];return rnMats[k]||(rnMats[k]=new T.MeshLambertMaterial({map:cTex(256,80,(x,w,h)=>{x.fillStyle='#0f6b3a';x.fillRect(0,0,w,h);x.strokeStyle='#fff';x.lineWidth=4;x.strokeRect(5,5,w-10,h-10);x.fillStyle='#fff';x.textAlign='center';x.font='800 30px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText(n[0],w/2,38,w-20);x.font='600 18px sans-serif';x.fillText(n[1],w/2,64,w-20);})}));}
function spawnDeb(x,y,z,kind,n,pw){for(let i=0;i<n;i++){let d=DEB.find(o=>!o.on);if(!d){if(DEB.length>90)return;const m=new T.Mesh(debG,debMs[0]);m.frustumCulled=false;scene.add(m);d={m};DEB.push(d);}
 d.on=1;d.k=kind;d.t=0;d.life=kind==='spark'?rnd(.25,.5):kind==='dust'?rnd(.8,1.3):rnd(1.2,2);const m=d.m;m.visible=true;m.material=kind==='spark'?sparkM:kind==='dust'?dustM:pick(debMs);
 const s=kind==='spark'?rnd(.04,.07):kind==='dust'?rnd(.6,1):rnd(.08,.22);d.s=s;m.scale.set(s,kind==='spark'?s:s*.5,kind==='spark'?s*4:s);m.position.set(x+rnd(-.4,.4),y,z+rnd(-.4,.4));
 const a=Math.random()*6.28,v=(kind==='dust'?rnd(.4,1.2):rnd(2,6))*pw;d.v=new T.Vector3(Math.cos(a)*v,kind==='dust'?rnd(.2,.6):rnd(2,5)*pw,Math.sin(a)*v);d.r=new T.Vector3(rnd(-12,12),rnd(-12,12),rnd(-12,12));}}
function debUpdate(dt){for(const d of DEB){if(!d.on)continue;d.t+=dt;const m=d.m;if(d.t>d.life){d.on=0;m.visible=false;continue;}
 if(d.k!=='dust'){d.v.y-=18*dt;}m.position.addScaledVector(d.v,dt);if(m.position.y<.05&&d.k!=='dust'){m.position.y=.05;d.v.y*=-.35;d.v.x*=.6;d.v.z*=.6;d.r.multiplyScalar(.6);}
 m.rotation.x+=d.r.x*dt;m.rotation.y+=d.r.y*dt;m.rotation.z+=d.r.z*dt;const f=1-d.t/d.life;if(d.k==='dust'){const s=d.s*(1+d.t*2.2);m.scale.set(s,s*.6,s);}else if(d.k==='spark')m.scale.z=d.s*4*f;}
 dustM.opacity=.45;}
function crashFx(power){const x=PX(),z=PZ();SHK.a=Math.min(.6,SHK.a+.22*power);SHK.w=Math.min(.35,SHK.w+.18*power);spawnDeb(x,1,z,'spark',Math.round(10*power),1);spawnDeb(x,.8,z,'deb',Math.round(6*power),power);spawnDeb(x,.4,z,'dust',Math.round(3*power),1);}
function hbSpot(){if(HB)return HB;let best=null;for(let k=-6;k<=6;k++)if(rinfo(k,0).kind==='main'&&(best===null||Math.abs(k+3)<Math.abs(best+3)))best=k;HB={i:best===null?-3:best,j:-5};return HB;}
function howrahBridge(g,x,z0,z1,hw){const L=z1-z0,H=24,w=hw+1.4,t=.7,mid=(z0+z1)/2;
 for(const tz of[z0+4,z1-4])for(const s of[-1,1]){const lg=bx(t,H,t,steelM,x+s*w,H/2,tz,g);for(let y=4;y<H;y+=5)bx(t*.6,.4,t*.6,steel2,x+s*w,y,tz,g);bx(2*w,.6,.6,steelM,x,H-1,tz,g);bx(2*w,.5,.5,steelM,x,H*.55,tz,g);}
 const N=18;for(const s of[-1,1]){let px=null;for(let k=0;k<=N;k++){const zz=z0+4+(L-8)*k/N,u=k/N,y=H-1-Math.sin(u*Math.PI)*9;if(px){const dz=zz-px[0],dy=y-px[1],len=Math.hypot(dz,dy);const m=bx(t*.7,t*.7,len,steelM,x+s*w,(y+px[1])/2,(zz+px[0])/2,g);m.rotation.x=-Math.atan2(dy,dz);}
   if(k%2===0&&k>0&&k<N){bx(.25,y-7.2,.25,steel2,x+s*w,(y+7.2)/2,zz,g);}px=[zz,y];}
  for(let k=0;k<N;k++){const za=z0+4+(L-8)*k/N,zb=z0+4+(L-8)*(k+1)/N,ya=7.2,yb=H-1-Math.sin((k+.5)/N*Math.PI)*9;const len=Math.hypot(zb-za,yb-ya);const m=bx(.22,.22,len,steel2,x+s*w,(ya+yb)/2,(za+zb)/2,g);m.rotation.x=-Math.atan2(yb-ya,(k%2?-1:1)*(zb-za));}
  bx(.5,.5,L-6,steelM,x+s*w,7.2,mid,g);}
 for(let k=0;k<7;k++)bx(2*w,.3,.3,steel2,x,H-10-Math.sin(k/6*Math.PI)*0+0,z0+8+k*(L-16)/6,g);
 for(const s of[-1,1])bx(1.6,.25,L,'#9a8f80',x+s*(hw+.8),.35,mid,g);
 lmSign(g,'হাওড়া ব্রিজ · রবীন্দ্র সেতু',x+hw+4,z1+2,0);}
function lvLbl(){const b=$('bLives');if(b)b.textContent=SAVE.lives?'❤ ৩ জীবন: চালু':'❤ জীবন: বন্ধ';}
