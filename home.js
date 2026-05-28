const container =
document.getElementById("productsContainer");

categories.forEach(category => {

    container.innerHTML += `

    <div class="card">

        <img src="${category.image}"
        class="product-image">

        <h2>${category.name}</h2>

        <p>${category.description}</p>

        <button onclick="location.href='category.html?type=${category.slug}'">

            View Product

        </button>

    </div>
    `;
});

