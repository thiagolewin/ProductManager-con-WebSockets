const socket = io()
const datos = document.querySelector(".datos")
const boton = document.querySelector("button")
boton.addEventListener("click",(evt)=> {
    evt.preventDefault()
    const nombre = document.querySelector("input[name='name']")
    const precio = document.querySelector("input[name='precio']")
    socket.emit("agregarProductos",{name: nombre.value, precio: precio.value})
})
socket.on("actualizacion",data=> {
    datos.innerHTML = ""
    const productos = document.createDocumentFragment()
    data.forEach(element => {
        const producto = document.createElement("div")
        producto.innerHTML = `<h3>${element.name}</h3><h3>${element.price}</h3> <br>`
        productos.appendChild(producto)
    });
    datos.appendChild(productos)
})