// Seleccionamos los elementos con el atribbuto data-anim
const showInItems = document.querySelectorAll('[data-anim]')
33

const animateSingleElements = () => {

    // Definimos una función que se encargará de añadir la clase 'inView' cuando entren a la vista
    const handleIntersection = (entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('inView')
            }
        })
    }

    // Definimos un objeto con las opciones que le pasaremos al IntersectionObserver
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
    }

    // Creamos una instancia de IntersectionObserver con la función handleIntersection como callback
    const observer = new IntersectionObserver(handleIntersection, options)

    // Añadimos los elementos que queremos observar a la instancia de IntersectionObserver
    showInItems.forEach(item => {
        observer.observe(item)
    })
}

// Animar multiples elementos hijos desde la selección de un elemento padre 

const animateChildElements = () => {

    // Seleccionamos los elementos con el atribbuto data-anim="parent"
    const parents = document.querySelectorAll('[data-anim="parent"]')

    // Iteramos sobre todos los elementos que tengan el atributo data-anim="parent"
    parents.forEach(parent => {

        // Obtenemos un array con todos los hijos del elemento padre
        const children = Array.from(parent.children)

        // Iteramos sobre los hijos
        children.forEach((child, index) => {

            // Añadimos el atributo data-anim="child" a cada hijo
            child.setAttribute('data-anim', 'child')

            // Definimos el handler para el Intersection Observer (con IO v2 hay otra forma de hacerlo)
            const handleIntersection = (entries, observer) => {
                // Iteramos sobre cada entry del Intersection Observer
                entries.forEach(entry => {
                    if (entry.isIntersecting) {

                        // Cuando isIntersecting es true, añadimos la clase 'inView' al elemento
                        setTimeout(() => {
                            entry.target.classList.add('inView')
                            observer.unobserve(entry.target)
                        }, 150 * index);
                    }
                })
            }
            // Definimos un objeto con las opciones que le pasaremos al IntersectionObserver
            let options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.3
            }

            // Creamos una la instancia de IntersectionObserver con la función handleIntersection como callback
            const observer = new IntersectionObserver(handleIntersection, options)
            observer.observe(child);
        })
    })
}

animateChildElements()

animateSingleElements()

   


