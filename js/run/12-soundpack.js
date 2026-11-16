'use strict';
/* ===== v23: tidy start menu, on-device sound pack, install as app ===== */

/* ---------- sound pack (kept on this device: IndexedDB + localStorage) ---------- */
const SP_SLOTS=[
 ['start','খেলা শুরু','চালাও! টিপলে'],
 ['pax','যাত্রী উঠল','যাত্রী টোটোতে চাপলে'],
 ['paid','ভাড়া পেলাম','যাত্রী পৌঁছে দিলে'],
 ['boost','টান দিলে','⚡টান চাপলে (মাঝে মাঝে)'],
 ['crash','বড় ধাক্কা','গাড়ি, বাস, লরিতে ধাক্কা'],
 ['hit','মানুষে ধাক্কা','পথচারী বা ফুটপাতের লোকে লাগলে'],
 ['fine','জরিমানা / পুলিশ','জরিমানা হলে বা মামা ধরলে'],
 ['chase','পাবলিক তাড়া','লোকজন পিছু নিলে'],
 ['caught','ধরা পড়লে','পাবলিক ধরে ফেললে'],
 ['over','খেলা শেষ','গেম ওভার'],
 ['romeo','রাস্তার রোমিও','ফাঁকা রাস্তায় খুনসুটি'],
];
const SP_AUTO=[[/crash|smash|bang|dhakka/i,'crash'],[/chicken|scream|chilla|ouch/i,'hit'],[/faaah|fail|sad|lose|haar/i,'over'],[/dun.?dun|dramatic|lekin|sala|raja.?gujjar|chase/i,'chase'],
 [/ab.?tu.?gaya|bindaya|pure.?debo|maar|caught/i,'caught'],[/maza|boost|turbo|speed/i,'boost'],[/rizz|ki.?lagche|aagun|romeo/i,'romeo'],[/wow|paisa|coin|paid|cash/i,'paid'],
 [/bhalo.?hoye|vul|khoma|maaf|sorry|police|fine/i,'fine'],[/goribera|porichoy|hello|start|intro/i,'start'],[/bishwas|believe/i,'crash']];
const SP={meta:{},db:null,buf:new Map(),last:0,slotT:{},
 key:'toto_sp_meta',
 loadMeta(){try{this.meta=JSON.parse(localStorage.getItem(this.key)||'{}');}catch(e){this.meta={};}for(const [s] of SP_SLOTS)this.meta[s]=this.meta[s]||[];},
 saveMeta(){try{localStorage.setItem(this.key,JSON.stringify(this.meta));}catch(e){}},
 open(){return new Promise(r=>{if(this.db)return r();try{const q=indexedDB.open('toto_sp',1);q.onupgradeneeded=()=>q.result.createObjectStore('c');q.onsuccess=()=>{this.db=q.result;r();};q.onerror=()=>r();}catch(e){r();}});},
 put(id,blob){return this.open().then(()=>new Promise(r=>{try{const t=this.db.transaction('c','readwrite');t.objectStore('c').put(blob,id);t.oncomplete=r;t.onerror=r;}catch(e){r();}}));},
 get(id){return this.open().then(()=>new Promise(r=>{try{const q=this.db.transaction('c').objectStore('c').get(id);q.onsuccess=()=>r(q.result||null);q.onerror=()=>r(null);}catch(e){r(null);}}));},
 del(id){this.buf.delete(id);return this.open().then(()=>{try{this.db.transaction('c','readwrite').objectStore('c').delete(id);}catch(e){}});},
 async add(slot,{blob,text,name}){const id='c'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);if(blob)await this.put(id,blob);this.meta[slot].push({id,text:text||'',name:name||'',audio:!!blob});this.saveMeta();return id;},
 async addMany(items){await this.open();const ids=items.map(()=>'c'+Date.now().toString(36)+Math.random().toString(36).slice(2,7));
  await new Promise(r=>{try{const t=this.db.transaction('c','readwrite'),os=t.objectStore('c');items.forEach((it,i)=>os.put(it.blob,ids[i]));t.oncomplete=r;t.onerror=r;t.onabort=r;}catch(e){r();}});
  items.forEach((it,i)=>this.meta[it.slot].push({id:ids[i],text:'',name:it.name,audio:true}));this.saveMeta();},
 remove(slot,id){this.meta[slot]=this.meta[slot].filter(x=>x.id!==id);this.saveMeta();this.del(id);},
 count(){let n=0;for(const s in this.meta)n+=this.meta[s].length;return n;},
 async playClip(id,vol,url){A.init();if(!A.ctx)return;let b=this.buf.get(id);if(!b){const blob=url?await fetch(url).then(r=>r.ok?r.blob():null).catch(()=>null):await this.get(id);if(!blob)return;try{const ab=await blob.arrayBuffer();b=await new Promise(r=>A.ctx.decodeAudioData(ab,r,()=>r(null)));}catch(e){b=null;}if(!b)return;this.buf.set(id,b);}
  try{if(this.cur)try{this.cur.stop();}catch(e){}const s=A.ctx.createBufferSource(),g=A.ctx.createGain();s.buffer=b;g.gain.value=vol||1.2;s.connect(g);g.connect(A.master);s.start();this.cur=s;}catch(e){}},
 fire(slot,o){o=o||{};const L=(this.meta[slot]||[]).concat(this.defOn?(this.def[slot]||[]):[]);if(!L.length)return false;const now=performance.now();if(!o.force&&(now-this.last<(o.gap||2200)||now-(this.slotT[slot]||0)<(o.slotGap||4500)))return false;if(o.p!==undefined&&Math.random()>o.p)return false;
  this.last=now;this.slotT[slot]=now;const it=pick(L);if(it.text&&G.state==='play'){try{bubble(it.text,o.at||null);}catch(e){}}if(it.audio&&A.on!==false)this.playClip(it.id,1.2,it.url);return true;}};
