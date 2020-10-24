/* Creating arrays of buttons. */

// Iteration over objects in patcher:

function new_obj() {
    // newobject takes (x, y, w, h). (Toggle ignores h.)
    var x = this.patcher.newdefault(0, 0, "panel");
    // left, top, right, bottom:
    x.rect = [122, 90, 162, 130];
    post(x.rect);
}

function iterator(obj) {
    if (obj.maxclass == "button") {
        this.patcher.remove(obj);
    }

    return true;
}

function bang() {
    this.patcher.apply(iterator);
}

post(Date());
post();
