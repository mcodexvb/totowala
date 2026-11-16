'use strict';
/* ui: functions (all lib files load before any run file) */
function hold(id,key){const b=$(id);const on=e=>{e.preventDefault();e.stopPropagation();A.init();keys[key]=1;b.classList.add('on');};const off=e=>{keys[key]=0;b.classList.remove('on');};b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);}
function drawMap(){if(CITY===0)return drawMapKol();const svg=$('mapsvg');svg.setAttribute('viewBox','0 0 380 400');
 const P=[[70,50],[190,62],[300,95],[250,160],[120,180],[80,250],[190,290],[300,340]];let h='<rect width="380" height="400" fill="#efe9d8"/><path d="M-10 120 C80 90 130 150 200 120 S330 60 400 100" stroke="#a9d6f2" stroke-width="20" fill="none"/>';
 h+='<path d="'+P.map((p,i)=>(i?'L':'M')+p[0]+' '+p[1]).join(' ')+'" stroke="#f6d98a" stroke-width="9" fill="none" stroke-linejoin="round"/><path d="'+P.map((p,i)=>(i?'L':'M')+p[0]+' '+p[1]).join(' ')+'" stroke="#d98324" stroke-width="2.5" stroke-dasharray="7 6" fill="none"/>';
 P.forEach((p,i)=>{const sel=i===G.startZone;h+='<g class="st" data-z="'+i+'" style="cursor:pointer"><circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(sel?13:10)+'" fill="'+(sel?'#ff5c8a':'#fff')+'" stroke="#222" stroke-width="2.5"/><text x="'+p[0]+'" y="'+(p[1]+4)+'" text-anchor="middle" font-size="11" font-weight="800" fill="#111">'+bn(i+1)+'</text><text x="'+p[0]+'" y="'+(p[1]+28)+'" text-anchor="middle" font-size="13" font-weight="700" fill="#222" style="font-family:Hind Siliguri">'+ZN[i].bn+'</text></g>';});
 svg.innerHTML=h;svg.querySelectorAll('g.st').forEach(g=>g.onclick=()=>{G.startZone=+g.dataset.z;drawMap();resetGame();G.sp=0;});}
function drawMapKol(){const svg=$('mapsvg');svg.setAttribute('viewBox','0 0 380 400');
 const pl=(pts)=>pts.map((p,i)=>{const q=PJ(p[0],p[1]);return(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1);}).join(' ');
 const pg=(pts)=>pl(pts)+' Z';
 const T1=(lo,la,t,o)=>{const q=PJ(lo,la);return '<text x="'+q[0].toFixed(1)+'" y="'+q[1].toFixed(1)+'" '+(o||'')+'>'+t+'</text>';};
 let h='<rect width="380" height="400" fill="#efe9d8"/>';
 h+='<path d="'+pg([[88.3925,22.5920],[88.3925,22.5800],[88.3990,22.5740],[88.4000,22.5920]])+'" fill="#dde3c8"/>';
 h+='<path d="'+pg([[88.3405,22.5640],[88.3512,22.5640],[88.3518,22.5470],[88.3478,22.5420],[88.3410,22.5430],[88.3388,22.5560]])+'" fill="#bcd9a2"/>';
 h+='<path d="'+pg([[88.3418,22.5600],[88.3440,22.5600],[88.3445,22.5565],[88.3420,22.5560]])+'" fill="#a6c48a" stroke="#7a9a64" stroke-width="1"/>';
 h+='<ellipse cx="'+PJ(88.3466,22.5126)[0]+'" cy="'+PJ(88.3466,22.5126)[1]+'" rx="22" ry="12" fill="#7ec3e6" stroke="#4a93c8" stroke-width="1.5"/>';
 h+='<path d="'+pg([[88.3410,22.5170],[88.3540,22.5170],[88.3545,22.5080],[88.3420,22.5075]])+'" fill="#cfe3b8" opacity=".7"/>';
 h+='<path d="'+pl([[88.3530,22.5920],[88.3495,22.5900],[88.3470,22.5855],[88.3440,22.5760],[88.3405,22.5660],[88.3378,22.5560],[88.3330,22.5470],[88.3250,22.5390],[88.3240,22.5330]])+'" stroke="#8cc4e8" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
 h+='<path d="'+pl([[88.3530,22.5920],[88.3495,22.5900],[88.3470,22.5855],[88.3440,22.5760],[88.3405,22.5660],[88.3378,22.5560],[88.3330,22.5470],[88.3250,22.5390],[88.3240,22.5330]])+'" stroke="#a9d6f2" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
 const road=(pts,w,c)=>'<path d="'+pl(pts)+'" stroke="'+(c||'#fff')+'" stroke-width="'+(w||3)+'" fill="none" stroke-linejoin="round"/>';
 h+=road([[88.3468,22.5851],[88.3530,22.5810],[88.3600,22.5765],[88.3640,22.5745]],5,'#f6d98a');
 h+=road([[88.3645,22.5760],[88.3665,22.5600],[88.3690,22.5400],[88.3700,22.5200]],5,'#f6d98a');
 h+=road([[88.3512,22.5646],[88.3510,22.5440]],5,'#f6d98a');
 h+=road([[88.3512,22.5540],[88.3640,22.5530]],3);
 h+=road([[88.3480,22.5200],[88.3640,22.5190]],3);
 h+=road([[88.3395,22.5750],[88.3385,22.5600]],3);
 h+=road([[88.3640,22.5745],[88.3702,22.5677]],3);
 h+=road([[88.3640,22.5745],[88.3507,22.5726],[88.3513,22.5646],[88.3590,22.5535],[88.3426,22.5448],[88.3466,22.5126]],7,'#e0a21a');
 h+='<path d="'+pl([[88.3640,22.5745],[88.3507,22.5726],[88.3513,22.5646],[88.3590,22.5535],[88.3426,22.5448],[88.3466,22.5126]])+'" stroke="#fff3b0" stroke-width="3" stroke-dasharray="7 6" fill="none"/>';
 const hb=[PJ(88.3440,22.5862),PJ(88.3503,22.5848)];h+='<path d="M'+hb[0].join(' ')+' L'+hb[1].join(' ')+'" stroke="#44506a" stroke-width="5"/>';
 const lb='style="fill:#26323a;stroke:#fff;stroke-width:3px;font-size:10px"';
 h+=T1(88.3290,22.5800,'হুগলি নদী','style="fill:#2e6f9e;stroke:#fff;stroke-width:3px;font-size:11px"');
 h+=T1(88.3705,22.5667,'শিয়ালদহ',lb);h+=T1(88.3405,22.5530,'ময়দান','style="fill:#3b6e2b;stroke:#fff;stroke-width:3px;font-size:11px"');
 h+=T1(88.3425,22.5655,'ইডেন গার্ডেনস',lb);h+=T1(88.3500,22.5090,'রবীন্দ্র সরোবর',lb);h+=T1(88.3860,22.5760,'সল্টলেক ▸',lb);h+=T1(88.3665,22.5420,'এজেসি বোস রোড',lb.replace('10px','8px'));
 MAPP.forEach((p,i)=>{const sel=i===G.startZone,nm=ZN[i].bn;const right=i!==0&&i!==6&&i!==7;
  h+='<g class="st" data-z="'+i+'"><circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+(sel?11:8)+'" fill="'+(sel?'#ff6fa8':i===7?'#38c172':'#fff')+'" stroke="#111" stroke-width="2.5"/><text x="'+p[0].toFixed(1)+'" y="'+(p[1]+3.8).toFixed(1)+'" text-anchor="middle" style="font-size:10px;fill:#111;stroke:none">'+bn(i+1)+'</text>'
   +'<text x="'+(p[0]+(right?14:-14)).toFixed(1)+'" y="'+(p[1]+4).toFixed(1)+'" text-anchor="'+(right?'start':'end')+'" style="font-size:'+(sel?12:10)+'px;fill:#1d2a22;stroke:#fff;stroke-width:3px;font-weight:700">'+nm+'</text></g>';});
 svg.innerHTML=h;svg.querySelectorAll('g.st').forEach(g=>g.onclick=()=>{G.startZone=+g.dataset.z;drawMap();resetGame();G.sp=0;});}
function drawGarage(){$('gpocket').textContent='পকেট ₹'+bn(SAVE.pocket);const it=$('items');it.innerHTML='';
 const list=gTab==='paint'?PAINTS.map(p=>({id:'p_'+p.id,n:p.n,c:p.c,p:p.p,sel:SAVE.paint===p.id,v:p.id})):STICK.map((s,i)=>({id:'s_'+i,n:s,p:STP[i],sel:SAVE.sticker===i,v:i}));
 list.forEach(o=>{const d=document.createElement('div');d.className='it'+(o.sel?' sel':'');const owned=SAVE.owned[o.id]||o.p===0;d.innerHTML=(o.c?'<div class="sw" style="background:'+o.c+'"></div>':'<div style="font-size:22px">🏷</div>')+o.n+'<br>'+(owned?(o.sel?'<span class="pr" style="color:#9cffb5;border-color:#9cffb5">লাগানো ✓</span>':'<span class="pr" style="color:#9cffb5;border-color:#9cffb5">লাগাও</span>'):'<span class="pr">₹'+bn(o.p)+'</span>');
  d.onclick=()=>{if(!owned){if(SAVE.pocket<o.p){say('টাকা কম! আরও চালাও',1);return;}SAVE.pocket-=o.p;SAVE.owned[o.id]=1;}if(gTab==='paint'){SAVE.paint=o.v;setPaint(o.v);}else{SAVE.sticker=o.v;setSticker(o.v);}persist();drawGarage();};it.appendChild(d);});}
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(!curPR||curPR===1&&perfT===0)curPR=renderer.getPixelRatio();perfT++;perfA=perfA*.95+dt*.05;if(perfT>200&&perfA>.036&&curPR<=1&&renderer.shadowMap.enabled&&G.state==='play'){renderer.shadowMap.enabled=false;sun.castShadow=false;scene.traverse(o=>{if(o.material)o.material.needsUpdate=true;});SAVE.gfx='lo';persist();say('ফোন হাঁপাচ্ছে — ছায়া বন্ধ করে গ্রাফিক্স হালকা করা হল',1);perfT=1;}
 if(perfT>150&&perfA>.03&&curPR>1){curPR=Math.max(1,curPR-.25);SCALE_PR_DOWN=1;renderer.setPixelRatio(curPR);perfT=1;}try{if(G.state!=='paused')update(dt);renderer.render(scene,camera);
 if(G.snap){G.snap=false;let u='';try{u=renderer.domElement.toDataURL('image/jpeg',.7);}catch(e){}setTimeout(()=>showNews(u),900);}}catch(err){console.error(err);}requestAnimationFrame(frame);}
function init(){/* v13 HUD: one status at a time */
(function(){const PRI=['pubchip','polchip','vipchip','tripchip','fillchip','mamachip'];
 if(!('ontouchstart' in window)&&!(navigator.maxTouchPoints>0))$('stage').classList.add('nt');
 const tick=()=>{document.body.classList.toggle('playing',G.state==='play'||G.state==='paused');let shown=false;
  for(const id of PRI){const el=$(id);if(!el)continue;const vis=el.style.display&&el.style.display!=='none';
   if(vis&&!shown){shown=true;el.classList.remove('hz');el.classList.add('on1');}else{el.classList.add('hz');el.classList.remove('on1');}}
  requestAnimationFrame(tick);};requestAnimationFrame(tick);fit();})();
/* v14 pause panel */
(function(){const P=$('pause');const rs=$('bResume'),qt=$('bQuit');
 P.innerHTML='';const d=document.createElement('div');d.id='pp';
 d.innerHTML='<h2>একটু থামি</h2><div class="sub">চা খেয়ে নিন, জ্যাম তো পালাচ্ছে না।</div>'+
 '<div class="card"><div class="r"><span>🔊 শব্দ</span><button class="tg" id="ppS"></button></div></div>'+
 '<div class="card"><div class="r"><span>🎥 ক্যামেরা</span></div><div class="seg" id="ppC">'+CAMN.map((n,i)=>'<button data-i="'+i+'">'+n+'</button>').join('')+'</div></div>'+
 '<div class="keys"><span><kbd>W</kbd><kbd>↑</kbd>চালাও</span><span><kbd>S</kbd><kbd>↓</kbd>ব্রেক</span><span><kbd>A</kbd><kbd>D</kbd>ঘোরাও</span><span><kbd>Space</kbd>টান</span><span><kbd>H</kbd>হর্ন</span><span><kbd>B</kbd>শব্দবোমা</span><span><kbd>C</kbd>ক্যামেরা</span><span><kbd>Esc</kbd>থামো</span></div>';
 rs.className='btn big';rs.textContent='চালিয়ে যাও';d.insertBefore(rs,d.children[2]);qt.className='home';qt.textContent='⌂ হোম';d.appendChild(qt);P.appendChild(d);
 const sync=()=>{$('ppS').classList.toggle('on',!!A.on);[...$('ppC').children].forEach((b,i)=>b.classList.toggle('sel',i===(SAVE.cam||0)));};
 $('ppS').onclick=()=>{$('bSnd').click();sync();};
 $('ppC').onclick=e=>{const i=e.target.dataset&&e.target.dataset.i;if(i==null)return;SAVE.cam=+i;persist();sync();};
 new MutationObserver(sync).observe(P,{attributes:true});sync();
 addEventListener('keydown',e=>{const k=e.key;if(k==='Escape'||k==='p'||k==='P'){if(G.state==='play')$('bPause').click();else if(G.state==='paused')rs.click();}
  if(k===' '&&G.state==='play'){keys.turbo=1;}},true);
 addEventListener('keyup',e=>{if(e.key===' ')keys.turbo=0;},true);})();

/* ===== v10: Baper-style touch controls ===== */
{const I=p=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';const ch=d=>I('<path d="'+d+'" fill="none" stroke="currentColor" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>');
 const H={bL:ch('M15 5 L8 12 L15 19')+'<span>বামে</span>',bR:ch('M9 5 L16 12 L9 19')+'<span>ডানে</span>',bG:ch('M5 15 L12 8 L19 15')+'<span>চালাও</span>',bK:ch('M5 9 L12 16 L19 9')+'<span>ব্রেক</span>',
  bT:I('<path d="M13.5 2L4.5 13.5h6l-1.5 8.5 9.5-12h-6z" fill="currentColor"/>')+'<span>টান</span>',bH:I('<path d="M3 10h3.5L16 5v14l-9.5-5H3z" fill="currentColor"/><path d="M18.5 9l2.5-1.6M19 12h3M18.5 15l2.5 1.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>')+'<span>হর্ন</span>',
  bB:I('<circle cx="10" cy="14.5" r="7" fill="currentColor"/><circle cx="7.6" cy="12" r="1.8" fill="#fff" opacity=".55"/><path d="M14.5 9.5l3-3M17 4l1 1.5M20 6.5l-1.6.6M19.5 3.2l-.4 1.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>')+'<span>শব্দবোমা</span>'};
 for(const k in H)$(k).innerHTML=H[k];
 const KEY={bL:'l',bR:'r',bG:'go',bT:'turbo',bK:'brake'},act=new Map(),ctl=$('ctl');
 const btnAt=(x,y)=>{const el=document.elementFromPoint(x,y);const b=el&&el.closest?el.closest('#ctl .cb'):null;return b&&b.offsetParent&&getComputedStyle(b).display!=='none'?b:null;};
 const sync=()=>{for(const k of['l','r','go','turbo','brake'])keys[k]=0;ctl.querySelectorAll('.cb.on').forEach(b=>b.classList.remove('on'));for(const id of act.values()){if(!id)continue;$(id).classList.add('on');if(KEY[id])keys[KEY[id]]=1;}};
 const tap=id=>{if(id==='bH')honk();else if(id==='bB')bomb();};const buzz=()=>{try{if(navigator.vibrate&&SAVE.vib!==false)navigator.vibrate(7);}catch(e){}};
 }

/* v18 touch controls: geometric hit-test, forgiving radius, overlay-proof, multi-touch */
{const KEY={bL:'l',bR:'r',bG:'go',bT:'turbo',bK:'brake'},IDS=['bL','bR','bG','bK','bT','bH','bB'],act=new Map(),ctl=$('ctl');
 let rects=[],rt=0;const live=()=>ctl.style.display!=='none'&&getComputedStyle(ctl).display!=='none'&&(G.state==='play');
 const measure=()=>{rects=IDS.map(id=>{const el=$(id);if(!el||getComputedStyle(el).display==='none')return null;const r=el.getBoundingClientRect();return r.width?{id,r}:null;}).filter(Boolean);rt=performance.now();};
 const hit=(x,y)=>{if(performance.now()-rt>500)measure();let best=null,bd=1e9;const slack=22*(typeof SCALE==='number'?SCALE:1);
  for(const {id,r} of rects){const dx=Math.max(r.left-x,0,x-r.right),dy=Math.max(r.top-y,0,y-r.bottom),d=Math.hypot(dx,dy);if(d<=slack&&d<bd){bd=d;best=id;}}return best;};
 const sync=()=>{for(const k of['l','r','go','turbo','brake'])keys[k]=0;IDS.forEach(i=>$(i)&&$(i).classList.remove('on'));for(const id of act.values()){if(!id)continue;$(id).classList.add('on');if(KEY[id])keys[KEY[id]]=1;}};
 const tap=id=>{if(id==='bH')honk();else if(id==='bB')bomb();};const buzz=()=>{try{if(navigator.vibrate&&SAVE.vib!==false)navigator.vibrate(8);}catch(e){}};
 const down=(pid,x,y)=>{if(!live())return false;const id=hit(x,y);if(!id)return false;try{A.init();}catch(e){}act.set(pid,id);if(!KEY[id])tap(id);buzz();sync();return true;};
 const move=(pid,x,y)=>{if(!act.has(pid))return false;const id=hit(x,y);if(id!==act.get(pid)){act.set(pid,id);if(id){if(!KEY[id])tap(id);buzz();}sync();}return true;};
 const up=pid=>{if(!act.has(pid))return false;act.delete(pid);sync();return true;};
 const usePtr='PointerEvent' in window;
 if(usePtr){document.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;if(down('p'+e.pointerId,e.clientX,e.clientY)){e.preventDefault();e.stopImmediatePropagation();}},{capture:true,passive:false});
  document.addEventListener('pointermove',e=>{if(move('p'+e.pointerId,e.clientX,e.clientY)){e.preventDefault();e.stopImmediatePropagation();}},{capture:true,passive:false});
  const pu=e=>{if(up('p'+e.pointerId))e.stopImmediatePropagation();};document.addEventListener('pointerup',pu,true);document.addEventListener('pointercancel',pu,true);
  // stop the browser from turning a held finger into scroll/zoom (which fires pointercancel)
  document.addEventListener('touchstart',e=>{if(act.size)e.preventDefault();},{capture:true,passive:false});
  document.addEventListener('touchmove',e=>{if(act.size||G.state==='play')e.preventDefault();},{capture:true,passive:false});}
 else{document.addEventListener('touchstart',e=>{let u=false;for(const t of e.changedTouches)u=down('t'+t.identifier,t.clientX,t.clientY)||u;if(u)e.preventDefault();},{capture:true,passive:false});
  document.addEventListener('touchmove',e=>{let u=false;for(const t of e.changedTouches)u=move('t'+t.identifier,t.clientX,t.clientY)||u;if(u||G.state==='play')e.preventDefault();},{capture:true,passive:false});
  const tu=e=>{for(const t of e.changedTouches)up('t'+t.identifier);};document.addEventListener('touchend',tu,true);document.addEventListener('touchcancel',tu,true);}
 ctl.addEventListener('contextmenu',e=>e.preventDefault());
 addEventListener('resize',()=>{rt=0;});addEventListener('blur',()=>{act.clear();sync();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){act.clear();sync();}});
 // safety: if a finger was lost, release after state change
 setInterval(()=>{if(!live()&&act.size){act.clear();sync();}},300);}

gfxSetup();lvLbl();$('bLives').onclick=()=>{SAVE.lives=!SAVE.lives;persist();lvLbl();say(SAVE.lives?'সওয়ারি মোডে ৩টে জীবন — বড় গাড়িতে ধাক্কায় কমবে':'জীবন বন্ধ — ধাক্কায় শুধু জরিমানা',1);};VP.load();drawTasks();vpCount();
 $('bCam').onclick=e=>{e.stopPropagation();cycleCam();};$('bGfx').onclick=()=>{SAVE.gfx=(SAVE.gfx||'hi')==='hi'?'lo':'hi';persist();location.reload();};
 $('bVP').onclick=()=>{$('vpack').classList.remove('hidden');drawVP();};$('vpBack').onclick=()=>{if(vpRec)vpRec.mr.stop();$('vpack').classList.add('hidden');vpCount();};
setSticker(SAVE.sticker);setPaint(SAVE.paint);resetGame();G.sp=0;drawMap();hud();requestAnimationFrame(frame);}
