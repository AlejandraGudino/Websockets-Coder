const socket = io();

const formAgregarArticulos = document.getElementById('formAgregarProducto')
formAgregarArticulos.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    // armo la persona extrayendo los datos de los campos del formulario

    const articulo = {
        title: formAgregarArticulos[0].value, // document.getElementById('txtNombre').value
        price: formAgregarArticulos[1].value, // document.getElementById('txtApellido').value
        URL: formAgregarArticulos[1].value, // document.getElementById('URL').value
    }

    // envio la persona al servidor via socket
    socket.emit('update', articulo);

    // limpio el contenido de los campos del formulario
    formAgregarArticulos.reset()
})


socket.on('articulo', manejarEventoArticulos);

async function manejarEventoArticulos(articulo) {


    // busco la plantilla del servidor
    const recursoRemoto = await fetch('plantillas/tabla-articulos.hbs')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    // relleno la plantilla con las articulo recibidas
    const html = functionTemplate({ articulo })

    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('articulo').innerHTML = html
}
