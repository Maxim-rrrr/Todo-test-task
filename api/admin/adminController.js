import logger from "../../modules/logger.js";
import { validationResult } from 'express-validator';
import config from "config";
import jwt from 'jsonwebtoken';

const generateAccessToken = (login) => {
    const payload = {
        login
    }
    return jwt.sign(payload, config.get("secret_key"), {expiresIn: "24h"} )
}

class AdminController {
    async login(req, res) {
        const {login, password} = req.body

        if (config.get('admin_login') === login && config.get('admin_password') === password) {
            const token = generateAccessToken(login)

            return res.json({success: true, token})
        }

        return res.status(200).json({success: false, message: `Login or password is incorrect`})
    }
}

export default new AdminController()