'use strict';
/* toto-city: state and start-up code */
buildAuto=function(){const g=totoModel(paintMat,chassisMat,0);stickerMesh=planeTex(tagTex('টোটো দাদা','#1d7f4a','#fff',34),1.1,.36,true);stickerMesh.position.set(0,1.0,1.52);g.add(stickerMesh);return g;};
(function(){const bta=buildTrafficAuto;buildTrafficAuto=function(){if(Math.random()<.55){const c=pick(['#2e86de','#1d9e5a','#e8e8e8','#f2b01e','#c0392b','#16a085']);return totoModel(M(c),M('#26282d'),(Math.random()*5)|0);}return bta();};})();
var CK=[['vm','wb','sm','hc'],['tea','ct','tea'],['cg','ct'],['chim','ct','chim'],['chim','coal','ct'],['ct','tea'],['mango','adn','mango'],['hz','ct','hz']];
var LM_POS=['1,-2','-2,1','2,2','-1,-3'];
(function(){const bk=blockKind;blockKind=function(i,j){const L=CK[CITY]||CK[0],q=LM_POS.indexOf(i+','+j);if(q>=0)return L[q%L.length];if(Math.abs(i)+Math.abs(j)>4){const r=h2(i*13+1,j*29-7);if(r<.08)return L[((r*1000)|0)%L.length];}const k=bk(i,j);if(CITY===5&&k==='bld'&&h2(i*7-3,j*11+5)<.22)return'park';return k;};})();
var LMK=new Set(['vm','wb','sm','hc','tea','ct','cg','chim','coal','mango','adn','hz']);
var marbleM=new T.MeshLambertMaterial({color:'#f3efe6'}),marble2=new T.MeshLambertMaterial({color:'#e4ddcf'});
var domeG=new T.SphereGeometry(1,24,12,0,Math.PI*2,0,Math.PI/2);
var wbTex=cTex(512,128,(x,w,h)=>{x.fillStyle='#a8432c';x.fillRect(0,0,w,h);for(let yy=0;yy<h;yy+=6){x.fillStyle=yy%12?'#9c3c27':'#b04a31';x.fillRect(0,yy,w,1);}
 for(let i=0;i<16;i++){const cx=i*32+16;x.fillStyle='#efe3c8';x.fillRect(cx-15,0,4,h);for(let f=0;f<3;f++){const fy=8+f*40;x.fillStyle='#2b2a2e';x.beginPath();x.moveTo(cx-7,fy+30);x.lineTo(cx-7,fy+10);x.arc(cx,fy+10,7,Math.PI,0);x.lineTo(cx+7,fy+30);x.fill();x.fillStyle='#efe3c8';x.fillRect(cx-9,fy+30,18,3);}}
 x.fillStyle='#efe3c8';x.fillRect(0,38,w,3);x.fillRect(0,78,w,3);x.fillRect(0,h-6,w,6);});
