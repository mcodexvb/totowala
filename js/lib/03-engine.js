'use strict';
/* engine: functions (all lib files load before any run file) */
function M(c,o){const k=c+(o||'');if(!matC[k]){matC[k]=new T.MeshLambertMaterial(Object.assign({color:c,flatShading:true},o?JSON.parse(o):{}));}return matC[k];}
function MB(c,op){const k=c+(op||1);if(!mbC[k])mbC[k]=new T.MeshBasicMaterial({color:c,transparent:op!==undefined&&op<1,opacity:op===undefined?1:op,depthWrite:op===undefined||op>=1});return mbC[k];}
function bx(w,h,d,c,x,y,z,par){const m=new T.Mesh(UB,typeof c==='string'?M(c):c);m.scale.set(w,h,d);m.position.set(x||0,y||0,z||0);if(par)par.add(m);return m;}
function cy(r,h,c,x,y,z,par,side){const m=new T.Mesh(UC,typeof c==='string'?M(c):c);m.scale.set(r,h,r);m.position.set(x,y,z);if(side)m.rotation.z=Math.PI/2;if(par)par.add(m);return m;}
function cTex(w,h,draw){const c=document.createElement('canvas'),q=(w*h<=262144)?2:1;c.width=w*q;c.height=h*q;const x2=c.getContext('2d');x2.scale(q,q);draw(x2,w,h);const t=new T.CanvasTexture(c);t.anisotropy=8;return t;}
function person(shirt,o){o=o||{};const g=new T.Group(),skin=o.skin||pick(['#8d5a3b','#a8693f','#6e4630','#c08a5a']),pants=o.pants||pick(['#2b2b3a','#3a4a6a','#4a3a2a','#5a5a60']);
 const mk=(x)=>{const p=new T.Group();p.position.set(x,.72,0);g.add(p);bx(.22,.72,.24,pants,0,-.36,0,p);return p;};
 const lL=mk(-.14),lR=mk(.14);
 bx(.52,.66,.3,shirt,0,1.05,0,g);
 const ak=(x)=>{const p=new T.Group();p.position.set(x,1.34,0);g.add(p);bx(.15,.6,.18,shirt,0,-.3,0,p);return p;};
 const aL=ak(-.35),aR=ak(.35);
 bx(.28,.28,.28,skin,0,1.58,0,g);bx(.3,.1,.3,'#1c1410',0,1.74,0,g);
 g.userData={legs:[lL,lR],arms:[aL,aR]};return g;}
