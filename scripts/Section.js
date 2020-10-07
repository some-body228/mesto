export  class Section {
    constructor({data, render},containSelector){
        this._items = data,
        this._render = render,
        this._containSelector = containSelector
    }
    renderer() {
        this._items.forEach(element => {
            this.addItem(this._render(element))

        });
    }
    addItem(element) {
        document.querySelector(this._containSelector).prepend(element)
    }
}