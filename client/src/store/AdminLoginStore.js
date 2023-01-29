import { makeAutoObservable } from "mobx"

class AdminLoginStore {
    fields = {
        login: "",
        password: ""
    }

    showPassword = false

    isActiveAlert = false

    constructor() {
        makeAutoObservable(this)
    }

    fieldChange = (field, value) => {
        this.fields = { ...this.fields, [field]: value }
    }

    activeAlert() {
        this.isActiveAlert = true
    }

    deactiveAlert(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.isActiveAlert = false
    }

    changeShowPassword() {
        this.showPassword = !this.showPassword
    }
}

export default new AdminLoginStore()