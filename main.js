/* SLIDER DE IMÁGENES */

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
    const handleNextSlide = () => {
        currentSlide++
        // Desplazamos el slider según el slide actual y el ancho de los elementos
        sliderWrapper.style.transform = `translateX(${-(itemWidth + slidesGap) * currentSlide}px)`
        // Comparamos si el slide actual es mayor que el número de slides menos los que se muestran, si es así, volvemos al principio
        currentSlide > sliderItems.length - shownSlides ? sliderWrapper.style.transform = `translateX(0px)` : ''
        // Si hemos llegado al final, volvemos a definir el valor como 0
        currentSlide > sliderItems.length - shownSlides ? currentSlide = 0 : ''

    }
    // Manejador para el botón anterior aplicando la misma lógica que en el caso anterior pero al contrario
    const handlePrevSlide = () => {
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
