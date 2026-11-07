(()=>{window.__dp=1;
/* ===== CONFIG: fill these in; empty ones are hidden ===== */
const CONFIG={portrait:"",email:"info@khareldipesh.com.np",site:"https://dipeshkharel14.com.np",github:"",linkedin:""};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const anyFine=matchMedia('(any-pointer:fine)').matches;
const staticMode=false; /* pointers run on every device, including phones */
let started=false,manual=false,ua=0,snd=false,ac,lastNav=0;
const now=()=>performance.now(),paused=()=>now()-ua<6000;
/* ---- portrait: tries likely filenames, then discovers it in your GitHub repo ---- */
(()=>{const img=$('#pimg');if(!img)return;const names=[CONFIG.portrait,'Dipesh_ Cyberpunk Developer Profile.png','Dipesh_.Cyberpunk.Developer.Profile.png','Dipesh_Cyberpunk Developer Profile.png','Dipesh_Cyberpunk.Developer.Profile.png','Dipesh_Cyberpunk_Developer_Profile.png','Dipesh_ Cyberpunk Developer Profile.jpg','Dipesh_ Cyberpunk Developer Profile.jpeg','Dipesh_ Cyberpunk Developer Profile.webp','portrait.png','portrait.jpg','portrait.jpeg','portrait.webp','dipesh.png','dipesh.jpg','dipesh.webp','profile.png','profile.jpg','photo.png','photo.jpg','assets/portrait.png','assets/portrait.jpg','assets/portrait.webp'].filter(Boolean);let i=0,found=false;
const miss=()=>$('.portrait').classList.add('miss');
const next=()=>{if(i<names.length)img.src=encodeURI(names[i++]);else find()};
function find(){if(found)return;found=true;const m=location.hostname.match(/^(.+)\.github\.io$/);if(!m)return miss();const repo=location.pathname.split('/')[1]||m[1]+'.github.io';
fetch(`https://api.github.com/repos/${m[1]}/${repo}/contents/`).then(r=>r.json()).then(l=>{const f=Array.isArray(l)&&l.find(x=>/\.(png|jpe?g|webp)$/i.test(x.name)&&/dipesh|cyberpunk|portrait|profile|photo/i.test(x.name));if(f){img.onerror=miss;img.src=encodeURIComponent(f.name)}else miss()}).catch(miss)}
img.onload=()=>img.classList.add('ok');img.onerror=next;if(img.complete&&!img.naturalWidth)next();else if(img.complete)img.classList.add('ok')})();
/* ---- sound ---- */
function beep(f=520,d=.06){if(!snd)return;try{ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.value=.03;g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
$('#snd').onclick=e=>{snd=!snd;e.target.setAttribute('aria-pressed',snd);e.target.textContent='SOUND: '+(snd?'ON':'OFF');beep(700)};
/* ---- split text into lockable words ---- */
$$('[data-split]').forEach(el=>{const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),ns=[];while(tw.nextNode())ns.push(tw.currentNode);
ns.forEach(n=>{const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p))return f.append(' ');const s=document.createElement('span');s.className='w lk';s.textContent=p;f.append(s)});n.replaceWith(f)})});
let NH=70;const setNH=()=>{const n=$('.nav');NH=n?n.offsetHeight+4:70};setNH();addEventListener('resize',setNH);addEventListener('load',setNH);
const hl=(e,ms=700)=>{e.classList.add('hl');setTimeout(()=>e.classList.remove('hl'),ms)};
const unlock=e=>{if(e.classList.contains('locked')){e.classList.remove('locked');hl(e)}};
const inView=e=>{const r=e.getBoundingClientRect();return r.bottom>NH&&r.top<innerHeight-20&&r.right>0&&r.left<innerWidth};
if(!staticMode)$$('.lk').forEach(e=>e.classList.add('locked'));
/* ---- socials, contact ---- */
const soc=$('#socials');[['EMAIL','mailto:'+CONFIG.email,CONFIG.email],['PORTFOLIO',CONFIG.site,CONFIG.site],['GITHUB',CONFIG.github,CONFIG.github],['LINKEDIN',CONFIG.linkedin,CONFIG.linkedin]].forEach(([n,h,v])=>{if(v){const a=document.createElement('a');a.className='btn mag';a.href=h;a.target='_blank';a.rel='noopener';a.textContent=n+' ↗';soc.append(a)}});
$('#yr').textContent=new Date().getFullYear();
$('#form').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target),txt=`Name: ${d.get('n')}\nEmail: ${d.get('e')}\n\n${d.get('m')}`,fs=$('#fs');beep(640);
if(CONFIG.email){location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent('Portfolio message from '+d.get('n'))}&body=${encodeURIComponent(txt)}`;fs.textContent='Opening your mail app…'}
else{(navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>fs.textContent='Message copied to clipboard.',()=>fs.textContent='Email channel not configured yet.')}};
/* ---- cards, magnetic buttons, ring cursor, nav ---- */
$$('.card').forEach(c=>c.addEventListener('click',e=>{if(!e.target.closest('a')){c.classList.toggle('open');beep(380)}}));
if(anyFine&&!reduce){$$('.mag').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.25}px ${(e.clientY-r.top-r.height/2)*.35}px`});b.addEventListener('mouseleave',()=>b.style.translate='')});
 const ring=document.createElement('div');ring.className='ring';document.body.append(ring);addEventListener('mousemove',e=>{ring.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;ring.classList.toggle('big',!!e.target.closest('a,button,.card'))},{passive:true});
 const por=$('.portrait');addEventListener('scroll',()=>{por.style.translate=`0 ${Math.min(scrollY,700)*.08}px`},{passive:true})}
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>beep(480,.04)));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});$$('.sec').forEach(s=>io.observe(s));
['wheel','touchstart','touchmove','keydown','pointerdown','mousemove'].forEach(t=>addEventListener(t,()=>{ua=now()},{passive:true}));
/* ---- HUD ---- */
const ht=$('#ht');function hud(){const t=$$('.lk').length,o=$$('.lk.locked').length;ht.textContent=`AUTOPILOT ${manual||!o?'IDLE':paused()?'PAUSED':'ON'} · NODES ${t-o}/${t} · ${agents.length} AGENTS`}
$('#ctl').onclick=e=>{manual=!manual;e.target.textContent=manual?'RESUME AUTOPILOT':'TAKE CONTROL';if(manual)$$('.locked').forEach(unlock);beep(600)};
/* ---- groups: the "selection rectangles" ---- */
const claimed=new Set();let cache=[],cacheG=[],ct=0;
const groupOf=e=>e.classList.contains('w')?(e.closest('[data-split]')||e):(e.closest('.btns,.stats,.tiles,.grid2')||e);
function locked(){const n=now();if(n-ct>150){cache=$$('.locked').filter(inView);cacheG=[...new Set(cache.map(groupOf))].filter(inView);ct=n}return cache}
const rectOf=g=>{const r=g.getBoundingClientRect();return{l:Math.max(r.left-8,4),t:Math.max(r.top-6,NH),r:Math.min(r.right+8,innerWidth-4),b:Math.min(r.bottom+6,innerHeight-4)}};
/* ---- agents ---- */
const DEF=[['Agent_01','#ff263f'],['Explorer','#38bdf8'],['System_02','#a3e635'],['Visitor_03','#fbbf24'],['Navigator','#c084fc'],['AI_CORE','#f1f5f9'],['Operator','#fb923c'],['Scout_07','#2dd4bf'],['Cipher','#f472b6'],['Nova','#818cf8']];
let agents=[];const N=reduce?4:innerWidth<900?5:10;
if(!staticMode)agents=DEF.slice(0,N).map(([n,c],i)=>{
 const el=document.createElement('div');el.className='ptr';el.style.setProperty('--c',c);el.innerHTML=`<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 2l17 8-7 2-3 7z" fill="currentColor" stroke="#000" stroke-width="1.2"/></svg><b>${n}</b>`;
 const mq=document.createElement('div');mq.className='mq';mq.style.setProperty('--c',c);
 const tr=[...Array(innerWidth<900?3:4)].map((_,k)=>{const d=document.createElement('i');d.className='tr';d.style.setProperty('--c',c);d.style.opacity=.5-k*.11;document.body.append(d);return d});
 document.body.append(mq,el);
 const side=i%4;return{el,mq,tr,x:side===0?-40:side===1?innerWidth+40:innerWidth*Math.random(),y:side<2?innerHeight*Math.random():(side===2?-40:innerHeight+40),h:[],s:'idle',wait:i*.1,p:Math.random()*6,g:null,t:null,c:null,kids:[],u:0,dur:.6,ox:0,oy:0,pt:null}});
