'use strict';
/* kolkata: state and start-up code */
for(const m of[whM,yelM,poolM,ringM])if(m){m.polygonOffset=true;m.polygonOffsetFactor=-2;m.polygonOffsetUnits=-4;}
(function(){const q0=quadM;quadM=function(g,mat,...a){if(mat&&!mat.polygonOffset){mat.polygonOffset=true;mat.polygonOffsetFactor=-1;mat.polygonOffsetUnits=-2;}return q0(g,mat,...a);};})();
camera.near=.45;
camera.updateProjectionMatrix();
sun.shadow.bias=-.0006;
if('normalBias' in sun.shadow)sun.shadow.normalBias=.04;
const ROUTES=['S-12 হাওড়া ⇄ গড়িয়া','45 ধর্মতলা ⇄ বারাসাত','L-9 শিয়ালদা ⇄ বেহালা','215 হাওড়া ⇄ সল্টলেক','AC-6 এয়ারপোর্ট ⇄ টালিগঞ্জ','12C বাবুঘাট ⇄ যাদবপুর'];
const routeMats={};
const truckBack=new T.MeshLambertMaterial({map:cTex(256,160,(x,w,h)=>{x.fillStyle='#e8a33a';x.fillRect(0,0,w,h);x.fillStyle='#b5261e';x.fillRect(0,0,w,18);x.fillRect(0,h-18,w,18);for(let k=0;k<10;k++){x.fillStyle=k%2?'#1d6f42':'#1f4fa3';x.beginPath();x.arc(14+k*25,30,9,0,7);x.fill();}
 x.fillStyle='#111';x.textAlign='center';x.font='800 34px sans-serif';x.fillText('HORN OK',w/2,82);x.font='800 26px sans-serif';x.fillText('PLEASE',w/2,112);x.font='700 15px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillStyle='#b5261e';x.fillText('রাতে ডিপার দিন',w/2,136);})});
(function(){const m0=mk;mk=function(type,col,w,sd){if(type==='bus')return kolBus();if(type==='lorry')return kolLorry();return m0(type,col,w,sd);};
 const p0=pickV;pickV=function(gali){if(!gali){const r=Math.random();if(r<.13)return'bus';if(r<.21)return'lorry';}return p0(gali);};})();
const railM=MB('#5b5e63');
railM.polygonOffset=true;
railM.polygonOffsetFactor=-2;
railM.polygonOffsetUnits=-4;
(function(){const rm=roadMarks;roadMarks=function(g,R,i,j){rm(g,R,i,j);if(CITY!==0)return;const V=rinfo(i,0),H=rinfo(j,1);
 if(V.kind==='main'){const x=i*B,z0=j*B+hwH(j),z1=(j+1)*B-hwH(j+1),L=z1-z0,zc=(z0+z1)/2;for(const s of[-1,1])for(const o of[-.72,.72])bx(.09,.02,L,railM,x+s*V.lanes[0]+o,.024,zc,g);}
 if(H.kind==='main'){const z=j*B,x0=i*B+hwV(i),x1=(i+1)*B-hwV(i+1),L=x1-x0,xc=(x0+x1)/2;for(const s of[-1,1])for(const o of[-.72,.72])bx(L,.02,.09,railM,xc,.024,z+s*H.lanes[0]+o,g);}};})();
var tramE=null,tramT=20;
window.__tram=()=>{tramT=0;};
const ROADS_V=[['চৌরঙ্গী রোড','Chowringhee Rd'],['এজেসি বোস রোড','AJC Bose Rd'],['ক্যামাক স্ট্রিট','Camac St'],['রাসবিহারী অ্যাভিনিউ','Rashbehari Ave'],['স্ট্র্যান্ড রোড','Strand Rd'],['সিআর অ্যাভিনিউ','CR Avenue'],['কলেজ স্ট্রিট','College St'],['বিধান সরণি','Bidhan Sarani'],['এসপি মুখার্জি রোড','SP Mukherjee Rd'],['গড়িয়াহাট রোড','Gariahat Rd']];
const ROADS_H=[['পার্ক স্ট্রিট','Park St'],['লেনিন সরণি','Lenin Sarani'],['মহাত্মা গান্ধী রোড','MG Road'],['বিবেকানন্দ রোড','Vivekananda Rd'],['শেক্সপিয়র সরণি','Shakespeare Sarani'],['রবীন্দ্র সরণি','Rabindra Sarani'],['লোয়ার সার্কুলার রোড','Lower Circular Rd'],['বেলেঘাটা মেন রোড','Beleghata Main Rd'],['ডায়মন্ড হারবার রোড','Diamond Harbour Rd'],['আচার্য প্রফুল্ল চন্দ্র রোড','APC Road']];
const ROADS_X=[[['হিলকার্ট রোড','Hill Cart Rd'],['সেবক রোড','Sevoke Rd'],['বিধান রোড','Bidhan Rd']],[['জিটি রোড','GT Road'],['বিসি রোড','BC Road'],['স্টেশন রোড','Station Rd']],[['নেহরু রোড','Nehru Rd'],['সিটি সেন্টার রোড','City Centre Rd']],[['জিটি রোড','GT Road'],['এসবি গরাই রোড','SB Gorai Rd']],[['সেন্ট্রাল পার্ক রোড','Central Park Rd'],['বি-ব্লক রোড','B-Block Rd']],[['এনএইচ ১২','NH-12'],['রথবাড়ি রোড','Rathbari Rd']],[['লালবাগ রোড','Lalbagh Rd'],['হাজারদুয়ারি রোড','Hazarduari Rd']]];
const rnMats={};
(function(){const ce=cellExtras;cellExtras=function(g,R,i,j,cel){ce(g,R,i,j,cel);const V=rinfo(i,0),H=rinfo(j,1);if(V.kind==='gali'&&H.kind==='gali'&&R()<.6)return;
 const x=i*B+V.hw+SWW*.55,z=j*B+H.hw+SWW*.55;bx(.08,3.2,.08,'#3b3f44',x,1.6,z,g);
 const a=new T.Mesh(signGeo,rnMat(roadName(i,0)));a.scale.set(1.5,.48,1);a.position.set(x-.05,3.05,z);a.rotation.y=-Math.PI/2;g.add(a);const a2=a.clone();a2.rotation.y=Math.PI/2;a2.position.x=x+.05;g.add(a2);
 const b=new T.Mesh(signGeo,rnMat(roadName(j,1)));b.scale.set(1.5,.48,1);b.position.set(x,2.5,z-.05);b.rotation.y=Math.PI;g.add(b);const b2=b.clone();b2.rotation.y=0;b2.position.z=z+.05;g.add(b2);};})();
const DEB=[],debG=new T.BoxGeometry(1,1,1),sparkM=new T.MeshBasicMaterial({color:'#ffd27a',transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false}),dustM=new T.MeshLambertMaterial({color:'#b8aa94',transparent:true,opacity:.5,depthWrite:false});
const debMs=['#d4a017','#9aa0a8','#222','#c0392b','#e9e9e9'].map(c=>new T.MeshLambertMaterial({color:c,transparent:true}));
const SHK={a:0,w:0,o:new T.Vector3(),pr:0};
scene.onBeforeRender=function(){const t=performance.now()/1000;SHK.o.set(Math.sin(t*61)*SHK.a*.35,Math.sin(t*47+1)*SHK.a*.25,Math.cos(t*53)*SHK.a*.3);camera.position.add(SHK.o);SHK.pr=player.rotation.z;player.rotation.z+=Math.sin(t*28)*SHK.w;};
scene.onAfterRender=function(){camera.position.sub(SHK.o);player.rotation.z=SHK.pr;};
(function(){const c0=A.crash,s0=A.smash,b0=A.bump;A.crash=function(...a){try{crashFx(1.4);}catch(_){}return c0.apply(this,a);};A.smash=function(...a){try{crashFx(1);}catch(_){}return s0.apply(this,a);};A.bump=function(...a){try{if(G.state==='play')crashFx(.45);}catch(_){}return b0.apply(this,a);};})();
(function(){const eu=envUpdate;envUpdate=function(dt){try{eu(dt);}catch(err){}const d=Math.min(dt,.05);SHK.a*=Math.pow(.02,d);SHK.w*=Math.pow(.03,d);try{debUpdate(d);}catch(err){}try{tramUpdate(d);}catch(err){}try{snapSun();}catch(err){}};})();
(function(){const p0=paxOnMyRoad;paxOnMyRoad=function(e){const now=performance.now(),ok=p0(e);if(ok){e.seenT=now;return true;}return e.seenT&&now-e.seenT<2500;};})();
window.__dbg2={tramUpdate,crashFx};
var HB=null;
var MAIDAN=new Set(['-1,-1','-2,-1','-1,0','-2,0']);
(function(){const bk=blockKind;blockKind=function(i,j){if(CITY===0){const h=hbSpot();if(j===h.j&&(i===h.i||i===h.i-1))return'lake';if(MAIDAN.has(i+','+j))return'park';}return bk(i,j);};})();
const steelM=M('#6f7c84'),steel2=M('#596870');
(function(){const ce=cellExtras;cellExtras=function(g,R,i,j,cel){ce(g,R,i,j,cel);if(CITY!==0)return;const h=hbSpot();if(i===h.i&&j===h.j){const V=rinfo(i,0),z0=j*B+hwH(j),z1=(j+1)*B-hwH(j+1);howrahBridge(g,i*B,z0,z1,V.hw);}
 if(MAIDAN.has(i+','+j)&&R()<.5){const br=blockRect(i,j);lmSign(g,'ময়দান',(br[0]+br[1])/2,br[3]-1.5,0);}};})();
window.__hb=()=>hbSpot();
const SND={"engine":"assets/sfx/engine.mp3","horn":"assets/sfx/horn.mp3","horn2":"assets/sfx/horn2.mp3","airhorn":"assets/sfx/airhorn.mp3","carhorn":"assets/sfx/carhorn.mp3","crash":"assets/sfx/crash.mp3","bump":"assets/sfx/bump.mp3","punch":"assets/sfx/punch.mp3","whistle":"assets/sfx/whistle.mp3","siren":"assets/sfx/siren.mp3","crowd":"assets/sfx/crowd.mp3","shout1":"assets/sfx/shout1.mp3","shout2":"assets/sfx/shout2.mp3","skid":"assets/sfx/skid.mp3","bell":"assets/sfx/bell.mp3","amb":"assets/sfx/amb.mp3","hiss":"assets/sfx/hiss.mp3"};
A.engine=function(){};
(function(){const i0=A.init;A.init=function(){i0.call(this);if(this.ctx)this.loadS();};})();
Object.assign(A,{buf:{},
 loadS(){if(this.sl||!this.ctx)return;this.sl=1;const c=this.ctx;
  try{if(this.eo){this.eo.disconnect();this.eg.disconnect();}}catch(e){}
  try{const cp=c.createDynamicsCompressor();cp.threshold.value=-14;cp.knee.value=10;cp.ratio.value=4;cp.attack.value=.004;cp.release.value=.2;this.master.disconnect();this.master.connect(cp);cp.connect(c.destination);this.master.gain.value=.8;}catch(e){}
  this.sfx=c.createGain();this.sfx.connect(this.master);
  const got=(k,ab)=>c.decodeAudioData(ab,b=>{this.buf[k]=b;if(k==='engine')this.engS();if(k==='amb')this.ambS();},()=>{});
  for(const k in SND){try{const v=SND[k];if(/\.(mp3|ogg|wav|m4a)$/i.test(v)){fetch(v).then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(ab=>got(k,ab)).catch(()=>{});}
   else{const bin=atob(v),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);got(k,u.buffer);}}catch(e){}}},
 loop(k,vol){const c=this.ctx,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=this.buf[k];s.loop=true;f.type='lowpass';f.frequency.value=1800;g.gain.value=0;s.connect(f);f.connect(g);g.connect(this.master);s.start();return{s,f,g};},
 engS(){this.E=this.loop('engine');},
 ambS(){this.AM=this.loop('amb');this.AM.f.frequency.value=5000;},
 eng(sp,play,th,rain){if(!this.ctx)return;const t=this.ctx.currentTime,on=play&&this.on,a=Math.abs(sp||0);
  if(this.E){this.E.s.playbackRate.setTargetAtTime(.62+Math.min(a,30)*.042+(th?.08:0),t,.15);this.E.g.gain.setTargetAtTime(on?(th?.42:.26)+Math.min(a,25)*.004:0,t,.12);this.E.f.frequency.setTargetAtTime(th?3200:1500,t,.2);}
  else if(this.eo){this.eo.frequency.setTargetAtTime(46+a*2.4,t,.12);this.eg.gain.setTargetAtTime(on?.04:0,t,.12);}
  if(this.AM){const nt=G.night||0;this.AM.g.gain.setTargetAtTime(on?.32*(1-nt*.45):0,t,.5);}},
 ps(k,v,rate,at){const b=this.buf[k];if(!b||!this.ctx||!this.on)return false;const c=this.ctx,s=c.createBufferSource(),g=c.createGain();s.buffer=b;s.playbackRate.value=rate||1;g.gain.value=v==null?1:v;s.connect(g);g.connect(this.sfx||this.master);s.start(c.currentTime+(at||0));return true;}});
const _A0={};
for(const k of['horn','crash','smash','bump','punch','siren','whistle','mob','bell','tring','bomb','turbo','airhorn','dhorn','skid','screech','police','vboom','scrape','pothole','dhoom','knock'])_A0[k]=A[k];
const _sv=(k,f)=>{A[k]=function(...a){if(!f.apply(this,a)&&_A0[k])_A0[k].apply(this,a);};};
_sv('horn',function(){return this.ps(Math.random()<.5?'horn':'horn2',.75,rnd(.96,1.04));});
_sv('crash',function(){return this.ps('crash',.95,rnd(.92,1.05));});
_sv('smash',function(){this.ps('bump',.6);return this.ps('crash',.75,rnd(1.05,1.2));});
_sv('bump',function(){return this.ps('bump',.7,rnd(.85,1.15));});
_sv('pothole',function(){return this.ps('bump',.85,.75);});
_sv('scrape',function(){return this.ps('skid',.35,.7);});
_sv('punch',function(){return this.ps('punch',.9,rnd(.85,1.15));});
_sv('knock',function(){return this.ps('punch',.6,.8)&&this.ps('punch',.6,.85,.17)&&this.ps('punch',.6,.8,.38);});
_sv('siren',function(){return this.ps('siren',.45);});
_sv('police',function(){return this.ps('whistle',.5);});
_sv('whistle',function(){return this.ps('whistle',.45,rnd(.95,1.05));});
_sv('mob',function(){const r=this.ps('crowd',.6,rnd(.9,1.1));this.ps(Math.random()<.5?'shout1':'shout2',.55,rnd(.9,1.15),.2);return r;});
_sv('bell',function(){return this.ps('bell',.55);});
_sv('tring',function(){return this.ps('bell',.45,1.1);});
_sv('bomb',function(){return this.ps('crash',.9,.55);});
_sv('dhoom',function(){return this.ps('crash',.6,.7);});
_sv('vboom',function(){return this.ps('crash',.8,.5);});
_sv('turbo',function(){return this.ps('hiss',.5);});
_sv('airhorn',function(v){return this.ps('airhorn',.55*(v||1),rnd(.95,1.05));});
_sv('dhorn',function(){const k=pick(['horn','horn2','carhorn','carhorn']);return this.ps(k,rnd(.08,.16),rnd(.85,1.15));});
_sv('skid',function(v){return this.ps('skid',.4*(v||1),rnd(.9,1.1));});
_sv('screech',function(){return this.ps('skid',.5);});
camera.far=215;
camera.updateProjectionMatrix();
