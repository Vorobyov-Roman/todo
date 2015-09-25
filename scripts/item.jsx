var TodoItem = React.createClass({
    getInitialState: function() {
        return {
            expanded: false,
            hoverable: true
        };
    },
    toggleChildren: function() {
        this.setState({ expanded: !this.state.expanded });
        $(React.findDOMNode(this.refs.children)).collapse('toggle');
        this.forceUpdate();
    },
    onHover: function(enter) {
        if (this.state.hoverable) {
            $(React.findDOMNode(this.refs.controls)).stop().animate({
                top: enter ? '-1px' : '-35px'
            }, 100);
        }
    },
    render: function() {
        var toggleButton = null;
        var childrenList = null;

        if (this.props.model.children) {
            //toggleButton
            var body = this.state.expanded ?
                <span>Collapse</span> :
                <span>Expand <span className="badge">{ this.props.model.children.length }</span></span>

            toggleButton =
            <button className="btn btn-default" type="button" onClick={ this.toggleChildren }>
                { body }
            </button>

            //childrenList
            var children = this.props.model.children.map(function(item, index) {
                return <TodoItem key={ index } model={ item }></TodoItem>
            });

            childrenList =
                <div
                    className="collapse"
                    ref="children"
                    onMouseOver={ this.setState.bind(this, { hoverable: false }) }
                    onMouseOut={ this.setState.bind(this, { hoverable: true }) }
                >
                    <ul className="list-group">{ children }</ul>
                </div>
        }

        return(
            <li
                className="list-group-item"
                onMouseOver={ this.onHover.bind(this, true) }
                onMouseOut={ this.onHover.bind(this, false) }
            >
                <div className="my-controls" ref="controls">
                    <div className="btn-group">
                        <button className="btn btn-danger my-control-first" type="button">Remove</button>
                        { toggleButton }
                        <button className="btn btn-default" type="button">Insert</button>
                        <button className="btn btn-default my-control-last" type="button">Check</button>
                    </div>
                </div>

                { this.props.model.text }

                { childrenList }
            </li>
        );
    }
});