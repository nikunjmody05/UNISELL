/* Unisell storefront: catalog, cart, wishlist, checkout simulation + GA4 events */
const $=s=>document.querySelector(s),inr=n=>'₹'+n.toLocaleString('en-IN'),page=document.body.dataset.page;
const G={phone:'<rect x="34" y="14" width="32" height="72" rx="7"/><path d="M45 21h10"/>',laptop:'<rect x="22" y="26" width="56" height="38" rx="4"/><path d="M12 72h76l-6 6H18z"/>',tablet:'<rect x="24" y="16" width="52" height="68" rx="6"/><circle cx="50" cy="77" r="2"/>',watch:'<rect x="34" y="32" width="32" height="36" rx="9"/><path d="M39 32l3-16h16l3 16M39 68l3 16h16l3-16"/>',speaker:'<rect x="34" y="16" width="32" height="68" rx="16"/><circle cx="50" cy="42" r="6"/><circle cx="50" cy="66" r="9"/>',shoe:'<path d="M12 62c10 0 14-8 18-20l12 8c6 4 14 6 24 8 10 2 14 6 14 14H12z"/><path d="M12 70h76"/>',jacket:'<path d="M36 18L14 32l8 20 8-4v36h40V48l8 4 8-20-22-14c-3 8-9 12-14 12s-11-4-14-12z"/><path d="M50 30v52"/>',tee:'<path d="M36 20L14 32l8 18 10-4v34h36V46l10 4 8-18-22-12c-3 6-8 9-14 9s-11-3-14-9z"/>',cap:'<path d="M22 62c0-24 12-38 30-38s26 14 26 38z"/><path d="M14 62h74c0 6-10 8-24 8H38c-14 0-24-2-24-8z"/>',bag:'<path d="M26 36h48l4 48H22z"/><path d="M38 36c0-14 24-14 24 0"/>',headphones:'<path d="M20 58V50a30 30 0 0160 0v8"/><rect x="14" y="54" width="14" height="26" rx="6"/><rect x="72" y="54" width="14" height="26" rx="6"/>',camera:'<rect x="12" y="30" width="76" height="48" rx="8"/><circle cx="50" cy="54" r="15"/><path d="M34 30l5-9h22l5 9"/>',glasses:'<circle cx="32" cy="54" r="16"/><circle cx="68" cy="54" r="16"/><path d="M48 52h4M16 50l-4-12M84 50l4-12"/>',bank:'<rect x="30" y="16" width="40" height="68" rx="8"/><path d="M42 30h16M42 40h16"/>',book:'<path d="M22 20h50a6 6 0 016 6v54H28a6 6 0 01-6-6z"/><path d="M22 74a6 6 0 016-6h50M36 34h28"/>',pen:'<path d="M70 18l12 12-44 44-16 4 4-16z"/><path d="M62 26l12 12"/>',lamp:'<path d="M34 20h32l10 30H24z"/><path d="M50 50v28M34 82h32"/>',chair:'<path d="M32 16h36v36H32z"/><path d="M28 52h44v10H28zM34 62v22M66 62v22"/>',calc:'<rect x="26" y="14" width="48" height="72" rx="7"/><rect x="34" y="22" width="32" height="14" rx="2"/><path d="M36 50h4M48 50h4M60 50h4M36 62h4M48 62h4M60 62h4M36 74h4M48 74h4M60 74h4"/>'};
const CATS={e:'Electronics',b:'Books',s:'Stationery',f:'Fashion',h:'Hostel & Furniture',a:'Accessories'},TY={b:'Buy',r:'Rent',x:'Exchange',d:'Donate'},COND=['New','Like new','Good','Fair'],HUE={e:215,b:30,s:160,f:10,h:270,a:190};
const SEL=['Aarav S.','Diya M.','Kabir P.','Ishita R.','Rohan K.','Meera J.','Vihaan T.','Anaya D.'],CAMP=['Somaiya Vidyavihar University','Mumbai University','IIT Bombay','NMIMS Mumbai','VJTI Mumbai','Symbiosis Pune'];
const TAIL={b:'Pickup on campus.',r:'Daily rental with pickup and return on campus.',x:'Open to an exchange.',d:'Free to a student who needs it.'};
/* sample listings: name|category|price|condition|type|glyph|wants */
const P=`Casio fx-991EX Calculator|e|900|2|b|calc
Dell Inspiron 15 Laptop|e|28000|2|b|laptop
boAt Rockerz Headphones|e|799|1|b|headphones
Redmi Pad Tablet|e|9500|2|b|tablet
Mi Power Bank 20000mAh|e|700|2|b|bank
Canon EOS 1500D Camera|e|400|2|r|camera
JBL Go Bluetooth Speaker|e|1100|2|b|speaker
Raspberry Pi 4 Kit|e|3500|1|x|bank|a good scientific calculator or an Arduino kit
Noise Smartwatch|e|1500|2|b|watch
Samsung Galaxy M31|e|8500|3|b|phone
Engineering Mathematics (B.S. Grewal)|b|250|2|b|book
Data Structures in C (Reema Thareja)|b|300|2|b|book
Operating System Concepts (Silberschatz)|b|400|2|b|book
Let Us C (Yashavant Kanetkar)|b|180|3|b|book
Concepts of Physics (H.C. Verma)|b|350|2|b|book
Organic Chemistry (Morrison and Boyd)|b|450|2|b|book
GATE CSE Previous Year Papers|b|15|2|r|book
Novel Bundle (5 books)|b|0|2|d|book
Semester 3 CSE Handwritten Notes|b|0|2|d|book
Introduction to Algorithms (CLRS)|b|600|2|x|book|a DBMS textbook
Drafter Mini Set|s|350|2|b|pen
Engineering Drawing Board|s|20|2|r|pen
Classmate Notebooks (Pack of 6)|s|220|0|b|book
Camlin Geometry Box|s|120|0|b|pen
Pilot V5 Pen Pack|s|150|0|b|pen
A3 Drawing Sheets (20)|s|180|0|b|book
Highlighter Set|s|90|0|b|pen
Sticky Notes Combo|s|110|0|b|book
Mini Whiteboard|s|250|1|b|book
Stapler and Punch Combo|s|140|2|b|pen
Sneakers (UK 9)|f|1800|2|b|shoe
Denim Jacket|f|1200|2|b|jacket
College Hoodie|f|700|1|b|jacket
Oversized Tee|f|350|2|b|tee
Lab Coat|f|200|2|b|tee
Formal Blazer|f|250|2|r|jacket
Running Shoes (UK 8)|f|1500|1|b|shoe
Baseball Cap|f|200|2|b|cap
Winter Jacket|f|0|2|d|jacket
Kurta Set|f|600|2|b|tee
Study Table Lamp|h|450|2|b|lamp
Foldable Study Chair|h|900|2|b|chair
Mini Fridge 90L|h|120|2|r|chair
Electric Kettle 1.2L|h|350|2|b|bank
Laundry Bag|h|150|1|b|bag
Single Mattress Topper|h|1100|2|b|chair
Extension Board 4-Socket|h|250|1|b|bank
Clip-on Desk Fan|h|500|2|b|lamp
Plastic Storage Rack|h|0|2|d|chair
Table Fan|h|800|2|x|lamp|an electric kettle
Backpack 30L|a|1200|2|b|bag
Sunglasses|a|400|1|b|glasses
Laptop Sleeve 15 inch|a|350|1|b|bag
Wired Earphones|a|200|0|b|headphones
Casio Wrist Watch|a|1500|2|b|watch
Leather Wallet|a|300|2|b|bag
Phone Stand|a|150|0|b|phone
Water Bottle 1L|a|300|0|b|bank
Cycle Lock|a|250|0|b|bank
Tote Bag|a|250|1|b|bag`.split('\n').map((r,id)=>{const[name,cat,price,c,type,g,wants]=r.split('|');return{id,name,cat,price:+price,cond:+c,type,g,wants,seller:SEL[id*3%8],campus:CAMP[id*7%CAMP.length],h:(HUE[cat]+id*13)%360,desc:`${COND[+c]} condition, listed by ${SEL[id*3%8]} at ${CAMP[id*7%CAMP.length]}. ${TAIL[type]}`}});
const art=(g,h)=>`<div class="art" style="--h:${h}"><svg viewBox="0 0 100 100" aria-hidden="true">${G[g]}</svg></div>`;
let cart=DB.cart.get().reduce((a,i)=>{const f=a.find(x=>x.name===i.name);f?f.qty+=i.qty||1:a.push({id:i.id,name:i.name,price:i.price,qty:i.qty||1});return a},[]);
let W=new Set(DB.wish.get());
const BASE=P.length,LS=DB.listings.get(),O=DB.orders.get(),V=()=>P.filter(p=>!p.rm);
LS.forEach(l=>P.push({...l,id:P.length}));
const sub=()=>cart.reduce((s,i)=>s+i.price*i.qty,0),items=()=>cart.map(i=>({item_name:i.name,price:i.price,quantity:i.qty}));
function save(){DB.cart.set(cart);const n=cart.reduce((s,i)=>s+i.qty,0),c=$('#count');if(c){c.textContent=n;$('#cartlink').setAttribute('aria-label','Cart, '+n+' items')}}

