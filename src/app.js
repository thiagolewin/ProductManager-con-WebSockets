import express from 'express'
import fs from 'fs'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import RouterViews from './routes/views.routes.js'
import __dirname from './utils.js'
const app = express()
const PORT = 8080
app.engine("handlebars", handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","handlebars")
app.use(express.static(__dirname+"/public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const httpServer = app.listen(PORT,()=> {
    console.log("Escuchando server")
})
const socketServer = new Server(httpServer)
socketServer.on("connection",socket=> {
    const products = JSON.parse(fs.readFileSync(__dirname+"/public/data/products.json","utf8"))
    socket.emit("actualizacion",products)
    socket.on("agregarProductos",data=> {
        const productsMod = JSON.parse(fs.readFileSync(__dirname+"/public/data/products.json","utf8"))
        productsMod.push({name: data.name, price: data.precio})
        fs.writeFileSync(__dirname+"/public/data/products.json", JSON.stringify(productsMod,null,2))
        socket.emit("actualizacion",productsMod)
    })
})
app.use("/",RouterViews)