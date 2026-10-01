/* Unisell storefront: catalog, cart, wishlist, checkout simulation + GA4 events */
const $=s=>document.querySelector(s),inr=n=>'₹'+n.toLocaleString('en-IN'),page=document.body.dataset.page;
const G={phone:'<rect x="34" y="14" width="32" height="72" rx="7"/><path d="M45 21h10"/>',laptop:'<rect x="22" y="26" width="56" height="38" rx="4"/><path d="M12 72h76l-6 6H18z"/>',tablet:'<rect x="24" y="16" width="52" height="68" rx="6"/><circle cx="50" cy="77" r="2"/>',watch:'<rect x="34" y="32" width="32" height="36" rx="9"/><path d="M39 32l3-16h16l3 16M39 68l3 16h16l3-16"/>',speaker:'<rect x="34" y="16" width="32" height="68" rx="16"/><circle cx="50" cy="42" r="6"/><circle cx="50" cy="66" r="9"/>',shoe:'<path d="M12 62c10 0 14-8 18-20l12 8c6 4 14 6 24 8 10 2 14 6 14 14H12z"/><path d="M12 70h76"/>',jacket:'<path d="M36 18L14 32l8 20 8-4v36h40V48l8 4 8-20-22-14c-3 8-9 12-14 12s-11-4-14-12z"/><path d="M50 30v52"/>',tee:'<path d="M36 20L14 32l8 18 10-4v34h36V46l10 4 8-18-22-12c-3 6-8 9-14 9s-11-3-14-9z"/>',cap:'<path d="M22 62c0-24 12-38 30-38s26 14 26 38z"/><path d="M14 62h74c0 6-10 8-24 8H38c-14 0-24-2-24-8z"/>',bag:'<path d="M26 36h48l4 48H22z"/><path d="M38 36c0-14 24-14 24 0"/>',headphones:'<path d="M20 58V50a30 30 0 0160 0v8"/><rect x="14" y="54" width="14" height="26" rx="6"/><rect x="72" y="54" width="14" height="26" rx="6"/>',camera:'<rect x="12" y="30" width="76" height="48" rx="8"/><circle cx="50" cy="54" r="15"/><path d="M34 30l5-9h22l5 9"/>',glasses:'<circle cx="32" cy="54" r="16"/><circle cx="68" cy="54" r="16"/><path d="M48 52h4M16 50l-4-12M84 50l4-12"/>',bank:'<rect x="30" y="16" width="40" height="68" rx="8"/><path d="M42 30h16M42 40h16"/>'};
const P=[
['Smartphone','electronics',25000,4.8,2140,215,'phone','6.7-inch OLED display, all-day battery and a 50 MP camera.'],
['Laptop','electronics',65000,4.6,980,230,'laptop','Thin, quiet and fast. 16 GB memory and a 14-hour battery.'],
['Tablet','electronics',32000,4.7,760,200,'tablet','11-inch display with stylus support for notes and sketching.'],
['Smartwatch','electronics',8999,4.5,1320,190,'watch','Heart-rate, sleep and workout tracking with a 7-day battery.'],
['Smart Speaker','electronics',3499,4.4,640,250,'speaker','Room-filling sound with a built-in voice assistant.'],
['Sneakers','fashion',3999,4.9,3105,15,'shoe','Lightweight knit upper with a cushioned, all-day sole.'],
['Jacket','fashion',2999,4.3,870,35,'jacket','Water-resistant shell with a soft fleece lining.'],
['Oversized Tee','fashion',899,4.5,2210,340,'tee','Heavyweight 100% cotton in a relaxed, boxy fit.'],
['Cap','fashion',599,4.2,540,45,'cap','Adjustable six-panel cap in washed cotton twill.'],
['Tote Bag','fashion',1299,4.4,420,160,'bag','Roomy canvas tote with an inner zip pocket.'],
['Headphones','accessories',1999,4.7,4120,280,'headphones','Wireless over-ear sound with 30 hours of playback.'],
['Camera','accessories',18000,4.6,690,0,'camera','24 MP mirrorless camera with a fast kit lens.'],
['Sunglasses','accessories',1499,4.3,1180,50,'glasses','Polarised UV400 lenses in a lightweight frame.'],
['Backpack','accessories',2499,4.6,1530,210,'bag','Padded 15-inch laptop sleeve and a water-resistant body.'],
['Power Bank','accessories',1799,4.5,2380,170,'bank','10,000 mAh fast-charge pack that fits any pocket.']
].map(([name,cat,price,rate,n,h,g,desc],id)=>({id,name,cat,price,rate,n,h,g,desc}));
const art=(g,h)=>`<div class="art" style="--h:${h}"><svg viewBox="0 0 100 100" aria-hidden="true">${G[g]}</svg></div>`;
const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
let cart=get('cart',[]).reduce((a,i)=>{const f=a.find(x=>x.name===i.name);f?f.qty+=i.qty||1:a.push({name:i.name,price:i.price,qty:i.qty||1});return a},[]);
let W=new Set(get('wish',[]));
const sub=()=>cart.reduce((s,i)=>s+i.price*i.qty,0),items=()=>cart.map(i=>({item_name:i.name,price:i.price,quantity:i.qty}));
function save(){localStorage.setItem('cart',JSON.stringify(cart));const c=$('#count');if(c)c.textContent=cart.reduce((s,i)=>s+i.qty,0)}

