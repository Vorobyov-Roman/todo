function Todo(text, status) {
    this.text = text;
    this.status = status;
}
Todo.prototype.check = function() {
    this.status = !this.status;
}

var Model = {
    push: function(text, status) {
        this.todos.push(new Todo(text, status || false));
    },
    pop: function(item) {
        this.todos.splice(this.todos.indexOf(item), 1);
    }
};

var model = Object.create(Model, {
    todos: { value: [] }
});

(function loadData() {
    var savedTodos = reactCookie.load('todos');
    savedTodos && savedTodos.forEach(function(item) {
        model.todos.push(new Todo(item.text, item.status));
    });
})();