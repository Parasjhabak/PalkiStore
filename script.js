document.addEventListener("DOMContentLoaded", () => {

const hero = document.querySelector(".hero");
const track = document.querySelector(".hero-track");
const slides = document.querySelectorAll(".hero-slide");
const dotsContainer = document.querySelector(".hero-dots");

if (!hero || slides.length === 0 || !dotsContainer) return;

let index = 0;
let autoInterval;

/* CREATE DOTS */

slides.forEach((_, i) => {

const dot = document.createElement("span");

if(i === 0) dot.classList.add("active");

dot.addEventListener("click", () => {
index = i;
goToSlide(index);
resetAuto();
});

dotsContainer.appendChild(dot);

});

let dots = document.querySelectorAll(".hero-dots span");

/* GO TO SLIDE */

function goToSlide(i){

track.scrollTo({
left: i * track.clientWidth,
behavior: "smooth"
});

index = i;
setActiveSlide();

}

/* ACTIVE DOT */

function setActiveSlide(){

dots.forEach(dot => dot.classList.remove("active"));
dots[index].classList.add("active");

}

/* AUTO SLIDE */

function startAuto(){

autoInterval = setInterval(()=>{

index = (index + 1) % slides.length;
goToSlide(index);

},7000);

}

function resetAuto(){

clearInterval(autoInterval);
startAuto();

}

startAuto();

/* SWIPE DETECTION */

track.addEventListener("scroll", () => {

const slideWidth = track.clientWidth;
const newIndex = Math.round(track.scrollLeft / slideWidth);

if(newIndex !== index){
index = newIndex;
setActiveSlide();
}

});

});


// ================= CART FUNCTIONS =================

function addToCart(id, name, price) {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const product = {
id: id,
name: name,
price: price,
quantity: 1
};

cart.push(product);

localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " added to cart");
}


function openCart() {
window.location.href = "cart.html";
}


function displayCart() {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("cart-items");

if(!container) return;

container.innerHTML = "";

cart.forEach(item => {

let productDiv = document.createElement("div");

productDiv.innerHTML = `
<h4>${item.name}</h4>
<p>Price: ₹${item.price}</p>
<p>Quantity: ${item.quantity}</p>
`;

container.appendChild(productDiv);

});

}

displayCart();


// ================= SEARCH PRODUCTS =================

function searchProducts() {

let input = document.getElementById("searchInput");

if(!input) return;

let value = input.value.toLowerCase();

let products = document.querySelectorAll(".product");

let found = false;

products.forEach(product => {

let name = product.getAttribute("data-name");

if(name && name.includes(value)){
product.style.display = "block";
found = true;
}
else{
product.style.display = "none";
}

});

if(!found){
console.log("No product found");
}

}


// ================= PRODUCT CLICK =================

const products = document.querySelectorAll(".product");

products.forEach(product => {
product.addEventListener("click", () => {
console.log("Product clicked");
});
});