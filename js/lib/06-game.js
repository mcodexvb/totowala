'use strict';
/* game: functions (all lib files load before any run file) */
function envUpdate(dt){const zi=Math.floor((G.D+50)/SEG)%8,Z=ZN[zi],k=Math.min(1,dt*.8);envC.sky.lerp(new T.Color(Z.sky),k);envC.fog.lerp(new T.Color(Z.fog),k);scene.background.copy(envC.sky);scene.fog.color.copy(envC.fog);
 hemi.intensity=lerp(hemi.intensity,Z.amb,k);sun.intensity=lerp(sun.intensity,(renderer.shadowMap.enabled?1.05:.8)*(1-Z.night*.8),k);G.night=lerp(G.night,Z.night,k);head.intensity=G.night*1.6;
 G.rainA=lerp(G.rainA,zi===3?1:0,Math.min(1,dt*.5));rain.material.opacity=.5*G.rainA;sunDisc.material.color.copy(envC.sky).lerp(new T.Color(Z.night?'#e8eaff':'#fff4c8'),.7);}
function update(dt){
 G.t+=dt;hornCd-=dt;G.hw=hwP(G.D);G.ev=elevAt(G.D);G.rough=lerp(G.rough,ivl(BAD,G.D,0),Math.min(1,dt*1.5));
 if(G.state==='menu'){menuT+=dt;G.D+=4*dt;}
 if(G.state==='play'&&G.beatT>0){beatUpd(dt);}
 else if(G.state==='play'&&G.turning){turnUpd(dt);hud();A.eng(G.sp,true,keys.go||keys.turbo,G.rainA);}
 else if(G.state==='play'){
  const ch=G.mode==='chaos',D=G.D,m=G.odo;
  const dirB=(keys.r?1:0)-(keys.l?1:0),dirI=dirB||(tiltOn&&Math.abs(tiltG)>.1?tiltG:0),hw=G.hw;
  {const d=dirI-G.steer,r=(Math.abs(dirI)>Math.abs(G.steer)&&dirI*G.steer>=0?3.2:8)*dt;G.steer+=clamp(d,-r,r);}
  {const yr=G.sp/(3+G.sp*G.sp*.11)*G.steer;G.th+=yr*dt;if(!dirI&&Math.abs(G.sp)>1){const tg=Math.cos(G.th)>=0?0:Math.PI;let d=tg-G.th;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;G.th+=d*Math.min(1,dt*2);}if(G.th>Math.PI)G.th-=2*Math.PI;if(G.th<-Math.PI)G.th+=2*Math.PI;G.yr=yr;
   if(Math.abs(yr)>.6&&Math.abs(G.sp)>10){G.skT=(G.skT||0)-dt;if(G.skT<=0){G.skT=.45;A.skid(.4);}}}
  const CT=Math.cos(G.th),ST=Math.sin(G.th),PWg=1.3*Math.abs(CT)+2.5*Math.abs(ST),PLg=2.5*Math.abs(CT)+1.3*Math.abs(ST);G.ct=CT;
  const tb=keys.turbo&&G.fuel>2,go=!!(keys.go||tb);
  let vmax=13+Math.min(G.odo,3500)*.003;if(tb)vmax*=1.65;vmax*=1-.2*G.rough;if(G.fuel<=0)vmax=4;vmax*=1-.09*(G.cling||0);G.slow-=dt;if(G.slow>0)vmax*=.55;if(G.rainA>.5)vmax*=.92;
  if(keys.brake){if(G.sp>.3){G.sp=Math.max(0,G.sp-17*dt);if(G.sp>8){G.skT=(G.skT||0)-dt;if(G.skT<=0){G.skT=.4;A.skid(.7);}}}else{G.sp=Math.max(-4.5,G.sp-4*dt);G.revT=(G.revT||0)-dt;if(G.revT<=0){G.revT=.7;A.beep();}}}
  else if(go){if(G.sp<vmax)G.sp=Math.min(vmax,G.sp+(tb?8:5)*dt*(1-.25*G.rough));else G.sp=Math.max(vmax,G.sp-6*dt);}
  else G.sp=G.sp>0?Math.max(0,G.sp-(2.4+G.sp*.08)*dt):Math.min(0,G.sp+3*dt);
  G.fuel=Math.max(0,G.fuel-(go?(tb?.8:.4):.04)*dt*(ch?1:.8));
  if(G.fuel<20&&!G.lowSaid){G.lowSaid=true;vox('low',1);}if(tb&&Math.random()<dt*2){A.turbo();vox('turbo');A.clip(.2);}
  if(G.rough>.4&&G.sp>7){G.roughT-=dt;if(G.roughT<=0){G.roughT=rnd(.5,1.1);A.rattle();G.shake=Math.max(G.shake,1.4*G.rough);}}
  if(G.rough>.5&&!G.roughSay&&G.sp>5){G.roughSay=1;say(pick(['এ রাস্তা না গর্তের মেলা!','ঝাঁকুনিতে হাড় খুলে যাবে!','কর্পোরেশন কোথায়?!']),1);}if(G.rough<.2)G.roughSay=0;
  G.D+=G.sp*CT*dt;G.x+=G.sp*ST*dt;G.odo+=Math.abs(G.sp)*dt;G.inv=Math.max(0,G.inv-dt);G.shield=Math.max(0,G.shield-dt);G.shake=Math.max(0,G.shake-dt*20);G.bombCd=Math.max(0,G.bombCd-dt);G.hornT-=dt;
  {const jn=nearJ(G.D)<8&&G.ev<.3,base=(ch&&G.ev<.5)?hw+2.8:hw-.75,lim=jn?hw+9:base;
   const wall=(tx)=>{G.x=tx;const tg=CT>=0?0:Math.PI;let d=tg-G.th;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;G.th+=d*Math.min(1,dt*Math.max(dirI?0:1.5,5*clamp((Math.abs(G.sp)-5)/6,0,1)));if(Math.abs(G.sp)>3){G.sp*=1-Math.min(.9,2.2*dt);G.scrT=(G.scrT||0)-dt;if(G.scrT<=0){G.scrT=.5;A.scrape();G.shake=Math.max(G.shake,2.5);return 1;}}return 0;};
   if(Math.abs(G.x)>lim)wall(Math.sign(G.x)*lim);
   if(jn&&Math.abs(G.x)>hw+2.5&&!G.turning)startTurn(G.x<0?'L':'R',1);
   if(!divAt(G.D)){if(Math.abs(G.x)>1.3)G.side=Math.sign(G.x);}else{const s=G.side||-1;if(s<0&&G.x>-1.25){if(wall(-1.25))say('ডিভাইডার! 🧱 মোড়ের ফাঁক দিয়ে পার হও');}else if(s>0&&G.x<1.25){if(wall(1.25))say('ডিভাইডার! 🧱 মোড়ের ফাঁক দিয়ে পার হও');}}
   if(G.D<3){G.D=3;if(G.sp*CT<0)G.sp=0;}
   if(!isFinite(G.x)||!isFinite(G.D)||!isFinite(G.th)||!isFinite(G.sp)){G.x=-1.6;G.th=0;G.sp=0;G.D=isFinite(G.D)?G.D:G.zone*SEG+30;}
   G.vx=G.sp*ST;}
  if(G.comboT>0){G.comboT-=dt;if(G.comboT<=0)G.combo=0;}
  if(G.fuel<=0&&G.sp<2.5&&!G.atStn&&!keys.go){G.fuel=0;endGame('fuel');}
  const z=Math.floor(G.D/SEG);if(z>G.zone)arrive(z);
  if(G.nextJ<G.D)G.nextJ=nextJ(G.D+30);
  while(CT>=-.15&&G.nextJ<G.D+170){const Jd=G.nextJ;if(elevAt(Jd)<.3){const x=place('xing',0,-Jd,hwAt(Jd));x.ph='g';x.pt=rnd(1.5,4);setSig(x,'g');x.done=0;}G.nextJ=nextJ(Jd+1);}
  {const nj=nextJ(G.D-6),jr=nj-G.D;G.jRel=jr;const ok=jr<=80&&G.ev<.3;G.jOK=ok;if(!ok)G.turnQ=0;
   for(const [id,d] of[['bTL',-1],['bTR',1]]){const b=$(id);b.style.display=ok?'flex':'none';b.classList.toggle('q',G.turnQ===d);}
   if(ok){const lab=jr>6?bn(Math.round(jr))+' মি':'এখনই!';setT('bTLt','বাঁয়ে · '+lab);setT('bTRt','ডাইনে · '+lab);}
   if(G.turnQ&&ok&&jr<=2)startTurn(G.turnQ<0?'L':'R');
   const rk=roadKind(G.D);G.canU=false&&(rk===1||(rk===2&&Math.abs(jr)<8)||(ch&&G.ev<.3));$('bU').style.display=G.canU&&!G.turning?'flex':'none';}
  {const stp=Math.max(ch?22:25,40-Math.min(m,3500)*.005)*(ch?.85:1)/TRAFV[TRAF];
   if(CT>=-.15){while(G.nextRow<G.D+170){spawnRow(G.nextRow);G.nextRow+=stp;}G.rowLo=Math.max(G.rowLo,G.D-120);}
   else{while(G.rowLo>G.D-170&&G.rowLo>40){G.rowLo-=stp;spawnRow(G.rowLo,1);}G.nextRow=Math.min(G.nextRow,G.D+120);G.nextJ=Math.min(G.nextJ,nextJ(G.D+121));}}
  G.mobAct=false;chaseUpd(dt);if(G.state!=='play'||G.beatT>0)return;vipUpd(dt);if(G.state!=='play')return;mamaUpd(dt);tripUpd(dt);sbkUpd(dt);taskTick(dt);
  let wr=false;const pz0=-G.D;
  const REDS=[],XP=[],BARS=ents.filter(o=>o.type==='barr'&&!o.fly&&!o.hit),SBK=ents.filter(o=>o.type==='sbk');
  for(const e of ents){if(e.type==='xing'){const rel=-e.z-G.D;
    if(rel<170&&rel>-20){e.pt-=dt;if(e.pt<=0){if(e.ph==='g'){e.ph='y';e.pt=1.2;}else if(e.ph==='y'){e.ph='r';e.pt=rnd(5,7);if(rel>8&&rel<110){A.police();}
       const hw=hwP(-e.z),n=ch?6+((Math.random()*6)|0):4+((Math.random()*5)|0);for(let q=0;q<n;q++){const sd=Math.random()<.5?-1:1,p=place('ped',sd*(hw+rnd(.4,2.2)),e.z+rnd(-1.4,1.4));p.vx*=rnd(.8,1.15);p.zeb=1;p.dith=0;}}
      else{e.ph='g';e.pt=rnd(5,8);if(e.waited&&!ch){G.score+=10;say('নিয়ম মেনে চলা অটোদাদা! +₹১০',1);A.coin();}e.waited=0;}setSig(e,e.ph);}}
    if(e.ph!=='g')REDS.push(e);
    if(e.ph!=='g'&&rel>4&&rel<70&&!e.warned){e.warned=1;say('🚦 লাল সিগন্যাল — থামো!',1);A.warn();}if(e.ph==='g')e.warned=0;
    if(e.ph==='r'&&rel>0&&rel<14&&G.sp<1.5)e.waited=1;
    if(!e.done&&rel<-1&&rel>-8){e.done=1;if(e.ph!=='g'&&G.sp>3){if(ch){const mult=1+Math.floor(G.combo/2);G.score+=300*mult;G.anger=Math.min(100,G.anger+6);say('সিগন্যাল ভেঙে বেরিয়ে গেল! 🚦',1);A.police();spawnCh(1,G.D,G.x);flash('signal');}
      else{const f=50;G.score=Math.max(0,G.score-f);G.fines+=f;A.police();const ln=pick(COP);say('👮 '+ln+' ফাইন ₹৫০',1);Vx.speak(ln,'bn');}}}}
   else if(e.type==='ped'&&!e.down&&!e.hit&&Math.abs(e.x)<hwP(-e.z)+.3)XP.push(e);}
  G.ambT-=dt;if(G.ambT<=0){G.ambT=rnd(1.2,3.5);A.dhorn();if(Math.random()<.15)A.chatter();}
  for(const e of ents){
   const u=e.mesh.userData;
   if(e.fly){e.ft-=dt;e.vel.y-=28*dt;e.x+=e.vel.x*dt;e.z+=e.vel.z*dt;e.h+=e.vel.y*dt;if(e.h<0){e.h=0;e.vel.y*=-.3;e.vel.x*=.7;e.vel.z*=.7;}e.mesh.position.set(e.x,elevAt(-e.z)+e.h,e.z);e.mesh.rotation.x+=e.spin.x*dt;e.mesh.rotation.y+=e.spin.y*dt;e.mesh.rotation.z+=e.spin.z*dt;if(e.ft<.5)e.mesh.scale.setScalar(Math.max(.01,e.ft*2));if(e.ft<=0)e.gone=true;continue;}
   if(e.down){e.dT+=dt;e.vx*=Math.pow(.12,dt);e.x+=e.vx*dt;e.vz*=Math.pow(.15,dt);e.z+=e.vz*dt;const kk=Math.min(1,e.dT*7);e.mesh.rotation.x=-1.5*kk;e.mesh.position.set(e.x,elevAt(-e.z)+.2*kk,e.z);if(e.dT>3){e.mesh.scale.setScalar(Math.max(.01,1-(e.dT-3)*2));if(e.dT>3.5)e.gone=true;}continue;}
   if(e.d.b&&e.vb>0&&!e.vic&&!e.d.side&&!e.d.solid&&!e.bar&&e.type!=='barr'){let tgt=e.vb;
    if(e.halt!==undefined){e.halt-=dt;if(e.halt>0)tgt=0;}
    else if(e.type==='bus'&&!e.halted){const rel=-e.z-G.D;if(rel>25&&rel<75&&Math.random()<dt*.25){e.halted=1;e.halt=rnd(2.5,4);const L=laneSet(-e.z);e.tx=L[0];e.cool=e.halt+1.5;if(rel<60){A.knock();const ln=pick(CONDUCT);G.spk=e;Vx.speak(ln,'bn');}}}
    for(const r of REDS){const gp=e.z-r.z-e.l/2-3;if(gp>-.6&&gp<32)tgt=Math.min(tgt,Math.max(0,gp*.55));}
    for(const p of XP){if(Math.abs(p.x-e.x)<(e.w+.8)/2+.4){const gp=e.z-p.z-e.l/2;if(gp>-.3&&gp<14)tgt=Math.min(tgt,Math.max(0,(gp-2)*.6));}}
    for(const b of BARS){if(Math.abs(b.x-e.x)<(b.w+e.w)/2+.2){const gp=e.z-b.z-(e.l+b.l)/2;if(gp>-.5&&gp<25)tgt=Math.min(tgt,Math.max(0,(gp-1.5)*.6));}}
    if(Math.abs(G.x-e.x)<(e.w+PWg)/2+.25){const gp=e.z+G.D-e.l/2-PLg/2;if(gp>-.5&&gp<22){tgt=Math.min(tgt,Math.max(0,G.sp*CT+(gp-2.5)*.7));if(gp<7&&e.v<1&&Math.random()<dt*.5){if(e.type==='bus')A.airhorn(.7);else A.pom();yell(e);}}}
    for(const b of SBK){const gp=e.z-b.z-e.l/2;if(gp>-.5&&gp<14)tgt=Math.min(tgt,4.5);}
    e.v+=clamp(tgt-e.v,-9*dt,3.5*dt);}
   e.z-=e.v*dt;e.t+=dt;
   if(e.vic){e.vx*=Math.pow(.35,dt);e.x+=e.vx*dt;e.mesh.rotation.y+=e.rot*dt;e.rot*=Math.pow(.4,dt);e.smoke-=dt;if(e.smoke>0&&Math.random()<dt*9)puff(e.x,elevAt(-e.z)+1.2,e.z);}
   else if(e.onc){oncAI(e,dt,REDS,XP);}
   else if(e.d.lc){
    e.chk-=dt;e.cool=(e.cool===undefined?rnd(.5,3):e.cool)-dt;
    if(e.chk<=0){e.chk=.3;aiLane(e,e.cool<=0&&Math.random()<.8);}
    const dxm=e.tx-e.x,mx=2.6*dt,st=Math.abs(dxm)<mx?dxm:Math.sign(dxm)*mx;e.x+=st+e.vx*dt;e.lv=lerp(e.lv,st/Math.max(dt,.001),.2);
    e.mesh.rotation.y=-clamp(e.lv*.07,-.3,.3);if(e.type==='bike')e.mesh.rotation.z=-clamp(e.lv*.03,-.25,.25);}
   else{e.x+=e.vx*dt;if(e.d.b&&!e.d.side&&!e.d.solid&&e.type!=='wrong'&&e.type!=='tram'&&e.type!=='barr'){const lm=hwP(-e.z)-e.w/2-.15;if(Math.abs(e.x)>lm)e.x-=Math.sign(e.x)*Math.min(Math.abs(e.x)-lm,1.5*dt);}}
   let wob=0;
   if(e.type==='ped'){const hw3=hwP(-e.z);
    if(e.dith&&!e.dd&&Math.abs(e.x)<hw3*e.dith&&-e.z-G.D<40){e.dd=1;e.pz=rnd(.5,1.2);e.back=Math.random()<.5;if(-e.z-G.D<30){const ln=pick(JAY);G.spk=e;Vx.speak(ln,'bn');}}
    if(e.pz>0){e.pz-=dt;e.x-=e.vx*dt;if(e.pz<=0&&e.back){e.vx=-e.vx;e.mesh.rotation.y=-e.mesh.rotation.y;}walk(e.mesh,0,0);}else walk(e.mesh,e.t*7,.7);
    if(e.hand)e.mesh.userData.arms[1].rotation.x=-2.7;
    if(Math.abs(e.x)>hw3+4.5)e.gone=true;}
   else if(e.type==='dog'){const rel=-e.z-G.D;if(!e.ch&&rel<9&&rel>0&&Math.random()<.6){e.ch=2.8;A.bark();}
    if(e.ch>0){e.ch-=dt;e.z+=(-G.D+1.5-e.z)*Math.min(1,dt*3);const s=Math.sign(e.x)||1;e.x+= (s*(G.hw+.4)-e.x)*Math.min(1,dt*2);e.mesh.rotation.y=Math.PI;e.yo=Math.abs(Math.sin(e.t*16))*.15;if(Math.random()<dt*2.5)A.bark();if(e.ch<=0)e.yo=0;}
    if(u.tail)u.tail.rotation.y=Math.sin(e.t*14)*.6;}

   else if(e.type==='walker'){e.mesh.rotation.y=e.v>0?Math.PI:0;e.yo=Math.abs(Math.sin(e.t*(e.runner?12:6)))*(e.runner?.14:.06);}
   else if((e.type==='rick'||e.type==='cart')&&u.puller)walk(u.puller,e.t*6,.6);
   else if(e.type==='cycle'){const l=u.rider.userData.legs;l[0].rotation.x=Math.sin(e.t*7)*.9;l[1].rotation.x=-Math.sin(e.t*7)*.9;wob=Math.sin(e.t*1.6+e.col.length)*.3;}
   else if(e.type==='bike')wob=Math.sin(e.t*3+e.col.length)*.15;
   if(u.wh&&e.v)u.wh.forEach(w=>w.rotation.x-=e.v*dt/.4);
   if(e.type==='shelter'&&!e.fled&&-e.z-G.D<26&&-e.z>G.D-6){e.fled=true;const pp=u.person;if(pp){pp.visible=false;const w=place('walker',e.x+(e.x>0?-1:1),e.z-1.7);w.runner=true;w.v=6;say('আরে আরে, সরে যাচ্ছি!');}}
   else if(e.type==='pax'){walk(u.p,e.t*3,.1);u.p.userData.arms[1].rotation.z=-2.6+Math.sin(e.t*9)*.4;u.p.rotation.y=e.x<0?-1.2:1.2;u.ring.scale.setScalar(1+Math.sin(e.t*6)*.1);}
   else if(e.type==='note'||e.type==='cng'||e.type==='sweet'){e.mesh.rotation.y=e.t*2.5;}
   if(e.type==='cow'&&!e.mooed&&-e.z-G.D<70&&-e.z>G.D&&Math.random()<dt*.6){e.mooed=1;A.moo();}
   if(e.warn){const rel=-e.z-G.D;if(rel<130&&!e.beeped){e.beeped=1;A.warn();vox('wrong',1);}if(rel>0)wr=true;}
   e.mesh.position.set(e.x+wob,elevAt(-e.z)+e.yo,e.z);
  }
  updPuffs(dt);
  {const ws=roadKind(G.D)>0&&(G.ct>=0?G.x>.5:G.x<-.5);if(ws){setT('wrong','⚠ উল্টো লেনে চলছ!');if(ch)G.score+=Math.round(30*dt*10)/10;}else setT('wrong','⚠ উল্টো দিক থেকে গাড়ি!');$('wrong').style.display=(wr||ws)?'block':'none';}
  const V=ents.filter(e=>e.d.b&&!e.fly&&!e.down&&!e.d.solid&&e.type!=='wrong'&&!e.onc&&!e.d.side&&e.type!=='bin').sort((a,b)=>a.z-b.z);
  for(let i=0;i<V.length;i++)for(let j=i+1;j<V.length;j++){const a=V[i],b=V[j];if(b.z-a.z>40)break;if(Math.abs(a.x-b.x)<(a.w+b.w)/2+.3){const lim2=a.z+(a.l+b.l)/2+1.5;if(b.z<lim2&&b.v>a.v)b.v=a.v;if(b.z<a.z+(a.l+b.l)/2){b.z=a.z+(a.l+b.l)/2+.2;}}}
  const pz=-G.D;
  for(const e of ents){if(e.gone||e.fly||e.down||(e.d.deco&&!e.d.person))continue;const dx=Math.abs(e.x-G.x),dz=Math.abs(e.z+G.D),hw2=(e.w+PWg)/2,hl=(e.l+PLg)/2;
   if(e.d.heavy&&(!e.vic||G.mode==='chaos')&&dx<hw2&&dz<hl){if(heavyHit(e,dx,dz,hw2,hl,CT,ST)){if(G.state!=='play')return;continue;}const cs=Math.abs(G.sp*CT-e.v)+Math.abs(G.sp*ST)*.6,ox=hw2-dx,oz=hl-dz;
    if(ox<oz)G.x+=(G.x>=e.x?1:-1)*ox;else G.D+=(e.z<-G.D?-1:1)*oz;
    if(cs>4.5&&G.inv<=0&&G.shield<=0){hurt(e);e.vx=0;if(cs>9)victimCar(e);else{e.v*=.5;yell(e);}}
    else{if(G.t-(e.bT||-9)>.7){e.bT=G.t;A.bump();G.shake=Math.max(G.shake,3);if(G.inv<=0)yell(e);}G.sp*=ox<oz?1-Math.min(.9,3*dt):.2;}
    continue;}
   if(e.d.person){if(!e.hit&&dx<(e.w+1.2)/2+.15&&dz<(e.l+2.2)/2)victimPerson(e);if(!e.pass&&e.z>pz+hl)e.pass=true;continue;}
   if(e.d.b){
    if(!e.hit&&dx<hw2&&dz<hl){
     if(e.d.heavy){hurt(e);victimCar(e);}
     else if(e.d.solid){if(ch){e.hit=true;G.sp*=.5;G.shake=6;A.bump();A.moo();G.anger=Math.min(100,G.anger+10);vox('cow');}else{e.hit=true;G.sp*=.4;G.shake=6;A.bump();A.moo();say(pick(COWL));}}
     else if(ch)smashEnt(e,false);
     else{knock(e);G.sp*=.75;G.shake=Math.max(G.shake,4);A.bump();G.score=Math.max(0,G.score-30);yell(e);}}
    if(!e.pass&&e.z>pz+hl){e.pass=true;passBy(e,dx-hw2);}
   }else if(e.type==='pot'){if(!e.hit&&dx<1&&dz<1){e.hit=true;G.sp*=.7;G.shake=5;G.slow=.5;A.pothole();burst(e.x,.4,e.z,6,4);say('গর্ত! উফ্‌!');}}
   else if(e.type==='pud'){if(!e.hit&&dx<1.6&&dz<1.6){e.hit=true;G.slow=1.1;A.splash();burst(e.x,.5,e.z,14,6);say('জল জমেছে!');}}
   else if(dx<1.6&&dz<1.8)collect(e);}
  let st=null;for(const e of ents){if(e.type==='stn'){const rel=-e.z-G.D;if(Math.abs(rel)<6.5&&Math.abs(G.x-e.sd*(G.hw-1.4))<3.6){st=e;break;}}}
  G.atStn=!!st;let txt='';
  if(st){if(G.sp<5){if(G.fuel<99.9){const add=Math.min(100-G.fuel,16*dt);G.fuel+=add;if(!ch){const c=add*.5;G.score=Math.max(0,G.score-c);G.fillCost+=c;}else G.anger=Math.min(100,G.anger+1.5*dt);G.fillT-=dt;if(G.fillT<=0){G.fillT=.22;A.glug();}txt='⚡ চার্জ হচ্ছে… '+bn(G.fuel)+'%'+(ch?'':' · −₹'+bn(G.fillCost));}else{txt='⚡ ব্যাটারি ফুল!';if(!G.fullSaid){G.fullSaid=1;say('ব্যাটারি ফুল! ⚡',1);A.coin();}}}else txt='⚡ দাগের ওপর থামো — চার্জ হবে';}
  else{G.fillCost=0;G.fullSaid=0;let best=1e9,bs=1;for(const e of ents)if(e.type==='stn'){const rel=-e.z-G.D;if(rel>0&&rel<best){best=rel;bs=e.sd;}}if(best<260&&G.fuel<60)txt='⚡ চার্জিং · '+bn(best)+' মি '+(bs>0?'▶':'◀');}
  setT('fillchip',txt);$('fillchip').style.display=txt?'block':'none';
  ents=ents.filter(e=>{const rel=-e.z-G.D;const dead=e.gone||(G.ct>=-.15?(rel<-120||rel>260):(rel>120||rel<-260));if(dead)rmEnt(e);return!dead;});
  hud();A.eng(G.sp,true,keys.go||keys.turbo,G.rainA);
 }
 if(G.state==='over'||G.state==='menu'||G.state==='garage'||G.state==='paused'){A.eng(0,false);}
 syncChunks(G.D);envUpdate(dt);
 // player pose
 const pz=-G.D;const jit=G.state==='play'?G.rough*clamp(G.sp/12,0,1):0,jy=(Math.sin(G.t*38)*.5+Math.sin(G.t*23+1)*.5)*.06*jit;player.position.set(G.x,G.ev+jy+(G.jy||0),pz);ringM.opacity=.3+.25*Math.sin(G.t*7);if(player.userData.driver)player.userData.driver.visible=!(G.state==='play'&&SAVE.cam===2);player.rotation.y=-G.th+(G.tyaw||0);player.rotation.z=clamp((G.yr||0)*G.sp*.006,-.12,.12)+Math.sin(G.t*31)*.03*jit;player.rotation.x=Math.atan((elevAt(G.D+4)-G.ev)/4);
 player.userData.wh.forEach(w=>w.rotation.x-=G.sp*dt/.37);
 player.visible=!(G.inv>0&&Math.floor(G.t*14)%2);
 if(G.shield>0){}
 // light
 sun.position.set(G.x-25,45,pz+15);sun.target.position.set(G.x,0,pz);{const sx=Math.sin(G.th),cz2=Math.cos(G.th);head.position.set(G.x+sx*1.2,1.2+G.ev,pz-cz2*1.2);head.target.position.set(G.x+sx*28,G.ev,pz-cz2*28);}
 // mob
 const showMob=false;const nm=Math.min(10,3+Math.floor(G.anger/8));
 mobG.forEach((p,i)=>{p.visible=showMob&&i<nm;if(p.visible){p.position.set(G.x+((i%5)-2)*1.4+Math.sin(G.t*2+i)*.5,elevAt(Math.max(0,G.D-G.mobD)),pz+G.mobD+Math.floor(i/5)*2.2);p.rotation.y=Math.PI;walk(p,G.t*12+i,1);p.userData.arms[0].rotation.x=-2.6;p.userData.arms[1].rotation.x=-2.6;}});
 // camera
 let cx,cy,cz,lx,ly,lz,fov=66;
 if(G.cam==='play'||G.state==='over'){const tb=G.state==='play'&&keys.turbo&&G.fuel>2;fov=66+(tb?10:0)+clamp((G.sp-15)*.4,0,6);{let d=G.th-(G.cth||0);while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;G.cth=(G.cth||0)+d*Math.min(1,dt*3.5);const sa=Math.sin(G.cth),ca=Math.cos(G.cth);{const cl=Math.max(G.hw+3.6,Math.abs(G.x)+2);cx=clamp(G.x-sa*8.6,-cl,cl);}cz=pz+ca*8.6;lx=G.x+sa*12;lz=pz-ca*12;}cy=4.3+G.ev;ly=1.3+G.ev;cy+=jit*Math.sin(G.t*29)*.04;if(G.shake>0){cx+=rnd(-1,1)*G.shake*.05;cy+=rnd(-1,1)*G.shake*.05;}}
 else if(G.cam==='garage'){cx=G.x+3.2*Math.sin(G.t*.5)+2;cy=2.6;cz=pz+5.5;lx=G.x;ly=1.2;lz=pz;}
 else{cx=G.x+Math.sin(G.t*.25)*4;cy=3.8;cz=pz+9;lx=G.x;ly=1.3;lz=pz-8;}
 if(G.state==='play'&&SAVE.cam&&!(G.beatT>0)){const sa=Math.sin(G.cth||G.th),ca=Math.cos(G.cth||G.th);if(SAVE.cam===1){cx=G.x-sa*12.5;cz=pz+ca*12.5;cy=5.6+G.ev;lx=G.x+sa*18;lz=pz-ca*18;ly=1+G.ev;}else{const s2=Math.sin(G.th),c2=Math.cos(G.th);cx=G.x+s2*.55;cz=pz-c2*.55;cy=1.98+G.ev+(G.jy||0);lx=G.x+s2*22;lz=pz-c2*22;ly=1.3+G.ev;fov=80;if(G.shake>0){cx+=rnd(-1,1)*G.shake*.02;cy+=rnd(-1,1)*G.shake*.02;}}}
 if(G.beatT>0||(G.state==='over'&&G.reason==='caught')){cx=G.x+Math.sin(G.t*.6)*2.5;cz=pz+3.2;cy=8.5+G.ev;lx=G.x;ly=G.ev;lz=pz-.5;fov=62;}
 camPos.set(cx,cy,cz);if(G.camSnap){G.camSnap=0;camera.position.copy(camPos);}else if(G.state==='play')camera.position.lerp(camPos,SAVE.cam===2&&!(G.beatT>0)?1:Math.min(1,dt*9));else camera.position.lerp(camPos,Math.min(1,dt*3));
 camLook.set(lx,ly,lz);camera.lookAt(camLook);camera.fov=lerp(camera.fov,fov,Math.min(1,dt*5));camera.updateProjectionMatrix();
 sunDisc.position.set(camera.position.x+70,48,camera.position.z-235);
 updPts(dt);
 if(G.rainA>.02){const cp=camera.position;for(let i=0;i<NR;i++){const o=ro[i];o[1]-=45*dt;if(o[1]<0)o[1]+=18;const x=cp.x+o[0],y=o[1],z=cp.z+o[2];rp.set([x,y,z,x-.15,y+.9,z],i*6);}rg.attributes.position.needsUpdate=true;}
 rain.visible=G.rainA>.02;
 if(G.state==='play')drawMini();
 updBubs(dt);
}
function h2(a,b){let h=(Math.imul(a|0,374761393)+Math.imul(b|0,668265263))>>>0;h=Math.imul(h^(h>>>13),1274126177)>>>0;return((h^(h>>>16))>>>0)/4294967296;}
function rinfo(k,ax){const key=ax+':'+k;if(RI[key])return RI[key];const r=h2(k*7+ax*31,k*13-ax*11+5);let o;
 if((((k%4)+4)%4)===0)o={hw:7.6,kind:'main',lanes:[2.1,5.4],med:1};else if(r<.3)o={hw:3.7,kind:'gali',lanes:[1.75]};else o={hw:5.6,kind:'norm',lanes:[1.45,4.1]};return RI[key]=o;}