function steer(a,tx,ty,k,dt,n){const dx=tx-a.x,dy=ty-a.y,d=Math.hypot(dx,dy)||1,f=1-Math.exp(-dt*k),w=Math.sin(n/260+a.p)*Math.min(d,90)*dt*2.2;a.x+=dx*f-dy/d*w;a.y+=dy*f+dx/d*w;return d}
function release(a,wait){if(a.c)claimed.delete(a.c);a.c=a.g=a.t=null;a.kids=[];a.mq.classList.remove('on');a.el.classList.remove('click');a.s='idle';a.wait=wait==null?.4:wait}
function pick(a){locked();const G=cacheG.filter(g=>!claimed.has(g));
 if(G.length&&!manual){const g=G[Math.random()*Math.min(4,G.length)|0];a.g=a.c=g;claimed.add(g);a.kids=$$('.locked',g);if(g.classList.contains('locked'))a.kids.push(g);a.s='move';return}
 const W=$$('.links a,.btn,.card,.tile,.portrait,.pvbox').filter(e=>inView(e)&&!e.classList.contains('locked')&&!claimed.has(e));
 if(W.length&&Math.random()<.85){const t=W[Math.random()*W.length|0];a.t=a.c=t;claimed.add(t);a.ox=(Math.random()-.5)*Math.min(t.offsetWidth*.5,40);a.oy=(Math.random()-.5)*Math.min(t.offsetHeight*.4,16);a.s='move'}
 else{a.pt={x:innerWidth*(.1+Math.random()*.8),y:innerHeight*(.2+Math.random()*.6)};a.s='roam'}}
