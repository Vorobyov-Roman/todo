import TodoItem from './item';

export default class List extends React.Component {
    render() {
        if (!this.props.items) {
            return null;
        }

        var items = this.props.items.map((item, index) => <TodoItem model={ item } key={ index }></TodoItem>)

        return (
            <ul className="list-group">
                { items }
            </ul>
        );
    }
}