function nbOf(i,j){return Math.floor(h2(Math.floor(i/3)+101,Math.floor(j/3)-77)*8)%8;}
function cellOf(x,z){return[Math.floor(x/B),Math.floor(z/B)];}
function curbRect(i,j){return[i*B+hwV(i),(i+1)*B-hwV(i+1),j*B+hwH(j),(j+1)*B-hwH(j+1)];}
function blockRect(i,j){const c=curbRect(i,j);return[c[0]+SWW,c[1]-SWW,c[2]+SWW,c[3]-SWW];}
function blockKind(i,j){const nb=nbOf(i,j),r=h2(i*3+17,j*5-9);if(nb===6)return r<.75?'park':'bld';if(nb===7)return r<.4?'lake':r<.75?'park':'bld';return r<.07?'park':'bld';}
function onRoad(x,z){const i=Math.round(x/B),j=Math.round(z/B),u=x-i*B,v=z-j*B,inV=Math.abs(u)<hwV(i),inH=Math.abs(v)<hwH(j);return{inV,inH,i,j,u,v};}
function dirWord(x,z){const dx=x-G.x,dz=z+G.D;const a=Math.atan2(dx,-dz)-G.th;const n=Math.round(((a%(2*Math.PI))+2*Math.PI)%(2*Math.PI)/(Math.PI/2))%4;return['▲ সামনে','▶ ডানে','▼ পিছনে','◀ বামে'][n];}
function vcBoxes(list){// list of [px,py,pz,sx,sy,sz,rotY,color]
 const P=[],N=[],C=[],pa=UBn.attributes.position,na=UBn.attributes.normal,m4=new T.Matrix4(),q=new T.Quaternion(),ax=new T.Vector3(0,1,0),v=new T.Vector3(),nm=new T.Matrix3(),col=new T.Color();
 for(const b of list){q.setFromAxisAngle(ax,b[6]);m4.compose(new T.Vector3(b[0],b[1],b[2]),q,new T.Vector3(b[3],b[4],b[5]));nm.getNormalMatrix(m4);col.set(b[7]);
  for(let k=0;k<pa.count;k++){v.fromBufferAttribute(pa,k).applyMatrix4(m4);P.push(v.x,v.y,v.z);v.fromBufferAttribute(na,k).applyMatrix3(nm).normalize();N.push(v.x,v.y,v.z);C.push(col.r,col.g,col.b);}}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(P,3));g.setAttribute('normal',new T.Float32BufferAttribute(N,3));g.setAttribute('color',new T.Float32BufferAttribute(C,3));g.computeBoundingSphere();return g;}
