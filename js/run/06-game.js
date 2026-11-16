'use strict';
/* game: state and start-up code */
const camPos=new T.Vector3(),camLook=new T.Vector3(),envC={sky:new T.Color('#f2b27a'),fog:new T.Color('#e3a37c')};
let rainT=0,shakeV=0,menuT=0;
elevAt=function(){return 0;};
const B=80,SWW=3.8,CR=2;
const RI={};
const hwV=i=>rinfo(i,0).hw,hwH=j=>rinfo(j,1).hw;
const PX=()=>G.x,PZ=()=>-G.D;
mergeChunk=function(g){g.updateMatrixWorld(true);const BK=new Map(),rm=[],v=new T.Vector3(),nm=new T.Matrix3();
 g.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||!o.geometry||!o.visible||o.userData.keep)return;const mats=Array.isArray(o.material)?o.material:[o.material];if(mats.some(m=>m.transparent))return;rm.push(o);
  const geo=o.geometry,idx=geo.index,pos=geo.attributes.position,nor=geo.attributes.normal,uv=geo.attributes.uv,col=geo.attributes.color;const grs=Array.isArray(o.material)&&geo.groups.length?geo.groups:[{start:0,count:idx?idx.count:pos.count,materialIndex:0}];
  const m4=o.matrixWorld;nm.getNormalMatrix(m4);
  for(const gr of grs){const mat=mats[gr.materialIndex]||mats[0];let b=BK.get(mat);if(!b)BK.set(mat,b={p:[],n:[],u:[],c:[],cast:false});if(o.castShadow)b.cast=true;
   const end=Math.min(gr.start+gr.count,idx?idx.count:pos.count);for(let k=gr.start;k<end;k++){const vi=idx?idx.getX(k):k;v.fromBufferAttribute(pos,vi).applyMatrix4(m4);b.p.push(v.x,v.y,v.z);
    if(nor){v.fromBufferAttribute(nor,vi).applyMatrix3(nm).normalize();b.n.push(v.x,v.y,v.z);}else b.n.push(0,1,0);b.u.push(uv?uv.getX(vi):0,uv?uv.getY(vi):0);if(col)b.c.push(col.getX(vi),col.getY(vi),col.getZ(vi));}}});
 if(!rm.length)return;for(const o of rm){if(o.userData.own&&o.geometry)o.geometry.dispose();if(o.parent)o.parent.remove(o);}
 for(const [mat,b] of BK){const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(b.p,3));geo.setAttribute('normal',new T.Float32BufferAttribute(b.n,3));geo.setAttribute('uv',new T.Float32BufferAttribute(b.u,2));if(b.c.length===b.p.length)geo.setAttribute('color',new T.Float32BufferAttribute(b.c,3));
  geo.computeBoundingSphere();const mm=new T.Mesh(geo,mat);mm.userData.own=1;mm.castShadow=b.cast;mm.receiveShadow=true;g.add(mm);}};
const UBn=UB.toNonIndexed(),vcMat=new T.MeshLambertMaterial({vertexColors:true});
const asphT=cTex(256,256,(x,w,h)=>{x.fillStyle='#3a3c42';x.fillRect(0,0,w,h);for(let i=0;i<2600;i++){x.fillStyle=Math.random()<.55?'rgba(0,0,0,'+Math.random()*.18+')':'rgba(255,255,255,'+Math.random()*.06+')';x.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*2.5,1+Math.random()*2.5);}
 for(let i=0;i<5;i++){x.fillStyle='rgba(20,20,22,'+(.25+Math.random()*.25)+')';x.beginPath();x.ellipse(Math.random()*w,Math.random()*h,8+Math.random()*26,6+Math.random()*16,Math.random()*3,0,7);x.fill();}
 x.strokeStyle='rgba(12,12,14,.5)';x.lineWidth=1.3;for(let i=0;i<7;i++){x.beginPath();let px=Math.random()*w,py=Math.random()*h;x.moveTo(px,py);for(let k=0;k<6;k++){px+=(Math.random()-.5)*34;py+=(Math.random()-.5)*34;x.lineTo(px,py);}x.stroke();}});
