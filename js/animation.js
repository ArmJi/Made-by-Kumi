/* ====================== SWIPER JS (WHY CHOOSE) ====================== */
var swiperChoose = new Swiper(".choose__images", {
    grabCursor: true,
    loop: true,
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
    prev: {
        opacity: 0,
        translate: [0, 0, -400],
    },
    next: {
        opacity: 0,
        translate: ["100%", 0, 0],
    },
    },
    autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    },
    centeredSlides: 'auto'
}); 

/* ====================== SWIPER JS (BEST SELLER) ====================== */
var swiper = new Swiper(".best__swiper", {
    effect: "cards",
    grabCursor: true,
});

/* ====================== SWIPER JS (PRODUCT) ====================== */
let swiperProduct = new Swiper(".product__swiper", {
    loop: true,
    slidesPerView: 'auto',
    grabCursor: true,
    centeredSlides: 'auto', 
    spaceBetween: 15,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    
    breakpoints: {
    1000: { 
        slidesPerView: 4,
        centeredSlides: false,
    },
    },
}); 

/* ====================== SWIPER JS (TESTIMONIAL) ====================== */
let swiperTest = new Swiper(".testimonial__swiper", {
    loop: true,
    slidesPerView: 'auto',
    grabCursor: true,
    centeredSlides: 'auto', 
    spaceBetween: 20,
    
    breakpoints: {
    1000: { 
        slidesPerView: 4,
        centeredSlides: false,
    },
    },
}); 

/* ====================== GSAP (HOME ANIMATION) ====================== */
gsap.from(".home__desription", {opacity: 0, x: 100, delay: 0.3, duration: 1});
gsap.from(".home__title", {opacity: 0, x: -100, delay: 0.3, duration: 1});
gsap.from(".home__img-1", {opacity: 0, delay: 1, duration: 1});
gsap.from(".home__img-2", {opacity: 0, y: 200, delay: 0.3, duration: 1});


