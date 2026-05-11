// Shopping Cart Functionality

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('banarasiCart')) || [];

// Update cart display on page load
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateCartCount();
});

// Add item to cart
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1,
            id: Date.now()
        });
    }

    saveCart();
    updateCartCount();
    showAddedNotification(productName);
}

// Add from recommended section
function addToCartFromRecommended(productName, price) {
    addToCart(productName, price);
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    displayCart();
    updateCartCount();
}

// Update quantity
function updateQuantity(itemId, newQuantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            displayCart();
            updateCartCount();
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('banarasiCart', JSON.stringify(cart));
}

// Update cart count badge
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    let html = '<div class="cart-items-list">';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p class="item-price">₹${item.price} each</p>
                </div>

                <div class="item-quantity">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" value="${item.quantity}" min="1"
                        onchange="updateQuantity(${item.id}, this.value)">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>

                <div class="item-total">
                    <p class="total-price">₹${itemTotal}</p>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    cartItemsContainer.innerHTML = html;

    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('subtotal').textContent = '₹' + subtotal;
    document.getElementById('totalQuantity').textContent = totalQuantity + ' items';

    updateDeliveryCharge();
}

// Update delivery charge based on selection
function updateDeliveryCharge() {
    const deliveryType = document.getElementById('deliveryType');
    const deliveryCharge = parseInt(deliveryType.options[deliveryType.selectedIndex].dataset.charge) || 0;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('deliveryCharge').textContent = '₹' + deliveryCharge;

    const total = subtotal + deliveryCharge;
    document.getElementById('total').textContent = '₹' + total;
}

// Apply promo code
function applyPromo() {
    const promoCode = document.getElementById('promoCode').value.toUpperCase();
    const promoMessage = document.getElementById('promoMessage');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let discount = 0;
    let message = '';

    const promoCodes = {
        'WELCOME10': { discount: 10, message: '10% discount applied!' },
        'SAVE50': { discount: 50, message: '₹50 discount applied!' },
        'FIRST100': { discount: 100, message: '₹100 discount applied!' },
        'FESTIVE20': { discount: 0.20, message: '20% discount applied!' }
    };

    if (promoCodes[promoCode]) {
        const promo = promoCodes[promoCode];
        if (typeof promo.discount === 'number' && promo.discount < 1) {
            discount = subtotal * promo.discount;
        } else {
            discount = promo.discount;
        }
        message = promo.message;
        promoMessage.style.color = 'green';
        promoMessage.textContent = '✓ ' + message;
    } else {
        message = 'Invalid promo code';
        promoMessage.style.color = 'red';
        promoMessage.textContent = '✗ ' + message;
    }

    localStorage.setItem('promoDiscount', discount);
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before checking out.');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryType = document.getElementById('deliveryType').value;
    const deliveryCharge = parseInt(document.getElementById('deliveryType').options[document.getElementById('deliveryType').selectedIndex].dataset.charge) || 0;
    const total = subtotal + deliveryCharge;

    // Store order info
    const orderInfo = {
        items: cart,
        subtotal: subtotal,
        deliveryType: deliveryType,
        deliveryCharge: deliveryCharge,
        total: total,
        date: new Date().toLocaleString()
    };

    localStorage.setItem('orderInfo', JSON.stringify(orderInfo));

    // Redirect to contact/checkout page
    window.location.href = 'contact.html?checkout=true';
}

// Continue shopping
function continueShopping() {
    window.location.href = 'products.html';
}

// Show added notification
function showAddedNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        updateCartCount();
        displayCart();
    }
}

// Update "Add to Cart" button behavior on products page
document.addEventListener('DOMContentLoaded', function() {
    // Find all "Add to Cart" buttons and update them
    const addToCartButtons = document.querySelectorAll('.btn-small');
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.product-card-large') || this.closest('.product-card');
                if (card) {
                    const productName = card.querySelector('h3').textContent;
                    const priceElement = card.querySelector('.price') || card.querySelector('.product-price');

                    if (priceElement) {
                        const priceText = priceElement.textContent;
                        const price = parseInt(priceText.replace('₹', '').trim());

                        if (!isNaN(price)) {
                            addToCart(productName, price);
                        }
                    }
                }
            });
        }
    });
});
