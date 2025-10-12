// ------------------ Products Data ------------------
const products = {
  serums: [
    { name: "Vitamin C Serum", price: 599, image: "images/vitaminc.jpg" },
    { name: "Hyaluronic Acid Serum", price: 699, image: "images/hyaluronic.jpg" },
    { name: "Niacinamide Serum", price: 649, image: "images/niacinamide.jpg" },
    { name: "Retinol Serum", price: 749, image: "images/retinol.jpg" },
    { name: "Brightening Serum", price: 799, image: "images/brightening.jpg" }
  ],
  cleansers: [
    { name: "Gentle Cleanser", price: 380, image: "images/gentle.jpg" },
    { name: "Foaming Face Wash", price: 349, image: "images/foaming.jpg" },
    { name: "Oil Control Cleanser", price: 399, image: "images/oil.jpg" },
    { name: "Exfoliating Cleanser", price: 870, image: "images/exfoliating.jpg" },
    { name: "Micellar Cleanser", price: 159, image: "images/micellar.jpg" }
  ],
  facewash: [
    { name: "Neem Face Wash", price: 199, image: "images/neem.jpg" },
    { name: "Charcoal Face Wash", price: 249, image: "images/charcoal.jpg" },
    { name: "Tea Tree Face Wash", price: 299, image: "images/tea.jpg" },
    { name: "Sandal Face Wash", price: 100, image: "images/sandal.jpg" },
    { name: "Glow Face Wash", price: 329, image: "images/glow.jpg" }
  ],
  moisturizers: [
    { name: "Aloe Vera Gel", price: 399, image: "images/aloevera.jpg" },
    { name: "Oil-Free Moisturizer", price: 339, image: "images/oilfree.jpg" },
    { name: "Day Cream SPF30", price: 849, image: "images/day30.jpg" },
    { name: "Night Repair Cream", price: 499, image: "images/night.jpg" },
    { name: "Hydrating Gel", price: 349, image: "images/hydrate.jpg" }
  ],
  perfumes: [
    { name: "Denver Perfume", price: 219, image: "images/denever.jpg" },
    { name: "Bella Vita Luxe", price: 499, image: "images/bella.jpg" },
    { name: "Skinn by Titan", price: 2529, image: "images/skin.jpg" },
    { name: "Fogg Scent", price: 279, image: "images/fogg.jpg" },
    { name: "Wild Stone", price: 349, image: "images/wild.jpg" }
  ],
  powders: [
    { name: "Pond's Dreamflower", price: 150, image: "images/dreamflower.jpg" },
    { name: "Cinthol Talc", price: 130, image: "images/cinthol.jpg" },
    { name: "Nycil Cool Powder", price: 149, image: "images/nycil.jpg" },
    { name: "Dermi Cool", price: 220, image: "images/dermi.jpg" },
    { name: "Navratna Cool Talc", price: 119, image: "images/nav.jpg" }
  ],
  creams: [
    { name: "Fair & Lovely", price: 139, image: "images/FAIR.jpg" },
    { name: "Pond's White Beauty", price: 109, image: "images/white.jpg" },
    { name: "Garnier Light Cream", price: 165, image: "images/light.jpg" },
    { name: "Olay Total Effects", price: 779, image: "images/olay.jpg" },
    { name: "Nivea Soft Cream", price: 175, image: "images/nivea.jpg" }
  ]
};

// ------------------ Render Products ------------------
function renderProducts(sectionId, items) {
  const container = document.getElementById(sectionId);
  if (!container) return;

  container.innerHTML = items.map(product => `
    <div class="product">
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
    </div>
  `).join('');
}

// Render all categories
for (let category in products) {
  renderProducts(`${category}-products`, products[category]);
}

// ------------------ Cart Functions ------------------
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(p => p.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  alert(`${name} added to cart`);
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

document.addEventListener("DOMContentLoaded", updateCartBadge);

// ------------------ Search Function ------------------
const searchBar = document.getElementById("search-bar");
if (searchBar) {
  searchBar.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    for (let category in products) {
      const filteredItems = products[category].filter(product =>
        product.name.toLowerCase().includes(query)
      );
      renderProducts(`${category}-products`, filteredItems);
    }
  });
}

// ------------------ Carousel ------------------
const carousel = document.getElementById('specialCarousel');
if (carousel) {
  const specialProducts = [
    products.serums[0],
    products.facewash[1],
    products.moisturizers[0],
    products.perfumes[1]
  ];

  specialProducts.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')">Add to Cart</button>
    `;
    carousel.appendChild(div);
  });

  // Carousel buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.onclick = () => carousel.scrollBy({ left: -240, behavior: 'smooth' });
  if (nextBtn) nextBtn.onclick = () => carousel.scrollBy({ left: 240, behavior: 'smooth' });

  // Auto-scroll
  let scrollAmount = 0;
  setInterval(() => {
    scrollAmount += 1;
    if (scrollAmount > carousel.scrollWidth - carousel.clientWidth) scrollAmount = 0;
    carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, 50);
}
