import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.json({
                success: false,
                message: "User authentication failed!"
            })

        }
        // Verifying token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded.userId)
        req.user = decoded.userId

        next();
    } catch (error) {
        res.json({
            success: false,
            message: "Some error occured!"
        })
    }
}


export default authMiddleware