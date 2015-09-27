import TodoItem from './item';

export default class Container extends React.Component {
    render() {
        var items = this.props.model.children.map(function(item, index) {
            return <TodoItem key={ index } model={ item }></TodoItem>
        });

        return(
            <ul className="list-group">
                { items }
            </ul>
        );
    }
}