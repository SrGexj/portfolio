const docElements = [document.documentElement, document.body]
const mainContent = document.querySelector('[data-scroll-content]')

// Definimos un objeto con las propiedades height y width que contienen el alto y ancho de la ventana
const windowValues = {
    height: window.innerHeight,
    width: window.innerWidth
}
 // Creamos una función que se ejecutará cada vez que se redimensione la ventana
const onResize = () => {
        windowValues.height = window.innerHeight
        windowValues.width = window.innerWidth
 };
// Añadimos un evento de redimensionamiento a la ventana
window.addEventListener('resize', onResize)

// Definimos las variables que necesitaremos para el scroll suave
let currentPosition = 0
let targetPosition = 0
let isScrolling = false
let acelleration = .05

// Creamos una función que se encargará de calcular el scroll suave
const smoothScroll = () => {
    if (isScrolling) {
        currentPosition += (targetPosition - currentPosition) * acelleration
        mainContent.style.transform = `translateY(${-currentPosition}px)`

        if (Math.abs(targetPosition - currentPosition) > 0.5) {
            requestAnimationFrame(smoothScroll);
        } else {
            isScrolling = false;
        }
    }
}

// Añadimos un evento de scroll a la ventana
const onScroll = (e) => {

    docElements.forEach((el) => { el.style.overflow = 'hidden' })

    targetPosition += e.deltaY
    targetPosition = Math.max(0, targetPosition)
    targetPosition = Math.min(mainContent.scrollHeight - windowValues.height, targetPosition)

    if (!isScrolling) {
        isScrolling = true
        requestAnimationFrame(smoothScroll);
    }
}
window.addEventListener('wheel', onScroll)

// Esta parte del código la hice con copilot por ahorrar tiempo

let startTouchY = 0;
let currentTouchY = 0;

clientY = window.innerHeight;

const onTouchStart = (e) => {
    startTouchY = e.touches[0].clientY;
};

const onTouchMove = (e) => {
    e.preventDefault();
    currentTouchY = e.touches[0].clientY;
    let delta = (startTouchY - currentTouchY) * 0.75;


    targetPosition += delta;
    targetPosition = Math.max(0, targetPosition);
    targetPosition = Math.min(mainContent.scrollHeight - windowValues.height, targetPosition);    

    startTouchY = currentTouchY;

    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
    }
};

window.addEventListener('touchstart', onTouchStart);
window.addEventListener('touchmove', onTouchMove);

