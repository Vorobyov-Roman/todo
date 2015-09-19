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

        for (var i = 0; i != 20; ++i) {
            list.insert(i.toString());
        }

        return list;
    }
}