'use strict';
/* world: state and start-up code */
const world=new T.Group();
scene.add(world);
const groundGeo=new T.PlaneGeometry(240,CH);
const sideM=new T.MeshLambertMaterial({color:'#8d8a82',side:T.DoubleSide}),curbM=new T.MeshLambertMaterial({color:'#d8d2c0',side:T.DoubleSide}),parM=new T.MeshLambertMaterial({color:'#a9a69c',side:T.DoubleSide}),swSideM=new T.MeshLambertMaterial({color:'#b4ae9e',side:T.DoubleSide});
const RM={};
const swM={},gM={};
const GC=['#4b4a46','#2f78a8','#4b4a46','#4f4a46','#4b4a46','#2b2840','#4f9a4e','#3d8fc4'];
const CSH=['#d6452d','#e8e0c8','#2c7be5','#f2b01e','#8e44ad','#16a085','#d9d9d9','#c0392b','#355c3a','#ff8fab','#f4f4f4'],CPT=['#2b2b3a','#3a4a6a','#4a3a2a','#5a5a60','#1f1f26'],CSK=['#8d5a3b','#a8693f','#6e4630','#c08a5a'];
const crowdMat=new T.MeshLambertMaterial({color:'#ffffff'});
const lampMat=MB('#ffe9a8'),trunkM=M('#6b4a2f'),leafM=[M('#2f7a3d'),M('#3d9148'),M('#2a6e3a')];
const strColors=['#ff9ec7','#ffe28a','#9ee7ff'];
const chunks=new Map();
const SIGR=MB('#ff2a1f'),SIGG=MB('#2bff6a'),SIGY=MB('#ffc21f'),SIGO=MB('#2a2a2a');
Object.assign(A,{
 airhorn(v){v=v||1;this.tone(311,.55,'sawtooth',.13*v);this.tone(392,.55,'sawtooth',.11*v);this.tone(466,.55,'square',.05*v);},
 mhorn(){[523,659,784,659,880,784].forEach((f,i)=>this.tone(f,.13,'square',.07,null,i*.12));},
 knock(){[0,.16,.38].forEach(a=>{this.tone(95,.12,'sine',.4,60,a);this.noise(.06,.25,'lowpass',600,a);});},
 police(){for(let i=0;i<7;i++)this.tone(i%2?3100:2700,.06,'sine',.12,null,i*.055);this.tone(2900,.35,'sine',.1,null,.4);},
 bark(){[0,.22].forEach(a=>{this.tone(520,.09,'sawtooth',.14,260,a);this.noise(.07,.18,'bandpass',1100,a);});},
 vboom(){this.tone(62,1,'sine',.6,40);this.tone(124,.5,'triangle',.15,60);},
 slide(){this.tone(300,.5,'sine',.14,1800);},
 dhorn(){const f=rnd(360,560);this.tone(f,.16,'square',.025,f*.92);if(Math.random()<.5)this.tone(f,.16,'square',.025,f*.92,.22);},
 chatter(){for(let i=0;i<5;i++)this.tone(rnd(180,320),.09,'triangle',.03,rnd(150,300),i*.08);}
});
const CONDUCT=['হাওড়া হাওড়া হাওড়া!','ধর্মতলা ধর্মতলা! খালি গাড়ি!','আস্তে লেডিস! কোলে বাচ্চা!','বাঁধা বাঁধা! পেছনে চলুন দাদা!','উঠে পড়ুন, উঠে পড়ুন!'];
const COP=['এই অটো! সিগন্যাল দেখো না?','লাইসেন্স দেখি! সাইড করো!','লাল মানে থামা, বুঝলে?'];
const JAY=['দাঁড়াও দাঁড়াও, পার হচ্ছি!','হাত দেখাচ্ছি তো!','আরে আরে, পিছোই!','ফোনে কথা বলছি, দেখছো না?'];
const YB=['এই শালা, সর!','অ্যাই! চোখ কি পকেটে রেখেছিস?','বাপের রাস্তা পেয়েছিস নাকি?','কানা নাকি রে?','মরবি নাকি রে হতভাগা?','লাইসেন্স কি লটারিতে পেয়েছিস?','দেখে চালা, গাধা কোথাকার!','হর্ন বাজালেই রাজা হয়ে গেলি?','এই শালা, উল্টো দিকে কেন?'];
const YH=['हट साला, आंधर बाड़ऽ का?','का रे, मरे के बा का?','ए भाई, देख के चलावऽ!','बाप के सड़क बा का?'];
const YP=['এই শালা, মানুষ দেখিস না?','দাঁড়া, তোর অটোর নম্বর নিচ্ছি!','বাবা গো, পা গেল!','পুলিশ ডাকছি দাঁড়া!'];
A.screech=function(){this.noise(.55,.2,'bandpass',2600);this.tone(1500,.5,'sawtooth',.03,900);};
Object.assign(A,{
 hold(f,d,type,v,at,to){if(!this.ctx||!this.on)return;const c=this.ctx,t=c.currentTime+(at||0),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(to)o.frequency.linearRampToValueAtTime(to,t+d);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.015);g.gain.setValueAtTime(v,t+Math.max(.02,d-.04));g.gain.linearRampToValueAtTime(0,t+d);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+d+.05);},
 engine(){const c=this.ctx,o1=c.createOscillator(),o2=c.createOscillator(),sub=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain(),am=c.createGain(),lfo=c.createOscillator(),lg=c.createGain(),g2=c.createGain();
  o1.type='sawtooth';o2.type='square';sub.type='triangle';f.type='lowpass';f.frequency.value=300;f.Q.value=2;g.gain.value=0;am.gain.value=.6;lfo.type='sawtooth';lg.gain.value=.4;lfo.connect(lg);lg.connect(am.gain);g2.gain.value=.35;o2.connect(g2);
  o1.connect(f);g2.connect(f);sub.connect(f);f.connect(am);am.connect(g);g.connect(this.master);
  const loop=(type,fr,q)=>{const s=c.createBufferSource(),bf=c.createBiquadFilter(),bg=c.createGain();s.buffer=this.nb;s.loop=true;bf.type=type;bf.frequency.value=fr;if(q)bf.Q.value=q;bg.gain.value=0;s.connect(bf);bf.connect(bg);s.start();return bg;};
  const ng=loop('bandpass',900,.8);ng.connect(am);const rg=loop('lowpass',500);rg.connect(this.master);const rng=loop('highpass',3500);rng.connect(this.master);
  [o1,o2,sub,lfo].forEach(n=>n.start());this.eo=o1;this.eg=g;this.lfo=lfo;this.E={o1,o2,sub,lfo,f,g,ng,rg,rng};},
 eng(sp,play,thr,rain){if(!this.E)return;const E=this.E,t=this.ctx.currentTime,a=Math.abs(sp),on=play&&this.on,rpm=22+((a*3.1)%30)+a*.9+(thr?6:0);
  E.o1.frequency.setTargetAtTime(rpm*2,t,.08);E.o2.frequency.setTargetAtTime(rpm,t,.08);E.sub.frequency.setTargetAtTime(rpm*.5,t,.08);E.lfo.frequency.setTargetAtTime(rpm*.5,t,.08);
  E.f.frequency.setTargetAtTime(260+a*22+(thr?250:0),t,.1);E.g.gain.setTargetAtTime(on?(thr?.075:.045):0,t,.1);E.ng.gain.setTargetAtTime(on?(thr?.25:.1):0,t,.1);
  E.rg.gain.setTargetAtTime(on?Math.min(.05,a*.003):0,t,.2);E.rng.gain.setTargetAtTime(on&&rain?.035*rain:0,t,.4);},
 horn(){this.hold(420,.3,'square',.05);this.hold(505,.3,'square',.045);this.hold(840,.3,'sawtooth',.02);this.hold(1262,.3,'square',.01);},
 airhorn(v){v=v||1;this.hold(155,.75,'sawtooth',.09*v,0,150);this.hold(196,.75,'sawtooth',.08*v,0,190);this.hold(311,.75,'square',.03*v);},
 pom(){const f=rnd(380,470);this.hold(f,.2,'square',.035);this.hold(f*1.25,.2,'square',.03);if(Math.random()<.5){this.hold(f,.3,'square',.035,.28);this.hold(f*1.25,.3,'square',.03,.28);}},
 dhorn(){const f=rnd(340,520),d=rnd(.12,.3);this.hold(f,d,'triangle',.02);this.hold(f*1.26,d,'triangle',.015);},
 tring(){[0,.12,.3,.42].forEach(a=>{this.tone(2093,.25,'sine',.07,null,a);this.tone(3140,.18,'sine',.04,null,a);this.tone(5270,.1,'sine',.02,null,a);});},
 bell(){[0,.35].forEach(a=>{this.tone(880,.9,'sine',.12,null,a);this.tone(1320,.7,'sine',.07,null,a);this.tone(2217,.4,'sine',.04,null,a);});},
 crash(){this.noise(.5,.7,'lowpass',1200);this.noise(.25,.4,'bandpass',3200);this.tone(70,.5,'sine',.5,35);[523,811,1290,1733].forEach((f,i)=>this.tone(f,.25+.05*i,'triangle',.05,f*.97,.02*i));for(let i=0;i<6;i++)this.tone(rnd(3000,6000),.08,'sine',.03,null,.15+i*.05);},
 bump(){this.tone(110,.14,'sine',.45,50);this.noise(.09,.35,'lowpass',700);},
 skid(v){if(!this.ctx||!this.on)return;const c=this.ctx,t=c.currentTime,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=this.nb;f.type='bandpass';f.frequency.setValueAtTime(1500,t);f.frequency.linearRampToValueAtTime(1100,t+.5);f.Q.value=9;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.5*(v||1),t+.04);g.gain.linearRampToValueAtTime(0,t+.5);s.connect(f);f.connect(g);g.connect(this.master);s.start(t);s.stop(t+.55);},
 screech(){this.skid(1);},
 scrape(){this.noise(.3,.3,'bandpass',900);this.tone(140,.25,'sawtooth',.08,90);},
 beep(){this.hold(1250,.18,'square',.03);}
});
let SCALE_PR_DOWN=0,CITY=0,TRAF=1,tiltOn=false,tiltG=0,tiltSeen=false,curPR=1,perfA=.016,perfT=0;
const BASE=32*SEG,TRAFV=[.55,1,1.7];
const ZK=ZN.map(z=>({bn:z.bn,en:z.en,shops:z.shops}));
const GSH=[['মিষ্টান্ন ভাণ্ডার','চা-সিঙাড়া','বুক স্টল'],['ঘাট'],['বইঘর','চায়ের দোকান','স্টেশনারি','ছাপাখানা'],['ডাকঘর','ব্যাংক','সরকারি দপ্তর'],['বস্ত্রালয়','বিরিয়ানি হাউস','জুতোর দোকান','মোবাইল স্টোর'],['কাবাব কর্নার','কেক ঘর','রেস্তোরাঁ','ক্যাফে'],['পার্ক'],['ক্লাব']];
const CITIES=[
 {bn:'কলকাতা',en:'Kolkata'},
 {bn:'শিলিগুড়ি',en:'Siliguri',z:[['শিলিগুড়ি জংশন','Siliguri Junction'],['মহানন্দা সেতু','Mahananda Bridge'],['হিলকার্ট রোড','Hill Cart Road'],['বিধান মার্কেট','Bidhan Market'],['সেবক রোড','Sevoke Road'],['হংকং মার্কেট','Hong Kong Market'],['দার্জিলিং মোড়','Darjeeling More'],['সালুগাড়া','Salugara']]},
 {bn:'বর্ধমান',en:'Burdwan',z:[['বর্ধমান স্টেশন','Burdwan Station'],['কৃষক সেতু','Krishak Setu'],['বি সি রোড','B.C. Road'],['কার্জন গেট','Curzon Gate'],['তিনকোনিয়া','Tinkonia'],['বীরহাটা','Birhata'],['গোলাপবাগ','Golapbag'],['নবাবহাট','Nawabhat']]},
 {bn:'দুর্গাপুর',en:'Durgapur',z:[['দুর্গাপুর স্টেশন','Durgapur Station'],['দুর্গাপুর ব্যারেজ','Durgapur Barrage'],['বেনাচিতি বাজার','Benachity Bazar'],['ভিড়িঙ্গি মোড়','Bhiringi More'],['সিটি সেন্টার','City Centre'],['গান্ধী মোড়','Gandhi More'],['বিধাননগর','Bidhannagar'],['মুচিপাড়া','Muchipara']]},
 {bn:'আসানসোল','en':'Asansol',z:[['আসানসোল স্টেশন','Asansol Station'],['নুনিয়া সেতু','Nunia Bridge'],['হটন রোড','Hutton Road'],['বিএনআর মোড়','BNR More'],['জিটি রোড','G.T. Road'],['গির্জা মোড়','Girja More'],['ঊষাগ্রাম','Ushagram'],['বার্নপুর','Burnpur']]},
 {bn:'কল্যাণী',en:'Kalyani',z:[['কল্যাণী স্টেশন','Kalyani Station'],['ঈশ্বর গুপ্ত সেতু','Iswar Gupta Setu'],['সেন্ট্রাল পার্ক','Central Park'],['কল্যাণী বিশ্ববিদ্যালয়','Kalyani University'],['ঘোষপাড়া','Ghoshpara'],['বুদ্ধ পার্ক','Buddha Park'],['পিকনিক গার্ডেন','Picnic Garden'],['লেক পার্ক','Lake Park']]},
 {bn:'মালদা',en:'Malda',z:[['মালদা টাউন স্টেশন','Malda Town Station'],['মহানন্দা সেতু','Mahananda Bridge'],['রথবাড়ি মোড়','Rathbari More'],['ইংরেজবাজার','English Bazar'],['চিত্তরঞ্জন মার্কেট','Chittaranjan Market'],['ফোয়ারা মোড়','Foara More'],['সুকান্ত মোড়','Sukanta More'],['গৌড় রোড','Gour Road']]},
 {bn:'লালবাগ',en:'Lalbagh',z:[['মুর্শিদাবাদ স্টেশন','Murshidabad Station'],['ভাগীরথী ঘাট','Bhagirathi Ghat'],['লালবাগ বাজার','Lalbagh Bazar'],['হাজারদুয়ারি','Hazarduari'],['কাটরা মসজিদ','Katra Masjid'],['নশিপুর রাজবাড়ি','Nashipur Rajbari'],['কাঠগোলা বাগান','Kathgola Bagan'],['মতিঝিল','Motijheel']]}];
