let cart = JSON.parse(localStorage.getItem('cart')) || [];

updateCartCount();
loadCart();

function addToCart(productName, productPrice, productImage) {
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
    let floatingCartCount = document.getElementById('floating-cart-count');
    if (floatingCartCount) {
        floatingCartCount.innerText = cart.length;
    }
}

function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    let total = 0;
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('cart-count').textContent = 0;
        document.getElementById('cart-total').textContent = '0.00';
        updateFloatingCartCount();
        return;
    }

    cart.forEach((item, index) => {
        let quantity = item.quantity || 1;
        let subtotal = item.price * quantity;
        total += subtotal;

        cartItemsContainer.innerHTML += `
            <div class="cart-card">
                <h4>${item.name}</h4>
                <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto; margin-bottom: 10px;">
                <p>Unit Price: $${item.price.toFixed(2)}</p>
                <div class="cart-controls">
                    <label>Quantity:</label>
                    <input type="number" min="1" value="${quantity}" onchange="updateQuantity(${index}, this.value)">
                </div>
                <p class="subtotal">Subtotal: $<span id="subtotal-${index}">${subtotal.toFixed(2)}</span></p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
    updateCartCount();
}

function updateQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (quantity < 1) quantity = 1;

    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));

    let subtotal = cart[index].price * cart[index].quantity;
    document.getElementById(`subtotal-${index}`).textContent = subtotal.toFixed(2);

    updateTotal();
}

function updateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * (item.quantity || 1);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function updateFloatingCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('floating-cart-count').innerText = cart.length;
}

// Call the function immediately to refresh the cart count on page load
updateFloatingCartCount();

