// Globals:

var RADIUS = 0.8;

var pos_in_bar = 0.0;

var the_sequence_data = [0];
var last_step = -1;

function bar_pos(bar, beat, unit) {
    units = unit + (beat - 1) * 480;
    pos_in_bar = units / (4 * 480);     // 0.1..1.0.

    bang();
}

function seq_data() {
    the_sequence_data = arguments;
}

function radial(pos) {
    var start = [0, 0];
    var angle = pos * Math.PI * 2;
    var end = [RADIUS * Math.sin(angle), RADIUS * Math.cos(angle)];

    with (sketch) {
        moveto(start[0], start[1]);
        glcolor(1, 1, 1, 1);
        lineto(end[0], end[1]);
    }
}

function dots(this_step) {
    for (var i = 0; i < the_sequence_data.length; i++) {
        var angle = i * Math.PI * 2 / the_sequence_data.length;
        var location = [RADIUS * Math.sin(angle),
                        RADIUS * Math.cos(angle)];

        with (sketch) {
            moveto(location[0], location[1]);

            if (i == this_step) {
                glcolor(1, 0.8, 0, 1);
                if (the_sequence_data[i]) {
                    circle(0.07);
                } else {
                    framecircle(0.07);
                }
            } else {
                glcolor(1, 1, 1, 1);
                if (the_sequence_data[i]) {
                    circle(0.05);
                } else {
                    framecircle(0.05);
                }
            }
        }
    }
}

function bang() {
    with (sketch) {
        glclearcolor(0, 0, 0);
        glclear();
    }

    var step = Math.floor(pos_in_bar * the_sequence_data.length);

    with (sketch) {
        glcolor(1, 1, 1, 0.7);
        moveto(0, 0);
        //framecircle(RADIUS);

        var p1 = 90;
        var p2 = 90 - pos_in_bar * 360;
        framecircle(RADIUS, p1, p2);
    }

    dots(step);
    //radial(pos_in_bar);

    if (step != last_step) {
        //post("STEP: " + step);
        //post();

        if (the_sequence_data[step]) {
            this.outlet(0, "bang");
        }

        last_step = step;
    }

    refresh();
}

sketch.default2d();
bang();

post(Date());
post();
