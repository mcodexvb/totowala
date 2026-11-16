'use strict';
/* look: state and start-up code */
const SKYU={top:{value:new T.Color('#4f8fd6')},hor:{value:new T.Color('#f2d6b0')},sunD:{value:new T.Vector3(.3,.5,-.8)},sunC:{value:new T.Color('#fff1c9')},nt:{value:0},tm:{value:0}};
const skyDome=new T.Mesh(new T.SphereGeometry(190,32,16),new T.ShaderMaterial({uniforms:SKYU,side:T.BackSide,depthWrite:false,depthTest:false,fog:false,
 vertexShader:'varying vec3 vD;void main(){vD=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:`uniform vec3 top,hor,sunC,sunD;uniform float nt,tm;varying vec3 vD;
 float h(vec3 p){p=fract(p*.3183+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
 void main(){vec3 d=normalize(vD);float y=max(d.y,0.);vec3 c=mix(hor,top,pow(y,.55));
  float s=max(dot(d,normalize(sunD)),0.);c+=sunC*(pow(s,600.)*1.6+pow(s,40.)*.35+pow(s,6.)*.12)*(1.-nt*.6);
  if(nt>.05){vec3 q=floor(d*260.);float st=step(.9975,h(q))*smoothstep(.05,.3,y);c+=vec3(st*nt*(.6+.4*sin(tm*3.+h(q+1.)*40.)));}
  c=mix(c,hor,smoothstep(.12,-.02,d.y));gl_FragColor=vec4(c,1.);}`}));
skyDome.renderOrder=-10;
skyDome.frustumCulled=false;
scene.add(skyDome);
sunDisc.visible=false;
const _sTop=new T.Color(),_sHor=new T.Color(),DTOP=new T.Color('#3f86d8'),NTOP=new T.Color('#05081c'),DHOR=new T.Color('#e9e4da'),NHOR=new T.Color('#2a2448'),DUSKH=new T.Color('#ff8a4a');
const envUpd11=envUpdate;
envUpdate=function(dt){envUpd11(dt);const nf=G.night||0,tint=4*nf*(1-nf),Z=ZN[G.zone||0];
 _sTop.copy(DTOP).lerp(new T.Color(Z.sky),.18).lerp(new T.Color('#e06a5a'),tint*.35).lerp(NTOP,nf);
 _sHor.copy(DHOR).lerp(new T.Color(Z.fog),.2).lerp(DUSKH,tint*.7).lerp(NHOR,nf);
 if(G.rainA>.05){_sTop.lerp(new T.Color('#6d7682'),G.rainA*.8);_sHor.lerp(new T.Color('#9aa3ad'),G.rainA*.8);}
 const k=G.envSnap2?1:Math.min(1,dt*.6);G.envSnap2=0;SKYU.top.value.lerp(_sTop,k);SKYU.hor.value.lerp(_sHor,k);SKYU.nt.value=nf;SKYU.tm.value=G.t||0;
 scene.fog.color.copy(SKYU.hor.value);scene.fog.near=lerp(70,35,Math.max(nf,G.rainA||0));scene.fog.far=lerp(205,175,nf);
 SKYU.sunD.value.copy(sun.position).sub(sun.target.position).normalize();SKYU.sunC.value.set(nf>.5?'#cfd6ff':'#fff0c4');
 skyDome.position.copy(camera.position);hemi.color.set('#fff8ee').lerp(new T.Color('#9fb0ff'),nf);hemi.groundColor.set('#7a6a5a').lerp(new T.Color('#202040'),nf);
 sun.color.set('#fff0d8').lerp(new T.Color('#ff9a5a'),tint*.8);};
renderer.toneMapping=T.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.22;
(function(){const c=renderer.domElement;c.style.filter='none';const v=document.createElement('div');v.id='vig';v.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:1;background:radial-gradient(ellipse at 50% 55%,rgba(0,0,0,0) 55%,rgba(0,0,0,.32) 100%);transition:box-shadow .3s';(c.parentNode||document.body).insertBefore(v,c.nextSibling);})();
scene.traverse(o=>{if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m.needsUpdate=true);}});
(function(){const cache={};player.traverse(o=>{if(!o.isMesh||!o.material||!o.material.isMeshLambertMaterial)return;const m=o.material,k=m.uuid;
 if(!cache[k]){const lum=m.color.r*.3+m.color.g*.59+m.color.b*.11;cache[k]=new T.MeshPhongMaterial({color:m.color,map:m.map||null,flatShading:m.flatShading,shininess:lum>.25?55:20,specular:new T.Color(lum>.25?0x555555:0x222222),transparent:m.transparent,opacity:m.opacity,side:m.side,emissive:m.emissive||new T.Color(0)});}
 o.material=cache[k];});})();
(function(){const g0=gfxSetup;gfxSetup=function(){g0();const hi=(SAVE.gfx||'hi')==='hi';if(hi&&sun.shadow.mapSize.x<2048){sun.shadow.mapSize.set(2048,2048);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null;}}};})();
const _pv=new T.Vector3();
startBeat=function(){if(G.beatT>0)return;G.beatT=4.6;G.bt0=0;G.sp=0;G.vx=G.vz=0;for(const k in keys)keys[k]=0;document.querySelectorAll('.cb.on').forEach(b=>b.classList.remove('on'));
 const cs=Math.cos(G.th),sn=Math.sin(G.th),side=Math.random()<.5?-1:1;G.bSide=side;G.bdx=G.x+side*cs;G.bdD=G.D-side*sn;
 const px=PX(),pz=PZ();let i=0;const N=9;
 const prep=c=>{c.m.scale.setScalar(1);c.m.rotation.set(0,0,0);c.st='beat';c.ang=i/N*Math.PI*2+rnd(-.2,.2);c.rr=rnd(1.25,1.8);c.t=Math.random();c.kick=Math.random()<.4;c.bsp=rnd(4.5,6);c.wait=0;i++;};
 for(const c of CHP){if(i>=N)break;if(c.on)prep(c);}
 const cand=ents.filter(e=>!e.gone&&!e.down&&!e.fly&&(e.type==='walker'||e.type==='ped')&&Math.hypot(e.x-px,e.z-pz)<34).sort((a,b)=>Math.hypot(a.x-px,a.z-pz)-Math.hypot(b.x-px,b.z-pz));
 for(const c of CHP){if(i>=N)break;if(c.on)continue;const src=cand.shift();let sx,sz,ok=!!src;
  if(src){sx=src.x;sz=src.z;src.gone=true;if(src.mesh)src.mesh.visible=false;}
  else for(let t=0;t<14&&!ok;t++){const a=rnd(0,Math.PI*2),r=rnd(16,26);sx=px+Math.cos(a)*r;sz=pz+Math.sin(a)*r;const pp=pushOut(sx,sz,.5);if(pp){sx+=pp[0];sz+=pp[1];}ok=!solidAt(sx,sz)&&offScreen(sx,-sz);}
  if(!ok)continue;c.on=true;c.m.visible=true;c.x=sx;c.D=-sz;prep(c);c.wait=src?rnd(0,.4):rnd(0,1.2);}
 for(const c of CHP)if(c.on&&c.st!=='beat'){c.on=false;c.m.visible=false;}
 drvOut.visible=true;drvOut.rotation.set(0,0,0);filmer.visible=false;
 A.mob();['pubchip','shakechip','mamachip','vipchip','polchip','tripchip','fillchip'].forEach(i=>$(i).style.display='none');G.spk=null;Vx.speak(pick(MOBL),'bn');$('ctl').style.display='none';};
(function(){const bu=beatUpd;beatUpd=function(dt){
 // hold back late arrivals, use their own run speed (bu moves at 5 m/s; we pre-move the extra)
 for(const c of CHP){if(!c.on||c.st!=='beat')continue;if(c.wait>0){c.wait-=dt;c._hx=c.x;c._hD=c.D;}else c._hx=undefined;}
 bu(dt);
 for(const c of CHP){if(!c.on||c.st!=='beat')continue;if(c._hx!==undefined){c.x=c._hx;c.D=c._hD;c.m.position.set(c.x,0,-c.D);}}
 if(G.bt0>1.2&&!filmer.visible){const s=G.bSide,cs=Math.cos(G.th),sn=Math.sin(G.th),fx=G.bdx+s*4.6*cs-sn*1.5,fD=G.bdD-s*4.6*sn-cs*1.5;if(offScreen(fx,fD)||G.bt0>2.2)filmer.visible=true;}
};})();
