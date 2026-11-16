'use strict';
/* setup: state and start-up code */
const $=id=>document.getElementById(id);
let W=420,H=760;
const T=window.THREE;
if(!T){$('err').style.display='flex';throw new Error('WebGL unavailable');}
const LANE=3.2,RH=6.4,CH=40,SEG=600,AHEAD=7,LX=[-4.8,-1.6,1.6,4.8];
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[(Math.random()*a.length)|0],clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t;
const bn=n=>Math.round(n).toLocaleString('bn-IN');
let SCALE=1;
fit();
addEventListener('resize',fit);
const ZN=[
 {bn:'হাওড়া স্টেশন',en:'Howrah Station',c:'#b5472f',sky:'#f2b27a',fog:'#e3a37c',amb:.95,night:0,pal:['#a8462f','#c06a3c','#8b3a2b','#c98a4e'],shops:['হাওড়া মিষ্টান্ন','চা-সিঙাড়া','রেলওয়ে বুক স্টল','কুলির আড্ডা']},
 {bn:'হাওড়া ব্রিজ',en:'Howrah Bridge',c:'#59697a',sky:'#9ec6e6',fog:'#b9d3e6',amb:1,night:0,pal:['#8c97a3'],shops:['ফেরিঘাট']},
 {bn:'কলেজ স্ট্রিট',en:'College Street',c:'#d98324',sky:'#f0d9a8',fog:'#e6cf9e',amb:1,night:0,pal:['#d9c7a0','#c9d8a0','#e8c9a0','#d8b88c'],shops:['বইপাড়া','কফি হাউস','পুরনো বইয়ের দোকান','প্রকাশনী']},
 {bn:'বিবাদী বাগ',en:'BBD Bagh',c:'#b5382c',sky:'#7b8794',fog:'#8a95a1',amb:.8,night:0,pal:['#b3382c','#a63a2a','#c1473a'],shops:['ডাকঘর','লালদিঘি','সরকারি দপ্তর']},
 {bn:'এসপ্ল্যানেড',en:'Esplanade',c:'#2b6cb0',sky:'#e07a9a',fog:'#c98aa6',amb:.85,night:.3,pal:['#7a7f8c','#9aa0b4','#6f7480','#8c8fa8'],shops:['নিউ মার্কেট','ধর্মতলা বিরিয়ানি','জুতোর দোকান','মেট্রো']},
 {bn:'পার্ক স্ট্রিট',en:'Park Street',c:'#8e3b8f',sky:'#14122e',fog:'#1f1a40',amb:.55,night:1,pal:['#3a2f5e','#2b2540','#4a2f55','#33405e'],shops:['কাবাব কর্নার','কেক ঘর','মিউজিক হাব','রুফটপ ক্যাফে']},
 {bn:'ভিক্টোরিয়া',en:'Victoria Memorial',c:'#2f8f58',sky:'#ffb066',fog:'#f2a77a',amb:1.05,night:0,pal:['#e8e0d0'],shops:['ঘোড়ার গাড়ি']},
 {bn:'রবীন্দ্র সরোবর',en:'Rabindra Sarobar',c:'#1c7fa8',sky:'#a8d8ea',fog:'#bfe3d8',amb:1.05,night:0,pal:['#cfd8c0'],shops:['রোয়িং ক্লাব']}];
const HIT=['আরে দাদা! দেখে চালান!','এই অটো! চোখ নেই নাকি?','ধুর বাবা! দিল ঠুকে!','মামা, ব্রেক কষো!','উফ্‌! আমার অটো!'];
const NEAR=['অল্পের জন্য! 😮‍💨','ওস্তাদ! 😎','বাঁচলাম!'];
const PAXL=['দাদা, ধর্মতলা যাবেন?','ও অটোওয়ালা, দাঁড়ান!','উঠে পড়ুন, উঠে পড়ুন!'];
const WRONG=['বাপের রাস্তা নাকি?!','উল্টো দিক থেকে আসছে!'];
const COWL=['গোমাতা! রাস্তা ছাড়ো!','হাম্বা!! 🐄'];
const DROP=['ভাড়াটা দিয়ে দিন!','ছুটকো নেই দাদা!','চলো, পরের স্টপ!'];
const SMASH=['ঠাস!','ধুম!','ধপাস!','দুমদাম!','ঝনঝন!','কড়াক!'];
const SMASHL=['এই যে দাদা, কী করলেন!','ধরো ধরো!','ভাঙল রে ভাঙল!','পুলিশ ডাকো!'];
const TICK=['ধর্মতলায় অটোর জ্যাম, যাত্রীরা হেঁটেই পৌঁছলেন','হাওড়া ব্রিজে ফেরিওয়ালার সঙ্গে অটোওয়ালার দরাদরি','কলেজ স্ট্রিটে বইয়ের স্টলের সামনে ট্র্যাফিক পুলিশ কনফিউজড','ট্রাম বলছে: আমি ধীরে চলি, আপনি ধৈর্য ধরুন','পার্ক স্ট্রিটে রাতের আলোয় অটোচালকের সেলফি','ভিক্টোরিয়ার সামনে ঘোড়ার গাড়ি বনাম অটো, জিতল কে?','বৃষ্টি হলেই শহর জলে, অটোওয়ালা নৌকোর দরে ভাড়া হাঁকলেন','রসগোল্লার দাম বাড়ল না, অটোর ভাড়া বাড়ল'];
$('tk').textContent=TICK.join('   ◆   ')+'   ◆   '+TICK.join('   ◆   ');
let SAVE={pocket:200,owned:{p_y:1,s_0:1},paint:'y',sticker:0,best:{dmg:0,fare:0}};
try{const s=JSON.parse(localStorage.getItem('kar3d')||'null');if(s)SAVE=Object.assign(SAVE,s);}catch(e){}
const PAINTS=[{id:'y',n:'হলুদ',c:'#f6c915',p:0},{id:'g',n:'সবুজ',c:'#2f9e5e',p:300},{id:'r',n:'লাল',c:'#d6452d',p:400},{id:'b',n:'নীল',c:'#2c7be5',p:500},{id:'k',n:'গোলাপি',c:'#ff6fa8',p:600}];
const STICK=['টোটো দাদা','মা-র আশীর্বাদ','ঠুকে দিস না','কলকাতা ♥','পাঁই পাঁই'];
const STP=[0,300,350,450,500];
