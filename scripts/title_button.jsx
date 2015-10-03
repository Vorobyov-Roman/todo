export default class TitleButton extends React.Component {
    render() {
        return (
            <button className="btn btn-primary title" type="button" onClick={ this.props.onClick }>
                { this.props.children }
            </button>
        );
    }
}