asphT.wrapS=asphT.wrapT=T.RepeatWrapping;
const roadM=new T.MeshLambertMaterial({map:asphT}),walkM=new T.MeshLambertMaterial({map:brickTex}),curbSM=new T.MeshLambertMaterial({color:'#cfc8b6'}),grassM=new T.MeshLambertMaterial({map:groundTex,color:'#5f9e4f'}),waterM=new T.MeshLambertMaterial({color:'#3d8fc4',transparent:true,opacity:.92}),yelM=MB('#f2c230'),whM=MB('#efefe9');
const sgMat={};
const signGeo=new T.PlaneGeometry(1,1);
const cells=new Map();
const rotTo=(nx,nz)=>Math.atan2(-nz,nx);
const MERGE=new Set(['taxi','car','bus','lorry','auto','tempo','stall','shelter','bin','stn','podium','wrong']);
DEFS.podium={w:1.4,l:1.4,v:[0,0],b:1,solid:1};
place=function(type,x,z,w,sd){return place2(type,x,z,{w,sd});};
const VTW=()=>G.mode==='chaos'?{taxi:4,car:3,bus:3,lorry:2.2,auto:4,tempo:2.4,bike:3,cycle:2.4,rick:2.2,cart:.9}:{taxi:3.5,car:2.6,bus:3,lorry:1.8,auto:3,tempo:2.2,bike:2,cycle:2,rick:1.8,cart:.8};
const SLOWV=new Set(['cycle','rick','cart']);
let pedT=1;
const radT=cTex(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,4,64,64,62);g.addColorStop(0,'rgba(255,214,140,1)');g.addColorStop(.5,'rgba(255,190,110,.45)');g.addColorStop(1,'rgba(255,170,90,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const poolM=new T.MeshBasicMaterial({map:radT,transparent:true,depthWrite:false,blending:T.AdditiveBlending,opacity:0}),lampHeadM=new T.MeshBasicMaterial({color:'#fff1c4'}),lampOffC=new T.Color('#8a8578'),lampOnC=new T.Color('#fff1c4');
const ADS=[['দাদা চানাচুর','মুচমুচে, ঝাল, দারুণ!','#ffd23f','#c0392b'],['রসমালাই কোলা','গরমে ঠান্ডা, মনে মিষ্টি','#e63946','#ffffff'],['মা তারা টেলিকম','৫জি নেটওয়ার্ক — অটোতেও!','#1d4ed8','#ffffff'],['জয়েন্টে ১০০%','সাফল্য কোচিং সেন্টার','#ffffff','#1b6b4a'],
 ['সোনার বাংলা জুয়েলার্স','বিয়ের সেটে ৩০% ছাড়','#7a1f2b','#ffd23f'],['মেট্রো ম্যাট্রেস','অটোর ঝাঁকুনিতেও আরামের ঘুম','#2a9d8f','#ffffff'],['ঘরে বসে আয় করুন!','দিনে মাত্র ২ ঘণ্টা*','#111111','#7dff6b'],['কলকাতা বিরিয়ানি হাউস','আলু ছাড়া বিরিয়ানি হয় না','#f4a261','#2a1a0a'],
 ['ঝকঝকে টুথপেস্ট','হাসুন প্রাণ খুলে','#3a86ff','#ffffff'],['লোকনাথ ট্রাভেলস','পুরী · দিঘা · দার্জিলিং','#ff7b00','#ffffff'],['গরম চা ☕','এক ভাঁড়ে সারাদিন','#5a3a1a','#ffe9a8'],['নতুন ছবি!','হলে এসে দেখুন — হাউসফুল','#2b2540','#ff5fa2']];
const adMats=ADS.map(a=>new T.MeshLambertMaterial({map:cTex(512,256,(x,w,h)=>{x.fillStyle=a[2];x.fillRect(0,0,w,h);x.fillStyle=a[3];x.globalAlpha=.16;for(let i=0;i<6;i++){x.beginPath();x.arc(Math.random()*w,Math.random()*h,30+Math.random()*80,0,7);x.fill();}x.globalAlpha=1;
 x.strokeStyle=a[3];x.lineWidth=10;x.strokeRect(8,8,w-16,h-16);x.fillStyle=a[3];x.textAlign='center';x.textBaseline='middle';x.font='800 78px "Noto Sans Bengali","Noto Sans Bengali","Hind Siliguri",sans-serif';x.fillText(a[0],w/2,100,w-40);x.font='700 38px "Noto Sans Bengali","Noto Sans Bengali","Hind Siliguri",sans-serif';x.fillText(a[1],w/2,188,w-50);})}));
const POST=[['যাত্রাপালা','রক্তে রাঙা পলাশ','#c0392b'],['মহা সার্কাস!','আজ শেষ রাত','#1d4ed8'],['টিউশন','সব বিষয়, সব ক্লাস','#16a085'],['ফ্ল্যাট বিক্রি','লিফট · পার্কিং','#8e44ad'],['বিরাট জলসা','গান · নাচ · হাসি','#d98324'],['হারানো বিজ্ঞপ্তি','লাল সাইকেল','#444']];
const postMats=POST.map(a=>new T.MeshLambertMaterial({map:cTex(128,176,(x,w,h)=>{x.fillStyle='#f3ead2';x.fillRect(0,0,w,h);x.fillStyle=a[2];x.fillRect(0,0,w,58);x.fillStyle='#fff';x.textAlign='center';x.font='800 24px "Noto Sans Bengali",sans-serif';x.fillText(a[0],w/2,38,w-10);x.fillStyle='#222';x.font='700 17px "Noto Sans Bengali",sans-serif';x.fillText(a[1],w/2,96,w-12);x.fillRect(20,120,w-40,4);x.fillRect(30,134,w-60,4);})}));
const noPostM=new T.MeshLambertMaterial({map:cTex(256,96,(x,w,h)=>{x.fillStyle='#fff';x.fillRect(0,0,w,h);x.fillStyle='#c0261d';x.textAlign='center';x.font='800 30px "Noto Sans Bengali",sans-serif';x.fillText('এখানে পোস্টার',w/2,38);x.fillText('লাগানো নিষেধ',w/2,76);})});
const planeG=new T.PlaneGeometry(1,1);
const SPER=24;
const sigMat={V:[0,1,2].map(()=>new T.MeshBasicMaterial({color:'#222'})),H:[0,1,2].map(()=>new T.MeshBasicMaterial({color:'#222'}))};
const SIGC={r:['#ff2a1f','#2a1414','#142a18'],y:['#2a1414','#ffc21f','#142a18'],g:['#2a1414','#2a2410','#2bff6a']};
rmEnt=function(e){scene.remove(e.mesh);e.mesh.traverse(o=>{if(o.userData&&o.userData.own&&o.geometry)o.geometry.dispose();});};
knock=function(e){if(Math.random()<.5)A.slide();const dx=e.x-G.x,dz=e.z+G.D,d=Math.hypot(dx,dz)||1,fx=Math.sin(G.th),fz=-Math.cos(G.th),s=Math.abs(G.sp)*.7+rnd(2,6);e.fly=true;e.h=0;e.ft=2.2;e.vel={x:dx/d*rnd(3,8)+fx*s,y:rnd(7,13),z:dz/d*rnd(3,8)+fz*s};e.spin={x:rnd(-6,6),y:rnd(-4,4),z:rnd(-6,6)};A.whistle();};
victimCar=function(e){A.vboom();if(e.th===undefined)e.th=-e.ry;const dx=e.x-G.x,dz=e.z+G.D,d=Math.hypot(dx,dz)||1;e.vic=1;e.svx=dx/d*rnd(3,6)+Math.sin(G.th)*G.sp*.3;e.svz=dz/d*rnd(3,6)-Math.cos(G.th)*G.sp*.3;e.rot=(Math.random()<.5?-1:1)*rnd(1.5,3.2);e.v=0;e.smoke=3;G.vicN++;burst(e.x,1.2,e.z,14,7);A.smash();e.mesh.scale.set(1,.9,1);};
victimPerson=function(e){const dx=e.x-G.x,dz=e.z+G.D,d=Math.hypot(dx,dz)||1;e.hit=true;e.down=true;e.dT=0;e.dvx=dx/d*rnd(3,5);e.dvz=dz/d*rnd(3,5);G.vicN++;A.bump();A.tone(170,.28,'square',.16,70);burst(e.x,1,e.z,8,4);{const ln=pick(OW);G.spk=e;Vx.speak(ln,'bn');}tripBump();
 if(G.mode==='chaos'){const mult=1+Math.floor(G.combo/2);G.combo++;G.comboT=2.5;G.maxCombo=Math.max(G.maxCombo||0,G.combo);G.score+=800*mult;G.sp*=.88;G.shake=Math.max(G.shake,4);pop('+₹'+bn(800*mult)+' পথচারী কুপোকাত!');spawnCh(3,-e.z,e.x);flash('ped');taskInc('hit',1);}
 else{G.score=Math.max(0,G.score-100);G.sp*=.8;G.shake=Math.max(G.shake,4);A.police();spawnCh(3,-e.z,e.x);flash('ped');setTimeout(()=>say('পথচারী আহত! জরিমানা −₹১০০',1),1300);}};
hurt=function(e){tripBump();if(G.shield>0){A.bump();e.hit=true;G.sp*=.85;return;}if(G.inv>0){e.hit=true;return;}e.hit=true;G.lives--;G.inv=1.8;G.shake=8;G.sp*=.4;A.crash();A.dhoom();burst(G.x,1,-G.D,16,8);vox('hit',1);if(G.lives<=0)endGame('crash');};
honk=function(){if(G.state!=='play'||hornCd>0)return;hornCd=.32;A.init();A.horn();G.hornT=.3;let any=false;
 for(const e of ents){if(e.fly||e.down||!ahead(e,40,5))continue;
  if(e.ai&&!e.vip&&!e.d.lethal&&(e.type==='bike'||e.type==='cycle'||e.type==='rick'||e.type==='auto'||e.type==='cart')){const ri=rinfo(e.ai.k,e.ai.ax);if(ri.lanes.length>1){e.ai.off=e.ai.off===ri.lanes[0]?ri.lanes[1]:ri.lanes[0];any=true;}}
  if(e.type==='ped'&&e.cspd){e.cspd*=1.8;e.pz=0;any=true;}
  if(e.type==='cow'&&!e.mooed){e.mooed=1;A.moo();say(pick(COWL));any=true;}}
 if(any&&Math.random()<.35)setTimeout(()=>yell(),700);if(!any&&Math.random()<.3)say(pick(['পাঁ পাঁ!','সাইড দিন দাদা!','ও দাদা, সরুন!']));};
bomb=function(){if(G.state!=='play'||G.mode!=='chaos'||G.bombCd>0)return;G.bombCd=10;A.init();A.bomb();G.shake=1.2;pop('বুম!');spawnCh(1,G.D,G.x);
 for(const e of ents){if(e.fly||!e.d.b||e.down||!ahead(e,32,10))continue;if(e.d.heavy||e.d.solid||e.d.person){if(e.ai){const ri=rinfo(e.ai.k,e.ai.ax);if(ri.lanes.length>1)e.ai.off=ri.lanes[ri.lanes.length-1];}}else if(e.d.val)smashEnt(e,true);}};
startTrip=function(e){e.gone=true;const p=pick(PT);const [ci,cj]=cellOf(PX(),PZ());let di,dj,n=0;do{di=ci+((Math.random()*9)|0)-4;dj=cj+((Math.random()*9)|0)-4;n++;}while((Math.abs(di-ci)+Math.abs(dj-cj)<3||blockKind(di,dj)==='lake')&&n<40);
 let s=(Math.imul(di,97)^Math.imul(dj,131)^((Math.random()*1e9)|0))>>>0;const R=()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};const q=edgeSpot(di,dj,R,0);const man=Math.abs(q.x-PX())+Math.abs(q.z-PZ());
 G.trip={p,x:q.x+q.nx*1.6,z:q.z+q.nz*1.6,nx:q.nx,nz:q.nz,t:Math.round((man/8.3+16)*(p.tf||1)),bumps:0,area:ZN[nbOf(di,dj)].bn};G.pax=1;
 player.userData.heads.forEach((h,i)=>h.visible=i<1);A.pax();say('🧑 '+p.n+' উঠলেন → '+G.trip.area+' · ভাড়া ₹'+bn(p.fare),1);G.spk=null;setTimeout(()=>{if(G.trip)Vx.speak(p.line,'bn');},300);};
