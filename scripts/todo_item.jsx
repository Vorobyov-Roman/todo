var TodoItem = React.createClass({
    getInitialState: function() {
        return { id: this.props.key, status: false };
    },
    onClick: function() {
        this.setState({ status: !this.state.status });
    },
    render: function() {
        return(
            <li
                className={ "list-group-item" + (this.state.status ? " active" : "") }
                onClick={ this.onClick }
            >{ this.props.children }</li>
        )
    }
});