/* shell: nav + footer */
const L=[['shop','Explore','products.html'],['sell','Sell','sell.html'],['wishlist','Saved','wishlist.html'],['orders','Orders','orders.html'],['about','About','about.html'],['contact','Contact','contact.html']];
const SRCH=`<input class="search" type="search" placeholder="Search" aria-label="Search listings" oninput="qs(this.value)" onkeydown="if(event.key=='Enter')location.href='products.html?q='+encodeURIComponent(this.value)">`;
document.body.insertAdjacentHTML('afterbegin',`<a class="skip" href="#main">Skip to content</a><nav aria-label="Main"><a class="logo" href="index.html">Unisell</a>${SRCH}<div class="links" id="links">${SRCH.replace('class="search"','class="search msearch"')}${L.map(l=>`<a class="l-${l[0]}${page==l[0]?' on':''}" href="${l[2]}"${page==l[0]?' aria-current="page"':''}>${l[1]}</a>`).join('')}</div><a id="cartlink" class="${page=='cart'?'on':''}" href="cart.html" aria-label="Cart">Cart<span id="count" class="cart-count">0</span></a><button class="icon" onclick="toggleDark()" aria-label="Toggle dark mode"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button><button class="icon burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="links" onclick="menu()"><svg viewBox="0 0 24 24"><path d="M4 8h16M4 16h16"/></svg></button></nav>`);
document.body.insertAdjacentHTML('beforeend',`<footer><span>© 2026 Unisell. Built by <a href="https://github.com/nikunjmody05">Nikunj Mody</a>.</span><nav aria-label="Footer">${L.map(l=>`<a href="${l[2]}">${l[1]}</a>`).join('')}</nav></footer><div class="toast" id="toast" role="status"></div>`);
function menu(o){const n=$('nav'),b=$('#burger');o=o===undefined?!n.classList.contains('open'):o;n.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}
addEventListener('keydown',e=>{if(e.key=='Escape'&&$('nav').classList.contains('open')){menu(false);$('#burger').focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('nav'))menu(false)});
addEventListener('error',()=>toast('Something went wrong. Please refresh and try again.'));
const mn=document.querySelector('main');if(mn){mn.id=mn.id||'main';mn.tabIndex=-1;$('.skip').href='#'+mn.id}
function foc(){const h=$('#view h1,#view h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),1800)}
function toggleDark(){const d=document.documentElement.classList.toggle('dark');DB.theme.set(d?'dark':'light')}

/* cards, cart, wishlist */
const pr=p=>p.type=='d'?'Free':p.type=='x'?'Exchange':inr(p.price)+(p.type=='r'?'/day':'');
const card=p=>`<article class="card"><div class="ph"><a href="product.html?id=${p.id}" aria-label="${p.name}">${art(p.g,p.h)}</a><span class="badge">${TY[p.type]}</span><button class="heart${W.has(p.id)?' on':''}" aria-pressed="${W.has(p.id)}" aria-label="Save ${p.name}" onclick="wish(${p.id},this)">♥</button></div><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><p class="sub">${COND[p.cond]} – ${p.campus}</p><div class="row"><b>${pr(p)}</b>${p.type=='b'?`<button class="btn sm" onclick="addToCart(${p.id},this)">Add to cart</button>`:`<a class="btn sm ghost" href="product.html?id=${p.id}">View</a>`}</div></article>`;
function addToCart(id,btn){const p=P[id],f=cart.find(i=>i.name==p.name);f?f.qty++:cart.push({id,name:p.name,price:p.price,qty:1});save();
 gtag('event','add_to_cart',{currency:'INR',value:p.price,items:[{item_name:p.name,item_category:CATS[p.cat],price:p.price,quantity:1}]});
 btn.textContent='Added ✓';setTimeout(()=>btn.textContent='Add to cart',1200);toast(p.name+' added to your cart')}
function wish(id,b){const on=!W.has(id);on?W.add(id):W.delete(id);DB.wish.set([...W]);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);if(on)gtag('event','add_to_wishlist',{currency:'INR',value:P[id].price,items:[{item_name:P[id].name}]});if(S.saved)shop();if(page=='wishlist')wl()}

/* explore + smart search */
const S={cat:'all',type:'all',campus:'all',cond:'all',max:0,sort:'f',q:'',saved:false};
function parse(q){const o={w:[]},T={rent:'r',rental:'r',rentals:'r',borrow:'r',exchange:'x',swap:'x',donate:'d',donation:'d',free:'d',buy:'b'},C={book:'b',books:'b',textbook:'b',textbooks:'b',stationery:'s',fashion:'f',clothes:'f',clothing:'f',hostel:'h',furniture:'h',electronics:'e',gadgets:'e',accessories:'a'},CP={somaiya:'Somaiya Vidyavihar University',vidyavihar:'Somaiya Vidyavihar University',iit:'IIT Bombay',nmims:'NMIMS Mumbai',vjti:'VJTI Mumbai',symbiosis:'Symbiosis Pune',pune:'Symbiosis Pune'},STOP='find a an the me show i need want looking for to near my campus on in at of with some any cheap second hand secondhand and please get that is are'.split(' ');
 q=q.toLowerCase().replace(/(?:under|below|less than|within|upto|up to|<)\s*(?:₹|rs\.?|inr)?\s*(\d[\d,]*)\s*(k\b)?/,(m,n,k)=>{o.max=+n.replace(/,/g,'')*(k?1000:1);return' '}).replace(/like new/,()=>{o.cond=1;return' '}).replace(/mumbai university/,()=>{o.campus='Mumbai University';return' '});
 q.split(/[^a-z0-9]+/).filter(Boolean).forEach(w=>{if(T[w])o.type=T[w];else if(C[w])o.cat=C[w];else if(CP[w])o.campus=CP[w];else if(w=='new')o.cond=0;else if(w=='used')o.used=1;else if(!STOP.includes(w))o.w.push(w.length>3?w.replace(/s$/,''):w)});return o}
function qs(v){S.q=v.trim().toLowerCase();clearTimeout(qs.t);qs.t=setTimeout(()=>v.trim().length>2&&gtag('event','search',{search_term:v.trim()}),900);if(page=='shop')shop()}
function setF(k,v){S[k]=v;S.saved=false;shop()}
function bars(){const ch=(k,v,l,x)=>`<button class="chip" data-k="${k}" data-v="${v}" onclick="${x||`setF('${k}','${v}')`}">${l}</button>`,sel=(l,k,opts)=>`<select style="margin-left:0" aria-label="${l}" onchange="setF('${k}',this.value=='all'?'all':isNaN(this.value)?this.value:+this.value)">${opts}</select>`;
 $('#b1').innerHTML=ch('cat','all','All')+Object.entries(CATS).map(([k,v])=>ch('cat',k,v)).join('');
 $('#b2').innerHTML=Object.entries(TY).map(([k,v])=>ch('type',k,v,`setF('type',S.type=='${k}'?'all':'${k}')`)).join('')+`<button class="chip" id="sv" onclick="S.saved=!S.saved;shop()">♥ Saved</button>`
 +sel('Campus','campus','<option value="all">All campuses</option>'+CAMP.map(c=>`<option>${c}</option>`).join(''))+sel('Condition','cond','<option value="all">Any condition</option>'+COND.map((c,i)=>`<option value="${i}">${c}</option>`).join(''))+sel('Maximum price','max',[0,500,1000,5000,20000].map(n=>`<option value="${n}">${n?'Under '+inr(n):'Any price'}</option>`).join(''))
 +`<select aria-label="Sort" onchange="S.sort=this.value;shop()"><option value="f">Featured</option><option value="new">Newest</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select>`}
function shop(){const g=$('#grid');if(!g)return;g.removeAttribute('aria-busy');const o=parse(S.q),m=o.max||S.max;
 let l=V().filter(p=>{const h=(p.name+' '+CATS[p.cat]+' '+TY[p.type]+' '+p.campus).toLowerCase();return(S.cat=='all'||p.cat==S.cat)&&(S.type=='all'||p.type==S.type)&&(S.campus=='all'||p.campus==S.campus)&&(S.cond=='all'||p.cond==S.cond)&&(!S.saved||W.has(p.id))&&(!m||p.price<=m)&&(!o.type||p.type==o.type)&&(!o.cat||p.cat==o.cat)&&(!o.campus||p.campus==o.campus)&&(o.cond==null||p.cond==o.cond)&&(!o.used||p.cond>0)&&o.w.every(w=>h.includes(w))});
 if(S.sort=='lo')l.sort((a,b)=>a.price-b.price);if(S.sort=='hi')l.sort((a,b)=>b.price-a.price);if(S.sort=='new')l.sort((a,b)=>b.id-a.id);
 g.innerHTML=l.map(card).join('')||`<p class="empty">${S.saved?'You haven’t saved anything yet. Tap the heart on a listing to save it.':'No listings match. Try fewer words or clear the filters.'}</p>`;
 $('#n').textContent=l.length+' listings';
 $('#hint').textContent=S.q?'Understood: '+[o.w.join(' '),CATS[o.cat],TY[o.type],o.cond!=null?COND[o.cond]:o.used?'used':'',o.max?'under '+inr(o.max):'',o.campus].filter(Boolean).join(', '):'';
 document.querySelectorAll('.chip[data-k]').forEach(c=>{const on=!S.saved&&S[c.dataset.k]==c.dataset.v;c.classList.toggle('on',on);c.setAttribute('aria-pressed',on)});$('#sv').classList.toggle('on',S.saved);$('#sv').setAttribute('aria-pressed',S.saved)}

/* product page */
function rent(id){const p=P[id],d=+$('#days').value;cart.push({id,name:`${p.name} (${d}-day rental)`,price:p.price*d,qty:1});save();
 gtag('event','rent_product',{item_name:p.name,days:d});gtag('event','add_to_cart',{currency:'INR',value:p.price*d,items:[{item_name:p.name,item_variant:'rental',price:p.price*d,quantity:1}]});toast('Rental added to your cart')}
function req(id,ev,m){gtag('event',ev,{item_name:P[id].name});toast(m)}
function pdp(){const p=P[+new URLSearchParams(location.search).get('id')],v=$('#view');
 if(!p||p.rm){v.innerHTML=`<h1>Listing not found</h1><p class="empty">This listing may have been removed. <a href="products.html">Back to Explore</a>.</p>`;return}
 document.title=p.name+' – Unisell';gtag('event','view_item',{currency:'INR',value:p.price,items:[{item_name:p.name,item_category:CATS[p.cat],price:p.price}]});
 const act={b:`<button class="btn" onclick="addToCart(${p.id},this)">Add to cart</button>`,r:`<select style="margin:0" id="days" aria-label="Rental days"><option>1</option><option>3</option><option selected>7</option><option>14</option></select><span class="mute">days</span><button class="btn" onclick="rent(${p.id})">Rent</button>`,x:`<button class="btn" onclick="req(${p.id},'exchange_request','Exchange request sent')">Request exchange</button>`,d:`<button class="btn" onclick="req(${p.id},'donation_request','Request sent')">Request this item</button>`}[p.type];
 v.innerHTML=`<p class="crumb"><a href="products.html">Explore</a> / <a href="products.html#${p.cat}">${CATS[p.cat]}</a></p><div class="pdp">${art(p.g,p.h)}<div><span class="badge">${TY[p.type]}</span><h1>${p.name}</h1><p class="price">${pr(p)}</p><p class="mute">${p.desc}</p><div class="facts"><p><span>Condition</span>${COND[p.cond]}</p><p><span>Category</span>${CATS[p.cat]}</p><p><span>Campus</span>${p.campus}</p><p><span>Seller</span><a class="link" href="seller.html?s=${encodeURIComponent(p.seller)}">${p.seller}</a>${p.mine?'':' (sample)'}</p>${p.type=='r'?`<p><span>Refundable deposit</span>${inr(p.price*5)}</p>`:''}${p.wants?`<p><span>Looking for</span>${p.wants}</p>`:''}</div><div class="act">${act}<button class="chip" onclick="wish(${p.id},this);this.textContent=W.has(${p.id})?'♥ Saved':'♡ Save'">${W.has(p.id)?'♥ Saved':'♡ Save'}</button></div><p class="sub" style="margin-top:18px">Sample listing. Messaging and live requests arrive with accounts in the next stage.</p></div></div><div class="sec"><h2>More in ${CATS[p.cat]}</h2><div class="grid" style="margin-top:24px">${V().filter(x=>x.cat==p.cat&&x.id!=p.id).slice(0,4).map(card).join('')}</div></div>`}

/* cart + checkout */
const ship=()=>sub()>=5000||!cart.length?0:99;
function cartView(){const v=$('#view');
 if(!cart.length){v.innerHTML=`<h1>Your cart</h1><p class="empty">Your cart is empty. <a href="products.html">Browse the shop</a>.</p>`;return}
 const s=sub(),left=5000-s;
 v.innerHTML=`<h1>Your cart</h1><div class="split"><div>${cart.map((it,i)=>{const p=P[it.id]||P.find(x=>x.name==it.name)||P[0];return `<div class="line">${art(p.g,p.h)}<div><h3>${it.name}</h3><p class="sub">${inr(it.price)}</p><button class="link" onclick="del(${i})">Remove</button></div><div class="qty"><button aria-label="Decrease quantity" onclick="qty(${i},-1)">−</button><span>${it.qty}</span><button aria-label="Increase quantity" onclick="qty(${i},1)">+</button></div><b>${inr(it.price*it.qty)}</b></div>`}).join('')}</div>
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
 method='upi';foc();gtag('event','begin_checkout',{currency:'INR',value:sub(),items:items()})}
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
  O.unshift({id,date:Date.now(),items:cart.map(i=>({name:i.name,qty:i.qty,price:i.price})),total:t,method,status:'Confirmed'});DB.orders.set(O);
  cart=[];save();
  $('#view').innerHTML=`<div class="done"><span class="tick">✓</span><h1>Order confirmed</h1><p class="mute">Order ${id} for ${inr(t)} is on its way. A receipt would be sent to your email.</p><a class="btn" href="products.html">Continue shopping</a></div>`;foc()},2500)}

/* contact */
function sendMsg(f){const ok=[...f.elements].filter(x=>x.required).every(x=>x.value.trim());
 if(!ok||!/\S+@\S+\.\S+/.test(f.email.value))return $('#msg').textContent='Fill in your name, a valid email and a message.';
 gtag('event','generate_lead',{method:'contact_form'});f.outerHTML='<p class="prose" style="color:var(--blue);font-size:19px">Thanks. We’ve received your message and will reply within one working day.</p>'}

/* sell flow */
const LF={s:0,type:'b',name:'',cat:'e',desc:'',cond:2,price:'',wants:'',campus:CAMP[0],edit:null},ST=['Type','Details','Condition and price','Campus','Preview'],SELLT={b:'Sell',r:'Rent out',x:'Exchange',d:'Donate'};
function sell(msg){const v=$('#view'),s=LF.s,o=(arr,cur)=>arr.map(([k,t])=>`<option value="${k}"${cur==k?' selected':''}>${t}</option>`).join('');let b='';
 if(s==0)b=`<div class="seg" style="margin-top:18px">${Object.entries(SELLT).map(([k,t])=>`<button class="chip${LF.type==k?' on':''}" onclick="LF.type='${k}';sell()">${t}</button>`).join('')}</div>`;
 if(s==1)b=`<label for="f-name">Item name</label><input class="f" id="f-name" value="${LF.name}" placeholder="e.g. Casio fx-991EX Calculator"><label for="f-cat">Category</label><select class="f" id="f-cat" style="margin:0">${o(Object.entries(CATS),LF.cat)}</select><label for="f-desc">Description (optional)</label><textarea class="f" id="f-desc" rows="3">${LF.desc}</textarea>`;
 if(s==2)b=`<label for="f-cond">Condition</label><select class="f" id="f-cond" style="margin:0">${o(COND.map((c,i)=>[i,c]),LF.cond)}</select>${LF.type=='d'?'':`<label for="f-price">${LF.type=='r'?'Price per day (₹)':LF.type=='x'?'Estimated value (₹)':'Price (₹)'}</label><input class="f" id="f-price" type="number" min="1" value="${LF.price}">`}${LF.type=='x'?`<label for="f-wants">What do you want in exchange?</label><input class="f" id="f-wants" value="${LF.wants}">`:''}`;
 if(s==3)b=`<label for="f-camp">Pickup campus</label><select class="f" id="f-camp" style="margin:0">${o(CAMP.map(c=>[c,c]),LF.campus)}</select>`;
 if(s==4)b=`<div class="pdp" style="margin-top:22px">${art(sg(),HUE[LF.cat])}<div><span class="badge">${TY[LF.type]}</span><h2 style="margin:10px 0">${LF.name}</h2><p class="price">${LF.type=='d'?'Free':LF.type=='x'?'Exchange':inr(+LF.price)+(LF.type=='r'?'/day':'')}</p><div class="facts"><p><span>Category</span>${CATS[LF.cat]}</p><p><span>Condition</span>${COND[LF.cond]}</p><p><span>Campus</span>${LF.campus}</p>${LF.wants?`<p><span>Looking for</span>${LF.wants}</p>`:''}</div></div></div>`;
 v.innerHTML=`<h1>${LF.edit!=null?'Edit listing':'Create a listing'}</h1><p class="sub">Saved on this device only until accounts launch.</p><div class="ship" style="margin:22px 0 6px"><i style="width:${(s+1)*20}%"></i></div><p class="sub">Step ${s+1} of 5: ${ST[s]}</p><div style="max-width:560px">${b}<p class="err" id="err" role="alert">${msg||''}</p><div class="act">${s?`<button class="btn ghost" onclick="LF.s--;sell();foc()">Back</button>`:''}<button class="btn" onclick="${s==4?'publish()':'nx()'}">${s==4?(LF.edit!=null?'Save changes':'Publish listing'):'Continue'}</button></div></div>`}
const sg=()=>({e:'laptop',b:'book',s:'pen',f:'tee',h:'lamp',a:'bag'})[LF.cat];
function nx(){const s=LF.s,i=id=>$('#'+id)&&$('#'+id).value.trim();
 if(s==1){LF.name=i('f-name');LF.cat=i('f-cat');LF.desc=i('f-desc');if(LF.name.length<3)return sell('Enter an item name of at least 3 characters.')}
 if(s==2){LF.cond=+i('f-cond');if(LF.type!='d'){LF.price=i('f-price');if(!(+LF.price>0))return sell('Enter a price greater than 0.')}if(LF.type=='x'){LF.wants=i('f-wants');if(LF.wants.length<3)return sell('Say what you would like in exchange.')}}
 if(s==3)LF.campus=i('f-camp');
 LF.s++;sell();foc()}
function publish(){const e=LF.edit!=null,f={name:LF.name,cat:LF.cat,price:LF.type=='d'?0:+LF.price,cond:LF.cond,type:LF.type,g:sg(),wants:LF.type=='x'?LF.wants:'',campus:LF.campus,desc:LF.desc||`${COND[LF.cond]} condition, listed by you at ${LF.campus}. ${TAIL[LF.type]}`};let id;
 if(e){id=LF.edit;Object.assign(LS[id-BASE],f);Object.assign(P[id],f)}else{const l={...f,seller:'You',h:(HUE[LF.cat]+LS.length*37)%360,mine:1,rm:0};LS.push(l);id=P.length;P.push({...l,id});gtag('event','create_listing',{item_name:l.name,item_category:CATS[l.cat],listing_type:l.type})}
 DB.listings.set(LS);Object.assign(LF,{s:0,name:'',desc:'',price:'',wants:'',edit:null});
 $('#view').innerHTML=`<div class="done"><span class="tick">✓</span><h1>${e?'Listing updated':'Listing published'}</h1><p class="mute">${e?'Your changes are saved.':'It now appears in Explore.'} Stored on this device only.</p><div class="act" style="justify-content:center"><a class="btn" href="product.html?id=${id}">View listing</a><a class="btn ghost" href="seller.html?s=You">Manage your listings</a><a class="btn ghost" href="sell.html">List another</a></div></div>`;foc()}

/* seller profile + dashboard */
function sellerPg(){const n=new URLSearchParams(location.search).get('s')||'',me=n=='You',l=V().filter(p=>p.seller==n),v=$('#view');
 if(!l.length&&!me){v.innerHTML=`<h1>Seller not found</h1><p class="empty"><a href="products.html">Back to Explore</a></p>`;return}
 const t=[...new Set(l.map(p=>TY[p.type]))].join(', ');
 v.innerHTML=`<div class="row" style="justify-content:flex-start;gap:20px"><div class="av">${n[0]}</div><div><span class="badge">${me?'Your account':'Sample seller'}</span><h1 style="margin-top:6px">${me?'Your listings':n}</h1></div></div>
 <div class="facts" style="max-width:520px"><p><span>Campus</span>${l[0]?l[0].campus:'Not set'}</p><p><span>Active listings</span>${l.length}</p><p><span>Offers</span>${t||'None yet'}</p></div>
 <p class="sub">${me?'Stored on this device only.':'Profiles, verification and reviews arrive with accounts. This seller is sample data.'}</p>
 ${l.length?`<div class="grid" style="margin-top:36px">${l.map(p=>`<div>${card(p)}${me?`<p class="act" style="gap:18px;margin-top:10px"><a class="link" href="sell.html?edit=${p.id}">Edit</a><button class="link" onclick="unlist(${p.id})">Unlist</button></p>`:''}</div>`).join('')}</div>`:`<p class="empty">You haven’t listed anything yet. <a href="sell.html">Create your first listing</a>.</p>`}`}
function unlist(id){P[id].rm=1;LS[id-BASE].rm=1;DB.listings.set(LS);sellerPg();toast('Listing removed')}

/* saved + orders */
function wl(){const l=V().filter(p=>W.has(p.id));$('#view').innerHTML=`<div class="row"><h1>Saved</h1><span class="sub">${l.length} saved</span></div>`+(l.length?`<div class="grid" style="margin-top:36px">${l.map(card).join('')}</div>`:`<p class="empty">Nothing saved yet. Tap the heart on any listing to keep it here. <a href="products.html">Explore listings</a>.</p>`)}
function ord(){$('#view').innerHTML=`<h1>Your orders</h1><p class="sub">Demo orders are stored on this device only.</p>`+(O.length?O.map(o=>`<div class="ord"><div class="row"><b>${o.id}</b><span class="badge">${o.status}</span></div><p class="sub">${new Date(o.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}, paid by ${o.method.toUpperCase()}</p>${o.items.map(i=>`<p class="row"><span>${i.name} × ${i.qty}</span><span>${inr(i.price*i.qty)}</span></p>`).join('')}<p class="row" style="margin-top:6px"><b>Total</b><b>${inr(o.total)}</b></p></div>`).join(''):`<p class="empty">No orders yet. <a href="products.html">Explore listings</a> and check out to see your order here.</p>`)}

/* init */
document.querySelectorAll('[data-art]').forEach(e=>{e.classList.add('art');e.style.setProperty('--h',e.dataset.h);e.innerHTML=`<svg viewBox="0 0 100 100" aria-hidden="true">${G[e.dataset.art]}</svg>`;e.querySelectorAll('svg *').forEach(s=>s.setAttribute('pathLength',1))});
const feat=$('#featured');if(feat)feat.innerHTML=V().filter(p=>p.id%15==1).slice(0,4).map(card).join('');
if(page=='shop'){const u=new URLSearchParams(location.search),h=location.hash.slice(1);S.q=(u.get('q')||'').toLowerCase();if(CATS[h])S.cat=h;document.querySelector('.search').value=u.get('q')||'';bars();shop()}
if(page=='product')pdp();if(page=='sell'){const ed=new URLSearchParams(location.search).get('edit'),q=P[ed];if(q&&q.mine&&!q.rm)Object.assign(LF,{s:1,type:q.type,name:q.name,cat:q.cat,desc:q.desc,cond:q.cond,price:q.price||'',wants:q.wants||'',campus:q.campus,edit:+ed});sell()}if(page=='seller')sellerPg();if(page=='wishlist')wl();if(page=='orders')ord();
if(page=='cart')cartView();
/* scroll motion */
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,bar=document.createElement('div');bar.id='prog';document.body.prepend(bar);
function rv(){const io=rv.io||(rv.io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -6% 0px'}));
 document.querySelectorAll('.card,.cat,.perks>div,.sec>.row,.prose>*,.line,.ord,.facts').forEach(e=>{if(e.dataset.rv)return;e.dataset.rv=1;e.classList.add('rv');e.style.transitionDelay=[...e.parentNode.children].indexOf(e)%4*70+'ms';io.observe(e)});}
['#view','#grid'].forEach(s=>{const e=$(s);if(e)new MutationObserver(rv).observe(e,{childList:true})});rv();
if(RM)bar.style.display='none';else{const hero=$('.hero-top');
 const on=()=>{const y=scrollY,vh=innerHeight;bar.style.transform=`scaleX(${Math.min(1,y/(document.documentElement.scrollHeight-vh||1))})`;
  if(hero){const k=Math.min(1,y/(vh*.6));hero.style.opacity=1-k;hero.style.transform=`translateY(${y*.18}px) scale(${1-k*.06})`}};
 let q;addEventListener('scroll',()=>{cancelAnimationFrame(q);q=requestAnimationFrame(on)},{passive:true});on()}
save();
