var TodoCheckbox = React.createClass({
	getInitialState: function() {
		return { checked: false };
	},
	onClick: function() {
		this.setState({ checked: !this.state.checked });
		this.props.update();
	},
	render: function() {
		var icon = this.state.checked? "check" : "unchecked";

		return(
			<span onClick={ this.onClick }>
				<span className={ "glyphicon glyphicon-" + icon } aria-hidden="true"></span>
			</span>
		);
	}
});

var TodoText = React.createClass({
	render: function() {
		return React.createElement(this.props.checked? "del" : "span", null, " " + this.props.children + " ");
	}
});

var TodoRemove = React.createClass({
	render: function() {
		return(
			<div></div>
		);
	}
});

var TodoHolder = React.createClass({
	getInitialState: function() {
		return { checked: false };
	},
	onCheck: function() {
		this.setState({ checked: !this.state.checked });
	},
	render: function() {
		return(
			<div>
				<TodoCheckbox update={ this.onCheck.bind(this) }></TodoCheckbox>
				<TodoText checked={ this.state.checked }>{ this.props.children }</TodoText>
			</div>
		);
	}
});

var Container = React.createClass({
	render: function() {
		return(
			<div className="well my-holder">
				<div className="panel panel-default">
					<div className="panel-body">
						<TodoHolder>Hello</TodoHolder>
					</div>
				</div>
			</div>
		);
	}
});

React.render(
	<Container></Container>,
	document.getElementById('app')
);