const VCLIP={};
const vbuf={};
let vcur=null;
{const sp0=Vx.speak.bind(Vx);Vx.speak=function(text,lang){if(!voiceOn||!A.on)return;if(playClip(text))return;sp0(text,lang);};}
YB.push('ধুর শালা! সাইড দে!','কেলিয়ে বৃন্দাবন দেখিয়ে দেব!','মাল খেয়ে চালাচ্ছিস নাকি?','চোখে ন্যাবা হয়েছে?','বাপের জমিদারি পেয়েছিস?','ক্যালানি খাবি নাকি রে?','ওরে উজবুক, ব্রেক মার!','হতচ্ছাড়া বাঁদর কোথাকার!','এই গবেট, ফোট এখান থেকে!','কানের গোড়ায় একটা দেব!','খ্যাপা নাকি রে তুই?','শালা অটোওয়ালা, রাস্তা কিনে নিয়েছিস?');
YP.push('ওরে হারামজাদা, দেখে চালা!','চাপা দিবি নাকি রে শালা?','এই অটো, দাঁড়া! পালাস না!');
const DEFS={
 taxi:{w:1.9,l:4.4,v:[7,10],b:1,heavy:1,lc:1,lr:[2.5,6]},car:{w:1.8,l:4.2,v:[7,11],b:1,heavy:1,lc:1,lr:[2.5,6]},bus:{w:2.5,l:10.6,v:[6,8],b:1,heavy:1,lethal:1,lc:1,lr:[2.5,5]},tram:{w:2.6,l:12.6,v:[4,6],b:1,heavy:1,lethal:1},lorry:{w:2.4,l:7.8,v:[6,8.5],b:1,heavy:1,lethal:1,lc:1,lr:[2.5,5]},vip:{w:1.95,l:4.6,v:[8.5,8.5],b:1,heavy:1},pbike:{w:.9,l:2.2,v:[8.5,8.5],b:1,val:3000,sl:.9},mama:{w:3.2,l:7,v:[0,0],deco:1,side:1},drop:{w:3,l:6,v:[0,0],deco:1,side:1},sbk:{w:0,l:.8,v:[0,0],deco:1},wrong:{w:1.9,l:4.4,v:[-14,-14],b:1,heavy:1},
 auto:{w:1.6,l:3.4,v:[6,9],b:1,val:1500,sl:.85,lc:1,lr:[2,5]},bike:{w:.8,l:2.1,v:[10,13],b:1,val:700,sl:.92,lc:1,lr:[1.5,4]},cycle:{w:.7,l:1.9,v:[3,4.5],b:1,val:300,sl:.95},rick:{w:1.7,l:4,v:[3,4.5],b:1,val:800,sl:.9},cart:{w:1.7,l:4.6,v:[1.8,2.6],b:1,val:700,sl:.9},
 cow:{w:1,l:2.4,v:[0,0],b:1,solid:1},ped:{w:.7,l:.7,v:[0,0],b:1,solid:1,person:1},
 stall:{w:2.6,l:2,v:[0,0],b:1,val:1200,sl:.85,side:1},shelter:{w:3,l:3.2,v:[0,0],b:1,val:900,sl:.88,side:1},bin:{w:.9,l:.9,v:[0,0],b:1,val:200,sl:.95},
 barr:{w:3.2,l:4,v:[0,0],b:1,val:900,sl:.8,bar:1},stn:{w:4.2,l:12,v:[0,0],deco:1,side:1},tempo:{w:1.9,l:4.6,v:[6,9],b:1,heavy:1,lc:1,lr:[2.5,6]},xing:{w:0,l:6,v:[0,0],deco:1},dog:{w:.4,l:.8,v:[0,0],deco:1},
 pot:{w:1.8,l:1.8,v:[0,0]},pud:{w:3.2,l:3.2,v:[0,0]},pax:{w:1.4,l:1.4,v:[0,0]},note:{w:1.2,l:1.2,v:[0,0]},cng:{w:1.2,l:1.2,v:[0,0]},sweet:{w:1.2,l:1.2,v:[0,0]},walker:{w:.5,l:.5,v:[1.3,1.3],deco:1,person:1}};
