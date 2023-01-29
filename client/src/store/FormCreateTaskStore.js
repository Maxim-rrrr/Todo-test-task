import { makeAutoObservable } from "mobx"

class FormCreateTaskStore {
    fields = {
        user_name: "",
        email: "", 
        text: ""
    }

    fieldsError = {}

    isOpenPopup = false

    constructor() {
        makeAutoObservable(this)
    }

    fieldChange = (field, value) => {
        this.fieldsError[field] = ''
        this.fields = { ...this.fields, [field]: value }
    }

    setFieldsError(data) {
        this.fieldsError = data
    }

    openPopup() {
        this.isOpenPopup = true
    }

    closePopup() {
        this.isOpenPopup = false
    }

    clearFields() {
        this.fields = {
            user_name: "",
            email: "", 
            text: ""
        }
    }
}

export default new FormCreateTaskStore()