import { makeAutoObservable } from "mobx"
import { apiClient } from "../api/apiClient"

class TableTasksStore {
    tasks = []
    paginationObject = {}
    paginationSettings = {
        field: 'id', 
        page: 0, 
        direction: 'ASC'
    }

    constructor() {
        makeAutoObservable(this)
    }

    getTasks() {
        apiClient.tasks.all().then(data => {
            this.tasks = data 
        })
    }

    getPagination() {
        apiClient.tasks.pagination(this.paginationSettings).then(data => {
            this.setPaginationObject(data) 
        })
    }

    setPaginationObject(data) {
        this.paginationObject = data 
    }

    nextPage() {
        if (this.paginationSettings.page + 1 < this.paginationObject.totalPage) {
            this.paginationSettings.page++
            this.getPagination()
        } 
    }

    prevPage() {
        if (this.paginationSettings.page > 0) {
            this.paginationSettings.page--
            this.getPagination()
        } 
    }

    setFieldSort(field) {
        if (this.paginationSettings.field === field) {
            this.paginationSettings.direction === 'ASC' ? 
                this.paginationSettings.direction = 'DESC' : 
                this.paginationSettings.direction = 'ASC';
        } else {
            this.paginationSettings.field = field
            this.paginationSettings.direction = 'ASC'
        }
        this.getPagination()
    }

    setCompletedTask(id, value) {
        apiClient.tasks.update(this.paginationSettings, {id, completed: value}).then(data => {
            if (data.success) {
                this.setPaginationObject(data.paginationObject)
            }
        })
    }
}

export default new TableTasksStore()