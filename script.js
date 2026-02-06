let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ---------- THEME ---------- */
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

  gtag('event','add_to_cart',{
    currency:'INR',
    value:price,
    items:[{ item_name:name, price:price, quantity:1 }]
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
    list.innerHTML+=`
      <li>${item.name} - ₹${item.price}
        <button class="remove" onclick="removeItem(${i})">Remove</button>
      </li>`;
  });

  total.innerText="Total: ₹"+sum;
}

/* ---------- SEARCH ---------- */
function searchProducts(){
  let q=document.getElementById("searchBox").value.toLowerCase();
  document.querySelectorAll(".product").forEach(p=>{
    p.style.display = p.innerText.toLowerCase().includes(q) ? "block":"none";
  });
}

/* ---------- CHECKOUT ---------- */
function goToPayment(){
  document.getElementById("cartSection").style.display="none";
  document.getElementById("paymentPage").style.display="flex";

  let summary=document.getElementById("summaryItems");
  let totalBox=document.getElementById("summaryTotal");

  summary.innerHTML="";
  let sum=0;

  cart.forEach(item=>{
    sum+=item.price;
    summary.innerHTML+=`
      <p>${item.name}
        <span style="float:right">₹${item.price}</span>
      </p>`;
  });

  totalBox.innerText="Total: ₹"+sum;

  gtag('event','begin_checkout',{
    currency:'INR',
    value:sum,
    items:cart.map(i=>({
      item_name:i.name,
      price:i.price,
      quantity:1
    }))
  });
}

/* ---------- PAYMENT UI SWITCH ---------- */
function switchPaymentUI(){
  let method=document.getElementById("payMethod").value;
  document.getElementById("upiBox").style.display =
    method==="upi" ? "block":"none";
  document.getElementById("cardBox").style.display =
    method==="card" ? "block":"none";
}

/* ---------- CVV TOGGLE ---------- */
function toggleCVV(){
  let cvv=document.getElementById("cardCVV");
  cvv.type = cvv.type==="password" ? "text":"password";
}

/* ---------- CARD FORMAT ---------- */
document.getElementById("cardNumber")?.addEventListener("input",function(){
  this.value=this.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim();
});

/* ---------- PAYMENT ---------- */
function payNow(){

  let method=document.getElementById("payMethod").value;
  let error=document.getElementById("payError");
  let loader=document.getElementById("payLoader");
  let success=document.getElementById("paySuccess");

  error.innerText="";
  success.innerText="";

  /* ---- UPI ---- */
  if(method==="upi"){
    let upi=document.getElementById("upiInput").value.trim();
    let vpa=/^[\w.-]+@[\w.-]+$/;
    let phone=/^[6-9]\d{9}$/;

    if(!vpa.test(upi) && !phone.test(upi)){
      error.innerText="Enter valid UPI ID or mobile number";
      return;
    }
    error.innerText="Redirecting to Google Pay...";
  }

  /* ---- CARD ---- */
  if(method==="card"){
    let card=document.getElementById("cardNumber").value.replace(/\s/g,'');
    let exp=document.getElementById("cardExpiry").value;
    let cvv=document.getElementById("cardCVV").value;
    let name=document.getElementById("cardName").value.trim();

    if(card.length!==16 || isNaN(card)){
      error.innerText="Invalid card number"; return;
    }
    if(!/^\d{2}\/\d{2}$/.test(exp)){
      error.innerText="Expiry must be MM/YY"; return;
    }
    if(cvv.length!==3){
      error.innerText="Invalid CVV"; return;
    }
    if(name.length<3){
      error.innerText="Enter cardholder name"; return;
    }
  }

  loader.style.display="block";

  setTimeout(()=>{
    loader.style.display="none";

    let total=cart.reduce((s,i)=>s+i.price,0);

    gtag('event','add_payment_info',{ payment_type:method });

    gtag('event','purchase',{
      transaction_id:'TXN_'+Date.now(),
      currency:'INR',
      value:total,
      items:cart.map(i=>({
        item_name:i.name,
        price:i.price,
        quantity:1
      }))
    });

    success.innerText="Payment Successful ✔ Order Confirmed";

    cart=[];
    localStorage.removeItem("cart");
    updateCount();
    loadCart();

  },3000);
}

/* ---------- INIT ---------- */
applyTheme();
updateCount();
