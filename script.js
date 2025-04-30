// Placeholder for customer login
function customerLogin() {
    const email = document.getElementById('customerEmail').value.trim();
    const password = document.getElementById('customerPassword').value.trim();
    const message = document.getElementById('loginMessage');
  
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
  
    const customer = customers.find(c => c.email === email && c.password === password);
  
    if (customer) {
      localStorage.setItem('loggedInUser', JSON.stringify(customer));
      message.style.color = "green";
      message.textContent = "Login successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "customer-profile.html";
      }, 1500);
    } else {
      message.style.color = "red";
      message.textContent = "Invalid email or password.";
    }
  }
// Placeholder for customer sign up
function customerSignUp() {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const shipping = document.getElementById('customerShipping').value.trim();
    const password = document.getElementById('customerPassword').value.trim();
    const message = document.getElementById('signupMessage');
  
    if (!name || !email || !address || !phone || !shipping || !password) {
      message.style.color = "red";
      message.textContent = "Please fill in all fields.";
      return;
    }
  
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    
    const newCustomer = {
      id: Date.now(),
      name,
      email,
      address,
      phone,
      shippingAddress: shipping,
      password
    };
  
    customers.push(newCustomer);
    localStorage.setItem('customers', JSON.stringify(customers));
  
    message.style.color = "green";
    message.textContent = "Account created! Redirecting to login...";
    setTimeout(() => {
      window.location.href = "customer-login.html";
    }, 1500);
  }
// Populate customer profile if on customer-profile.html
document.addEventListener('DOMContentLoaded', () => {
    if (document.title.includes('Customer Profile')) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) {
        window.location.href = "customer-login.html"; // Redirect if not logged in
        return;
      }
      document.getElementById('customerNameDisplay').textContent = user.name;
      document.getElementById('customerEmailDisplay').textContent = user.email;
      document.getElementById('customerAddressDisplay').textContent = user.address;
      document.getElementById('customerShippingDisplay').textContent = user.shippingAddress;
      document.getElementById('customerPhoneDisplay').textContent = user.phone;
    }
  });
  
  // Logout function
  function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
  }
// Seller Sign Up
function sellerSignUp() {
    const name = document.getElementById('sellerName').value.trim();
    const email = document.getElementById('sellerEmailSignup').value.trim();
    const address = document.getElementById('sellerAddress').value.trim();
    const phone = document.getElementById('sellerPhone').value.trim();
    const password = document.getElementById('sellerPasswordSignup').value.trim();
    const message = document.getElementById('sellerSignupMessage');
  
    if (!name || !email || !address || !phone || !password) {
      message.style.color = "red";
      message.textContent = "Please fill in all fields.";
      return;
    }
  
    const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
  
    const newSeller = {
      id: Date.now(),
      name,
      email,
      address,
      phone,
      rating: 5,
      itemsSold: 0,
      password
    };
  
    sellers.push(newSeller);
    localStorage.setItem('sellers', JSON.stringify(sellers));
  
    message.style.color = "green";
    message.textContent = "Account created! Redirecting to login...";
    setTimeout(() => {
      window.location.href = "seller-login.html";
    }, 1500);
  }
  
  // Seller Login
  function sellerLogin() {
    const email = document.getElementById('sellerEmail').value.trim();
    const password = document.getElementById('sellerPassword').value.trim();
    const message = document.getElementById('sellerLoginMessage');
  
    const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
  
    const seller = sellers.find(s => s.email === email && s.password === password);
  
    if (seller) {
      localStorage.setItem('loggedInUser', JSON.stringify(seller));
      message.style.color = "green";
      message.textContent = "Login successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "seller-dashboard.html";
      }, 1500);
    } else {
      message.style.color = "red";
      message.textContent = "Invalid email or password.";
    }
  }
  
  // Populate seller dashboard
  document.addEventListener('DOMContentLoaded', () => {
    if (document.title.includes('Seller Dashboard')) {
      const seller = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!seller) {
        window.location.href = "seller-login.html";
        return;
      }
      document.getElementById('sellerNameDisplay').textContent = seller.name;
      document.getElementById('sellerEmailDisplay').textContent = seller.email;
      document.getElementById('sellerAddressDisplay').textContent = seller.address;
      document.getElementById('sellerPhoneDisplay').textContent = seller.phone;
    }
  });
