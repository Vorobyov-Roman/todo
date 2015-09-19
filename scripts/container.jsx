@include('item.jsx');

var Container = React.createClass({
    render: function() {
        var items = this.props.model.children.map(function(item) {
            return <TodoItem model={ item }>{ item.text }</TodoItem>
        });

        return(
            <div className="well my-well" id={ this.props.id }>
                <div className="list-group">
                    { items }
                </div>
            </div>
        );
    }
});