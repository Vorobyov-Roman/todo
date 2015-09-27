export default class Controls extends React.Component {
    render() {
        var buttons = this.props.controls.map(function(item, index, list) {
            var style = "";
            switch (index) {
                case 0:
                case list.length - 1:
                    style += 'my-control-' + (index ? 'last ' : 'first ');
                default:
                    style += 'btn ' + (item.style || 'btn-default');
            }

            return <button className={ style } type="button" onClick={ item.handler } key={ index }>{ item.text }</button>
        });

        return(
            <div className="my-controls">
                <div className="btn-group">
                    { buttons }
                </div>
            </div>
        );
    }
}