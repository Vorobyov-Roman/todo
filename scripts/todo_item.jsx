var TodoItem = React.createClass({
    getInitialState: function() {
        return { id: this.props.todoID };
    },
    render: function() {
        return(
            <li className="list-group-item">{ this.props.children }</li>
        )
    }
});