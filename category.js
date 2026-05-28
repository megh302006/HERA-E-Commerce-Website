const params =
new URLSearchParams(window.location.search);

const category =
params.get("type");

const title =
document.getElementById("categoryTitle");

const container =
document.getElementById("productsContainer");

title.innerText =
category.toUpperCase();

const filteredProducts =
products.filter(product =>
product.category === category);

filteredProducts.forEach(product => {

    container.innerHTML += `

    <div class="product-card">

        <div class="image-wrapper">

            <img src="${product.image}"
            class="product-image">

        </div>

        <a href="#"
        class="product-name">

            ${product.name}

        </a>

        <p class="product-description">

            ${product.description}

        </p>

        <div class="product-footer">

            <p class="price">

                ₹${product.price}

            </p>

            <div class="product-actions">

                <button class="cart-btn"
                onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

                

            </div>

        </div>

    </div>
    `;
});