endTrip=function(){const tr=G.trip;if(tr&&tr.dropE)tr.dropE.gone=true;G.trip=null;G.pax=0;player.userData.heads.forEach(h=>h.visible=false);$('tripchip').style.display='none';};
tripUpd=function(dt){const tr=G.trip;
 if(!tr){let bd=1e9,be=null;for(const e of ents)if(e.type==='pax'&&!e.gone){const r=Math.hypot(e.x-PX(),e.z-PZ());if(r<bd){bd=r;be=e;}}const s=bd<70;$('tripchip').style.display=s?'block':'none';if(s)setT('tripchip','✋ যাত্রী ডাকছে · '+bn(Math.round(bd))+' মি '+dirWord(be.x,be.z));return;}
 tr.t-=dt;const dist=Math.hypot(tr.x-PX(),tr.z-PZ());
 if(!tr.dropE&&dist<170){tr.dropE=place2('drop',tr.x,tr.z,{ry:rotTo(tr.nx,tr.nz),sd:-1});if(tr.dropE)tr.dropE.keep=1;}
 if(tr.dropE){const u=tr.dropE.mesh.userData;if(u.ar){u.ar.position.y=2.6+Math.sin(G.t*5)*.25;u.ar.rotation.y+=dt*3;}}
 $('tripchip').style.display='block';setT('tripchip','📍 '+tr.p.n+' → '+tr.area+' · '+bn(Math.round(dist))+' মি '+dirWord(tr.x,tr.z)+' · '+bn(Math.max(0,Math.ceil(tr.t)))+' সে');$('tripchip').classList.toggle('hurry',tr.t<10);
 if(tr.t<10&&!tr.warn){tr.warn=1;G.spk=null;Vx.speak(tr.p.late,'bn');}
 if(tr.t<=0){say('⏰ সময় শেষ — '+tr.p.n+' নেমে গেলেন, ভাড়া পেলে না',1);flash('late');A.sad();endTrip();return;}
 if(dist<4.6&&Math.abs(G.sp)<5){const p=tr.p;const fare=p.fixed?p.fare:p.noBump?(tr.bumps?0:p.fare):Math.max(0,p.fare-tr.bumps*(p.perBump||0));
  SAVE.pocket+=fare;if(G.mode==='fare')G.score+=fare;G.carried++;G.stops++;persist();A.coin();A.stop();pop('ভাড়া +₹'+bn(fare));say('✅ '+p.n+' নামলেন · পকেটে +₹'+bn(fare)+(tr.bumps&&!p.fixed?' (ধাক্কার জন্য কাটা গেল)':''),1);
  if(p.noBump&&tr.bumps){G.spk=null;Vx.speak('ভাড়া? জানো আমি কে?','bn');}taskInc('pax',1);flash('pax');endTrip();}};
mamaUpd=function(dt){const ch=G.mode==='chaos',act=(G.chaseN||0)>0||!!G.police;let best=null,bd=1e9;
 for(const e of ents){if(e.type!=='mama'||e.gone)continue;const u=e.mesh.userData;if(u.cop)u.cop.userData.arms[1].rotation.x=act?-2.5+Math.sin(G.t*6)*.4:0;const d=Math.hypot(e.zx-PX(),e.zz-PZ());if(d<bd){bd=d;best=e;}
  if(d<3.8&&act){if(Math.abs(G.sp)<4.5){const fm=G.mode!=='chaos',bp=bribePrice();if(fm?SAVE.pocket<bp:G.score<500){if(!e.ref){e.ref=1;G.spk=e;Vx.speak(MAMA[1],'bn');}}
     else if(!e.paid){e.paid=1;const p=bp;if(fm){SAVE.pocket-=p;persist();}else G.score-=p;G.bribes=(G.bribes||0)+1;chaseClear(true);if(G.police)G.police.t=0;A.coin();pop('−₹'+bn(p)+' চা-পানি');G.spk=e;Vx.speak(MAMA[0],'bn');flash('bribe');taskInc('bribe',1);}}
   else if(!e.slow){e.slow=1;say('আস্তে ঢোকো! মামা থামতে বলছে ✋',1);}}}
 const show=act&&best&&bd<450;$('mamachip').style.display=show?'block':'none';if(show)setT('mamachip','☕ মামার গুমটি '+bn(Math.round(bd))+' মি '+dirWord(best.zx,best.zz)+' · ₹'+bn(bribePrice()));};
sbkUpd=function(dt){for(const e of ents){if(e.type!=='sbk'||e.gone)continue;if((e.cd||0)>0){e.cd-=dt;continue;}const across=e.ax===0?Math.abs(PX()-e.x)<e.w+.4&&Math.abs(PZ()-e.z)<.9:Math.abs(PZ()-e.z)<e.w+.4&&Math.abs(PX()-e.x)<.9;
  if(across){e.cd=1.5;if(Math.abs(G.sp)>9){G.jv=3+Math.abs(G.sp)*.17;G.shake=6;G.spk=null;Vx.speak(MEL8[0],'bn');pop('উড়ে গেল!');A.boing();taskInc('jump',1);flash('jump');tripBump();}else{G.jv=1.2;A.bump();}}}
 if((G.jy||0)>0||G.jv){G.jy=(G.jy||0)+G.jv*dt;G.jv-=22*dt;if(G.jy<=0){G.jy=0;if(G.jv<-4){A.bump();G.shake=Math.max(G.shake,4);}G.jv=0;}}};
