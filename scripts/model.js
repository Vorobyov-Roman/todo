var TodoProto = {
    get completion() {
        var total = this.children.length * 100;
        var done = 0;

        this.children.forEach(function(item) {
            done += item.completion;
        });

        return total ? Math.floor(done / total * 100) : 0;
    },
    insert: function(text, val) {
        var newItem = Object.create(TodoProto, {
            text: { value: text },
            completion: { value: val || 0 }
        });

        delete this.completion;
        this.children = this.children || [];

        this.children.push(newItem);

        return newItem;
    }
}

var model = {
    lists: [], //holds references to list roots
    createList: function(title) {
        var newList = Object.create(TodoProto, {
            text: { value: title },
            children: { value: [] }
        });

        this.lists.push(newList);

        return newList;
    },
    load: function() {
        //todo: load from cookies

        //temp
        var list = this.createList('Test');

        list.insert('Lorem ipsum dolor sit amet, fringilla et dolor, lacus pharetra duis, et voluptatem wisi ut eu molestie aenean, erat orci. Nonummy quam condimentum eget aliquam lorem tincidunt, eget quibusdam elit id quis, exercitation potenti malesuada. Mi rhoncus eu tristique urna id, metus eros pede quis cursus erat fringilla. Et id phasellus mi, sed ut, turpis tortor viverra, eros accumsan suspendisse nullam, urna nibh fusce donec ut at. Ac odio. Lorem in venenatis elementum duis eu phasellus. Amet ac lorem vestibulum, eget taciti est dolor.');

        for (var i = 1; i != 10; ++i) {
            list.insert(i.toString());
        }
        list.children[0].insert('ayy');
        list.children[0].insert('lmao');

        list.children[5].insert('top');
        list.children[5].insert('kek');

        return list;
    }
}