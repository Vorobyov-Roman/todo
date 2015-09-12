//globals: reactCookie

@include('todo_item.jsx');
@include('todo_input.jsx');

var Container = React.createClass({
    update: function() {
        reactCookie.save('todos', this.props.model.todos);
        this.forceUpdate();
    },
    addItem: function(text) {
        this.props.model.push(text);
        this.update();
    },
    removeItem: function(item) {
        this.props.model.pop(item);
        this.update();
    },
    checkItem: function(item) {
        item.check();
        this.update();
    },
    render: function() {
        var self = this;
        var items = {
            done: [],
            pending: []
        };

        this.props.model.todos.forEach(function(item, index) {
            items[item.status ? "done" : "pending"].push(
                <TodoItem
                    model={ item }
                    onCheck={ self.checkItem }
                    onRemove={ self.removeItem }
                    key={ index }
                ></TodoItem>
            );
        });

        return(
            <div className="well my-holder">
                <div className="list-group">
                    { items.pending }
                </div>
                <div className="list-group">
                    { items.done }
                </div>
                <Input onSubmit={ this.addItem }></Input>
            </div>
        );
    }
});