taskTick=function(dt){G.runT=(G.runT||0)+dt;G.tkT=(G.tkT||0)-dt;if(G.tkT<=0){G.tkT=1;taskInc('survive',G.runT,1);const r=onRoad(PX(),PZ());if(!r.inV&&!r.inH&&Math.abs(G.sp)>4)flash('foot');else if(G.wrongS&&Math.abs(G.sp)>4)flash('wrong');}};
vipUpd=function(dt){const ch=G.mode==='chaos';
 if(!G.vipOn&&G.odo>(G.nextVip||450)){for(let t=0;t<6;t++){const s=randomRoadSpot([110,150]);if(!s||s.ri.kind==='gali')continue;const a={ax:s.ax,k:s.k,dir:s.dir,off:s.ri.lanes[0]};const v=spawnVehicle('vip',a,s.along);if(!v)continue;v.vip=1;v.keep=1;v.v=v.vb=9;
   v.esc=[-7.5,7.5].map(o=>{const b=place2('pbike',v.x,v.z,{ry:-v.th});b.th=v.th;b.follow=v;b.fo=o;b.dyn=1;b.keep=1;return b;});G.vipOn=true;G.nextVip=G.odo+rnd(800,1150);
   say(ch?'🚨 ভিআইপি কনভয়! ধাক্কা দিলে ₹১০,০০০':'🚨 ভিআইপি কনভয় আসছে — রাস্তা ছাড়ো!',1);flash('vipc');A.siren();break;}}
 const v=ents.find(e=>e.type==='vip'&&!e.gone);
 if(v){const dist=Math.hypot(v.x-PX(),v.z-PZ()),u=v.mesh.userData;if(u.bc)u.bc.visible=Math.floor(G.t*6)%2===0;const fx=Math.sin(v.th),fz=-Math.cos(v.th);
  if(!v.vic&&v.esc)v.esc.forEach(b=>{if(!b.chase&&!b.fly&&!b.hit&&!b.gone){b.x=v.x-fx*b.fo;b.z=v.z-fz*b.fo;b.th=v.th;b.ry=-v.th;b.v=v.v;}});
  if(dist<90){G.sirT=(G.sirT||0)-dt;if(G.sirT<=0){G.sirT=1.6;A.siren();}}
  if(!v.vic&&!v.said&&dist<9){v.said=1;G.spk=v;Vx.speak(pick(VIPW),'bn');}
  if(!v.vic&&v.ai)for(const o of ents){if(!o.ai||o===v||o.vip||o.follow)continue;const a=o.ai,b=v.ai;if(a.ax!==b.ax||a.k!==b.k||a.dir!==b.dir||Math.abs(a.off-b.off)>.5)continue;const dd=((a.ax===0?o.z:o.x)-(b.ax===0?v.z:v.x))*a.dir;if(dd>0&&dd<38){const ri=rinfo(a.k,a.ax);if(ri.lanes.length>1)a.off=ri.lanes[ri.lanes.length-1];}}
  const chip=!v.vic;$('vipchip').style.display=chip?'block':'none';if(chip)setT('vipchip','🚨 ভিআইপি · '+bn(Math.round(dist))+' মি '+dirWord(v.x,v.z)+(ch?' · ₹১০,০০০':''));
  if(dist>260){v.gone=true;(v.esc||[]).forEach(b=>{if(!b.chase)b.gone=true;});}}
 else{G.vipOn=false;$('vipchip').style.display='none';}
 for(const b of ents)if(b.type==='pbike'){const lb=b.mesh.userData.lb;if(lb){const f=Math.floor(G.t*8)%2===0;lb[0].visible=f;lb[1].visible=!f;}}
 if(G.police){G.police.t-=dt;const bs=ents.filter(e=>e.type==='pbike'&&e.chase&&!e.fly&&!e.hit&&!e.gone);
  if(G.police.t<=0||!bs.length){G.police=null;bs.forEach(b=>{b.chase=0;b.gone=true;});say('পুলিশ হাল ছেড়ে দিল! 😮‍💨',1);$('polchip').style.display='none';}
  else{$('polchip').style.display='block';setT('polchip','🚓 পুলিশ পিছে! '+bn(Math.ceil(G.police.t))+' সে');G.sirT2=(G.sirT2||0)-dt;if(G.sirT2<=0){G.sirT2=1.3;A.siren();}
   for(const b of bs){b.follow=null;const tx=PX()-Math.sin(G.th)*2.6,tz=PZ()+Math.cos(G.th)*2.6,dx=tx-b.x,dz=tz-b.z,d=Math.hypot(dx,dz)||1;const spd=Math.max(14,Math.abs(G.sp)+2.2)*(d<4?.6:1);
    let th2=Math.atan2(dx,-dz),dd=th2-b.th;while(dd>Math.PI)dd-=2*Math.PI;while(dd<-Math.PI)dd+=2*Math.PI;b.th+=clamp(dd,-4*dt,4*dt);b.x+=Math.sin(b.th)*spd*dt;b.z-=Math.cos(b.th)*spd*dt;const pp=pushOut(b.x,b.z,.6);if(pp){b.x+=pp[0];b.z+=pp[1];}b.ry=-b.th;
    if(Math.hypot(b.x-PX(),b.z-PZ())<2.5&&Math.abs(G.sp)<7){endGame('police');return;}}}}
 else $('polchip').style.display='none';};
envUpdate=function(dt){const Z=ZN[G.zone||0],k=Math.min(1,dt*.8);envC.sky.lerp(new T.Color(Z.sky),k);envC.fog.lerp(new T.Color(Z.fog),k);scene.background.copy(envC.sky);scene.fog.color.copy(envC.fog);scene.fog.near=40;scene.fog.far=190;
 hemi.intensity=lerp(hemi.intensity,Z.amb,k);sun.intensity=lerp(sun.intensity,(renderer.shadowMap.enabled?1.05:.8)*(1-Z.night*.8),k);G.night=lerp(G.night||0,Z.night,k);head.intensity=G.night*1.6;
 G.rainA=lerp(G.rainA,G.zone===3?1:0,Math.min(1,dt*.5));rain.material.opacity=.5*G.rainA;sunDisc.material.color.copy(envC.sky).lerp(new T.Color(Z.night?'#e8eaff':'#fff4c8'),.7);};
hud=function(){const ch=G.mode==='chaos';setT('score','₹'+bn(G.score));setT('pocket','পকেট ₹'+bn(SAVE.pocket));setT('slab',ch?'জাতীয় ক্ষতি':'আজকের ভাড়া');
 setT('combo',ch&&G.combo>=2?'×'+(1+Math.floor(G.combo/2))+' কম্বো!':'');
 setT('hearts',(SAVE.lives&&!ch?'♥'.repeat(Math.max(0,G.lives))+'<span style="opacity:.25">'+'♥'.repeat(3-Math.max(0,G.lives))+'</span>':'')+(G.pax?' <span style="font-size:16px;color:#fff">🧑</span>':''),1);
 $('fuel').firstChild.style.width=clamp(G.fuel,0,100)+'%';setT('fuelt','⚡'+bn(G.fuel)+'%');setT('nxt','📍 '+ZN[G.zone||0].bn);};
