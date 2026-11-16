'use strict';
/* ===== v25: sound pack import / export as a .zip (no library needed) ===== */
const ZIP={
 crcT:(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})(),
 crc(u){let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=ZIP.crcT[(c^u[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0;},
 // build a "stored" zip (audio is already compressed)
 make(files){const enc=new TextEncoder(),parts=[],cd=[];let off=0;
  for(const f of files){const name=enc.encode(f.name),d=f.data,crc=ZIP.crc(d),h=new DataView(new ArrayBuffer(30));
   h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(8,0,true);h.setUint32(14,crc,true);h.setUint32(18,d.length,true);h.setUint32(22,d.length,true);h.setUint16(26,name.length,true);
   parts.push(h.buffer,name,d);const c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint32(16,crc,true);c.setUint32(20,d.length,true);c.setUint32(24,d.length,true);c.setUint16(28,name.length,true);c.setUint32(42,off,true);
   cd.push(c.buffer,name);off+=30+name.length+d.length;}
  const cdLen=cd.reduce((a,b)=>a+(b.byteLength||b.length),0),e=new DataView(new ArrayBuffer(22));e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cdLen,true);e.setUint32(16,off,true);
  return new Blob([...parts,...cd,e.buffer],{type:'application/zip'});},
 // read entries (stored or deflated) -> [{name, blob()}]
 async read(file){const buf=new Uint8Array(await file.arrayBuffer()),dv=new DataView(buf.buffer);let e=-1;for(let i=buf.length-22;i>=Math.max(0,buf.length-65557);i--)if(dv.getUint32(i,true)===0x06054b50){e=i;break;}
  if(e<0)throw new Error('zip নয়');const n=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const out=[],dec=new TextDecoder();
  for(let k=0;k<n;k++){const meth=dv.getUint16(p+10,true),csz=dv.getUint32(p+20,true),nl=dv.getUint16(p+28,true),xl=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lo=dv.getUint32(p+42,true);const name=dec.decode(buf.subarray(p+46,p+46+nl));p+=46+nl+xl+cl;
   if(name.endsWith('/'))continue;const ln=dv.getUint16(lo+26,true),lx=dv.getUint16(lo+28,true),st=lo+30+ln+lx,raw=buf.slice(st,st+csz);
   out.push({name,async data(){if(meth===0)return raw;if(meth===8&&'DecompressionStream' in window){const s=new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'));return new Uint8Array(await new Response(s).arrayBuffer());}throw new Error('এই zip খোলা গেল না');}});}
  return out;}};
const MIME={mp3:'audio/mpeg',ogg:'audio/ogg',wav:'audio/wav',m4a:'audio/mp4',webm:'audio/webm',aac:'audio/aac'};
async function packExport(){const files=[],pack={},used=new Set();
 for(const [s] of SP_SLOTS){pack[s]=[];for(const it of SP.meta[s]){const e={text:it.text||''};if(it.audio){const b=await SP.get(it.id);if(b){let base=(it.name||s).replace(/\.[a-z0-9]+$/i,'').replace(/[^\wঀ-৿-]+/g,'-').slice(0,40)||s,ext=((it.name||'').match(/\.([a-z0-9]+)$/i)||[,(b.type.split('/')[1]||'mp3').replace('mpeg','mp3')])[1].toLowerCase();let fn=base+'.'+ext,i=2;while(used.has(fn))fn=base+'-'+(i++)+'.'+ext;used.add(fn);e.file=fn;files.push({name:'sounds/'+fn,data:new Uint8Array(await b.arrayBuffer())});}}pack[s].push(e);}}
 files.unshift({name:'pack.json',data:new TextEncoder().encode(JSON.stringify({app:'totowala',version:1,slots:pack},null,1))});
 const a=document.createElement('a');a.href=URL.createObjectURL(ZIP.make(files));a.download='totowala-soundpack.zip';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000);return files.length-1;}
async function packImport(file){const ents=await ZIP.read(file);const pj=ents.find(e=>/(^|\/)pack\.json$/i.test(e.name));const items=[],texts=[];
 if(pj){const j=JSON.parse(new TextDecoder().decode(await pj.data())),slots=j.slots||j,dir=pj.name.replace(/pack\.json$/i,'');
  for(const [s] of SP_SLOTS)for(const x of(slots[s]||[])){if(x.file){const en=ents.find(e=>e.name===dir+x.file||e.name===dir+'sounds/'+x.file||e.name.endsWith('/'+x.file));if(!en)continue;const ext=(x.file.split('.').pop()||'mp3').toLowerCase();items.push({slot:s,blob:new Blob([await en.data()],{type:MIME[ext]||'audio/mpeg'}),name:x.file,text:x.text||''});}else if(x.text)texts.push({slot:s,text:x.text});}}
 else{for(const en of ents){const m=en.name.match(/([^/]+)\.(mp3|ogg|wav|m4a|webm|aac)$/i);if(!m)continue;let slot='crash';for(const [re,s] of SP_AUTO)if(re.test(m[1])){slot=s;break;}items.push({slot,blob:new Blob([await en.data()],{type:MIME[m[2].toLowerCase()]}),name:m[0],text:''});}}
 if(items.length)await SP.addMany(items);items.forEach(it=>{if(it.text){const L=SP.meta[it.slot];for(let i=L.length-1;i>=0;i--)if(L[i].name===it.name&&!L[i].text){L[i].text=it.text;break;}}});
 for(const t of texts)await SP.add(t.slot,{text:t.text});SP.saveMeta();return items.length+texts.length;}
{const bulk=document.querySelector('.sp-bulk');if(bulk){const row=document.createElement('div');row.className='sp-zip';
 row.innerHTML='<button class="btn sm alt" id="spImp">📥 প্যাক ইমপোর্ট (.zip)</button><button class="btn sm alt" id="spExp">📤 প্যাক এক্সপোর্ট (.zip)</button><input type="file" id="spImpIn" accept=".zip,application/zip" hidden>';bulk.appendChild(row);
 const msg=t=>{const n=bulk.querySelector('.sp-note');if(n)n.textContent=t;};
 $('spImp').onclick=()=>$('spImpIn').click();
 $('spImpIn').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;msg('ইমপোর্ট হচ্ছে…');try{const n=await packImport(f);msg('✅ '+bn(n)+'টা সাউন্ড/লাইন যোগ হল');openSoundPack();}catch(err){msg('⚠ '+(err.message||'ইমপোর্ট হল না'));}};
 $('spExp').onclick=async()=>{if(!SP.count()){msg('এক্সপোর্ট করার মতো কিছু নেই — আগে সাউন্ড যোগ করো');return;}msg('zip তৈরি হচ্ছে…');try{const n=await packExport();msg('✅ '+bn(n)+'টা সাউন্ড নিয়ে zip তৈরি হল');}catch(err){msg('⚠ এক্সপোর্ট হল না');}};}}