let ents=[];
const NP=90,pg=new T.BufferGeometry(),pp=new Float32Array(NP*3).fill(-999),pv=new Float32Array(NP*3),pl=new Float32Array(NP);
pg.setAttribute('position',new T.BufferAttribute(pp,3));
const pts=new T.Points(pg,new T.PointsMaterial({color:'#ffd23f',size:.35,transparent:true,fog:false}));
pts.frustumCulled=false;
scene.add(pts);
let pI=0;
const NR=260,rg=new T.BufferGeometry(),rp=new Float32Array(NR*6),ro=[];
for(let i=0;i<NR;i++)ro.push([rnd(-16,16),rnd(0,18),rnd(-30,6)]);
rg.setAttribute('position',new T.BufferAttribute(rp,3));
const rain=new T.LineSegments(rg,new T.LineBasicMaterial({color:'#cfe3ff',transparent:true,opacity:.0,fog:false}));
rain.frustumCulled=false;
scene.add(rain);
const player=buildToto();
scene.add(player);
player.traverse(m=>{if(m.isMesh)m.castShadow=true;});
const mobG=[];
for(let i=0;i<10;i++){const p=person(pick(['#d6452d','#e8e0c8','#2c7be5','#f2b01e']));p.visible=false;scene.add(p);mobG.push(p);}
const G={state:'menu',mode:'fare',startZone:0,D:0,x:-1.6,tx:-1.6,turning:null,tyaw:0,th:0,cth:0,steer:0,yr:0,ct:1,rowLo:0,turnQ:0,side:-1,odo:0,nextJ:0,vx:0,sp:0,fuel:100,lives:3,inv:0,shield:0,score:0,pax:0,carried:0,stops:0,zone:0,t:0,shake:0,anger:0,mobD:90,mobAct:false,combo:0,comboT:0,bombCd:0,nextRow:0,slow:0,rainA:0,night:0,hornT:0,cam:'menu',won:false,gotWin:false,snap:false,smashN:0,over:false,reason:'',pocketGain:0,vicN:0,rough:0,hw:6.4,ev:0,lastBarr:-999,nextStn:0,stnSide:1,atStn:false,fillT:0,fillCost:0,fullSaid:0,roughSay:0,roughT:0,nextX:0,ambT:2,fines:0};
const keys={l:0,r:0,brake:0,turbo:0,go:0};
let toastTO=0,lastSay=0;
let stopTO=0;
const cache={};
const mini=$('mini').getContext('2d');
let hornCd=0;
const puffs=[];
for(let i=0;i<16;i++){const m=new T.Mesh(US,new T.MeshBasicMaterial({color:'#8a8a8a',transparent:true,opacity:0,depthWrite:false}));m.visible=false;scene.add(m);puffs.push({m,t:0});}
const OW=['আরে বাবা গো!','মরে গেলাম!','উহ্‌হ্‌!','পড়ে গেলাম!','কোমর গেল রে!'];
const LBL={auto:'নিজের লোক!',bike:'বাইক উড়ল!',cycle:'সাইকেল সাফ!',rick:'রিকশা উল্টি!',cart:'ঠেলা উল্টো!',stall:'দোকান সাফ!',shelter:'ছাউনি ফিনিশ!',bin:'ভ্যাট উল্টে গেল!',barr:'ব্যারিকেড ভাঙলি!',car:'শ্রেণিশত্রু!',taxi:'হলুদ ট্যাক্সি ঠুকে দিলি!',tempo:'টেম্পো টাল খেল!',wrong:'উল্টো পথের ট্যাক্সি!',vip:'ভিআইপি!',pbike:'পুলিশের বাইক!'};
const CARVAL={car:2500,taxi:2200,tempo:2000,wrong:2400,vip:10000};
const VIPL=['প্রোটোকল ভাঙলি? জানিস আমি কে?','আমার গাড়িতে দাগ! কমিটি বসাও!','ড্রাইভার, ওর লাইসেন্স নম্বর লেখো!'];
const VIPW=['গরিবেরা কেমন আছে?','ভোটটা আমাকেই দিও কিন্তু!','রাস্তা এত ফাঁকা কেন? জ্যাম কোথায়?'];
const MOBL=['ধর ধর! পালাচ্ছে!','টোটোওয়ালা পালাচ্ছে, ধর!','ছাড়বি না, ধর ব্যাটাকে!','আজ তোর একদিন কি আমার একদিন!'];
const MAMA=['নে, চা-পানি খা। যা, কেটে পড়!','এই টাকায় চা-ও হয় না!'];
const MEL8=['ও মা গো!'];
const PT=[
 {n:'মাসিমা',fare:25,perBump:5,line:'বাবা, আস্তে চালিও, হাঁটুর ব্যথা।',late:'এত দেরি! বাজার যে উঠে যাবে!',bumpL:'ও মা গো, কোমর গেল!'},
 {n:'অফিসবাবু',fare:40,tf:.72,line:'দাদা, তাড়াতাড়ি! লেট হলে বস খাবে!',late:'চাকরিটা আজই গেল!',bumpL:'আস্তে! ল্যাপটপ আছে!'},
 {n:'কলেজ ছাত্রী',fare:10,fixed:1,line:'দশ টাকার বেশি দেব না কিন্তু!',late:'ক্লাসটা মিস হয়ে গেল!',bumpL:'এই! ফোনটা পড়ে যাবে!'},
 {n:'পার্টির দাদা',fare:80,noBump:1,line:'জানো আমি কে? সোজা পার্টি অফিস চলো!',late:'তোমার লাইসেন্স দেখে নেব!',bumpL:'এই! দেখে চালা!'}];
