// Navbar Blur on Scroll
const navBg = document.getElementById('nav-bg');
const navbar = document.getElementById('navbar');
const navContainer = navbar.querySelector('.container');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navBg.classList.remove('opacity-0');
        navBg.classList.add('opacity-100');
        navbar.classList.add('border-white/10');
        navbar.classList.remove('border-transparent');
        navContainer.classList.remove('py-5');
        navContainer.classList.add('py-3');
    } else {
        navBg.classList.add('opacity-0');
        navBg.classList.remove('opacity-100');
        navbar.classList.remove('border-white/10');
        navbar.classList.add('border-transparent');
        navContainer.classList.remove('py-3');
        navContainer.classList.add('py-5');
    }
});

// Scroll Reveal Animation Avançada
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 50;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// FAQ Accordion
const faqBtns = document.querySelectorAll('.faq-btn');
faqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-icon');
        
        content.classList.toggle('open');
        if(content.classList.contains('open')){
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
            icon.style.transform = "rotate(180deg)";
        } else {
            icon.classList.add('fa-plus');
            icon.classList.remove('fa-minus');
            icon.style.transform = "rotate(0deg)";
        }
    });
});

// Multi-Slider Comparison Logic (Refatorado para múltiplos componentes)
const sliders = document.querySelectorAll('.compare-slider');

sliders.forEach(slider => {
    const overlay = slider.querySelector('.compare-overlay');
    const handle = slider.querySelector('.compare-handle');
    const imgBefore = slider.querySelector('.compare-img-before');
    let isResizing = false;

    const syncImageWidth = () => {
        if(imgBefore) {
            imgBefore.style.width = slider.offsetWidth + 'px';
        }
    };
    
    window.addEventListener('resize', syncImageWidth);
    // Pequeno delay para garantir que o layout renderizou
    setTimeout(syncImageWidth, 100);

    const updateSlider = (e) => {
        if (!isResizing) return;
        let rect = slider.getBoundingClientRect();
        let x = 0;
        
        if (e.type.includes('mouse')) {
            x = e.clientX - rect.left;
        } else if (e.type.includes('touch')) {
            x = e.touches[0].clientX - rect.left;
        }
        
        let percentage = Math.max(0, Math.min(x / rect.width * 100, 100));
        overlay.style.width = percentage + '%';
        handle.style.left = percentage + '%';
    };

    slider.addEventListener('mousedown', () => isResizing = true);
    slider.addEventListener('touchstart', () => isResizing = true, { passive: true });
    
    window.addEventListener('mouseup', () => isResizing = false);
    window.addEventListener('touchend', () => isResizing = false);
    
    window.addEventListener('mousemove', updateSlider);
    window.addEventListener('touchmove', updateSlider, { passive: true });
});
