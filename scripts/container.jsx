import List from './list';

export default class Container extends React.Component {
    render() {
        return(
            <div id="container">
                <div className="panel panel-primary" id="root">
                    <div className="panel-heading">
                        { this.props.model.text }
                    </div>
                    <div className="panel-body">
                        <List items={ this.props.model.children }></List>
                    </div>
                </div>
            </div>
        );
    }
}