drawMini=function(){const c=mini,S=232,K=1.15;c.clearRect(0,0,S,S);c.save();c.beginPath();c.arc(S/2,S/2,S/2,0,7);c.clip();c.fillStyle='#2a2c33';c.fillRect(0,0,S,S);
 c.translate(S/2,S/2);c.rotate(-G.th);const px=PX(),pz=PZ(),Rm=S/2/K+10;const X=x=>(x-px)*K,Y=z=>(z-pz)*K;
 const i0=Math.floor((px-Rm)/B),i1=Math.ceil((px+Rm)/B),j0=Math.floor((pz-Rm)/B),j1=Math.ceil((pz+Rm)/B);
 for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++){const k=blockKind(i,j);if(k!=='bld'){const r=blockRect(i,j);c.fillStyle=k==='lake'?'#2f6f9a':'#2f5a33';c.fillRect(X(r[0]),Y(r[2]),(r[1]-r[0])*K,(r[3]-r[2])*K);}}
 c.fillStyle='#6b6e78';for(let i=i0;i<=i1;i++){const h=hwV(i);c.fillRect(X(i*B-h),Y(pz-Rm),2*h*K,2*Rm*K);}for(let j=j0;j<=j1;j++){const h=hwH(j);c.fillRect(X(px-Rm),Y(j*B-h),2*Rm*K,2*h*K);}
 c.fillStyle='#ffd23f';for(let i=i0;i<=i1;i++)if(rinfo(i,0).kind==='main')c.fillRect(X(i*B)-1,Y(pz-Rm),2,2*Rm*K);for(let j=j0;j<=j1;j++)if(rinfo(j,1).kind==='main')c.fillRect(X(px-Rm),Y(j*B)-1,2*Rm*K,2);
 const dot=(x,z,col,r)=>{c.fillStyle=col;c.beginPath();c.arc(X(x),Y(z),r,0,7);c.fill();};
 for(const e of ents){if(e.gone)continue;const t=e.type;if(t==='stn'){c.save();c.translate(X(e.x),Y(e.z));c.fillStyle='#ffd23f';c.strokeStyle='#111';c.lineWidth=2;c.beginPath();c.arc(0,0,10,0,7);c.fill();c.stroke();c.rotate(G.th);c.fillStyle='#111';c.font='800 13px sans-serif';c.fillText('⚡',-6,5);c.restore();continue;}
  if(t==='mama'){dot(e.x,e.z,'#ff4fa0',7);continue;}if(t==='pax'){dot(e.x,e.z,'#fff',8);dot(e.x,e.z,'#22c55e',6);continue;}if(t==='vip'){dot(e.x,e.z,Math.floor(G.t*6)%2?'#ff2020':'#2255ff',9);continue;}
  if(e.ai&&!e.fly){dot(e.x,e.z,e.d.lethal?'#ff5a3c':'#ffb35c',e.d.lethal?4.5:3);}}
 for(const q of CHP)if(q.on&&q.st==='run')dot(q.x,-q.D,'#ff3b30',4);
 if(G.trip){const tx=X(G.trip.x),ty=Y(G.trip.z),d=Math.hypot(tx,ty),lim=S/2-14;const k=d>lim?lim/d:1;c.fillStyle='#20d46a';c.strokeStyle='#fff';c.lineWidth=3;c.beginPath();c.arc(tx*k,ty*k,9,0,7);c.fill();c.stroke();}
 c.restore();c.fillStyle='#ff6fa8';const cx=S/2,cy=S/2;c.beginPath();c.moveTo(cx,cy-14);c.lineTo(cx+9,cy+9);c.lineTo(cx,cy+4);c.lineTo(cx-9,cy+9);c.closePath();c.fill();};
resetGame=function(){for(const e of ents)rmEnt(e);ents=[];for(const [k,c] of cells){world.remove(c.g);disposeChunk(c.g);}cells.clear();for(const [k,g] of chunks){world.remove(g);disposeChunk(g);}chunks.clear();
 let si=0,sj=0;outer:for(let r=0;r<14;r++)for(let i=-r;i<=r;i++)for(let j=-r;j<=r;j++){if(nbOf(i,j)===G.startZone&&rinfo(i,0).kind!=='gali'&&blockKind(i,j)==='bld'&&blockKind(i-1,j)==='bld'){si=i;sj=j;break outer;}}
 const lane=rinfo(si,0).lanes[0];
 Object.assign(G,{x:si*B-lane,D:-(sj*B+B*.62),th:0,cth:0,steer:0,yr:0,ct:1,vx:0,vz:0,sp:0,fuel:100,lives:3,inv:0,shield:0,score:0,pax:0,carried:0,stops:0,zone:nbOf(si,sj),t:0,shake:0,anger:0,mobD:90,mobAct:false,combo:0,comboT:0,bombCd:0,slow:0,won:false,gotWin:false,smashN:0,over:false,reason:'',pocketGain:0,lowSaid:false,vicN:0,rough:0,hw:999,ev:0,gy:0,odo:0,atStn:false,fillT:0,fillCost:0,fullSaid:0,fines:0,turning:null,tyaw:0,
  trip:null,cling:0,heat:0,chaseOn:false,chaseN:0,chaseT:0,beatT:0,bribes:0,vipOn:false,nextVip:450,jy:0,jv:0,maxCombo:0,police:null,runT:0,escapes:0,flT:0,wrongS:false});
 player.userData.heads.forEach(h=>h.visible=false);for(const c of CHP){c.on=false;c.m.visible=false;}clearBubs();['pubchip','shakechip','mamachip','vipchip','polchip','tripchip','wrong','fillchip','bTL','bTR','bU'].forEach(i=>{const el=$(i);if(el)el.style.display='none';});
 G.envSnap=1;G.wasNight=0;
 G.state=G.state==='play'?'play':G.state;gridSync();for(let q=0;q<40;q++)spawnTraffic();};
