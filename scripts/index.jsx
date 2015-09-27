import model from './model';
import Container from './container';

(function loadList() {
    var currentList = model.load();

    if (!$('#list')[0]) {
        return;
    }

    React.render(
        <Container model={ currentList }></Container>,
        $('#list')[0]
    );
})();

(function fillMenu() {
    var listMenu = '';
    model.lists.forEach(function(list) {
        listMenu += '<li><a href="#">' + list.text + '</a></li>';
    });
    listMenu += '<li class="divider" role="separator"></li>';
    
    $('#list-menu').prepend(listMenu);
})();