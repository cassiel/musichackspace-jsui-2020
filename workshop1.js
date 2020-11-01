var pos_in_bar = 0;
var NUM_POINTS = 16;

function list(bars, beats, units) {
    total_units = units + (beats - 1) * 480;
    pos_in_bar = total_units / (4 * 480);
}

function bang() {
    sketch.glclearcolor(0, 0, 0);
    sketch.glclear();

    sketch.moveto(0, 0);
    sketch.glcolor(1, 1, 1);
    sketch.framecircle(0.9, 90, 90 - 360 * pos_in_bar);

    for (var i = 0; i < NUM_POINTS; i++) {
        var angle = i * Math.PI * 2 / NUM_POINTS;
        var x = 0.9 * Math.sin(angle);
        var y = 0.9 * Math.cos(angle);
        sketch.moveto(x, y);
        sketch.circle(0.05);
    }


    refresh();
}

sketch.default2d();
bang();

post(Date());
post();