function walk(g,t,a){const u=g.userData;u.legs[0].rotation.x=Math.sin(t)*a;u.legs[1].rotation.x=-Math.sin(t)*a;u.arms[0].rotation.x=-Math.sin(t)*a;u.arms[1].rotation.x=Math.sin(t)*a;}
function ivl(tab,D,soft){const z=Math.floor(D/SEG)%8,d=D%SEG,L=tab[z];if(!L)return 0;let v=0;for(const a of L){const x=soft?smt(a[0]-soft,a[0]+soft,d)*(1-smt(a[1]-soft,a[1]+soft,d)):(d>=a[0]&&d<=a[1]?1:0);if(x>v)v=x;}return v;}
function hwAt(D){return lerp(6.4,4.6,ivl(NARROW,D,45));}
function elev0(D){return 7*ivl(FLY,D,50);}
function elevAt(D){const k=Math.floor(D/CH),f=D/CH-k;return lerp(elev0(k*CH),elev0((k+1)*CH),f);}
function hwP(D){return lerp(hwAt(D),5.4,clamp(elevAt(D)/3,0,1));}
function roadKind(D){if(elev0(D)>.3)return 0;if(ivl(DIV,D,0))return hwAt(D)<5.1?1:2;if(ivl(TWO,D,0))return 1;return 0;}
function nearJ(D){const s=Math.floor(D/SEG),d=D-s*SEG;let b=1e9;for(const q of[-1,0,1]){const L=JN[((s+q)%8+8)%8];if(L)for(const j of L){const v=Math.abs(d-(j+q*SEG));if(v<b)b=v;}}return b;}
function nextJ(D){let s=Math.floor(D/SEG);for(let i=0;i<10;i++,s++){const L=JN[s%8];if(L)for(const j of L){const v=s*SEG+j;if(v>=D)return v;}}return D+1e5;}
function divAt(D){return roadKind(D)===2&&nearJ(D)>7.5;}
function fwdSet(D){const L=laneSet(D);return roadKind(D)?L.filter(x=>x<-.1):L;}
function oncSet(D){const L=laneSet(D);return roadKind(D)?L.filter(x=>x>.1):[];}
function JH(D){return nearJ(D)<9.5;}
function laneSet(D){const hw=hwP(D);if(hw<5.1&&elevAt(D)<.5)return[-hw*.64,0,hw*.64];return LX.map(x=>x*hw/6.4);}
function mkRoadTex(kind,bad){return cTex(256,256,(x,w,h)=>{
 x.fillStyle=bad?'#3b3c40':'#34363d';x.fillRect(0,0,w,h);
 for(let i=0;i<2000;i++){x.fillStyle=Math.random()<.55?'rgba(0,0,0,'+Math.random()*.16+')':'rgba(255,255,255,'+Math.random()*.07+')';x.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*2,1+Math.random()*2);}
 for(let i=0;i<(bad?6:3);i++){const px=Math.random()*w,py=Math.random()*h,r=10+Math.random()*20,gr=x.createRadialGradient(px,py,0,px,py,r);gr.addColorStop(0,'rgba(8,8,10,.38)');gr.addColorStop(1,'rgba(8,8,10,0)');x.fillStyle=gr;x.fillRect(px-r,py-r,r*2,r*2);}
 x.strokeStyle='rgba(0,0,0,.45)';x.lineWidth=2;for(const y of[40,168]){x.beginPath();x.moveTo(0,y);for(let xx=0;xx<=w;xx+=16)x.lineTo(xx,y+Math.sin(xx*.2)*1.5);x.stroke();}
 if(kind==='w'){x.fillStyle='#e8e8e8';x.fillRect(2,0,5,h);x.fillRect(w-7,0,5,h);x.fillRect(62,0,4,h/2);x.fillRect(190,0,4,h/2);x.fillStyle='#ffd23f';x.fillRect(123,0,3,h);x.fillRect(130,0,3,h);}
 else{x.fillStyle='rgba(230,230,230,.55)';x.fillRect(85,0,3,h/3);x.fillRect(170,0,3,h/3);x.fillRect(85,h/2,3,h/3);x.fillRect(170,h/2,3,h/3);}
 for(let i=0;i<(bad?260:80);i++){x.fillStyle='rgba(52,54,61,'+(.5+Math.random()*.4)+')';x.fillRect(Math.random()*w,Math.random()*h,2+Math.random()*6,2+Math.random()*5);}
 if(bad){
  for(let i=0;i<4;i++){const pw=26+Math.random()*50,ph=20+Math.random()*44,px=Math.random()*(w-pw),py=Math.random()*(h-ph);x.fillStyle=pick(['#2d2f34','#44464c','#3a3b41','#4a4a4e']);x.fillRect(px,py,pw,ph);x.strokeStyle='rgba(0,0,0,.55)';x.lineWidth=1.5;x.strokeRect(px,py,pw,ph);}
  x.strokeStyle='rgba(0,0,0,.75)';x.lineWidth=1.4;for(let i=0;i<9;i++){let cx=Math.random()*w,cyy=Math.random()*h;x.beginPath();x.moveTo(cx,cyy);for(let j=0;j<8;j++){cx+=Math.random()*18-9;cyy+=Math.random()*14-3;x.lineTo(cx,cyy);}x.stroke();}
  for(let i=0;i<3;i++){const px=20+Math.random()*(w-40),py=20+Math.random()*(h-40),rx=11+Math.random()*13,ry=8+Math.random()*9;x.fillStyle='#4d4e53';x.beginPath();x.ellipse(px,py,rx+3,ry+3,0,0,7);x.fill();x.fillStyle=i===0?'rgba(85,115,140,.85)':'#1c1d21';x.beginPath();x.ellipse(px,py,rx,ry,0,0,7);x.fill();if(i===0){x.fillStyle='rgba(255,255,255,.25)';x.beginPath();x.ellipse(px-rx*.3,py-ry*.3,rx*.4,ry*.25,0,0,7);x.fill();}}
  for(let i=0;i<3;i++){x.fillStyle='rgba(112,86,55,.3)';x.beginPath();x.ellipse(Math.random()*w,Math.random()*h,25+Math.random()*30,10+Math.random()*14,Math.random()*3,0,7);x.fill();}
 }});}
