var NUM_RINGS = 3;

var MAX_RADIUS = 0.8;

var NUM_RINGS = 3;

var the_rings = [
    {radius: 0.8,
     num_steps: 8,
     pattern: [0],
     step_values: [],
     last_step: -1,
     midi_pitch: 60
    },
    {radius: 0.7,
     num_steps: 8,
     pattern: [0],
     step_values: [],
     last_step: -1,
     midi_pitch: 67
    },
    {radius: 0.6,
     num_steps: 8,
     pattern: [0],
     step_values: [],
     last_step: -1,
     midi_pitch: 70
    }
];

var DOT_RADIUS_1 = 0.05;
var DOT_RADIUS_2 = 0.07;

// Globals:
var pos_in_bar = 0.0;

function populate(idx) {
    the_rings[idx].step_values = [];
    while (the_rings[idx].step_values.length < the_rings[idx].num_steps) {
        the_rings[idx].step_values = the_rings[idx].step_values.concat(the_rings[idx].pattern);
    }

    the_rings[idx].step_values.length = the_rings[idx].num_steps;

    //post(the_rings[idx].step_values);
    //post();
}

function bar_pos(bar, beat, unit) {
    //post(bar, beat, unit);
    //post();

    units = unit + (beat - 1) * 480;
    pos_in_bar = units / (4 * 480);     // 0.1..1.0.

    //post(pos_in_bar);
    //post();
    bang();
}

function radial(pos) {
    var start = [0, 0];
    var angle = pos * Math.PI * 2;
    var end = [MAX_RADIUS * Math.sin(angle), MAX_RADIUS * Math.cos(angle)];

    //post(angle);
    //post(Math.sin(0));
    //post(end);
    //post();
    with (sketch) {
        moveto(start[0], start[1]);
        glcolor(1, 1, 1, 1);
        lineto(end[0], end[1]);
    }
}

function dots(idx, this_step) {
    for (var i = 0; i < the_rings[idx].num_steps; i++) {
        var angle = i * Math.PI * 2 / the_rings[idx].num_steps;
        var location = [the_rings[idx].radius * Math.sin(angle),
                        the_rings[idx].radius * Math.cos(angle)];

        with (sketch) {
            moveto(location[0], location[1]);

            if (i == this_step) {
                glcolor(1, 0.8, 0, 1);
                if (the_rings[idx].step_values[i]) {
                    circle(DOT_RADIUS_2);
                } else {
                    framecircle(DOT_RADIUS_2);
                }
            } else {
                glcolor(1, 1, 1, 1);
                if (the_rings[idx].step_values[i]) {
                    circle(DOT_RADIUS_1);
                } else {
                    framecircle(DOT_RADIUS_1);
                }
            }
        }
    }
}

function set_length(idx, i) {
    the_rings[idx].num_steps = Math.max(i, 1);
    populate(idx);
    bang();
}

function set_pattern(_) {
    var L = arguments;
    if (L.length < 2) { L = [0, 0]; }
    the_rings[L[0]].pattern = Array.prototype.slice.call(L, 1);
    populate(L[0]);
}

function bang() {
    with (sketch) {
        glclearcolor(0, 0, 0);
        glclear();
    }

    for (var idx = 0; idx < NUM_RINGS; idx++) {
        var step = Math.floor(pos_in_bar * the_rings[idx].num_steps);

        with (sketch) {
            glcolor(1, 1, 1, 0.7);
            moveto(0, 0);
            framecircle(the_rings[idx].radius);
        }

        dots(idx, step);
        radial(pos_in_bar);

        if (step != the_rings[idx].last_step) {
            //post("STEP: " + step);
            //post();

            if (the_rings[idx].step_values[step]) {
                this.outlet(0, "bang");
                this.outlet(0, the_rings[idx].midi_pitch, 64, 100);
            }

            the_rings[idx].last_step = step;
        }
    }

    refresh();
}

function init() {
    sketch.default2d();
    for (var i = 0; i < NUM_RINGS; i++) { populate(i); }
    bang();
}

init();
post(Date());
post();
