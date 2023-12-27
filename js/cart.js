let iconSpan = document.getElementById('login-close')
let listCartHTML = document.getElementById('product-cart-container')
let iconCart = document.getElementById('cart-amount')
let products = []
let cart = JSON.parse(localStorage.getItem("cartMemory")) || [];
let cartTotal = document.getElementById('product-cart-total')

/* ====================== ADD DATA FROM JSON FOR CART.JS ====================== */
const initApp = () => {
    fetch('data/data_products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        totaltoHTML()
        addCartToHTML()
    }) 
}
initApp();

/* ====================== ADD CART TO HTML ====================== */
const addCartToHTML = () => {
    if (cart.length > 0){
        listCartHTML.innerHTML = '';
        cart.forEach(item => {
            let newItem = document.createElement('div');
            newItem.classList.add('product__cart__card');
            newItem.classList.add('grid');
            newItem.dataset.id=item.id_product;
            let positionProduct = products.findIndex((value) => value.id == item.id_product);
            let info = products[positionProduct];
            newItem.innerHTML=
                `<div class="product__cart__images">
                    <div class="product__cart__image">
                        <img src="img/img_shop/bracelet/pd_back.png " class="product__cart__back" alt="">
                        <img src="${info.img}" class="product__cart__img" alt="">    
                    </div>
                </div>
                <div class="product__cart__description">
                    <div class="product__cart__name">${info.name}</div>
                    <div>
                        <span class="product__cart__discount">฿${info.discount}</span>
                        <span class="product__cart__price">฿${info.price}</span>
                    </div>
                    <div class="product__cart_quantity">
                        <i class="ri-subtract-line btn__reduce" id="btn-reduce"></i>
                        <span class="product_quantity">${item.quantity}</span>
                        <i class="ri-add-line btn__add" id="btn-add"></i>
                        <i class="ri-close-fill btn_del" id=""></i>
                    </div>
                </div>`;
            listCartHTML.appendChild(newItem);
        });
    }
}

/* ====================== ADD REDUCE DELETE PRODUCT ====================== */
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('btn__reduce') || positionClick.classList.contains('btn__add') || positionClick.classList.contains('btn_del')) {
        let id_product = positionClick.parentElement.parentElement.parentElement.dataset.id;
        let type = 'reduce';
        if (positionClick.classList.contains('btn__add')){
            type = 'add';
        }
        if (positionClick.classList.contains('btn_del')){
            type = 'delete'
        };
        changeQuantityCart(id_product,type);
    }
})

const changeQuantityCart = (id_product,type) => {
    let positionItemInCart = cart.findIndex((value) => value.id_product == id_product);
    if (positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'add':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            
            case 'reduce':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity - 1;
                if (cart[positionItemInCart].quantity < 1){
                    cart.splice(positionItemInCart, 1);
                }
                break;

            case 'delete':
                cart.splice(positionItemInCart, 1);
                break;

        }totaltoHTML
    }
    addCartToHTML();
    totalQuantity();
    addCarttoMomory();
    totaltoHTML()
}

/* ====================== CALCULATE TOTAL AND ADD TO HTML ====================== */
const totaltoHTML = () => {
    if (cart.length !== 0){
        let amount = cart.map((cartData) => {
            let productData = products.find((value) => value.id == cartData.id_product);
            return productData.discount * cartData.quantity ;
        }).reduce((x, y) => x + y , 0);
        let totalQuantity = 0;
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
        });
        let delivery = 30;
        let total = amount + delivery;
        cartTotal.innerHTML = 
        `<div class="cart__total__title">
            ORDER SUMMARY
        </div>
        <div>
            <div>
                <span>${totalQuantity} items</span>
                <span>฿${amount}</span>
            </div>
            <div>
                <span>Delivery</span>
                <span>฿${delivery}</span>
            </div>
            <div>
                <span>Total</span>
                <span>฿${total}</span>
            </div>
        </div>
        <a href="#checkout" class="cart__checkout button">CHECKOUT</a>`;
    }else {
        cartTotal.innerHTML = '';
        listCartHTML.innerHTML = 
        `<div class="cart__empty">
            <div class="cart__empty__title">
                <h3>Your bag is empty</h3>
                <p>Once you add something to your bag - it will appear here. Ready to get started?</p>
            </div>
            <a href="shop_index.html" class="cart__start button">GET STARTED</a>
            
        </div>`;
    }
};

/* ====================== CHECKOUT ====================== */
let  checkoutContent = document.getElementById('checkout');
let checkoutClose = document.getElementById('checkout-close');

/* ====================== CHECKOUT SHOW ====================== */
cartTotal.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('cart__checkout')){
        checkoutContent.classList.add('checkout-active')
    }
    }
);

/*=============== CHECKUOT HIDDEN ===============*/
if(checkoutClose){
    checkoutClose.addEventListener('click', () => {
        checkoutContent.classList.remove('checkout-active')
    })
}

/* ====================== ADD CART DATA TO LOCALSTORAGE ====================== */
const addCarttoMomory = () => {
    localStorage.setItem('cartMemory',JSON.stringify(cart));
}

/* ====================== TOTAL QTY CART ICON ====================== */
const totalQuantity = () => {
    let totalQuantity = 0;
    if (cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
        });
    };
    iconCart.innerHTML = totalQuantity;
};
totalQuantity();