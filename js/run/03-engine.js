'use strict';
/* engine: state and start-up code */
let renderer;
try{renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});}catch(e){$('err').style.display='flex';throw new Error('WebGL unavailable');}
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
renderer.setSize(W,H);
renderer.domElement.className='gl';
$('stage').insertBefore(renderer.domElement,$('stage').firstChild);
const scene=new T.Scene();
scene.background=new T.Color('#f2b27a');
scene.fog=new T.Fog('#e3a37c',35,215);
const camera=new T.PerspectiveCamera(66,W/H,.3,260);
const hemi=new T.HemisphereLight(0xffffff,0x6a6a7a,.95);
scene.add(hemi);
const sun=new T.DirectionalLight(0xfff0d8,.75);
scene.add(sun,sun.target);
const head=new T.SpotLight(0xfff0c0,0,70,.55,.5,1);
scene.add(head,head.target);
const sunDisc=new T.Mesh(new T.SphereGeometry(14,16,12),new T.MeshBasicMaterial({color:'#fff2c0',fog:false}));
scene.add(sunDisc);
const matC={};
const mbC={};
const UB=new T.BoxGeometry(1,1,1),UC=new T.CylinderGeometry(1,1,1,10),US=new T.SphereGeometry(1,10,8),UI=new T.IcosahedronGeometry(1,0);
const smt=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
const NARROW={0:[[60,300]],2:[[70,230]],3:[[390,520]],7:[[450,560]]};
const FLY={2:[[300,540]],7:[[120,370]]};
const BAD={0:[[140,420]],2:[[430,560]],3:[[0,600]],4:[[180,330]],5:[[440,580]],6:[[360,520]],7:[[400,580]]};
const DIV={1:[[0,600]],3:[[0,380]],4:[[0,600]],5:[[200,600]],6:[[60,600]]};
const TWO={0:[[0,600]],2:[[0,250]],3:[[380,600]],7:[[430,600]]};
const JN={0:[340,520],2:[110],3:[150,330],4:[200,450],5:[120,380],7:[480]};
const JMAP={0:[1,2],2:[3,4],3:[1,4],4:[6,5],5:[6,7],7:[5,6]};
const brickTex=cTex(128,128,(x,w,h)=>{x.fillStyle='#bdb6a6';x.fillRect(0,0,w,h);for(let r=0;r<8;r++)for(let c=0;c<4;c++){const o=(r%2)*16;x.fillStyle='hsl('+(10+Math.random()*10)+','+(28+Math.random()*12)+'%,'+(44+Math.random()*14)+'%)';x.fillRect(c*32+o+1,r*16+1,30,14);}
 for(let i=0;i<500;i++){x.fillStyle='rgba('+(i%7?'30,25,20':'70,110,50')+','+Math.random()*.16+')';x.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*3,1+Math.random()*2);}
 for(let i=0;i<4;i++){x.fillStyle='rgba(40,30,20,.12)';x.beginPath();x.ellipse(Math.random()*w,Math.random()*h,8+Math.random()*14,5+Math.random()*8,0,0,7);x.fill();}});
brickTex.wrapS=brickTex.wrapT=T.RepeatWrapping;
const groundTex=cTex(128,128,(x,w,h)=>{x.fillStyle='#d4d4d4';x.fillRect(0,0,w,h);for(let i=0;i<900;i++){const v=170+Math.random()*80|0;x.fillStyle='rgba('+v+','+v+','+v+',.5)';x.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*4,1+Math.random()*3);}for(let i=0;i<10;i++){x.fillStyle='rgba(120,120,120,.12)';x.beginPath();x.ellipse(Math.random()*w,Math.random()*h,10+Math.random()*18,6+Math.random()*10,0,0,7);x.fill();}});
groundTex.wrapS=groundTex.wrapT=T.RepeatWrapping;
groundTex.repeat.set(30,5);
const winD=winTex(0),winL=winTex(1);
const bGeo={},bMat={};
const signC={};
const gateC={};
const tagC={};
