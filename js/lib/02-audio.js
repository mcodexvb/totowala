'use strict';
/* audio: functions (all lib files load before any run file) */
function vox(cat,pri){const now=performance.now();if(!pri&&now-voxT<2200)return;voxT=now;let line,lang;if(BH[cat]&&(!BG[cat]||Math.random()<.55)){line=pick(BH[cat]);lang='hi';}else{line=pick(BG[cat]);lang='bn';}say(line,1);Vx.speak(line,lang);}
