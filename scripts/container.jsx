import { hoverDirector, cursorDirector } from './model/director';
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

        return (
            <div id="container">
                <div className="panel panel-primary" id="root">
                    <div className="panel-heading">
                        <TitleButton onClick={ cursorDirector.set.bind(cursorDirector, this) }>
                            { this.props.model.text }
                        </TitleButton>
                    </div>
                    <div className="panel-body">
                        <ItemList items={ this.props.model.children } parent={ this }></ItemList>
                        { input }
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