const TKN={foot:['{a}-এ ফুটপাতে উঠে পড়ল অটো, পথচারীরা নামলেন রাস্তায়'],wrong:['{a}-এ উল্টো পথে অটো, ট্রাফিক আইন আপাতত ছুটিতে'],vip:['{a}-এ প্রোটোকল ভেঙে ভিআইপি গাড়িতে অটোর ধাক্কা'],vipc:['ভিআইপি কনভয় আসছে, শহর জুড়ে জনভোগান্তি'],
 car:['{a}-এ অটো-গাড়ি সংঘর্ষ, দুই চালকই নিজেকে নির্দোষ দাবি করলেন','{a}-এ শ্রেণিসংগ্রাম: দামি গাড়িতে অটোর ধাক্কা'],stall:['{a}-এ ফুটপাতের দোকান উচ্ছেদ করল অটো, পুরসভার অভিযান ছাড়াই'],chase:['{a}-এ অটোর পিছনে ছুটছে উত্তেজিত জনতা'],escape:['জনতার হাত ফসকে পালালেন অটোচালক'],
 near:['বাসের গা ঘেঁষে বেরিয়ে গেল অটো, কন্ডাক্টর বাকরুদ্ধ'],bribe:['{a}-এ চা-পানির পর মামলা মিটল, তদন্ত কমিটি গঠিত'],signal:['{a}-এ লাল সিগন্যাল ভেঙে অটো, সার্জেন্ট তখন ফোনে ব্যস্ত'],ped:['{a}-এ অটোর ধাক্কায় পথচারী অক্ষত, তবে ক্ষুব্ধ'],
 jump:['{a}-এ স্পিড ব্রেকারে উড়ল অটো, যাত্রী বললেন “ও মা গো”'],pax:['{a}-এ সময়মতো যাত্রী পৌঁছল, শহরে বিস্ময়'],late:['যাত্রীকে মাঝরাস্তায় নামিয়ে দিল অটো, ভাড়া নিয়ে বচসা'],police:['{a}-এ অটোর পিছনে পুলিশের বাইক, সাইরেনে কান ঝালাপালা'],low:['টোটোর ব্যাটারি তলানিতে, চার্জিং পয়েন্টের খোঁজে চালক']};