function personBoxes(x,y,z,ry,h,list){const sh=pick(CSH),pn=pick(CPT),sk=pick(CSK);list.push([x,y+.4*h,z,.34,.8*h,.28,ry,pn],[x,y+1.14*h,z,.52,.68*h,.3,ry,sh],[x,y+1.66*h,z,.3,.3,.3,ry,sk],[x,y+1.84*h,z,.32,.08,.32,ry,'#1c1410']);}
function walkerMesh(){const L=[];personBoxes(0,0,0,0,1,L);const m=new T.Mesh(vcBoxes(L),vcMat);m.userData.own=1;const g=new T.Group();g.add(m);return g;}
function signMat(t){const k=t.uuid;return sgMat[k]||(sgMat[k]=new T.MeshLambertMaterial({map:t}));}
function QB(){return{p:[],n:[],u:[]};}
function qTop(q,x0,x1,z0,z1,y,us){us=us||8;const P=[[x0,z0],[x1,z1],[x1,z0],[x0,z0],[x0,z1],[x1,z1]];for(const [x,z] of P){q.p.push(x,y,z);q.n.push(0,1,0);q.u.push(x/us,-z/us);}}
function qSide(q,ax,az,bx2,bz,y0,y1,nx,nz){const P=[[ax,y0,az],[bx2,y0,bz],[bx2,y1,bz],[ax,y0,az],[bx2,y1,bz],[ax,y1,az]];for(const p of P){q.p.push(...p);q.n.push(nx,0,nz);q.u.push((p[0]+p[2])/3,p[1]/3);}}
function qMesh(g,q,m){if(!q.p.length)return;const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(q.p,3));geo.setAttribute('normal',new T.Float32BufferAttribute(q.n,3));geo.setAttribute('uv',new T.Float32BufferAttribute(q.u,2));const me=new T.Mesh(geo,m);me.userData.own=1;me.receiveShadow=true;g.add(me);return me;}
function buildBuildingsEdge(g,R,nb,ox,oz,rot,len,dd){const sub=new T.Group();sub.position.set(ox,0,oz);sub.rotation.y=rot;g.add(sub);const Z=ZN[nb];let c=-len/2+R()*2;
 while(c<len/2-5){const w=Math.min(len/2-c,7+((R()*7)|0));if(w<4)break;const f=Math.max(2,(nb===4?4:nb===3?3:2)+((R()*(nb===4?7:5))|0)),d=dd,col=pick(Z.pal),lit=(Z.night?R()<.85:R()<.35)?1:0;const zc=c+w/2;
  const m=new T.Mesh(bldGeo(w,f,d),bldMat(col,lit));m.position.set(-d/2,f*1.6,zc);m.castShadow=true;m.receiveShadow=true;sub.add(m);
  if(R()<.8){const st=Z.shops[(R()*Z.shops.length)|0],bgc=pick(['#c0392b','#1b6b4a','#2c5fbb','#8e3b8f','#d98324','#222']);const sg=new T.Mesh(signGeo,signMat(signTex(st,bgc,'#fff')));sg.scale.set(Math.min(w-1.2,6.5),1.3,1);sg.position.set(.05,3.3,zc);sg.rotation.y=Math.PI/2;sub.add(sg);
   bx(.5,.12,Math.min(w-1,6.6),pick(['#c0392b','#2c5fbb','#1b6b4a','#d98324']),.3,2.55,zc,sub);}
  bldDetail(sub,-1,0,zc,w,f,R);c+=w+(R()<.12?3:.2);}
 return sub;}
