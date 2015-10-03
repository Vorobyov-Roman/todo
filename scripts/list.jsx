import TodoItem from './item';

export default class List extends React.Component {
    render() {
        if (!(this.props.items && this.props.items.length)) {
            return null;
        }

        var items = this.props.items.map((item, index) =>
            <TodoItem
                model={ item }
                parent={ this.props.parent }
                key={ index }
            >
            </TodoItem>
        );

        return (
            <ul className="list-group">
                { items }
            </ul>
        );
    }
}