// Customer Cart Logic
document.addEventListener('DOMContentLoaded', () => {
    if (document.title.includes('My Carts')) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) {
        window.location.href = "customer-login.html";
        return;
      }
  
      const carts = JSON.parse(localStorage.getItem(`carts_${user.id}`)) || [];
      const cartsList = document.getElementById('cartsList');
  
      if (carts.length === 0) {
        cartsList.innerHTML = "<p>No carts yet. Create your first cart!</p>";
      } else {
        cartsList.innerHTML = carts.map((cart, index) => `
          <div style="border: 1px solid #ccc; padding: 1rem; margin-top: 1rem;">
            <h4>Cart ${index + 1}</h4>
            <p>Items: ${cart.items.length}</p>
            <button onclick="viewCart(${index})">View Cart</button>
          </div>
        `).join('');
      }
    }
  });
  
  function createNewCart() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      window.location.href = "customer-login.html";
      return;
    }
  
    const cartsKey = `carts_${user.id}`;
    const carts = JSON.parse(localStorage.getItem(cartsKey)) || [];
  
    // Push a new cart
    carts.push({ items: [] });
  
    // Save it back
    localStorage.setItem(cartsKey, JSON.stringify(carts));
  
    // Reload to show it
    location.reload();
  }

  
  function viewCart(index) {
    alert("Cart viewing coming soon! (We'll build this next!)");
  }
// View Cart Page
document.addEventListener('DOMContentLoaded', () => {
    if (document.title.includes('View Cart')) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) {
        window.location.href = "customer-login.html";
        return;
      }
  
      const cartIndex = localStorage.getItem('selectedCartIndex');
      const carts = JSON.parse(localStorage.getItem(`carts_${user.id}`)) || [];
  
      if (!carts[cartIndex]) {
        document.getElementById('cartItems').innerHTML = "<p>Cart not found.</p>";
        return;
      }
  
      const cart = carts[cartIndex];
      const cartItemsDiv = document.getElementById('cartItems');
  
      if (cart.items.length === 0) {
        cartItemsDiv.innerHTML = "<p>This cart is empty.</p>";
      } else {
        cartItemsDiv.innerHTML = cart.items.map((item, index) => `
          <div style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd;">
            <strong>${item.name}</strong><br>
            Price: $${item.price} <br>
            Quantity: ${item.quantity}
          </div>
        `).join('');
      }
    }
  });
  
  function viewCart(index) {
    localStorage.setItem('selectedCartIndex', index);
    window.location.href = "cart-view.html";
  }
  
  // Checkout Cart
  function checkoutCart() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const cartIndex = localStorage.getItem('selectedCartIndex');
    const carts = JSON.parse(localStorage.getItem(`carts_${user.id}`)) || [];
  
    if (!carts[cartIndex]) {
      alert("Cart not found.");
      return;
    }
  
    const cart = carts[cartIndex];
  
    if (cart.items.length === 0) {
      alert("Cart is empty!");
      return;
    }
  
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    const newTransaction = {
      customerId: user.id,
      cartItems: cart.items,
      date: new Date().toLocaleString(),
      totalPrice: cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
  
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  
    // Empty the cart
    carts[cartIndex].items = [];
    localStorage.setItem(`carts_${user.id}`, JSON.stringify(carts));
  
    alert("Purchase completed successfully!");
    window.location.href = "customer-carts.html";
  }
// View Customer Transactions
document.addEventListener('DOMContentLoaded', () => {
    if (document.title.includes('My Transactions')) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) {
        window.location.href = "customer-login.html";
        return;
      }
  
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      const customerTransactions = transactions.filter(t => t.customerId === user.id);
  
      const transactionList = document.getElementById('transactionList');
  
      if (customerTransactions.length === 0) {
        transactionList.innerHTML = "<p>No transactions found.</p>";
      } else {
        transactionList.innerHTML = customerTransactions.map((trans, idx) => `
          <div style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem;">
            <h4>Transaction ${idx + 1}</h4>
            <p><strong>Date:</strong> ${trans.date}</p>
            <p><strong>Total:</strong> $${trans.totalPrice.toFixed(2)}</p>
            <p><strong>Items:</strong></p>
            <ul>
              ${trans.cartItems.map(item => `<li>${item.name} x${item.quantity}</li>`).join('')}
            </ul>
          </div>
        `).join('');
      }
    }
  });