function sidewalkCrowd(g,R,cr,br,n){const L=[];
 for(let i=0;i<n;i++){const e=(R()*4)|0,t=R();let x,z;const inset=.6+R()*(SWW-1.3);
  if(e===0){x=cr[0]+inset;z=br[2]+t*(br[3]-br[2]);}else if(e===1){x=cr[1]-inset;z=br[2]+t*(br[3]-br[2]);}else if(e===2){z=cr[2]+inset;x=br[0]+t*(br[1]-br[0]);}else{z=cr[3]-inset;x=br[0]+t*(br[1]-br[0]);}
  personBoxes(x,.22,z,R()*6.28,.88+R()*.26,L);}
 if(L.length){const m=new T.Mesh(vcBoxes(L),vcMat);m.userData.own=1;m.userData.keep=1;m.castShadow=false;m.receiveShadow=true;g.add(m);}}
function poleWires(g,R,cr,sol){const P=[];const poles=[];const add=(x,z,nx,nz)=>{cy(.09,7.8,'#4b4f56',x,3.9,z,g);if(sol)sol.push([x-.2,x+.2,z-.2,z+.2,0]);if(R()<.25){bx(.7,.9,.7,'#5d6168',x-nx*.4,5.5,z-nz*.4,g);}if(R()<.3)bx(.6,.18,.4,lampMat,x+nx*.9,7.1,z+nz*.9,g);poles.push([x,z]);return[x,z];};
 const sag=(a,b,s,n)=>{for(let i=0;i<n;i++){const t0=i/n,t1=(i+1)/n;P.push(a[0]+(b[0]-a[0])*t0,a[1]+(b[1]-a[1])*t0-Math.sin(t0*Math.PI)*s,a[2]+(b[2]-a[2])*t0,a[0]+(b[0]-a[0])*t1,a[1]+(b[1]-a[1])*t1-Math.sin(t1*Math.PI)*s,a[2]+(b[2]-a[2])*t1);}};
 const edges=[[cr[0]+.5,cr[2],cr[0]+.5,cr[3],1,0],[cr[1]-.5,cr[2],cr[1]-.5,cr[3],-1,0],[cr[0],cr[2]+.5,cr[1],cr[2]+.5,0,1],[cr[0],cr[3]-.5,cr[1],cr[3]-.5,0,-1]];
 for(const [ax,az,bx2,bz,nx,nz] of edges){const L=Math.hypot(bx2-ax,bz-az),n=Math.max(2,Math.round(L/13));let prev=null;for(let k=1;k<n;k++){const t=k/n;const p=add(ax+(bx2-ax)*t,az+(bz-az)*t,-nx,-nz);
   if(prev){const nc=2+((R()*4)|0);for(let q=0;q<nc;q++){sag([prev[0],6.1+R()*1.2,prev[1]],[p[0],6.1+R()*1.2,p[1]],.3+R()*1.3,8);}}
   if(R()<.55)sag([p[0],6.6,p[1]],[p[0]+nx*(SWW+.5),4.8+R()*3,p[1]+nz*(SWW+.5)],.2+R()*.5,5);
   if(R()<.22){const far=nx?[p[0]-nx*(2*hwV(Math.round(p[0]/B))+1),p[1]]:[p[0],p[1]-nz*(2*hwH(Math.round(p[1]/B))+1)];sag([p[0],6.5,p[1]],[far[0],6.5,far[1]],.8+R()*1.2,10);}prev=p;}}
 if(P.length){const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(P,3));const ls=new T.LineSegments(geo,wireM);ls.userData.own=1;g.add(ls);}}
function roadMarks(g,R,i,j){// vertical segment of road x=i*B between j and j+1, horizontal segment z=j*B between i and i+1
 const V=rinfo(i,0),H=rinfo(j,1);
 {const x=i*B,z0=j*B+hwH(j),z1=(j+1)*B-hwH(j+1),L=z1-z0,zc=(z0+z1)/2;
  if(V.med){bx(.7,.3,L-6,'#e2c037',x,.15,zc,g);for(let z=z0+4;z<z1-4;z+=2)bx(.72,.31,.9,'#1a1a1d',x,.155,z,g);for(let z=z0+6;z<z1-6;z+=7){const b=new T.Mesh(UI,leafM[0]);b.scale.set(.3,.36,.3);b.position.set(x,.55,z);g.add(b);}}
  else if(V.kind==='norm'){bx(.12,.02,L-4,yelM,x-.13,.02,zc,g);bx(.12,.02,L-4,yelM,x+.13,.02,zc,g);}
  if(V.lanes.length>1){const o=(V.lanes[0]+V.lanes[1])/2;for(let z=z0+6;z<z1-6;z+=6){bx(.14,.02,2.6,whM,x-o,.02,z,g);bx(.14,.02,2.6,whM,x+o,.02,z,g);}}
  if(V.kind!=='gali')for(const zz of[z0+2,z1-2])for(let xx=x-V.hw+.6;xx<x+V.hw-.4;xx+=1.1)bx(.6,.02,2.4,whM,xx,.021,zz,g);}
 {const z=j*B,x0=i*B+hwV(i),x1=(i+1)*B-hwV(i+1),L=x1-x0,xc=(x0+x1)/2;
  if(H.med){bx(L-6,.3,.7,'#e2c037',xc,.15,z,g);for(let x=x0+4;x<x1-4;x+=2)bx(.9,.31,.72,'#1a1a1d',x,.155,z,g);for(let x=x0+6;x<x1-6;x+=7){const b=new T.Mesh(UI,leafM[0]);b.scale.set(.3,.36,.3);b.position.set(x,.55,z);g.add(b);}}
  else if(H.kind==='norm'){bx(L-4,.02,.12,yelM,xc,.02,z-.13,g);bx(L-4,.02,.12,yelM,xc,.02,z+.13,g);}
  if(H.lanes.length>1){const o=(H.lanes[0]+H.lanes[1])/2;for(let x=x0+6;x<x1-6;x+=6){bx(2.6,.02,.14,whM,x,.02,z-o,g);bx(2.6,.02,.14,whM,x,.02,z+o,g);}}
  if(H.kind!=='gali')for(const xx of[x0+2,x1-2])for(let zz=z-H.hw+.6;zz<z+H.hw-.4;zz+=1.1)bx(2.4,.02,.6,whM,xx,.021,zz,g);}}
function buildCell(i,j){const g=new T.Group(),key=i+','+j;let s=(Math.imul(i,73856093)^Math.imul(j,19349663))>>>0;const R=()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};
 const nb=nbOf(i,j),kind=blockKind(i,j),cr=curbRect(i,j),br=blockRect(i,j),Z=ZN[nb],sol=[],cel={g,sol,ents:[],nb,kind,i,j};
 const rq=QB(),wq=QB(),cq=QB();
 // roads: vertical seg, horizontal seg, intersection
 qTop(rq,i*B-hwV(i),i*B+hwV(i),j*B+hwH(j),(j+1)*B-hwH(j+1),0);qTop(rq,i*B+hwV(i),(i+1)*B-hwV(i+1),j*B-hwH(j),j*B+hwH(j),0);qTop(rq,i*B-hwV(i),i*B+hwV(i),j*B-hwH(j),j*B+hwH(j),0);
 // sidewalk block
 qTop(wq,cr[0],cr[1],cr[2],cr[3],.22,2.6);
 qSide(cq,cr[0],cr[2],cr[0],cr[3],0,.22,-1,0);qSide(cq,cr[1],cr[3],cr[1],cr[2],0,.22,1,0);qSide(cq,cr[1],cr[2],cr[0],cr[2],0,.22,0,-1);qSide(cq,cr[0],cr[3],cr[1],cr[3],0,.22,0,1);
 qMesh(g,rq,roadM);qMesh(g,wq,walkM);qMesh(g,cq,curbSM);
 roadMarks(g,R,i,j);
 if(kind==='bld'){const W=br[1]-br[0],H=br[3]-br[2],dd=Math.min(13,W/2-1,H/2-1);
  buildBuildingsEdge(g,R,nb,br[0],(br[2]+br[3])/2,Math.PI,H,dd);buildBuildingsEdge(g,R,nb,br[1],(br[2]+br[3])/2,0,H,dd);
  buildBuildingsEdge(g,R,nb,(br[0]+br[1])/2,br[2],Math.PI/2,W-2*dd,dd);buildBuildingsEdge(g,R,nb,(br[0]+br[1])/2,br[3],-Math.PI/2,W-2*dd,dd);
  if(W-2*dd>1&&H-2*dd>1)bx(W-2*dd+.2,7,H-2*dd+.2,'#4f4a44',(br[0]+br[1])/2,3.5,(br[2]+br[3])/2,g);
  sol.push([...br,1]);}
 else{const q=QB();qTop(q,br[0],br[1],br[2],br[3],.24,6);qMesh(g,q,grassM);
  for(const [a,b2,c2,d2] of[[br[0],br[1],br[2],br[2]],[br[0],br[1],br[3],br[3]],[br[0],br[0],br[2],br[3]],[br[1],br[1],br[2],br[3]]]){const L=Math.max(b2-a,d2-c2);bx(b2-a||.12,.9,d2-c2||.12,'#e8e4d8',(a+b2)/2,.65,(c2+d2)/2,g);}
  if(kind==='lake'){const q2=QB();qTop(q2,br[0]+6,br[1]-6,br[2]+6,br[3]-6,.3,6);qMesh(g,q2,waterM);}
  const lmk=typeof LMK!=='undefined'&&LMK&&LMK.has(kind);if(lmk)landmark(g,kind,br,R,sol);const nt=kind==='lake'?14:lmk?10:24;for(let k=0;k<nt;k++){const x=br[0]+2+R()*(br[1]-br[0]-4),z=br[2]+2+R()*(br[3]-br[2]-4);if((kind==='lake'||lmk)&&x>br[0]+5&&x<br[1]-5&&z>br[2]+5&&z<br[3]-5)continue;tree(g,x,z,.9+R()*.7);}
  if(nb===6&&R()<.35&&typeof memorial==='function'){}
  sol.push([...br,0]);}
 // sidewalk trees in green districts
 if(nb>=6||R()<.3)for(let k=0;k<5;k++){const e=(R()*4)|0,t=.1+R()*.8;let x,z;if(e===0){x=cr[0]+1.2;z=cr[2]+t*(cr[3]-cr[2]);}else if(e===1){x=cr[1]-1.2;z=cr[2]+t*(cr[3]-cr[2]);}else if(e===2){z=cr[2]+1.2;x=cr[0]+t*(cr[1]-cr[0]);}else{z=cr[3]-1.2;x=cr[0]+t*(cr[1]-cr[0]);}tree(g,x,z,.75+R()*.4);sol.push([x-.3,x+.3,z-.3,z+.3,2]);}
 // medians as solids
 if(rinfo(i,0).med)sol.push([i*B-.4,i*B+.4,j*B+hwH(j)+3.5,(j+1)*B-hwH(j+1)-3.5]);
 if(rinfo(j,1).med)sol.push([i*B+hwV(i)+3.5,(i+1)*B-hwV(i+1)-3.5,j*B-.4,j*B+.4]);
 poleWires(g,R,cr,sol);cellExtras(g,R,i,j,cel);
 if(R()<.35&&rinfo(i,0).kind!=='gali'){const sub=new T.Group();sub.position.set(i*B,0,0);g.add(sub);bunting(sub,hwV(i)+.4,j*B+B*(.3+R()*.4),R);}
 if(R()<.25&&rinfo(j,1).kind!=='gali'){const sub=new T.Group();sub.position.set(0,0,j*B);sub.rotation.y=Math.PI/2;g.add(sub);bunting(sub,hwH(j)+.4,-(i*B+B*(.3+R()*.4)),R);}
 sidewalkCrowd(g,R,cr,br,kind==='bld'?(nb===0||nb===2||nb===4?34:24):12);
 mergeChunk(g);recvAll(g);
 cel.R=R;return cel;}