const bubs=[],_bv=new T.Vector3();
const VP={map:new Map(),buf:new Map(),db:null,cur:null,
 open(){return new Promise(r=>{try{const q=indexedDB.open('kar_vox',1);q.onupgradeneeded=()=>q.result.createObjectStore('v');q.onsuccess=()=>{VP.db=q.result;r();};q.onerror=()=>r();}catch(e){r();}});},
 async load(){await VP.open();if(!VP.db)return;try{const rq=VP.db.transaction('v').objectStore('v').openCursor();rq.onsuccess=()=>{const c=rq.result;if(c){VP.map.set(c.key,c.value);c.continue();}else vpCount();};}catch(e){}},
 save(k,b){VP.map.set(k,b);VP.buf.delete(k);try{VP.db.transaction('v','readwrite').objectStore('v').put(b,k);}catch(e){}vpCount();},
 del(k){VP.map.delete(k);VP.buf.delete(k);try{VP.db.transaction('v','readwrite').objectStore('v').delete(k);}catch(e){}vpCount();},
 play(k){const b=VP.map.get(k);if(!b){return false;}A.init();if(!A.ctx)return false;const go=buf=>{try{if(VP.cur)try{VP.cur.stop();}catch(e){}const s=A.ctx.createBufferSource(),g=A.ctx.createGain();s.buffer=buf;g.gain.value=1.5;s.connect(g);g.connect(A.master);s.start();VP.cur=s;}catch(e){}};
  if(VP.buf.has(k)){go(VP.buf.get(k));return true;}b.arrayBuffer().then(ab=>A.ctx.decodeAudioData(ab,buf=>{VP.buf.set(k,buf);go(buf);},()=>{}));return true;}};
