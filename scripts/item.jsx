import Controls from './controls';
import List from './list';
import Input from './input';
import director from './model/director';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: !props.model.children,
            forced: !props.model.children,
            edited: props.edited || false
        };
    }

    showChildren(show) {
        $(React.findDOMNode(this.refs.children)).collapse(show ? 'show' : 'hide');
        this.setState({ expanded: show });
    }
    toggleChildren() {
        this.showChildren(!this.state.expanded);
    }

    showControls(enter) {
        $(React.findDOMNode(this.refs.controls)).stop().animate({
            top: enter ? '-1px' : '-35px'
        }, 100);
    }

    setCursor() {
        this.showChildren(true);
        director.setCursor(this);
    }
    insert(text) {
        this.props.model.insert(text);
        this.forceUpdate();
        this.showChildren(true);
    }

    render() {
        var input = this.state.edited ? <Input onSubmit={ this.insert.bind(this) }></Input> : null;
        var label = this.props.model.children ?
            <span> <span className="label label-primary">{ this.props.model.completion + '%' }</span></span> :
            null;
        var buttons = [
            {
                text: 'Remove',
                style: 'btn-danger'
            },
            {
                text: 'Insert',
                handler: this.setCursor.bind(this)
            },
            {
                text: 'Check'
            }
        ];

        if (this.props.model.children) {
            buttons.splice(2, 0, {
                text: this.state.expanded ?
                    <span>Collapse</span> :
                    <span>Expand <span className="badge">{ this.props.model.children.length }</span></span>,
                handler: this.toggleChildren.bind(this)
            });
        }

        var style = this.state.forced ? 'collapse in' : 'collapse';

        return(
            <li
                className="list-group-item"
                onMouseEnter={ director.hover.bind(director, this) }
                onMouseLeave={ director.unhover.bind(director) }
            >
                <Controls controls={ buttons } ref="controls"></Controls>

                { this.props.model.text }
                { label }

                <div className={ style } ref="children">
                    <List items={ this.props.model.children }></List>
                    { input }
                </div>
            </li>
        );
    }
}