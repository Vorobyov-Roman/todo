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
            <a href="#" className={ "list-group-item" + (isTouch ? "" : " my-todo-item") } onClick={ this.onCheck }>
                <span className={ this.props.model.status ? "my-todo-checked" : "" }>
                    { this.props.model.text }
                </span>
                <UtilButton label="Close" onClick={ this.onRemove }>&times;</UtilButton>
            </a>
        )
    }
});