function actW(a){const t=a.t;a.el.classList.add('click');const el=a.el;setTimeout(()=>el.classList.remove('click'),260);hl(t,1300);
 if(t.matches('.card,.pvbox')){const c=t.closest('.card');c.classList.add('open');beep(380);setTimeout(()=>c.classList.remove('open'),3200)}
 else if(t.matches('.links a')&&!paused()&&now()-lastNav>14000){lastNav=now();beep(480);t.click()}
 release(a,.5+Math.random()*1.8)}
let last=now();
function tick(n){requestAnimationFrame(tick);const dt=Math.min(.05,(n-last)/1000);last=n;if(!started||document.hidden)return;const P=paused();
 for(const a of agents){a.el.classList.toggle('dim',P);
  if(a.s==='idle'){a.wait-=dt;steer(a,a.x+Math.sin(n/900+a.p)*30,a.y+Math.cos(n/1100+a.p)*20,1,dt,n);if(a.wait<=0)pick(a)}
  else if(a.s==='move'){let tx,ty;
   if(a.g){if(!inView(a.g)){release(a);continue}const R=rectOf(a.g);tx=R.l;ty=R.t}
   else{if(!inView(a.t)){release(a);continue}const r=a.t.getBoundingClientRect();tx=r.left+r.width/2+a.ox;ty=r.top+r.height/2+a.oy}
   const d=steer(a,tx,ty,P?3:10,dt,n);
   if(d<10){if(a.g){a.s='drag';a.u=0;a.dur=Math.min(1.1,Math.max(.35,.28+a.kids.length*.014));a.el.classList.add('click');a.mq.classList.add('on')}else actW(a);if(!a.g)continue}}
  else if(a.s==='drag'){
   if(!inView(a.g)){release(a);continue}
   a.u+=dt/a.dur;const u=Math.min(a.u,1),e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2,R=rectOf(a.g);
   a.x=R.l+(R.r-R.l)*e;a.y=R.t+(R.b-R.t)*e;
   const x1=R.l,y1=R.t,x2=Math.max(a.x,x1),y2=Math.max(a.y,y1);
   a.mq.style.transform=`translate(${x1}px,${y1}px)`;a.mq.style.width=(x2-x1)+'px';a.mq.style.height=(y2-y1)+'px';
   for(let i=a.kids.length-1;i>=0;i--){const k=a.kids[i];if(!k.classList.contains('locked')){a.kids.splice(i,1);continue}const r=k.getBoundingClientRect();if(r.left<x2&&r.right>x1&&r.top<y2&&r.bottom>y1){unlock(k);a.kids.splice(i,1)}}
   if(a.u>=1)release(a,P?2.5:.03+Math.random()*.15)}
  else if(a.s==='roam'){if(steer(a,a.pt.x,a.pt.y,1.6,dt,n)<30){a.s='idle';a.wait=.3+Math.random()}}
  a.el.style.transform=`translate(${a.x}px,${a.y}px)`;a.h.unshift([a.x,a.y]);if(a.h.length>14)a.h.pop();
  a.tr.forEach((d,k)=>{const q=a.h[(k+1)*3]||a.h[a.h.length-1];d.style.transform=`translate(${q[0]}px,${q[1]}px)`})}}
