var TodoItem = React.createClass({
    render: function() {
        return <a className="list-group-item" href="#">{ this.props.model.text }</a>
    }
});