export class UserInfo {
    constructor(nameSelector, captionSelector) {
        this._nameSelector = nameSelector
        this._captionSelector = captionSelector
        this._name = document.querySelector(this._nameSelector)
        this._caption = document.querySelector(this._captionSelector)
    }
    getUserInfo() {
        return {
            name: this._name.textContent,
            caption: this._caption.textContent
        }

    }
    setUserInfo(data) {
        this._name.textContent = data.name
        this._caption.textContent = data.caption
    }
}