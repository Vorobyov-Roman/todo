var Input = React.createClass({
    onSubmit: function(e) {
        e.preventDefault();

        var text = React.findDOMNode(this.refs.newTodo).value.trim();
        React.findDOMNode(this.refs.newTodo).value = '';

        if (text) {
            this.props.onSubmit(text);
        }
    },
    render: function() {
        return(
            <form className="input-group" onSubmit={ this.onSubmit }>
                <input
                    type="text"
                    className="form-control"
                    placeholder="New item"
                    ref="newTodo"
                    autofocus={ true }
                />
                <span className="input-group-btn"> 
                    <button className="btn btn-default" type="submit">Add</button>
                </span>
            </form>
        )
    }
});