function edgeSpot(i,j,R,inset){const cr=curbRect(i,j),e=(R()*4)|0,t=.15+R()*.7;inset=inset||0;
 if(e===0)return{x:cr[0]+inset,z:cr[2]+t*(cr[3]-cr[2]),nx:-1,nz:0};if(e===1)return{x:cr[1]-inset,z:cr[2]+t*(cr[3]-cr[2]),nx:1,nz:0};if(e===2)return{x:cr[0]+t*(cr[1]-cr[0]),z:cr[2]+inset,nx:0,nz:-1};return{x:cr[0]+t*(cr[1]-cr[0]),z:cr[3]-inset,nx:0,nz:1};}
function populateCell(c){const R=c.R,{i,j,nb}=c,ch=G.mode==='chaos',E=c.ents;const add=e=>{if(e){e.cell=c;E.push(e);}};
 const mkt=nb===0||nb===2||nb===4;
 if(c.kind==='bld'){const ns=(mkt?3:1)+((R()*3)|0);for(let k=0;k<ns;k++){const p=edgeSpot(i,j,R,1.6);add(place2('stall',p.x,p.z,{ry:rotTo(p.nx,p.nz)+Math.PI/2}));}
  if(R()<.45){const p=edgeSpot(i,j,R,1.9);add(place2('shelter',p.x,p.z,{ry:rotTo(p.nx,p.nz)+Math.PI/2}));}}
 for(let k=0;k<1+((R()*2)|0);k++){const p=edgeSpot(i,j,R,.6);add(place2('bin',p.x,p.z,{}));}
 for(let pq=R()<.85?(R()<.45?2:1):0;pq>0;pq--){const p=edgeSpot(i,j,R,.7);const e=place2('pax',p.x,p.z,{ry:Math.atan2(p.nx,p.nz)});if(e){e.nx=p.nx;e.nz=p.nz;add(e);}}
 if(h2(i*5+3,j*7+1)<.2){const p=edgeSpot(i,j,R,0);const e=place2('stn',p.x-p.nx*2.4,p.z-p.nz*2.4,{ry:rotTo(p.nx,p.nz),sd:-1});if(e){e.zx=p.x+p.nx*1.6;e.zz=p.z+p.nz*1.6;add(e);}}
 if(h2(i*11-5,j*3+9)<.16){const p=edgeSpot(i,j,R,0);const e=place2('mama',p.x+p.nx*1.2,p.z+p.nz*1.2,{ry:rotTo(p.nx,p.nz),sd:-1});if(e){e.zx=e.x;e.zz=e.z;add(e);}}
 if(R()<.3){const z=j*B+B/2,e=place2('sbk',i*B,z,{w:hwV(i)});if(e){e.ax=0;e.k=i;add(e);}}
 else if(R()<.3){const x=i*B+B/2,e=place2('sbk',x,j*B,{w:hwH(j),ry:Math.PI/2});if(e){e.ax=1;e.k=j;add(e);}}
 const np=(ivlBad(i,j)?3:1)+((R()*2)|0);for(let k=0;k<np;k++){const vert=R()<.5;const hw=vert?hwV(i):hwH(j),o=(R()-.5)*(hw*2-1.5),t=.2+R()*.6;const x=vert?i*B+o:i*B+t*B,z=vert?j*B+t*B:j*B+o;add(place2(R()<.65?'pot':'pud',x,z,{}));}
 if((nb===0||nb===2||nb===3)&&R()<.3){const vert=R()<.5,lane=(vert?rinfo(i,0):rinfo(j,1)).hw-1.2,t=.25+R()*.5,sd=R()<.5?-1:1;add(place2('cow',vert?i*B+sd*lane:i*B+t*B,vert?j*B+t*B:j*B+sd*lane,{ry:R()*6}));}
 const nw=mkt?6:3;for(let k=0;k<nw;k++){const p=edgeSpot(i,j,R,.9+R()*2.2);const e=place2('walker',p.x,p.z,{});if(e){e.nx=p.nx;e.nz=p.nz;e.wx=p.nz?1:0;e.wz=p.nx?1:0;e.wv=(R()<.5?-1:1)*rnd(.9,1.5);e.cr=curbRect(i,j);add(e);}}
 if(rinfo(i,0).kind==='main'&&rinfo(j,1).kind==='main'&&!rinfo(i,0).med)add(place2('podium',i*B,j*B,{}));parkedCars(c);}
function ivlBad(i,j){return h2(i*9+1,j*9-3)<.3;}
function gridSync(){const [ci,cj]=cellOf(PX(),PZ());for(const [k,c] of cells){if(Math.abs(c.i-ci)>CR+1||Math.abs(c.j-cj)>CR+1){world.remove(c.g);disposeChunk(c.g);for(const e of c.ents){if(!e.keep){e.gone=true;}}cells.delete(k);}}
 let built=0;for(let r=0;r<=CR;r++)for(let i=ci-r;i<=ci+r;i++)for(let j=cj-r;j<=cj+r;j++){if(Math.max(Math.abs(i-ci),Math.abs(j-cj))!==r)continue;const k=i+','+j;if(cells.has(k))continue;if(built>=(G.state==='play'?1:99))return;const c=buildCell(i,j);world.add(c.g);cells.set(k,c);populateCell(c);built++;}}
function solidsNear(x,z){const [ci,cj]=cellOf(x,z),out=[];for(let i=ci-1;i<=ci+1;i++)for(let j=cj-1;j<=cj+1;j++){const c=cells.get(i+','+j);if(c)for(const s of c.sol)out.push(s);}return out;}
function pushOut(x,z,r){let px=0,pz=0,hit=0;for(const s of solidsNear(x,z)){if(x<s[0]-r||x>s[1]+r||z<s[2]-r||z>s[3]+r)continue;const cx=clamp(x,s[0],s[1]),cz=clamp(z,s[2],s[3]),dx=x-cx,dz=z-cz,d2=dx*dx+dz*dz;
 if(d2>1e-6){if(d2<r*r){const d=Math.sqrt(d2),k=(r-d)/d;px+=dx*k;pz+=dz*k;hit=1;}}else{hit=1;const l=x-s[0],rr=s[1]-x,t=z-s[2],b=s[3]-z,m=Math.min(l,rr,t,b);if(m===l)px-=l+r;else if(m===rr)px+=rr+r;else if(m===t)pz-=t+r;else pz+=b+r;}}return hit?[px,pz]:null;}
function solidAt(x,z){for(const s of solidsNear(x,z))if(x>s[0]&&x<s[1]&&z>s[2]&&z<s[3])return true;return false;}
function podiumModel(){const g=new T.Group();cy(.7,.45,'#e9e4d6',0,.22,0,g);const um=new T.Mesh(new T.ConeGeometry(1.2,.5,8),M('#e64a2e'));um.position.y=3.1;g.add(um);cy(.04,2.8,'#777',0,1.7,0,g);const p=person('#f4f4f0',{pants:'#f4f4f0'});p.position.y=.45;g.add(p);bx(.34,.12,.34,'#f4f4f0',0,2.2,0,p);g.userData.cop=p;return g;}
function place2(type,x,z,o){o=o||{};const d=DEFS[type];if(!d)return null;let mesh=type==='podium'?podiumModel():type==='walker'?walkerMesh():mk(type,pick(PCOL),o.w||d.w,o.sd||-1);if(!mesh)return null;
 if(MERGE.has(type))mergeChunk(mesh);
 const e={type,d,x,z,w:o.w||d.w,l:d.l,v:d.v[0]+Math.random()*(d.v[1]-d.v[0]),vx:0,t:Math.random()*6,hit:false,h:0,yo:0,ry:o.ry||0,col:pick(PCOL),mesh};
 if(d.lethal){const r=new T.Mesh(RINGG,ringM);r.rotation.x=-Math.PI/2;r.scale.set(e.w*.95,e.l*.66,1);r.position.y=.07;mesh.add(r);}
 if(renderer.shadowMap.enabled&&(d.b||type==='walker'))castAll(mesh);
 mesh.position.set(x,(type==='pot'||type==='pud'||type==='sbk'||type==='podium')?0:(d.side||type==='bin'||type==='walker'||type==='pax'?.22:0),z);mesh.rotation.y=e.ry;scene.add(mesh);e.vb=e.v;ents.push(e);return e;}
function pickV(gali){const w=VTW();if(gali){w.bus=0;w.lorry=0;w.tempo*=.6;}let t=0;for(const k in w)t+=w[k];let r=Math.random()*t;for(const k in w){r-=w[k];if(r<=0)return k;}return'taxi';}
function laneXZ(a,along){// returns world pos of lane at 'along' coordinate
 return a.ax===0?[a.k*B+a.dir*a.off,along]:[along,a.k*B-a.dir*a.off];}
function spawnVehicle(type,ai,along){const [x,z]=laneXZ(ai,along);const th=ai.ax===0?(ai.dir>0?Math.PI:0):(ai.dir>0?Math.PI/2:-Math.PI/2);const e=place2(type,x,z,{ry:-th});if(!e)return null;e.th=th;e.ai=Object.assign({},ai);e.dyn=1;return e;}
function randomRoadSpot(near){const ang=Math.random()*Math.PI*2;const dist=near?rnd(...near):rnd(95,170);let x=PX()+Math.sin(ang)*dist,z=PZ()-Math.cos(ang)*dist;const ax=Math.random()<.5?0:1;const k=Math.round((ax===0?x:z)/B);const ri=rinfo(k,ax);
 const along=ax===0?z:x;const crossK=Math.round(along/B),crossHw=ax===0?hwH(crossK):hwV(crossK);if(Math.abs(along-crossK*B)<crossHw+4)return null;return{ax,k,dir:Math.random()<.5?1:-1,ri,along};}
function spawnTraffic(){const want=[16,34,50][TRAF]*(G.state==='play'?1:.6);let n=ents.filter(e=>e.dyn&&e.ai&&!e.esc).length;let tries=0;
 while(n<want&&tries++<10){const s=randomRoadSpot();if(!s)continue;const t=pickV(s.ri.kind==='gali');const ls=s.ri.lanes;const off=SLOWV.has(t)?ls[ls.length-1]:pick(ls);
  const a={ax:s.ax,k:s.k,dir:s.dir,off};const [x,z]=laneXZ(a,s.along);{const dd=Math.hypot(x-PX(),z-PZ());if(dd<45||(dd<80&&!offScreen(x,-z)))continue;}if(ents.some(o=>o.dyn&&Math.abs(o.x-x)<3&&Math.abs(o.z-z)<9))continue;spawnVehicle(t,a,s.along);n++;}}
