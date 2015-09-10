#include('model.js');
#include('todo_item.jsx');
#include('todo_input.jsx');

var Container = React.createClass({
    addItem: function(text) {
        model.push(text);
        this.forceUpdate();
    },
    render: function() {
        items = [];
        model.todos.forEach(function(item) {
            items.push(<TodoItem todoID={ item.id }>{ item.text }</TodoItem>);
        });

        return(
            <div className="well my-holder">
                <ul className="list-group">
                    { items }
                </ul>
                <Input onSubmit={ this.addItem }></Input>
            </div>
        );
    }
});