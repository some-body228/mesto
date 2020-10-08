export  class Section {
    constructor({data, render},containSelector){
        this._items = data,
        this._render = render,
        this._containSelector = containSelector,
        this._addItem = document.querySelector(this._containSelector)
    }
    renderer() {
        this._items.forEach(element => {
            this.addItem(this._render(element))

        });
    }
    addItem(element) {
        this._addItem.prepend(element)
    }
}