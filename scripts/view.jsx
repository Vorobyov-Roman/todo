@include('model.js');
@include('todo_container.jsx');

React.render(
    <Container model={ model }></Container>,
    document.getElementById('app')
);