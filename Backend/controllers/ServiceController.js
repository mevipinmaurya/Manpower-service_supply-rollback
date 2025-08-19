import Service from "../models/ServiceModel.js"
import { sendContactUsMail } from "../utils/mail/sendContactusMail.js"

// Add Service
const addService = async (req, res) => {
    const addService = new Service({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price
    })

    try {
        await addService.save()
        res.json({
            success: true,
            message: "Service Added Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Failed !"
        })
    }
}

// Get Service
const getService = async (req, res) => {
    try {
        const services = await Service.find({})
        res.json({
            success: true,
            message: services
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}

// Delete Service
const delService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Service Deleted"
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}

// Update service
const updateService = async (req, res) => {
    try {
        const { title, description, category, image, price } = req.body;
        const service = await Service.findByIdAndUpdate(req.body.id, {
            title: title,
            description: description,
            category: category,
            image: image,
            price: price
        })

        await service.save();
        res.json({
            success: true,
            message: "service Updated"
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Failed to update !"
        })
    }
}

// contact us service
const contactusService = async (req, res) => {
    try {
        const { fullName, email, number, message } = req.body;

        // mail 
        const response = await sendContactUsMail(
            email,
            fullName,
            number,
            message
        )
        
        // console.log(response)

        res.json({
            success: true,
            message: "contact us mail send"
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "error during contactUs service!"
        })
    }
}

export { addService, getService, delService, updateService, contactusService }