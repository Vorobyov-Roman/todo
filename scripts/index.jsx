import Todo from './model/model';
import Container from './container';

var data = JSON.parse(document.cookie);
var model = data ? new Todo(data.text, data._state, data.children) : new Todo('Tasks');

React.render(<Container model={ model }></Container>, $('#app')[0]);