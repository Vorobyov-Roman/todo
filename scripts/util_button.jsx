UtilButton = React.createClass({
    render: function() {
        return (
            <button
                type="button"
                className="close my-util-btn"
                aria-label={ this.props.label }
                onClick={ this.props.onClick }
            >
                <span aria-hidden="true">{ this.props.children }</span>
            </button>
        )
    }
});