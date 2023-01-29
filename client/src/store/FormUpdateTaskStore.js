import { makeAutoObservable } from "mobx"

class FormCreateTaskStore { 
    updateTask = {}

    isOpenPopup = false

    constructor() {
        makeAutoObservable(this)
    }

    fieldChange = (field, value) => {
        this.updateTask = { ...this.updateTask, [field]: value }
    }

    openPopup(task) {
        this.isOpenPopup = true
        this.updateTask = task 
    }

    closePopup() {
        this.isOpenPopup = false
    }

    clearFields() {
        this.fields = {
            text: ""
        }
    }
}

export default new FormCreateTaskStore()