// Seller Product Logic
document.addEventListener('DOMContentLoaded', () => {
    if (document.title.includes('My Products')) {
      const seller = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!seller) {
        window.location.href = "seller-login.html";
        return;
      }
  
      const products = JSON.parse(localStorage.getItem(`products_${seller.id}`)) || [];
      const productList = document.getElementById('productList');
  
      if (products.length === 0) {
        productList.innerHTML = "<p>No products listed yet.</p>";
      } else {
        productList.innerHTML = products.map((p, idx) => `
          <div style="border: 1px solid #ccc; padding: 1rem; margin-top: 1rem;">
            <h4>${p.name}</h4>
            <p><strong>Category:</strong> ${p.category}</p>
            <p><strong>Price:</strong> $${p.price}</p>
            <p><strong>Stock:</strong> ${p.stock}</p>
            <p><strong>Description:</strong> ${p.description}</p>
          </div>
        `).join('');
      }
    }
  });
  
  // Add Product
  function addProduct() {
    const seller = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!seller) {
      window.location.href = "seller-login.html";
      return;
    }
  
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value.trim());
    const stock = parseInt(document.getElementById('productStock').value.trim());
    const image = document.getElementById('productImage').value.trim();
  
    if (!name || !category || !description || isNaN(price) || isNaN(stock) || !image) {
      alert("Please fill in all fields correctly.");
      return;
    }
  
    const products = JSON.parse(localStorage.getItem(`products_${seller.id}`)) || [];
  
    const newProduct = {
      id: Date.now(),
      name,
      category,
      description,
      price,
      stock,
      image,  // NEW
      sellerId: seller.id
    };
  
    products.push(newProduct);
    localStorage.setItem(`products_${seller.id}`, JSON.stringify(products));
  
    alert("Product listed successfully!");
    location.reload();
  }
  
// SHOP: View all products from all sellers
// SHOP: View all products from all sellers
document.addEventListener('DOMContentLoaded', () => {
  if (document.title.includes('Shop')) {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      window.location.href = "customer-login.html";
      return;
    }

    const shopProductList = document.getElementById('shopProductList');
    let allProducts = [];

    // Collect all products from all sellers
    for (let key in localStorage) {
      if (key.startsWith('products_')) {
        const sellerProducts = JSON.parse(localStorage.getItem(key)) || [];
        allProducts = allProducts.concat(sellerProducts);
      }
    }

    if (allProducts.length === 0) {
      shopProductList.innerHTML = "<p>No products available yet.</p>";
    } else {
      shopProductList.innerHTML = allProducts.map((p, idx) => `
        <div style="border: 1px solid #ccc; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); text-align:center;">
          <img src="${p.image}" alt="${p.name}" style="width:100%; height:200px; object-fit:cover; border-radius:6px; margin-bottom:1rem;">
          <h4>${p.name}</h4>
          <p><strong>Category:</strong> ${p.category}</p>
          <p><strong>Price:</strong> $${p.price.toFixed(2)}</p>
          <p style="height:50px; overflow:hidden;">${p.description}</p>
          <button onclick="addToCart(${p.id})" style="margin-top: 1rem;">Add to Cart</button>
        </div>
      `).join('');
    }

    window.availableProducts = allProducts; // Save globally
  }
});

