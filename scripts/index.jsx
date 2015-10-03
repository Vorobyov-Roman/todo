import TodoList from './model/model';
import Container from './container';

var list = new TodoList('Test List');
    var python = list.insert('Learn Python');
        python.insert('The language');
        python.insert('App Engine');

    var web = list.insert('Web');
        web.insert('HTML');
        var css = web.insert('CSS');
            css.insert('Basics').check(true);
            css.insert('Advanced');
            css.insert('SASS').check(true);
        var js = web.insert('JavaScript');
            js.insert('The language').check(true);
            js.insert('Standart library');
            var fw = js.insert('Frameworks');
                fw.insert('AngularJS');
                fw.insert('ReactJS');

React.render(<Container model={ list }></Container>, $('#app')[0]);