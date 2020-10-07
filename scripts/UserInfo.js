export class UserInfo {
    constructor(nameSelector, captionSelector){
        this._nameSelector = nameSelector,
        this._captionSelector =captionSelector
        this._name = document.querySelector(this._nameSelector).textContent
        this._caption = document.querySelector(this._captionSelector).textContent
    }
    getUserInfo(){
        return {
            name: document.querySelector(this._nameSelector).textContent, 
            caption: document.querySelector(this._captionSelector).textContent
        }

    }
    setUserInfo(obj){
        
        document.querySelector(this._nameSelector).textContent = obj.name
        document.querySelector(this._captionSelector).textContent = obj.caption
    }
}