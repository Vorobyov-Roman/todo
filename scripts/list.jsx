import TodoItem from './item';

export default class List extends React.Component {
    render() {
        var items = this.props.items.map((item, index) => <TodoItem model={ item } key={ index }></TodoItem>)

        return (
            <ul className="list-group">
                { items }
            </ul>
        );
    }
}