// Add product to selected cart
function addToCart(productId) {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const cartIndex = localStorage.getItem('selectedCartIndex');
  
  if (cartIndex === null) {
    alert("Please create or select a cart first!");
    window.location.href = "customer-carts.html";
    return;
  }

  const carts = JSON.parse(localStorage.getItem(`carts_${user.id}`)) || [];
  const cart = carts[cartIndex];

  const product = window.availableProducts.find(p => p.id === productId);

  if (!product) {
    alert("Product not found.");
    return;
  }

  const existingItem = cart.items.find(item => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  localStorage.setItem(`carts_${user.id}`, JSON.stringify(carts));
  alert(`${product.name} added to cart!`);
}

  // Update Transaction List Loader
  document.addEventListener('DOMContentLoaded', () => {
    if (document.title.includes('My Transactions')) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) {
        window.location.href = "customer-login.html";
        return;
      }
  
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      const customerTransactions = transactions.filter(t => t.customerId === user.id);
  
      const transactionList = document.getElementById('transactionList');
  
      if (customerTransactions.length === 0) {
        transactionList.innerHTML = "<p>No transactions found.</p>";
      } else {
        transactionList.innerHTML = customerTransactions.map((trans, tIndex) => `
          <div style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem;">
            <h4>Transaction ${tIndex + 1}</h4>
            <p><strong>Date:</strong> ${trans.date}</p>
            <p><strong>Total:</strong> $${trans.totalPrice.toFixed(2)}</p>
            <p><strong>Items:</strong></p>
            <ul>
              ${trans.cartItems.map((item, iIndex) => `
                <li>
                  ${item.name} x${item.quantity} 
                  <button style="margin-left: 0.5rem;" onclick="startReturn(${tIndex}, ${iIndex})">Return</button>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('');
      }
    }
  });
  
  // Start a return
  function startReturn(tIndex, iIndex) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const transaction = transactions.filter(t => t.customerId === user.id)[tIndex];
  
    itemToReturn = transaction.cartItems[iIndex];
    transactionIndex = tIndex;
  
    document.getElementById('returnForm').style.display = "block";
    document.getElementById('returnItemName').textContent = itemToReturn.name;
  }
  
  // Submit the return
  function submitReturn() {
    const reason = document.getElementById('returnReason').value.trim();
    if (!reason) {
      alert("Please provide a return reason.");
      return;
    }
  
    alert(`Return Submitted!\nReason: ${reason}`);
  
    // OPTIONAL: If reason is good (resellable), restock
    const resellable = confirm("Is the product still in good condition for resale?");
  
    if (resellable) {
      // Find product and restock
      for (let key in localStorage) {
        if (key.startsWith('products_')) {
          const products = JSON.parse(localStorage.getItem(key)) || [];
          const product = products.find(p => p.name === itemToReturn.name);
          if (product) {
            product.stock += 1;
            localStorage.setItem(key, JSON.stringify(products));
            break;
          }
        }
      }
    }
  
    // Clear return form
    document.getElementById('returnForm').style.display = "none";
    document.getElementById('returnReason').value = "";
  
    // Optionally you could also record the return in a new "returns" storage
  }
// Admin Panel Loader
document.addEventListener('DOMContentLoaded', () => {
    if (document.title.includes('Admin Panel')) {
      // Load customers
      const customers = JSON.parse(localStorage.getItem('customers')) || [];
      document.getElementById('customerList').innerHTML = customers.length > 0
        ? customers.map(c => `<p><strong>${c.name}</strong> (${c.email})</p>`).join('')
        : "<p>No customers found.</p>";
  
      // Load sellers
      const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
      document.getElementById('sellerList').innerHTML = sellers.length > 0
        ? sellers.map(s => `<p><strong>${s.name}</strong> (${s.email})</p>`).join('')
        : "<p>No sellers found.</p>";
  
      // Load all products
      let allProducts = [];
      for (let key in localStorage) {
        if (key.startsWith('products_')) {
          const sellerProducts = JSON.parse(localStorage.getItem(key)) || [];
          allProducts = allProducts.concat(sellerProducts);
        }
      }
  
      document.getElementById('productList').innerHTML = allProducts.length > 0
        ? allProducts.map(p => `<p><strong>${p.name}</strong> ($${p.price.toFixed(2)}) - ${p.stock} in stock</p>`).join('')
        : "<p>No products found.</p>";
  
      // Load all transactions
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      document.getElementById('transactionList').innerHTML = transactions.length > 0
        ? transactions.map((t, idx) => `
            <div style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem;">
              <strong>Transaction ${idx + 1}</strong><br>
              Customer ID: ${t.customerId}<br>
              Date: ${t.date}<br>
              Total: $${t.totalPrice.toFixed(2)}<br>
              Items: ${t.cartItems.length}
            </div>
          `).join('')
        : "<p>No transactions found.</p>";
    }
  });
