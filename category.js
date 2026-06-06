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

    const imageList =
    (product.images && product.images.length > 0)
    ? product.images
    : [product.image];

    const card =
    document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `

    <div class="image-wrapper">

        <img src="${imageList[0]}"
        class="img-base">

        <img src="${imageList[0]}"
        class="img-sweep">

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
    `;

    container.appendChild(card);

    if(imageList.length <= 1) return;

    const imgBase =
    card.querySelector(".img-base");

    const imgSweep =
    card.querySelector(".img-sweep");

    let currentIndex = 0;
    let timeoutId = null;
    let animTimer = null;
    let isHovered = false;
    let isAnimating = false;

    /*
        pendingAction holds what to do
        once the current animation finishes.
        null | "return" | "cycle"
    */
    let pendingAction = null;

    function animate(direction, src, onDone){

        isAnimating = true;

        imgSweep.src = src;

        imgSweep.style.transition = "none";

        imgSweep.style.clipPath =
        direction === "ltr"
        ? "inset(0 100% 0 0)"
        : "inset(0 0 0 100%)";

        /* Force reflow */
        void imgSweep.offsetWidth;

        imgSweep.style.transition =
        "clip-path 0.5s ease";

        imgSweep.style.clipPath =
        "inset(0 0 0 0)";

        clearTimeout(animTimer);

        animTimer = setTimeout(() => {

            imgBase.src = src;

            imgSweep.style.transition = "none";

            imgSweep.style.clipPath =
            "inset(0 100% 0 0)";

            isAnimating = false;

            /*
                After animation completes,
                execute any queued action.
            */

            if(pendingAction === "return"){

                pendingAction = null;

                currentIndex = 0;

                animate("rtl", imageList[0]);

            } else if(
                pendingAction === "cycle"
                && isHovered
            ){

                pendingAction = null;

                runCycle();

            } else if(onDone){

                onDone();
            }

        }, 520);
    }

    function runCycle(){

        if(!isHovered || isAnimating) return;

        currentIndex =
        (currentIndex + 1) % imageList.length;

        animate(
            "ltr",
            imageList[currentIndex],
            () => {
                if(isHovered){
                    timeoutId =
                    setTimeout(runCycle, 1000);
                }
            }
        );
    }

    card.addEventListener("mouseenter", () => {

        isHovered = true;

        clearTimeout(timeoutId);

        if(isAnimating){

            /*
                Something is mid-sweep.
                Queue cycle for when it finishes.
            */
            pendingAction = "cycle";

        } else {

            pendingAction = null;

            currentIndex = 0;

            runCycle();
        }
    });

    card.addEventListener("mouseleave", () => {

        isHovered = false;

        clearTimeout(timeoutId);

        if(isAnimating){

            /*
                Something is mid-sweep.
                Queue return for when it finishes.
            */
            pendingAction = "return";

        } else {

            pendingAction = null;

            currentIndex = 0;

            animate("rtl", imageList[0]);
        }
    });

});