if(!staticMode)requestAnimationFrame(tick);
/* ---- fallback unlock (real visitors are never blocked) + autopilot scroll ---- */
setInterval(()=>{if(!started)return;const n=now();$$('.locked').forEach(e=>{if(!inView(e)){e._s=0;return}e._s=e._s||n;if(n-e._s>(paused()||staticMode?2500:9000))unlock(e)});if(!staticMode)hud()},800);
let stall=0;setInterval(()=>{if(!started||staticMode||paused()||manual)return;const lk=$$('.locked');if(!lk.length)return;const v=lk.filter(inView);if(v.length&&stall<4){stall+=.4;return}stall=0;const t=lk.find(e=>!inView(e));if(t)scrollTo({top:t.getBoundingClientRect().top+scrollY-innerHeight*.2,behavior:'smooth'})},400);
/* ---- loader (does not wait for the photo or fonts) ---- */
let p=0;const pc=$('#pct'),bar=$('#loader i');
const iv=setInterval(()=>{p=Math.min(100,p+(reduce?100:9+Math.random()*9));pc.textContent=String(Math.floor(p)).padStart(3,'0');bar.style.width=p+'%';if(p>=100){clearInterval(iv);setTimeout(boot,80)}},40);
function boot(){$('#loader').classList.add('done');beep(740,.12);setTimeout(()=>{started=true;$$('[data-count]').forEach(e=>{const v=+e.dataset.count;e.textContent=String(v).padStart(2,'0')+'+'});hud()},350)}
/* ---- extras: progress, clock, toast, copy email, tilt, command palette ---- */
const bar2=$('#bar'),toast=$('#toast');
addEventListener('scroll',()=>{bar2.style.transform=`scaleX(${scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)})`},{passive:true});
const clk=$('#clk');setInterval(()=>{clk.textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'})},1000);
function flash(t){toast.textContent=t;toast.classList.add('on');clearTimeout(flash.t);flash.t=setTimeout(()=>toast.classList.remove('on'),2000)}
$('#cp').onclick=()=>{beep(660);(navigator.clipboard?navigator.clipboard.writeText(CONFIG.email):Promise.reject()).then(()=>flash('EMAIL COPIED'),()=>flash(CONFIG.email))};
if(anyFine&&!reduce)$$('.portrait,.pvbox').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`});el.addEventListener('mouseleave',()=>el.style.transform='')});
const pal=$('#pal'),pq=$('#pq'),pl=$('#pl');
const cmds=[...['HOME','ABOUT','PROJECTS','SKILLS','JOURNAL','CONTACT'].map(n=>['Go to '+n,()=>{location.hash='#'+n.toLowerCase()}]),['Copy email',()=>$('#cp').click()],['Open portfolio website',()=>window.open(CONFIG.site,'_blank','noopener')],['Toggle sound',()=>$('#snd').click()],['Take control / resume autopilot',()=>$('#ctl').click()]];
function renderP(){const q=pq.value.toLowerCase();pl.innerHTML='';cmds.filter(c=>c[0].toLowerCase().includes(q)).forEach(c=>{const li=document.createElement('li');li.tabIndex=0;li.textContent=c[0];li.onclick=()=>{closeP();c[1]()};li.onkeydown=e=>{if(e.key==='Enter')li.onclick()};pl.append(li)})}
function openP(){pal.hidden=false;pq.value='';renderP();pq.focus()}function closeP(){pal.hidden=true}
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();pal.hidden?openP():closeP()}else if(e.key==='Escape')closeP()});
pq.oninput=renderP;pq.onkeydown=e=>{if(e.key==='Enter'&&pl.firstChild)pl.firstChild.click()};pal.onclick=e=>{if(e.target===pal)closeP()};$('#kb').onclick=openP;
})();
