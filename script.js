//PRODUCTS 
const products = [
 {
        id: 1,
        name: "D lift Push-up Bra",
        price: 350,
        image: "images/D lift push-up bra.jpg"
 },
 
{
    id: 2,
    name: "Super Shaper Bodysuit",
    price: 450, 
    image: "images/super sharp bodysuit.jpg"
},

{
    id: 3,
    name: "Super Sharp Jumpsuit",
    price: 550, 
    image: "images/SS jumpsuit.jpg"
}, 

{
    id: 4,
    name: "Super Sharp Fajah",
    price: 380, 
    image: "images/SS fajah.jpg"
}
];


let cart =[]
function updateCartCount(){
    const total = cart.reduce((sum,item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = total;
}

function addToCart(productId, size){
    if(!size){
        alert('Please select a size')
        return;
    }

    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.product.id === productId && item.size === size);

    if(existingItem){
        existingItem.quantity++;
    } else {
        cart.push({product, size, quantity: 1})
    }

    updateCartCount();
    renderCart()
}

function renderCart(){
    const cartItems = document.getElementById('cartItems')
    const cartTotal = document.getElementById('cartTotal')

    cartItems.innerHTML = '';

    if(cart.length === 0){
        cartItems.innerHTML = '<p style="color: #888; font-size: 13px;">Your cart is empty</p>';
        cartTotal.textContent= 0;
        return;

    }

    let total = 0;
    cart.forEach(item => {
        total += item.product.price*item.quantity;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
        <img src="${item.product.image}" alt="${item.product.name}">
        <div class="cart-item-name">
        <p class="cart-item-name">${item.product.name}</p>
        <p class="cart-item-size">${item.size}</p>
        <p class="cart-item-price">R${item.product.price}</p>
        </div>

        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.product.id}, '${item.size}', -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="changeQty(${item.product.id}, '${item.size}', 1)">+</button>
        </div>
        
        `;
        cartItems.appendChild(div)
    });

    cartTotal.textContent =total;
}

function removeFromCart(productId, size){
    cart = cart.filter(item => !(item.product.id ===productId && item.size === size));
    updateCartCount()
    renderCart();
}

function changeQty(productId, size, change){
const item  = cart.find(item => item.product.id === productId && item.size === size);
if(item){
    item.quantity += change; 
    if(item.quantity <= 0){
        removeFromCart(productId, size);
        return;
    }
}
updateCartCount();
renderCart();

}

//CHECKOUT SCRPT

function goToCheckout(){
    if(cart.length === 0){
        alert('Ýour cart is empty')
    }

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const itemList  = cart.map(item => `${item.product.name} (${item.size}) x${item.quantity}`).join(`, `);

    const form = document.createElement('form')
    form.method = 'POST'; 
    form.action = '	https://sandbox.payfast.co.za/eng/process'

    const fields  ={
        merchant_id: '10047947',
        merchant_key: '	bo1zjih1q9o8m',
        amount: total.toFixed(2),
        item_name: 'ShapeHer Order',
        item_description:'itemList'
    };

    Object.keys(fields). forEach(key => {
        const input = document.createElement('input')
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
}


//CART FUNCTION
document.addEventListener('DOMContentLoaded', () => {
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartIcon = document.getElementById('cartIcon');
const closeCart = document.getElementById('closeCart');

cartIcon.addEventListener('click', () => {
    console.log('cart icon clicked')
    cartDrawer.classList.add ('open');
    cartOverlay.classList.add ('open');
});

closeCart.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
});

cartOverlay.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
});

});




//HAMBURGER MENU TOGGLE
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

//CLOSE MENU ON LINK CLICK
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

//SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, #about, #contact').forEach(element => {
    element.classList.add('hidden');
    observer.observe(element);
});


//scroll behaviour for smooth scrolling on anchor links

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});