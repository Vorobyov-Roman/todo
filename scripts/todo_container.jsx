@include('todo_item.jsx');
@include('todo_input.jsx');

var Container = React.createClass({
    addItem: function(text) {
        this.props.model.push(text);
        this.forceUpdate();
    },
    removeItem: function(item) {
        this.props.model.pop(item);
        this.forceUpdate();
    },
    checkItem: function(item) {
        item.check();
        this.forceUpdate();
    },
    render: function() {
        var self = this;
        var items = {
            done: [],
            pending: []
        };

        this.props.model.todos.forEach(function(item) {
            items[item.status ? "done" : "pending"].push(
                <TodoItem
                    model={ item }
                    onCheck={ self.checkItem }
                    onRemove={ self.removeItem }
                    key={ item.id }
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