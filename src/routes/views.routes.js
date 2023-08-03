import { Router } from "express"
import fs from 'fs'
import __dirname from "../utils.js"
const router = Router()
router.get("/home",(req,res)=> {
    const products = JSON.parse(fs.readFileSync(__dirname+"/public/data/products.json","utf8"))
    res.render("home",{products})
})
router.get("/realtimeproducts",(req,res)=> {
    res.render("realtimeproducts",{})
})
export default router