SP.loadMeta();
/* optional default pack shipped with the site: assets/pack/pack.json -> {slot:[{file,text}]} */
SP.def={};SP.defOn=localStorage.getItem('toto_sp_def')!=='0';
fetch('assets/pack/pack.json').then(r=>r.ok?r.json():null).then(j=>{if(!j)return;for(const [s] of SP_SLOTS)SP.def[s]=(j[s]||[]).map((x,i)=>({id:'def:'+s+':'+i,url:'assets/pack/'+x.file,text:x.text||'',audio:true,def:true}));const st=$('spSt');if(st&&!st.textContent)st.textContent='';}).catch(()=>{});

/* hooks into game moments */
{ const t0=startTrip;startTrip=function(e,...a){const r=t0.call(this,e,...a);SP.fire('pax',{force:1});return r;};
 const t1=endTrip;endTrip=function(...a){const had=!!G.trip;const r=t1.apply(this,a);if(had&&G.state==='play')SP.fire('paid',{force:1});return r;};
 const v0=victimPerson;victimPerson=function(e,...a){const r=v0.call(this,e,...a);SP.fire('hit',{at:e});return r;};
 const c0=spawnCh;spawnCh=function(...a){const before=CHP.filter(c=>c.on).length;const r=c0.apply(this,a);if(!before&&CHP.some(c=>c.on))SP.fire('chase',{force:1});return r;};
 const b0=startBeat;startBeat=function(...a){const was=G.beatT>0;const r=b0.apply(this,a);if(!was)SP.fire('caught',{force:1});return r;};
 const e0=endGame;endGame=function(reason,...a){const r=e0.call(this,reason,...a);if(reason!=='caught')SP.fire('over',{force:1});return r;};
 const cr=A.crash;A.crash=function(...a){SP.fire('crash');return cr.apply(this,a);};
 const s0=say;say=function(t,p){if(typeof t==='string'&&/জরিমানা|ফাইন|মামা/.test(t))SP.fire('fine');return s0(t,p);};
 const bu=bubble;bubble=function(t,e){if(typeof t==='string'&&/আগুন|লাগছে|হাসুন/.test(t)&&G.state==='play')SP.fire('romeo',{p:.9});return bu(t,e);};
 let tb=0,pst=G.state;setInterval(()=>{if(G.state==='play'&&pst!=='play'&&pst!=='paused'){setTimeout(()=>SP.fire('start',{force:1}),500);}pst=G.state;const on=!!keys.turbo&&G.state==='play';if(on&&!tb)SP.fire('boost',{p:.35});tb=on;},120);}