function spawnCrosser(){const th=G.th,fx=Math.sin(th),fz=-Math.cos(th);const d=rnd(25,60);const x=PX()+fx*d,z=PZ()+fz*d;const r=onRoad(x,z);if(r.inV===r.inH)return;
 const vert=r.inV;const hw=vert?hwV(r.i):hwH(r.j),sd=Math.random()<.5?-1:1,n=1+((Math.random()*2.6)|0);
 for(let q=0;q<n;q++){const e=vert?place2('ped',r.i*B+sd*(hw+.8+q*.5),z+q*1.2,{}):place2('ped',x+q*1.2,r.j*B+sd*(hw+.8+q*.5),{});if(!e)continue;e.dyn=1;e.cx=vert?-sd:0;e.cz=vert?0:-sd;e.cspd=rnd(1.5,2.4);e.cvert=vert;e.ck=vert?r.i:r.j;e.hand=Math.random()<.4;e.dith=Math.random()<.35?rnd(.25,.75):0;e.ry=Math.atan2(e.cx,e.cz);e.mesh.rotation.y=e.ry;}}
function aiDrive(e,dt,obst){const a=e.ai;if(!a)return;
 const along=a.ax===0?e.z:e.x,dirv=a.dir;
 // intersection decision
 const nk=dirv>0?Math.floor(along/B)+1:Math.ceil(along/B)-1,nc=nk*B,dd=(nc-along)*dirv,chw=a.ax===0?hwH(nk):hwV(nk);
 if(dd<chw+2.5&&dd>-2&&a.last!==nk&&!e.follow){a.last=nk;const r=Math.random();if(r<.45&&!e.vip){const left=r<.225;const nax=1-a.ax;let ndir;if(a.ax===0)ndir=left?dirv:-dirv;else ndir=left?-dirv:dirv;
   const ri=rinfo(nk,nax);if(!(ri.kind==='gali'&&(e.type==='bus'||e.type==='lorry'))){a.ax=nax;a.k=nk;a.dir=ndir;a.off=SLOWV.has(e.type)?ri.lanes[ri.lanes.length-1]:pick(ri.lanes);a.last=null;a.turning=1.2;}}}
 if(a.turning)a.turning-=dt;
 const look=4+Math.max(2,e.v*.6);const al2=(a.ax===0?e.z:e.x)+a.dir*look;const [tx,tz]=laneXZ(a,al2);
 let tth=Math.atan2(tx-e.x,-(tz-e.z));let d=tth-e.th;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;const mr=(a.turning>0?1.9:1.3)*dt*Math.min(1,e.v/3+.2);e.th+=clamp(d,-mr,mr);
 // speed: obstacles ahead
 let tgt=e.vb*(a.turning>0?.62:1);const fx=Math.sin(e.th),fz=-Math.cos(e.th),rx=-fz,rz=fx;
 {const si=a.ax===0?a.k:nk,sj=a.ax===0?nk:a.k;if(!e.vip&&!e.chase&&hasSig(si,sj)&&dd>chw+.8&&dd<chw+16){const ph=sigPhase(a.ax);if(ph==='r'||(ph==='y'&&dd>chw+6))tgt=Math.min(tgt,Math.max(0,(dd-chw-2.2)*.9));}}
 let blk=false;
 for(const o of obst){if(o===e)continue;const dx=o.x-e.x,dz=o.z-e.z;const f=dx*fx+dz*fz;if(f<=0||f>9+e.v*1.4)continue;const l=Math.abs(dx*rx+dz*rz);if(l>(e.w+(o.w||1))/2+.35)continue;const gap=f-(e.l+(o.l||1))/2;{const nt=Math.max(0,(gap-2.2)*.85+(o.v&&o.ai?o.v*.6:0));if(nt<tgt){tgt=nt;blk=!!(o.parked||o.type==='cow'||(o.vic)||(o.ai&&o.v<.3&&o.blkT>2));}}
  if(o.isP&&gap<6&&e.v<1.5&&Math.random()<dt*.5){if(e.type==='bus')A.airhorn(.7);else A.pom();G.spk=e;yell(e);}}
 e.v+=clamp(tgt-e.v,-10*dt,3.2*dt);if(e.v<0)e.v=0;
 if(blk&&e.v<.6){e.blkT=(e.blkT||0)+dt;if(e.blkT>1.3){const ri=rinfo(a.k,a.ax);if(ri.lanes.length>1){a.off=a.off===ri.lanes[0]?ri.lanes[1]:ri.lanes[0];e.blkT=-2;}}}else if(e.blkT>0)e.blkT=0;
 e.x+=fx*e.v*dt;e.z+=fz*e.v*dt;e.ry=-e.th;}
function obbHit(e,x,z,r){const c=Math.cos(e.ry),s=Math.sin(e.ry),dx=x-e.x,dz=z-e.z,lx=dx*c-dz*s,lz=dx*s+dz*c,hx=e.w/2,hz=e.l/2;const cx=clamp(lx,-hx,hx),cz=clamp(lz,-hz,hz),ddx=lx-cx,ddz=lz-cz,dd=Math.hypot(ddx,ddz);
 let nx,nz,pen;if(dd>1e-5){pen=r-dd;nx=ddx/dd;nz=ddz/dd;}else{const px=hx-Math.abs(lx),pz=hz-Math.abs(lz);if(px<pz){nx=Math.sign(lx)||1;nz=0;pen=px+r;}else{nx=0;nz=Math.sign(lz)||1;pen=pz+r;}}
 return{pen,gap:-pen,wx:nx*c+nz*s,wz:-nx*s+nz*c};}
function quadM(g,mat,x,y,z,w,h,ry){const m=new T.Mesh(planeG,mat);m.scale.set(w,h,1);m.position.set(x,y,z);m.rotation.y=ry;g.add(m);return m;}
function sigPhase(ax){const t=(performance.now()/1000)%SPER,o=ax===0?0:12,u=(t-o+SPER)%SPER;return u<9?'g':u<11?'y':'r';}
function sigUpdate(){for(const [k,ax] of[['V',0],['H',1]]){const p=sigPhase(ax),c=SIGC[p],m=sigMat[k];m[0].color.set(p==='r'?'#ff2a1f':'#3a1414');m[1].color.set(p==='y'?'#ffc21f':'#3a3214');m[2].color.set(p==='g'?'#2bff6a':'#143a1c');}}
function hasSig(i,j){return rinfo(i,0).kind!=='gali'&&rinfo(j,1).kind!=='gali';}
function sigHeads(g,i,j){const hv=hwV(i),hh=hwH(j),cx=i*B,cz=j*B;
 for(const sx of[-1,1])for(const sz of[-1,1]){const px=cx+sx*(hv+.6),pz=cz+sz*(hh+.6);cy(.09,4.6,'#3b3f46',px,2.3,pz,g);
  // head facing +-z for V approach (traffic coming from sz side), head facing +-x for H approach
  for(const [k,fx,fz] of[['V',0,sz],['H',sx,0]]){const hx=px+fx*.25,hz=pz+fz*.25;bx(fz?.42:.32,1.15,fz?.32:.42,'#15171b',hx,4.1,hz,g);for(let q=0;q<3;q++){const l=new T.Mesh(US,sigMat[k][q]);l.scale.set(.13,.13,.13);l.position.set(hx+fx*.18,4.48-q*.36,hz+fz*.18);g.add(l);}}}}
function cellExtras(g,R,i,j,c){const cr=curbRect(i,j),br=blockRect(i,j),sol=c.sol,pools=[];const V=rinfo(i,0),H=rinfo(j,1);
 const lamp2=(x,z,nx,nz)=>{cy(.08,7.2,'#3a3d44',x,3.6,z,g);bx(Math.abs(nx)*1.8+.08,.08,Math.abs(nz)*1.8+.08,'#3a3d44',x+nx*.9,7.15,z+nz*.9,g);const h=bx(Math.abs(nx)*.6+.3,.14,Math.abs(nz)*.6+.3,lampHeadM,x+nx*1.7,7.05,z+nz*1.7,g);pools.push([x+nx*2.4,z+nz*2.4]);sol.push([x-.22,x+.22,z-.22,z+.22,0]);};
 // lamps along the 4 curbs (light faces the road)
 for(const [ax,az,bx2,bz,nx,nz] of[[cr[0]+.35,cr[2]+6,cr[0]+.35,cr[3]-6,-1,0],[cr[1]-.35,cr[2]+6,cr[1]-.35,cr[3]-6,1,0],[cr[0]+6,cr[2]+.35,cr[1]-6,cr[2]+.35,0,-1],[cr[0]+6,cr[3]-.35,cr[1]-6,cr[3]-.35,0,1]]){const L=Math.hypot(bx2-ax,bz-az),n=Math.max(1,Math.round(L/24));for(let k=0;k<=n;k++){const t=n?k/n:0;lamp2(ax+(bx2-ax)*t+(nz?0:0),az+(bz-az)*t,nx,nz);}}
 if(pools.length){const P=[],U=[];for(const [x,z] of pools){const r=6.8;P.push(x-r,.05,z-r,x+r,.05,z-r,x+r,.05,z+r,x-r,.05,z-r,x+r,.05,z+r,x-r,.05,z+r);U.push(0,0,1,0,1,1,0,0,1,1,0,1);}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(P,3));geo.setAttribute('uv',new T.Float32BufferAttribute(U,2));const m=new T.Mesh(geo,poolM);m.userData.own=1;m.renderOrder=2;g.add(m);}
 // striped kerbs on main roads
 const kerb=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0),n=Math.floor(L/1.2);for(let k=0;k<n;k++){const t=(k+.5)/n,x=x0+(x1-x0)*t,z=z0+(z1-z0)*t;bx(x0===x1?.26:L/n,.27,x0===x1?L/n:.26,k%2?'#1d1d1f':'#f2c230',x,.13,z,g);}};
 if(V.kind==='main'){kerb(cr[0]+.13,cr[2],cr[0]+.13,cr[3]);}if(rinfo(i+1,0).kind==='main')kerb(cr[1]-.13,cr[2],cr[1]-.13,cr[3]);if(H.kind==='main')kerb(cr[0],cr[2]+.13,cr[1],cr[2]+.13);if(rinfo(j+1,1).kind==='main')kerb(cr[0],cr[3]-.13,cr[1],cr[3]-.13);
 // big corner hoardings
 const nh=1+((R()*2)|0);for(let k=0;k<nh;k++){const sx=R()<.5?0:1,sz=R()<.5?0:1,x=sx?cr[1]-2.2:cr[0]+2.2,z=sz?cr[3]-2.2:cr[2]+2.2,ry=(sx?1:-1)*(sz?1:-1)*Math.PI/4+(sz?0:Math.PI);
  const sub=new T.Group();sub.position.set(x,0,z);sub.rotation.y=ry;g.add(sub);bx(.18,6.4,.18,'#4a4d54',-2.3,3.2,0,sub);bx(.18,6.4,.18,'#4a4d54',2.3,3.2,0,sub);bx(6.4,3.4,.22,'#2b2d33',0,7.6,-.12,sub);quadM(sub,pick(adMats),0,7.6,.02,6.1,3.1,0);quadM(sub,pick(adMats),0,7.6,-.26,6.1,3.1,Math.PI);sol.push([x-.5,x+.5,z-.5,z+.5,2]);}
 // shop awnings, posters (only building blocks)
 if(c.kind==='bld'){for(const [ex,ez,nx,nz,len] of[[br[0],null,-1,0,br[3]-br[2]],[br[1],null,1,0,br[3]-br[2]],[null,br[2],0,-1,br[1]-br[0]],[null,br[3],0,1,br[1]-br[0]]]){const n=Math.floor(len/9);for(let k=0;k<n;k++){const t=(k+.5)/n;const x=ex!==null?ex:br[0]+t*(br[1]-br[0]),z=ez!==null?ez:br[2]+t*(br[3]-br[2]);
   if(R()<.55){const col=pick(['#e63946','#2a9d8f','#f4a261','#3a86ff','#ffd23f','#8e44ad']);const a=bx(nz?5.5:1.3,.07,nz?1.3:5.5,col,x+nx*.65,2.85,z+nz*.65,g);if(nx)a.rotation.z=-nx*.3;else a.rotation.x=nz*.3;}
   if(R()<.35){const ry=Math.atan2(nx,nz);const off=(R()-.5)*3;const px=x+nx*.04+(nz?off:0),pz=z+nz*.04+(nx?off:0);if(R()<.25){quadM(g,noPostM,px,1.9,pz,1.5,.56,ry);}for(let q=0;q<2+((R()*3)|0);q++)quadM(g,pick(postMats),px+(nz?q*.75-.7:0),1.2+(q%2)*.15,pz+(nx?q*.75-.7:0),.66,.9,ry);}}}}
 // rooftop billboards
 if(c.kind==='bld'&&R()<.6){const e=(R()*4)|0,x=e===0?br[0]-.5:e===1?br[1]+.5:(br[0]+br[1])/2+(R()-.5)*20,z=e===2?br[2]-.5:e===3?br[3]+.5:(br[2]+br[3])/2+(R()-.5)*20,nx=e===0?-1:e===1?1:0,nz=e===2?-1:e===3?1:0;
  const sub=new T.Group();sub.position.set(x-nx*4,0,z-nz*4);sub.rotation.y=Math.atan2(nx,nz);g.add(sub);const hgt=11+R()*10;bx(.2,3,.2,'#333',-3.5,hgt-1,0,sub);bx(.2,3,.2,'#333',3.5,hgt-1,0,sub);bx(8.4,4.4,.25,'#222',0,hgt+2,-.1,sub);quadM(sub,pick(adMats),0,hgt+2,.06,8,4,0);}
 // traffic signals
 if(hasSig(i,j))sigHeads(g,i,j);
 // sidewalk trees & poles become solid (small)
 }
