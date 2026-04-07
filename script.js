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

//contact form submission

document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const product = document.getElementById('product').value;
    const size = document.getElementById('size').value;
    const phone = document.getElementById('phone').value;

    //whatsapp message formatting
    const message = `Hi, my name is ${name}. I would like to order the ${product} in size ${size}. Please contact me at ${phone} to confirm my order.`;
    const whatsappUrl = `https://wa.me/+27721083681?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
});