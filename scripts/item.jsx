import classNames from 'classnames';
import { hoverDirector, cursorDirector } from './model/director';
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
    updateParent() {
        this.props.parent ? this.props.parent.updateParent() : this.forceUpdate();
    }

    setCursor() {
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
            pending: this.props.model.children ?
                this.props.model.children.filter(item => item.completion !== 100) :
                null,
            done: this.props.model.children ?
                this.props.model.children.filter(item => item.completion === 100) :
                null
        };
        var label = this.props.model.children.length ?
            <span>
                <span>{ this.props.model.text } </span>
                <span className="label label-primary">{ this.props.model.completion + '%' }</span>
            </span> :
            <span>{ this.props.model.text }</span>;
        var input = this.state.edited ? <Input onSubmit={ this.insert.bind(this) }></Input> : null;
        var style = classNames({
            'list-group-item': true,
            'my-done': this.props.model.checked
        });
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

        if (children.pending && children.pending.length) {
            buttons.splice(2, 0, {
                text: this.state.pending ?
                    <span>Collapse</span> :
                    <span>Expand <span className="badge">{ children.pending.length }</span></span>,
                handler: this.showPending.bind(this, !this.state.pending)
            });
        }
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
                onMouseEnter={ hoverDirector.push.bind(hoverDirector, this) }
                onMouseLeave={ hoverDirector.pop.bind(hoverDirector) }
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