// Load Profile Data
document.addEventListener('DOMContentLoaded', () => {
  if (document.title.includes('My Profile')) {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      window.location.href = "customer-login.html";
      return;
    }

    const profileSection = document.getElementById('profileDetails');

    profileSection.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      ${user.address ? `<p><strong>Address:</strong> ${user.address}</p>` : ''}
      ${user.phone ? `<p><strong>Phone:</strong> ${user.phone}</p>` : ''}
      ${user.shippingAddress ? `<p><strong>Shipping Address:</strong> ${user.shippingAddress}</p>` : ''}
      ${user.rating !== undefined ? `<p><strong>Seller Rating:</strong> ${user.rating} ⭐</p>` : ''}
      ${user.itemsSold !== undefined ? `<p><strong>Items Sold:</strong> ${user.itemsSold}</p>` : ''}
    `;
  }
});
// Edit Profile Loader
document.addEventListener('DOMContentLoaded', () => {
  if (document.title.includes('Edit Profile')) {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      window.location.href = "customer-login.html";
      return;
    }

    document.getElementById('editName').value = user.name || '';
    document.getElementById('editEmail').value = user.email || '';
    document.getElementById('editAddress').value = user.address || '';
    document.getElementById('editPhone').value = user.phone || '';
    document.getElementById('editShipping').value = user.shippingAddress || '';
  }
});

// Save Profile Changes
function saveProfile() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!user) {
    window.location.href = "customer-login.html";
    return;
  }

  user.name = document.getElementById('editName').value.trim();
  user.email = document.getElementById('editEmail').value.trim();
  user.address = document.getElementById('editAddress').value.trim();
  user.phone = document.getElementById('editPhone').value.trim();
  user.shippingAddress = document.getElementById('editShipping').value.trim();

  // Update in customers or sellers array
  const key = user.rating !== undefined ? 'sellers' : 'customers';
  const list = JSON.parse(localStorage.getItem(key)) || [];
  const idx = list.findIndex(u => u.id === user.id);
  
  if (idx !== -1) {
    list[idx] = user;
    localStorage.setItem(key, JSON.stringify(list));
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    document.getElementById('editMessage').style.color = "green";
    document.getElementById('editMessage').textContent = "Profile updated successfully!";
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 1500);
  } else {
    document.getElementById('editMessage').style.color = "red";
    document.getElementById('editMessage').textContent = "Error saving profile.";
  }
}
// Admin Statistics Loader
document.addEventListener('DOMContentLoaded', () => {
  if (document.title.includes('Admin Statistics')) {
    const statsDashboard = document.getElementById('statsDashboard');

    // Load total customers
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    const totalCustomers = customers.length;

    // Load total sellers
    const sellers = JSON.parse(localStorage.getItem('sellers')) || [];

    // Load total products
    let allProducts = [];
    for (let key in localStorage) {
      if (key.startsWith('products_')) {
        const sellerProducts = JSON.parse(localStorage.getItem(key)) || [];
        allProducts = allProducts.concat(sellerProducts);
      }
    }
    const totalProducts = allProducts.length;

    // Load total carts created
    let totalCarts = 0;
    for (let key in localStorage) {
      if (key.startsWith('carts_')) {
        const carts = JSON.parse(localStorage.getItem(key)) || [];
        totalCarts += carts.length;
      }
    }

    // Load total transactions and revenue
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const totalTransactions = transactions.length;
    const totalRevenue = transactions.reduce((sum, trans) => sum + trans.totalPrice, 0);

    // Display Stats
    statsDashboard.innerHTML = `
      <div style="padding: 1rem; margin-bottom: 1rem; border: 1px solid #ccc;">
        <h3>Total Registered Customers: ${totalCustomers}</h3>
        <h3>Total Registered Sellers: ${sellers.length}</h3>
        <h3>Total Products Listed: ${totalProducts}</h3>
        <h3>Total Carts Created: ${totalCarts}</h3>
        <h3>Total Transactions Completed: ${totalTransactions}</h3>
        <h3>Total Revenue: $${totalRevenue.toFixed(2)}</h3>
      </div>
    `;
  }
});
// ==============================
// CART PREVIEW Page
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  if (document.title.includes('Cart Preview')) {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      window.location.href = "customer-login.html";
      return;
    }

    const cartIndex = localStorage.getItem('selectedCartIndex');
    const carts = JSON.parse(localStorage.getItem(`carts_${user.id}`)) || [];

    if (!carts[cartIndex] || carts[cartIndex].items.length === 0) {
      document.getElementById('cartContents').innerHTML = "<p>Your cart is empty. Start shopping!</p>";
      document.getElementById('cartSummary').style.display = "none";
      return;
    }

    renderCart(); // Call the external function
  }
});

// ==============================
// RENDER CART WITH CONTROLS
// ==============================
function renderCart() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const cartIndex = localStorage.getItem('selectedCartIndex');
  const carts = JSON.parse(localStorage.getItem(`carts_${user.id}`)) || [];
  const cart = carts[cartIndex];

  const cartContents = document.getElementById('cartContents');
  const cartSummary = document.getElementById('cartSummary');

  if (!cart || cart.items.length === 0) {
    cartContents.innerHTML = "<p>Your cart is empty.</p>";
    cartSummary.style.display = "none";
    return;
  }

  let total = 0;
  let html = '';

  cart.items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
      <div style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem;">
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <label>Quantity:</label>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
        <p>Subtotal: $${itemTotal.toFixed(2)}</p>
        <button onclick="removeItem(${index})" style="margin-top: 0.5rem;">Remove</button>
      </div>
    `;
  });

  cartContents.innerHTML = html;
  cartSummary.style.display = "block";
  cartSummary.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Checkout Cart (reuse from previous)
