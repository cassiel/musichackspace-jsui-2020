/* Creating arrays of buttons. */

// Iteration over objects in patcher:

function iterator(obj) {
    if (obj.maxclass == "button") {
        a = obj.getattrnames();

        for (var i = 0; i < a.length; i++) {
            post(a[i]);
            post();
        }

        post("rect", obj.rect);
        post();

        post("patching_rect", obj.getattr("patching_rect"));
        post();

        obj.setattr("bgcolor", 1, 0, 0);
    }
}

function bang() {
    this.patcher.apply(iterator);
}

// First technique:
function count_buttons() {
    var result = 0;

    for (var obj = this.patcher.firstobject;
         obj != null;
         obj = obj.nextobject) {
        if (obj.maxclass == "button") {
            result++;
        }
    }

    return result;
}

post(Date());
post();
