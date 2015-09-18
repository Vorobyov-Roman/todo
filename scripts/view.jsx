var isTouch = 'ontouchstart' in document.documentElement;

@include('model.js');
@include('container.jsx');

React.render(
    <Container model={ model }></Container>,
    document.getElementById('app')
);