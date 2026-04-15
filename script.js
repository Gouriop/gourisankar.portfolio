// Sticky Navbar
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
                // Trigger reflow for animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize project cards style for animation
projectCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease'; // Merge with hover transitions
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    
    // Simulate sending
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    btn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
        btn.classList.remove('btn-primary');
        btn.style.background = '#00c853';
        btn.style.boxShadow = '0 0 15px rgba(0, 200, 83, 0.5)';
        contactForm.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.add('btn-primary');
            btn.style.background = '';
            btn.style.boxShadow = '';
            btn.style.pointerEvents = 'all';
        }, 3000);
    }, 1500);
});

// Optional: Smooth reveal on scroll using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles and observer to sections and cards
document.querySelectorAll('section > .glass-container, .skills-grid .glass-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
