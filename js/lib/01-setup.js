'use strict';
/* setup: functions (all lib files load before any run file) */
function fit(){W=Math.round(Math.min(1700,Math.max(420,H*innerWidth/innerHeight)));SCALE=Math.min(innerWidth/W,innerHeight/H);const st=$('stage');st.style.width=W+'px';st.classList.toggle('wide',W>=640);st.style.transform='translate(-50%,-50%) scale('+SCALE+')';try{const pr=Math.min((window.devicePixelRatio||1)*SCALE,(SAVE.gfx==='lo')?1.25:2.25);renderer.setPixelRatio(pr);curPR=pr;perfT=1;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();}catch(e){}}
function persist(){try{localStorage.setItem('kar3d',JSON.stringify(SAVE));}catch(e){}}
