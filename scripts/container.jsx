import { hoverDirector, cursorDirector, isTouch } from './model/director';
import Controls from './controls';
import ItemList from './list';
import Input from './input';
import TitleButton from './title_button';

export default class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = { edited: true };

        cursorDirector.init(this);
    }
    updateParent() {
        document.cookie = JSON.stringify(this.props.model);
        this.forceUpdate();
    }

    insert(text) {
        this.props.model.insert(text);
        this.forceUpdate();
    }

    showInfo() {
        $('#about-modal').modal('show');
    }
    showHelp() {
        $('#help-modal').modal('show');
    }

    render() {
        var input = this.state.edited ?
            <Input onSubmit={ this.insert.bind(this) }></Input> :
            null;

        var children = {
            pending: this.props.model.children.length ?
                this.props.model.children.filter(item => item.completion !== 100) :
                null,
            done: this.props.model.children.length ?
                this.props.model.children.filter(item => item.completion === 100) :
                null
        };

        return (
            <div id="container" onClick={ e => { isTouch && hoverDirector.reset(); } }>
                <div className="panel panel-primary" id="root">
                    <div className="panel-heading">
                        <TitleButton onClick={ cursorDirector.set.bind(cursorDirector, this) }>
                            Your tasks
                        </TitleButton>
                    </div>
                    <div className="panel-body">
                        <ItemList items={ children.pending } parent={ this }></ItemList>
                        { input }
                        <div id="my-root-done">
                            <ItemList items={ children.done } parent={ this }></ItemList>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <p className="bg-primary">
                            <TitleButton onClick={ this.showInfo.bind(this) }>About</TitleButton>
                            <TitleButton onClick={ this.showHelp.bind(this) }>Help</TitleButton>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