/* shell: nav + footer */
const L=[['home','Home','index.html'],['shop','Shop','products.html'],['about','About','about.html'],['contact','Contact','contact.html']];
document.body.insertAdjacentHTML('afterbegin',`<nav><a class="logo" href="index.html">Unisell</a><input class="search" type="search" placeholder="Search" aria-label="Search products" oninput="qs(this.value)" onkeydown="if(event.key=='Enter')location.href='products.html?q='+encodeURIComponent(this.value)">${L.map(l=>`<a class="l-${l[0]}${page==l[0]?' on':''}" href="${l[2]}">${l[1]}</a>`).join('')}<a class="${page=='cart'?'on':''}" href="cart.html">Cart<span id="count" class="cart-count">0</span></a><button class="icon" onclick="toggleDark()" aria-label="Toggle dark mode"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button></nav>`);
document.body.insertAdjacentHTML('beforeend',`<footer><span>© 2026 Unisell. Built by <a href="https://github.com/nikunjmody05">Nikunj Mody</a>.</span><nav>${L.map(l=>`<a href="${l[2]}">${l[1]}</a>`).join('')}</nav></footer><div class="toast" id="toast" role="status"></div>`);
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),1800)}
function toggleDark(){const d=document.documentElement.classList.toggle('dark');localStorage.setItem('theme',d?'dark':'light')}

/* cards, cart, wishlist */
const card=p=>`<article class="card"><div class="ph">${art(p.g,p.h)}<button class="heart${W.has(p.id)?' on':''}" aria-label="Save ${p.name}" onclick="wish(${p.id},this)">♥</button></div><h3>${p.name}</h3><p class="sub">${p.desc}</p><p class="meta">★ ${p.rate} <span>(${p.n.toLocaleString('en-IN')})</span></p><div class="row"><b>${inr(p.price)}</b><button class="btn sm" onclick="addToCart(${p.id},this)">Add to cart</button></div></article>`;
function addToCart(id,btn){const p=P[id],f=cart.find(i=>i.name==p.name);f?f.qty++:cart.push({name:p.name,price:p.price,qty:1});save();
 gtag('event','add_to_cart',{currency:'INR',value:p.price,items:[{item_name:p.name,item_category:p.cat,price:p.price,quantity:1}]});
 btn.textContent='Added ✓';setTimeout(()=>btn.textContent='Add to cart',1200);toast(p.name+' added to your cart')}
function wish(id,b){const on=!W.has(id);on?W.add(id):W.delete(id);localStorage.setItem('wish',JSON.stringify([...W]));b.classList.toggle('on',on);if(on)gtag('event','add_to_wishlist',{currency:'INR',value:P[id].price,items:[{item_name:P[id].name}]});if(S.saved)shop()}