wbTex.wrapS=T.RepeatWrapping;
const FILMS=[['বজ্রপাত','এক গরিব রিকশাওয়ালার প্রতিশোধ','#5b0e0e','#ffb703'],['শেষ লোকাল','রাত ১১:৪০-এর ট্রেনে প্রেম','#0d1b3d','#8ecae6'],['ভালোবাসার টোটো','শহরজুড়ে হাসির ঝড়','#7b1e5a','#ffd6e8'],['ময়দানের রাজা','ফুটবল · ঘাম · গৌরব','#14532d','#bbf7d0'],['গঙ্গার ওপারে','পারিবারিক মেলোড্রামা','#3b2f13','#fde68a'],['রক্তে লেখা নাম','অ্যাকশন ধামাকা','#1f1f1f','#ef4444']];
const filmMats=FILMS.map(a=>new T.MeshLambertMaterial({map:cTex(160,224,(x,w,h)=>{const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,a[2]);gr.addColorStop(1,'#000');x.fillStyle=gr;x.fillRect(0,0,w,h);
 x.fillStyle=a[3];x.globalAlpha=.25;x.beginPath();x.arc(w*.5,h*.38,52,0,7);x.fill();x.globalAlpha=1;
 x.fillStyle='#0008';x.beginPath();x.arc(w*.38,h*.33,17,0,7);x.fill();x.fillRect(w*.38-22,h*.33+16,44,60);x.beginPath();x.arc(w*.64,h*.37,14,0,7);x.fill();x.fillRect(w*.64-18,h*.37+13,36,50);
 x.fillStyle=a[3];x.textAlign='center';x.font='800 28px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText(a[0],w/2,h*.74,w-12);x.fillStyle='#fff';x.font='600 12px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText(a[1],w/2,h*.83,w-12);
 x.fillStyle='#ffd23f';x.font='700 11px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText('শুক্রবার থেকে · রূপকথা সিনেমা',w/2,h*.93,w-8);})}));
const NOTES=[['কাজ চাই','ড্রাইভার / রাঁধুনি / আয়া','যোগাযোগ: ৯৮XXX XXXXX'],['কাজ চাই','গ্র্যাজুয়েট, যেকোনো কাজ','ফোন: ৭০XXX XXXXX'],['পাত্রী চাই','সুশ্রী, ঘরোয়া','বক্স নং ১৪২'],['বাড়ি ভাড়া','১ BHK, জল-লাইট সহ','দোতলা, মেয়েদের জন্য'],['জ্যোতিষী বাবা','সব সমস্যার সমাধান','গ্যারান্টি সহ!'],['কম্পিউটার শিখুন','মাত্র ৯৯৯ টাকায়','ভর্তি চলছে']];
const noteMats=NOTES.map(a=>new T.MeshLambertMaterial({map:cTex(128,150,(x,w,h)=>{x.fillStyle=pick(['#fffbe8','#fde2e4','#e0f2fe','#fef3c7']);x.fillRect(0,0,w,h);x.fillStyle='#b91c1c';x.textAlign='center';x.font='800 24px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText(a[0],w/2,34,w-8);x.fillStyle='#1f2937';x.font='600 14px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText(a[1],w/2,72,w-8);x.font='600 12px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText(a[2],w/2,100,w-8);for(let k=0;k<6;k++){x.fillStyle='#1f2937';x.fillRect(10+k*19,118,2,26);}})}));
const fineM=new T.MeshLambertMaterial({map:cTex(256,128,(x,w,h)=>{x.fillStyle='#fff';x.fillRect(0,0,w,h);x.strokeStyle='#c0261d';x.lineWidth=8;x.strokeRect(4,4,w-8,h-8);x.fillStyle='#c0261d';x.textAlign='center';x.font='800 24px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText('এখানে প্রস্রাব করিলে',w/2,48);x.font='800 30px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText('৫০০ টাকা জরিমানা',w/2,92);x.font='600 13px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillStyle='#333';x.fillText('— পৌরসভা',w/2+70,116);})});
(function(){const ce=cellExtras;cellExtras=function(g,R,i,j,cel){ce(g,R,i,j,cel);const k=blockKind(i,j);if(k!=='bld')return;const br=blockRect(i,j);
 const edges=[[br[0],null,-1,0],[br[1],null,1,0],[null,br[2],0,-1],[null,br[3],0,1]];
 const spot=(e,t)=>{const [ex,ez,nx,nz]=e;return{x:ex!==null?ex:br[0]+t*(br[1]-br[0]),z:ez!==null?ez:br[2]+t*(br[3]-br[2]),nx,nz,ry:Math.atan2(nx,nz)};};
 // film posters + job notices clusters
 for(let n=0;n<3;n++){const p=spot(edges[(R()*4)|0],.1+R()*.8);const off=v=>[p.x+p.nx*.05+(p.nz?v:0),p.z+p.nz*.05+(p.nx?v:0)];
  if(R()<.55){for(let q=0;q<1+((R()*3)|0);q++){const [x,z]=off(q*1.15-1);quadM(g,pick(filmMats),x,1.75,z,1.05,1.45,p.ry);}}
  else{for(let q=0;q<2+((R()*3)|0);q++){const [x,z]=off(q*.7-.9);quadM(g,pick(noteMats),x,1.35+(q%2)*.2,z,.55,.65,p.ry);}}}
 // big film hoarding on some corners
 if(R()<.3){const e=edges[(R()*4)|0],p=spot(e,R()<.5?.1:.9);const sub=new T.Group();sub.position.set(p.x+p.nx*1.2,0,p.z+p.nz*1.2);sub.rotation.y=p.ry;g.add(sub);bx(.18,4,.18,'#333',-1.6,2,0,sub);bx(.18,4,.18,'#333',1.6,2,0,sub);quadM(sub,pick(filmMats),0,5.6,.06,3.4,4.6,0);cel.sol&&cel.sol.push([p.x+p.nx*1.2-.4,p.x+p.nx*1.2+.4,p.z+p.nz*1.2-.4,p.z+p.nz*1.2+.4,2]);}
 // fine sign, and sometimes a man ignoring it
 if(R()<.4){const p=spot(edges[(R()*4)|0],.15+R()*.7);quadM(g,fineM,p.x+p.nx*.05,2.2,p.z+p.nz*.05,1.5,.75,p.ry);
  if(R()<.6){const m=person(pick(['#3b6ea5','#c9b27a','#7d8a5a','#e8e0c8']));m.position.set(p.x+p.nx*.55+(p.nz?.3:0),.22,p.z+p.nz*.55+(p.nx?.3:0));m.rotation.y=p.ry+Math.PI;const u=m.userData;if(u&&u.arms){u.arms[0].rotation.x=-.5;u.arms[1].rotation.x=-.5;}g.add(m);
   const st=new T.Mesh(UB,M('#c8b45a'));st.scale.set(.5,.02,.35);st.position.set(p.x+p.nx*.12+(p.nz?.3:0),.24,p.z+p.nz*.12+(p.nx?.3:0));g.add(st);}}
};})();
const beamTex=cTex(16,128,(x,w,h)=>{const gr=x.createLinearGradient(0,h,0,0);gr.addColorStop(0,'rgba(255,255,255,.95)');gr.addColorStop(.35,'rgba(255,255,255,.35)');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.fillRect(0,0,w,h);});
const beamG=new T.CylinderGeometry(1,1,1,20,1,true);
const padTex=cTex(256,256,(x,w,h)=>{x.translate(w/2,h/2);x.strokeStyle='#fff';x.lineWidth=10;x.setLineDash([26,16]);x.beginPath();x.arc(0,0,108,0,7);x.stroke();x.setLineDash([]);x.fillStyle='rgba(255,255,255,.18)';x.beginPath();x.arc(0,0,100,0,7);x.fill();
 x.fillStyle='#fff';x.beginPath();x.moveTo(18,-80);x.lineTo(-44,12);x.lineTo(-4,12);x.lineTo(-22,80);x.lineTo(46,-14);x.lineTo(6,-14);x.closePath();x.fill();});
const ringTex=cTex(256,256,(x,w,h)=>{x.translate(w/2,h/2);const gr=x.createRadialGradient(0,0,60,0,0,124);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.7,'rgba(255,255,255,.85)');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.beginPath();x.arc(0,0,124,0,7);x.fill();});
const FXM=new Map();
(function(){const eu=envUpdate;envUpdate=function(dt){eu(dt);try{fxUpdate();}catch(err){}};})();
const hbar=new T.Group();
(function(){const g=hbar;
 bx(1.15,.05,.05,'#c9ced6',0,0,0,g);[-1,1].forEach(s=>{bx(.22,.09,.09,'#2a2a2a',s*.6,0,0,g);const hand=bx(.12,.12,.2,'#8a5a3c',s*.6,.02,.08,g);bx(.03,.42,.03,'#222',s*.38,.21,.02,g).rotation.z=-s*.25;const mr=cy(.1,.03,'#d9dde3',s*.46,.44,0,g);mr.rotation.x=Math.PI/2;});
 cy(.13,.12,'#222',0,.07,-.02,g);bx(.12,.03,.06,MB('#5cf29a'),0,.14,-.04,g);
 for(let k=0;k<11;k++){const t=k/10,x=-.42+t*.84,y=-.06-Math.sin(t*Math.PI)*.12;bx(.06,.06,.06,k%2?'#ffb703':'#fb8500',x,y,.02,g);}
 for(let k=0;k<6;k++)bx(.06,.07,.06,['#e63946','#ffd23f','#2a9d8f','#3a86ff','#f72585','#80ed99'][k],0,-.08-k*.08,0,g);
 g.position.set(0,-.78,-1.35);g.scale.setScalar(.72);g.rotation.x=.15;g.visible=false;g.traverse(o=>{if(o.material){o.renderOrder=5;}});})();
camera.add(hbar);
if(!camera.parent)scene.add(camera);
(function(){const eu=envUpdate;envUpdate=function(dt){eu(dt);hbar.visible=G.state==='play'&&SAVE.cam===2&&!(G.beatT>0);};})();
const mtnG=new T.Group();
(function(){const mb=new T.MeshBasicMaterial({color:'#7d93b5',fog:false}),ms=new T.MeshBasicMaterial({color:'#f4f7fb',fog:false}),mb2=new T.MeshBasicMaterial({color:'#6a7fa0',fog:false});
 for(let k=0;k<22;k++){const a=-Math.PI/2+(k/21-.5)*2.2,r=178,h=22+Math.random()*30,w=18+Math.random()*16;const c=new T.Mesh(new T.ConeGeometry(w,h,5),k%2?mb:mb2);c.position.set(Math.cos(a)*r,h/2-4,Math.sin(a)*r);g2(c);
  if(h>34){const s=new T.Mesh(new T.ConeGeometry(w*.32,h*.32,5),ms);s.position.set(c.position.x,h-4-h*.16+.4,c.position.z);g2(s);}}
 function g2(m){m.renderOrder=-5;mtnG.add(m);}mtnG.visible=false;scene.add(mtnG);})();
(function(){const eu=envUpdate;envUpdate=function(dt){eu(dt);mtnG.visible=CITY===1;if(mtnG.visible){mtnG.position.set(camera.position.x,0,camera.position.z);const nf=G.night||0;mtnG.children.forEach(m=>{m.material.color.setScalar?0:0;});}};})();
const boothSign=new T.MeshLambertMaterial({map:cTex(256,64,(x,w,h)=>{x.fillStyle='#1d3f8f';x.fillRect(0,0,w,h);x.fillStyle='#fff';x.textAlign='center';x.font='800 30px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText('ট্রাফিক পুলিশ',w/2,44);})});
(function(){const ce=cellExtras;cellExtras=function(g,R,i,j,cel){ce(g,R,i,j,cel);if(blockKind(i,j)!=='bld'||R()>.3)return;const kv=rinfo(i,0).kind,kh=rinfo(j,1).kind;if(kv==='gali'&&kh==='gali')return;
 const cr=curbRect(i,j),x=cr[0]+1.6,z=cr[2]+1.6;policeBooth(g,x,z,Math.PI*.75);cel.sol&&cel.sol.push([x-1,x+1,z-1,z+1,0]);};})();
const PROC_SL=['আমাদের দাবি মানতে হবে!','পাড়ার রাস্তা সারাও','জলের লাইন চাই','বাজারদর কমাও','টোটো স্ট্যান্ড চাই','হকার উচ্ছেদ চলবে না','পুজোর চাঁদা কমাও!','খেলার মাঠ বাঁচাও'];
const DEFS_PROC={w:5.6,l:9,v:[0,0],b:0,solid:1};
var procE=null,procT=25;
window.__proc=()=>{procT=0;};
(function(){const eu=envUpdate;envUpdate=function(dt){eu(dt);try{procUpdate(dt);}catch(err){}};})();
const SAREE=['#c2185b','#e65100','#2e7d32','#1565c0','#6a1b9a','#f9a825','#d32f2f','#00838f','#fbe9e7'],LUNGI=['#2e4a7d','#1f6f50','#6b2c3a','#3b3b6b'];
personBoxes=function(x,y,z,ry,h,list){const r=Math.random(),sk=pick(CSK),hair='#1c1410';
 const B=(ox,oy,oz,w,hh,d,col)=>{const [px,pz]=rotOff(x,z,ry,ox,oz);list.push([px,y+oy,pz,w,hh,d,ry,col]);};
 if(r<.3){/* woman in saree */const s=pick(SAREE);h*=.94;B(0,.5*h,0,.46,1.0*h,.34,s);B(0,1.18*h,0,.46,.5*h,.28,pick(['#fff3e0',s,'#ffe082']));B(.12,1.15*h,.02,.2,.55*h,.32,s);B(0,1.62*h,0,.28,.3,.28,sk);B(0,1.8*h,-.02,.3,.1,.32,hair);B(0,1.66*h,-.18,.18,.18,.14,hair);
  if(Math.random()<.35)B(.32,.9*h,.05,.3,.3,.3,pick(['#8d6e63','#ffb300','#e0e0e0']));return;}
 if(r<.42){/* child */h*=.6;B(0,.4*h,0,.32,.8*h,.24,pick(CPT));B(0,1.14*h,0,.42,.68*h,.26,pick(['#ff7043','#29b6f6','#ffee58','#ab47bc','#fff']));B(0,1.7*h,0,.3,.32,.3,sk);B(0,1.88*h,0,.32,.08,.32,hair);return;}
 if(r<.54){/* elderly with stick */B(0,.44*h,0,.36,.88*h,.3,'#f5f5f0');B(0,1.12*h,.04,.5,.62*h,.3,pick(['#f5f5f0','#d7ccc8','#bcaaa4']));B(0,1.6*h,.08,.28,.28,.28,sk);B(0,1.76*h,.08,.3,.07,.3,'#e0e0e0');B(.36,.55*h,.22,.05,1.1*h,.05,'#6d4c41');return;}
 if(r<.64){/* porter (মুটে) with load on head */B(0,.4*h,0,.34,.8*h,.28,pick(LUNGI));B(0,1.14*h,0,.52,.68*h,.3,pick(['#9e9e9e','#795548','#fafafa']));B(0,1.66*h,0,.3,.3,.3,sk);B(0,1.84*h,0,.34,.06,.34,'#c62828');B(0,2.12*h,0,.7,.5,.55,pick(['#a1887f','#d7ccc8','#8d6e63','#efebe9']));return;}
 if(r<.72){/* hawker with basket */B(0,.4*h,0,.34,.8*h,.28,pick(LUNGI));B(0,1.14*h,0,.52,.68*h,.3,pick(CSH));B(0,1.66*h,0,.3,.3,.3,sk);B(0,1.84*h,0,.32,.08,.32,hair);B(0,1.98*h,0,.62,.2,.62,'#b58b4c');
  for(let k=0;k<4;k++)B(-.16+(k%2)*.32,2.12*h,-.16+(k>>1)*.32,.2,.14,.2,pick(['#ffca28','#e53935','#43a047','#fb8c00']));return;}
 /* man: shirt+pants or lungi */const sh=pick(CSH),pn=Math.random()<.35?pick(LUNGI):pick(CPT);B(0,.4*h,0,.34,.8*h,.28,pn);B(0,1.14*h,0,.52,.68*h,.3,sh);B(0,1.66*h,0,.3,.3,.3,sk);B(0,1.84*h,0,.32,.08,.32,Math.random()<.15?'#e0e0e0':hair);
 if(Math.random()<.2)B(.32,.9*h,.05,.12,.4,.36,pick(['#4e342e','#263238','#1565c0']));};
(function(){const p0=person;person=function(shirt,o){const g=p0(shirt,o);if(o&&o.plain)return g;const r=Math.random();
 if(r<.28){const s=pick(SAREE);const sk=new T.Mesh(UB,M(s));sk.scale.set(.5,.8,.38);sk.position.set(0,.42,0);g.add(sk);const dr=new T.Mesh(UB,M(s));dr.scale.set(.22,.6,.33);dr.position.set(.13,1.05,.01);g.add(dr);const bun=new T.Mesh(UB,M('#1c1410'));bun.scale.set(.18,.18,.14);bun.position.set(0,1.62,-.18);g.add(bun);}
 else if(r<.38){g.scale.setScalar(.62);}
 else if(r<.46){const hr=new T.Mesh(UB,M('#e0e0e0'));hr.scale.set(.31,.08,.31);hr.position.set(0,1.75,0);g.add(hr);}
 return g;};})();
(function(){const ce=cellExtras;cellExtras=function(g,R,i,j,cel){ce(g,R,i,j,cel);if(blockKind(i,j)!=='bld')return;const cr=curbRect(i,j);const n=1+((R()*3)|0);
 for(let k=0;k<n;k++){const e=(R()*4)|0,t=.15+R()*.7;let x,z,ry;const ins=1.1;
  if(e===0){x=cr[0]+ins;z=cr[2]+t*(cr[3]-cr[2]);ry=-Math.PI/2;}else if(e===1){x=cr[1]-ins;z=cr[2]+t*(cr[3]-cr[2]);ry=Math.PI/2;}else if(e===2){z=cr[2]+ins;x=cr[0]+t*(cr[1]-cr[0]);ry=Math.PI;}else{z=cr[3]-ins;x=cr[0]+t*(cr[1]-cr[0]);ry=0;}
  const f=pick([vegStall,vegStall,fishStall,fruitStall,fruitStall,muriHawker]);f(g,x,z,ry);cel.sol&&cel.sol.push([x-.9,x+.9,z-.9,z+.9,0]);}};})();
procModel=function(){const g=new T.Group(),ppl=[];const sl=pick(PROC_SL);
 for(const bz of[7.6,-1.2]){const bn=new T.Mesh(new T.PlaneGeometry(6.2,1.2),bannerMat(bz>0?sl:pick(PROC_SL)));bn.position.set(0,2.4,bz);bn.rotation.y=Math.PI;g.add(bn);[-3.1,3.1].forEach(s=>bx(.07,3,.07,'#6b4a2b',s,1.5,bz,g));}
 for(let r=0;r<12;r++)for(let c=0;c<5;c++){if(Math.random()<.12)continue;const p=person(pick(['#fff','#e8e0c8','#c9b27a','#d6452d','#2c7be5','#f2b01e','#16a085','#ffffff']));p.position.set(-2.6+c*1.3+rnd(-.25,.25),.22,7.2-r*1.25+rnd(-.2,.2));p.userData.ph=Math.random()*6;g.add(p);ppl.push(p);
  if(Math.random()<.28){const fl=new T.Group();fl.position.set(.3,1.5,0);p.add(fl);bx(.03,1.4,.03,'#6b4a2b',0,.55,0,fl);bx(.6,.38,.02,pick(['#c0261d','#16a34a','#1d4ed8','#fff','#ff9800']),.3,1.08,0,fl);}
  else if(Math.random()<.22){const pl=new T.Mesh(new T.PlaneGeometry(.8,.5),bannerMat(pick(PROC_SL)));pl.position.set(0,1.98,-.05);pl.rotation.y=Math.PI;p.add(pl);}}
 for(const s of[-1,1]){const cop=person('#f4f4f4',{plain:1});cop.position.set(s*3.8,.22,3);g.add(cop);ppl.push(cop);}
 g.userData.ppl=ppl;return g;};
DEFS_PROC.w=7.2;
DEFS_PROC.l=16;
const CHANT=['চলছে না, চলবে না!','দাবি মোদের মানতে হবে!','লড়াই লড়াই লড়াই চাই!','ইনকিলাব জিন্দাবাদ!','আমাদের দাবি, মানতে হবে!'];
(function(){const pu=procUpdate;procUpdate=function(dt){pu(dt);const e=procE;if(!e||e.gone)return;e.ch=(e.ch||0)-dt;const d=Math.hypot(e.x-PX(),e.z-PZ());
 if(e.ch<=0&&d<55){e.ch=rnd(2.6,4.2);bubble(pick(CHANT),{pos:()=>[e.x,4.2,e.z]});if(d<35)A.ps&&A.ps('crowd',.25*(1-d/40),rnd(.95,1.05));}};})();
const OBR_SL=['পথ অবরোধ · রাস্তা সারাও','জল চাই, আলো চাই','বাস ভাড়া কমাও','ন্যায্য মজুরি চাই','এলাকার স্কুল খোলো'];
var obrE=null,obrT=40;
window.__obr=()=>{obrT=0;};
(function(){const eu=envUpdate;envUpdate=function(dt){eu(dt);try{obrUpdate(dt);}catch(err){}};})();
const _cd=new T.Vector3();
(function(){const pu=procUpdate;procUpdate=function(dt){const o=obbHit;obbHit=(e,x,z,r)=>{const h=o(e,x,z,r);return h.pen>0?h:null;};try{pu(dt);}finally{obbHit=o;}};
 const ou=obrUpdate;obrUpdate=function(dt){const o=obbHit;obbHit=(e,x,z,r)=>{const h=o(e,x,z,r);return h.pen>0?h:null;};try{ou(dt);}finally{obbHit=o;}};})();
(function(){const s0=say;say=function(t,p){if(typeof t==='string'&&(t.indexOf('পথ অবরোধ')>=0||t.indexOf('মিছিল!')>=0)){const e=t.indexOf('অবরোধ')>=0?obrE:procE;if(e&&!aheadOK(e.x,e.z,Math.hypot(e.x-PX(),e.z-PZ())))return;}return s0(t,p);};})();
(function(){const f0=fxUpdate;fxUpdate=function(){for(const e of ents)if(e.type==='pax'&&e.hid)e._g=e.gone,e.gone=true;try{f0();}finally{for(const e of ents)if(e.type==='pax'&&e.hid)e.gone=e._g;}};})();
const CROWDM=new Set();
let _vMark=null;
(function(){const pb=personBoxes;personBoxes=function(x,y,z,ry,h,list){const n0=list.length;pb(x,y,z,ry,h,list);if(_vMark)_vMark.push([x,z,n0,list.length]);};})();
sidewalkCrowd=function(g,R,cr,br,n){const L=[],pp=[];_vMark=pp;n=Math.round(n*.8);
 for(let i=0;i<n;i++){const e=(R()*4)|0,t=R();let x,z;const inset=.6+R()*(SWW-1.3);
  if(e===0){x=cr[0]+inset;z=br[2]+t*(br[3]-br[2]);}else if(e===1){x=cr[1]-inset;z=br[2]+t*(br[3]-br[2]);}else if(e===2){z=cr[2]+inset;x=br[0]+t*(br[1]-br[0]);}else{z=cr[3]-inset;x=br[0]+t*(br[1]-br[0]);}
  personBoxes(x,.22,z,R()*6.28,.88+R()*.26,L);}
 _vMark=null;if(L.length){const m=new T.Mesh(vcBoxes(L),vcMat);m.userData.own=1;m.userData.keep=1;m.userData.pp=pp.map(p=>({x:p[0],z:p[1],v0:p[2]*UBn.attributes.position.count,v1:p[3]*UBn.attributes.position.count}));m.castShadow=false;m.receiveShadow=true;g.add(m);CROWDM.add(m);}};
DEFS.tractor={w:2.1,l:6.2,v:[3.5,5],b:1,heavy:1,lc:1,lr:[2.5,5]};
(function(){const m0=mk;mk=function(type,col,w,sd){if(type==='tractor')return tractorModel();return m0(type,col,w,sd);};const p0=pickV;pickV=function(gali){if(!gali&&Math.random()<.07)return'tractor';const t=p0(gali);if(!gali&&(t==='auto'||t==='taxi')&&Math.random()<.18)return pick(['bus','lorry']);return t;};})();
const RW_SIGN=new T.MeshLambertMaterial({side:T.DoubleSide,map:cTex(256,96,(x,w,h)=>{x.fillStyle='#ffd23f';x.fillRect(0,0,w,h);x.fillStyle='#111';x.fillRect(0,0,w,8);x.fillRect(0,h-8,w,8);x.textAlign='center';x.font='800 30px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText('কাজ চলছে · রাস্তা বন্ধ',w/2,46,w-14);x.font='600 18px "Anek Bangla","Noto Sans Bengali",sans-serif';x.fillText('জলের পাইপ বসানো হচ্ছে — অসুবিধার জন্য দুঃখিত',w/2,76,w-14);})});
const stripeM=new T.MeshLambertMaterial({map:cTex(64,16,(x,w,h)=>{for(let k=0;k<8;k++){x.fillStyle=k%2?'#fff':'#d32f2f';x.beginPath();x.moveTo(k*10,0);x.lineTo(k*10+10,0);x.lineTo(k*10,h);x.lineTo(k*10-10,h);x.fill();}})});
var rwE=null,rwT=30;
window.__rw=()=>{rwT=0;};
const ROMEO=['আগুন ভাই, পুরো আগুন 🔥','উফ্‌, কী লাগছে!','দিদি, একটু হাসুন না!'],RETORT=['ঘরে মা বোন নেই?','মুখ সামলে কথা বলো!','পুলিশ ডাকব কিন্তু!'];
let banT=25;
(function(){const pb=personBoxes;personBoxes=function(x,y,z,ry,h,list){const n0=list.length;pb(x,y,z,ry,h,list);personBoxes.lastFem=(list.length-n0===6||list.length-n0===7)&&list[n0+0][3]>=.45;};})();
(function(){const wm=walkerMesh;walkerMesh=function(){const g=wm();g.userData.fem=!!personBoxes.lastFem;return g;};})();
(function(){const eu=envUpdate;envUpdate=function(dt){try{eu(dt);}catch(err){G._euErr=String(err&&err.stack||err).slice(0,300);}G._v20=(G._v20||0)+1;try{paxUpdate(dt);}catch(err){}try{crowdKnock();}catch(err){}try{rwUpdate(dt);}catch(err){}try{banterUpd(dt);}catch(err){}};})();
window.__dbg={paxUpdate,crowdKnock,rwUpdate,banterUpd};
