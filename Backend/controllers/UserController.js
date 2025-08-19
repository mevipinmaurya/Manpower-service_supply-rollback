import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

// User signup functionality
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Basic  validation
        if (!name || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const match = await User.findOne({ email });
        if (match) {
            return res.status(500).json({
                success: false,
                message: "Email already registered"
            })
        }

        const hashPass = await bcryptjs.hash(password, 10);
        const user = new User({
            name: name,
            email: email,
            password: hashPass
        })

        await user.save()
        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(501).json({
            success: false,
            message: "Some Error Occured"
        })
    }
}


// Login Functionality
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist"
            })
        }

        const matchPass = await bcryptjs.compare(password, user.password)
        if (!matchPass) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password !!!"
            })
        }

        const tokenData = { userId: user._id };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true when deployed
            sameSite: "none", // important for cross-domain cookies
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.name}`,
            user: {
                userId: user._id,
                email: user.email,
                name: user.name
            },
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while logging in"
        })
    }
};




export { register, login } 