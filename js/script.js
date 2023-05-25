//Open & close cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add('active');
});
closeCart.addEventListener("click", () => {
    cart.classList.remove('active');
});

//Start when the document is ready
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}


// ---------Start-------
function start() {
    addevents();
}

//---------Uptate & Rerender------
function update() {
    addevents();
    updateTotal();
}

//---------Add Events---------
function addevents() {
    //remove items from cat
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    //change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach((input) => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    //Add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });

    //Buy Order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}

//--------- handle events functions-------
let itemAdded = [];

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    // console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // handle item is already exist
    if (itemAdded.find((el) => el.title == newToAdd.title)) {
        alert("This Item Is Already Exist!");
        return;
    } else {
        itemAdded.push(newToAdd);
    }


    //Add product to cart
    let cartBoxElement = cartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();
}

function handle_removeCartItem() {
    this.parentElement.remove();

    itemAdded = itemAdded.filter((el) => el.title != this.parentElement.querySelector(".cart-product-title").innerHTML);

    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); //to keep it integer
    update();
}

function handle_buyOrder() {
    if (itemAdded.length <= 0) {
        alert("There is no Order to place yet! \nPlease Make an order first.");
        return;
    } else {
        const cartContent = cart.querySelector(".cart-content");
        cartContent.innerHTML = '';
        alert("Your Order is Placed Successfully.");
        itemAdded = [];
    }
    update();
}
//---------update & Rerender function------
function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = document.querySelector('.total-price');
    let total = 0;

    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector('.cart-quantity').value;
        total = total + (price * quantity);
    });

    //keep 2 digits afher the decimal point
    total = total.toFixed(2);

    totalElement.innerHTML = "$" + total;
}

//---------HTML Components------

function cartBoxComponent(title, price, imgSrc) {

    return `<div class="cart-box">
                <img src=${imgSrc} alt="" class="cart-img">
                <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity" name="" id="">
            </div>
                    <!-- Remove cart -->
                        <i class='bx bx-trash cart-remove'></i>
            </div>`
}

