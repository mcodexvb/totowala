'use strict';
/* audio: state and start-up code */
const A={ctx:null,on:true,
 init(){if(this.ctx){if(this.ctx.state==='suspended')this.ctx.resume();return;}
  try{const C=window.AudioContext||window.webkitAudioContext;this.ctx=new C();this.master=this.ctx.createGain();this.master.gain.value=.55;this.master.connect(this.ctx.destination);
   const n=this.ctx.sampleRate,b=this.ctx.createBuffer(1,n,this.ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;this.nb=b;this.engine();}catch(e){this.ctx=null;}},
 tone(f,d,type,v,to,at,dst){if(!this.ctx||!this.on)return;const c=this.ctx,t=c.currentTime+(at||0),o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.2,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(dst||this.master);o.start(t);o.stop(t+d+.03);},
 noise(d,v,ft,fr,at,dst){if(!this.ctx||!this.on)return;const c=this.ctx,t=c.currentTime+(at||0),s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=this.nb;f.type=ft||'lowpass';f.frequency.value=fr||800;g.gain.setValueAtTime(v||.3,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(dst||this.master);s.start(t);s.stop(t+d+.03);},
 engine(){const c=this.ctx;this.eo=c.createOscillator();this.eo.type='sawtooth';this.eo.frequency.value=60;const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=240;this.eg=c.createGain();this.eg.gain.value=0;const lfo=c.createOscillator();lfo.type='square';lfo.frequency.value=14;const lg=c.createGain();lg.gain.value=.03;lfo.connect(lg);lg.connect(this.eg.gain);this.lfo=lfo;this.eo.connect(f);f.connect(this.eg);this.eg.connect(this.master);this.eo.start();lfo.start();},
 eng(sp,play){if(!this.eo)return;const t=this.ctx.currentTime;this.eo.frequency.setTargetAtTime(46+sp*2.4,t,.12);this.lfo.frequency.setTargetAtTime(9+sp*.5,t,.12);this.eg.gain.setTargetAtTime(play&&this.on?.04:0,t,.12);},
 horn(){this.tone(430,.14,'square',.11,380);this.tone(540,.14,'square',.09,480);this.tone(430,.16,'square',.11,380,.18);this.tone(540,.16,'square',.09,480,.18);},
 bell(){[0,.2].forEach(a=>{this.tone(1568,.55,'sine',.13,null,a);this.tone(2350,.35,'sine',.05,null,a);});},
 crash(){this.noise(.4,.6,'lowpass',900);this.tone(120,.4,'sawtooth',.25,38);},
 smash(){this.noise(.3,.5,'bandpass',1800);this.noise(.35,.5,'lowpass',500);this.tone(180,.25,'square',.2,50);this.tone(1500,.1,'triangle',.1,600,.02);},
 bump(){this.noise(.15,.3,'lowpass',500);this.tone(220,.12,'square',.12,140);},
 coin(){this.tone(988,.08,'square',.1);this.tone(1319,.2,'square',.1,null,.07);},
 moo(){this.tone(170,.8,'triangle',.2,100);this.tone(255,.8,'triangle',.08,150);},
 sweet(){[523,659,784,1047].forEach((f,i)=>this.tone(f,.14,'triangle',.15,null,i*.06));},
 splash(){this.noise(.3,.25,'bandpass',1400);},
 pothole(){this.tone(90,.18,'square',.2,45);this.noise(.12,.3,'lowpass',400);},
 pax(){this.tone(700,.1,'sine',.13);this.tone(940,.16,'sine',.13,null,.09);},
 stop(){[392,523,659,784].forEach((f,i)=>this.tone(f,.22,'triangle',.17,null,i*.1));},
 warn(){this.tone(880,.12,'square',.08);this.tone(660,.12,'square',.08,null,.14);},
 bomb(){this.tone(90,.6,'sine',.45,30);this.noise(.6,.5,'lowpass',300);},
 mob(){this.tone(220,.5,'sawtooth',.07,330);this.tone(260,.5,'sawtooth',.06,380,.05);this.noise(.5,.1,'bandpass',900);},
 turbo(){this.noise(.4,.15,'highpass',2000);this.tone(200,.4,'sawtooth',.08,600);},
 sad(){[[400,300],[340,250],[290,200],[240,110]].forEach((p,i)=>this.tone(p[0],.4,'sawtooth',.14,p[1],i*.32));}
};
let voiceOn=true,voxT=0;
const MEL2=[0,-1,2,-1,3,3,-1,2,4,-1,3,-1,2,-1,0,-1,5,-1,4,-1,3,4,-1,3,2,-1,3,-1,1,-1,0,-1],MEL=[3,-1,2,-1,1,-1,2,3,4,-1,-1,3,2,-1,1,0,1,-1,2,-1,3,-1,4,5,4,-1,3,-1,2,1,0,-1],SC=[293.7,329.6,370,440,493.9,587.3];
const Mus={on:true,run:false,tracks:[],clips:[],step:0,next:0,timer:0,src:null,ti:0,bpm:112,
 start(){if(!A.ctx||this.run||!this.on)return;this.run=true;if(!this.out){this.out=A.ctx.createGain();this.out.connect(A.master);}this.vol();
  if(this.tracks.length)this.playTrack();else{this.next=A.ctx.currentTime+.15;this.step=0;this.tick();}},
 stop(){this.run=false;clearTimeout(this.timer);if(this.src){try{this.src.onended=null;this.src.stop();}catch(e){}this.src=null;}},
 vol(){if(this.out)this.out.gain.value=A.on&&this.on?(this.tracks.length?.7:.2):0;},
 playTrack(){if(!this.run)return;const s=A.ctx.createBufferSource();s.buffer=this.tracks[this.ti++%this.tracks.length];s.connect(this.out);s.onended=()=>{if(this.run)this.playTrack();};s.start();this.src=s;},
 tick(){if(!this.run||!A.ctx||this.tracks.length)return;const sp=60/this.bpm/4;while(this.next<A.ctx.currentTime+.3){this.play(this.step%32,this.next);this.next+=sp;this.step++;}this.timer=setTimeout(()=>this.tick(),70);},
 play(s,t){const at=Math.max(0,t-A.ctx.currentTime),o=this.out,k=s%16;
  if(k===0||k===6||k===8||k===12)A.tone(130,.22,'sine',.5,60,at,o);
  if(k===4||k===10||k===14){A.noise(.06,.28,'bandpass',2200,at,o);A.tone(300,.06,'triangle',.18,200,at,o);}
  if(k%2===0)A.noise(.03,.07,'highpass',6000,at,o);
  if(k===3||k===11)A.tone(210,.08,'triangle',.2,150,at,o);
  if(k===0){A.tone(146.8,.9,'sawtooth',.05,null,at,o);A.tone(220,.9,'sawtooth',.03,null,at,o);}
  const ph2=Math.floor(this.step/64)%2;if(ph2&&(k===2||k===7||k===9||k===13))A.tone(k===7?95:180,.14,'sine',.35,k===7?55:120,at,o);if(ph2&&k%4===2)A.tone(1200,.04,'square',.03,null,at,o);
  const n=(ph2?MEL2:MEL)[s];if(n>=0){const f=SC[n];A.tone(f,.2,'triangle',.14,null,at,o);A.tone(f*1.006,.2,'sawtooth',.045,null,at,o);if(s%8===7)A.tone(f*1.12,.05,'triangle',.08,f,at,o);}}
};
Object.assign(A,{
 glug(){this.tone(180+Math.random()*90,.12,'sine',.18,120);},
 rattle(){this.noise(.08,.25,'lowpass',500);this.tone(90,.1,'square',.12,60);},
 boing(){this.tone(180,.35,'sine',.3,520);this.tone(520,.35,'sine',.2,180,.17);},
 whistle(){this.tone(500,.7,'sine',.14,2200);},
 tring(){[0,.13,.26].forEach(a=>this.tone(2600,.1,'triangle',.1,null,a));},
 pom(){this.tone(300,.1,'sawtooth',.1,240);this.tone(300,.12,'sawtooth',.1,240,.14);},
 dhoom(){this.tone(110,.3,'sine',.5,45);this.noise(.15,.4,'bandpass',1500);},
 clip(p){if(!this.ctx||!this.on||!Mus.clips.length||Math.random()>(p===undefined?.35:p))return;const s=this.ctx.createBufferSource(),g=this.ctx.createGain();s.buffer=pick(Mus.clips);g.gain.value=.9;s.connect(g);g.connect(this.master);s.start();}
});
const Vx={voices:[],load(){if(window.speechSynthesis)this.voices=speechSynthesis.getVoices()||[];},
 speak(text,lang){if(!voiceOn||!A.on||!window.speechSynthesis)return;this.load();const v=this.voices.find(v=>v.lang.toLowerCase().replace('_','-').startsWith(lang));if(!v)return;try{const u=new SpeechSynthesisUtterance(text);u.voice=v;u.lang=v.lang;u.pitch=pick([.7,1.4,1.7,1.9]);u.rate=rnd(1,1.2);speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}}};
if(window.speechSynthesis)speechSynthesis.onvoiceschanged=()=>Vx.load();
const BH={smash:['अरे बाप रे बाप!','तोड़ देहलऽ रे!','का हो गइल रे!','हटऽ हटऽ, रास्ता छोड़ऽ!'],near:['बाल-बाल बचलऽ!','वाह रे ड्राइवर!'],pax:['ए भइया, चलऽ चलऽ!','कहाँ जाई मालिक?'],turbo:['अब देखऽ रफ्तार!'],mob:['पकड़ऽ पकड़ऽ!','जाए ना पावे!'],low:['गैस खतम होखे वाला बा!'],win:['जियऽ रजा!','पहुँच गइलऽ!'],hit:['आह रे दादा!','गाड़ी ठोक देहलऽ!'],wrong:['उल्टा काहे आवत बाड़ऽ!'],cow:['गइया माता हटऽ!']};
const BG={hit:HIT,near:NEAR,pax:PAXL,wrong:WRONG,cow:COWL,drop:DROP,smash:SMASHL,mob:['পাবলিক ক্ষেপেছে! পালাও!'],low:['ব্যাটারি শেষ হয়ে এল!'],turbo:['এবার দেখো স্পিড!'],win:['জিতে গেলাম!']};
