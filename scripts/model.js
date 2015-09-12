function Todo(text, id, status) {
    this.text = text;
    this.id = id;
    this.status = status;
}
Todo.prototype.check = function() {
    this.status = !this.status;
}

var Model = {
    id: 0,
    find: function(id) {
        for (var i = 0; i < this.todos.length; ++i) {
            if (this.todos[i].id === todoID)
                return this.todos[i];
        }
        return null;
    },
    push: function(text) {
        this.todos.push(new Todo(text, ++this.id, false));
    },
    pop: function(item) {
        this.todos.splice(this.todos.indexOf(item), 1);
    },
    check: function(id) {
        return this.find(id) !== null;
    }
};

var model = Object.create(Model, {
    todos: { value: [] }
});

for (var i = 1; i != 10; ++i) {
    model.push(i);
}