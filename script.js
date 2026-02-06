let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ---------- THEME PERSIST ---------- */
function applyTheme(){
  let mode = localStorage.getItem("theme");
  if(mode === "dark"){
    document.body.classList.add("dark");
    let icon=document.querySelector(".toggle-circle");
    if(icon) icon.innerHTML="🌙";
  }
}

function toggleDark(){
  document.body.classList.toggle("dark");

  let isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  let icon=document.querySelector(".toggle-circle");
  if(icon) icon.innerHTML = isDark ? "🌙" : "☀️";
}

/* ---------- CART ---------- */
function updateCount(){
  let c=document.getElementById("count");
  if(c) c.innerText=cart.length;
}

function addToCart(name,price,btn){
  cart.push({name,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCount();

  /* GA4 EVENT: add_to_cart */
  gtag('event', 'add_to_cart', {
    currency: 'INR',
    value: price,
    items: [{
      item_name: name,
      price: price,
      quantity: 1
    }]
  });

  let card = btn.closest(".card");
  if(card){
    card.classList.add("added");
    setTimeout(()=>card.classList.remove("added"),700);
  }
}

function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  loadCart();
  updateCount();
}

function loadCart(){
  let list=document.getElementById("cart-items");
  let total=document.getElementById("total");
  if(!list) return;

  list.innerHTML="";
  let sum=0;

  cart.forEach((item,i)=>{
    sum+=item.price;
    let li=document.createElement("li");
    li.innerHTML=`${item.name} - INR ${item.price}
      <button class="remove" onclick="removeItem(${i})">Remove</button>`;
    list.appendChild(li);
  });

  total.innerText="Total: INR "+sum;
}

/* ---------- CATEGORY FILTER ---------- */
function filterCategory(){
  let hash=window.location.hash;

  let e=document.getElementById("electronics-section");
  let f=document.getElementById("fashion-section");
  let a=document.getElementById("accessories-section");

  if(!e) return;

  e.style.display="block";
  f.style.display="block";
  a.style.display="block";

  if(hash=="#electronics"){f.style.display="none";a.style.display="none";}
  if(hash=="#fashion"){e.style.display="none";a.style.display="none";}
  if(hash=="#accessories"){e.style.display="none";f.style.display="none";}
}

/* ---------- SEARCH ---------- */
function searchProducts(){
  let q=document.getElementById("searchBox").value.toLowerCase();
  let products=document.querySelectorAll(".product");

  products.forEach(p=>{
    let text=p.innerText.toLowerCase();
    p.style.display = text.includes(q) ? "block" : "none";
  });
}

/* ---------- CHECKOUT MODAL ---------- */
function openCheckout(){
  document.getElementById("checkoutModal").style.display="flex";

  let total = cart.reduce((sum,i)=>sum+i.price,0);

  /* GA4 EVENT: begin_checkout */
  gtag('event', 'begin_checkout', {
    currency: 'INR',
    value: total,
    items: cart.map(item => ({
      item_name: item.name,
      price: item.price,
      quantity: 1
    }))
  });
}

function closeCheckout(e){
  if(e && e.target.id!=="checkoutModal") return;
  document.getElementById("checkoutModal").style.display="none";
}

function payNow(){
  let total = cart.reduce((sum,i)=>sum+i.price,0);

  /* GA4 EVENT: add_payment_info */
  gtag('event', 'add_payment_info', {
    payment_type: 'UPI'
  });

  /* GA4 EVENT: purchase */
  gtag('event', 'purchase', {
    transaction_id: 'TXN_' + Date.now(),
    currency: 'INR',
    value: total,
    items: cart.map(item => ({
      item_name: item.name,
      price: item.price,
      quantity: 1
    }))
  });

  alert("Payment Successful! Order Placed 🎉");

  cart=[];
  localStorage.removeItem("cart");
  updateCount();
  loadCart();
  document.getElementById("checkoutModal").style.display="none";
}

/* ---------- INIT ---------- */
applyTheme();
updateCount();
filterCategory();
