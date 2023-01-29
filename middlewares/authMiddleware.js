import jwt from 'jsonwebtoken'
import config from "config";

const secret = config.get('secret_key')

export default function (req, res, next) {
    try {
        console.log()
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({success: false, message: "Unauthorized"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({success: false, message: "Unauthorized"})
    }
};