function parkedCars(c){const {i,j}=c,R=c.R;for(const [ax,k] of[[0,i],[1,j]]){const ri=rinfo(k,ax);if(ri.kind==='gali'||R()<.35)continue;const n=1+((R()*3)|0);for(let q=0;q<n;q++){const sd=R()<.5?-1:1,t=.2+R()*.6,o=ri.hw-1.15;
   const t2=pick(['taxi','car','taxi','auto','cart']);const x=ax===0?k*B+sd*o:i*B+t*B,z=ax===0?j*B+t*B:k*B+sd*o;const e=place2(t2,x,z,{ry:ax===0?(R()<.5?0:Math.PI):(R()<.5?Math.PI/2:-Math.PI/2)});if(e){e.parked=1;e.cell=c;c.ents.push(e);}}}}
function ahead(e,maxD,maxL){const fx=Math.sin(G.th),fz=-Math.cos(G.th),dx=e.x-G.x,dz=e.z+G.D,f=dx*fx+dz*fz,l=Math.abs(dx*-fz+dz*fx);return f>0&&f<maxD&&l<maxL;}
function worldUpd(dt){gridSync();if(G.state==='play'||G.state==='menu'){spawnTraffic();pedT-=dt;if(pedT<=0&&G.state==='play'){pedT=rnd(1.2,2.6);walkerCross();}}
 const px=PX(),pz=PZ(),near=[];for(const e of ents){if(e.gone||e.fly||e.down)continue;if(Math.abs(e.x-px)<130&&Math.abs(e.z-pz)<130&&(e.ai||e.parked||e.vic||e.type==='ped'||e.crossing||e.type==='cow'||e.type==='podium'))near.push(e);}
 if(G.state==='play')near.push({x:px,z:pz,w:1.5,l:2.8,isP:1,v:Math.abs(G.sp)});
 for(const e of ents){if(e.gone)continue;const u=e.mesh.userData;
  if(e.fly){e.ft-=dt;e.vel.y-=28*dt;e.x+=e.vel.x*dt;e.z+=e.vel.z*dt;e.h+=e.vel.y*dt;if(e.h<0){e.h=0;e.vel.y*=-.3;e.vel.x*=.7;e.vel.z*=.7;}e.mesh.position.set(e.x,e.h,e.z);e.mesh.rotation.x+=e.spin.x*dt;e.mesh.rotation.y+=e.spin.y*dt;e.mesh.rotation.z+=e.spin.z*dt;if(e.ft<.5)e.mesh.scale.setScalar(Math.max(.01,e.ft*2));if(e.ft<=0)e.gone=true;continue;}
  if(e.down){e.dT+=dt;e.dvx*=Math.pow(.12,dt);e.dvz*=Math.pow(.12,dt);e.x+=e.dvx*dt;e.z+=e.dvz*dt;const kk=Math.min(1,e.dT*7);e.mesh.rotation.x=-1.5*kk;e.mesh.position.set(e.x,.2*kk+(e.yb||0),e.z);if(e.dT>3){e.mesh.scale.setScalar(Math.max(.01,1-(e.dT-3)*2));if(e.dT>3.5)e.gone=true;}continue;}
  const far=Math.hypot(e.x-px,e.z-pz);if(e.dyn&&!e.keep&&far>200){e.gone=true;continue;}
  if(e.vic){e.svx*=Math.pow(.3,dt);e.svz*=Math.pow(.3,dt);e.x+=e.svx*dt;e.z+=e.svz*dt;e.th=(e.th||0)+e.rot*dt;e.rot*=Math.pow(.4,dt);e.ry=-e.th;{const dx=e.x-PX(),dz=e.z-PZ(),d=Math.hypot(dx,dz),mn=(e.l+2.6)/2*.8;if(d<mn&&d>.01&&G.state==='play'){e.x+=dx/d*(mn-d)*.5;e.z+=dz/d*(mn-d)*.5;}}e.smoke-=dt;if(e.smoke>0&&Math.random()<dt*9)puff(e.x,1.2,e.z);}
  else if(e.ai&&!e.follow&&!e.chase)aiDrive(e,dt,near);
  if(u.wh&&e.v)u.wh.forEach(w=>w.rotation.x-=e.v*dt/.4);
  if(e.type==='ped'&&e.cspd){if(e.dith&&!e.dd&&far<40){const r=e.cvert?Math.abs(e.x-e.ck*B):Math.abs(e.z-e.ck*B);if(r<1.5){e.dd=1;e.pz=rnd(.5,1.2);e.back=Math.random()<.5;if(far<30){G.spk=e;Vx.speak(pick(JAY),'bn');}}}
   if(e.pz>0){e.pz-=dt;walk(e.mesh,0,0);if(e.pz<=0&&e.back){e.cx=-e.cx;e.cz=-e.cz;e.ry=Math.atan2(e.cx,e.cz);}}else{e.x+=e.cx*e.cspd*dt;e.z+=e.cz*e.cspd*dt;walk(e.mesh,e.t*7,.7);}
   if(e.hand)u.arms[1].rotation.x=-2.7;e.t+=dt;const r=e.cvert?Math.abs(e.x-e.ck*B)-hwV(e.ck):Math.abs(e.z-e.ck*B)-hwH(e.ck);if(r>3.5&&e.t>2)e.gone=true;e.yb=r>0?.22:0;}
  else if(e.type==='walker'&&walkerStep(e,dt)){}
  else if(e.type==='walker'){e.t+=dt;const cr=e.cr;e.x+=e.wx*e.wv*dt;e.z+=e.wz*e.wv*dt;if(e.wx&&(e.x<cr[0]+1||e.x>cr[1]-1))e.wv=-e.wv;if(e.wz&&(e.z<cr[2]+1||e.z>cr[3]-1))e.wv=-e.wv;e.ry=Math.atan2(e.wx*e.wv,e.wz*e.wv);e.yo=.22+Math.abs(Math.sin(e.t*6))*.06;}
  else if(e.type==='cow'){e.t+=dt;}
  else if(e.type==='pax'){e.t+=dt;walk(u.p,e.t*3,.1);u.p.userData.arms[1].rotation.z=-2.6+Math.sin(e.t*9)*.4;u.ring.scale.setScalar(1+Math.sin(e.t*6)*.1);}
  else if(e.type==='podium'){e.t+=dt;const a=u.cop.userData.arms;a[0].rotation.z=Math.sin(e.t*2)*1.2-1.2;}
  let y=e.mesh.position.y;if(e.type==='walker')y=e.yo||.22;else if(e.type==='ped')y=e.yb||0;else if(e.ai)y=0;e.mesh.position.set(e.x,y,e.z);e.mesh.rotation.y=e.ry;}
 updPuffs(dt);}
