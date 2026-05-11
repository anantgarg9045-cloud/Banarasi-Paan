// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Set active nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Gallery Filter
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.tab-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.animation = 'fadeIn 0.5s';
            }, 10);
        } else {
            item.style.display = 'none';
        }
    });
}

// Product Filter
function filterProducts(category) {
    const items = document.querySelectorAll('.product-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));

    if (event && event.target) {
        event.target.classList.add('active');
    }

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.classList.remove('hidden');
            item.style.display = 'block';
        } else {
            item.classList.add('hidden');
            item.style.display = 'none';
        }
    });
}

// Initialize products filter on page load
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns[0].classList.add('active');
        // Show all products by default
        const items = document.querySelectorAll('.product-item');
        items.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('hidden');
        });
    }
});

// Modal Functions for Gallery
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');

    if (modal) {
        const imageSrc = element.querySelector('.gallery-image').textContent;
        const captionSrc = element.querySelector('.overlay p').textContent;

        modal.style.display = 'block';
        // Since we're using emojis, we'll display them differently
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('imageModal');
    if (modal && e.target === modal) {
        closeModal();
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (name && email && subject && message) {
            alert(`Thank you for your message, ${name}! We'll respond to your inquiry soon.`);
            this.reset();
        }
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you! ${email} has been subscribed to our newsletter.`);
        this.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.product-card, .feature-card, .value-card, .benefit-card-large, .team-member, .review-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.05}s`;
    observer.observe(card);
});

// Add to Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-small').forEach(btn => {
        if (btn.textContent.includes('Add to Cart')) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const card = this.closest('.product-card-large') || this.closest('.product-card');

                if (card) {
                    const productName = card.querySelector('h3').textContent;
                    const priceElement = card.querySelector('.price') || card.querySelector('.product-price');

                    if (priceElement) {
                        const priceText = priceElement.textContent;
                        const price = parseInt(priceText.replace('₹', '').trim());

                        if (typeof addToCart === 'function') {
                            addToCart(productName, price);
                        } else {
                            console.error('addToCart function not found');
                        }
                    }
                }
            });
        }
    });
});

// Scroll effect for navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    }
});

// Animate numbers in stats section
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Start counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const counters = entry.target.querySelectorAll('.stat-item h3');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                if (!isNaN(target)) {
                    animateCounter(counter, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Product card click handler
document.querySelectorAll('.product-card, .product-card-large').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function (e) {
        if (e.target.tagName !== 'BUTTON') {
            const productName = this.querySelector('h3').textContent;
            console.log(`Clicked on ${productName}`);
        }
    });
});

// Close mobile menu when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
    }
});

// Lazy loading images (if you add image tags later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Banarasi Paan website loaded successfully! 🍃');
