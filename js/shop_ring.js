/* ====================== ADD PRODUCT TO HTML ====================== */
let iconSpan = document.getElementById('login-close'),
    listProductHTML = document.getElementById('products-bracelet-container'),
    iconCart = document.getElementById('cart-amount'),
    products = [],
    cart = [];

const addDataToHTML = () => {
    if (products.length > 0) {
        products.forEach(product => {
            if (product.type == 'ring') {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('products__card');
            newProduct.innerHTML = 
                `<div class="products__image">
                    <img src="img/img_shop/bracelet/pd_back.png" class="products__back" alt="">
                    <img src="${product.img}" class="products__img" alt="">    
                </div>
                <div class="products__description">                        <div class="products__name">${product.name}</div>
                    <span class="products__discount">฿${product.discount}</span>
                    <span class="products__price">฿${product.price}</span>
                </div>
                <button class="products_button button">Add to Cart</button>`;
            listProductHTML.appendChild(newProduct);
            }
        })
    }
}

/* ====================== ADD PRODUCT TO CART ====================== */
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('products_button')){
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
})

const addToCart = (id_product) => {
    cart = JSON.parse(localStorage.getItem("cartMemory"))
    let positionThisProductInCart = cart.findIndex((value) => value.id_product==id_product);
    if (cart.length <= 0){
        cart = [{
            id_product: id_product,
            quantity: 1
        }];
    }else if (positionThisProductInCart < 0){
        cart.push({
            id_product: id_product,
            quantity: 1
    });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCarttoMomory();
    totalQuantity();
}

/* ====================== ADD CART DATA TO LOCAL STORAGE  ====================== */
const addCarttoMomory = () => {
    localStorage.setItem('cartMemory',JSON.stringify(cart));
}

/* ====================== ADD DATA FROM JSON ====================== */
const initApp = () => {
    fetch('data/data_products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
    }) 
}
initApp();

/* ====================== UPDATE CART DATA AFTER RELOAD  ====================== */
cart = JSON.parse(localStorage.getItem("cartMemory"));

/* ====================== UPDATE ICON CART ====================== */
const totalQuantity = () => {
    let totalQuantity = 0;
    if (cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            console.log(totalQuantity)
        });
    };
    iconCart.innerHTML = totalQuantity;
};
totalQuantity();