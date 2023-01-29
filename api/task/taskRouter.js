import Router from 'express'
import { check } from "express-validator"
import controller from './taskController.js'
import authMiddleware from '../../middlewares/authMiddleware.js'

const router = new Router()

router.get('/all', controller.all)

router.get('/pagination', controller.pagination)

router.post('/add', [
    check('user_name', 'Required field').notEmpty(),
    check('email', 'The field must be Email').isEmail(),
    check('text', 'Required field').notEmpty(),
], controller.add)

router.post('/update', authMiddleware, [
    check('id', 'Required field').notEmpty()
], controller.update)

export default router