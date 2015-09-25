var isTouch = 'ontouchstart' in document.documentElement;

@include('model.js');
@include('container.jsx');

(function loadList() {
    var currentList = model.load();

    if (! $('#app')[0]) {
        return;
    }

    React.render(
        <Container model={ currentList }></Container>,
        $('#app')[0]
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