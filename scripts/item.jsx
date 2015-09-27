import Controls from './controls';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            hoverable: true
        };
    }
    toggleChildren() {
        $(React.findDOMNode(this.refs.children)).collapse('toggle');

        this.setState({ expanded: !this.state.expanded });
    }
    onHover(enter) {
        if (this.state.hoverable) {
            $(React.findDOMNode(this.refs.controls)).stop().animate({
                top: enter ? '-1px' : '-35px'
            }, 100);
        }
    }
    allowHover(value) {
        this.setState({ hoverable: value });
    }
    render() {
        var childrenList = null;
        var buttons = [
            {
                text: 'Remove',
                style: 'btn-danger'
            },
            {
                text: 'Insert'
            },
            {
                text: 'Check'
            }
        ];

        if (this.props.model.children) {
            //toggleButton
            buttons.splice(0, 2, {
                text: this.state.expanded ?
                    <span>Collapse</span> :
                    <span>Expand <span className="badge">{ this.props.model.children.length }</span></span>,
                handler: this.toggleChildren.bind(this)
            });

            //childrenList
            var children = this.props.model.children.map(function(item, index) {
                return <TodoItem key={ index } model={ item }></TodoItem>
            });

            childrenList =
                <div
                    className="collapse"
                    ref="children"
                    onMouseEnter={ this.allowHover.bind(this, false) }
                    onMouseLeave={ this.allowHover.bind(this, true) }
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
                <Controls controls={ buttons } ref="controls"></Controls>

                { this.props.model.text }

                { childrenList }
            </li>
        );
    }
}