Vx.speak=function(text,lang){const e=G.spk;G.spk=null;if(G.state!=='play'&&G.state!=='over')return;bubble(text,e);const t=$('toast');if(t.textContent.indexOf(text)>=0)t.classList.remove('show');if(voiceOn&&A.on)VP.play(text);};
let vpRec=null;
const TPOOL=[[{id:'hit',t:'৩০টা জিনিসে ধাক্কা দাও',n:30,r:10},{id:'jump',t:'স্পিড ব্রেকারে ৩ বার উড়ে যাও',n:3,r:10},{id:'pax',t:'১ জন যাত্রী সময়মতো পৌঁছে দাও',n:1,r:10}],
 [{id:'mirror',t:'৫টা সাইড মিরর ভাঙো',n:5,r:20},{id:'near',t:'বাস-লরির গা ঘেঁষে ৬ বার বেরোও',n:6,r:20},{id:'vip',t:'ভিআইপি গাড়িতে ১ বার ধাক্কা দাও',n:1,r:20},{id:'bribe',t:'মামাকে ২ বার চা-পানি দাও',n:2,r:20}],
 [{id:'escape',t:'পাবলিকের হাত ফসকে ৩ বার পালাও',n:3,r:50},{id:'survive',t:'এক রানে ৩ মিনিট টিকে থাকো',n:180,r:50,mx:1},{id:'pax3',al:'pax',t:'৩ জন যাত্রী সময়মতো পৌঁছে দাও',n:3,r:50}]];