update=function(dt){G.t+=dt;hornCd-=dt;sigUpdate();poolM.opacity=clamp((G.night-.1)*1.4,0,1);lampHeadM.color.copy(lampOffC).lerp(lampOnC,clamp(G.night*2,0,1));
 if(G.state==='play'&&G.beatT>0){worldUpd(dt);beatUpd(dt);}
 else if(G.state==='play'){worldUpd(dt);playUpd(dt);}
 else worldUpd(dt);
 if(G.state!=='play')A.eng(0,false);
 envUpdate(dt);
 const pz=-G.D;player.position.set(G.x,(G.ev||0)+(G.jy||0),pz);player.rotation.y=-G.th;player.rotation.z=clamp((G.yr||0)*G.sp*.008,-.13,.13);player.rotation.x=0;
 player.userData.wh.forEach(w=>w.rotation.x-=G.sp*dt/.37);player.visible=!(G.inv>0&&Math.floor(G.t*14)%2);ringM.opacity=.3+.25*Math.sin(G.t*7);
 if(player.userData.driver)player.userData.driver.visible=!(G.state==='play'&&SAVE.cam===2)&&!(G.beatT>0)&&!(G.state==='over'&&G.reason==='caught');if(!(G.beatT>0)&&!(G.state==='over'&&G.reason==='caught')){drvOut.visible=false;filmer.visible=false;}
 sun.position.set(G.x-25,45,pz+15);sun.target.position.set(G.x,0,pz);{const sx=Math.sin(G.th),cz2=Math.cos(G.th);head.position.set(G.x+sx*1.2,1.2,pz-cz2*1.2);head.target.position.set(G.x+sx*28,0,pz-cz2*28);}
 mobG.forEach(p=>p.visible=false);
 let cx,cy,cz,lx,ly,lz,fov=66;
 {let d=G.th-(G.cth||0);while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;G.cth=(G.cth||0)+d*Math.min(1,dt*4.2);}
 const sa=Math.sin(G.cth),ca=Math.cos(G.cth);
 if(G.cam==='play'||G.state==='over'){const tb=G.state==='play'&&keys.turbo&&G.fuel>2;fov=66+(tb?9:0)+clamp((Math.abs(G.sp)-14)*.4,0,6);
  let back=SAVE.cam===1?12.5:8.6,up=SAVE.cam===1?5.8:4.3;
  // keep camera out of buildings
  for(let s=1;s<=10;s++){const b=back*s/10,x=G.x-sa*b,z=pz+ca*b;let bl=false;for(const r of solidsNear(x,z)){const pd=r[4]===2?1.9:r[4]===1?.3:-1;if(pd>=0&&x>r[0]-pd&&x<r[1]+pd&&z>r[2]-pd&&z<r[3]+pd){bl=true;break;}}if(bl){back=Math.max(3.2,b-1);up+=(SAVE.cam===1?0:1.2);break;}}
  cx=G.x-sa*back;cz=pz+ca*back;cy=up+(G.ev||0);lx=G.x+sa*12;lz=pz-ca*12;ly=1.3;
  if(G.state==='play'&&SAVE.cam===2){const s2=Math.sin(G.th),c2=Math.cos(G.th);cx=G.x+s2*.55;cz=pz-c2*.55;cy=1.98+(G.ev||0)+(G.jy||0);lx=G.x+s2*22;lz=pz-c2*22;ly=1.3;fov=80;}
  if(G.shake>0){cx+=rnd(-1,1)*G.shake*.05;cy+=rnd(-1,1)*G.shake*.05;}}
 else if(G.cam==='garage'){cx=G.x+3.2*Math.sin(G.t*.5)+2;cy=2.6;cz=pz+5.5;lx=G.x;ly=1.2;lz=pz;}
 else{cx=G.x+Math.sin(G.t*.25)*6;cy=4.2;cz=pz+9;lx=G.x;ly=1.3;lz=pz-8;}
 if(G.beatT>0||(G.state==='over'&&G.reason==='caught')){const bx2=G.bdx!==undefined?G.bdx:G.x,bz2=G.bdD!==undefined?-G.bdD:pz;let ox=bx2-G.x,oz=bz2-pz;const ol=Math.hypot(ox,oz)||1;ox/=ol;oz/=ol;const sw=Math.sin(G.t*.4)*.7,c2=Math.cos(sw),s2=Math.sin(sw),dx2=ox*c2-oz*s2,dz2=ox*s2+oz*c2;cx=bx2+dx2*6.2;cz=bz2+dz2*6.2;cy=3.6;lx=bx2-ox*.6;ly=.5;lz=bz2-oz*.6;fov=58;}
 camPos.set(cx,cy,cz);if(G.camSnap){G.camSnap=0;camera.position.copy(camPos);}else if(G.state==='play')camera.position.lerp(camPos,SAVE.cam===2&&!(G.beatT>0)?1:Math.min(1,dt*8));else camera.position.lerp(camPos,Math.min(1,dt*3));
 camLook.set(lx,ly,lz);camera.lookAt(camLook);camera.fov=lerp(camera.fov,fov,Math.min(1,dt*5));camera.updateProjectionMatrix();
 sunDisc.position.set(camera.position.x+70,48,camera.position.z-235);updPts(dt);
 if(G.rainA>.02){const cp=camera.position;for(let i=0;i<NR;i++){const o=ro[i];o[1]-=45*dt;if(o[1]<0)o[1]+=18;const x=cp.x+o[0],y=o[1],z=cp.z+o[2];rp.set([x,y,z,x-.15,y+.9,z],i*6);}rg.attributes.position.needsUpdate=true;}rain.visible=G.rainA>.02;
 if(G.state==='play')drawMini();updBubs(dt);};
const paverTex=cTex(512,512,(x,w,h)=>{x.fillStyle='#5f5a54';x.fillRect(0,0,w,h);const tw=64,th=32;
 for(let r=0;r<h/th;r++)for(let c=-1;c<w/tw+1;c++){const o=(r%2)*tw/2,X=c*tw+o,Y=r*th,red=((r>>1)+c)%3===0;let R2,G2,B2;
  if(red){R2=150+Math.random()*30;G2=66+Math.random()*16;B2=52+Math.random()*14;}else{const v=150+Math.random()*30;R2=v+6;G2=v;B2=v-8;}
  if(Math.random()<.03){R2*=.45;G2*=.45;B2*=.45;}x.fillStyle='rgb('+(R2|0)+','+(G2|0)+','+(B2|0)+')';x.fillRect(X+2,Y+2,tw-4,th-4);
  x.fillStyle='rgba(255,255,255,.13)';x.fillRect(X+2,Y+2,tw-4,3);x.fillStyle='rgba(0,0,0,.22)';x.fillRect(X+2,Y+th-5,tw-4,3);
  for(let k=0;k<14;k++){x.fillStyle=Math.random()<.5?'rgba(0,0,0,.1)':'rgba(255,255,255,.07)';x.fillRect(X+3+Math.random()*(tw-8),Y+3+Math.random()*(th-8),2,2);}}
 for(let i=0;i<10;i++){x.fillStyle='rgba(30,25,20,'+(.08+Math.random()*.14)+')';x.beginPath();x.ellipse(Math.random()*w,Math.random()*h,10+Math.random()*30,6+Math.random()*18,Math.random()*3,0,7);x.fill();}
 x.strokeStyle='rgba(20,18,16,.55)';x.lineWidth=1.2;for(let i=0;i<5;i++){x.beginPath();let px=Math.random()*w,py=Math.random()*h;x.moveTo(px,py);for(let k=0;k<4;k++){px+=(Math.random()-.5)*30;py+=(Math.random()-.5)*20;x.lineTo(px,py);}x.stroke();}});
paverTex.wrapS=paverTex.wrapT=T.RepeatWrapping;
const kerbTex=cTex(256,64,(x,w,h)=>{x.fillStyle='#bdb7a8';x.fillRect(0,0,w,h);for(let i=0;i<400;i++){x.fillStyle=Math.random()<.5?'rgba(0,0,0,.08)':'rgba(255,255,255,.08)';x.fillRect(Math.random()*w,Math.random()*h,2,2);}x.fillStyle='rgba(40,36,30,.6)';for(let i=0;i<4;i++)x.fillRect(i*64,0,2,h);x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,h-8,w,8);});
kerbTex.wrapS=kerbTex.wrapT=T.RepeatWrapping;
try{const an=Math.min(8,renderer.capabilities.getMaxAnisotropy());paverTex.anisotropy=an;asphT.anisotropy=an;kerbTex.anisotropy=an;}catch(e){}
walkM.map=paverTex;
walkM.color.set('#ffffff');
walkM.needsUpdate=true;
curbSM.map=kerbTex;
curbSM.color.set('#ffffff');
curbSM.needsUpdate=true;
const drvOut=person('#e8e0c8',{pants:'#2b2b3a'});
drvOut.visible=false;
scene.add(drvOut);
const filmer=person('#2c7be5',{pants:'#3a3a3a'});
filmer.visible=false;
scene.add(filmer);
{const ph=bx(.1,.18,.03,'#111',.25,1.45,-.35,filmer);const fl=bx(.06,.06,.02,MB('#ffffff'),.25,1.5,-.37,filmer);filmer.userData.fl=fl;}
spawnCh=function(n,D,x){if(G.beatT>0||G.state!=='play')return;let k=0;const px=PX(),pz=PZ(),fx=Math.sin(G.th),fz=-Math.cos(G.th),iz=-D;
 const cand=ents.filter(e=>!e.gone&&!e.down&&!e.fly&&(e.type==='walker'||e.type==='ped')&&Math.hypot(e.x-x,e.z-iz)<42).sort((a,b)=>Math.hypot(a.x-x,a.z-iz)-Math.hypot(b.x-x,b.z-iz));
 n=Math.max(1,Math.round(n*.75));for(const c of CHP){if(k>=n)break;if(c.on)continue;let sx,sz;const src=cand.shift();
  if(src){sx=src.x;sz=src.z;src.gone=true;c.from='crowd';}
  else{let ok=false;for(let t=0;t<6&&!ok;t++){const back=rnd(15,28),side=(Math.random()<.5?-1:1)*rnd(3,10);sx=px-fx*back-fz*side;sz=pz-fz*back+fx*side;const pp=pushOut(sx,sz,.5);if(pp){sx+=pp[0];sz+=pp[1];}ok=!solidAt(sx,sz);}c.from='behind';}
  c.on=true;c.st='run';c.m.visible=true;c.m.rotation.set(0,0,0);c.m.scale.setScalar(1);c.x=sx;c.D=-sz;c.sp=5+rnd(0,1.3)+Math.min(.8,(G.heat||0)*.05);c.delay=rnd(.5,1.3);c.acc=0;c.t=Math.random()*5;c.slot=-1;c.lt=undefined;c.give=0;
  const ahead=((sx-px)*fx+(sz-pz)*fz)>4;c.mode=ahead||Math.random()<.3?'cut':'run';c.want=[0,1,4][(Math.random()*3)|0];k++;}
 if(k){G.heat=(G.heat||0)+k;G.chaseT=20;if(!G.chaseOn){G.chaseOn=true;A.mob();const c=CHP.find(c=>c.on&&c.st==='run');if(c){G.spk=chPos(c);Vx.speak(pick(MOBL),'bn');}setTimeout(()=>flash('chase'),1200);}}};
