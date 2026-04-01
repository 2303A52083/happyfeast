import express from 'express'
import { addFood, listfood, removeFood } from '../controllers/foodController.js'
import { storage } from '../config/cloudinary.js'
import multer from 'multer'

const foodRouter = express.Router();


//image Storage Engine (using Cloudinary)
const upload = multer({storage:storage})

foodRouter.post('/add',upload.single("image"),addFood)
foodRouter.get("/list",listfood)
foodRouter.post("/remove",removeFood)




export default foodRouter;