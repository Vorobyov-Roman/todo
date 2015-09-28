export default class Input extends React.Component {
    onSubmit(e) {
        e.preventDefault();

        var text = React.findDOMNode(this.refs.newTodo).value.trim();
        React.findDOMNode(this.refs.newTodo).value = '';

        if (text) {
            this.props.onSubmit(text);
        }
    }
    render() {
        return(
            <form className="input-group" onSubmit={ this.onSubmit.bind(this) }>
                <input
                    className="form-control"
                    id="input"
                    type="text"
                    placeholder="New item"
                    ref="newTodo"
                />
                <span className="input-group-btn"> 
                    <button className="btn btn-default" type="submit">Add</button>
                </span>
            </form>
        )
    }
}