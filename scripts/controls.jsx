import classNames from 'classnames';

export default class Controls extends React.Component {
    render() {
        var buttons = this.props.buttons.map((item, index, list) => {
            //apply my-control-first and my-control-last to the first and last items respectively
            var style = classNames({
                'btn': true,
                'my-control-first': index === 0,
                'my-control-last': index === list.length - 1,
                ' ': true
            }) + (item.style || 'btn-default');

            return(
                <button
                    className={ style }
                    type="button"
                    onClick={ item.handler }
                    key={ index }
                >
                    { item.text }
                </button>
            );
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