function playUpd(dt){const ch=G.mode==='chaos';
 const dirB=(keys.r?1:0)-(keys.l?1:0),dirI=dirB||(tiltOn&&Math.abs(tiltG)>.08?tiltG:0);
 {const d=dirI-G.steer,r=(dirI*G.steer>=0&&Math.abs(dirI)>Math.abs(G.steer)?3.6:6)*dt;G.steer+=clamp(d,-r,r);}
 const as=Math.max(Math.abs(G.sp),(keys.go||keys.turbo||keys.brake)?2.2:Math.abs(G.steer)>.05?1.7:0),ymax=as/(2.7+as*as*.03);G.yr=G.steer*ymax*(G.sp<-.2||(keys.brake&&G.sp<.3)?-1:1);G.th+=G.yr*dt;if(G.th>Math.PI)G.th-=2*Math.PI;if(G.th<-Math.PI)G.th+=2*Math.PI;
 const tb=keys.turbo&&G.fuel>2,go=!!(keys.go||tb);
 let vmax=8.4+Math.min(G.odo,3500)*.0007;if(tb)vmax*=1.35;if(G.fuel<=0)vmax=4;vmax*=1-.09*(G.cling||0);G.slow-=dt;if(G.slow>0)vmax*=.55;if(G.rainA>.5)vmax*=.92;if(G.gy>.1)vmax*=.8;
 if(keys.brake){if(G.sp>.3){G.sp=Math.max(0,G.sp-17*dt);if(G.sp>8){G.skT=(G.skT||0)-dt;if(G.skT<=0){G.skT=.4;A.skid(.7);}}}else{G.sp=Math.max(-4.5,G.sp-4*dt);G.revT=(G.revT||0)-dt;if(G.revT<=0){G.revT=.7;A.beep();}}}
 else if(go){if(G.sp<vmax)G.sp=Math.min(vmax,G.sp+(tb?8:5.2)*dt);else G.sp=Math.max(vmax,G.sp-6*dt);}
 else G.sp=G.sp>0?Math.max(0,G.sp-(2.4+G.sp*.08)*dt):Math.min(0,G.sp+3*dt);
 G.fuel=Math.max(0,G.fuel-(go?(tb?.8:.4):.04)*dt*(ch?1:.8));if(G.fuel<20&&!G.lowSaid){G.lowSaid=true;vox('low',1);flash('low');}if(tb&&Math.random()<dt*2){A.turbo();vox('turbo');}
 const fx=Math.sin(G.th),fz=-Math.cos(G.th);
 {const grip=clamp(12-Math.abs(G.sp)*.3,4.5,12),k=Math.min(1,grip*dt);G.vx+=(fx*G.sp-G.vx)*k;G.vz+=(fz*G.sp-G.vz)*k;const slip=Math.abs(G.vx*-fz+G.vz*fx);if(slip>3.2&&Math.abs(G.sp)>9){G.skT=(G.skT||0)-dt;if(G.skT<=0){G.skT=.35;A.skid(.5);}}}
 let px=PX()+G.vx*dt,pz=PZ()+G.vz*dt;G.odo+=Math.abs(G.sp)*dt;
 G.inv=Math.max(0,G.inv-dt);G.shield=Math.max(0,G.shield-dt);G.shake=Math.max(0,G.shake-dt*20);G.bombCd=Math.max(0,G.bombCd-dt);G.hornT-=dt;
 // world solids
 for(const o of[.85,-.85]){const p=pushOut(px+fx*o,pz+fz*o,.95);if(p){px+=p[0];pz+=p[1];G.wallT=.3;const L=Math.hypot(p[0],p[1])||1,nx=p[0]/L,nz=p[1]/L,vn=G.vx*nx+G.vz*nz;if(vn<0){G.vx-=nx*vn;G.vz-=nz*vn;const imp=-vn;G.sp=G.vx*fx+G.vz*fz;
   if(imp>2.5){G.scrT=(G.scrT||0)-dt;if(G.scrT<=0||imp>7){G.scrT=.45;if(imp>7){A.bump();G.shake=Math.max(G.shake,5);tripBump();if(Math.random()<.5)pop(pick(['দেওয়ালে ঠুকলি!','ধুস!']));}else A.scrape();G.shake=Math.max(G.shake,2);}}}}}
 G.x=px;G.D=-pz;
 {const r=onRoad(px,pz);G.gy=lerp(G.gy||0,(r.inV||r.inH)?0:.22,Math.min(1,dt*12));G.ev=G.gy;
  let ws=false;if(r.inV&&!r.inH&&Math.abs(fz)>.6){const dir=fz>0?1:-1;ws=Math.sign(r.u)===-dir&&Math.abs(r.u)>.7&&!rinfo(r.i,0).med;}else if(r.inH&&!r.inV&&Math.abs(fx)>.6){const dir=fx>0?1:-1;ws=Math.sign(r.v)===dir&&Math.abs(r.v)>.7&&!rinfo(r.j,1).med;}
  G.wrongS=ws&&Math.abs(G.sp)>3;$('wrong').style.display=G.wrongS?'block':'none';if(G.wrongS){setT('wrong','⚠ উল্টো লেনে চলছ!');if(ch)G.score+=Math.round(30*dt*10)/10;}}
 {const [ci,cj]=cellOf(px,pz),nb=nbOf(ci,cj);if(nb!==G.zone){G.zone=nb;const z=ZN[nb];banner('<span>এলাকা</span><b>'+z.bn+'</b><span>'+z.en+'</span>');}}
 {const r=onRoad(px,pz),inb=r.inV&&r.inH;if(inb&&!G.inBox&&hasSig(r.i,r.j)&&Math.abs(G.sp)>3){const ax=Math.abs(fz)>Math.abs(fx)?0:1;if(sigPhase(ax)==='r'){A.police();if(ch){const mult=1+Math.floor(G.combo/2);G.score+=300*mult;say('লাল সিগন্যাল ভেঙে বেরিয়ে গেলি! 🚦',1);spawnCh(1,G.D,G.x);}else{G.score=Math.max(0,G.score-50);G.fines+=50;const ln=pick(COP);say('👮 লাল সিগন্যাল! ফাইন ₹৫০',1);G.spk=null;Vx.speak(ln,'bn');}flash('signal');}}G.inBox=inb;}
 if((keys.go||keys.turbo)&&Math.abs(G.sp)<.8&&G.wallT>0){G.stuckT=(G.stuckT||0)+dt;if(G.stuckT>1.6){if(!G.stuckS){G.stuckS=1;say('আটকে গেছ! ⛔ ব্রেক চেপে পিছোও, বা ঘোরাও',1);}const tg=Math.round(G.th/(Math.PI/2))*(Math.PI/2);let d=tg-G.th;if(Math.abs(d)<.05)d=(G.steer||1)*.6;G.th+=clamp(d,-1,1)*dt*.9;}}else{G.stuckT=0;G.stuckS=0;}G.wallT=Math.max(0,(G.wallT||0)-dt);
 if(G.comboT>0){G.comboT-=dt;if(G.comboT<=0)G.combo=0;}
 // entity collisions
 const vx=G.vx,vz=G.vz;
 for(const e of ents){if(e.gone||e.fly||e.down)continue;const dx=e.x-px,dz=e.z-pz;if(dx*dx+dz*dz>100)continue;const t=e.type,d=e.d;
  if(t==='pot'||t==='pud'){if(!e.hit&&Math.hypot(dx,dz)<(t==='pud'?1.8:1.1)){e.hit=true;if(t==='pot'){G.sp*=.7;G.shake=5;G.slow=.5;A.pothole();burst(e.x,.4,e.z,6,4);say('গর্ত! উফ্‌!');tripBump();}else{G.slow=1.1;A.splash();burst(e.x,.5,e.z,14,6);say('জল জমেছে!');}}continue;}
  if(t==='pax'){if(Math.hypot(dx,dz)<2.6){if(G.trip){if(!e.fullS){e.fullS=1;say('আগে এঁকে নামাও, তারপর নতুন যাত্রী',1);}}else if(Math.abs(G.sp)>6.5){if(!e.slowS){e.slowS=1;say('আস্তে হও, যাত্রী উঠবে ✋',1);}}else startTrip(e);}continue;}
  if(d.deco&&!d.person)continue;if(!d.b&&!d.person)continue;
  let hit=null;for(const o of[.85,-.85]){const h=obbHit(e,px+fx*o,pz+fz*o,.9);if(!hit||h.pen>hit.pen)hit=h;}
  const evx=e.ai?Math.sin(e.th)*e.v:0,evz=e.ai?-Math.cos(e.th)*e.v:0,rel=Math.hypot(vx-evx,vz-evz);
  if(e.ai&&d.heavy&&!e.hit&&!e.vic){const gp=hit.gap;if(gp<1.1&&gp>0&&rel>6)e.nr=Math.min(e.nr===undefined?9:e.nr,gp);else if(e.nr!==undefined&&gp>2.6){passBy(e,e.nr);e.nr=undefined;}}
  if(hit.pen<=0)continue;
  const push=()=>{const mv=e.ai||e.vic?.5:1;G.x+=hit.wx*hit.pen*mv;G.D-=hit.wz*hit.pen*mv;if(mv<1){e.x-=hit.wx*hit.pen*.5;e.z-=hit.wz*hit.pen*.5;}const nx=hit.wx,nz=hit.wz,vn=G.vx*nx+G.vz*nz;if(vn<0){G.vx-=nx*vn*1.2;G.vz-=nz*vn*1.2;G.sp=G.vx*fx+G.vz*fz;}};
  if(d.person){if(!e.hit)victimPerson(e);continue;}
  if(d.heavy){push();
   if(ch){if(d.lethal){if(G.shield>0){G.sp*=.3;A.bump();continue;}G.lethalE=e;A.crash();A.vboom();burst(G.x,1,-G.D,22,9);G.shake=10;endGame('bus');return;}
    if(e.vic||e.hit){if(!e.rpS){e.rpS=1;pop('+₹০ এক গাড়ি আর কত ভাঙবি?');}if(G.t-(e.rpT||-9)>.8){e.rpT=G.t;A.bump();}continue;}
    if(rel>2.5)carSmash(e,rel);else if(G.t-(e.bT||-9)>.8){e.bT=G.t;A.bump();G.spk=e;yell(e);}continue;}
   if(!SAVE.lives){if(G.t-(e.bT||-9)>.8){e.bT=G.t;A.bump();G.shake=Math.max(G.shake,rel>4.5?6:3);G.sp*=rel>4.5?.45:.8;if(rel>4.5){const f=rel>9?100:50;G.score=Math.max(0,G.score-f);G.fines+=f;pop('ঠুকে দিলি! −₹'+bn(f));tripBump();spawnCh(1,G.D,G.x);}G.spk=e;yell(e);}continue;}
   if(rel>4.5&&G.inv<=0&&G.shield<=0){hurt(e);if(rel>9)victimCar(e);else{e.v*=.5;G.spk=e;yell(e);}}else if(G.t-(e.bT||-9)>.7){e.bT=G.t;A.bump();G.shake=Math.max(G.shake,3);if(G.inv<=0){G.spk=e;yell(e);}}continue;}
  if(d.solid){push();if(!e.hit||G.t-(e.bT||-9)>1.5){e.bT=G.t;e.hit=true;G.sp*=.4;G.shake=6;A.bump();if(t==='cow'){A.moo();say(pick(COWL));if(ch)spawnCh(1,G.D,G.x);}}continue;}
  if(d.val&&!e.hit){if(ch)smashEnt(e,false);else{knock(e);e.hit=true;G.sp*=.75;G.shake=Math.max(G.shake,4);A.bump();G.score=Math.max(0,G.score-30);G.spk=e;yell(e);tripBump();spawnCh(e.type==='stall'||e.type==='shelter'?2:1,-e.z,e.x);}continue;}}
 if(G.state!=='play')return;
 // fuel stations
 let st=null,sd=1e9;for(const e of ents)if(e.type==='stn'&&!e.gone){const d=Math.hypot(e.zx-px,e.zz-pz);if(d<sd){sd=d;st=e;}}
 G.atStn=st&&sd<6.5;let txt='';
 if(G.atStn){if(Math.abs(G.sp)<5){if(G.fuel<99.9){const add=Math.min(100-G.fuel,16*dt);G.fuel+=add;if(!ch){const c=add*.5;G.score=Math.max(0,G.score-c);G.fillCost+=c;}G.fillT-=dt;if(G.fillT<=0){G.fillT=.22;A.glug();}txt='⚡ চার্জ হচ্ছে… '+bn(G.fuel)+'%'+(ch?'':' · −₹'+bn(G.fillCost));}else{txt='⚡ ব্যাটারি ফুল!';if(!G.fullSaid){G.fullSaid=1;say('ব্যাটারি ফুল! ⚡',1);A.coin();}}}else txt='⚡ দাগের ওপর থামো — চার্জ হবে';}
 else{G.fillCost=0;G.fullSaid=0;if(st&&G.fuel<60)txt='⚡ চার্জিং · '+bn(Math.round(sd))+' মি '+dirWord(st.zx,st.zz);}
 setT('fillchip',txt);$('fillchip').style.display=txt?'block':'none';
 if(G.fuel<=0&&G.sp<2.5&&!G.atStn&&!keys.go){G.fuel=0;endGame('fuel');return;}
 G.mobAct=false;chaseUpd(dt);if(G.state!=='play'||G.beatT>0)return;vipUpd(dt);if(G.state!=='play')return;mamaUpd(dt);tripUpd(dt);sbkUpd(dt);taskTick(dt);
 hud();A.eng(G.sp,true,keys.go||keys.turbo,G.rainA);}
function walkerCross(){const fx=Math.sin(G.th),fz=-Math.cos(G.th),px=PX(),pz=PZ();let best=null,bs=-1;
 for(const e of ents){if(e.type!=='walker'||e.gone||e.crossing||e.down||!e.nx&&!e.nz)continue;const dx=e.x-px,dz=e.z-pz,f=dx*fx+dz*fz,l=Math.abs(dx*-fz+dz*fx);if(f<18||f>75||l>28)continue;const s=Math.random();if(s>bs){bs=s;best=e;}}
 if(!best)return;const e=best,ri=e.nx?rinfo(Math.round((e.x+e.nx*6)/B),0):rinfo(Math.round((e.z+e.nz*6)/B),1);e.crossing=1;e.cs=rnd(1.4,2.1);e.cleft=SWW+2*ri.hw+1.2;e.cnx=e.nx;e.cnz=e.nz;e.dith=Math.random()<.3?rnd(.35,.7):0;e.dd=0;e.pz=0;}
function walkerStep(e,dt){if(e.crossing){if(e.pz>0){e.pz-=dt;if(e.pz<=0&&e.back){e.cnx=-e.cnx;e.cnz=-e.cnz;e.cleft=e.cdone+.5;e.back=0;}}
  else{const s=e.cs*dt;e.x+=e.cnx*s;e.z+=e.cnz*s;e.cleft-=s;e.cdone=(e.cdone||0)+s;if(e.dith&&!e.dd&&e.cdone>e.cleft*e.dith){e.dd=1;e.pz=rnd(.5,1.2);e.back=Math.random()<.45;if(Math.hypot(e.x-PX(),e.z-PZ())<32){G.spk=e;Vx.speak(pick(JAY),'bn');}}}
  e.ry=Math.atan2(e.cnx,e.cnz);e.t+=dt;const r=onRoad(e.x,e.z);e.yo=(r.inV||r.inH?0:.22)+Math.abs(Math.sin(e.t*7))*.05;
  if(e.cleft<=0){e.crossing=0;e.cdone=0;const [ci,cj]=cellOf(e.x,e.z);e.cr=curbRect(ci,cj);e.nx=-e.cnx;e.nz=-e.cnz;}return true;}return false;}
function catchLimit(){const s=Math.abs(G.sp);return s>9?5:s>6?4:s>3?3:2;}
function slotWorld(s){const cs=Math.cos(G.th),sn=Math.sin(G.th);return[G.x+s[0]*cs-s[1]*sn,G.D-s[0]*sn-s[1]*cs];}
function todNight(){const u=(((G.runT||0)+CYC*.25)%CYC)/CYC;return smt(.5,.62,u)*(1-smt(.88,.99,u));}
