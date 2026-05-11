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

// Back to Top Button
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// WhatsApp Order Button
function openWhatsApp() {
    const phone = '919876543210'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Hi! I would like to place an order for Banarasi Paan. Can you help me?');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Search Functionality
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-item, .product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        if (productName.includes(query) || description.includes(query) || query === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Debounce search for better performance
function debounce(func, delay) {
    let timeoutId;
    return function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
    };
}

const debouncedSearch = debounce(searchProducts, 300);

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debouncedSearch);
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
});

// Product Comparison
let compareProducts = [];

function toggleCompare(productName, price) {
    const existingProduct = compareProducts.find(p => p.name === productName);

    if (existingProduct) {
        compareProducts = compareProducts.filter(p => p.name !== productName);
    } else {
        if (compareProducts.length >= 3) {
            alert('You can compare up to 3 products only');
            return;
        }
        compareProducts.push({ name: productName, price: price });
    }

    updateCompareButton();
}

function updateCompareButton() {
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        compareBtn.textContent = `Compare (${compareProducts.length})`;
        compareBtn.style.display = compareProducts.length > 0 ? 'block' : 'none';
    }
}

function showComparison() {
    if (compareProducts.length === 0) {
        alert('Please select products to compare');
        return;
    }

    let comparisonHTML = '<div class="comparison-modal"><div class="comparison-content"><h3>Product Comparison</h3><table>';
    comparisonHTML += '<tr><th>Product</th><th>Price</th><th>Action</th></tr>';

    compareProducts.forEach(product => {
        comparisonHTML += `<tr>
            <td>${product.name}</td>
            <td>₹${product.price}</td>
            <td><button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button></td>
        </tr>`;
    });

    comparisonHTML += '</table><button onclick="closeComparison()">Close</button></div></div>';

    const modal = document.createElement('div');
    modal.innerHTML = comparisonHTML;
    modal.id = 'comparisonModal';
    document.body.appendChild(modal);
}

function closeComparison() {
    const modal = document.getElementById('comparisonModal');
    if (modal) {
        modal.remove();
    }
}

// Cookie Consent Banner
function initCookieConsent() {
    const consentBanner = document.getElementById('cookieConsent');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const rejectCookiesBtn = document.getElementById('rejectCookies');

    if (!consentBanner) return;

    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
        consentBanner.style.display = 'none';
        return;
    }

    consentBanner.style.display = 'block';

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            consentBanner.style.display = 'none';
            // Load analytics here
            console.log('Cookies accepted');
        });
    }

    if (rejectCookiesBtn) {
        rejectCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            consentBanner.style.display = 'none';
            console.log('Cookies rejected');
        });
    }
}

document.addEventListener('DOMContentLoaded', initCookieConsent);

console.log('Banarasi Paan website loaded successfully! 🍃');
