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
            completion: {
                value: val || 0,
                configurable: true
            }
        });

        console.log(text, delete this.completion);
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

        var python = list.insert('Learn Python');
            python.insert('The language');
            python.insert('App Engine');

        var web = list.insert('Web');
            web.insert('HTML');
            var css = web.insert('CSS');
                css.insert('Basics');
                css.insert('SASS', 100);
            var js = web.insert('JavaScript');
                js.insert('The language', 100);
                js.insert('Standart library');
                var fw = js.insert('Frameworks');
                    fw.insert('AngularJS');
                    fw.insert('ReactJS', 100);

//        for (var i = 0; i != 10; ++i) {
//            list.insert(i.toString());
//        }
//        list.children[0].insert('ayy');
//        list.children[0].insert('lmao');
//
//        list.children[5].insert('top');
//        list.children[5].insert('kek');

        return list;
    }
}

export default model;