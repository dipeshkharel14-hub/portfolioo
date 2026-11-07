(()=>{
/* ===== CONFIG: fill these in, empty ones are hidden ===== */
const CONFIG={email:"",github:"",linkedin:""};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const staticMode=reduce||!fine||innerWidth<900;
let started=false,manual=false,ua=0,snd=false,ac,lastNav=0;
const now=()=>performance.now(),paused=()=>now()-ua<6000;
/* sound */
function beep(f=520,d=.06){if(!snd)return;try{ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.value=.03;g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
$('#snd').onclick=e=>{snd=!snd;e.target.setAttribute('aria-pressed',snd);e.target.textContent='SOUND: '+(snd?'ON':'OFF');beep(700)};
/* split text into lockable words */
$$('[data-split]').forEach(el=>{const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),ns=[];while(tw.nextNode())ns.push(tw.currentNode);
ns.forEach(n=>{const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p))return f.append(' ');const s=document.createElement('span');s.className='w lk';s.textContent=p;f.append(s)});n.replaceWith(f)})});
const hl=(e,ms=900)=>{e.classList.add('hl');setTimeout(()=>e.classList.remove('hl'),ms)};
const unlock=e=>{if(e.classList.contains('locked')){e.classList.remove('locked');hl(e)}};
const inView=e=>{const r=e.getBoundingClientRect();return r.bottom>70&&r.top<innerHeight-20&&r.right>0&&r.left<innerWidth};
if(!staticMode)$$('.lk').forEach(e=>e.classList.add('locked'));
/* socials + contact */
const soc=$('#socials');[['EMAIL','mailto:'+CONFIG.email,CONFIG.email],['GITHUB',CONFIG.github,CONFIG.github],['LINKEDIN',CONFIG.linkedin,CONFIG.linkedin]].forEach(([n,h,v])=>{if(v){const a=document.createElement('a');a.className='btn mag';a.href=h;a.target='_blank';a.rel='noopener';a.textContent=n+' ↗';soc.append(a)}});
$('#yr').textContent=new Date().getFullYear();
$('#form').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target),txt=`Name: ${d.get('n')}\nEmail: ${d.get('e')}\n\n${d.get('m')}`,fs=$('#fs');beep(640);
if(CONFIG.email){location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent('Portfolio message from '+d.get('n'))}&body=${encodeURIComponent(txt)}`;fs.textContent='Opening your mail app…'}
else{(navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>fs.textContent='Message copied to clipboard.',()=>fs.textContent='Email channel not configured yet.')}};
/* cards, magnetic, nav active */
$$('.card').forEach(c=>c.addEventListener('click',e=>{if(!e.target.closest('a')){c.classList.toggle('open');beep(380)}}));
if(fine&&!reduce){$$('.mag').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.25}px ${(e.clientY-r.top-r.height/2)*.35}px`});b.addEventListener('mouseleave',()=>b.style.translate='');});
 const ring=document.createElement('div');ring.className='ring';document.body.append(ring);addEventListener('mousemove',e=>{ring.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;ring.classList.toggle('big',!!e.target.closest('a,button,.card'))});
 const por=$('.portrait');addEventListener('scroll',()=>{por.style.translate=`0 ${Math.min(scrollY,700)*.08}px`},{passive:true})}
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>beep(480,.04)));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{threshold:.35});$$('.sec').forEach(s=>io.observe(s));
/* user-activity detection */
['wheel','touchstart','keydown','pointerdown','mousemove'].forEach(t=>addEventListener(t,()=>{ua=now()},{passive:true}));
/* HUD */
const ht=$('#ht');function hud(){const t=$$('.lk').length,o=$$('.lk.locked').length;ht.textContent=`AUTOPILOT ${manual||!o?'IDLE':paused()?'PAUSED':'ON'} · NODES ${t-o}/${t}`}
$('#ctl').onclick=e=>{manual=!manual;e.target.textContent=manual?'RESUME AUTOPILOT':'TAKE CONTROL';if(manual)$$('.locked').forEach(unlock);beep(600)};
/* fallback unlock so real visitors are never blocked */
setInterval(()=>{if(!started)return;const n=now();$$('.locked').forEach(e=>{if(!inView(e)){e._s=0;return}e._s=e._s||n;if(n-e._s>(paused()?2500:16000))unlock(e)});if(!staticMode)hud()},800);
/* autopilot scroll */
let stall=0;setInterval(()=>{if(!started||staticMode||paused()||manual)return;const lk=$$('.locked');if(!lk.length)return;const v=lk.filter(inView);if(v.length&&stall<5){stall+=.7;return}stall=0;const t=lk.find(e=>!inView(e));if(t)scrollTo({top:t.getBoundingClientRect().top+scrollY-innerHeight*.3,behavior:'smooth'})},700);
/* autonomous pointers */
const claimed=new Set();let cache=[],ct=0;
const locked=()=>{const n=now();if(n-ct>200){cache=$$('.locked').filter(inView);ct=n}return cache};
const ctr=e=>{const r=e.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
let agents=[];
if(!staticMode){
agents=[['Agent_01','#ff263f'],['Explorer','#38bdf8'],['System_02','#a3e635'],['Visitor_03','#fbbf24'],['Navigator','#c084fc'],['AI_CORE','#f1f5f9']].map(([n,c],i)=>{
 const el=document.createElement('div');el.className='ptr';el.style.setProperty('--c',c);el.innerHTML=`<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 2l17 8-7 2-3 7z" fill="currentColor" stroke="#000" stroke-width="1.2"/></svg><b>${n}</b>`;
 const tr=[...Array(6)].map((_,k)=>{const d=document.createElement('i');d.className='tr';d.style.setProperty('--c',c);d.style.opacity=.5-k*.08;document.body.append(d);return d});document.body.append(el);
 return{el,tr,x:i%2?-40:innerWidth+40,y:innerHeight*(.15+.15*i),h:[],t:null,pt:null,wait:i*.35,p:Math.random()*6,m:'unlock',ox:0,oy:0}})}
function pick(a){let t=null,m='unlock';const L=locked().filter(e=>!claimed.has(e));
 if(L.length&&!manual){const s=[...Array(5)].map(()=>L[Math.random()*L.length|0]);t=s.reduce((b,e)=>{const[x,y]=ctr(e),[bx,by]=ctr(b);return Math.hypot(x-a.x,y-a.y)<Math.hypot(bx-a.x,by-a.y)?e:b})}
 else{const W=$$('.links a,.btn,.card,.tile,.portrait,.pvbox').filter(e=>inView(e)&&!e.classList.contains('locked')&&!claimed.has(e));if(W.length&&Math.random()<.8){t=W[Math.random()*W.length|0];m='wander'}}
 if(t){a.t=t;a.m=m;claimed.add(t);a.ox=(Math.random()-.5)*Math.min(t.offsetWidth*.5,40);a.oy=(Math.random()-.5)*Math.min(t.offsetHeight*.4,16)}
 else{a.pt={x:innerWidth*(.1+Math.random()*.8),y:innerHeight*(.15+Math.random()*.7)}}}
function act(a){const t=a.t;a.el.classList.add('click');setTimeout(()=>a.el.classList.remove('click'),260);
 if(a.m==='unlock')unlock(t);else{hl(t,1300);
  if(t.matches('.card')||t.matches('.pvbox')){const c=t.closest('.card');c.classList.add('open');beep(380);setTimeout(()=>c.classList.remove('open'),3200)}
  else if(t.matches('.links a')&&!paused()&&now()-lastNav>14000){lastNav=now();beep(480);t.click()}}
 claimed.delete(t);a.t=null;a.wait=(paused()?2.5:.04)+Math.random()*(a.m==='unlock'?.3:1.8)}
let last=now();
function tick(n){requestAnimationFrame(tick);const dt=Math.min(.05,(n-last)/1000);last=n;if(!started||document.hidden)return;
 agents.forEach(a=>{a.el.classList.toggle('dim',paused());
  if(!a.t&&a.wait>0)a.wait-=dt;else if(!a.t&&!a.pt)pick(a);
  let tx,ty;
  if(a.t){const r=a.t.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight){claimed.delete(a.t);a.t=null;return}tx=r.left+r.width/2+a.ox;ty=r.top+r.height/2+a.oy}
  else if(a.pt){tx=a.pt.x;ty=a.pt.y}else{tx=a.x;ty=a.y}
  const dx=tx-a.x,dy=ty-a.y,d=Math.hypot(dx,dy)||1,k=a.t?(paused()?3:7):1.6,f=1-Math.exp(-dt*k);
  a.x+=dx*f+(-dy/d)*Math.sin(n/260+a.p)*Math.min(d,90)*dt*2.2;a.y+=dy*f+(dx/d)*Math.sin(n/260+a.p)*Math.min(d,90)*dt*2.2;
  if(d<(a.t?9:30)){if(a.t)act(a);else{a.pt=null;a.wait=.6+Math.random()*1.5}}
  a.el.style.transform=`translate(${a.x}px,${a.y}px)`;a.h.unshift([a.x,a.y]);if(a.h.length>24)a.h.pop();
  a.tr.forEach((d,k)=>{const q=a.h[(k+1)*3]||a.h[a.h.length-1];d.style.transform=`translate(${q[0]}px,${q[1]}px)`})})}
if(!staticMode)requestAnimationFrame(tick);
/* loader */
let p=0;const pc=$('#pct'),bar=$('#loader i');
const iv=setInterval(()=>{p=Math.min(100,p+(reduce?100:3+Math.random()*6));pc.textContent=String(Math.floor(p)).padStart(3,'0');bar.style.width=p+'%';if(p>=100){clearInterval(iv);setTimeout(boot,250)}},50);
function boot(){$('#loader').classList.add('done');beep(740,.12);setTimeout(()=>{started=true;$$('[data-count]').forEach(e=>{const v=+e.dataset.count;e.textContent=String(v).padStart(2,'0')+'+'});hud()},700)}
})();
