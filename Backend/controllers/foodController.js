import foodModel from "../models/foodModel.js";
import { cloudinary } from "../config/cloudinary.js";

// add food items 
const addFood = async (req, res) => {
    try {
        // Use req.file.path which is the Cloudinary URL
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.path 
        })
        await food.save()
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// List of All Food
const listfood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Remove food items
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        
        // Extract public_id from Cloudinary URL to delete it
        // Example URL: https://res.cloudinary.com/dkgo1xrfx/image/upload/v17.../food_items/xxx.jpg
        const publicId = food.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`food_items/${publicId}`);

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {addFood, listfood, removeFood}