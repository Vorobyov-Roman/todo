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
        this.todos.push({
            text: text,
            id: ++this.id
        });
    },
    pop: function(id) {
        var item = this.find(id);
        if (item) {
            this.todos.splice(this.todos.indexOf(item), 1);
        }
    },
    check: function(id) {
        return this.find(id) !== null;
    }
};

var model = Object.create(Model, {
    todos: { value: [] }
});