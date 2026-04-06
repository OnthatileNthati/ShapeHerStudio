//HAMBURGER MENU TOGGLE

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

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

document.querySelectorAll('.product-card, #about #contact').forEach(element => {
    el.classList.add('hidden');
    observer.observe(el);
});