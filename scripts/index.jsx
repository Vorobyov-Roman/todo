import Todo from './model/model';
import Container from './container';
import cookies from 'js-cookie';

var data = cookies.get('model');
data = data ? JSON.parse(data) : null;
var model = data ? new Todo(data.text, data._state, data.children) : new Todo('Tasks');

React.render(<Container model={ model }></Container>, $('#app')[0]);