/* shop */
const S={cat:'all',sort:'f',q:'',saved:false};
function qs(v){S.q=v.trim().toLowerCase();if(page=='shop')shop()}
function setCat(c){S.cat=c;S.saved=false;shop()}
function shop(){const g=$('#grid');if(!g)return;
 let l=P.filter(p=>(S.cat=='all'||p.cat==S.cat)&&(!S.saved||W.has(p.id))&&(p.name+' '+p.cat+' '+p.desc).toLowerCase().includes(S.q));
 if(S.sort=='lo')l.sort((a,b)=>a.price-b.price);if(S.sort=='hi')l.sort((a,b)=>b.price-a.price);if(S.sort=='top')l.sort((a,b)=>b.rate-a.rate);
 g.innerHTML=l.map(card).join('')||`<p class="empty">${S.saved?'You haven’t saved anything yet. Tap the heart on a product to save it.':'No products match your search. Try another word or clear the filters.'}</p>`;
 $('#n').textContent=l.length+' products';
 document.querySelectorAll('.chip[data-c]').forEach(c=>c.classList.toggle('on',!S.saved&&c.dataset.c==S.cat));$('#sv').classList.toggle('on',S.saved)}

/* cart + checkout */
const ship=()=>sub()>=5000||!cart.length?0:99;
function cartView(){const v=$('#view');
 if(!cart.length){v.innerHTML=`<h1>Your cart</h1><p class="empty">Your cart is empty. <a href="products.html">Browse the shop</a>.</p>`;return}
 const s=sub(),left=5000-s;
 v.innerHTML=`<h1>Your cart</h1><div class="split"><div>${cart.map((it,i)=>{const p=P.find(x=>x.name==it.name)||P[0];return `<div class="line">${art(p.g,p.h)}<div><h3>${it.name}</h3><p class="sub">${inr(it.price)}</p><button class="link" onclick="del(${i})">Remove</button></div><div class="qty"><button aria-label="Decrease quantity" onclick="qty(${i},-1)">−</button><span>${it.qty}</span><button aria-label="Increase quantity" onclick="qty(${i},1)">+</button></div><b>${inr(it.price*it.qty)}</b></div>`}).join('')}</div>
 <aside class="sum"><h3>Order summary</h3><div class="ship"><i style="width:${Math.min(100,s/50)}%"></i></div><p class="sub" style="display:block;margin:0">${left>0?`Add ${inr(left)} more for free delivery`:'You’ve unlocked free delivery'}</p><p><span>Subtotal</span><span>${inr(s)}</span></p><p><span>Delivery</span><span>${ship()?inr(ship()):'Free'}</span></p><p class="tot"><span>Total</span><span>${inr(s+ship())}</span></p><button class="btn" onclick="checkout()">Checkout</button></aside></div>`}
function qty(i,d){cart[i].qty=Math.max(1,cart[i].qty+d);save();cartView()}
function del(i){cart.splice(i,1);save();cartView()}
let method='upi';
function checkout(){const t=sub()+ship();
 $('#view').innerHTML=`<h1>Checkout</h1><div class="split"><div><h3>Payment method</h3><div class="seg" style="margin-top:12px"><button class="chip on" id="m-upi" onclick="pm('upi')">UPI</button><button class="chip" id="m-card" onclick="pm('card')">Debit / credit card</button></div>
 <div id="upiBox"><label for="upiInput">UPI ID or mobile number</label><input class="f" id="upiInput" placeholder="name@bank or 9XXXXXXXXX" autocomplete="off"></div>
 <div id="cardBox" hidden><label for="cardNumber">Card number</label><input class="f" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" inputmode="numeric" oninput="this.value=this.value.replace(/\\D/g,'').replace(/(.{4})/g,'$1 ').trim()"><div class="two"><div><label for="cardExpiry">Expiry</label><input class="f" id="cardExpiry" placeholder="MM/YY" maxlength="5" inputmode="numeric" oninput="this.value=this.value.replace(/\\D/g,'').replace(/^(\\d{2})(\\d)/,'$1/$2')"></div><div><label for="cardCVV">CVV</label><input class="f" id="cardCVV" type="password" maxlength="3" inputmode="numeric" placeholder="•••"></div></div><label for="cardName">Name on card</label><input class="f" id="cardName" autocomplete="cc-name"></div>
 <p class="err" id="payError" role="alert"></p><button class="btn" style="width:100%" id="payBtn" onclick="payNow()">Pay ${inr(t)}</button><div class="spin" id="payLoader"></div><p class="sub" style="margin-top:14px">This is a demo. No real payment is taken, so don’t enter real card details.</p></div>
 <aside class="sum"><h3>Order summary</h3>${cart.map(i=>`<p><span>${i.name} × ${i.qty}</span><span>${inr(i.price*i.qty)}</span></p>`).join('')}<p><span>Delivery</span><span>${ship()?inr(ship()):'Free'}</span></p><p class="tot"><span>Total</span><span>${inr(t)}</span></p></aside></div>`;
 method='upi';gtag('event','begin_checkout',{currency:'INR',value:sub(),items:items()})}
