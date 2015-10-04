export default class TodoItem {
    constructor(text, state = 0, children = []) {
        this.text = text;
        this.children = children.map(raw => new TodoItem(raw.text, raw._state, raw.children));

        //indicates item's completion, when no children are present
        this._state = state;
    }

    insert(text) {
        var item = new TodoItem(text);
        this.children.push(item);
        return item;
    }
    remove(item) {
        this.children.splice(this.children.indexOf(item), 1);

        //upon removal of the last child, this._state becomes relevant again
        //set this._state to that of item
        if (!this.children.length) {
            this._state = item.checked ? 100 : 0;
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