//Object that handles mouse hovering
export var hoverDirector = {
    //Commands that show or hide item's controlls
    _showControls(option) {
        $(React.findDOMNode(this.refs.controls)).stop().animate({
            top: option ? '-1px' : '-35px'
        }, 100);

        this.setState({ hovered: option });
    },

    //Stack of items being hovered.
    //Represents hierarchy: the deepest child sits on the top of the stack
    _hovered: [],

    //Shows controls of the item
    push(item) {
        //hide controls of the parent, if exists
        var prev = this._hovered.slice(-1)[0];
        prev && this._showControls.call(prev, false);

        //show controls of the child
        this._hovered.push(item);
        this._showControls.call(item, true);
    },

    //Hides controls of the last item hovered
    pop() {
        //hide controls of the child
        this._showControls.call(this._hovered.pop(), false);

        //show controls of the parent, if exists
        this._hovered.length && this._showControls.call(this._hovered.slice(-1)[0], true);
    }
};

//Object that handles the moving of the input
export var cursorDirector = {
    //Current item with the cursor in it
    _current: null,

    _setCursor(state) {
        this.setState({ edited: state });
    },

    set(item) {
        //hide input on the previous item, if exists
        this._current && this._setCursor.call(this._current, false);

        //change reference to the new item
        this._current = item;

        //show input on the new item
        this._setCursor.call(this._current, true);
    }
};