function pm(m){method=m;$('#upiBox').hidden=m!='upi';$('#cardBox').hidden=m!='card';$('#m-upi').classList.toggle('on',m=='upi');$('#m-card').classList.toggle('on',m=='card');$('#payError').textContent=''}
function payNow(){const e=$('#payError');e.textContent='';
 if(method=='upi'){const u=$('#upiInput').value.trim();if(!/^[\w.-]+@[\w.-]+$/.test(u)&&!/^[6-9]\d{9}$/.test(u))return e.textContent='Enter a valid UPI ID (name@bank) or a 10-digit mobile number.'}
 else{if($('#cardNumber').value.replace(/\s/g,'').length!=16)return e.textContent='Enter a 16-digit card number.';
  if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test($('#cardExpiry').value))return e.textContent='Enter the expiry as MM/YY.';
  if($('#cardCVV').value.length!=3)return e.textContent='Enter the 3-digit CVV.';
  if($('#cardName').value.trim().length<3)return e.textContent='Enter the name on the card.'}
 $('#payLoader').style.display='block';$('#payBtn').disabled=true;
 gtag('event','add_payment_info',{currency:'INR',value:sub(),payment_type:method,items:items()});
 setTimeout(()=>{const id='TXN_'+Date.now(),t=sub()+ship();
  gtag('event','purchase',{transaction_id:id,currency:'INR',value:t,shipping:ship(),items:items()});
  cart=[];save();
  $('#view').innerHTML=`<div class="done"><span class="tick">✓</span><h1>Order confirmed</h1><p class="mute">Order ${id} for ${inr(t)} is on its way. A receipt would be sent to your email.</p><a class="btn" href="products.html">Continue shopping</a></div>`},2500)}

/* contact */
function sendMsg(f){const ok=[...f.elements].filter(x=>x.required).every(x=>x.value.trim());
 if(!ok||!/\S+@\S+\.\S+/.test(f.email.value))return $('#msg').textContent='Fill in your name, a valid email and a message.';
 gtag('event','generate_lead',{method:'contact_form'});f.outerHTML='<p class="prose" style="color:var(--blue);font-size:19px">Thanks. We’ve received your message and will reply within one working day.</p>'}

/* init */
document.querySelectorAll('[data-art]').forEach(e=>{e.classList.add('art');e.style.setProperty('--h',e.dataset.h);e.innerHTML=`<svg viewBox="0 0 100 100" aria-hidden="true">${G[e.dataset.art]}</svg>`});
const feat=$('#featured');if(feat)feat.innerHTML=[...P].sort((a,b)=>b.n-a.n).slice(0,4).map(card).join('');
if(page=='shop'){const u=new URLSearchParams(location.search),h=location.hash.slice(1);S.q=(u.get('q')||'').toLowerCase();if(['electronics','fashion','accessories'].includes(h))S.cat=h;document.querySelector('.search').value=u.get('q')||'';shop()}
if(page=='cart')cartView();
save();
