import db from '../index.js'

class Task {
    async all() { 
        return await db.select('tasks').then(([rows, fields]) =>  rows)
    }
    async getById(id = 1) {
        return await db.select('tasks', `WHERE id = ${id}`).then(([rows, fields]) =>  rows.at(0))
    }
    async getPagination(field = 'id', page = 0, direction = 'ASC', count = 3) {
        return await db.select('tasks', `ORDER BY ${field} ${direction} LIMIT ${count} OFFSET ${page * count}`).then(([rows]) =>  {
            return db.count('tasks').then(total => ({ 
                tasks: rows, 
                total,
                totalPage: Math.ceil(total / count),
                page,
                count,
                field,
                direction
            }))
        })
    }
    async add(obj) {
        return await db.add('tasks', obj)
    }
    async update(id, obj) {
        return await db.update('tasks', obj, `WHERE id = ${id}`)
    }
    async del(id) {
        return await db.update('tasks', `WHERE id = ${id}`)
    }
}

export default new Task()