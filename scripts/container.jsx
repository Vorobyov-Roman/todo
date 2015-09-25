@include('item.jsx');

var Container = React.createClass({
    render: function() {
        var items = this.props.model.children.map(function(item, index) {
            return <TodoItem key={ index } model={ item }></TodoItem>
        });

        return(
            <ul className="list-group" id="root">
                { items }
            </ul>
        );
    }
});