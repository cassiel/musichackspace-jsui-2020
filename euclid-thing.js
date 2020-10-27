var RADIUS = 0.8;
var DOT_RADIUS = 0.05;

var pos_in_bar = 0.0;

function bar_pos(bar, beat, unit) {
    //post(bar, beat, unit);
    //post();

    units = unit + (beat - 1) * 480;
    pos_in_bar = units / (4 * 480);

    //post(pos_in_bar);
    //post();
    bang();
}

function radial(pos) {
    var start = [0, 0];
    var angle = pos * Math.PI * 2;
    var end = [RADIUS * Math.sin(angle), RADIUS * Math.cos(angle)];

    //post(angle);
    //post(Math.sin(0));
    //post(end);
    //post();
    with (sketch) {
        moveto(start[0], start[1]);
        lineto(end[0], end[1]);
    }
}

function dots(how_many) {
    for (var i = 0; i < how_many; i++) {
        var angle = i * Math.PI * 2 / how_many;
        var location = [RADIUS * Math.sin(angle), RADIUS * Math.cos(angle)];

        with (sketch) {
            moveto(location[0], location[1]);
            circle(DOT_RADIUS);
        }
    }
}

function bang() {
    with (sketch) {
        glclearcolor(0, 0, 0);
        glclear();
        glcolor(1, 1, 1, 0.7);
        moveto(0, 0);
        framecircle(RADIUS);
    }

    dots(16);
    radial(pos_in_bar);

    refresh();

}

function init() {
    sketch.default2d();
    bang();
}

init();
post(Date());
post();
