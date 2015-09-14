//globals: isTouch

var TodoItem = React.createClass({
    onCheck: function() {
        this.props.onCheck(this.props.model);
    },
    onRemove: function() {
        this.props.onRemove(this.props.model);
    },
    render: function() {
        return(
            <a href="#" className={ "list-group-item" + (isTouch ? "" : " my-todo-item") } onClick={ this.onCheck }>
                <span className={ this.props.model.status ? "my-todo-checked" : "" }>
                    { this.props.model.text }
                </span>
                <button type="button" className="close" aria-label="Close" onClick={ this.onRemove }>
                    <span aria-hidden="true">&times;</span>
                </button>
            </a>
        )
    }
});