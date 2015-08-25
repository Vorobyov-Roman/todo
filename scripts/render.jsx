var MyCheckBox = React.createClass({
	getInitialState: function() {
		return {
			checked: this.props.checked || false
		};
	},
	onClick: function() {
		this.setState({ checked: !this.state.checked });
	},
	render: function() {
		var style = this.state.checked ? "check" : "unchecked";
		
		return(
			<span onClick={this.onClick}>
				<span className={"glyphicon glyphicon-" + style} aria-hidden="true"></span>
			</span>
		);
	}
});

var TodoItem = React.createClass({
	render: function() {
		return(
			<div className="panel panel-default">
				<div className="panel-body">
					<MyCheckBox></MyCheckBox>
					{" " + this.props.title + " "}
					
				</div>
			</div>
		);
	}
});

var Container = React.createClass({
	render: function() {
		return(
			<div className="well my-holder">
				<TodoItem title="HELLO"></TodoItem>
			</div>
		);
	}
});

React.render(
	<Container></Container>,
	document.getElementById('app')
);