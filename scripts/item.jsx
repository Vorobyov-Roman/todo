import classNames from 'classnames';
import { hoverDirector, cursorDirector, isTouch } from './model/director';
import Controls from './controls';
import ItemList from './list';
import Input from './input';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
            pending: false,
            done: false,
            edited: false
        };
    }
    //Recursively updates all the items up the hierarchy
    updateParent() {
        this.props.parent.updateParent();
    }

    setCursor() {
        //if pending items arent shown, show them
        if (!this.state.pending) {
            this.showPending(true);
        }

        cursorDirector.set(this);
    }

    //Controls' handlers
    remove() {
        this.props.parent.props.model.remove(this.props.model);
        this.updateParent();
    }
    insert(text) {
        this.props.model.insert(text);
        this.updateParent();
    }
    showPending(state) {
        $(React.findDOMNode(this.refs.pending)).collapse(state ? 'show' : 'hide');
        this.setState({ pending: state });
    }
    showDone(state) {
        $(React.findDOMNode(this.refs.done)).collapse(state ? 'show' : 'hide');
        this.setState({ done: state });
    }
    check(state) {
        this.props.model.check(state);
        this.updateParent();
    }

    render() {
        var children = {
            pending: this.props.model.children.length ?
                this.props.model.children.filter(item => item.completion !== 100) :
                null,
            done: this.props.model.children.length ?
                this.props.model.children.filter(item => item.completion === 100) :
                null
        };

        //item's text. if the item contains children, also includes completion percentage
        var label = this.props.model.children.length ?
            <span>
                <span>{ this.props.model.text } </span>
                <span className="label label-primary">{ this.props.model.completion + '%' }</span>
            </span> :
            <span>{ this.props.model.text }</span>;

        //input field is shown only when the cursor is set on the item
        var input = this.state.edited ? <Input onSubmit={ this.insert.bind(this) }></Input> : null;

        //green color for completed tasks
        var style = classNames({
            'list-group-item': true,
            'my-done': this.props.model.checked
        });

        //shorthand for mouse event handlers
        var events = {
            onMouseEnter: hoverDirector.push.bind(hoverDirector, this),
            onMouseLeave: hoverDirector.pop.bind(hoverDirector),
            onClick: hoverDirector[this.state.hovered ? 'reset' : 'set'].bind(hoverDirector, this)
        };

        //functional buttons
        var buttons = [
            {
                text: 'Remove',
                style: 'btn-danger',
                handler: this.remove.bind(this)
            },
            {
                text: 'Insert',
                handler: this.setCursor.bind(this)
            },
            {
                text: this.props.model.checked ? 'Uncheck' : 'Check',
                handler: this.check.bind(this, !this.props.model.checked)
            }
        ];

        //collapse/expand pending items if any
        if (children.pending && children.pending.length) {
            buttons.splice(2, 0, {
                text: this.state.pending ?
                    <span>Collapse</span> :
                    <span>Expand <span className="badge">{ children.pending.length }</span></span>,
                handler: this.showPending.bind(this, !this.state.pending)
            });
        }

        //collapse/expand completed items if any
        if (children.done && children.done.length) {
            buttons.splice(2, 0, {
                text: this.state.done ?
                    <span>Hide done</span> :
                    <span>Show done <span className="badge">{ children.done.length }</span></span>,
                handler: this.showDone.bind(this, !this.state.done)
            });
        }

        return (
            <li
                className={ style }
                onMouseEnter={ e => { !isTouch && events.onMouseEnter(); e.stopPropagation(); } }
                onMouseLeave={ e => { !isTouch && events.onMouseLeave(); e.stopPropagation(); } }
                onClick={ e => { isTouch && events.onClick(); e.stopPropagation(); } }
            >
                <Controls buttons={ buttons } ref="controls"></Controls>

                { label }

                <div className="collapse" ref="pending">
                    <ItemList items={ children.pending } parent={ this }></ItemList>
                </div>
                { input }
                <div className="collapse" ref="done">
                    <ItemList items={ children.done } parent={ this }></ItemList>
                </div>
            </li>
        );
    }
}