function winTex(lit){const t=cTex(64,64,(x,w,h)=>{x.fillStyle='#fff';x.fillRect(0,0,w,h);
 for(let i=0;i<170;i++){x.fillStyle='rgba('+(50+Math.random()*60|0)+','+(40+Math.random()*40|0)+',30,'+Math.random()*.08+')';x.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*3,2+Math.random()*10);}
 const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'rgba(0,0,0,.12)');gr.addColorStop(.5,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,.07)');x.fillStyle=gr;x.fillRect(0,0,w,h);
 x.fillStyle='#d8d8d8';x.fillRect(0,h-5,w,5);x.fillStyle='rgba(0,0,0,.2)';x.fillRect(0,h-6,w,1);
 [8,36].forEach((px,i)=>{x.fillStyle='#7a7a7a';x.fillRect(px-2,10,24,36);x.fillStyle=lit?'#ffd98a':'#27384a';x.fillRect(px,12,20,32);x.fillStyle='#0005';x.fillRect(px+9,12,2,32);
  x.fillStyle=i?'#4f6a49':'#5a6a7a';x.fillRect(px-3,11,4,34);x.fillRect(px+19,11,4,34);
  x.strokeStyle='rgba(30,30,30,.7)';x.lineWidth=1;for(let g=0;g<4;g++){x.beginPath();x.moveTo(px,18+g*7);x.lineTo(px+20,18+g*7);x.stroke();}});
 x.fillStyle='#e6e6e6';x.fillRect(27,50,9,6);x.fillStyle='#999';x.fillRect(28,52,7,1);
 });t.wrapS=t.wrapT=T.RepeatWrapping;return t;}
function bldGeo(w,f,d){const k=w+'|'+f+'|'+d;if(bGeo[k])return bGeo[k];const g=new T.BoxGeometry(w,f*3.2,d),uv=g.attributes.uv;for(let i=0;i<uv.count;i++){uv.setXY(i,uv.getX(i)*(i<16||i>=24?1:1)*(w/6),uv.getY(i)*f);}
 const top=g.groups;bGeo[k]=g;return g;}
function bldMat(col,lit){const k=col+lit;if(!bMat[k]){const c=new T.Color(col);bMat[k]=[new T.MeshLambertMaterial({color:col,map:lit?winL:winD}),new T.MeshLambertMaterial({color:col,map:lit?winL:winD}),new T.MeshLambertMaterial({color:c.clone().multiplyScalar(.7)}),new T.MeshLambertMaterial({color:c.clone().multiplyScalar(.5)}),new T.MeshLambertMaterial({color:col,map:lit?winL:winD}),new T.MeshLambertMaterial({color:col,map:lit?winL:winD})];}return bMat[k];}
function signTex(txt,bg,fg){const k=txt+bg;if(signC[k])return signC[k];return signC[k]=cTex(512,128,(x,w,h)=>{x.fillStyle=bg;x.fillRect(0,0,w,h);x.strokeStyle='#fff';x.lineWidth=6;x.strokeRect(5,5,w-10,h-10);x.fillStyle=fg;x.font='700 62px "Noto Sans Bengali","Hind Siliguri",sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(txt,w/2,h/2+4,w-30);});}
function gateTex(z){if(gateC[z])return gateC[z];const Z=ZN[z];return gateC[z]=cTex(1024,256,(x,w,h)=>{x.fillStyle=Z.c;x.fillRect(0,0,w,h);x.strokeStyle='#fff';x.lineWidth=10;x.strokeRect(10,10,w-20,h-20);x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';x.font='700 120px "Noto Sans Bengali","Hind Siliguri",sans-serif';x.fillText(Z.bn,w/2,100,w-60);x.font='600 54px "Noto Sans Bengali","Hind Siliguri",sans-serif';x.globalAlpha=.9;x.fillText(Z.en.toUpperCase(),w/2,198);});}
function tagTex(txt,bg,fg,sz){const k=txt+bg;if(tagC[k])return tagC[k];return tagC[k]=cTex(128,64,(x,w,h)=>{x.fillStyle=bg;x.fillRect(0,0,w,h);x.fillStyle=fg;x.font='800 '+(sz||40)+'px "Noto Sans Bengali","Baloo Da 2","Noto Sans Bengali","Hind Siliguri",sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(txt,w/2,h/2+2,w-8);});}
function planeTex(tex,w,h,basic){const m=new T.Mesh(new T.PlaneGeometry(w,h),basic?new T.MeshBasicMaterial({map:tex}):new T.MeshLambertMaterial({map:tex}));return m;}
