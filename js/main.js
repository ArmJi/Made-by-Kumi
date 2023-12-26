/* ====================== LOG IN ====================== */
const   loginButton = document.getElementById('login-button'),
        loginContent = document.getElementById('login-content'),
        loginClose = document.getElementById('login-close')

/* ====================== SHOW LOG-IN ====================== */
loginButton.addEventListener('click',() => {
    loginContent.classList.add('show-login');
});

/* ====================== SHOW LOG-IN ====================== */
loginClose.addEventListener('click',() => {
    loginContent.classList.remove('show-login');
});

/* ====================== MENU ====================== */
const   menuButton = document.getElementById('menu-button'),
        menuList = document.getElementById('nav-list')

/* ====================== SHOW MENU ====================== */

menuButton.addEventListener('click',() => {
    menuList.classList.contains('show-menu')
        ? menuList.classList.remove('show-menu')
        : menuList.classList.add('show-menu')
})

/* ====================== CLOSE MENU ====================== */
window.addEventListener('mouseup', event => {
    if ((event.target.closest('#nav-list') === null) && (event.target.closest('#menu-button') === null)){
        menuList.classList.remove('show-menu')
    }
})

/* ====================== SHADOW HEADER ====================== */
const shadowHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50  ? header.classList.add('shadow-header')
                        : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/* ====================== SCROOL UP ====================== */
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350   ? scrollUp.classList.add('show-scroll')
                          : scrollUp.classList.remove('show-scroll')
  }
  window.addEventListener('scroll',scrollUp)
