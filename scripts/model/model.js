export default class TodoItem {
    constructor(text, parent = null) {
        this.text = text;
        this.children = [];
        this._state = 0;
    }

    insert(text) {
        var item = new TodoItem(text);
        this.children.push(item);
        return item;
    }
    remove(item) {
        this.children.splice(this.children.indexOf(item), 1);

        if (!this.children.length) {
            this._state = item._state === 100 ? 100 : 0;
        }
    }
    check(state) {
        if (this.children.length) {
            this.children.forEach(item => item.check(state));
        } else {
            this._state = state ? 100 : 0;
        }
    }

    get completion() {
        var total = this.children.length * 100;
        var done = this.children.reduce((a, item) => a + item.completion, 0);

        return total ? Math.floor(done / total * 100) : this._state;
    }

    get checked() {
        return this.completion === 100;
    }
}