const RINGG=new T.RingGeometry(.84,1,44),ringM=new T.MeshBasicMaterial({color:'#ff2a2a',transparent:true,opacity:.5,depthWrite:false});
const CHP=[];
for(let i=0;i<16;i++){const p=person(pick(['#d6452d','#e8e0c8','#2c7be5','#f2b01e','#16a085','#8e44ad','#f4f4f0']),{pants:pick(['#2d3a6b','#3a3a3a','#6b4a2a','#e8e0c8','#2e6b4a'])});p.visible=false;p.traverse(o=>{if(o.isMesh)o.castShadow=true;});scene.add(p);CHP.push({m:p,on:false});}
const CSLOT=[[-.98,.5],[.98,.5],[-.75,1.9],[.75,1.9],[-1,1.35]];
const chPos=c=>({pos:()=>[c.x,elevAt(c.D)+2.3,-c.D]});
const CAMN=['মাঝে','দূরে','চালকের চোখে'];
const wireM=new T.LineBasicMaterial({color:'#17181c'}),buntM=new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide});
const ACM=M('#d9dadc'),RAILC=['#2a2a2a','#3d6b5a','#7a3b2a','#2c4a7a'],CLOTH=['#e63946','#ffd23f','#3a86ff','#f4f1de','#2a9d8f','#ff7b00','#8e44ad'];
const MOB=matchMedia('(pointer:coarse)').matches;
Object.assign(A,{punch(){this.noise(.1,.55,'lowpass',520);this.tone(85,.14,'sine',.55,45);},
 siren(){for(let i=0;i<2;i++){this.tone(640,.3,'sawtooth',.03,1020,i*.6);this.tone(1020,.3,'sawtooth',.03,640,i*.6+.3);}}});
