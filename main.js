// ====================================
// Sticky Header
// ====================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ====================================
// Hamburger Menu
// ====================================
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
    document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-mobile .nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ====================================
// Smooth Scroll
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Back to Top Button
// ====================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// FAQ Accordion
// ====================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        const answer = question.nextElementSibling;
        
        // Close all other FAQs
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.style.maxHeight = null;
            }
        });
        
        // Toggle current FAQ
        question.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = null;
        }
    });
});

// ====================================
// Form Submission (Dummy)
// ====================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real implementation, this would send the form data to a server
    alert('お問い合わせありがとうございます。\n2営業日以内にご返信いたします。');
    
    // Reset form
    contactForm.reset();
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// Intersection Observer for Animations
// ====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-up elements
document.querySelectorAll('.card-fade-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// ====================================
// Prevent CLS (Cumulative Layout Shift)
// ====================================
// Ensure images have proper aspect ratios
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});