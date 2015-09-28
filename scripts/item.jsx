import Controls from './controls';
import List from './list';
import Input from './input';
import director from './model/director';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            forced: false,
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
        this.props.model.children && this.showChildren(true);
        director.setCursor(this);
    }
    insert(text) {
        this.props.model.insert(text);
        this.forceUpdate();
    }

    render() {
        var childrenList = null;
        var input = null;
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
            //toggleButton
            buttons.splice(2, 0, {
                text: this.state.expanded ?
                    <span>Collapse</span> :
                    <span>Expand <span className="badge">{ this.props.model.children.length }</span></span>,
                handler: this.toggleChildren.bind(this)
            });

            //childrenList
            childrenList = <div className="collapse" ref="children">
                <List items={ this.props.model.children }></List>
            </div>
        }

        if (this.state.edited) {
            input = <Input onSubmit={ this.insert.bind(this) }></Input>
        }

        return(
            <li
                className="list-group-item"
                onMouseEnter={ director.hover.bind(director, this) }
                onMouseLeave={ director.unhover.bind(director) }
            >
                <Controls controls={ buttons } ref="controls"></Controls>

                { this.props.model.text }

                { childrenList }

                { input }
            </li>
        );
    }
}