function checkoutCart() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const cartIndex = localStorage.getItem('selectedCartIndex');
  const carts = JSON.parse(localStorage.getItem(`carts_${user.id}`)) || [];

  if (!carts[cartIndex]) {
    alert("Cart not found.");
    return;
  }

  const cart = carts[cartIndex];

  if (cart.items.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
  const newTransaction = {
    customerId: user.id,
    cartItems: cart.items,
    date: new Date().toLocaleString(),
    totalPrice: cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  };

  transactions.push(newTransaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Empty the cart
  carts[cartIndex].items = [];
  localStorage.setItem(`carts_${user.id}`, JSON.stringify(carts));

  alert("Purchase completed successfully!");
  window.location.href = "transactions.html";
}
function updateQuantity(index, newQty) {
  const qty = parseInt(newQty);
  if (isNaN(qty) || qty < 1) return;

  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const cartIndex = localStorage.getItem('selectedCartIndex');
  const carts = JSON.parse(localStorage.getItem(`carts_${user.id}`)) || [];

  carts[cartIndex].items[index].quantity = qty;
  localStorage.setItem(`carts_${user.id}`, JSON.stringify(carts));
  renderCart(); // re-render with updated quantity
}

function removeItem(index) {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const cartIndex = localStorage.getItem('selectedCartIndex');
  const carts = JSON.parse(localStorage.getItem(`carts_${user.id}`)) || [];

  carts[cartIndex].items.splice(index, 1); // remove from cart
  localStorage.setItem(`carts_${user.id}`, JSON.stringify(carts));
  renderCart(); // re-render after removal
}

document.addEventListener("DOMContentLoaded", () => {
  const navProfileLink = document.getElementById("profileLinkNav");
  const loginLink = document.getElementById("loginNav"); // Optional
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (navProfileLink) {
    if (user && user.name) {
      navProfileLink.textContent = "Profile";
      navProfileLink.href = "profile.html";
    } else {
      navProfileLink.textContent = "Please login first";
      navProfileLink.href = "customer-login.html";
    }
  }

  // Optional: hide login link if already logged in
  if (loginLink && user) {
    loginLink.style.display = "none";
  }
});
// Toggle dark mode
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('darkModeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Load dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) document.body.classList.add('dark-mode');
  }
});

if (document.title.includes('My Carts')) {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    window.location.href = "customer-login.html";
    return;
  }

  document.getElementById("customerNameDisplay").textContent = `${user.name}'s`;

  const carts = JSON.parse(localStorage.getItem(`carts_${user.id}`)) || [];
  const cartsList = document.getElementById('cartsList');

  if (carts.length === 0) {
    cartsList.innerHTML = "<p style='text-align:center;'>🛒 You don't have any carts yet.</p>";
  } else {
    cartsList.innerHTML = carts.map((cart, index) => `
      <div class="cart-card">
        <h4>🧺 Cart ${index + 1}</h4>
        <p><strong>Items:</strong> ${cart.items.length}</p>
        <button onclick="viewCart(${index})">View Cart</button>
      </div>
    `).join('');
  }
}
