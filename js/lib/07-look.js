'use strict';
/* look: functions (all lib files load before any run file) */
function offScreen(x,D){camera.updateMatrixWorld();_pv.set(x,1,-D).project(camera);return _pv.z>1||Math.abs(_pv.x)>1.08||Math.abs(_pv.y)>1.1;}