/* sound pack panel */
{const ov=document.createElement('div');ov.id='spk';ov.className='ov hidden';
 ov.innerHTML='<div class="sp-wrap"><div class="sp-head"><b>সাউন্ড প্যাক</b><span>শুধু এই ফোন/কম্পিউটারে থাকে · কোথাও আপলোড হয় না</span></div>'+
  '<div class="sp-bulk"><button class="btn sm" id="spBulk">📦 অনেক ফাইল একসাথে যোগ করো</button><input type="file" id="spBulkIn" accept="audio/*" multiple hidden><div class="sp-note">ফাইলের নাম দেখে ঠিক জায়গায় বসিয়ে দেব (crash, fail, wow…)। পরে সরিয়ে নিতে পারবে।</div></div>'+
  '<div id="spDef" class="sp-sec"></div><div id="spList"></div><div class="sp-foot"><button class="btn sm alt" id="spOld">🎙 পুরনো লাইন-ভিত্তিক ভয়েস প্যাক</button><button class="btn sm alt" id="spClr">সব মুছে ফেলো</button><button class="btn sm" id="spBack">← ফিরে যাও</button></div></div>';
 $('stage').appendChild(ov);
 const list=$('spList');let rec=null;
 function row(slot,it){const r=document.createElement('div');r.className='sp-it';
  r.innerHTML=(it.audio?'<button class="sp-ic" data-a="play" title="শোনো">▶</button>':'<span class="sp-ic t">✎</span>')+'<input class="sp-tx" placeholder="'+(it.audio?((it.name||'').replace(/\.[a-z0-9]+$/i,'').replace(/^[0-9a-f]{8}-/,'').replace(/[-_]+/g,' ').slice(0,28)||'সঙ্গে লেখা (ঐচ্ছিক)'):'যা লেখা ভাসবে')+'" value="'+(it.text||'').replace(/"/g,'&quot;')+'">'+
   '<select class="sp-mv" title="অন্য জায়গায় সরাও">'+SP_SLOTS.map(([s,n])=>'<option value="'+s+'"'+(s===slot?' selected':'')+'>'+n+'</option>').join('')+'</select><button class="sp-ic" data-a="del" title="মুছে ফেলো">✕</button>';
  if(it.name)r.title=it.name;
  r.querySelector('.sp-tx').onchange=e=>{it.text=e.target.value.trim();SP.saveMeta();};
  r.querySelector('.sp-mv').onchange=e=>{SP.meta[slot]=SP.meta[slot].filter(x=>x!==it);SP.meta[e.target.value].push(it);SP.saveMeta();draw();};
  r.onclick=e=>{const a=e.target.dataset&&e.target.dataset.a;if(a==='play')SP.playClip(it.id);if(a==='del'){SP.remove(slot,it.id);draw();}};return r;}
 function drawDef(){const d=$('spDef');let n=0;for(const s in SP.def)n+=SP.def[s].length;if(!n){d.style.display='none';return;}d.style.display='';
  d.innerHTML='<div class="sp-st"><b>ডিফল্ট প্যাক</b><small>সাইটের সঙ্গে আসা '+bn(n)+'টা সাউন্ড</small><button class="sp-ic" id="spDefT" style="width:auto;padding:0 10px">'+(SP.defOn?'চালু':'বন্ধ')+'</button></div>';
  $('spDefT').onclick=()=>{SP.defOn=!SP.defOn;try{localStorage.setItem('toto_sp_def',SP.defOn?'1':'0');}catch(e){}drawDef();};}
 function draw(){drawDef();list.innerHTML='';for(const [s,n,d] of SP_SLOTS){const sec=document.createElement('div');sec.className='sp-sec';const L=SP.meta[s];
   sec.innerHTML='<div class="sp-st"><b>'+n+'</b><small>'+d+'</small><em>'+(L.length?bn(L.length)+'টা':'')+'</em></div>';
   for(const it of L)sec.appendChild(row(s,it));
   const act=document.createElement('div');act.className='sp-act';act.innerHTML='<button data-k="file">⬆ ফাইল</button><button data-k="rec">🎙 রেকর্ড</button><button data-k="text">✎ শুধু লেখা</button>';
   act.onclick=async e=>{const k=e.target.dataset.k;if(!k)return;
    if(k==='text'){await SP.add(s,{text:'নতুন লাইন'});draw();const ins=list.querySelectorAll('.sp-sec')[SP_SLOTS.findIndex(x=>x[0]===s)].querySelectorAll('.sp-tx');const last=ins[ins.length-1];last&&(last.select(),last.focus());}
    if(k==='file'){const i=document.createElement('input');i.type='file';i.accept='audio/*';i.multiple=true;i.onchange=async()=>{for(const f of i.files)await SP.add(s,{blob:f,name:f.name});draw();};i.click();}
    if(k==='rec'){if(rec){rec.stop();return;}try{const st=await navigator.mediaDevices.getUserMedia({audio:true});const ch=[];rec=new MediaRecorder(st);e.target.textContent='■ থামাও';e.target.classList.add('on');
      rec.ondataavailable=ev=>ch.push(ev.data);rec.onstop=async()=>{st.getTracks().forEach(t=>t.stop());rec=null;await SP.add(s,{blob:new Blob(ch,{type:ch[0]?ch[0].type:'audio/webm'}),name:'রেকর্ডিং'});draw();};rec.start();}
     catch(err){const i=document.createElement('input');i.type='file';i.accept='audio/*';i.setAttribute('capture','');i.onchange=async()=>{if(i.files[0]){await SP.add(s,{blob:i.files[0],name:'রেকর্ডিং'});draw();}};i.click();}}};
   sec.appendChild(act);list.appendChild(sec);}
  const n=SP.count();const st=$('spSt');if(st)st.textContent=n?bn(n)+'টা সাউন্ড/লাইন যোগ করা আছে':'';}
 $('spBulk').onclick=()=>$('spBulkIn').click();
 $('spBulkIn').onchange=async e=>{const items=[...e.target.files].map(f=>{const nm=f.name.toLowerCase();let slot='crash';for(const [re,s] of SP_AUTO)if(re.test(nm)){slot=s;break;}return{slot,blob:f,name:f.name};});const n=items.length;await SP.addMany(items);e.target.value='';draw();$('spSt')&&($('spSt').textContent='✅ '+bn(n)+'টা সাউন্ড যোগ হল');};
 $('spClr').onclick=()=>{if(!confirm('সব সাউন্ড আর লাইন মুছে ফেলবে?'))return;for(const [s] of SP_SLOTS)for(const it of [...SP.meta[s]])SP.remove(s,it.id);draw();};
 $('spBack').onclick=()=>{ov.classList.add('hidden');$('menu').classList.remove('hidden');};
 $('spOld').onclick=()=>{ov.classList.add('hidden');$('bVP').click();};
 window.openSoundPack=()=>{draw();$('menu').classList.add('hidden');ov.classList.remove('hidden');};}

/* ---------- tidy start menu ---------- */
{const menu=$('menu');menu.classList.add('m2');
 // city dropdown + traffic segmented
 const cityBox=$('cityOpts'),trafBox=$('trafOpts');const card=cityBox.parentNode;card.classList.add('m2-opts');
 const sel=document.createElement('select');sel.id='citySel';[...cityBox.children].forEach((b,i)=>{const o=document.createElement('option');o.value=i;o.textContent=b.textContent;sel.appendChild(o);});
 const syncCity=()=>{const i=[...cityBox.children].findIndex(b=>b.classList.contains('sel'));if(i>=0)sel.value=i;};syncCity();
 sel.onchange=()=>{cityBox.children[+sel.value].click();syncCity();};new MutationObserver(syncCity).observe(cityBox,{attributes:true,subtree:true,attributeFilter:['class']});
 cityBox.style.display='none';card.innerHTML='';card.appendChild(cityBox);const r1=document.createElement('label');r1.className='m2-row';r1.innerHTML='<span>শহর</span>';r1.appendChild(sel);
 const r2=document.createElement('div');r2.className='m2-row';r2.innerHTML='<span>ট্রাফিক</span>';trafBox.classList.add('seg');r2.appendChild(trafBox);card.appendChild(r1);card.appendChild(r2);
 // main actions
 const go=$('go');const rowGo=go.parentNode;rowGo.className='m2-go';rowGo.innerHTML='';rowGo.appendChild(go);
 const tiles=document.createElement('div');tiles.className='m2-tiles';
 const tile=(ic,t,fn,id)=>{const b=document.createElement('button');b.className='m2-tile';if(id)b.id=id;b.innerHTML='<i>'+ic+'</i><span>'+t+'</span>';b.onclick=fn;tiles.appendChild(b);return b;};
 tile('🎨','গ্যারেজ',()=>$('bGar').click());tile('🔊','সাউন্ড প্যাক',()=>openSoundPack());tile('⚙','সেটিংস',()=>{$('m2set').classList.toggle('open');});
 const inst=tile('⬇','অ্যাপ ইনস্টল',()=>installApp(),'bInst');inst.style.display='none';
 rowGo.after(tiles);const spSt=document.createElement('div');spSt.className='sub';spSt.id='spSt';spSt.style.cssText='font-size:11px;margin-top:2px';tiles.after(spSt);
 // settings drawer with the rest
 const set=document.createElement('div');set.id='m2set';set.className='card m2-set';
 set.innerHTML='<div class="m2-sh">সেটিংস</div>';const grid=document.createElement('div');grid.className='m2-grid';set.appendChild(grid);
 for(const id of['bGfx','bLives','bTilt','bMus']){const b=$(id);if(b){b.className='btn sm alt';grid.appendChild(b);}}
 const lay=[...menu.querySelectorAll('button')].find(b=>/বোতাম$/.test(b.textContent.trim()));if(lay){lay.textContent='🎛 বোতাম সাজাও';grid.appendChild(lay);}
 const vpb=$('bVP');if(vpb&&vpb.parentNode){const pr=vpb.parentNode;vpb.style.display='none';if(![...pr.children].some(c=>c.style.display!=='none'))pr.style.display='none';}
 const ms=$('musSt');if(ms)set.appendChild(ms);const vs=$('vpSt');if(vs)set.appendChild(vs);
 const hint=[...menu.querySelectorAll('.sub')].find(x=>/নিজের\/বন্ধুদের/.test(x.textContent));if(hint)hint.remove();
 const leftovers=[...menu.querySelectorAll('.row')].filter(r=>!r.querySelector('button:not([style*="none"])')||r.children.length===0);leftovers.forEach(r=>r.remove());
 tiles.after(set);spSt.after(set);
 // tasks + map collapsed
 for(const c of menu.querySelectorAll('.card')){const h=c.querySelector('h3');if(!h||c===card||c===set)continue;c.classList.add('m2-fold');h.classList.add('m2-fh');h.onclick=()=>c.classList.toggle('open');}
 SP.count()&&($('spSt').textContent=bn(SP.count())+'টা সাউন্ড/লাইন যোগ করা আছে');}

/* ---------- install as an app ---------- */
let bip=window.__bip||null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();bip=e;showInst();});
function standalone(){return matchMedia('(display-mode: standalone)').matches||navigator.standalone;}
function isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent);}
function showInst(){const b=$('bInst');if(b&&!standalone()&&(bip||isIOS())&&top===self)b.style.display='';}
function installApp(){if(bip){bip.prompt();bip.userChoice.finally(()=>{bip=null;$('bInst').style.display='none';});}else if(isIOS())alert('Safari-তে নিচের শেয়ার বোতাম ⬆ টিপে "Add to Home Screen" বেছে নাও।');}
showInst();
if('serviceWorker' in navigator&&top===self&&/^https:|^http:\/\/localhost/.test(location.href)){navigator.serviceWorker.register('sw.js').catch(()=>{});}
