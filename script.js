let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCount(){
let c=document.getElementById("count");
if(c) c.innerText=cart.length;
}

function addToCart(name,price,btn){
cart.push({name,price});
localStorage.setItem("cart",JSON.stringify(cart));
updateCount();

let card = btn.closest(".card");
card.classList.add("added");
setTimeout(()=>card.classList.remove("added"),700);
}

function removeItem(i){
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
loadCart();updateCount();
}

function loadCart(){
let list=document.getElementById("cart-items");
let total=document.getElementById("total");
if(!list) return;

list.innerHTML=""; let sum=0;
cart.forEach((item,i)=>{
sum+=item.price;
let li=document.createElement("li");
li.innerHTML=`${item.name} - INR ${item.price}
<button class="remove" onclick="removeItem(${i})">Remove</button>`;
list.appendChild(li);
});
total.innerText="Total: INR "+sum;
}

/* CATEGORY FILTER */
function filterCategory(){
let hash=window.location.hash;

let e=document.getElementById("electronics-section");
let f=document.getElementById("fashion-section");
let a=document.getElementById("accessories-section");

if(!e) return;

e.style.display="block";f.style.display="block";a.style.display="block";

if(hash=="#electronics"){f.style.display="none";a.style.display="none";}
if(hash=="#fashion"){e.style.display="none";a.style.display="none";}
if(hash=="#accessories"){e.style.display="none";f.style.display="none";}
}

/* SEARCH */
function searchProducts(){
let q=document.getElementById("searchBox").value.toLowerCase();
let products=document.querySelectorAll(".product");

products.forEach(p=>{
let text=p.innerText.toLowerCase();
p.style.display = text.includes(q) ? "block" : "none";
});
}

/* TOGGLE */
function toggleDark(){
document.body.classList.toggle("dark");
let icon=document.querySelector(".toggle-circle");
icon.innerHTML=document.body.classList.contains("dark")?"🌙":"☀️";
}

updateCount();
filterCategory();
