var TodoItem = React.createClass({
    onClick: function() {
        console.log(this.props);
        this.props.model.check();
        this.props.onCheck();
    },
    render: function() {
        return(
            <a href="#" className="list-group-item" onClick={ this.onClick }>
                <span className={ this.props.model.status ? "my-todo-checked" : "" }>
                    { this.props.model.text }
                </span>
            </a>
        )
    }
});