let cart =
JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart(){

    const isOpen =
    document.body.classList.contains("cart-open");

    const sidebar =
    document.getElementById("sidebar");

    const overlay =
    document.getElementById("overlay");

    if(isOpen){

        document.body.classList.remove("cart-open");

        overlay.classList.remove("active");

    } else {

        /* Close nav sidebar if open */

        if(sidebar){
            sidebar.classList.add("collapsed");
        }

        document.body.classList.add("cart-open");

        overlay.classList.add("active");
    }
}

function addToCart(id){

    const product =
    products.find(item => item.id === id);

    const existing =
    cart.find(item => item.id === id);

    if(existing){

        existing.quantity += 1;
    }

    else{

        cart.push({
            ...product,
            quantity:1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    renderCart();
}

function increaseQuantity(id){

    const item =
    cart.find(product => product.id === id);

    item.quantity += 1;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    renderCart();
}

function decreaseQuantity(id){

    const item =
    cart.find(product => product.id === id);

    item.quantity -= 1;

    if(item.quantity <= 0){

        cart =
        cart.filter(product =>
        product.id !== id);
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    renderCart();
}

function updateCartCount(){

    const count =
    document.getElementById("cartCount");

    if(!count) return;

    const total =
    cart.reduce((sum,item)=>
    sum + item.quantity,0);

    count.innerText = total;
}

function renderCart(){

    const cartItems =
    document.getElementById("cartItems");

    const cartTotal =
    document.getElementById("cartTotal");

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-details">

                <h4>${item.name}</h4>

                <p>

                    ₹${item.price}

                </p>

                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${item.id})">

                        −

                    </button>

                    <span>

                        ${item.quantity}

                    </span>

                    <button onclick="increaseQuantity(${item.id})">

                        +

                    </button>

                </div>

            </div>

        </div>
        `;
    });

    if(cartTotal){

        cartTotal.innerText =
        `₹${total}`;
    }
}

window.onload = () => {

    updateCartCount();

    renderCart();
};

function placeOrder(){

    if(cart.length === 0){

        alert("Your cart is empty.");

        return;
    }

    let message =
    `Hello, I would like to place an order.%0A%0A`;

    let total = 0;

    cart.forEach(item => {

        const itemTotal =
        item.price * item.quantity;

        total += itemTotal;

        message +=
        `• ${item.name}%0A` +

        `Quantity: ${item.quantity}%0A` +

        `Price: ₹${item.price}%0A` +

        `Subtotal: ₹${itemTotal}%0A%0A`;
    });

    message +=
    `Total Amount: ₹${total}`;

    /* SELLER NUMBER */

    const phoneNumber =
    "911234567890";

    window.open(

        `https://wa.me/${phoneNumber}?text=${message}`,

        "_blank"
    );
}