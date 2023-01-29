import Task from '../../database/models/task.js'
import logger from "../../modules/logger.js";
import { validationResult } from 'express-validator';

class TaskController {
    async all(req, res) {
        try {
            return Task.all().then(data => res.json(data))
        } catch (e) {
            logger.error(`/api/task/all: ${e}`)
            res.status(500).json({message: e})
        }
    }

    async pagination(req, res) {
        try {
            return Task.getPagination(
                req.query?.field, 
                req.query?.page, 
                req.query?.direction, 
                req.query?.count
            ).then(data => res.json(data))
        } catch (e) {
            logger.error(`/api/task/pagination: ${e}`)
            res.status(500).json({message: e})
        }
    }

    async add(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                let err = {}
                errors.errors.forEach(item => {
                    err[item.param] = item.msg
                });

                return res.status(200).json({
                        success: false,
                        errors: err
                    })
            }

            return await Task.add(req.body).then(([data, err]) => {
                if (!err) {
                    return Task.getPagination(
                        req.query?.field, 
                        req.query?.page, 
                        req.query?.direction, 
                        req.query?.count
                    ).then(data => res.json({
                        success: true,
                        paginationObject: data
                    }))
                }
                return res.status(500).json({message: err})
            })
        } catch (e) {
            logger.error(`/api/task/add: ${e}`)
            res.status(500).json({message: e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                let err = {}
                errors.errors.forEach(item => {
                    err[item.param] = item.msg
                });

                return res.status(200).json({
                        success: false,
                        errors: err
                    })
            }

            return await Task.update(req.body.id, req.body).then(([data, err]) => {
                if (!err) {
                    return Task.getPagination(
                        req.query?.field, 
                        req.query?.page, 
                        req.query?.direction, 
                        req.query?.count
                    ).then(data => res.json({
                        success: true,
                        paginationObject: data
                    }))
                }
                return res.status(500).json({message: err})
            })
        } catch (e) {
            logger.error(`/api/task/add: ${e}`)
            res.status(500).json({message: e})
        }
    }
}

export default new TaskController()