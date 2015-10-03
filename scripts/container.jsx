import ItemList from './list';

export default class Container extends React.Component {
    updateParent() {
        this.forceUpdate();
    }

    render() {
        return (
            <div id="container">
                <div className="panel panel-primary" id="root">
                    <div className="panel-heading">
                        { this.props.model.text }
                    </div>
                    <div className="panel-body">
                        <ItemList items={ this.props.model.children } parent={ this }></ItemList>
                    </div>
                </div>
            </div>
        );
    }
}