chaseUpd=function(dt){const L=CHP.filter(c=>c.on);if(!L.length&&!G.chaseOn)return;let cl=0,act=0;const cs=Math.cos(G.th),sn=Math.sin(G.th);G.chaseT=(G.chaseT||0)-dt;
 const used=new Set(L.filter(c=>c.st==='cling').map(c=>c.slot));const vD=-G.vz,vX=G.vx,spd=Math.abs(G.sp);
 for(const c of L){c.t+=dt;const m=c.m;
  if(c.st==='cling'){cl++;act++;const s=CSLOT[c.slot],[wx,wD]=slotWorld(s);c.x=wx;c.D=wD;m.position.set(c.x,(G.ev||0)+(G.jy||0)+.15+Math.abs(Math.sin(c.t*9))*.07,-c.D);
   m.rotation.set(0,Math.atan2(G.x-c.x,-(G.D-c.D))+(s[1]>1.5?Math.PI:0),Math.sin(c.t*7)*.08);walk(m,c.t*17,.9);m.userData.arms[0].rotation.x=-2.8;m.userData.arms[1].rotation.x=-2.5+Math.sin(c.t*11)*.4;continue;}
  if(c.st==='fall'){c.ft-=dt;c.x+=c.vx*dt;c.D+=c.vD*dt;c.vx*=Math.pow(.15,dt);c.vD*=Math.pow(.15,dt);m.rotation.x=-1.45*Math.min(1,(1.3-c.ft)*6);m.position.set(c.x,.22,-c.D);if(c.ft<=0){m.rotation.x=0;c.st=(G.chaseT>0&&!c.give)?'run':'leave';}continue;}
  if(c.st==='leave'){c.lt=(c.lt===undefined?1.8:c.lt)-dt;const dx=c.x-G.x,dD=c.D-G.D,d=Math.hypot(dx,dD)||1;c.x+=dx/d*1.6*dt;c.D+=dD/d*1.6*dt;m.rotation.set(0,Math.atan2(dx/d,-dD/d),0);walk(m,c.t*5,.4);m.position.set(c.x,.22,-c.D);
   if(c.lt<=0&&d>25){c.on=false;m.visible=false;c.lt=undefined;c.give=0;}else if(c.lt<=0)c.lt=.5;continue;}
  if(c.st!=='run')continue;act++;
  // target: a free side slot of the auto, led ahead for cutters
  let sl=c.want;if(used.has(sl)){sl=[0,1,4,2,3].find(i=>!used.has(i));if(sl===undefined)sl=c.want;}
  let [tx,tD]=slotWorld(CSLOT[sl]);const d0=Math.hypot(tx-c.x,tD-c.D);
  if(c.mode==='cut'&&d0>4){const lead=Math.min(2.2,d0/c.sp);tx+=vX*lead*.85;tD+=vD*lead*.85;}
  const dx=tx-c.x,dD=tD-c.D,d=Math.hypot(dx,dD)||1;
  if(G.chaseT<=0||d>70){c.st='leave';continue;}
  if(c.delay>0){c.delay-=dt;m.rotation.set(0,Math.atan2(dx/d,-dD/d),0);m.position.set(c.x,.22,-c.D);m.userData.arms[1].rotation.x=-2.6+Math.sin(c.t*8)*.3;walk(m,0,0);continue;}
  c.acc=Math.min(1,(c.acc||0)+dt*.7);const sp=c.sp*(.45+.55*c.acc);c.x+=dx/d*sp*dt;c.D+=dD/d*sp*dt;{const pp=pushOut(c.x,-c.D,.35);if(pp){c.x+=pp[0];c.D-=pp[1];}}
  m.rotation.set(0,Math.atan2(dx/d,-dD/d),0);walk(m,c.t*10,.9);m.userData.arms[0].rotation.x=-2.4+Math.sin(c.t*10)*.6;m.userData.arms[1].rotation.x=-.6-Math.sin(c.t*13)*.9;
  const r=onRoad(c.x,-c.D);m.position.set(c.x,(r.inV||r.inH?0:.22)+Math.abs(Math.sin(c.t*13))*.1,-c.D);
  const dc=Math.hypot(G.x-c.x,G.D-c.D);
  if(dc<2.3&&!used.has(sl)&&spd<c.sp+.3&&d<1.8){used.add(sl);c.st='cling';c.slot=sl;A.bump();pop(pick(['ধরে ফেলেছে!','ঝুলে পড়েছে!','কলার ধরেছে!']));G.spk=chPos(c);Vx.speak(pick(MOBL),'bn');}
  else if(Math.random()<dt*.04){G.spk=chPos(c);Vx.speak(pick(MOBL),'bn');}}
 G.cling=cl;G.chaseN=act;const lim=catchLimit();
 if(cl){G.shk=(G.shk||0)+dt*((spd>12?1.2:spd>9?.6:0)+Math.min(2,Math.abs(G.yr||0)*1.9)+(keys.turbo&&spd>8?.5:0));
  if(G.shk>1){G.shk=0;const c=L.find(c=>c.st==='cling');if(c){const s=CSLOT[c.slot];c.st='fall';c.ft=1.3;c.vx=(s[0]||rnd(-1,1))*5*cs;c.vD=G.sp*.25-2;pop('ধপাস!');A.bump();G.cling--;}}
  if(G.cling>=lim||(G.sp<1.8&&(G.slowT=(G.slowT||0)+dt)>1.1)){startBeat();return;}
  if(G.sp>=1.8)G.slowT=0;}else{G.shk=0;G.slowT=0;}
 if(G.chaseOn&&act===0){G.chaseOn=false;G.heat=0;G.escapes=(G.escapes||0)+1;pop('এই যাত্রায় বাঁচলি!');say('জনতার হাত ফসকে পালালি! 😅',1);flash('escape');taskInc('escape',1);}
 $('pubchip').style.display=act>0?'block':'none';if(act>0)setT('pubchip','🏃 পাবলিক পিছে: '+bn(act)+' জন'+(cl?' · ঝুলছে '+bn(cl)+'/'+bn(lim-1):''));$('shakechip').style.display=cl?'block':'none';if(cl)setT('shakechip',cl>=lim-1?'⚠ আর একজন ধরলেই শেষ! টান দাও!':'ঝাঁকাও! টান দাও! ↔');};
