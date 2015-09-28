var director = {
    _hovered: [],
    _edited: null,

    get prev() {
        return this._hovered.length ? this._hovered[this._hovered.length - 1] : null;
    },

    hover(curr) {
        this.prev && this.prev.showControls(false);

        curr.showControls(true);
        this._hovered.push(curr);
    },
    unhover() {
        this._hovered.pop().showControls(false);
        this.prev && this.prev.showControls(true);
    },

    setCursor(curr) {
        this._edited && this._edited.setState({ edited: false });
        curr.setState({ edited: true });
        this._edited = curr;
    }
};

export default director;