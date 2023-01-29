import Router from 'express'
import { check } from "express-validator"
import controller from './adminController.js'
import authMiddleware from '../../middlewares/authMiddleware.js'

const router = new Router()

router.post('/login', controller.login)

router.post('/is-auth', authMiddleware, async (req, res) => { res.send({success: true}) })


export default router