startBeat=function(){if(G.beatT>0)return;G.beatT=3.6;G.bt0=0;G.sp=0;G.vx=G.vz=0;for(const k in keys)keys[k]=0;document.querySelectorAll('.cb.on').forEach(b=>b.classList.remove('on'));
 const cs=Math.cos(G.th),sn=Math.sin(G.th),side=Math.random()<.5?-1:1;G.bSide=side;G.bdx=G.x+side*1.0*cs;G.bdD=G.D-side*1.0*sn;
 let i=0;for(const c of CHP){if(i>=9)break;if(!c.on){c.on=true;c.m.visible=true;const [sx,sD]=slotWorld([side*rnd(3,7),rnd(-4,6)]);c.x=sx;c.D=sD;}c.m.scale.setScalar(1);c.m.rotation.set(0,0,0);c.st='beat';c.ang=i/9*Math.PI*2+rnd(-.2,.2);c.rr=rnd(1.25,1.8);c.t=Math.random();c.kick=Math.random()<.4;i++;}
 for(const c of CHP)if(c.on&&c.st!=='beat'){c.on=false;c.m.visible=false;}
 drvOut.visible=true;drvOut.rotation.set(0,0,0);filmer.visible=true;
 A.mob();['pubchip','shakechip','mamachip','vipchip','polchip','tripchip','fillchip'].forEach(i=>$(i).style.display='none');G.spk=null;Vx.speak(pick(MOBL),'bn');$('ctl').style.display='none';};
beatUpd=function(dt){G.beatT-=dt;G.bt0+=dt;const t=G.bt0,cs=Math.cos(G.th),sn=Math.sin(G.th),s=G.bSide;
 // driver dragged out then knocked down
 const out=Math.min(1,t/.7),dX=G.x+s*(1.0+out*1.7)*cs,dD=G.D-s*(1.0+out*1.7)*sn;G.bdx=dX;G.bdD=dD;drvOut.position.set(dX,0,-dD);drvOut.rotation.y=-G.th+s*Math.PI/2;
 if(t<.7){walk(drvOut,t*20,.6);drvOut.userData.arms[0].rotation.x=-1.4;drvOut.userData.arms[1].rotation.x=-1.4;}else{const f=Math.min(1,(t-.7)*5);drvOut.rotation.x=-1.5*f;drvOut.position.y=.22*f;drvOut.userData.arms[0].rotation.x=-2.6;drvOut.userData.arms[1].rotation.x=-2.6;walk(drvOut,0,0);if(t>.9)drvOut.position.x+=Math.sin(t*23)*.03;}
 player.rotation.z=Math.sin(t*9)*.05;
 for(const c of CHP){if(!c.on||c.st!=='beat')continue;c.t+=dt;const tx=dX+Math.sin(c.ang)*c.rr,tD=dD+Math.cos(c.ang)*c.rr,dx=tx-c.x,dd=tD-c.D,d=Math.hypot(dx,dd);
  if(d>.15){const sp=Math.min(d,5*dt);c.x+=dx/d*sp;c.D+=dd/d*sp;walk(c.m,c.t*13,1);}
  else{if(c.kick){const u=c.m.userData;u.legs[0].rotation.x=-1.1*Math.max(0,Math.sin(c.t*9));u.legs[1].rotation.x=0;u.arms[0].rotation.x=-.4;u.arms[1].rotation.x=-.4;}else{const u=c.m.userData;u.arms[0].rotation.x=-1.6+Math.sin(c.t*15)*1.25;u.arms[1].rotation.x=-1.6-Math.sin(c.t*15)*1.25;u.legs[0].rotation.x=0;u.legs[1].rotation.x=0;}}
  c.m.position.set(c.x,Math.abs(Math.sin(c.t*8))*.06,-c.D);c.m.rotation.set(0,Math.atan2(dX-c.x,-(dD-c.D)),0);}
 // bystander filming
 {const fx=dX+s*4.6*cs-sn*1.5,fD=dD-s*4.6*sn-cs*1.5;filmer.position.set(fx,.22,-fD);filmer.rotation.y=Math.atan2(dX-fx,-(dD-fD));const u=filmer.userData;u.arms[1].rotation.x=-1.6;u.arms[0].rotation.x=-1.6;u.fl.visible=Math.floor(t*6)%3===0;}
 G.beatP=(G.beatP||0)-dt;if(t>.75&&G.beatP<=0){G.beatP=.24;A.punch();G.shake=4;burst(dX+rnd(-.5,.5),.8,-dD+rnd(-.5,.5),5,3);if(Math.random()<.5)pop(pick(['ধপাস!','ঠাস!','দুম!','ধাঁই!','ঢিসুম!']));if(Math.random()<.12){G.spk={pos:()=>[dX,2.4,-dD]};Vx.speak(pick(MOBL),'bn');}}
 G.shake=Math.max(0,G.shake-dt*10);hud();A.eng(0,false);if(G.beatT<=0){G.beatT=0;endGame('caught');}};
const CYC=480,NSKY=new T.Color('#141530'),NFOG=new T.Color('#1d1c38'),DUSK=new T.Color('#ff9258'),_c1=new T.Color(),_c2=new T.Color();
envUpdate=function(dt){const Z=ZN[G.zone||0],k=Math.min(1,dt*.25),nf=G.state==='play'||G.state==='over'||G.state==='paused'?todNight():0;
 const daySky=Z.night?'#e8b48a':Z.sky,dayFog=Z.night?'#d9a07c':Z.fog;_c1.set(daySky);_c2.set(dayFog);const tint=4*nf*(1-nf);
 _c1.lerp(DUSK,tint*.45).lerp(NSKY,nf);_c2.lerp(DUSK,tint*.35).lerp(NFOG,nf);
 if(G.envSnap){G.envSnap=0;envC.sky.copy(_c1);envC.fog.copy(_c2);}else{envC.sky.lerp(_c1,k);envC.fog.lerp(_c2,k);}
 scene.background.copy(envC.sky);scene.fog.color.copy(envC.fog);scene.fog.near=40;scene.fog.far=190;
 const amb=lerp(Z.night?.95:Z.amb,.5,nf);hemi.intensity=lerp(hemi.intensity,amb,k*3);sun.intensity=lerp(sun.intensity,(renderer.shadowMap.enabled?1.05:.8)*(1-nf*.85),k*3);
 G.night=nf;head.intensity=nf*1.7;G.rainA=lerp(G.rainA,G.zone===3?1:0,Math.min(1,dt*.3));rain.material.opacity=.5*G.rainA;sunDisc.material.color.copy(envC.sky).lerp(new T.Color(nf>.5?'#e8eaff':'#fff4c8'),.7);
 if(G.state==='play'){const was=G.wasNight||0,isN=nf>.6?1:nf<.2?0:was;if(isN!==was){G.wasNight=isN;say(isN?'🌙 সন্ধে নামল — আলো জ্বলে উঠল':'🌅 ভোর হল',1);}}};
