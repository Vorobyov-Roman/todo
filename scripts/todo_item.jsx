//globals: isTouch

@include('util_button.jsx')

var TodoItem = React.createClass({
    onCheck: function() {
        this.props.onCheck(this.props.model);
    },
    onRemove: function() {
        this.props.onRemove(this.props.model);
    },
    render: function() {
        return(
            <a href="#" className={ "list-group-item" + (isTouch ? "" : " my-todo-item") }>
                <span className={ this.props.model.status ? "my-todo-checked" : "" }>
                    { this.props.model.text }
                </span>
                <UtilButton label="Close" onClick={ this.onRemove }>&#10008;</UtilButton>
                <UtilButton label="Close" onClick={ this.onCheck }>&#10004;</UtilButton>
            </a>
        )
    }
});