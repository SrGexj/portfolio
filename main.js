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
    currentTouchY = e.touches[0].clientY;
    let delta = (startTouchY - currentTouchY) * 1.25;

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

// A partir de aquí es código que hice yo otra vez


// 
const heroTitle = document.querySelector('.Hero-logo')

// Seleccionamos el elemento ".mouse"
const followMouse = document.querySelector('.mouse')

// Agregamos un evento de mousemove al documento para que el elemento ".mouse" siga el movimiento del cursor
window.addEventListener('mousemove', (e) => {

    const x = e.clientX
    const y = e.clientY

    followMouse.style.transform = `translate(${x}px, ${y}px)`
})

// Seleccionamos todos los elementos que tengan el atributo "data-hover"
const hoverItems = document.querySelectorAll('[data-hover]')

// Definimos dos funciones para añadir posteriormente a los eventos mouseenter y mouseleave
const handleMouseEnter = () => {
    followMouse.classList.add('active')
}

const handleMouseLeave = () => {
    followMouse.classList.remove('active')
}

// Añadimos los handlers para los eventos mouseenter y mouseleave
hoverItems.forEach(item => {
    item.addEventListener('mouseenter', handleMouseEnter)
    item.addEventListener('mouseleave', handleMouseLeave)
})

// Selecionamos los elementos '.Button', '.Button-toggler' y '.Button-line'

const menuButton = document.querySelector('.Button')
const menuToggler = menuButton.querySelector('.Button-toggler')

menuToggler.addEventListener('click', () => {
    menuButton.classList.toggle('isActive')
})


