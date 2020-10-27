var DOT_RADIUS = 0.05;
var TOTAL_STEPS = 32;

var pos_in_bar = 0.0;

function bar_pos(bar, beat, unit) {
    //post(bar, beat, unit);
    //post();

    units = unit + (beat - 1) * 480;
    pos_in_bar = units / (4 * 480);

    post(pos_in_bar);
    post();
    bang();
}

function scale(val, fromRange, toRange) {
    var [f1, f2] = fromRange;
    var [t1, t2] = toRange;

    return t1 + (t2 - t1) * (val - f1) / (f2 - f1);
}

function dot_position(index) {
    var x_min = sketch.screentoworld(0, 0)[0];
    var x = scale(index, [0, TOTAL_STEPS - 1], [x_min, -x_min]);
    return [x, 0];
}

function draw() {
    with (sketch) {
        for (var i = 0; i < TOTAL_STEPS; i++) {
            glcolor(1, 1, 0);
            var [x, y] = dot_position(i);
            post(x, y);
            moveto(x, y);
            circle(0.1);
        }
    }
}

function bang() {
    with (sketch) {
        glclearcolor(0, 0, 0);
        glclear();
    }

    draw();
    refresh();

}

function init() {
    sketch.default2d();
    bang();
    post(sketch.screentoworld(0, 0));
    post();
}

init();
post(Date());
post();
