'use strict';
/* ===== v22: app name, control layout editor ===== */
/* --- name --- */
const APP_BN='টোটোওয়ালা',APP_EN='Kolkata Toto Rush';
function setLogo(cityEn){$('logo').innerHTML='<b>'+APP_BN+'</b><small>'+(cityEn&&cityEn!=='Kolkata'?cityEn+' Toto Rush':APP_EN)+'</small>';}
document.title=APP_BN+' · '+APP_EN;setLogo();
new MutationObserver(()=>{const l=$('logo');if(!l.querySelector('b')){const m=/^([^<]+)<br>/.exec(l.innerHTML);setLogo(m?m[1]:null);}}).observe($('logo'),{childList:true});

/* --- control layout: each button can be moved and resized; saved per device --- */
const LAY_IDS=['bL','bR','bG','bK','bT','bH','bB'],LAY_NAME={bL:'বামে',bR:'ডানে',bG:'চালাও',bK:'ব্রেক',bT:'টান',bH:'হর্ন',bB:'শব্দবোমা'};
function layApply(){const L=SAVE.lay||{};for(const id of LAY_IDS){const el=$(id);if(!el)continue;const o=L[id]||{};el.style.setProperty('--dx',(o.x||0)+'px');el.style.setProperty('--dy',(o.y||0)+'px');el.style.setProperty('--s',o.s||1);}}
layApply();
{const box=document.createElement('div');box.id='lay';
 box.innerHTML='<div class="t">বোতাম সাজাও</div><div class="h">বোতাম টেনে সরাও। একটা বোতাম বেছে নিয়ে নিচের দাগ দিয়ে ছোট-বড় করো।</div>'+
  '<div class="r"><span id="layN">সব বোতাম</span><input id="layS" type="range" min="60" max="170" step="5" value="100"><b id="layV">100%</b></div>'+
  '<div class="row"><button class="btn sm alt" id="layR">আগের মতো</button><button class="btn sm" id="layD">হয়ে গেল</button></div>';
 $('stage').appendChild(box);
 const ctl=$('ctl');let pick=null,drag=null,prevDisp='',prevState=null;
 const L=()=>(SAVE.lay=SAVE.lay||{});const cur=id=>(L()[id]=L()[id]||{x:0,y:0,s:1});
 const showVal=()=>{const s=pick?cur(pick).s:(L()._all||1);$('layS').value=Math.round(s*100);$('layV').textContent=Math.round(s*100)+'%';$('layN').textContent=pick?LAY_NAME[pick]:'সব বোতাম';};
 const select=id=>{pick=id;LAY_IDS.forEach(i=>$(i)&&$(i).classList.toggle('pick',i===id));showVal();};
 window.openLayout=function(){prevState=G.state;prevDisp=ctl.style.display;ctl.style.display='block';ctl.classList.add('edit');box.classList.add('on');$('pause')&&($('pause').style.visibility='hidden');select(null);};
 function close(){ctl.classList.remove('edit');box.classList.remove('on');ctl.style.display=prevDisp;$('pause')&&($('pause').style.visibility='');LAY_IDS.forEach(i=>$(i)&&$(i).classList.remove('pick'));persist();}
 $('layD').onclick=close;
 $('layR').onclick=()=>{SAVE.lay={};layApply();select(null);};
 $('layS').oninput=e=>{const v=+e.target.value/100;if(pick){cur(pick).s=v;}else{L()._all=v;for(const id of LAY_IDS)cur(id).s=v;}layApply();$('layV').textContent=Math.round(v*100)+'%';};
 const sc=()=>(typeof SCALE==='number'&&SCALE>0)?SCALE:1;
 ctl.addEventListener('pointerdown',e=>{if(!ctl.classList.contains('edit'))return;const b=e.target.closest&&e.target.closest('.cb');e.preventDefault();e.stopPropagation();
  if(!b||LAY_IDS.indexOf(b.id)<0){select(null);return;}select(b.id);const o=cur(b.id);drag={id:b.id,px:e.clientX,py:e.clientY,x0:o.x,y0:o.y,pid:e.pointerId};try{ctl.setPointerCapture(e.pointerId);}catch(_){} },true);
 ctl.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.pid)return;e.preventDefault();e.stopPropagation();const o=cur(drag.id);o.x=Math.round(drag.x0+(e.clientX-drag.px)/sc());o.y=Math.round(drag.y0+(e.clientY-drag.py)/sc());layApply();},true);
 const end=e=>{if(drag&&e.pointerId===drag.pid)drag=null;};ctl.addEventListener('pointerup',end,true);ctl.addEventListener('pointercancel',end,true);
 // pinch on a selected button also resizes it
 let pinch=null;ctl.addEventListener('touchmove',e=>{if(!ctl.classList.contains('edit')||!pick||e.touches.length<2)return;e.preventDefault();const [a,b]=e.touches,d=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);if(!pinch)pinch={d,s:cur(pick).s};cur(pick).s=Math.max(.6,Math.min(1.7,pinch.s*d/pinch.d));layApply();showVal();},{passive:false});
 ctl.addEventListener('touchend',e=>{if(e.touches.length<2)pinch=null;});
 // entry points: pause panel and main menu
 const mk=(txt,cls)=>{const b=document.createElement('button');b.className=cls;b.textContent=txt;b.onclick=e=>{e.stopPropagation();openLayout();};return b;};
 const pp=$('pp');if(pp){const q=pp.querySelector('.home');pp.insertBefore(mk('🎛 বোতাম সাজাও','btn sm alt'),q);}
 const mrow=$('bLives')&&$('bLives').parentNode;if(mrow)mrow.appendChild(mk('🎛 বোতাম','btn alt sm'));}
