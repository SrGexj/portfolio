// arreglo 100vh móviles con dock 
// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/


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

/* SLIDER */

// Seleccionamos los elementos necesarios
const slider = document.querySelector('.Slider')
const sliderWrapper = slider.querySelector('.Slider-wrapper')
const sliderItems = slider.querySelectorAll('.Slider-item')
const controlButtons = document.querySelectorAll('.Projects-button')
const widthRef = document.querySelector('.reference');

// Creamos una función que se encargará de redimensionar el slider según el ancho de la ventana y el número de elementos a mostrar
const handleResize = () =>{

    // Definimos un número por defecto para los slides
    let currentSlide = 0
    let shownSlides = 3
    let slidesGap = 50

    // Manejador para mostrar solo uno en movil (responsive)
    window.innerWidth <= 767 ? shownSlides = 1 : window.innerWidth <= 1024 ? shownSlides = 2 : ''
    window.innerWidth <= 767 ? slidesGap = 10 : ''

    // Definimos el ancho del slider y el número de columnas en el grid basado en las variables anteriores
    sliderWrapper.style.width = `${sliderItems.length * 100}%`
    sliderWrapper.style.gridTemplateColumns = `repeat(calc(${sliderItems.length} * ${shownSlides}), 1fr)`

    // Guardamos en una variable el ancho de un elemento del slider para poder ajustarlo correctamente
    let itemWidth = widthRef.getBoundingClientRect().width;

    // Definimos el manejador para desplazar el slider según el botón que se presione

    // Manejador para el botón siguiente
    const handleNextSlide = (e) => {
     
        currentSlide++
        // Desplazamos el slider según el slide actual y el ancho de los elementos
        sliderWrapper.style.transform = `translateX(${-(itemWidth + slidesGap) * currentSlide}px)`
        // Comparamos si el slide actual es mayor que el número de slides menos los que se muestran, si es así, volvemos al principio
        currentSlide > sliderItems.length - shownSlides ? sliderWrapper.style.transform = `translateX(0px)` : ''
        // Si hemos llegado al final, volvemos a definir el valor como 0
        currentSlide > sliderItems.length - shownSlides ? currentSlide = 0 : ''

    }
    // Manejador para el botón anterior aplicando la misma lógica que en el caso anterior pero al contrario
    const handlePrevSlide = (e) => {
       
        currentSlide--
        sliderWrapper.style.transform = `translateX(${-(itemWidth + slidesGap) * currentSlide}px)`
        currentSlide < 0 ? sliderWrapper.style.transform = `translateX(${-(itemWidth + slidesGap) * (sliderItems.length - shownSlides)}px)` : ''
        currentSlide < 0 ? currentSlide = sliderItems.length - shownSlides : ''

    }
    // Añadimos los manejadores a los botones
    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.contains('Projects-button--next') ? handleNextSlide() : handlePrevSlide()
        })
    })
}

// Llamamos a la función handleResize para que se ejecute al cargar la página
handleResize()

// Añadimos un evento de redimensionamiento a la ventana para que se ejecute la función handleResize cada vez que se redimensione la ventana
addEventListener("resize", handleResize)


// Selecionamos los elementos '.Button', '.Button-toggler' y '.Button-line'

// const menuButton = document.querySelector('.Button')
// const menuToggler = menuButton.querySelector('.Button-toggler')
// const burgerMenu = document.querySelector('.Menu')
// const menuItems = burgerMenu.querySelectorAll('.Menu-item')

// menuToggler.addEventListener('click', () => {

//     let itemsToOpen = [menuButton, burgerMenu]

//     itemsToOpen.forEach(item => { item.classList.toggle('isActive') })

// })

const cookieBanner = document.getElementById('cookieBanner');
const acceptCookiesButton = document.getElementById('acceptCookies');

// Verificar si el usuario ya ha aceptado las cookies
if (!localStorage.getItem('cookiesAccepted')) {
  cookieBanner.style.display = 'flex';
}

// Manejar la aceptación de cookies
acceptCookiesButton.addEventListener('click', function () {
  localStorage.setItem('cookiesAccepted', 'true');
  cookieBanner.style.display = 'none';
  // Aquí puedes inicializar las cookies de métricas, por ejemplo:
  // iniciarGoogleAnalytics();
});
